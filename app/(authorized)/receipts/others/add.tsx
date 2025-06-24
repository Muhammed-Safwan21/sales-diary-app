import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  Tag,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  FileText,
  Hash,
  MessageSquare,
  Save,
  TrendingDown,
  Sparkles,
  Clock,
  Receipt,
  ChevronDown,
  Users,
  Briefcase,
  Check,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface OtherReceiptForm {
  amount: string;
  date: Date;
  description: string;
  paymentMode: string;
  reference: string;
  notes: string;
  collectionHead: string;
  accountHead: string;
}

interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

export default function AddOtherReceiptScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  
  const [expenseForm, setExpenseForm] = useState<OtherReceiptForm>({
    amount: '',
    date: new Date(),
    description: '',
    paymentMode: 'cash',
    reference: '',
    notes: '',
    collectionHead: '',
    accountHead: '',
  });

  const collectionHeads: DropdownItem[] = [
    { id: '1', label: 'Sales Department', value: 'sales' },
    { id: '2', label: 'Marketing Department', value: 'marketing' },
    { id: '3', label: 'Operations Department', value: 'operations' },
    { id: '4', label: 'Finance Department', value: 'finance' },
    { id: '5', label: 'HR Department', value: 'hr' },
    { id: '6', label: 'IT Department', value: 'it' },
    { id: '7', label: 'Administration', value: 'admin' },
  ];

  const accountHeads: DropdownItem[] = [
    { id: '1', label: 'Office Expenses', value: 'office_expenses' },
    { id: '2', label: 'Travel & Conveyance', value: 'travel_conveyance' },
    { id: '3', label: 'Marketing & Advertising', value: 'marketing_advertising' },
    { id: '4', label: 'Utility Bills', value: 'utility_bills' },
    { id: '5', label: 'Office Supplies', value: 'office_supplies' },
    { id: '6', label: 'Professional Services', value: 'professional_services' },
    { id: '7', label: 'Equipment & Maintenance', value: 'equipment_maintenance' },
    { id: '8', label: 'Communication Expenses', value: 'communication' },
    { id: '9', label: 'Staff Welfare', value: 'staff_welfare' },
    { id: '10', label: 'Miscellaneous', value: 'miscellaneous' },
  ];

  const paymentModes = [
    { id: 'cash', label: 'Cash', icon: Banknote, color: '#10B981' },
    { id: 'card', label: 'Card', icon: CreditCard, color: '#3B82F6' },
    { id: 'bank', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
  ];

  const handleSubmit = () => {
    console.log('Expense submitted:', expenseForm);
    router.back();
  };

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
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    multiline = false,
    required = false
  ) => (
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
          borderColor: themeType === 'dark'
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
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );

  const renderDropdownInput = (
    label: string,
    value: string,
    placeholder: string,
    icon: React.ReactNode,
    onPress: () => void,
    required = false
  ) => (
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
            borderColor: themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
          }
        ]}
        onPress={onPress}
      >
        <Text style={[
          styles.textInput,
          { color: value ? theme.colors.text : theme.colors.textSecondary }
        ]}>
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
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
              <Text style={styles.headerTitle}>Add Receipt</Text>
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

          {/*  Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Receipt Details
                </Text>
              </View>

              {/* Amount Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                    Amount<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <View style={styles.amountInputContainer}>
                  <View style={[
                    styles.currencyContainer,
                    {
                      backgroundColor: `${theme.colors.primary}15`,
                      borderColor: `${theme.colors.primary}20`,
                    }
                  ]}>
                    <IndianRupee size={16} color={theme.colors.primary} />
                  </View>
                  <TextInput
                    style={[
                      styles.amountInput,
                      {
                        backgroundColor: themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                        borderColor: themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                        color: theme.colors.text,
                      }
                    ]}
                    placeholder="0.00"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="numeric"
                    value={expenseForm.amount}
                    onChangeText={(text) => setExpenseForm({ ...expenseForm, amount: text })}
                  />
                </View>
              </View>

              {/* Date Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color={theme.colors.secondary} />
                  <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                    Date<Text style={{ color: '#EF4444' }}>*</Text>
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
                      {expenseForm.date.toLocaleDateString('en-IN', {
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
                    value={expenseForm.date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setExpenseForm({ ...expenseForm, date: selectedDate });
                      }
                    }}
                  />
                )}
              </View>
              {/* Collection Head */}
              {renderDropdownInput(
                'Collection Head',
                collectionHeads.find(head => head.value === expenseForm.collectionHead)?.label || '',
                'Select collection head',
                <Users size={16} color={theme.colors.primary} />,
                () => setShowCollectionDropdown(true),
                true
              )}

              {/* Account Head */}
              {renderDropdownInput(
                'Account Head',
                accountHeads.find(head => head.value === expenseForm.accountHead)?.label || '',
                'Select account head',
                <Briefcase size={16} color={theme.colors.secondary} />,
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
                  const isSelected = expenseForm.paymentMode === mode.id;
                  
                  return (
                    <Animated.View 
                      key={mode.id}
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
                        onPress={() => setExpenseForm({ ...expenseForm, paymentMode: mode.id })}
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
                'Reference Number',
                expenseForm.reference,
                (text) => setExpenseForm({ ...expenseForm, reference: text }),
                'Enter reference/receipt number',
                <Hash size={16} color={theme.colors.accent} />
              )}

              {renderFormInput(
                'Notes',
                expenseForm.notes,
                (text) => setExpenseForm({ ...expenseForm, notes: text }),
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
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.submitGradient}
              >
                <Receipt size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Add Expense</Text>
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
        expenseForm.collectionHead,
        (value, label) => setExpenseForm({ ...expenseForm, collectionHead: value })
      )}

      {renderDropdownModal(
        showAccountDropdown,
        () => setShowAccountDropdown(false),
        'Select Account Head',
        accountHeads,
        expenseForm.accountHead,
        (value, label) => setExpenseForm({ ...expenseForm, accountHead: value })
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
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencyContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
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
  categoriesContainer: {
    paddingRight: 20,
    gap: 8,
    marginBottom: 16,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    minWidth: 90,
  },
  categoryIcon: {
    width: 18,
    height: 18,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTagText: {
    fontSize: 11,
    letterSpacing: -0.1,
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
})