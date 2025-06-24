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
  Users,
  Receipt,
  ChevronDown,
  Search,
  Check,
  X,
  Wallet,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  outstandingAmount: number;
}

interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  outstandingAmount: number;
  supplierId: string;
  status: 'pending' | 'partial' | 'paid';
}

interface PaymentForm {
  amount: string;
  date: Date;
  paymentMode: string;
  reference: string;
  notes: string;
  supplierId: string;
  invoiceId: string;
}

export default function SupplierPaymentForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState('');
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountSearchQuery, setAccountSearchQuery] = useState('');

  // Add accountId to your paymentForm state
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    date: new Date(),
    paymentMode: 'cash',
    reference: '',
    notes: '',
    supplierId: '',
    invoiceId: '',
    accountId: '', // Add this line
  });

  // Mock data - replace with your actual data source
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'ABC Electronics Ltd.',
      email: 'contact@abcelectronics.com',
      phone: '+91 98765 43210',
      outstandingAmount: 45000,
    },
    {
      id: '2',
      name: 'Tech Solutions Pvt Ltd',
      email: 'info@techsolutions.com',
      phone: '+91 87654 32109',
      outstandingAmount: 28500,
    },
    {
      id: '3',
      name: 'Global Suppliers Co.',
      email: 'sales@globalsuppliers.com',
      phone: '+91 76543 21098',
      outstandingAmount: 67200,
    },
    {
      id: '4',
      name: 'Prime Materials Inc.',
      email: 'orders@primematerials.com',
      phone: '+91 65432 10987',
      outstandingAmount: 15800,
    },
    {
      id: '5',
      name: 'Metro Trading House',
      email: 'metro@trading.com',
      phone: '+91 54321 09876',
      outstandingAmount: 92300,
    },
  ];

  const purchaseInvoices: PurchaseInvoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-01-15',
      amount: 25000,
      outstandingAmount: 25000,
      supplierId: '1',
      status: 'pending',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-01-18',
      amount: 20000,
      outstandingAmount: 15000,
      supplierId: '1',
      status: 'partial',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: '2024-01-20',
      amount: 28500,
      outstandingAmount: 28500,
      supplierId: '2',
      status: 'pending',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      date: '2024-01-22',
      amount: 35000,
      outstandingAmount: 35000,
      supplierId: '3',
      status: 'pending',
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      date: '2024-01-25',
      amount: 32200,
      outstandingAmount: 32200,
      supplierId: '3',
      status: 'pending',
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-006',
      date: '2024-01-28',
      amount: 15800,
      outstandingAmount: 15800,
      supplierId: '4',
      status: 'pending',
    },
    {
      id: '7',
      invoiceNumber: 'INV-2024-007',
      date: '2024-02-01',
      amount: 48000,
      outstandingAmount: 48000,
      supplierId: '5',
      status: 'pending',
    },
    {
      id: '8',
      invoiceNumber: 'INV-2024-008',
      date: '2024-02-05',
      amount: 44300,
      outstandingAmount: 44300,
      supplierId: '5',
      status: 'pending',
    },
  ];

  const paymentModes = [
    { id: 'cash', label: 'Cash', icon: Banknote, color: '#10B981' },
    { id: 'card', label: 'Card', icon: CreditCard, color: '#3B82F6' },
    { id: 'bank', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
    { id: 'cheque', label: 'Cheque', icon: FileText, color: '#EF4444' },
  ];

  const isPaymentIn = type === 'in';
  const selectedSupplier = suppliers.find(
    (s) => s.id === paymentForm.supplierId
  );
  const selectedInvoice = purchaseInvoices.find(
    (i) => i.id === paymentForm.invoiceId
  );

  // Filter invoices by selected supplier
  const filteredInvoices = purchaseInvoices.filter(
    (invoice) =>
      invoice.supplierId === paymentForm.supplierId && invoice.status !== 'paid'
  );

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
      supplier.email
        ?.toLowerCase()
        .includes(supplierSearchQuery.toLowerCase()) ||
      supplier.phone?.includes(supplierSearchQuery)
  );

  // Filter invoices based on search query
  const searchFilteredInvoices = filteredInvoices.filter((invoice) =>
    invoice.invoiceNumber
      .toLowerCase()
      .includes(invoiceSearchQuery.toLowerCase())
  );

  const handleSupplierSelect = (supplier: Supplier) => {
    setPaymentForm({
      ...paymentForm,
      supplierId: supplier.id,
      invoiceId: '', // Reset invoice when supplier changes
      amount: '', // Reset amount when supplier changes
    });
    setShowSupplierModal(false);
    setSupplierSearchQuery('');
  };

  const handleInvoiceSelect = (invoice: PurchaseInvoice) => {
    setPaymentForm({
      ...paymentForm,
      invoiceId: invoice.id,
      amount: invoice.outstandingAmount.toString(), // Auto-fill amount with outstanding amount
    });
    setShowInvoiceModal(false);
    setInvoiceSearchQuery('');
  };

  const handleSubmit = () => {
    console.log('Payment submitted:', paymentForm);
    console.log('Selected Supplier:', selectedSupplier);
    console.log('Selected Invoice:', selectedInvoice);
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

  const renderSupplierItem = ({ item }: { item: Supplier }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
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
      onPress={() => handleSupplierSelect(item)}
    >
      <View style={styles.modalItemContent}>
        <View style={styles.modalItemHeader}>
          <Text style={[styles.modalItemTitle, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <View style={styles.outstandingBadge}>
            <IndianRupee size={12} color="#F59E0B" />
            <Text style={styles.outstandingText}>
              {item.outstandingAmount.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
        {item.email && (
          <Text
            style={[
              styles.modalItemSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.email}
          </Text>
        )}
        {item.phone && (
          <Text
            style={[
              styles.modalItemSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.phone}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderInvoiceItem = ({ item }: { item: PurchaseInvoice }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
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
      onPress={() => handleInvoiceSelect(item)}
    >
      <View style={styles.modalItemContent}>
        <View style={styles.modalItemHeader}>
          <Text style={[styles.modalItemTitle, { color: theme.colors.text }]}>
            {item.invoiceNumber}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'pending' ? '#F59E0B20' : '#EF444420',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: item.status === 'pending' ? '#F59E0B' : '#EF4444' },
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.modalItemSubtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          Date: {new Date(item.date).toLocaleDateString('en-IN')}
        </Text>
        <View style={styles.invoiceAmounts}>
          <View style={styles.amountRow}>
            <Text
              style={[
                styles.amountLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Total:
            </Text>
            <Text style={[styles.amountValue, { color: theme.colors.text }]}>
              ₹{item.amount.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.amountRow}>
            <Text
              style={[
                styles.amountLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Outstanding:
            </Text>
            <Text style={[styles.amountValue, { color: '#EF4444' }]}>
              ₹{item.outstandingAmount.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const accounts = [
    {
      id: '1',
      name: 'Cash in Hand',
      type: 'cash',
      balance: 25000,
    },
    {
      id: '2',
      name: 'Petty Cash',
      type: 'cash',
      balance: 5000,
    },
    {
      id: '3',
      name: 'HDFC Current Account',
      type: 'bank',
      accountNumber: '****1234',
      bankName: 'HDFC Bank',
      balance: 145000,
    },
    {
      id: '4',
      name: 'ICICI Savings Account',
      type: 'bank',
      accountNumber: '****5678',
      bankName: 'ICICI Bank',
      balance: 89000,
    },
    {
      id: '5',
      name: 'SBI Business Account',
      type: 'bank',
      accountNumber: '****9012',
      bankName: 'State Bank of India',
      balance: 267000,
    },
  ];

  // Add these helper variables
  const selectedAccount = accounts.find(
    (acc) => acc.id === paymentForm.accountId
  );

  // Filter accounts based on search query
  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(accountSearchQuery.toLowerCase()) ||
      account.bankName
        ?.toLowerCase()
        .includes(accountSearchQuery.toLowerCase()) ||
      account.accountNumber?.includes(accountSearchQuery)
  );

  // Group accounts by type
  const cashAccounts = filteredAccounts.filter((acc) => acc.type === 'cash');
  const bankAccounts = filteredAccounts.filter((acc) => acc.type === 'bank');

  // Add these handler functions
  const handleAccountSelect = (account: any) => {
    setPaymentForm({
      ...paymentForm,
      accountId: account.id,
    });
    setShowAccountModal(false);
    setAccountSearchQuery('');
  };

  // Add these render functions
  const renderAccountItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
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
      onPress={() => handleAccountSelect(item)}
    >
      <View style={styles.modalItemContent}>
        <View style={styles.modalItemHeader}>
          <View style={styles.accountInfo}>
            <View
              style={[
                styles.accountTypeIcon,
                {
                  backgroundColor:
                    item.type === 'cash' ? '#10B98120' : '#3B82F620',
                },
              ]}
            >
              {item.type === 'cash' ? (
                <Banknote size={16} color="#10B981" />
              ) : (
                <Building2 size={16} color="#3B82F6" />
              )}
            </View>
            <View style={styles.accountDetails}>
              <Text
                style={[styles.modalItemTitle, { color: theme.colors.text }]}
              >
                {item.name}
              </Text>
              {item.type === 'bank' && (
                <Text
                  style={[
                    styles.modalItemSubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.bankName} • {item.accountNumber}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.balanceBadge}>
            <Text style={styles.balanceText}>
              ₹{item.balance.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: any, icon: any) => (
    <View style={styles.sectionHeaderContainer}>
      <View style={styles.sectionHeaderContent}>
        {icon}
        <Text style={[styles.sectionHeaderText, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Ultra-modern header with gradient */}
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
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <LinearGradient
                colors={
                  isPaymentIn
                    ? [
                        'rgba(16, 185, 129, 0.15)',
                        'rgba(16, 185, 129, 0.05)',
                        'transparent',
                      ]
                    : [
                        'rgba(239, 68, 68, 0.15)',
                        'rgba(239, 68, 68, 0.05)',
                        'transparent',
                      ]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summaryGradientOverlay}
              />

              <View style={styles.summaryContent}>
                <View style={styles.summaryHeader}>
                  <View
                    style={[
                      styles.summaryIconContainer,
                      {
                        backgroundColor: isPaymentIn
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(239, 68, 68, 0.2)',
                      },
                    ]}
                  >
                    {isPaymentIn ? (
                      <TrendingUp size={24} color="#10B981" />
                    ) : (
                      <TrendingDown size={24} color="#EF4444" />
                    )}
                  </View>

                  <View style={styles.summaryText}>
                    <Text
                      style={[
                        styles.summaryTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      {isPaymentIn ? 'Receiving Payment' : 'Making Payment'}
                    </Text>
                    <Text
                      style={[
                        styles.summarySubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {selectedSupplier
                        ? `To: ${selectedSupplier.name}`
                        : 'Select supplier below'}
                    </Text>
                  </View>
                </View>

                {paymentForm.amount && (
                  <View style={styles.amountPreview}>
                    <IndianRupee
                      size={16}
                      color={isPaymentIn ? '#10B981' : '#EF4444'}
                    />
                    <Text
                      style={[
                        styles.amountPreviewText,
                        { color: isPaymentIn ? '#10B981' : '#EF4444' },
                      ]}
                    >
                      {parseFloat(paymentForm.amount).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                )}
              </View>
            </BlurView>
          </Animated.View>

          {/* Supplier Selection */}
          <Animated.View entering={FadeInUp.delay(150)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Users size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Supplier Selection
                </Text>
              </View>

              {/* Supplier Selector */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Users size={16} color={theme.colors.primary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Supplier<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.selectorContainer,
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
                  onPress={() => setShowSupplierModal(true)}
                >
                  <View style={styles.selectorContent}>
                    <Text
                      style={[
                        styles.selectorText,
                        {
                          color: selectedSupplier
                            ? theme.colors.text
                            : theme.colors.textSecondary,
                        },
                      ]}
                    >
                      {selectedSupplier
                        ? selectedSupplier.name
                        : 'Select Supplier'}
                    </Text>
                    {selectedSupplier && (
                      <View style={styles.outstandingBadge}>
                        <IndianRupee size={10} color="#F59E0B" />
                        <Text style={styles.outstandingText}>
                          {selectedSupplier.outstandingAmount.toLocaleString(
                            'en-IN'
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
                  <ChevronDown size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Invoice Selector - Only show if supplier is selected */}
              {paymentForm.supplierId && (
                <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                    <Receipt size={16} color={theme.colors.secondary} />
                    <Text
                      style={[
                        styles.label,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Purchase Invoice
                      <Text style={{ color: '#EF4444' }}>*</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.selectorContainer,
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
                    onPress={() => setShowInvoiceModal(true)}
                  >
                    <View style={styles.selectorContent}>
                      <Text
                        style={[
                          styles.selectorText,
                          {
                            color: selectedInvoice
                              ? theme.colors.text
                              : theme.colors.textSecondary,
                          },
                        ]}
                      >
                        {selectedInvoice
                          ? selectedInvoice.invoiceNumber
                          : 'Select Invoice'}
                      </Text>
                      {selectedInvoice && (
                        <View style={styles.outstandingBadge}>
                          <IndianRupee size={10} color="#EF4444" />
                          <Text
                            style={[
                              styles.outstandingText,
                              { color: '#EF4444' },
                            ]}
                          >
                            {selectedInvoice.outstandingAmount.toLocaleString(
                              'en-IN'
                            )}
                          </Text>
                        </View>
                      )}
                    </View>
                    <ChevronDown size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              )}
            </BlurView>
          </Animated.View>

          {/* Payment Details */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Payment Details
                </Text>
              </View>

              {/* Amount Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Amount<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <View style={styles.amountInputContainer}>
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
                      styles.amountInput,
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
                    value={paymentForm.amount}
                    onChangeText={(text) =>
                      setPaymentForm({ ...paymentForm, amount: text })
                    }
                  />
                </View>
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
                    Date<Text style={{ color: '#EF4444' }}>*</Text>
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
                      {paymentForm.date.toLocaleDateString('en-IN', {
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

          <Animated.View entering={FadeInUp.delay(175)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Wallet size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Payment Account
                </Text>
              </View>

              {/* Account Selector */}
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Wallet size={16} color={theme.colors.primary} />
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Payment From<Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.selectorContainer,
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
                  onPress={() => setShowAccountModal(true)}
                >
                  <View style={styles.selectorContent}>
                    <View style={styles.selectedAccountContent}>
                      {selectedAccount ? (
                        <>
                          <View
                            style={[
                              styles.accountTypeIconSmall,
                              {
                                backgroundColor:
                                  selectedAccount.type === 'cash'
                                    ? '#10B98120'
                                    : '#3B82F620',
                              },
                            ]}
                          >
                            {selectedAccount.type === 'cash' ? (
                              <Banknote size={14} color="#10B981" />
                            ) : (
                              <Building2 size={14} color="#3B82F6" />
                            )}
                          </View>
                          <View style={styles.selectedAccountInfo}>
                            <Text
                              style={[
                                styles.selectorText,
                                { color: theme.colors.text },
                              ]}
                            >
                              {selectedAccount.name}
                            </Text>
                            {selectedAccount.type === 'bank' && (
                              <Text
                                style={[
                                  styles.accountSubtext,
                                  { color: theme.colors.textSecondary },
                                ]}
                              >
                                {selectedAccount.bankName}
                              </Text>
                            )}
                          </View>
                          <View style={styles.selectedBalanceBadge}>
                            <Text style={styles.selectedBalanceText}>
                              ₹{selectedAccount.balance.toLocaleString('en-IN')}
                            </Text>
                          </View>
                        </>
                      ) : (
                        <Text
                          style={[
                            styles.selectorText,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          Select Account
                        </Text>
                      )}
                    </View>
                  </View>
                  <ChevronDown size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>

          {/* Payment Method */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <CreditCard size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
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
                          },
                        ]}
                        onPress={() =>
                          setPaymentForm({
                            ...paymentForm,
                            paymentMode: mode.id,
                          })
                        }
                      >
                        <View
                          style={[
                            styles.methodIconSmall,
                            {
                              backgroundColor: isSelected
                                ? 'rgba(255, 255, 255, 0.2)'
                                : `${mode.color}15`,
                            },
                          ]}
                        >
                          <IconComponent
                            size={14}
                            color={isSelected ? '#FFFFFF' : mode.color}
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
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isPaymentIn ? '#10B981' : '#EF4444',
                shadowColor: isPaymentIn ? '#10B981' : '#EF4444',
                opacity:
                  !paymentForm.supplierId ||
                  !paymentForm.invoiceId ||
                  !paymentForm.amount
                    ? 0.6
                    : 1,
              },
            ]}
            onPress={handleSubmit}
            disabled={
              !paymentForm.supplierId ||
              !paymentForm.invoiceId ||
              !paymentForm.amount
            }
          >
            <LinearGradient
              colors={
                isPaymentIn ? ['#10B981', '#059669'] : ['#EF4444', '#DC2626']
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

      {/* Supplier Selection Modal */}
      <Modal
        visible={showSupplierModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSupplierModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            intensity={themeType === 'dark' ? 20 : 80}
            tint={themeType}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Select Supplier
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowSupplierModal(false)}
              >
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View
              style={[
                styles.searchContainer,
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
              <Search size={16} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search suppliers..."
                placeholderTextColor={theme.colors.textSecondary}
                value={supplierSearchQuery}
                onChangeText={setSupplierSearchQuery}
              />
            </View>

            <FlatList
              data={filteredSuppliers}
              keyExtractor={(item) => item.id}
              renderItem={renderSupplierItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalList}
            />
          </BlurView>
        </View>
      </Modal>

      {/* Invoice Selection Modal */}
      <Modal
        visible={showInvoiceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInvoiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            intensity={themeType === 'dark' ? 20 : 80}
            tint={themeType}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Select Invoice
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowInvoiceModal(false)}
              >
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View
              style={[
                styles.searchContainer,
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
              <Search size={16} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search invoices..."
                placeholderTextColor={theme.colors.textSecondary}
                value={invoiceSearchQuery}
                onChangeText={setInvoiceSearchQuery}
              />
            </View>

            <FlatList
              data={searchFilteredInvoices}
              keyExtractor={(item) => item.id}
              renderItem={renderInvoiceItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Receipt size={48} color={theme.colors.textSecondary} />
                  <Text
                    style={[
                      styles.emptyStateText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {filteredInvoices.length === 0
                      ? 'No pending invoices for this supplier'
                      : 'No invoices match your search'}
                  </Text>
                </View>
              }
            />
          </BlurView>
        </View>
      </Modal>

      {/* Account Selection Modal */}
      <Modal
        visible={showAccountModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAccountModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            intensity={themeType === 'dark' ? 20 : 80}
            tint={themeType}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Select Payment Account
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowAccountModal(false)}
              >
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View
              style={[
                styles.searchContainer,
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
              <Search size={16} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search accounts..."
                placeholderTextColor={theme.colors.textSecondary}
                value={accountSearchQuery}
                onChangeText={setAccountSearchQuery}
              />
            </View>

            <FlatList
              data={[
                ...(cashAccounts.length > 0
                  ? [
                      {
                        type: 'header',
                        title: 'Cash Accounts',
                        data: cashAccounts,
                      },
                    ]
                  : []),
                ...cashAccounts.map((acc) => ({ type: 'item', data: acc })),
                ...(bankAccounts.length > 0
                  ? [
                      {
                        type: 'header',
                        title: 'Bank Accounts',
                        data: bankAccounts,
                      },
                    ]
                  : []),
                ...bankAccounts.map((acc) => ({ type: 'item', data: acc })),
              ]}
              keyExtractor={(item:any, index) =>
                item.type === 'header'
                  ? `header-${item.title}`
                  : `item-${item.data.id}`
              }
              renderItem={({ item }) => {
                if (item.type === 'header') {
                  return renderSectionHeader(
                    item.title,
                    item.title === 'Cash Accounts' ? (
                      <Banknote size={16} color="#10B981" />
                    ) : (
                      <Building2 size={16} color="#3B82F6" />
                    )
                  );
                }
                return renderAccountItem({ item: item.data });
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalList}
              ListEmptyComponent={() => (
                <View style={styles.emptyStateContainer}>
                  <Search size={48} color={theme.colors.textSecondary} />
                  <Text
                    style={[
                      styles.emptyStateText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    No accounts found
                  </Text>
                  <Text
                    style={[
                      styles.emptyStateSubtext,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Try adjusting your search criteria
                  </Text>
                </View>
              )}
            />
          </BlurView>
        </View>
      </Modal>
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
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectorContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '500',
  },
  outstandingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  outstandingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingHorizontal: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  modalList: {
    paddingBottom: 20,
  },
  modalItem: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  modalItemContent: {
    padding: 16,
  },
  modalItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    flex: 1,
  },
  modalItemSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  invoiceAmounts: {
    marginTop: 8,
    gap: 4,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  accountTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  accountTypeIconSmall: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  accountDetails: {
    flex: 1,
  },

  balanceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },

  balanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },

  selectedAccountContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  selectedAccountInfo: {
    flex: 1,
  },

  accountSubtext: {
    fontSize: 12,
    marginTop: 2,
  },

  selectedBalanceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },

  selectedBalanceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },

  sectionHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginTop: 16,
    marginBottom: 8,
  },

  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },

  emptyStateSubtext: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
