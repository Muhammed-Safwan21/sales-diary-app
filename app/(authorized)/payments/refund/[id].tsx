import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Download,
    Edit,
    IndianRupee,
    Package,
    Printer,
    RotateCcw,
    Share2,
    Trash2
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
const mockPaymentRefunds = [
  {
    id: '1',
    refundNumber: 'REF-001',
    supplierName: 'Office Supplies Co.',
    supplierId: '1',
    amount: 2500.0,
    status: 'completed',
    refundDate: '2025-01-10',
    originalPayment: 'PAY-001',
    reason: 'Damaged goods received. Supplier sent damaged office supplies that were unusable.',
    items: [
      {
        id: 'i1',
        itemName: 'Office Stationery',
        quantity: 1,
        unitPrice: 1500,
        refundAmount: 1500,
      },
      {
        id: 'i2',
        itemName: 'Printer Cartridges',
        quantity: 2,
        unitPrice: 500,
        refundAmount: 1000,
      },
    ],
    notes: 'Refund processed via bank transfer. Supplier acknowledged the damage and processed refund immediately.',
    terms: 'Refund policy: 7 days from delivery for damaged goods. Full refund for unusable items.',
  },
];

const getStatusColor = (status:any) => {
  switch (status) {
    case 'pending': return '#F59E0B';
    case 'completed': return '#10B981';
    case 'rejected': return '#EF4444';
    case 'processing': return '#3B82F6';
    default: return '#8B5CF6';
  }
};

const getStatusText = (status:any) => {
  switch (status) {
    case 'pending': return 'Pending';
    case 'completed': return 'Completed';
    case 'rejected': return 'Rejected';
    case 'processing': return 'Processing';
    default: return 'Draft';
  }
};

export default function PaymentRefundView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the refund by id (mock)
  const refund = mockPaymentRefunds.find((r) => r.id === id) || mockPaymentRefunds[0];

  const totalAmount = refund.items.reduce((sum, item) => sum + item.refundAmount, 0);

  const handleEdit = () => {
    router.push(`/payments/refund/form?id=${refund.id}`);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Refund',
      'Are you sure you want to delete this refund?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };
  const handleSend = () => {
    Alert.alert('Send Refund', 'Send refund confirmation to supplier functionality coming soon.');
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
            : ['#EC4899', '#F472B6', 'rgba(244, 114, 182, 0.2)', 'transparent']
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
              <RotateCcw size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Payment Refund</Text>
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Refund Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(refund.status) }]}>
              <Text style={styles.statusText}>{getStatusText(refund.status)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Refund Number</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{refund.refundNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Supplier</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{refund.supplierName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Original Payment</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{refund.originalPayment}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Refund Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{new Date(refund.refundDate).toLocaleDateString()}</Text>
          </View>
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reason for Refund</Text>
          </View>
          <Text style={[styles.reasonText, { color: theme.colors.textSecondary }]}>{refund.reason}</Text>
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={18} color="#EC4899" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Refunded Items</Text>
          </View>
          {refund.items.map((item, idx) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>{item.itemName}</Text>
                <Text style={[styles.itemMeta, { color: theme.colors.textSecondary }]}>
                  Qty: {item.quantity} x ₹{item.unitPrice}
                </Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.itemAmount, { color: theme.colors.primary }]}>₹{item.refundAmount.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <IndianRupee size={18} color="#F97316" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Refund Amount</Text>
            <Text style={[styles.summaryTotalValue, { color: theme.colors.primary }]}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </BlurView>
        {refund.notes ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{refund.notes}</Text>
          </BlurView>
        ) : null}
        {refund.terms ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Refund Policy</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{refund.terms}</Text>
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
    paddingBottom: 80,
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
  reasonText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontStyle: 'italic',
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
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  notesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: 20,
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
    borderTopWidth: 1,
  },
  footerAction: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 4,
  },
});
