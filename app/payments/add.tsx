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
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  FileText,
  Hash,
  MessageSquare,
  Save,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Clock,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface PaymentForm {
  amount: string;
  date: Date;
  paymentMode: string;
  reference: string;
  notes: string;
  partyId: string;
}

export default function PaymentForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    amount: '',
    date: new Date(),
    paymentMode: 'cash',
    reference: '',
    notes: '',
    partyId: '',
  });

  const paymentModes = [
    { id: 'cash', label: 'Cash', icon: Banknote, color: '#10B981' },
    { id: 'card', label: 'Card', icon: CreditCard, color: '#3B82F6' },
    { id: 'bank', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
    { id: 'cheque', label: 'Cheque', icon: FileText, color: '#EF4444' },
  ];

  const isPaymentIn = type === 'in';

  const handleSubmit = () => {
    console.log('Payment submitted:', paymentForm);
    router.back();
  };

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
              {isPaymentIn ? (
                <TrendingUp size={20} color="#FFFFFF" />
              ) : (
                <TrendingDown size={20} color="#FFFFFF" />
              )}
              <Text style={styles.headerTitle}>
                {isPaymentIn ? 'Payment In' : 'Payment Out'}
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
          {/* Payment Summary Card */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.summaryCard}>
              <LinearGradient
                colors={isPaymentIn 
                  ? ['rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.05)', 'transparent']
                  : ['rgba(239, 68, 68, 0.15)', 'rgba(239, 68, 68, 0.05)', 'transparent']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summaryGradientOverlay}
              />
              
              <View style={styles.summaryContent}>
                <View style={styles.summaryHeader}>
                  <View style={[
                    styles.summaryIconContainer,
                    { 
                      backgroundColor: isPaymentIn 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : 'rgba(239, 68, 68, 0.2)',
                    }
                  ]}>
                    {isPaymentIn ? (
                      <TrendingUp size={24} color="#10B981" />
                    ) : (
                      <TrendingDown size={24} color="#EF4444" />
                    )}
                  </View>
                  
                  <View style={styles.summaryText}>
                    <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
                      {isPaymentIn ? 'Receiving Payment' : 'Making Payment'}
                    </Text>
                    <Text style={[styles.summarySubtitle, { color: theme.colors.textSecondary }]}>
                      {isPaymentIn ? 'Money coming in' : 'Money going out'}
                    </Text>
                  </View>
                </View>
                
                {paymentForm.amount && (
                  <View style={styles.amountPreview}>
                    <IndianRupee size={16} color={isPaymentIn ? '#10B981' : '#EF4444'} />
                    <Text style={[
                      styles.amountPreviewText, 
                      { color: isPaymentIn ? '#10B981' : '#EF4444' }
                    ]}>
                      {parseFloat(paymentForm.amount).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                )}
              </View>
            </BlurView>
          </Animated.View>

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
                    value={paymentForm.amount}
                    onChangeText={(text) => setPaymentForm({ ...paymentForm, amount: text })}
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
                      {paymentForm.date.toLocaleDateString('en-IN', {
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
                    value={paymentForm.date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setPaymentForm({ ...paymentForm, date: selectedDate });
                      }
                    }}
                  />
                )}
              </View>
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
                  const isSelected = paymentForm.paymentMode === mode.id;
                  
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
                        onPress={() => setPaymentForm({ ...paymentForm, paymentMode: mode.id })}
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
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={18} color={theme.colors.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'Reference Number',
                paymentForm.reference,
                (text) => setPaymentForm({ ...paymentForm, reference: text }),
                'Enter reference/transaction ID',
                <Hash size={16} color={theme.colors.accent} />
              )}

              {renderFormInput(
                'Notes',
                paymentForm.notes,
                (text) => setPaymentForm({ ...paymentForm, notes: text }),
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
          <TouchableOpacity 
            style={[
              styles.submitButton,
              { 
                backgroundColor: isPaymentIn ? '#10B981' : '#EF4444',
                shadowColor: isPaymentIn ? '#10B981' : '#EF4444',
              }
            ]}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={isPaymentIn 
                ? ['#10B981', '#059669']
                : ['#EF4444', '#DC2626']
              }
              style={styles.submitGradient}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>
                {isPaymentIn ? 'Record Payment In' : 'Record Payment Out'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  summaryGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  summaryContent: {
    position: 'relative',
    zIndex: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  summaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  amountPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amountPreviewText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
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
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  multilineContainer: {
    paddingVertical: 12,
  },
  textInput: {
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  submitButton: {
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
        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
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
});