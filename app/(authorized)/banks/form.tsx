import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CreditCard,
  Hash,
  IndianRupee,
  Landmark,
  Save,
  FileText,
  Plus,
} from 'lucide-react-native';
import React from 'react';
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

// Form data interface
interface BankAccountFormData {
  accountName: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  accountType: string;
  openingBalance: string;
}

// Validation rules
const validationRules = {
  accountName: {
    required: 'Account name is required',
    minLength: {
      value: 2,
      message: 'Account name must be at least 2 characters',
    },
  },
  accountNumber: {
    required: 'Account number is required',
    minLength: {
      value: 8,
      message: 'Account number must be at least 8 digits',
    },
    pattern: {
      value: /^[0-9]{8,18}$/,
      message: 'Please enter a valid account number (8-18 digits)',
    },
  },
  bankName: {
    required: 'Bank name is required',
    minLength: {
      value: 2,
      message: 'Bank name must be at least 2 characters',
    },
  },
  ifscCode: {
    required: 'IFSC code is required',
    // pattern: {
    //   value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    //   message: 'Please enter a valid IFSC code (e.g., SBIN0001234)',
    // },
  },
  openingBalance: {
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
};

export default function BankAccountFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { branchInfo, financialYear, user } = useSelector((state: any) => state.auth);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<BankAccountFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      accountName: '',
      bankName: '',
      branchName: '',
      ifscCode: '',
      accountType: 'Savings',
      openingBalance: '0',
    },
  });

  // Create bank account mutation
  const { mutate: createBankAccount, isPending } = useMutation({
    mutationFn: async (bankData: any) => {
      console.log('Creating bank account with data:', bankData);
      const response = await apiClient.post('/chart-of-accounts', bankData);
      console.log('Bank account creation response:', response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Bank account created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });

      Alert.alert('Success', 'Bank account added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Bank account creation error:', JSON.stringify(error));
      let errorMessage = 'Failed to add bank account. Please try again.';

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

  // Form submission handler
  const onSubmit = (data: BankAccountFormData) => {
    // Prepare data for API
    const bankAccountPayload: any = {
      accountHolder: data.accountName.trim(),
      name: data.bankName.trim(),
      bankBranch: data.branchName.trim() || '',
      ifscCode: data.ifscCode.trim().toUpperCase(),
      accountType: data.accountType,
      openingBalance: parseFloat(data.openingBalance) || 0,
      ledgerType: "BANK",
      
      // Required fields from Redux state
      adminId: Number(user?.id) || parseInt(user?.adminId) || 1,
      branchId: Number(branchInfo?.id) || parseInt(branchInfo?.branchId) || 1,
      financialYearId: Number(financialYear?.id) || parseInt(financialYear?.financialYearId) || 1,
    };
    createBankAccount(bankAccountPayload);
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
    name: keyof BankAccountFormData,
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

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(numAmount);
  };

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
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add Bank Account</Text>
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
          {/* Account Details Section */}
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
                <CreditCard size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Account Details
                </Text>
              </View>

              {renderFormInput(
                'accountName',
                'Account Name',
                'Enter account holder name',
                <CreditCard size={18} />,
                'default',
                'words',
                false,
                true,
                validationRules.accountName
              )}

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Account Type
                </Text>
                <Controller
                  control={control}
                  name="accountType"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.accountTypeContainer}>
                      {['Savings', 'Current', 'Other'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          style={[
                            styles.accountTypeButton,
                            {
                              backgroundColor: value === type 
                                ? theme.colors.primary 
                                : themeType === 'dark'
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(255, 255, 255, 0.8)',
                              borderColor: value === type 
                                ? theme.colors.primary 
                                : 'rgba(255, 255, 255, 0.1)',
                            }
                          ]}
                          onPress={() => onChange(type)}
                          disabled={isPending}
                        >
                          <Text style={[
                            styles.accountTypeText,
                            { 
                              color: value === type 
                                ? '#FFFFFF' 
                                : theme.colors.text 
                            }
                          ]}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                />
              </View>
            </BlurView>
          </Animated.View>

          {/* Bank Information Section */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.accent}08`,
                  `${theme.colors.accent}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <Building2 size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Bank Information
                </Text>
              </View>

              {renderFormInput(
                'bankName',
                'Bank Name',
                'Enter bank name',
                <Building2 size={18} />,
                'default',
                'words',
                false,
                true,
                validationRules.bankName
              )}

              {renderFormInput(
                'branchName',
                'Branch Name',
                'Enter branch name',
                <Landmark size={18} />
              )}

              {renderFormInput(
                'ifscCode',
                'IFSC Code',
                'Enter IFSC code',
                <Hash size={18} />,
                'default',
                'characters',
                false,
                true,
                validationRules.ifscCode
              )}
            </BlurView>
          </Animated.View>

          {/* Financial Information Section */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.success}08`,
                  `${theme.colors.success}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.success} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Financial Information
                </Text>
              </View>

              {renderFormInput(
                'openingBalance',
                'Opening Balance',
                'Enter opening balance',
                <IndianRupee size={18} />,
                'numeric',
                'none',
                false,
                false,
                { pattern: validationRules.openingBalance.pattern }
              )}

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
                    <Text style={styles.saveButtonText}>Save Bank Account</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
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
  accountTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  accountTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  accountTypeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  balanceDisplay: {
    marginBottom: 20,
  },
  balanceCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '700',
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