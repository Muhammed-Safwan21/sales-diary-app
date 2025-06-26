import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Plus,
  Trash2,
  Save,
  FileText,
  Package,
  IndianRupee,
  Percent,
  User,
  ChevronDown,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { KeyboardAvoidingView } from 'react-native';

// Mock customers data
const customers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Acme Corp' },
  { id: '3', name: 'Jane Smith' },
  { id: '4', name: 'Global Traders' },
  { id: '5', name: 'Mega Supplies' },
];

interface InvoiceItem {
  id: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  taxRate: string;
  taxAmount: number;
  discountRate: string;
  discountAmount: number;
  subtotal: number;
  total: number;
}

interface SalesInvoice {
  customerId: string;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  notes: string;
  paymentStatus: 'pending' | 'partial' | 'paid';
}

export default function SalesInvoiceForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState<'invoiceDate' | 'dueDate' | null>(null);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoice, setInvoice] = useState<SalesInvoice>({
    customerId: '',
    customerName: '',
    invoiceNumber: '',
    invoiceDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    items: [
      {
        id: '1',
        productName: '',
        quantity: '',
        unitPrice: '',
        taxRate: '',
        taxAmount: 0,
        discountRate: '',
        discountAmount: 0,
        subtotal: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    totalTax: 0,
    totalDiscount: 0,
    totalAmount: 0,
    notes: '',
    paymentStatus: 'pending',
  });

  const calculateItemTotals = (item: InvoiceItem): InvoiceItem => {
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    const discountRate = parseFloat(item.discountRate) || 0;
    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discountRate) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * taxRate) / 100;
    const total = afterDiscount + taxAmount;
    return {
      ...item,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
  };

  const calculateTotals = () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalTax = invoice.items.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalDiscount = invoice.items.reduce((sum, item) => sum + item.discountAmount, 0);
    const totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);
    setInvoice((prev) => ({
      ...prev,
      subtotal,
      totalTax,
      totalDiscount,
      totalAmount,
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [invoice.items]);

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          id: Date.now().toString(),
          productName: '',
          quantity: '',
          unitPrice: '',
          taxRate: '',
          taxAmount: 0,
          discountRate: '',
          discountAmount: 0,
          subtotal: 0,
          total: 0,
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (invoice.items.length > 1) {
      setInvoice({
        ...invoice,
        items: invoice.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          return calculateItemTotals(updatedItem);
        }
        return item;
      }),
    });
  };

  const handleCustomerSelect = (customer: any) => {
    setInvoice({
      ...invoice,
      customerName: customer.name,
      customerId: customer.id,
    });
    setShowCustomerDropdown(false);
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsCreatingInvoice(true);
    try {
      setTimeout(() => {
        setIsCreatingInvoice(false);
        router.back();
      }, 1000);
    } catch (error) {
      setIsCreatingInvoice(false);
    }
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string,
    rightIcon?: React.ReactNode,
    editable = true,
    onPress?: () => void
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>
      <TouchableOpacity
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
        onPress={onPress}
        disabled={!onPress}
      >
        <TextInput
          style={[styles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          editable={editable}
        />
        {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
      </TouchableOpacity>
    </View>
  );

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: any[],
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
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text style={[styles.modalCloseText, { color: theme.colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item) => {
              const isSelected = selectedValue === (item.value || item.id);
              const displayText = item.label || item.name;
              const selectValue = item.value || item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dropdownItem,
                    {
                      backgroundColor: isSelected
                        ? `${theme.colors.primary}15`
                        : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    onSelect(selectValue, displayText);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      {
                        color: isSelected
                          ? theme.colors.primary
                          : theme.colors.text,
                        fontWeight: isSelected ? '600' : '500',
                      },
                    ]}
                  >
                    {displayText}
                  </Text>
                  {isSelected && <ChevronDown size={16} color={theme.colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </BlurView>
      </View>
    </Modal>
  );

  const renderItemRow = (item: InvoiceItem, index: number) => (
    <View
      key={item.id}
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.02)',
          borderColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0, 0, 0, 0.04)',
        },
      ]}
    >
      <View style={styles.itemHeader}>
        <Text style={[styles.itemNumber, { color: theme.colors.primary }]}>Item {index + 1}</Text>
        {invoice.items.length > 1 && (
          <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={[
          styles.itemInput,
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
            marginBottom: 12,
          },
        ]}
        placeholder="Product name"
        placeholderTextColor={theme.colors.textSecondary}
        value={item.productName}
        onChangeText={(text) => updateItem(item.id, 'productName', text)}
      />
      <View style={styles.itemRow}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Qty</Text>
          <TextInput
            style={[
              styles.itemInputSmall,
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
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.quantity}
            onChangeText={(text) => updateItem(item.id, 'quantity', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Price</Text>
          <TextInput
            style={[
              styles.itemInputMedium,
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
            value={item.unitPrice}
            onChangeText={(text) => updateItem(item.id, 'unitPrice', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Tax %</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[
                styles.itemInputSmall,
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
                  paddingRight: 24,
                },
              ]}
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={item.taxRate}
              onChangeText={(text) => updateItem(item.id, 'taxRate', text)}
            />
            <Percent size={12} color={theme.colors.textSecondary} style={styles.percentIcon} />
          </View>
        </View>
      </View>
      <View style={styles.itemRow}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Tax Amt</Text>
          <View style={[
            styles.itemInputSmall,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(0, 0, 0, 0.04)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
            <Text style={[{ color: theme.colors.textSecondary, fontSize: 13 }]}>₹{item.taxAmount.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Discount %</Text>
          <TextInput
            style={[
              styles.itemInputMedium,
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
            value={item.discountRate}
            onChangeText={(text) => updateItem(item.id, 'discountRate', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Discount Amt</Text>
          <View style={[
            styles.itemInputSmall,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(0, 0, 0, 0.04)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
            <Text style={[{ color: '#EF4444', fontSize: 13 }]}>₹{item.discountAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.displayRow}>
        <View style={styles.displayField}>
          <Text style={[styles.displayLabel, { color: theme.colors.textSecondary }]}>Item Total</Text>
        </View>
        <View style={[
          styles.totalContainer,
          { backgroundColor: `${theme.colors.primary}${themeType === 'dark' ? '15' : '10'}` },
        ]}>
          <IndianRupee size={14} color={theme.colors.primary} />
          <Text style={[styles.totalValue, { color: theme.colors.primary }]}>{item.total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <BlurView
      intensity={themeType === 'dark' ? 20 : 80}
      tint={themeType}
      style={styles.footer}
    >
      <View style={styles.footerContent}>
        <TouchableOpacity
          style={[
            styles.draftButton,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.08)',
              opacity: isCreatingInvoice ? 0.5 : 1,
            },
          ]}
          disabled={isCreatingInvoice}
          onPress={() => handleSubmit(true)}
        >
          {isCreatingInvoice ? (
            <ActivityIndicator size="small" color={theme.colors.textSecondary} />
          ) : (
            <Save size={20} color={theme.colors.textSecondary} />
          )}
          <Text style={[styles.draftButtonText, { color: theme.colors.textSecondary }]}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
              opacity: isCreatingInvoice ? 0.5 : 1,
            },
          ]}
          disabled={isCreatingInvoice}
          onPress={() => handleSubmit(false)}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
            style={styles.saveGradient}
          >
            <View style={styles.saveButtonContent}>
              {isCreatingInvoice ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <FileText size={20} color="#FFFFFF" />
              )}
              <Text style={styles.saveButtonText}>{isCreatingInvoice ? 'Creating...' : 'Create Invoice'}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
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
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Create Sales Invoice</Text>
            </View>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoid}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Invoice Details</Text>
              </View>
              {renderFormInput(
                'Customer',
                customers.find((c) => c.id === invoice.customerId)?.name || '',
                () => {},
                'Select or add customer',
                <User size={18} color={theme.colors.textSecondary} />, false,
                () => setShowCustomerDropdown(true)
              )}
              {renderFormInput(
                'Invoice Number',
                invoice.invoiceNumber,
                (text) => setInvoice({ ...invoice, invoiceNumber: text }),
                'Enter invoice number'
              )}
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}> <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Invoice Date</Text>
                  <TouchableOpacity
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
                    onPress={() => setShowDatePicker('invoiceDate')}
                  >
                    <Text style={[styles.textInput, { color: theme.colors.text }]}> {invoice.invoiceDate.toLocaleDateString()} </Text>
                    <View style={styles.inputIcon}> <Calendar size={18} color={theme.colors.textSecondary} /> </View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}> <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Due Date</Text>
                  <TouchableOpacity
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
                    onPress={() => setShowDatePicker('dueDate')}
                  >
                    <Text style={[styles.textInput, { color: theme.colors.text }]}> {invoice.dueDate.toLocaleDateString()} </Text>
                    <View style={styles.inputIcon}> <Calendar size={18} color={theme.colors.textSecondary} /> </View>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Package size={18} color="#6366F1" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Invoice Items</Text>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: `#6366F120`, borderColor: `#6366F140` }]} onPress={addItem}> <Plus size={16} color="#6366F1" /> </TouchableOpacity>
              </View>
              {invoice.items.map((item, index) => renderItemRow(item, index))}
            </BlurView>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Additional Details</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Notes (Optional)</Text>
                <View style={[styles.inputContainer, styles.notesContainer, {
                  backgroundColor: themeType === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: themeType === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                }]}> <TextInput style={[styles.textInput, styles.notesInput, { color: theme.colors.text }]} value={invoice.notes} onChangeText={(text) => setInvoice({ ...invoice, notes: text })} placeholder="Add any notes for this invoice..." placeholderTextColor={theme.colors.textSecondary} multiline numberOfLines={3} textAlignVertical="top" /> </View>
              </View>
            </BlurView>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(500)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color="#6366F1" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Summary</Text>
              </View>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Subtotal</Text>
                  <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{invoice.subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Tax</Text>
                  <Text style={[styles.summaryValue, { color: theme.colors.secondary }]}>₹{invoice.totalTax.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Discount</Text>
                  <Text style={[styles.summaryValue, { color: '#EF4444' }]}>-₹{invoice.totalDiscount.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: theme.colors.border }]} />
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryTotalLabel, { color: theme.colors.text }]}>Total Amount</Text>
                  <Text style={[styles.summaryTotalValue, { color: theme.colors.primary }]}>₹{invoice.totalAmount.toFixed(2)}</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>
        {renderFooter()}
      </KeyboardAvoidingView>
      {renderDropdownModal(
        showCustomerDropdown,
        () => setShowCustomerDropdown(false),
        'Select Customer',
        customers,
        invoice.customerId,
        (value, label) => setInvoice({ ...invoice, customerId: value, customerName: label || '' })
      )}
      {showDatePicker && (
        <DateTimePicker
          value={showDatePicker === 'invoiceDate' ? invoice.invoiceDate : invoice.dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(null);
            if (selectedDate) {
              setInvoice({
                ...invoice,
                [showDatePicker === 'invoiceDate' ? 'invoiceDate' : 'dueDate']: selectedDate,
              });
            }
          }}
        />
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
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
    marginLeft: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  inputIcon: {
    marginLeft: 8,
  },
  addButton: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  itemContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  itemInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemInputSmall: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemInputMedium: {
    flex: 2,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  inputWithIcon: {
    flex: 1,
    position: 'relative',
  },
  percentIcon: {
    position: 'absolute',
    right: 6,
    top: '50%',
    transform: [{ translateY: -6 }],
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  displayField: {
    flex: 1,
    alignItems: 'center',
  },
  displayLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  totalContainer: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryContainer: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
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
  saveButton: {
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
        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  saveGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  notesContainer: {
    minHeight: 80,
  },
  notesInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
});
