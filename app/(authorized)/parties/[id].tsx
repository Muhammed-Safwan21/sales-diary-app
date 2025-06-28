import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit3,
  FileText,
  IndianRupee,
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  AlertCircle,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export default function PartyView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch party details
  const { data, isLoading } = useQuery({
    queryKey: ['party', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await apiClient.get(`/contacts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const party = data?.data || {};
  const outstandingAmount = parseFloat(party.ledger?.totalAmount || '0');
  const hasOutstanding = outstandingAmount > 0;

  const handleEdit = () => {
    router.push(`/parties/form?id=${id}&contactType=${party.contactType || 'CUSTOMER'}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Party',
      'Are you sure you want to delete this party?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await apiClient.delete(`/contacts/${id}`);
              Alert.alert('Success', 'Party deleted successfully.', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (err: any) {
              Alert.alert('Error', err?.response?.data?.message || 'Failed to delete party.');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
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
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <User size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{ party?.contactType === 'CUSTOMER' ? 'Customer' : 'Supplier' } Details</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Edit3 size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleDelete} disabled={isDeleting}>
                <Trash2 size={20} color={isDeleting ? '#aaa' : '#EF4444'} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card 1: Basic Details */}
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Basic Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Name</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.name || '-'}</Text>
          </View>
          {party.businessName ? (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Business</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.businessName}</Text>
            </View>
          ) : null}
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Type</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.contactType || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Status</Text>
            <Text style={[styles.detailValue, { color: party.isActive ? theme.colors.success : theme.colors.error }]}>{party.isActive ? 'Active' : 'Inactive'}</Text>
          </View>
        </BlurView>
        {/* Card 2: Contact & Identifiers */}
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Phone size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact & Identifiers</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Phone</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.mobile || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Email</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.email || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>GSTIN</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.gstin || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>PAN</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.pan || '-'}</Text>
          </View>
        </BlurView>
        {/* Card 3: Financial & Address */}
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <IndianRupee size={18} color={theme.colors.success} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Financial & Address</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Outstanding Amount</Text>
            <Text style={[styles.detailValue, { color: hasOutstanding ? theme.colors.success : theme.colors.textSecondary }]}>₹{outstandingAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Opening Balance</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.ledger?.openingBalance || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Address</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.address || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>City</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.city || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>State</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.state || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Country</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.country || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Pincode</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{party.pincode || '-'}</Text>
          </View>
          {hasOutstanding && (
            <View style={styles.overdueWarning}>
              <AlertCircle size={12} color={theme.colors.error} />
              <Text style={[styles.overdueText, { color: theme.colors.error }]}>Outstanding amount pending</Text>
            </View>
          )}
        </BlurView>
        {/* Notes section if present */}
        {party.notes ? (
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
            <View style={styles.sectionHeader}>
              <FileText size={18} color={theme.colors.textSecondary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{party.notes}</Text>
          </BlurView>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    paddingBottom: 20,
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
    maxWidth: 180,
    textAlign: 'right',
  },
  notesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  overdueWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(239, 68, 68, 0.15)',
  },
  overdueText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
