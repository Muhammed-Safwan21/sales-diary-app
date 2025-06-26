import React, { useState, useEffect } from "react";
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
  ActivityIndicator
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Receipt,
  Save,
  ChevronDown,
  Check,
  Package,
  Building2,
  IndianRupee,
  MessageSquare,
  Clock,
  FileText,
  Truck,
  Hash,
  Share,
  User,
  Plus,
  Trash2,
  Percent,
  ShoppingCart,
} from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

interface SalesReturnForm {
  date: Date;
  returnNumber: string;
  originalInvoiceNumber: string;
  customer: string;
  returnReason: string;
  items: SalesReturnItem[];
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  notes: string;
}

interface SalesReturnItem {
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

interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  customerId: string;
}

const customers: DropdownItem[] = [
  {
    id: "customer1",
    label: "John Doe",
    value: "john_doe",
  },
  { id: "customer2", label: "Acme Corp", value: "acme_corp" },
  { id: "customer3", label: "Jane Smith", value: "jane_smith" },
  { id: "customer4", label: "Beta Traders", value: "beta_traders" },
  {
    id: "customer5",
    label: "Gamma Enterprises",
    value: "gamma_enterprises",
  },
];

const returnReasons: DropdownItem[] = [
  { id: "damaged", label: "Damaged Goods", value: "damaged" },
  { id: "defective", label: "Defective Products", value: "defective" },
  { id: "wrong_item", label: "Wrong Item Delivered", value: "wrong_item" },
  { id: "quality", label: "Quality Issues", value: "quality" },
  { id: "overstock", label: "Excess Stock", value: "overstock" },
  { id: "expired", label: "Expired Products", value: "expired" },
  { id: "other", label: "Other Reasons", value: "other" },
];

// Mock invoice data - replace with actual API call
const allInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "SINV-2024-001",
    date: "2024-01-10",
    amount: "₹12,000",
    customerId: "john_doe",
  },
  {
    id: "2",
    invoiceNumber: "SINV-2024-002",
    date: "2024-01-15",
    amount: "₹8,500",
    customerId: "acme_corp",
  },
  {
    id: "3",
    invoiceNumber: "SINV-2024-003",
    date: "2024-01-20",
    amount: "₹15,000",
    customerId: "jane_smith",
  },
  {
    id: "4",
    invoiceNumber: "SINV-2024-004",
    date: "2024-01-25",
    amount: "₹22,000",
    customerId: "beta_traders",
  },
  {
    id: "5",
    invoiceNumber: "SINV-2024-005",
    date: "2024-02-01",
    amount: "₹9,000",
    customerId: "gamma_enterprises",
  },
];

export default function SalesReturnFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [showInvoiceDropdown, setShowInvoiceDropdown] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<Invoice[]>([]);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  const [returnForm, setReturnForm] = useState<SalesReturnForm>({
    date: new Date(),
    returnNumber: "",
    originalInvoiceNumber: "",
    customer: "",
    returnReason: "",
    items: [
      {
        id: "1",
        productName: "",
        quantity: "",
        unitPrice: "",
        taxRate: "",
        taxAmount: 0,
        discountRate: "",
        discountAmount: 0,
        subtotal: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    totalTax: 0,
    totalDiscount: 0,
    totalAmount: 0,
    notes: "",
  });

  // Filter invoices based on selected customer
  useEffect(() => {
    if (returnForm.customer) {
      const filteredInvoices = allInvoices.filter(
        (invoice) => invoice.customerId === returnForm.customer
      );
      setAvailableInvoices(filteredInvoices);
    } else {
      setAvailableInvoices([]);
    }
    // Reset selected invoice when customer changes
    setReturnForm((prev) => ({ ...prev, originalInvoiceNumber: "" }));
  }, [returnForm.customer]);

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = returnForm.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    const totalTax = returnForm.items.reduce(
      (sum, item) => sum + item.taxAmount,
      0
    );
    const totalDiscount = returnForm.items.reduce(
      (sum, item) => sum + item.discountAmount,
      0
    );
    const totalAmount = subtotal + totalTax - totalDiscount;

    setReturnForm((prev) => ({
      ...prev,
      subtotal,
      totalTax,
      totalDiscount,
      totalAmount,
    }));
  }, [returnForm.items]);

  const calculateItemTotals = (
    item: SalesReturnItem
  ): SalesReturnItem => {
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    const discountRate = parseFloat(item.discountRate) || 0;

    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discountRate) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const total = taxableAmount + taxAmount;

    return {
      ...item,
      subtotal,
      taxAmount,
      discountAmount,
      total,
    };
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsCreatingInvoice(true);
    try {
      console.log('Bill submitted:', { ...returnForm, isDraft });
      setTimeout(() => {
        setIsCreatingInvoice(false);
        router.back();
      }, 1000);
    } catch (error) {
      console.error('Error creating bill:', error);
      setIsCreatingInvoice(false);
    }
  };

  const addItem = () => {
    const newItem: SalesReturnItem = {
      id: Date.now().toString(),
      productName: "",
      quantity: "",
      unitPrice: "",
      taxRate: "",
      taxAmount: 0,
      discountRate: "",
      discountAmount: 0,
      subtotal: 0,
      total: 0,
    };
    setReturnForm({
      ...returnForm,
      items: [...returnForm.items, newItem],
    });
  };

  const removeItem = (itemId: string) => {
    if (returnForm.items.length > 1) {
      setReturnForm({
        ...returnForm,
        items: returnForm.items.filter((item) => item.id !== itemId),
      });
    }
  };

  const updateItem = (
    itemId: string,
    field: keyof SalesReturnItem,
    value: string
  ) => {
    const updatedItems = returnForm.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        return calculateItemTotals(updatedItem);
      }
      return item;
    });

    setReturnForm({
      ...returnForm,
      items: updatedItems,
    });
  };

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: DropdownItem[] | Invoice[],
    selectedValue: string,
    onSelect: (value: string, label?: string) => void,
    isInvoice = false
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView
          intensity={themeType === "dark" ? 20 : 80}
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
            keyExtractor={(item:any) => item.id}
            renderItem={({ item }) => {
              const isSelected = isInvoice
                ? selectedValue === item.invoiceNumber
                : selectedValue === item.value;

              const displayText = isInvoice
                ? `${item.invoiceNumber} - ${
                    item.date
                  } (${item.amount})`
                : (item as DropdownItem).label;

              const selectValue = isInvoice
                ? item.invoiceNumber
                : item.value;

              return (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      backgroundColor: isSelected
                        ? `${theme.colors.primary}15`
                        : "transparent",
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
                        fontWeight: isSelected ? "600" : "500",
                      },
                    ]}
                  >
                    {displayText}
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
    keyboardType: any = "default",
    multiline = false,
    required = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}> 
          {label}
          {required && <Text style={{ color: "#EF4444" }}>*</Text>}
        </Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
          {
            backgroundColor:
              themeType === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.8)",
            borderColor:
              themeType === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.06)",
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
          textAlignVertical={multiline ? "top" : "center"}
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
    required = false,
    disabled = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}> 
          {label}
          {required && <Text style={{ color: "#EF4444" }}>*</Text>}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: disabled
              ? themeType === "dark"
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)"
              : themeType === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0.8)",
            borderColor:
              themeType === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.06)",
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
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

  const renderItemRow = (item: SalesReturnItem, index: number) => (
    <View
      key={item.id}
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            themeType === "dark"
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(0, 0, 0, 0.02)",
          borderColor:
            themeType === "dark"
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(0, 0, 0, 0.04)",
        },
      ]}
    >
      <View style={styles.itemHeader}>
        <Text style={[styles.itemNumber, { color: theme.colors.primary }]}> 
          Item {index + 1}
        </Text>
        {returnForm.items.length > 1 && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
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
              themeType === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.8)",
            borderColor:
              themeType === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.06)",
            color: theme.colors.text,
            marginBottom: 12,
          },
        ]}
        placeholder="Product name"
        placeholderTextColor={theme.colors.textSecondary}
        value={item.productName}
        onChangeText={(text) => updateItem(item.id, "productName", text)}
      />
  
      {/* First Row: Quantity, Unit Price, Tax % */}
      <View style={styles.itemRow}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
            Qty
          </Text>
          <TextInput
            style={[
              styles.itemInputSmall,
              {
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                borderColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                color: theme.colors.text,
              },
            ]}
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.quantity}
            onChangeText={(text) => updateItem(item.id, "quantity", text)}
          />
        </View>
  
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
            Price
          </Text>
          <TextInput
            style={[
              styles.itemInputMedium,
              {
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                borderColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                color: theme.colors.text,
              },
            ]}
            placeholder="0.00"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.unitPrice}
            onChangeText={(text) => updateItem(item.id, "unitPrice", text)}
          />
        </View>
  
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
            Tax %
          </Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[
                styles.itemInputSmall,
                {
                  backgroundColor:
                    themeType === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  borderColor:
                    themeType === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
                  color: theme.colors.text,
                  paddingRight: 24,
                },
              ]}
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={item.taxRate}
              onChangeText={(text) => updateItem(item.id, "taxRate", text)}
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
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
          Tax Amt
          </Text>
          <TextInput
            style={[
              styles.itemInputSmall,
              {
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                borderColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                color: theme.colors.text,
              },
            ]}
            readOnly
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.taxAmount?.toString() || ""}
            onChangeText={(text) => {
              // Update discount amount as direct input
              const discountAmount = parseFloat(text) || 0;
              const updatedItem = { ...item, discountAmount };
              
              // Recalculate discount percentage if needed
              const quantity = parseFloat(item.quantity) || 0;
              const unitPrice = parseFloat(item.unitPrice) || 0;
              const subtotal = quantity * unitPrice;
              
              if (subtotal > 0) {
                updatedItem.discountRate = ((discountAmount / subtotal) * 100).toString();
              }
              
              const finalItem = calculateItemTotals(updatedItem);
              
              setReturnForm({
                ...returnForm,
                items: returnForm.items.map(existingItem => 
                  existingItem.id === item.id ? finalItem : existingItem
                ),
              });
            }}
          />
        </View>
  
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
          Discount %
          </Text>
          <TextInput
            style={[
              styles.itemInputMedium,
              {
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                borderColor:
                  themeType === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                color: theme.colors.text,
              },
            ]}
            placeholder="0.00"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={item.discountRate}
            onChangeText={(text) => updateItem(item.id, "discountRate", text)}
            
          />
        </View>
  
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}> 
          Discount Amt
          </Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[
                styles.itemInputSmall,
                {
                  backgroundColor:
                    themeType === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  borderColor:
                    themeType === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
                  color: theme.colors.text,
                  paddingRight: 24,
                },
              ]}
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={item.discountAmount?.toString() || ""}
              onChangeText={(text) => {
                // Update discount amount as direct input
                const discountAmount = parseFloat(text) || 0;
                const updatedItem = { ...item, discountAmount };
                
                // Recalculate discount percentage if needed
                const quantity = parseFloat(item.quantity) || 0;
                const unitPrice = parseFloat(item.unitPrice) || 0;
                const subtotal = quantity * unitPrice;
                
                if (subtotal > 0) {
                  updatedItem.discountRate = ((discountAmount / subtotal) * 100).toString();
                }
                
                const finalItem = calculateItemTotals(updatedItem);
                
                setReturnForm({
                  ...returnForm,
                  items: returnForm.items.map(existingItem => 
                    existingItem.id === item.id ? finalItem : existingItem
                  ),
                });
              }}
            />
            <Percent
              size={12}
              color={theme.colors.textSecondary}
              style={styles.percentIcon}
            />
          </View>
        </View>
      </View>
  
      {/* Third Row: Tax Amount and Total (Display Only) */}
      <View style={styles.displayRow}>
        <View style={styles.displayField}>
          <Text style={[styles.displayLabel, { color: theme.colors.textSecondary }]}> 
            Item Total
          </Text>
        </View>
  
        <View
          style={[
            styles.totalContainer,
            { backgroundColor: `${theme.colors.primary}${themeType === "dark" ? "15" : "10"}` },
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
            <ActivityIndicator
              size="small"
              color={theme.colors.textSecondary}
            />
          ) : (
            <Save size={20} color={theme.colors.textSecondary} />
          )}
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
            colors={[
              theme.colors.primary,
              theme.colors.primaryLight || theme.colors.primary,
            ]}
            style={styles.saveGradient}
          >
            <View style={styles.saveButtonContent}>
              {isCreatingInvoice ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <FileText size={20} color="#FFFFFF" />
              )}
              <Text style={styles.saveButtonText} numberOfLines={1} ellipsizeMode="tail">
                {isCreatingInvoice ? 'Creating...' : 'Submit'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        </View>
        </BlurView>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === "dark" ? "light" : "dark"} />

      <LinearGradient
        colors={
          themeType === "dark"
            ? ["#1A1B3A", "#2D1B69", "rgba(61, 42, 122, 0.3)", "transparent"]
            : ["#6366F1", "#8B5CF6", "rgba(139, 92, 246, 0.2)", "transparent"]
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
              <Text style={styles.headerTitle}>Sales Return</Text>
            </View>

            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Return Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === "dark" ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Receipt size={18} color="#6366F1" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Return Details
                </Text>
              </View>

              {/* Date Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Calendar size={16} color={theme.colors.secondary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Return Date<Text style={{ color: "#EF4444" }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor:
                        themeType === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.8)",
                      borderColor:
                        themeType === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.06)",
                    },
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text
                      style={[styles.dateText, { color: theme.colors.text }]}
                    >
                      {returnForm.date.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <Calendar size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={returnForm.date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setReturnForm({ ...returnForm, date: selectedDate });
                      }
                    }}
                  />
                )}
              </View>

              {renderFormInput(
                "Return Number",
                returnForm.returnNumber,
                (text) => setReturnForm({ ...returnForm, returnNumber: text }),
                "Return Number",
                <Hash size={16} color={theme.colors.primary} />,
                "default",
                false,
                true
              )}
            </BlurView>
          </Animated.View>

          {/* Customer & Invoice Selection */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === "dark" ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Building2 size={18} color="#6366F1" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Customer & Invoice Details
                </Text>
              </View>

              {renderDropdownInput(
                "Customer",
                customers.find(
                  (customer) => customer.value === returnForm.customer
                )?.label || "",
                "Select customer",
                <User size={16} color="#6366F1" />,
                () => setShowCustomerDropdown(true),
                true
              )}

              {renderDropdownInput(
                "Original Sales Invoice",
                returnForm.originalInvoiceNumber,
                returnForm.customer
                  ? "Select invoice from customer"
                  : "Please select customer first",
                <FileText size={16} color="#6366F1" />,
                () => setShowInvoiceDropdown(true),
                true,
                !returnForm.customer || availableInvoices.length === 0
              )}

              {renderDropdownInput(
                "Return Reason",
                returnReasons.find(
                  (reason) => reason.value === returnForm.returnReason
                )?.label || "",
                "Select return reason",
                <Truck size={16} color="#6366F1" />,
                () => setShowReasonDropdown(true),
                true
              )}
            </BlurView>
          </Animated.View>

          {/* Items Section */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView
              intensity={themeType === "dark" ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Package size={18} color="#6366F1" />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Return Items
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    { backgroundColor: `#6366F120`, borderColor: `#6366F140` },
                  ]}
                  onPress={addItem}
                >
                  <Plus size={16} color="#6366F1" />
                </TouchableOpacity>
              </View>

              {returnForm?.items?.map((item, index) =>
                renderItemRow(item, index)
              )}
            </BlurView>
          </Animated.View>

          {/* Summary Section */}
          <Animated.View entering={FadeInUp.delay(500)}>
            <BlurView
              intensity={themeType === "dark" ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color="#6366F1" />
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
                    ₹{returnForm.subtotal.toFixed(2)}
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
                    ₹{returnForm.totalTax.toFixed(2)}
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
                  <Text style={[styles.summaryValue, { color: "#EF4444" }]}> 
                    -₹{returnForm.totalDiscount.toFixed(2)}
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
                    style={[styles.summaryTotalValue, { color: "#6366F1" }]}
                  >
                    ₹{returnForm.totalAmount.toFixed(2)}
                  </Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Notes */}
          <Animated.View entering={FadeInUp.delay(600)}>
            <BlurView
              intensity={themeType === "dark" ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              {renderFormInput(
                "Additional Notes",
                returnForm.notes,
                (text) => setReturnForm({ ...returnForm, notes: text }),
                "Enter any additional notes or comments...",
                <MessageSquare size={16} color={theme.colors.secondary} />,
                "default",
                true
              )}
            </BlurView>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {renderFooter()}

      {/* Dropdown Modals */}
      {renderDropdownModal(
        showCustomerDropdown,
        () => setShowCustomerDropdown(false),
        "Select Customer",
        customers,
        returnForm.customer,
        (value) => setReturnForm({ ...returnForm, customer: value })
      )}

      {renderDropdownModal(
        showReasonDropdown,
        () => setShowReasonDropdown(false),
        "Select Return Reason",
        returnReasons,
        returnForm.returnReason,
        (value) => setReturnForm({ ...returnForm, returnReason: value })
      )}

      {renderDropdownModal(
        !!(showInvoiceDropdown && returnForm.customer),
        () => setShowInvoiceDropdown(false),
        "Select Original Invoice",
        availableInvoices,
        returnForm.originalInvoiceNumber,
        (value) =>
          setReturnForm({ ...returnForm, originalInvoiceNumber: value }),
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 36,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  addButton: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  multilineContainer: {
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  textInput: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dateContainer: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "500",
  },
  itemContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: "600",
  },
  removeButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  itemInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "500",
    textAlign: "center",
  },
  itemInputMedium: {
    flex: 2,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: "500",
  },
  inputWithIcon: {
    flex: 1,
    position: "relative",
  },
  percentIcon: {
    position: "absolute",
    right: 6,
    top: "50%",
    transform: [{ translateY: -6 }],
  },
  calculatedField: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calculatedLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
  },
  calculatedValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  totalContainer: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  summaryContainer: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  submitContainer: {
    marginTop: 20,
  },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "70%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  displayRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  displayField: {
    flex: 1,
    alignItems: "center",
  },
  displayLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  displayValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  spacer: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    zIndex: 100,
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
    minHeight: 22,
    flexShrink: 1,
    flexWrap: 'nowrap',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
