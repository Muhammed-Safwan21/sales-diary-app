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
  Alert,
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
  Package,
  RotateCcw,
  FileText,
  Hash,
  MessageSquare,
  Save,
  AlertCircle,
  Sparkles,
  Clock,
  Minus,
  Plus,
  ShoppingCart,
  Receipt,
  RefreshCw,
  CheckCircle,
  XCircle,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface ReturnItem {
  id: string;
  name: string;
  originalPrice: number;
  returnQuantity: number;
  maxQuantity: number;
  reason: string;
}

interface SalesReturnForm {
  invoiceNumber: string;
  returnDate: Date;
  customerId: string;
  customerName: string;
  items: ReturnItem[];
  totalRefundAmount: number;
  refundMethod: string;
  returnReason: string;
  notes: string;
  processingFee: string;
}

export default function SalesReturnForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [returnForm, setReturnForm] = useState<SalesReturnForm>({
    invoiceNumber: '',
    returnDate: new Date(),
    customerId: '',
    customerName: '',
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        originalPrice: 2999,
        returnQuantity: 1,
        maxQuantity: 2,
        reason: 'defective',
      },
      {
        id: '2',
        name: 'Smartphone Case',
        originalPrice: 799,
        returnQuantity: 0,
        maxQuantity: 1,
        reason: '',
      },
    ],
    totalRefundAmount: 0,
    refundMethod: 'original',
    returnReason: 'defective',
    notes: '',
    processingFee: '0',
  });

  const refundMethods = [
    {
      id: 'original',
      label: 'Original Payment',
      icon: RefreshCw,
      color: '#10B981',
    },
    { id: 'cash', label: 'Cash', icon: IndianRupee, color: '#3B82F6' },
    {
      id: 'store_credit',
      label: 'Store Credit',
      icon: Receipt,
      color: '#8B5CF6',
    },
    { id: 'bank', label: 'Bank Transfer', icon: FileText, color: '#F59E0B' },
  ];

  const returnReasons = [
    { id: 'defective', label: 'Defective Product', color: '#EF4444' },
    { id: 'wrong_item', label: 'Wrong Item', color: '#F59E0B' },
    { id: 'not_satisfied', label: 'Not Satisfied', color: '#8B5CF6' },
    { id: 'damaged', label: 'Damaged in Transit', color: '#EF4444' },
    { id: 'duplicate', label: 'Duplicate Order', color: '#3B82F6' },
    { id: 'other', label: 'Other', color: '#6B7280' },
  ];

  const calculateTotalRefund = () => {
    const itemsTotal = returnForm.items.reduce(
      (sum, item) => sum + item.returnQuantity * item.originalPrice,
      0
    );
    const fee = parseFloat(returnForm.processingFee) || 0;
    return Math.max(0, itemsTotal - fee);
  };

  const updateItemQuantity = (itemId: string, change: number) => {
    setReturnForm((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(
            0,
            Math.min(item.maxQuantity, item.returnQuantity + change)
          );
          return { ...item, returnQuantity: newQuantity };
        }
        return item;
      }),
    }));
  };

  const updateItemReason = (itemId: string, reason: string) => {
    setReturnForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, reason } : item
      ),
    }));
  };

  const handleSubmit = () => {
    const returningItems = returnForm.items.filter(
      (item) => item.returnQuantity > 0
    );

    if (returningItems.length === 0) {
      Alert.alert(
        'No Items Selected',
        'Please select at least one item to return.'
      );
      return;
    }

    if (!returnForm.invoiceNumber.trim()) {
      Alert.alert('Missing Information', 'Please enter the invoice number.');
      return;
    }

    console.log('Sales return submitted:', {
      ...returnForm,
      totalRefundAmount: calculateTotalRefund(),
      returningItems,
    });

    router.back();
  };

  const renderItemCard = (item: ReturnItem, index: number) => (
    <Animated.View key={item.id} entering={FadeInUp.delay(200 + index * 100)}>
      <BlurView
        intensity={themeType === 'dark' ? 10 : 60}
        tint={themeType}
        style={[
          styles.itemCard,
          item.returnQuantity > 0 && {
            borderColor: '#10B981',
            borderWidth: 2,
          },
        ]}
      >
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: theme.colors.text }]}>
              {item.name}
            </Text>
            <View style={styles.itemPrice}>
              <IndianRupee size={12} color={theme.colors.textSecondary} />
              <Text
                style={[
                  styles.itemPriceText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.originalPrice.toLocaleString('en-IN')} each
              </Text>
            </View>
          </View>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  backgroundColor:
                    item.returnQuantity === 0
                      ? 'rgba(107, 114, 128, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                },
              ]}
              onPress={() => updateItemQuantity(item.id, -1)}
              disabled={item.returnQuantity === 0}
            >
              <Minus
                size={16}
                color={item.returnQuantity === 0 ? '#6B7280' : '#EF4444'}
              />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={[styles.quantityText, { color: theme.colors.text }]}>
                {item.returnQuantity}
              </Text>
              <Text
                style={[
                  styles.maxQuantityText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                / {item.maxQuantity}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  backgroundColor:
                    item.returnQuantity >= item.maxQuantity
                      ? 'rgba(107, 114, 128, 0.1)'
                      : 'rgba(16, 185, 129, 0.1)',
                },
              ]}
              onPress={() => updateItemQuantity(item.id, 1)}
              disabled={item.returnQuantity >= item.maxQuantity}
            >
              <Plus
                size={16}
                color={
                  item.returnQuantity >= item.maxQuantity
                    ? '#6B7280'
                    : '#10B981'
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        {item.returnQuantity > 0 && (
          <View style={styles.itemReasonContainer}>
            <Text
              style={[
                styles.reasonLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Return Reason:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.reasonTags}>
                {returnReasons.map((reason) => (
                  <TouchableOpacity
                    key={reason.id}
                    style={[
                      styles.reasonTag,
                      {
                        backgroundColor:
                          item.reason === reason.id
                            ? reason.color
                            : 'rgba(255, 255, 255, 0.05)',
                        borderColor:
                          item.reason === reason.id
                            ? reason.color
                            : 'rgba(255, 255, 255, 0.1)',
                      },
                    ]}
                    onPress={() => updateItemReason(item.id, reason.id)}
                  >
                    <Text
                      style={[
                        styles.reasonTagText,
                        {
                          color:
                            item.reason === reason.id
                              ? '#FFFFFF'
                              : theme.colors.text,
                        },
                      ]}
                    >
                      {reason.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {item.returnQuantity > 0 && (
          <View style={styles.itemRefundAmount}>
            <Text
              style={[
                styles.refundLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Refund Amount:
            </Text>
            <View style={styles.refundAmountContainer}>
              <IndianRupee size={14} color="#10B981" />
              <Text style={styles.refundAmountText}>
                {(item.returnQuantity * item.originalPrice).toLocaleString(
                  'en-IN'
                )}
              </Text>
            </View>
          </View>
        )}
      </BlurView>
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Header */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#EF4444', '#DC2626', 'rgba(239, 68, 68, 0.2)', 'transparent']
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
              <RotateCcw size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Sales Return</Text>
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
          {/* Invoice Details */}
          <Animated.View entering={FadeInUp.delay(150)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Receipt size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Invoice Details
                </Text>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Hash size={16} color={theme.colors.primary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Invoice Number<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <View
                  style={[
                    styles.inputContainer,
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
                  <TextInput
                    style={[styles.textInput, { color: theme.colors.text }]}
                    value={returnForm.invoiceNumber}
                    onChangeText={(text) =>
                      setReturnForm({ ...returnForm, invoiceNumber: text })
                    }
                    placeholder="Enter invoice number"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color={theme.colors.secondary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Return Date<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
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
                  onPress={() => setShowDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text
                      style={[styles.dateText, { color: theme.colors.text }]}
                    >
                      {returnForm.returnDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  <Calendar size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={returnForm.returnDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setReturnForm({
                          ...returnForm,
                          returnDate: selectedDate,
                        });
                      }
                    }}
                  />
                )}
              </View>
            </BlurView>
          </Animated.View>

          {/* Return Items */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Package size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Return Items
                </Text>
              </View>

              {returnForm.items.map((item, index) =>
                renderItemCard(item, index)
              )}
            </BlurView>
          </Animated.View>

          {/* Refund Method */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <RefreshCw size={18} color={theme.colors.secondary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Refund Method
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.refundMethodsContainer}
              >
                {refundMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  const isSelected = returnForm.refundMethod === method.id;

                  return (
                    <Animated.View
                      key={method.id}
                      entering={FadeInDown.delay(350 + index * 50)}
                    >
                      <TouchableOpacity
                        style={[
                          styles.refundMethodTag,
                          {
                            backgroundColor: isSelected
                              ? method.color
                              : themeType === 'dark'
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(255, 255, 255, 0.8)',
                            borderColor: isSelected
                              ? method.color
                              : themeType === 'dark'
                              ? 'rgba(255, 255, 255, 0.08)'
                              : 'rgba(0, 0, 0, 0.06)',
                          },
                        ]}
                        onPress={() =>
                          setReturnForm({
                            ...returnForm,
                            refundMethod: method.id,
                          })
                        }
                      >
                        <View
                          style={[
                            styles.methodIconSmall,
                            {
                              backgroundColor: isSelected
                                ? 'rgba(255, 255, 255, 0.2)'
                                : `${method.color}15`,
                            },
                          ]}
                        >
                          <IconComponent
                            size={14}
                            color={isSelected ? '#FFFFFF' : method.color}
                          />
                        </View>

                        <Text
                          style={[
                            styles.methodTagText,
                            {
                              color: isSelected ? '#FFFFFF' : theme.colors.text,
                              fontWeight: isSelected ? '600' : '500',
                            },
                          ]}
                        >
                          {method.label}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </ScrollView>

              {/* Processing Fee */}
              <View style={styles.processingFeeContainer}>
                <View style={styles.labelContainer}>
                  <AlertCircle size={16} color="#F59E0B" />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Processing Fee (Optional)
                  </Text>
                </View>
                <View style={styles.feeInputContainer}>
                  <View
                    style={[
                      styles.currencyContainer,
                      {
                        backgroundColor: `${theme.colors.primary}15`,
                        borderColor: `${theme.colors.primary}20`,
                      },
                    ]}
                  >
                    <IndianRupee size={16} color={theme.colors.primary} />
                  </View>
                  <TextInput
                    style={[
                      styles.feeInput,
                      {
                        backgroundColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                        borderColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                        color: theme.colors.text,
                      },
                    ]}
                    placeholder="0.00"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="numeric"
                    value={returnForm.processingFee}
                    onChangeText={(text) =>
                      setReturnForm({ ...returnForm, processingFee: text })
                    }
                  />
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Notes */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Sparkles size={18} color={theme.colors.secondary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Additional Information
                </Text>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <MessageSquare size={16} color={theme.colors.secondary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Notes
                  </Text>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    styles.multilineContainer,
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
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.multilineInput,
                      { color: theme.colors.text },
                    ]}
                    value={returnForm.notes}
                    onChangeText={(text) =>
                      setReturnForm({ ...returnForm, notes: text })
                    }
                    placeholder="Add any additional notes about the return"
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: '#EF4444', shadowColor: '#EF4444' },
            ]}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.submitGradient}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Process Return</Text>
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
  refundSummary: {
    gap: 8,
  },
  refundRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refundLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  refundAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  refundAmountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: -0.2,
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
  itemCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  itemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemPriceText: {
    fontSize: 13,
    fontWeight: '500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityDisplay: {
    alignItems: 'center',
    minWidth: 40,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
  },
  maxQuantityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  itemReasonContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  reasonTags: {
    flexDirection: 'row',
    gap: 8,
  },
  reasonTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  reasonTagText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  itemRefundAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  refundAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  refundMethodsContainer: {
    paddingRight: 20,
    gap: 8,
    marginBottom: 20,
  },
  refundMethodTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    minWidth: 100,
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
  processingFeeContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  feeInputContainer: {
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
  feeInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
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
});
