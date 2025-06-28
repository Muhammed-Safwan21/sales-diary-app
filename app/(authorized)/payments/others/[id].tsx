import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    CreditCard,
    Download,
    Edit,
    IndianRupee,
    Package,
    Printer,
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
import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';

interface OtherPayment {
  id: string;
  paymentNumber: string;
  recipientName: string;
  recipientId: string;
  totalAmount: number;
  paidAmount: number;
  discountAmount: number;
  discountPercentage: number;
  taxPercentage: number;
  taxAmount: number;
  status: string;
  paymentDate: string;
  paymentMethod: string;
  category: string;
  referenceNumber: string;
  notes: string;
  terms: string;
  ledgerFromId: number;
  ledgerToId: number;
  ledgerFromName?: string;
  ledgerToName?: string;
  items: Array<{
    id: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }>;
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': return '#F59E0B';
    case 'completed': return '#10B981';
    case 'rejected': return '#EF4444';
    case 'processing': return '#3B82F6';
    default: return '#8B5CF6';
  }
};

const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'Pending';
    case 'completed': return 'Completed';
    case 'rejected': return 'Rejected';
    case 'processing': return 'Processing';
    default: return 'Draft';
  }
};

export default function OtherPaymentView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams();

  // Fetch payment data
  const { data: paymentData, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.TRANSACTIONS, id],
    queryFn: async () => {
      const response = await apiClient.get(`${API.TRANSACTIONS}${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  // Delete payment mutation
  const { mutate: deletePayment, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete(`${API.TRANSACTIONS}${id}`);
      return response.data;
    },
    onSuccess: () => {
      console.log('Payment deleted successfully');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TRANSACTIONS] });
      router.back();
    },
    onError: (error: any) => {
      console.error('Delete payment error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to delete payment.'
      );
    },
  });

  const payment: OtherPayment = paymentData?.data;

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading payment details...
          </Text>
        </View>
      </View>
    );
  }

  if (isError || !payment) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Failed to load payment details
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const totalAmount = payment.totalAmount;

  const handleEdit = () => {
    router.push(`/payments/others/form?id=${payment.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Payment',
      'Are you sure you want to delete this payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deletePayment() },
      ]
    );
  };

  const handleSend = () => {
    Alert.alert('Send Payment', 'Send payment confirmation functionality coming soon.');
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
              <CreditCard size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Payment</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Edit size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]}>
              <Text style={styles.statusText}>{getStatusText(payment.status)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Payment Number</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {payment.paymentNumber || `PAY-${payment.id}`}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Recipient</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {payment.ledgerToName || 'Unknown Account'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Category</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {payment.ledgerFromName || 'Unknown'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Payment Method</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{payment.paymentMethod}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Payment Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {new Date(payment.paymentDate).toLocaleDateString()}
            </Text>
          </View>
          {payment.referenceNumber && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Reference Number</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{payment.referenceNumber}</Text>
            </View>
          )}
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <IndianRupee size={18} color="#F97316" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Amount</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{payment.totalAmount.toFixed(2)}</Text>
          </View>
          {payment.discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Discount</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{payment.discountAmount.toFixed(2)}</Text>
            </View>
          )}
          {payment.taxAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Tax</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{payment.taxAmount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Paid Amount</Text>
            <Text style={[styles.summaryTotalValue, { color: theme.colors.primary }]}>₹{payment.paidAmount.toFixed(2)}</Text>
          </View>
        </BlurView>
        {payment.notes ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{payment.notes}</Text>
          </BlurView>
        ) : null}
        {payment.terms ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Terms</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{payment.terms}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  retryButton: {
    padding: 16,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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
