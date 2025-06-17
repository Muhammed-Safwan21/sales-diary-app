import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Plus, Search, Tags, X, FolderOpen, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  FadeInDown,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

// Types
interface Category {
  id: string;
  name: string;
  description?: string;
  branchId: number;
}

interface CategorySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
  selectedCategory?: string;
}

interface FormData {
  group: string;
  name: string;
  description: string;
}

const LedgerCategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
  selectedCategory,
}) => {
  const { theme, themeType }: any = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      group: 'Select Group',
      name: '',
      description: '',
    },
  });

  // Validation rules
  const validationRules = {
    group: {
      required: 'Please select a group',
      validate: (value: string) => value !== 'Select Group' || 'Please select a group',
    },
    name: {
      required: 'Category name is required',
      minLength: {
        value: 2,
        message: 'Category name must be at least 2 characters',
      },
    },
  };

  // Get branchId from Redux
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.ACCOUNT_CATEGORIES, branchId, 'CATEGORY'],
    queryFn: async () =>
      await apiClient.get(API.ACCOUNT_CATEGORIES, {
        params: {
          branchId: branchId,
          categoryType: 'CATEGORY',
        },
      }),
    select: (res: any) => res?.data?.data,
    enabled: visible,
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (categoryData: any) => {
      return await apiClient.post(API.ACCOUNT_CATEGORIES, categoryData);
    },
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACCOUNT_CATEGORIES, branchId, 'CATEGORY'],
      });
      reset();
      setShowAddForm(false);
      Alert.alert('Success', 'Category added successfully!');
    },
    onError: (error: any) => {
      console.log('Category creation error', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to add category'
      );
    },
  });

  const filteredCategories = categories?.filter(
    (category: any) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectCategory = (category: Category) => {
    onSelectCategory(category);
    onClose();
    setSearchQuery('');
  };

  const handleAddCategory = (data: FormData) => {
    if (!branchId) {
      console.error('Branch ID not found in Redux state');
      Alert.alert('Error', 'Branch ID not found');
      return;
    }

    const categoryData = {
      name: data.name.trim(),
      description: data.description.trim(),
      branchId: Number(branchId),
      group: data.group,
    };

    console.log('Attempting to add category:', categoryData);
    console.log('Current branchId from Redux:', branchId);

    try {
      addCategoryMutation.mutate(categoryData);
    } catch (error) {
      console.error('Error in handleAddCategory:', error);
      Alert.alert('Error', 'Failed to submit category data');
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.name;

    return (
      <Animated.View entering={FadeIn.delay(50)}>
        <TouchableOpacity
          style={[
            styles.categoryItem,
            isSelected && {
              backgroundColor: `${theme.colors.primary}15`,
              borderColor: `${theme.colors.primary}40`,
            },
            {
              backgroundColor: isSelected
                ? `${theme.colors.primary}15`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.6)',
              borderColor: isSelected
                ? `${theme.colors.primary}40`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
          onPress={() => handleSelectCategory(item)}
          activeOpacity={0.7}
        >
          <View style={styles.categoryItemContent}>
            <View style={styles.categoryInfo}>
              <View
                style={[
                  styles.categoryIconContainer,
                  {
                    backgroundColor: isSelected
                      ? `${theme.colors.primary}20`
                      : `${theme.colors.accent}15`,
                  },
                ]}
              >
                <Tags
                  size={16}
                  color={
                    isSelected ? theme.colors.primary : theme.colors.accent
                  }
                />
              </View>
              <View style={styles.categoryTextContainer}>
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: isSelected
                        ? theme.colors.primary
                        : theme.colors.text,
                    },
                  ]}
                >
                  {item.name}
                </Text>
                {item.description && (
                  <Text
                    style={[
                      styles.categoryDescription,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </View>

            {isSelected && (
              <Animated.View entering={FadeIn.duration(200)}>
                <View
                  style={[
                    styles.checkContainer,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Check size={14} color="#FFFFFF" />
                </View>
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
            disabled={addCategoryMutation.isPending}
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

  const renderHeader = () => (
    <BlurView
      intensity={themeType === 'dark' ? 20 : 80}
      tint={themeType}
      style={[
        styles.header,
        {
          paddingTop: 18,
          borderBottomColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    >
      <LinearGradient
        colors={[
          `${theme.colors.primary}15`,
          `${theme.colors.primary}05`,
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      />

      <View style={styles.headerContent}>
        <View style={styles.headerTitleContainer}>
          <Tags size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            {showAddForm ? 'Add New Category' : 'Select Category'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
            },
          ]}
          onPress={() => {
            setShowAddForm(false);
            reset();
            onClose();
          }}
        >
          <X size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {!showAddForm && (
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
        >
          <Search size={16} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search categories..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
    </BlurView>
  );

  const renderAddCategoryForm = () => (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.addFormContainer}
    >
      <View style={styles.formContent}>
        <Text style={[styles.formLabel, { color: theme.colors.text }]}>
          Category Name *
        </Text>
        <Controller
          control={control}
          name="name"
          rules={validationRules.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.formInput,
                errors.name && styles.inputError,
                {
                  backgroundColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                  borderColor: errors.name
                    ? '#EF4444'
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
                  color: theme.colors.text,
                },
              ]}
              placeholder="Enter category name"
              placeholderTextColor={theme.colors.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
            />
          )}
        />
        {errors.name && (
          <Animated.View entering={FadeInDown.duration(200)}>
            <Text style={styles.errorText}>{errors.name?.message}</Text>
          </Animated.View>
        )}

        {renderGroupSelect()}

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[
              styles.formButton,
              styles.cancelButton,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
            onPress={() => {
              setShowAddForm(false);
              reset();
            }}
          >
            <Text
              style={[
                styles.cancelButtonText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.formButton,
              styles.submitButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleSubmit(handleAddCategory)}
            disabled={addCategoryMutation.isPending}
          >
            <Text style={styles.submitButtonText}>
              {addCategoryMutation.isPending ? 'Adding...' : 'Add Category'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
      <View
        style={[
          styles.emptyIconContainer,
          { backgroundColor: `${theme.colors.textSecondary}15` },
        ]}
      >
        <Tags size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery ? 'No categories found' : 'No categories available'}
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        {searchQuery
          ? 'Try adjusting your search terms'
          : 'Add your first category to get started'}
      </Text>
    </Animated.View>
  );

  const renderLoadingState = () => (
    <Animated.View entering={FadeIn} style={styles.loadingState}>
      <View
        style={[
          styles.loadingIconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <Tags size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading categories...
      </Text>
    </Animated.View>
  );

  const renderErrorState = () => (
    <Animated.View entering={FadeIn} style={styles.errorState}>
      <Text style={[styles.errorStateText, { color: '#EF4444' }]}>
        Failed to load categories
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => refetch()}
      >
        <Text style={[styles.retryText, { color: theme.colors.primary }]}>
          Retry
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderFooter = () => (
    <BlurView
      intensity={themeType === 'dark' ? 15 : 80}
      tint={themeType}
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom + 16,
          borderTopColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => setShowAddForm(true)}
      >
        <Plus size={16} color={theme.colors.primary} />
        <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
          Add New Category
        </Text>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
      onRequestClose={() => {
        setShowAddForm(false);
        reset();
        onClose();
      }}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => {
            setShowAddForm(false);
            reset();
            onClose();
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(250)}
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            {renderHeader()}

            <View style={styles.content}>
              {showAddForm ? (
                renderAddCategoryForm()
              ) : isLoading ? (
                renderLoadingState()
              ) : error ? (
                renderErrorState()
              ) : filteredCategories.length === 0 ? (
                renderEmptyState()
              ) : (
                <FlatList
                  data={filteredCategories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
              )}
            </View>

            {!showAddForm && renderFooter()}
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: '85%',
    minHeight: '60%',
  },
  header: {
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 2,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    position: 'relative',
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    minHeight: 200,
  },
  listContainer: {
    padding: 20,
  },
  categoryItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  categoryItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  categoryDescription: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFormContainer: {
    flex: 1,
    padding: 20,
  },
  formContent: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  textAreaInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    // backgroundColor set dynamically
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorStateText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LedgerCategorySelectionModal;