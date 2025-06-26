import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Edit,
    FileText,
    IndianRupee,
    Package,
    Trash2,
    Download,
    Share2,
    Printer
} from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for demonstration
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customerName: 'John Doe',
    customerId: '1',
    amount: 15000.0,
    status: 'paid',
    invoiceDate: '2025-01-10',
    dueDate: '2025-01-20',
    items: [
      {
        id: 'i1',
        productName: 'Product A',
        quantity: 2,
        unitPrice: 5000,
        taxRate: 5,
        discountRate: 2,
      },
      {
        id: 'i2',
        productName: 'Product B',
        quantity: 1,
        unitPrice: 5000,
        taxRate: 12,
        discountRate: 0,
      },
    ],
    notes: 'Thank you for your business!',
  },
  // ... more mock invoices
];

export default function SalesInvoiceView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the invoice by id (mock)
  const invoice = mockInvoices.find((b) => b.id === id) || mockInvoices[0];

  // Calculate item totals
  const itemsWithTotals = invoice.items.map((item) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * (item.discountRate || 0)) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * (item.taxRate || 0)) / 100;
    const total = afterDiscount + taxAmount;
    return { ...item, subtotal, discountAmount, taxAmount, total };
  });
  const subtotal = itemsWithTotals.reduce((sum, i) => sum + i.subtotal, 0);
  const totalTax = itemsWithTotals.reduce((sum, i) => sum + i.taxAmount, 0);
  const totalDiscount = itemsWithTotals.reduce((sum, i) => sum + i.discountAmount, 0);
  const totalAmount = itemsWithTotals.reduce((sum, i) => sum + i.total, 0);

  const handleEdit = () => {
    router.push(`/sales/invoice/form?id=${invoice.id}`);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Invoice',
      'Are you sure you want to delete this sales invoice?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };
  const handleDownload = () => {
    Alert.alert('Download', 'Download PDF functionality coming soon.');
  };
  const handleShare = () => {
    Alert.alert('Share', 'Share functionality coming soon.');
  };
  const handlePrint = () => {
    Alert.alert('Print', 'Print functionality coming soon.');
  };

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
              <FileText size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Sales Invoice</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Edit size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}  showsVerticalScrollIndicator={false}>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Invoice Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Invoice Number</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{invoice.invoiceNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Customer</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{invoice.customerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Invoice Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{new Date(invoice.invoiceDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Due Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{new Date(invoice.dueDate).toLocaleDateString()}</Text>
          </View>
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={18} color="#6366F1" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Invoice Items</Text>
          </View>
          {itemsWithTotals.map((item, idx) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>{item.productName}</Text>
                <Text style={[styles.itemMeta, { color: theme.colors.textSecondary }]}>Qty: {item.quantity} x ₹{item.unitPrice}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.itemAmount, { color: theme.colors.primary }]}>₹{item.total.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <IndianRupee size={18} color="#6366F1" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Summary</Text>
          </View>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Subtotal</Text><Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{subtotal.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Tax</Text><Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{totalTax.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Discount</Text><Text style={[styles.summaryValue, { color: '#EF4444' }]}>-₹{totalDiscount.toFixed(2)}</Text></View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}><Text style={[styles.summaryTotalLabel, { color: theme.colors.text }]}>Total Amount</Text><Text style={[styles.summaryTotalValue, { color: theme.colors.primary }]}>₹{totalAmount.toFixed(2)}</Text></View>
        </BlurView>
        {invoice.notes ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{invoice.notes}</Text>
          </BlurView>
        ) : null}
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}> 
        <TouchableOpacity style={styles.footerAction} onPress={handleDownload}>
          <Download size={22} color={theme.colors.primary} />
          <Text style={styles.footerActionLabel}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerAction} onPress={handleShare}>
          <Share2 size={22} color={theme.colors.primary} />
          <Text style={styles.footerActionLabel}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerAction} onPress={handlePrint}>
          <Printer size={22} color={theme.colors.primary} />
          <Text style={styles.footerActionLabel}>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingBottom: 20 },
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
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
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: '#FFFFFF',
  },
  itemMeta: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  itemRight: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: '#eee',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  notesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  footerAction: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
