import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  FlatList,
  Alert,
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
  ShoppingCart,
  Save,
  Receipt,
  ChevronDown,
  Check,
  Building,
  Package,
  IndianRupee,
  MessageSquare,
  Clock,
  Plus,
  Minus,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  Percent,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface PurchaseOrderItem {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  taxRate: string;
  taxAmount: number;
  discountRate: string;
  discountAmount: number;
  subtotal: number;
  total: number;
}

interface PurchaseOrderForm {
  orderNumber: string;
  orderDate: Date;
  supplier: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  notes: string;
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
    address: '123 Industrial Area, Sector 21, Gurgaon, Haryana - 122001',
  },
  {
    id: 'supplier2',
    label: 'XYZ Manufacturing Co.',
    value: 'xyz_manufacturing',
    contact: '+91 8765432109',
    email: 'purchase@xyzmanufacturing.in',
    address: '456 Commercial Complex, Phase 2, Noida, UP - 201301',
  },
  {
    id: 'supplier3',
    label: 'Tech Solutions India',
    value: 'tech_solutions',
    contact: '+91 7654321098',
    email: 'sales@techsolutions.co.in',
    address: '789 Tech Park, Electronic City, Bangalore, Karnataka - 560100',
  },
  {
    id: 'supplier4',
    label: 'Global Traders Ltd',
    value: 'global_traders',
    contact: '+91 6543210987',
    email: 'info@globaltraders.com',
    address: '321 Business Hub, Andheri East, Mumbai, Maharashtra - 400069',
  },
];

const statusOptions: DropdownItem[] = [
  { id: 'draft', label: 'Draft', value: 'draft' },
  { id: 'pending', label: 'Pending Approval', value: 'pending' },
  { id: 'approved', label: 'Approved', value: 'approved' },
  { id: 'sent', label: 'Sent to Supplier', value: 'sent' },
];

export default function PurchaseOrderFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showRequiredDatePicker, setShowRequiredDatePicker] = useState(false);
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);

  const [purchaseOrderForm, setPurchaseOrderForm] = useState<PurchaseOrderForm>(
    {
      orderNumber: `PO-${Date.now().toString().slice(-6)}`,
      orderDate: new Date(),
      supplier: '',
      items: [
        {
          id: '1',
          description: '',
          quantity: '',
          unitPrice: '',
          discountAmount: 0,
          discountRate: '',
          subtotal: 0,
          taxAmount: 0,
          taxRate: '',
          total: 0,
        },
      ],
      subtotal: 0,
      totalTax: 0,
      totalDiscount: 0,
      totalAmount: 0,
      notes: '',
    }
  );

  // Calculate individual item totals
  const calculateItemTotals = (item: PurchaseOrderItem) => {
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const discountRate = parseFloat(item.discountRate) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;

    // Calculate subtotal (quantity * unit price)
    const subtotal = quantity * unitPrice;

    // Calculate discount amount
    const discountAmount = (subtotal * discountRate) / 100;

    // Calculate amount after discount
    const amountAfterDiscount = subtotal - discountAmount;

    // Calculate tax amount on discounted amount
    const taxAmount = (amountAfterDiscount * taxRate) / 100;

    // Calculate final total
    const total = amountAfterDiscount + taxAmount;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
  };
  const calculateTotals = () => {
    let orderSubtotal = 0;
    let orderTotalTax = 0;
    let orderTotalDiscount = 0;
    let orderTotalAmount = 0;

    purchaseOrderForm.items.forEach((item) => {
      const calculations = calculateItemTotals(item);
      orderSubtotal += calculations.subtotal;
      orderTotalTax += calculations.taxAmount;
      orderTotalDiscount += calculations.discountAmount;
      orderTotalAmount += calculations.total;
    });

    setPurchaseOrderForm((prev) => ({
      ...prev,
      subtotal: orderSubtotal,
      totalTax: orderTotalTax,
      totalDiscount: orderTotalDiscount,
      totalAmount: orderTotalAmount,
    }));
  };

  const updateItem = (
    index: number,
    field: keyof PurchaseOrderItem,
    value: string
  ) => {
    const updatedItems = [...purchaseOrderForm.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    // Recalculate this item's totals
    const calculations = calculateItemTotals(updatedItems[index]);
    updatedItems[index] = {
      ...updatedItems[index],
      subtotal: calculations.subtotal,
      discountAmount: calculations.discountAmount,
      taxAmount: calculations.taxAmount,
      total: calculations.total,
    };

    setPurchaseOrderForm((prev) => ({ ...prev, items: updatedItems }));
  };
  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: Date.now().toString(),
      description: '',
      quantity: '',
      unitPrice: '',
      taxRate: '0',
      taxAmount: 0,
      discountRate: '0',
      discountAmount: 0,
      subtotal: 0,
      total: 0,
    };
    setPurchaseOrderForm((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (index: number) => {
    if (purchaseOrderForm.items.length > 1) {
      const updatedItems = purchaseOrderForm.items.filter(
        (_, i) => i !== index
      );
      setPurchaseOrderForm((prev) => ({ ...prev, items: updatedItems }));
    }
  };

  const handleSupplierSelect = (supplierValue: string) => {
    const selectedSupplier = suppliers.find((s) => s.value === supplierValue);
    if (selectedSupplier) {
      setPurchaseOrderForm((prev) => ({
        ...prev,
        supplier: supplierValue,
      }));
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!purchaseOrderForm.supplier) {
      Alert.alert('Error', 'Please select a supplier');
      return;
    }

    if (
      purchaseOrderForm.items.some(
        (item) => !item.description || !item.quantity || !item.unitPrice
      )
    ) {
      Alert.alert('Error', 'Please fill in all item details');
      return;
    }

    console.log('Purchase Order submitted:', purchaseOrderForm);
    Alert.alert('Success', 'Purchase Order created successfully!', [
      { text: 'OK', onPress: () => router.back() },
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
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text
                style={[
                  styles.modalCloseText,
                  { color: theme.colors.textSecondary },
                ]}
              >
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
                    },
                  ]}
                  onPress={() => {
                    onSelect(item.value);
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
          {label}
          {required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
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
            multiline && styles.multilineInput,
            { color: theme.colors.text },
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
          {label}
          {required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
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
      >
        <Text
          style={[
            styles.textInput,
            { color: value ? theme.colors.text : theme.colors.textSecondary },
          ]}
        >
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  const renderItemRow = (item: PurchaseOrderItem, index: number) => (
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
        <Text style={[styles.itemNumber, { color: theme.colors.primary }]}>
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

      {/* Product Name */}
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
        value={item.description}
        onChangeText={(text) => updateItem(index, 'description', text)}
      />

      {/* First Row: Quantity, Unit Price, Tax % */}
      <View style={styles.itemRow}>
        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Qty
          </Text>
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
            onChangeText={(text) => updateItem(index, 'quantity', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Price
          </Text>
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
            onChangeText={(text) => updateItem(index, 'unitPrice', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Tax %
          </Text>
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
              onChangeText={(text) => updateItem(index, 'taxRate', text)}
            />
            <Percent
              size={12}
              color={theme.colors.textSecondary}
              style={styles.percentIcon}
            />
          </View>
        </View>
      </View>

      {/* Second Row: Discount %, Discount Amount */}
      <View style={styles.itemRow}>
        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Tax Amt
          </Text>
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
            readOnly
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.taxAmount?.toString() || ''}
            onChangeText={(text) => {
              // Update discount amount as direct input
              const discountAmount = parseFloat(text) || 0;
              const updatedItem = { ...item, discountAmount };

              // Recalculate discount percentage if needed
              const quantity = parseFloat(item.quantity) || 0;
              const unitPrice = parseFloat(item.unitPrice) || 0;
              const subtotal = quantity * unitPrice;

              if (subtotal > 0) {
                updatedItem.discountRate = (
                  (discountAmount / subtotal) *
                  100
                ).toString();
              }

              const finalItem = calculateItemTotals(updatedItem);

              setPurchaseOrderForm({
                ...purchaseOrderForm,
                items: purchaseOrderForm.items.map((existingItem: any) =>
                  existingItem.id === item.id ? finalItem : existingItem
                ),
              });
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Discount %
          </Text>
          <View style={styles.inputWithIcon}>
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
              onChangeText={(text) => updateItem(index, 'discountRate', text)}
            />
            <Percent
              size={12}
              color={theme.colors.textSecondary}
              style={styles.percentIcon}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
          >
            Discount Amt
          </Text>
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
                },
              ]}
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={item.discountAmount?.toString() || ''}
              onChangeText={(text) => {
                // Update discount amount as direct input
                const discountAmount = parseFloat(text) || 0;
                const updatedItem = { ...item, discountAmount };

                // Recalculate discount percentage if needed
                const quantity = parseFloat(item.quantity) || 0;
                const unitPrice = parseFloat(item.unitPrice) || 0;
                const subtotal = quantity * unitPrice;

                if (subtotal > 0) {
                  updatedItem.discountRate = (
                    (discountAmount / subtotal) *
                    100
                  ).toString();
                }

                const finalItem = calculateItemTotals(updatedItem);

                // setReturnForm({
                //   ...returnForm,
                //   items: returnForm.items.map((existingItem:any) =>
                //     existingItem.id === item.id ? finalItem : existingItem
                //   ),
                // });
              }}
            />
          </View>
        </View>
      </View>

      {/* Third Row: Tax Amount and Total (Display Only) */}
      <View style={styles.displayRow}>
        <View style={styles.displayField}>
          <Text
            style={[styles.displayLabel, { color: theme.colors.textSecondary }]}
          >
            Item Total
          </Text>
          {/* <Text style={[styles.displayLabel, { color: theme.colors.textSecondary }]}>
            Sub total: ₹{item.subtotal.toFixed(2)}
          </Text> */}
        </View>

        <View
          style={[
            styles.totalContainer,
            {
              backgroundColor: `${theme.colors.primary}${
                themeType === 'dark' ? '15' : '10'
              }`,
            },
          ]}
        >
          <IndianRupee size={14} color={theme.colors.primary} />
          <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
            {item.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Header with Cyan Gradient */}
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
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <ShoppingCart size={18} color="#8B5CF6" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Order Details
                </Text>
              </View>

              {/* Order Number */}
              {renderFormInput(
                'Order Number',
                purchaseOrderForm.orderNumber,
                (text) =>
                  setPurchaseOrderForm({
                    ...purchaseOrderForm,
                    orderNumber: text,
                  }),
                'Enter order number',
                <Receipt size={16} color="#8B5CF6" />,
                'default',
                false,
                true
              )}

              {/* Order Date */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color="#8B5CF6" />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Order Date<Text style={{ color: '#EF4444' }}>*</Text>
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
                  onPress={() => setShowOrderDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text
                      style={[styles.dateText, { color: theme.colors.text }]}
                    >
                      {purchaseOrderForm.orderDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
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
                        setPurchaseOrderForm({
                          ...purchaseOrderForm,
                          orderDate: selectedDate,
                        });
                      }
                    }}
                  />
                )}
              </View>
            </BlurView>
          </Animated.View>

          {/* Supplier Information */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Building size={18} color="#8B5CF6" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Supplier Information
                </Text>
              </View>

              {/* Supplier Selection */}
              {renderDropdownInput(
                'Supplier',
                suppliers.find(
                  (supplier) => supplier.value === purchaseOrderForm.supplier
                )?.label || '',
                'Select supplier',
                <Building size={16} color="#8B5CF6" />,
                () => setShowSupplierDropdown(true),
                true
              )}
            </BlurView>
          </Animated.View>

          {/* Items */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Package size={18} color="#8B5CF6" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Items
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    {
                      backgroundColor: `#8B5CF620`,
                      borderColor: `#8B5CF640`,
                    },
                  ]}
                  onPress={addItem}
                >
                  <Plus size={16} color="#8B5CF6" />
                </TouchableOpacity>
              </View>

              {purchaseOrderForm.items.map((item, index) =>
                renderItemRow(item, index)
              )}
            </BlurView>
          </Animated.View>

          {/* Summary */}

          <Animated.View entering={FadeInUp.delay(500)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color="#F97316" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Summary
                </Text>
              </View>

              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Subtotal
                  </Text>
                  <Text
                    style={[styles.summaryValue, { color: theme.colors.text }]}
                  >
                    ₹{purchaseOrderForm.subtotal.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Total Tax
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      { color: theme.colors.secondary },
                    ]}
                  >
                    ₹{purchaseOrderForm.totalTax.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Total Discount
                  </Text>
                  <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
                    -₹{purchaseOrderForm.totalDiscount.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.summaryDivider,
                    { backgroundColor: theme.colors.border },
                  ]}
                />

                <View style={styles.summaryRow}>
                  <Text
                    style={[
                      styles.summaryTotalLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Total Amount
                  </Text>
                  <Text
                    style={[styles.summaryTotalValue, { color: '#F97316' }]}
                  >
                    ₹{purchaseOrderForm.totalAmount.toFixed(2)}
                  </Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Information */}
          <Animated.View entering={FadeInUp.delay(600)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <MessageSquare size={18} color="#8B5CF6" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'Notes',
                purchaseOrderForm.notes,
                (text) =>
                  setPurchaseOrderForm({ ...purchaseOrderForm, notes: text }),
                'Add any additional notes or special instructions',
                <MessageSquare size={16} color="#8B5CF6" />,
                'default',
                true
              )}
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
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
                },
              ]}
            >
              <Save size={20} color={theme.colors.textSecondary} />
              <Text
                style={[
                  styles.draftButtonText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Save Draft
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 13,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
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
});