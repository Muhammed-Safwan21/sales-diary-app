import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  FileSignature,
  XCircle,
  BookOpen,
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

// Mock data for journals
const mockJournals = [
  {
    id: '1',
    date: '2025-06-20',
    description: 'Salary Payment',
    amount: 25000,
    status: 'posted',
    type: 'Payment',
    accounts: [
      { name: 'Cash Ledger', type: 'Cash', amount: -25000 },
      { name: 'Salary Expense', type: 'Expense', amount: 25000 },
    ],
  },
  {
    id: '2',
    date: '2025-06-21',
    description: 'Office Rent',
    amount: 12000,
    status: 'draft',
    type: 'Expense',
    accounts: [
      { name: 'Bank Ledger', type: 'Bank', amount: -12000 },
      { name: 'Rent Expense', type: 'Expense', amount: 12000 },
    ],
  },
];

const getStatusColor = (status: string, theme: any) => {
  switch (status) {
    case 'posted':
      return theme.colors.success;
    case 'draft':
      return theme.colors.warning;
    default:
      return theme.colors.textSecondary;
  }
};

const getStatusIcon = (status: string, theme: any) => {
  switch (status) {
    case 'posted':
      return <CheckCircle size={14} color={theme.colors.success} />;
    case 'draft':
      return <FileSignature size={14} color={theme.colors.warning} />;
    default:
      return <FileText size={14} color={theme.colors.textSecondary} />;
  }
};

export default function JournalView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the journal by id (mock)
  const journal = mockJournals.find((j) => j.id === id) || mockJournals[0];

  const handleEdit = () => {
    router.push(`/journal/form?id=${journal.id}`);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Journal',
      'Are you sure you want to delete this journal entry?',
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
            : ['#F59E0B', '#FBBF24', 'rgba(251, 191, 36, 0.2)', 'transparent']
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
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Journal</Text>
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Journal Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(journal.status, theme) }]}> 
              {getStatusIcon(journal.status, theme)}
              <Text style={styles.statusText}>{journal.status.charAt(0).toUpperCase() + journal.status.slice(1)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Description</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{journal.description}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Type</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{journal.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Date</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{new Date(journal.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Amount</Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>₹{journal.amount.toLocaleString('en-IN')}</Text>
          </View>
        </BlurView>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Accounts Involved</Text>
          </View>
          {journal.accounts.map((acc, idx) => (
            <View key={idx} style={styles.accountRow}>
              <View style={styles.accountLeft}>
                <BookOpen size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.accountName, { color: theme.colors.text }]}>{acc.name}</Text>
                <Text style={[styles.accountType, { color: theme.colors.textSecondary }]}>({acc.type})</Text>
              </View>
              <Text style={[styles.accountAmount, { color: acc.amount < 0 ? theme.colors.error : theme.colors.success }]}>₹{Math.abs(acc.amount).toLocaleString('en-IN')}</Text>
            </View>
          ))}
        </BlurView>
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
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  accountType: {
    fontSize: 12,
    marginLeft: 4,
  },
  accountAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
