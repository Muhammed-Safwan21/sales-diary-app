import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, FileText, Save, Receipt, ChevronDown, Check, Users, Briefcase, IndianRupee, MessageSquare, Clock } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface JournalForm {
  date: Date;
  debitAccount: string;
  creditAccount: string;
  amount: string;
  description: string;
  reference: string;
  notes: string;
}

interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

const debitAccounts: DropdownItem[] = [
  { id: 'cash', label: 'Cash Account', value: 'cash' },
  { id: 'bank', label: 'Bank Account', value: 'bank' },
  { id: 'sales', label: 'Sales Account', value: 'sales' },
  { id: 'receivables', label: 'Accounts Receivable', value: 'receivables' },
  { id: 'inventory', label: 'Inventory', value: 'inventory' },
  { id: 'assets', label: 'Fixed Assets', value: 'assets' },
];

const creditAccounts: DropdownItem[] = [
  { id: 'purchase', label: 'Purchase Account', value: 'purchase' },
  { id: 'expenses', label: 'Operating Expenses', value: 'expenses' },
  { id: 'income', label: 'Revenue Account', value: 'income' },
  { id: 'payables', label: 'Accounts Payable', value: 'payables' },
  { id: 'equity', label: 'Owner\'s Equity', value: 'equity' },
  { id: 'liabilities', label: 'Current Liabilities', value: 'liabilities' },
];

export default function JournalFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDebitDropdown, setShowDebitDropdown] = useState(false);
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);

  const [journalForm, setJournalForm] = useState<JournalForm>({
    date: new Date(),
    debitAccount: '',
    creditAccount: '',
    amount: '',
    description: '',
    reference: '',
    notes: '',
  });

  const handleSubmit = () => {
    console.log('Journal entry submitted:', journalForm);
    router.back();
  };

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: DropdownItem[],
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
              const isSelected = selectedValue === item.value;
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
                    onSelect(item.value, item.label);
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
                    {item.label}
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
              <FileText size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add Journal Entry</Text>
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
          {/* Journal Entry Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <FileText size={18} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Journal Entry Details
                </Text>
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
                      {journalForm.date.toLocaleDateString('en-IN', {
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
                    value={journalForm.date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setJournalForm({ ...journalForm, date: selectedDate });
                      }
                    }}
                  />
                )}
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
                    value={journalForm.amount}
                    onChangeText={(text) => setJournalForm({ ...journalForm, amount: text })}
                  />
                </View>
              </View>

              {/* Description */}
              {renderFormInput(
                'Description',
                journalForm.description,
                (text) => setJournalForm({ ...journalForm, description: text }),
                'Enter transaction description',
                <MessageSquare size={16} color={theme.colors.secondary} />,
                'default',
                false,
                true
              )}
            </BlurView>
          </Animated.View>

          {/* Account Selection */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Users size={18} color={theme.colors.accent} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Account Selection
                </Text>
              </View>

              {/* Debit Account */}
              {renderDropdownInput(
                'Debit Account',
                debitAccounts.find(acc => acc.value === journalForm.debitAccount)?.label || '',
                'Select debit account',
                <Briefcase size={16} color={theme.colors.primary} />,
                () => setShowDebitDropdown(true),
                true
              )}

              {/* Credit Account */}
              {renderDropdownInput(
                'Credit Account',
                creditAccounts.find(acc => acc.value === journalForm.creditAccount)?.label || '',
                'Select credit account',
                <Briefcase size={16} color={theme.colors.secondary} />,
                () => setShowCreditDropdown(true),
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
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.submitGradient}
              >
                <FileText size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Add Journal</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {/* Dropdown Modals */}
      {renderDropdownModal(
        showDebitDropdown,
        () => setShowDebitDropdown(false),
        'Select Debit Account',
        debitAccounts,
        journalForm.debitAccount,
        (value, label) => setJournalForm({ ...journalForm, debitAccount: value })
      )}

      {renderDropdownModal(
        showCreditDropdown,
        () => setShowCreditDropdown(false),
        'Select Credit Account',
        creditAccounts,
        journalForm.creditAccount,
        (value, label) => setJournalForm({ ...journalForm, creditAccount: value })
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