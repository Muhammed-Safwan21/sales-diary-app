import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowLeft,
    Banknote,
    Briefcase,
    Building2,
    Calendar,
    Check,
    ChevronDown,
    Clock,
    CreditCard,
    Hash,
    IndianRupee,
    MessageSquare,
    Receipt,
    Save,
    Smartphone,
    Sparkles,
    Users
} from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';

interface OtherPaymentFormData {
  totalAmount: string;
  paidAmount: string;
  discountAmount: string;
  discountPercentage: string;
  taxPercentage: string;
  taxAmount: string;
  status: string;
  paymentMethod: string;
  notes: string;
  ledgerFromId: string;
  ledgerToId: string;
  reference: string;
}

interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

interface ChartOfAccount {
  id: string;
  name: string;
  code: string;
}

// Validation rules
const validationRules = {
  totalAmount: {
    required: 'Amount is required',
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
  paidAmount: {
    required: 'Paid amount is required',
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
  ledgerFromId: {
    required: 'Collection head is required',
  },
  ledgerToId: {
    required: 'Account head is required',
  },
};

export default function OtherPaymentFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams();

  // Extract params
  const paymentId = params.id as string;
  const isEditing = !!paymentId;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());

  const { branchInfo, financialYear, user } = useSelector(
    (state: any) => state.auth
  );

  // Fetch payment data for editing
  const { data: paymentData, isLoading: isLoadingPayment } = useQuery({
    queryKey: [QUERY_KEY.TRANSACTIONS, paymentId],
    queryFn: async () => {
      if (!paymentId) return null;
      const response = await apiClient.get(`${API.TRANSACTIONS}${paymentId}`);
      return response.data;
    },
    enabled: isEditing,
  });

  // Fetch chart of accounts for dropdowns
  const { data: chartOfAccountsData } = useQuery({
    queryKey: [QUERY_KEY.CHART_OF_ACCOUNTS],
    queryFn: async () => {
      const response = await apiClient.get(`${API.CHART_OF_ACCOUNTS}`, {
        params: {
          order: 'ASC',
          page: 1,
          take: 100,
        },
      });
      return response.data;
    },
  });

  const chartOfAccounts: ChartOfAccount[] = chartOfAccountsData?.data?.rows || [];

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<OtherPaymentFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      totalAmount: '',
      paidAmount: '',
      discountAmount: '0',
      discountPercentage: '0',
      taxPercentage: '0',
      taxAmount: '0',
      status: 'COMPLETED',
      paymentMethod: 'CASH',
      notes: '',
      ledgerFromId: '',
      ledgerToId: '',
      reference: '',
    },
  });

  const watchedTotalAmount = watch('totalAmount');
  const watchedPaidAmount = watch('paidAmount');

  // Calculate discount and tax amounts
  useEffect(() => {
    const total = parseFloat(watchedTotalAmount) || 0;
    const paid = parseFloat(watchedPaidAmount) || 0;
    const discountPercent = parseFloat(watch('discountPercentage')) || 0;
    const taxPercent = parseFloat(watch('taxPercentage')) || 0;

    const discountAmount = (total * discountPercent) / 100;
    const taxAmount = ((total - discountAmount) * taxPercent) / 100;

    setValue('discountAmount', discountAmount.toFixed(2));
    setValue('taxAmount', taxAmount.toFixed(2));
  }, [watchedTotalAmount, watchedPaidAmount, watch('discountPercentage'), watch('taxPercentage'), setValue]);

  // Populate form when editing
  useEffect(() => {
    if (isEditing && paymentData?.data) {
      const payment = paymentData.data;
      reset({
        totalAmount: payment.totalAmount?.toString() || '',
        paidAmount: payment.paidAmount?.toString() || '',
        discountAmount: payment.discountAmount?.toString() || '0',
        discountPercentage: payment.discountPercentage?.toString() || '0',
        taxPercentage: payment.taxPercentage?.toString() || '0',
        taxAmount: payment.taxAmount?.toString() || '0',
        status: payment.status || 'COMPLETED',
        paymentMethod: payment.paymentMethod || 'CASH',
        notes: payment.notes || '',
        ledgerFromId: payment.ledgerFromId?.toString() || '',
        ledgerToId: payment.ledgerToId?.toString() || '',
        reference: payment.reference || '',
      });
      if (payment.paymentDate) {
        setPaymentDate(new Date(payment.paymentDate));
      }
    }
  }, [paymentData, isEditing, reset]);

  // Create/Update payment mutation
  const { mutate: savePayment, isPending } = useMutation({
    mutationFn: async (formData: OtherPaymentFormData) => {
      const payload = {
        staffId: user?.id,
        branchId: branchInfo?.id,
        totalAmount: parseFloat(formData.totalAmount),
        paidAmount: parseFloat(formData.paidAmount),
        discountAmount: parseFloat(formData.discountAmount),
        discountPercentage: parseFloat(formData.discountPercentage),
        taxPercentage: parseFloat(formData.taxPercentage),
        taxAmount: parseFloat(formData.taxAmount),
        status: formData.status,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        financialYearId: financialYear?.id,
        ledgerFromId: parseInt(formData.ledgerFromId),
        ledgerToId: parseInt(formData.ledgerToId),
        invoiceType: 'OTHER_PAYMENT',
        reference: formData.reference,
        paymentDate: paymentDate.toISOString(),
      };

      if (isEditing) {
        const response = await apiClient.patch(
          `${API.TRANSACTIONS}${paymentId}`,
          payload
        );
        return response.data;
      } else {
        const response = await apiClient.post(
          API.TRANSACTIONS,
          payload
        );
        return response.data;
      }
    },
    onSuccess: (data) => {
      console.log(`${isEditing ? 'Updated' : 'Created'} payment:`, data);
      
      // Invalidate and refetch payments list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TRANSACTIONS] });
      
      Alert.alert(
        'Success',
        `Payment ${isEditing ? 'updated' : 'created'} successfully.`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    },
    onError: (error: any) => {
      console.error('Payment save error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} payment.`
      );
    },
  });

  const onSubmit = (data: OtherPaymentFormData) => {
    console.log('Form data:', data);
    savePayment(data);
  };

  const paymentModes = [
    { id: 'CASH', label: 'Cash', icon: Banknote, color: '#10B981' },
    { id: 'CARD', label: 'Card', icon: CreditCard, color: '#3B82F6' },
    { id: 'BANK_TRANSFER', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
    { id: 'UPI', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
    { id: 'CHEQUE', label: 'Cheque', icon: Receipt, color: '#EF4444' },
  ];

  const statusOptions = [
    { id: 'PENDING', label: 'Pending', color: '#F59E0B' },
    { id: 'COMPLETED', label: 'Completed', color: '#10B981' },
    { id: 'REJECTED', label: 'Rejected', color: '#EF4444' },
    { id: 'PROCESSING', label: 'Processing', color: '#3B82F6' },
  ];

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: (DropdownItem | { id: string; label: string; color: string })[],
    selectedValue: string,
    onSelect: (value: string, label?: string) => void
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text style={[styles.modalCloseText, { color: theme.colors.textSecondary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const value = 'value' in item ? item.value : item.id;
              const label = item.label;
              const isSelected = selectedValue === value;
              return (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      backgroundColor: isSelected
                        ? `${theme.colors.primary}15`
                        : 'transparent',
                    }
                  ]}
                  onPress={() => {
                    onSelect(value, label);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    {
                      color: isSelected ? theme.colors.primary : theme.colors.text,
                      fontWeight: isSelected ? '600' : '500',
                    }
                  ]}>
                    {label}
                  </Text>
                  {isSelected && (
                    <Check size={16} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </BlurView>
      </View>
    </Modal>
  );

  const renderFormInput = (
    name: keyof OtherPaymentFormData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    multiline = false,
    required = false,
    rules?: any
  ) => (
    <Controller
      control={control}
      name={name}
      rules={rules || validationRules[name as keyof typeof validationRules]}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            {icon}
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              {label}{required && <Text style={{ color: '#EF4444' }}>*</Text>}
            </Text>
          </View>
          <View style={[
            styles.inputContainer,
            multiline && styles.multilineContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
              borderColor: error
                ? '#EF4444'
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            }
          ]}>
            <TextInput
              style={[
                styles.textInput,
                multiline && styles.multilineInput,
                { color: theme.colors.text }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={keyboardType}
              multiline={multiline}
              numberOfLines={multiline ? 4 : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );

  const renderDropdownInput = (
    name: keyof OtherPaymentFormData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    data: DropdownItem[],
    onPress: () => void,
    required = false
  ) => (
    <Controller
      control={control}
      name={name}
      rules={validationRules[name as keyof typeof validationRules]}
      render={({ field: { value }, fieldState: { error } }) => {
        const selectedItem = data.find(item => item.value === value);
        return (
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              {icon}
              <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                {label}{required && <Text style={{ color: '#EF4444' }}>*</Text>}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                {
                  backgroundColor: themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                  borderColor: error
                    ? '#EF4444'
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
                }
              ]}
              onPress={onPress}
            >
              <Text style={[
                styles.textInput,
                { color: selectedItem ? theme.colors.text : theme.colors.textSecondary }
              ]}>
                {selectedItem ? selectedItem.label : placeholder}
              </Text>
              <ChevronDown size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            {error && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );

  const collectionHeads: DropdownItem[] = chartOfAccounts.map(account => ({
    id: account.id,
    label: `${account.name} (${account.code})`,
    value: account.id,
  }));

  const accountHeads: DropdownItem[] = chartOfAccounts.map(account => ({
    id: account.id,
    label: `${account.name} (${account.code})`,
    value: account.id,
  }));

  if (isLoadingPayment) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading payment details...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      {/* Ultra-modern header with gradient */}
      <LinearGradient
        colors={themeType === 'dark' 
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
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <Receipt size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>
                {isEditing ? 'Edit' : 'Add'} Other Payment
              </Text>
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

          {/* Payment Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Payment Details
                </Text>
              </View>

              {/* Amount Input */}
              {renderFormInput(
                'totalAmount',
                'Total Amount',
                '0.00',
                <IndianRupee size={16} color={theme.colors.primary} />,
                'numeric',
                false,
                true
              )}

              {renderFormInput(
                'paidAmount',
                'Paid Amount',
                '0.00',
                <IndianRupee size={16} color={theme.colors.primary} />,
                'numeric',
                false,
                true
              )}

              {/* Date Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color={theme.colors.secondary} />
                  <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                    Payment Date<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor: themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                      borderColor: themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                    }
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.dateText, { color: theme.colors.text }]}>
                      {paymentDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Calendar size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={paymentDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setPaymentDate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>

              {/* Collection Head */}
              {renderDropdownInput(
                'ledgerFromId',
                'Collection Head',
                'Select collection head',
                <Users size={16} color={theme.colors.primary} />,
                collectionHeads,
                () => setShowCollectionDropdown(true),
                true
              )}

              {/* Account Head */}
              {renderDropdownInput(
                'ledgerToId',
                'Account Head',
                'Select account head',
                <Briefcase size={16} color={theme.colors.secondary} />,
                accountHeads,
                () => setShowAccountDropdown(true),
                true
              )}
            </BlurView>
          </Animated.View>

          {/* Payment Method */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <CreditCard size={18} color={theme.colors.accent} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Payment Method
                </Text>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.paymentMethodsContainer}
              >
                {paymentModes.map((mode, index) => {
                  const IconComponent = mode.icon;
                  
                  return (
                    <Controller
                      key={mode.id}
                      control={control}
                      name="paymentMethod"
                      render={({ field: { value, onChange } }) => {
                        const isSelected = value === mode.id;
                        return (
                          <Animated.View 
                            entering={FadeInDown.delay(350 + index * 50)}
                          >
                            <TouchableOpacity
                              style={[
                                styles.paymentMethodTag,
                                {
                                  backgroundColor: isSelected 
                                    ? mode.color
                                    : themeType === 'dark'
                                      ? 'rgba(255, 255, 255, 0.05)'
                                      : 'rgba(255, 255, 255, 0.8)',
                                  borderColor: isSelected 
                                    ? mode.color
                                    : themeType === 'dark'
                                      ? 'rgba(255, 255, 255, 0.08)'
                                      : 'rgba(0, 0, 0, 0.06)',
                                }
                              ]}
                              onPress={() => onChange(mode.id)}
                            >
                              <View style={[
                                styles.methodIconSmall,
                                { 
                                  backgroundColor: isSelected 
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : `${mode.color}15`,
                                }
                              ]}>
                                <IconComponent 
                                  size={14} 
                                  color={isSelected ? '#FFFFFF' : mode.color} 
                                />
                              </View>
                              
                              <Text style={[
                                styles.methodTagText,
                                { 
                                  color: isSelected ? '#FFFFFF' : theme.colors.text,
                                  fontWeight: isSelected ? '600' : '500',
                                }
                              ]}>
                                {mode.label}
                              </Text>
                            </TouchableOpacity>
                          </Animated.View>
                        );
                      }}
                    />
                  );
                })}
              </ScrollView>
            </BlurView>
          </Animated.View>

          {/* Additional Information */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={18} color={theme.colors.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'reference',
                'Reference Number',
                'Enter reference/receipt number',
                <Hash size={16} color={theme.colors.accent} />
              )}

              {renderFormInput(
                'notes',
                'Notes',
                'Add any additional notes or comments',
                <MessageSquare size={16} color={theme.colors.secondary} />,
                'default',
                true
              )}
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.footer}>
          <View style={styles.footerContent}>
            <TouchableOpacity style={[
              styles.draftButton,
              {
                backgroundColor: themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
                borderColor: themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.08)',
              }
            ]}>
              <Save size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.draftButtonText, { color: theme.colors.textSecondary }]}>
                Save Draft
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.submitButton,
                { 
                  backgroundColor: '#EF4444',
                  shadowColor: '#EF4444',
                }
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.submitGradient}
              >
                <Receipt size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>
                  {isPending ? 'Saving...' : (isEditing ? 'Update Payment' : 'Add Payment')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {renderDropdownModal(
        showCollectionDropdown,
        () => setShowCollectionDropdown(false),
        'Select Collection Head',
        collectionHeads,
        watch('ledgerFromId'),
        (value) => setValue('ledgerFromId', value)
      )}

      {renderDropdownModal(
        showAccountDropdown,
        () => setShowAccountDropdown(false),
        'Select Account Head',
        accountHeads,
        watch('ledgerToId'),
        (value) => setValue('ledgerToId', value)
      )}
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
    marginTop: -30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  formGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  multilineContainer: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 20,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
  },
  paymentMethodsContainer: {
    paddingRight: 20,
    gap: 8,
  },
  paymentMethodTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    minWidth: 80,
  },
  methodIconSmall: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodTagText: {
    fontSize: 12,
    letterSpacing: -0.1,
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
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  draftButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  submitButton: {
    flex: 2,
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
        boxShadow: '0 6px 20px rgba(239, 68, 68, 0.3)',
      },
    }),
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  modalCloseButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  dropdownItemText: {
    fontSize: 16,
    letterSpacing: -0.1,
  }
});