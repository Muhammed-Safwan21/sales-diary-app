import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Package, Save, Receipt, ChevronDown, Check, Layers, BarChart3, MessageSquare, Clock, Plus, Minus, AlertTriangle } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface StockAdjustmentForm {
  date: Date;
  product: string;
  currentStock: string;
  adjustedStock: string;
  adjustmentType: 'increase' | 'decrease' | '';
  reference: string;
}

interface DropdownItem {
  id: string;
  label: string;
  value: string;
  currentStock?: number;
}

const products: DropdownItem[] = [
  { id: 'product1', label: 'Wireless Headphones', value: 'wireless-headphones', currentStock: 45 },
  { id: 'product2', label: 'Bluetooth Speaker', value: 'bluetooth-speaker', currentStock: 23 },
  { id: 'product3', label: 'Smartphone Case', value: 'smartphone-case', currentStock: 67 },
  { id: 'product4', label: 'USB-C Cable', value: 'usb-c-cable', currentStock: 112 },
  { id: 'product5', label: 'Power Bank', value: 'power-bank', currentStock: 34 },
  { id: 'product6', label: 'Screen Protector', value: 'screen-protector', currentStock: 89 },
];

export default function StockAdjustmentScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [adjustmentForm, setAdjustmentForm] = useState<StockAdjustmentForm>({
    date: new Date(),
    product: '',
    currentStock: '',
    adjustedStock: '',
    adjustmentType: '',
    reference: '',
  });

  const selectedProduct = products.find(p => p.value === adjustmentForm.product);
  const currentStockValue = selectedProduct?.currentStock || 0;
  const adjustedStockValue = parseInt(adjustmentForm.adjustedStock) || 0;
  const stockDifference = adjustedStockValue - currentStockValue;
  const adjustmentType = stockDifference > 0 ? 'increase' : stockDifference < 0 ? 'decrease' : '';

  // Update adjustment type when adjusted stock changes
  React.useEffect(() => {
    if (selectedProduct && adjustmentForm.adjustedStock) {
      setAdjustmentForm(prev => ({
        ...prev,
        currentStock: selectedProduct.currentStock?.toString() || '0',
        adjustmentType: adjustmentType as 'increase' | 'decrease' | ''
      }));
    }
  }, [adjustmentForm.product, adjustmentForm.adjustedStock]);

  const handleSubmit = () => {
    console.log('Stock adjustment submitted:', {
      ...adjustmentForm,
      stockDifference,
      adjustmentType
    });
    router.back();
  };

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: (DropdownItem)[],
    selectedValue: string,
    onSelect: (value: string, label?: string) => void,
    showStock = false
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
                  <View style={styles.dropdownItemContent}>
                    <Text style={[
                      styles.dropdownItemText,
                      {
                        color: isSelected ? theme.colors.primary : theme.colors.text,
                        fontWeight: isSelected ? '600' : '500',
                      }
                    ]}>
                      {item.label}
                    </Text>
                    {showStock && 'currentStock' in item && (
                      <Text style={[styles.stockText, { color: theme.colors.textSecondary }]}>
                        Stock: {item.currentStock}
                      </Text>
                    )}
                  </View>
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
    required = false,
    editable = true
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
        !editable && styles.disabledContainer,
        {
          backgroundColor: !editable 
            ? (themeType === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)')
            : (themeType === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'),
          borderColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
        }
      ]}>
        <TextInput
          style={[
            styles.textInput,
            multiline && styles.multilineInput,
            { color: editable ? theme.colors.text : theme.colors.textSecondary }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          editable={editable}
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
      
      {/* Header with orange gradient for stock adjustment */}
      <LinearGradient
        colors={themeType === 'dark' 
          ? ['#7C2D12', '#EA580C', 'rgba(234, 88, 12, 0.3)', 'transparent'] 
          : ['#F59E0B', '#FBBF24', 'rgba(251, 191, 36, 0.2)', 'transparent']
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
              <Package size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Stock Adjustment</Text>
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
          {/* Basic Information */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Package size={18} color="#F59E0B" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Adjustment Details
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
                      {adjustmentForm.date.toLocaleDateString('en-IN', {
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
                    value={adjustmentForm.date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setAdjustmentForm({ ...adjustmentForm, date: selectedDate });
                      }
                    }}
                  />
                )}
              </View>

              {/* Product Selection */}
              {renderDropdownInput(
                'Product',
                products.find(p => p.value === adjustmentForm.product)?.label || '',
                'Select product to adjust',
                <Layers size={16} color="#F59E0B" />,
                () => setShowProductDropdown(true),
                true
              )}

              {/* Reference Number */}
              {renderFormInput(
                'Reference Number',
                adjustmentForm.reference,
                (text) => setAdjustmentForm({ ...adjustmentForm, reference: text }),
                'Enter reference/batch number',
                <Receipt size={16} color={theme.colors.accent} />
              )}
            </BlurView>
          </Animated.View>

          {/* Stock Information */}
          {adjustmentForm.product && (
            <Animated.View entering={FadeInUp.delay(300)}>
              <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <BarChart3 size={18} color={theme.colors.accent} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Stock Levels
                  </Text>
                </View>

                {/* Current Stock (Read-only) */}
                {renderFormInput(
                  'Current Stock',
                  currentStockValue.toString(),
                  () => {},
                  'Current stock level',
                  <Package size={16} color={theme.colors.secondary} />,
                  'numeric',
                  false,
                  false,
                  false
                )}

                {/* New Stock Level */}
                {renderFormInput(
                  'New Stock Level',
                  adjustmentForm.adjustedStock,
                  (text) => setAdjustmentForm({ ...adjustmentForm, adjustedStock: text }),
                  'Enter new stock level',
                  <BarChart3 size={16} color="#F59E0B" />,
                  'numeric',
                  false,
                  true
                )}

                {/* Stock Difference Display */}
                {adjustmentForm.adjustedStock && stockDifference !== 0 && (
                  <View style={[
                    styles.differenceContainer,
                    {
                      backgroundColor: stockDifference > 0 
                        ? 'rgba(34, 197, 94, 0.1)' 
                        : 'rgba(239, 68, 68, 0.1)',
                      borderColor: stockDifference > 0 
                        ? 'rgba(34, 197, 94, 0.2)' 
                        : 'rgba(239, 68, 68, 0.2)',
                    }
                  ]}>
                    <View style={styles.differenceHeader}>
                      {stockDifference > 0 ? (
                        <Plus size={16} color="#22C55E" />
                      ) : (
                        <Minus size={16} color="#EF4444" />
                      )}
                      <Text style={[
                        styles.differenceLabel,
                        { color: stockDifference > 0 ? '#22C55E' : '#EF4444' }
                      ]}>
                        {stockDifference > 0 ? 'Stock Increase' : 'Stock Decrease'}
                      </Text>
                    </View>
                    <Text style={[
                      styles.differenceValue,
                      { color: stockDifference > 0 ? '#22C55E' : '#EF4444' }
                    ]}>
                      {stockDifference > 0 ? '+' : ''}{stockDifference} units
                    </Text>
                  </View>
                )}
              </BlurView>
            </Animated.View>
          )}

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
                colors={['#F59E0B', '#FBBF24']}
                style={styles.submitGradient}
              >
                <Package size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Update Stock</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {/* Dropdown Modals */}
      {renderDropdownModal(
        showProductDropdown,
        () => setShowProductDropdown(false),
        'Select Product',
        products,
        adjustmentForm.product,
        (value, label) => setAdjustmentForm({ ...adjustmentForm, product: value }),
        true
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
  disabledContainer: {
    opacity: 0.6,
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
  differenceContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
  },
  differenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  differenceLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  differenceValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
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
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
});