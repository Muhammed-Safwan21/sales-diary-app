import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  ChevronDown,
  FileText,
  FolderOpen,
  IndianRupee,
  Plus,
  Save,
  Tag,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Category Selection Modal Component
import LedgerCategorySelectionModal from '@/components/modal/ledgerCategorySelectionModal';
import LedgerGroupSelectionModal from '@/components/modal/ledgerGroupSelectionModel';

// Form data interface
interface LedgerFormData {
  name: string;
  category: string;
  group: string;
  openingBalance: string;
  description: string;
}

// Validation rules
const validationRules = {
  name: {
    required: 'Ledger name is required',
    minLength: {
      value: 2,
      message: 'Ledger name must be at least 2 characters',
    },
  },
  category: {
    required: 'Category is required',
    validate: (value: string) =>
      value !== 'Select Category' || 'Please select a category',
  },
  group: {
    required: 'Group is required',
    validate: (value: string) =>
      value !== 'Select Group' || 'Please select a group',
  },
  openingBalance: {
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
};

export default function AddLedgerScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { branchInfo, financialYear, user } = useSelector((state: any) => state.auth);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedGroup, setSelectedGroup] = useState('Select Group');

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<LedgerFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      category: 'Select Category',
      group: 'Select Group',
      openingBalance: '0',
      description: '',
    },
  });

  // Create ledger mutation
  const { mutate: createLedger, isPending } = useMutation({
    mutationFn: async (ledgerData: any) => {
      console.log('Creating ledger with data:', ledgerData);
      const response = await apiClient.post('/chart-of-accounts', ledgerData);
      console.log('Ledger creation response:', response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Ledger created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['ledgers'] });
      queryClient.invalidateQueries({ queryKey: ['chart-of-accounts'] });

      Alert.alert('Success', 'Ledger added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Ledger creation error:', JSON.stringify(error));
      let errorMessage = 'Failed to add ledger. Please try again.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    },
  });

  // Handle category selection
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.name);
    setValue('category', category.name);
    setShowCategoryModal(false);
  };

  // Handle group selection
  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group.name);
    setValue('group', group.name);
    setShowGroupModal(false);
  };

  // Form submission handler
  const onSubmit = (data: LedgerFormData) => {
    // Prepare data for API
    const ledgerPayload: any = {
      name: data.name.trim(),
      category: data.category,
      group: data.group,
      openingBalance: parseFloat(data.openingBalance) || 0,
      description: data.description.trim(),
      ledgerType: "GENERAL",
      
      // Required fields from Redux state
      adminId: Number(user?.id) || parseInt(user?.adminId) || 1,
      branchId: Number(branchInfo?.id) || parseInt(branchInfo?.branchId) || 1,
      financialYearId: Number(financialYear?.id) || parseInt(financialYear?.financialYearId) || 1,
    };
    createLedger(ledgerPayload);
  };

  // Get input border style based on error state
  const getInputBorderStyle = (hasError: boolean) => ({
    borderColor: hasError 
      ? '#EF4444' 
      : themeType === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)',
    borderWidth: hasError ? 1.5 : 1,
  });

  const renderFormInput = (
    name: keyof LedgerFormData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    autoCapitalize: any = 'words',
    multiline = false,
    required = false,
    rules?: any
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
        {label}{' '}
        {required && <Text style={{ color: '#EF4444' }}>*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.inputContainer,
              multiline && styles.textAreaContainer,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
              },
              getInputBorderStyle(!!errors[name]),
            ]}
          >
            <View
              style={[
                styles.inputIconContainer,
                { 
                  backgroundColor: errors[name] 
                    ? 'rgba(239, 68, 68, 0.15)' 
                    : `${theme.colors.primary}15` 
                },
              ]}
            >
              {React.cloneElement(icon as React.ReactElement, {
                color: errors[name] ? '#EF4444' : theme.colors.primary,
              } as any)}
            </View>
            <TextInput
              style={[
                styles.input,
                multiline && styles.textArea,
                { color: theme.colors.text },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
              numberOfLines={multiline ? 4 : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
              editable={!isPending}
              returnKeyType={multiline ? 'default' : 'next'}
            />
            {errors[name] && (
              <AlertCircle size={18} color="#EF4444" style={styles.errorIcon} />
            )}
          </View>
        )}
      />
      {errors[name] && (
        <Animated.View entering={FadeInDown.duration(200)}>
          <Text style={styles.errorText}>{errors[name]?.message}</Text>
        </Animated.View>
      )}
    </View>
  );

  const renderCategorySelect = () => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
        Category <Text style={{ color: '#EF4444' }}>*</Text>
      </Text>
      <Controller
        control={control}
        name="category"
        rules={validationRules.category}
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
              errors.category && styles.inputError,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: errors.category
                  ? '#EF4444'
                  : themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
            onPress={() => setShowCategoryModal(true)}
            disabled={isPending}
          >
            <View style={styles.selectContent}>
              <View
                style={[
                  styles.selectIconContainer,
                  { 
                    backgroundColor: errors.category 
                      ? 'rgba(239, 68, 68, 0.15)' 
                      : `${theme.colors.primary}15` 
                  },
                ]}
              >
                <Tag 
                  size={18} 
                  color={errors.category ? '#EF4444' : theme.colors.primary} 
                />
              </View>
              <Text
                style={[
                  styles.selectText,
                  {
                    color:
                      value === 'Select Category'
                        ? theme.colors.textSecondary
                        : theme.colors.text,
                  },
                ]}
              >
                {value}
              </Text>
            </View>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
      {errors.category && (
        <Animated.View entering={FadeInDown.duration(200)}>
          <Text style={styles.errorText}>{errors.category?.message}</Text>
        </Animated.View>
      )}
    </View>
  );

  const renderGroupSelect = () => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
        Group <Text style={{ color: '#EF4444' }}>*</Text>
      </Text>
      <Controller
        control={control}
        name="group"
        rules={validationRules.group}
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
              errors.group && styles.inputError,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: errors.group
                  ? '#EF4444'
                  : themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
            onPress={() => setShowGroupModal(true)}
            disabled={isPending}
          >
            <View style={styles.selectContent}>
              <View
                style={[
                  styles.selectIconContainer,
                  { 
                    backgroundColor: errors.group 
                      ? 'rgba(239, 68, 68, 0.15)' 
                      : `${theme.colors.accent}15` 
                  },
                ]}
              >
                <FolderOpen 
                  size={18} 
                  color={errors.group ? '#EF4444' : theme.colors.accent} 
                />
              </View>
              <Text
                style={[
                  styles.selectText,
                  {
                    color:
                      value === 'Select Group'
                        ? theme.colors.textSecondary
                        : theme.colors.text,
                  },
                ]}
              >
                {value}
              </Text>
            </View>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
      {errors.group && (
        <Animated.View entering={FadeInDown.duration(200)}>
          <Text style={styles.errorText}>{errors.group?.message}</Text>
        </Animated.View>
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Modern header with gradient */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              disabled={isPending}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <BookOpen size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add Ledger</Text>
            </View>

            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information Section */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.primary}08`,
                  `${theme.colors.primary}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <FileText size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Basic Information
                </Text>
              </View>

              {renderFormInput(
                'name',
                'Ledger Name',
                'Enter ledger name',
                <BookOpen size={18} />,
                'default',
                'words',
                false,
                true,
                validationRules.name
              )}

              {renderCategorySelect()}

              {renderGroupSelect()}
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer Actions */}
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <View style={styles.footerContent}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                  opacity: isPending ? 0.7 : 1,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.saveGradient}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.saveButtonText}>Saving...</Text>
                  </View>
                ) : (
                  <>
                    <Save size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Ledger</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {/* Category Selection Modal */}
      <LedgerCategorySelectionModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory !== 'Select Category' ? selectedCategory : undefined}
      />

      {/* Group Selection Modal */}
      <LedgerGroupSelectionModal
        visible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onSelectGroup={handleGroupSelect}
        selectedGroup={selectedGroup !== 'Select Group' ? selectedGroup : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: -10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  section: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  sectionGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginLeft: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  textArea: {
    textAlignVertical: 'top',
    height: 76,
  },
  errorIcon: {
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
  },
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  selectIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  footer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  footerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});