import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Wallet,
  CheckCircle,
  Clock,
  FileText,
  User,
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

// Mock data for other receipts
const mockReceipts = [
  {
    id: '1',
    receiptNumber: 'ORCPT-001',
    payerName: 'ABC Foundation',
    amount: 2000,
    status: 'received',
    date: '2025-06-20',
    paymentMode: 'Cash',
    purpose: 'Donation',
    notes: 'Thank you for your support.',
  },
  {
    id: '2',
    receiptNumber: 'ORCPT-002',
    payerName: 'XYZ Trust',
    amount: 1500,
    status: 'pending',
    date: '2025-06-21',
    paymentMode: 'Bank',
    purpose: 'Grant',
    notes: '',
  },
];

const getStatusColor = (status: string, theme: any) => {
  switch (status) {
    case 'received':
      return theme.colors.success;
    case 'pending':
      return theme.colors.warning;
    default:
      return theme.colors.textSecondary;
  }
};

const getStatusIcon = (status: string, theme: any) => {
  switch (status) {
    case 'received':
      return <CheckCircle size={14} color={theme.colors.success} />;
    case 'pending':
      return <Clock size={14} color={theme.colors.warning} />;
    default:
      return <FileText size={14} color={theme.colors.textSecondary} />;
  }
};

export default function OtherReceiptView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the receipt by id (mock)
  const receipt = mockReceipts.find((r) => r.id === id) || mockReceipts[0];

  const handleEdit = () => {
    router.push(`/receipts/others/form?id=${receipt.id}`);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Receipt',
      'Are you sure you want to delete this receipt?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>  
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#06B6D4', '#22D3EE', 'rgba(34, 211, 238, 0.2)', 'transparent']
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
              <Wallet size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Other Receipt</Text>
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Receipt Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(receipt.status, theme) }]}> 
              {getStatusIcon(receipt.status, theme)}
              <Text style={styles.statusText}>{receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Receipt Number</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{receipt.receiptNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Payer</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{receipt.payerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Purpose</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{receipt.purpose}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{new Date(receipt.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Amount</Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>₹{receipt.amount.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Payment Mode</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{receipt.paymentMode}</Text>
          </View>
        </BlurView>
        {receipt.notes ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{receipt.notes}</Text>
          </BlurView>
        ) : null}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
  notesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: 20,
  },
});
