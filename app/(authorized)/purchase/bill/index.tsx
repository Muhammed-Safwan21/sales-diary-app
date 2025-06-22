import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  FileText,
  IndianRupee,
  Plus,
  Trash2,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - replace with your actual data source
const mockPurchaseBills = [
  {
    id: '1',
    billNumber: 'PB-001',
    supplierName: 'Acme Suppliers',
    supplierId: '1',
    amount: 2500.0,
    status: 'paid',
    billDate: '2025-01-15',
    dueDate: '2025-02-15',
    items: 3,
  },
  {
    id: '2',
    billNumber: 'PB-002',
    supplierName: 'Global Traders',
    supplierId: '2',
    amount: 1750.5,
    status: 'pending',
    billDate: '2025-01-20',
    dueDate: '2025-02-20',
    items: 2,
  },
  {
    id: '3',
    billNumber: 'PB-003',
    supplierName: 'Tech Imports',
    supplierId: '3',
    amount: 3200.0,
    status: 'partial',
    billDate: '2025-01-22',
    dueDate: '2025-02-22',
    items: 5,
  },
  {
    id: '4',
    billNumber: 'PB-004',
    supplierName: 'Prime Distributors',
    supplierId: '4',
    amount: 890.25,
    status: 'overdue',
    billDate: '2025-01-10',
    dueDate: '2025-01-25',
    items: 1,
  },
  {
    id: '5',
    billNumber: 'PB-005',
    supplierName: 'Mega Supplies',
    supplierId: '5',
    amount: 4500.0,
    status: 'pending',
    billDate: '2025-01-25',
    dueDate: '2025-02-25',
    items: 8,
  },
];

export default function PurchaseBillListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [purchaseBills, setPurchaseBills] = useState(mockPurchaseBills);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'partial':
        return '#3B82F6';
      case 'overdue':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={12} color="#10B981" />;
      case 'pending':
        return <Clock size={12} color="#F59E0B" />;
      case 'partial':
        return <Clock size={12} color="#3B82F6" />;
      case 'overdue':
        return <AlertCircle size={12} color="#EF4444" />;
      default:
        return <Clock size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleDeletePurchaseBill = (billId: string, billNumber: string) => {
    Alert.alert(
      'Delete Purchase Bill',
      `Are you sure you want to delete ${billNumber}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPurchaseBills(
              purchaseBills.filter((bill) => bill.id !== billId)
            );
          },
        },
      ]
    );
  };

  const handleEditPurchaseBill = (billId: string) => {
    // Navigate to edit screen
    // router.push(`/purchase-bill/form/${billId}`);
  };

  const handleViewPurchaseBill = (billId: string) => {
    // Navigate to view screen
    // router.push('/purchase-bill/preview');
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredPurchaseBills = purchaseBills.filter((bill) => {
    if (selectedFilter === 'all') return true;
    return bill.status === selectedFilter;
  });

  const renderHeader = () => (
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
            <FileText size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Purchase Bills</Text>
          </View>

          <View style={styles.headerRightSpacer} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderFilterTabs = () => (
    <Animated.View
      entering={FadeInUp.delay(100)}
      style={styles.filterContainer}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterTabsContainer}
      >
        {[
          { key: 'all', label: 'All', count: purchaseBills.length },
          {
            key: 'paid',
            label: 'Paid',
            count: purchaseBills.filter((b) => b.status === 'paid').length,
          },
          {
            key: 'pending',
            label: 'Pending',
            count: purchaseBills.filter((b) => b.status === 'pending').length,
          },
          {
            key: 'partial',
            label: 'Partial',
            count: purchaseBills.filter((b) => b.status === 'partial').length,
          },
          {
            key: 'overdue',
            label: 'Overdue',
            count: purchaseBills.filter((b) => b.status === 'overdue').length,
          },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              {
                backgroundColor:
                  selectedFilter === filter.key
                    ? theme.colors.primary
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.7)',
                borderColor:
                  selectedFilter === filter.key
                    ? theme.colors.primary
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.3)',
              },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                {
                  color:
                    selectedFilter === filter.key
                      ? '#FFFFFF'
                      : theme.colors.text,
                  fontWeight: selectedFilter === filter.key ? '600' : '500',
                },
              ]}
            >
              {filter.label}
            </Text>
            {filter.count > 0 && (
              <View
                style={[
                  styles.filterTabBadge,
                  {
                    backgroundColor:
                      selectedFilter === filter.key
                        ? 'rgba(255, 255, 255, 0.2)'
                        : `${theme.colors.primary}20`,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterTabBadgeText,
                    {
                      color:
                        selectedFilter === filter.key
                          ? '#FFFFFF'
                          : theme.colors.primary,
                    },
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const renderPurchaseBillCard = (bill: any, index: number) => (
    <Animated.View
      key={bill.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <BlurView
        intensity={themeType === 'dark' ? 15 : 80}
        tint={themeType}
        style={[
          styles.billCard,
          {
            borderColor:
              themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.3)',
          },
        ]}
      >
        <LinearGradient
          colors={[
            `${theme.colors.primary}08`,
            `${theme.colors.primary}02`,
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradientOverlay}
        />

        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => handleViewPurchaseBill(bill.id)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={styles.billNumberContainer}>
              <Text style={[styles.billNumber, { color: theme.colors.text }]}>
                {bill.billNumber}
              </Text>
              <View style={styles.statusContainer}>
                {getStatusIcon(bill.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(bill.status) },
                  ]}
                >
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.editButton,
                  { backgroundColor: `${theme.colors.primary}15` },
                ]}
                onPress={() => handleEditPurchaseBill(bill.id)}
              >
                <Edit3 size={14} color={theme.colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.deleteButton,
                  { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                ]}
                onPress={() =>
                  handleDeletePurchaseBill(bill.id, bill.billNumber)
                }
              >
                <Trash2 size={14} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.supplierContainer}>
            <User size={12} color={theme.colors.textSecondary} />
            <Text style={[styles.supplierName, { color: theme.colors.text }]}>
              {bill.supplierName}
            </Text>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Calendar size={10} color={theme.colors.textSecondary} />
                <Text
                  style={[
                    styles.detailText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {new Date(bill.billDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text
                  style={[
                    styles.itemsCount,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {bill.items} {bill.items === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>

            <View style={styles.amountContainer}>
              <IndianRupee size={14} color={theme.colors.primary} />
              <Text style={[styles.amount, { color: theme.colors.primary }]}>
                {bill.amount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          {bill.status === 'overdue' && (
            <View style={styles.overdueWarning}>
              <AlertCircle size={10} color="#EF4444" />
              <Text style={styles.overdueText}>
                Due{' '}
                {Math.ceil(
                  (new Date().getTime() - new Date(bill.dueDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                days ago
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
      <BlurView
        intensity={themeType === 'dark' ? 15 : 80}
        tint={themeType}
        style={styles.emptyCard}
      >
        <FileText
          size={48}
          color={theme.colors.textSecondary}
          strokeWidth={1}
        />
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No {selectedFilter === 'all' ? '' : selectedFilter} purchase bills
          found
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Start by creating your first purchase bill'
            : `No ${selectedFilter} purchase bills at the moment`}
        </Text>
      </BlurView>
    </Animated.View>
  );

  const renderFloatingActionButton = () => (
    <Animated.View
      entering={FadeIn.delay(500)}
      style={styles.floatingButtonContainer}
    >
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          },
        ]}
        onPress={() => router.push('/purchase/bill/form/create')}
        activeOpacity={0.8}
      >
        <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {renderHeader()}

      <View style={styles.content}>
        {renderFilterTabs()}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Loading purchase bills...
              </Text>
            </View>
          ) : filteredPurchaseBills.length > 0 ? (
            <View style={styles.billsList}>
              {filteredPurchaseBills.map((bill, index) =>
                renderPurchaseBillCard(bill, index)
              )}
            </View>
          ) : (
            renderEmptyState()
          )}
        </ScrollView>
      </View>

      {renderFloatingActionButton()}
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
  headerRightSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    marginTop: -10,
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  filterTabsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    minHeight: 32,
  },
  filterTabText: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  filterTabBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterTabBadgeText: {
    fontSize: 9,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  billsList: {
    gap: 10,
  },
  cardContainer: {
    marginBottom: 2,
  },
  billCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 14,
    position: 'relative',
    zIndex: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  billNumberContainer: {
    flex: 1,
  },
  billNumber: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  editButton: {
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  deleteButton: {
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  supplierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailRow: {
    flex: 1,
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
    fontWeight: '500',
  },
  itemsCount: {
    fontSize: 11,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  overdueWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(239, 68, 68, 0.1)',
  },
  overdueText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 60,
  },
  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
