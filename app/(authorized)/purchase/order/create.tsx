import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ShoppingCart, Save, Receipt, ChevronDown, Check, Building, Package, IndianRupee, MessageSquare, Clock, Plus, Minus, Trash2, User, Phone, Mail, MapPin } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface PurchaseOrderItem {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  total: number;
}

interface PurchaseOrderForm {
  orderNumber: string;
  orderDate: Date;
  requiredDate: Date;
  supplier: string;
  supplierContact: string;
  supplierEmail: string;
  supplierAddress: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  taxRate: string;
  taxAmount: number;
  totalAmount: number;
  notes: string;
  terms: string;
  status: string;
}

interface DropdownItem {
  id: string;
  label: string;
  value: string;
  contact?: string;
  email?: string;
  address?: string;
}

const suppliers: DropdownItem[] = [
  { 
    id: 'supplier1', 
    label: 'ABC Electronics Pvt Ltd', 
    value: 'abc_electronics',
    contact: '+91 9876543210',
    email: 'orders@abcelectronics.com',
    address: '123 Industrial Area, Sector 21, Gurgaon, Haryana - 122001'
  },
  { 
    id: 'supplier2', 
    label: 'XYZ Manufacturing Co.', 
    value: 'xyz_manufacturing',
    contact: '+91 8765432109',
    email: 'purchase@xyzmanufacturing.in',
    address: '456 Commercial Complex, Phase 2, Noida, UP - 201301'
  },
  { 
    id: 'supplier3', 
    label: 'Tech Solutions India', 
    value: 'tech_solutions',
    contact: '+91 7654321098',
    email: 'sales@techsolutions.co.in',
    address: '789 Tech Park, Electronic City, Bangalore, Karnataka - 560100'
  },
  { 
    id: 'supplier4', 
    label: 'Global Traders Ltd', 
    value: 'global_traders',
    contact: '+91 6543210987',
    email: 'info@globaltraders.com',
    address: '321 Business Hub, Andheri East, Mumbai, Maharashtra - 400069'
  },
];

const statusOptions: DropdownItem[] = [
  { id: 'draft', label: 'Draft', value: 'draft' },
  { id: 'pending', label: 'Pending Approval', value: 'pending' },
  { id: 'approved', label: 'Approved', value: 'approved' },
  { id: 'sent', label: 'Sent to Supplier', value: 'sent' },
];

export default function CreatePurchaseOrderScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showRequiredDatePicker, setShowRequiredDatePicker] = useState(false);
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [purchaseOrderForm, setPurchaseOrderForm] = useState<PurchaseOrderForm>({
    orderNumber: `PO-${Date.now().toString().slice(-6)}`,
    orderDate: new Date(),
    requiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    supplier: '',
    supplierContact: '',
    supplierEmail: '',
    supplierAddress: '',
    items: [
      { id: '1', description: '', quantity: '', unitPrice: '', total: 0 }
    ],
    subtotal: 0,
    taxRate: '18',
    taxAmount: 0,
    totalAmount: 0,
    notes: '',
    terms: 'Payment due within 30 days of delivery',
    status: 'draft',
  });

  const calculateItemTotal = (quantity: string, unitPrice: string): number => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    return qty * price;
  };

  const calculateTotals = () => {
    const subtotal = purchaseOrderForm.items.reduce((sum, item) => {
      return sum + calculateItemTotal(item.quantity, item.unitPrice);
    }, 0);
    
    const taxRate = parseFloat(purchaseOrderForm.taxRate) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const totalAmount = subtotal + taxAmount;

    setPurchaseOrderForm(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount
    }));
  };

  const updateItem = (index: number, field: keyof PurchaseOrderItem, value: string) => {
    const updatedItems = [...purchaseOrderForm.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
      total: field === 'quantity' || field === 'unitPrice' 
        ? calculateItemTotal(
            field === 'quantity' ? value : updatedItems[index].quantity,
            field === 'unitPrice' ? value : updatedItems[index].unitPrice
          )
        : updatedItems[index].total
    };
    
    setPurchaseOrderForm(prev => ({ ...prev, items: updatedItems }));
    setTimeout(calculateTotals, 100);
  };

  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: Date.now().toString(),
      description: '',
      quantity: '',
      unitPrice: '',
      total: 0
    };
    setPurchaseOrderForm(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    if (purchaseOrderForm.items.length > 1) {
      const updatedItems = purchaseOrderForm.items.filter((_, i) => i !== index);
      setPurchaseOrderForm(prev => ({ ...prev, items: updatedItems }));
      setTimeout(calculateTotals, 100);
    }
  };

  const handleSupplierSelect = (supplierValue: string) => {
    const selectedSupplier = suppliers.find(s => s.value === supplierValue);
    if (selectedSupplier) {
      setPurchaseOrderForm(prev => ({
        ...prev,
        supplier: supplierValue,
        supplierContact: selectedSupplier.contact || '',
        supplierEmail: selectedSupplier.email || '',
        supplierAddress: selectedSupplier.address || ''
      }));
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!purchaseOrderForm.supplier) {
      Alert.alert('Error', 'Please select a supplier');
      return;
    }
    
    if (purchaseOrderForm.items.some(item => !item.description || !item.quantity || !item.unitPrice)) {
      Alert.alert('Error', 'Please fill in all item details');
      return;
    }

    console.log('Purchase Order submitted:', purchaseOrderForm);
    Alert.alert('Success', 'Purchase Order created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: DropdownItem[],
    selectedValue: string,
    onSelect: (value: string) => void
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
                    onSelect(item.value);
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
      
      {/* Header with Cyan Gradient */}
      <LinearGradient
        colors={themeType === 'dark' 
          ? ['#164E63', '#0891B2', 'rgba(6, 182, 212, 0.3)', 'transparent'] 
          : ['#06B6D4', '#22D3EE', 'rgba(34, 211, 238, 0.2)', 'transparent']
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
              <ShoppingCart size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Create Purchase Order</Text>
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
          {/* Order Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <ShoppingCart size={18} color="#06B6D4" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Order Details
                </Text>
              </View>

              {/* Order Number */}
              {renderFormInput(
                'Order Number',
                purchaseOrderForm.orderNumber,
                (text) => setPurchaseOrderForm({ ...purchaseOrderForm, orderNumber: text }),
                'Enter order number',
                <Receipt size={16} color="#06B6D4" />,
                'default',
                false,
                true
              )}

              {/* Order Date */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color="#22D3EE" />
                  <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                    Order Date<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.dateContainer, {
                    backgroundColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    borderColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)',
                  }]}
                  onPress={() => setShowOrderDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.dateText, { color: theme.colors.text }]}>
                      {purchaseOrderForm.orderDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Calendar size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showOrderDatePicker && (
                  <DateTimePicker
                    value={purchaseOrderForm.orderDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowOrderDatePicker(false);
                      if (selectedDate) {
                        setPurchaseOrderForm({ ...purchaseOrderForm, orderDate: selectedDate });
                      }
                    }}
                  />
                )}
              </View>

              {/* Required Date */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color="#0891B2" />
                  <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                    Required Date<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.dateContainer, {
                    backgroundColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    borderColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)',
                  }]}
                  onPress={() => setShowRequiredDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.dateText, { color: theme.colors.text }]}>
                      {purchaseOrderForm.requiredDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Calendar size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showRequiredDatePicker && (
                  <DateTimePicker
                    value={purchaseOrderForm.requiredDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowRequiredDatePicker(false);
                      if (selectedDate) {
                        setPurchaseOrderForm({ ...purchaseOrderForm, requiredDate: selectedDate });
                      }
                    }}
                  />
                )}
              </View>

              {/* Status */}
              {/* {renderDropdownInput(
                'Status',
                statusOptions.find(status => status.value === purchaseOrderForm.status)?.label || '',
                'Select status',
                <Package size={16} color="#0D9488" />,
                () => setShowStatusDropdown(true),
                true
              )} */}
            </BlurView>
          </Animated.View>

          {/* Supplier Information */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Building size={18} color="#0891B2" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Supplier Information
                </Text>
              </View>

              {/* Supplier Selection */}
              {renderDropdownInput(
                'Supplier',
                suppliers.find(supplier => supplier.value === purchaseOrderForm.supplier)?.label || '',
                'Select supplier',
                <Building size={16} color="#06B6D4" />,
                () => setShowSupplierDropdown(true),
                true
              )}

              {/* Supplier Contact Details */}
              {purchaseOrderForm.supplier && (
                <>
                  {renderFormInput(
                    'Contact Number',
                    purchaseOrderForm.supplierContact,
                    (text) => setPurchaseOrderForm({ ...purchaseOrderForm, supplierContact: text }),
                    'Supplier contact number',
                    <Phone size={16} color="#22D3EE" />,
                    'phone-pad'
                  )}

                  {renderFormInput(
                    'Email',
                    purchaseOrderForm.supplierEmail,
                    (text) => setPurchaseOrderForm({ ...purchaseOrderForm, supplierEmail: text }),
                    'Supplier email address',
                    <Mail size={16} color="#0891B2" />,
                    'email-address'
                  )}

                  {renderFormInput(
                    'Address',
                    purchaseOrderForm.supplierAddress,
                    (text) => setPurchaseOrderForm({ ...purchaseOrderForm, supplierAddress: text }),
                    'Supplier address',
                    <MapPin size={16} color="#0D9488" />,
                    'default',
                    true
                  )}
                </>
              )}
            </BlurView>
          </Animated.View>

          {/* Items */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Package size={18} color="#22D3EE" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Items
                </Text>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: `#06B6D4${themeType === 'dark' ? '20' : '15'}` }]}
                  onPress={addItem}
                >
                  <Plus size={16} color="#06B6D4" />
                </TouchableOpacity>
              </View>

              {purchaseOrderForm.items.map((item, index) => (
                <View key={item.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemNumber, { color: theme.colors.text }]}>
                      Item {index + 1}
                    </Text>
                    {purchaseOrderForm.items.length > 1 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeItem(index)}
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>

                  <TextInput
                    style={[
                      styles.itemInput,
                      {
                        backgroundColor: themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                        borderColor: themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                        color: theme.colors.text
                      }
                    ]}
                    placeholder="Item description"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={item.description}
                    onChangeText={(text) => updateItem(index, 'description', text)}
                  />

                  <View style={styles.itemRow}>
                    <TextInput
                      style={[
                        styles.itemInputSmall,
                        {
                          backgroundColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                          borderColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                          color: theme.colors.text
                        }
                      ]}
                      placeholder="Qty"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      value={item.quantity}
                      onChangeText={(text) => updateItem(index, 'quantity', text)}
                    />

                    <TextInput
                      style={[
                        styles.itemInputMedium,
                        {
                          backgroundColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                          borderColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                          color: theme.colors.text
                        }
                      ]}
                      placeholder="Unit Price"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      value={item.unitPrice}
                      onChangeText={(text) => updateItem(index, 'unitPrice', text)}
                    />

                    <View style={styles.totalContainer}>
                      <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
                        Total
                      </Text>
                      <Text style={[styles.totalValue, { color: theme.colors.text }]}>
                        ₹{item.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </BlurView>
          </Animated.View>

          {/* Total Calculation */}
          <Animated.View entering={FadeInUp.delay(500)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color="#0D9488" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Totals
                </Text>
              </View>

              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <Text style={[styles.totalRowLabel, { color: theme.colors.textSecondary }]}>
                    Subtotal
                  </Text>
                  <Text style={[styles.totalRowValue, { color: theme.colors.text }]}>
                    ₹{purchaseOrderForm.subtotal.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.taxRow}>
                  <View style={styles.taxInputContainer}>
                    <Text style={[styles.totalRowLabel, { color: theme.colors.textSecondary }]}>
                      Tax Rate (%)
                    </Text>
                    <TextInput
                      style={[
                        styles.taxInput,
                        {
                          backgroundColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                          borderColor: themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                          color: theme.colors.text
                        }
                      ]}
                      placeholder="18"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      value={purchaseOrderForm.taxRate}
                      onChangeText={(text) => {
                        setPurchaseOrderForm({ ...purchaseOrderForm, taxRate: text });
                        setTimeout(calculateTotals, 100);
                      }}
                    />
                  </View>
                  <Text style={[styles.totalRowValue, { color: theme.colors.text }]}>
                    ₹{purchaseOrderForm.taxAmount.toFixed(2)}
                  </Text>
                </View>

                <View style={[styles.totalRow, styles.grandTotalRow]}>
                  <Text style={[styles.grandTotalLabel, { color: theme.colors.text }]}>
                    Total Amount
                  </Text>
                  <Text style={[styles.grandTotalValue, { color: '#06B6D4' }]}>
                    ₹{purchaseOrderForm.totalAmount.toFixed(2)}
                  </Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Information */}
          <Animated.View entering={FadeInUp.delay(600)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <MessageSquare size={18} color="#0891B2" />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'Terms & Conditions',
                purchaseOrderForm.terms,
                (text) => setPurchaseOrderForm({ ...purchaseOrderForm, terms: text }),
                'Enter terms and conditions',
                <Receipt size={16} color="#22D3EE" />,
                'default',
                true
              )}

              {renderFormInput(
                'Notes',
                purchaseOrderForm.notes,
                (text) => setPurchaseOrderForm({ ...purchaseOrderForm, notes: text }),
                'Add any additional notes or special instructions',
                <MessageSquare size={16} color="#0D9488" />,
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
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#06B6D4', '#22D3EE']}
                style={styles.submitGradient}
              >
                <ShoppingCart size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Create Order</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {/* Dropdown Modals */}
      {renderDropdownModal(
        showSupplierDropdown,
        () => setShowSupplierDropdown(false),
        'Select Supplier',
        suppliers,
        purchaseOrderForm.supplier,
        handleSupplierSelect
      )}

      {renderDropdownModal(
        showStatusDropdown,
        () => setShowStatusDropdown(false),
        'Select Status',
        statusOptions,
        purchaseOrderForm.status,
        (value) => setPurchaseOrderForm({ ...purchaseOrderForm, status: value })
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
    flex: 1,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Item styles
  itemContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.1)',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  itemInputSmall: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemInputMedium: {
    flex: 2,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  totalContainer: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  // Total section styles
  totalSection: {
    gap: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalRowLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRowValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  taxInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taxInput: {
    width: 60,
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(6, 182, 212, 0.2)',
    paddingTop: 12,
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  grandTotalValue: {
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