import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  IndianRupee,
  Plus,
  RefreshCw,
  RotateCcw,
  Trash2,
  User,
  XCircle,
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

// Mock data for sales returns
const mockSalesReturns = [
  {
    id: '1',
    returnNumber: 'RET-001',
    customerName: 'John Doe',
    customerId: '1',
    originalInvoice: 'INV-001',
    amount: 850.0,
    status: 'completed',
    returnDate: '2024-01-16',
    processedDate: '2024-01-17',
    items: 2,
    reason: 'Damaged goods',
  },
  {
    id: '2',
    returnNumber: 'RET-002',
    customerName: 'Jane Smith',
    customerId: '2',
    originalInvoice: 'INV-002',
    amount: 650.5,
    status: 'pending',
    returnDate: '2024-01-21',
    processedDate: null,
    items: 1,
    reason: 'Wrong item delivered',
  },
  {
    id: '3',
    returnNumber: 'DRAFT-RET-003',
    customerName: 'Bob Johnson',
    customerId: '3',
    originalInvoice: 'INV-003',
    amount: 1200.0,
    status: 'draft',
    returnDate: '2024-01-23',
    processedDate: null,
    items: 3,
    reason: 'Customer changed mind',
  },
  {
    id: '4',
    returnNumber: 'RET-004',
    customerName: 'Alice Wilson',
    customerId: '4',
    originalInvoice: 'INV-004',
    amount: 450.25,
    status: 'processing',
    returnDate: '2024-01-24',
    processedDate: null,
    items: 1,
    reason: 'Quality issue',
  },
  {
    id: '5',
    returnNumber: 'RET-005',
    customerName: 'Mike Davis',
    customerId: '5',
    originalInvoice: 'INV-005',
    amount: 320.0,
    status: 'rejected',
    returnDate: '2024-01-25',
    processedDate: '2024-01-26',
    items: 1,
    reason: 'Outside return window',
  },
];

export default function SalesReturnListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [salesReturns, setSalesReturns] = useState(mockSalesReturns);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return '#3B82F6';
      case 'rejected':
        return '#EF4444';
      case 'draft':
        return '#6B7280';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={12} color="#10B981" />;
      case 'pending':
        return <Clock size={12} color="#F59E0B" />;
      case 'processing':
        return <RefreshCw size={12} color="#3B82F6" />;
      case 'rejected':
        return <XCircle size={12} color="#EF4444" />;
      case 'draft':
        return <Edit3 size={12} color="#6B7280" />;
      default:
        return <Clock size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleDeleteReturn = (returnId: any, returnNumber: any) => {
    Alert.alert(
      'Delete Return',
      `Are you sure you want to delete ${returnNumber}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSalesReturns(
              salesReturns.filter((salesReturn) => salesReturn.id !== returnId)
            );
          },
        },
      ]
    );
  };

  const handleEditReturn = (returnId: any) => {
    // Navigate to edit screen
    // router.push(`/sales-return/create/${returnId}`);
  };

  const handleViewReturn = (returnId: any) => {
    // Navigate to view screen
    // router.push(`/sales-return/view/${returnId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredReturns = salesReturns.filter((salesReturn) => {
    if (selectedFilter === 'all') return true;
    return salesReturn.status === selectedFilter;
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
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Sales Returns</Text>
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
          { key: 'all', label: 'All', count: salesReturns.length },
          {
            key: 'completed',
            label: 'Completed',
            count: salesReturns.filter((r) => r.status === 'completed').length,
          },
          {
            key: 'pending',
            label: 'Pending',
            count: salesReturns.filter((r) => r.status === 'pending').length,
          },
          {
            key: 'processing',
            label: 'Processing',
            count: salesReturns.filter((r) => r.status === 'processing').length,
          },
          {
            key: 'rejected',
            label: 'Rejected',
            count: salesReturns.filter((r) => r.status === 'rejected').length,
          },
          {
            key: 'draft',
            label: 'Draft',
            count: salesReturns.filter((r) => r.status === 'draft').length,
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

  const renderReturnCard = (salesReturn: any, index: any) => (
    <Animated.View
      key={salesReturn.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <BlurView
        intensity={themeType === 'dark' ? 15 : 80}
        tint={themeType}
        style={[
          styles.returnCard,
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
          onPress={() => handleViewReturn(salesReturn.id)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={styles.returnNumberContainer}>
              <Text style={[styles.returnNumber, { color: theme.colors.text }]}>
                {salesReturn.returnNumber}
              </Text>
              <View style={styles.statusContainer}>
                {getStatusIcon(salesReturn.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(salesReturn.status) },
                  ]}
                >
                  {salesReturn.status.charAt(0).toUpperCase() +
                    salesReturn.status.slice(1)}
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
                onPress={() => handleEditReturn(salesReturn.id)}
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
                  handleDeleteReturn(salesReturn.id, salesReturn.returnNumber)
                }
              >
                <Trash2 size={14} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.customerContainer}>
            <User size={12} color={theme.colors.textSecondary} />
            <Text style={[styles.customerName, { color: theme.colors.text }]}>
              {salesReturn.customerName}
            </Text>
          </View>

          <View style={styles.originalInvoiceContainer}>
            <Text
              style={[
                styles.originalInvoiceLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Original Invoice:
            </Text>
            <Text
              style={[
                styles.originalInvoiceNumber,
                { color: theme.colors.primary },
              ]}
            >
              {salesReturn.originalInvoice}
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
                  {new Date(salesReturn.returnDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text
                  style={[
                    styles.itemsCount,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {salesReturn.items}{' '}
                  {salesReturn.items === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>

            <View style={styles.amountContainer}>
              <IndianRupee size={14} color={theme.colors.primary} />
              <Text style={[styles.amount, { color: theme.colors.primary }]}>
                {salesReturn.amount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          <View style={styles.reasonContainer}>
            <Text
              style={[
                styles.reasonLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Reason:
            </Text>
            <Text style={[styles.reasonText, { color: theme.colors.text }]}>
              {salesReturn.reason}
            </Text>
          </View>

          {salesReturn.status === 'rejected' && (
            <View style={styles.rejectedWarning}>
              <XCircle size={10} color="#EF4444" />
              <Text style={styles.rejectedText}>
                Return request was rejected
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
        <RotateCcw
          size={48}
          color={theme.colors.textSecondary}
          strokeWidth={1}
        />
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No {selectedFilter === 'all' ? '' : selectedFilter} returns found
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'No sales returns have been created yet'
            : `No ${selectedFilter} returns at the moment`}
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
        onPress={() => router.push('/sales-return/form/create')}
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
                Loading returns...
              </Text>
            </View>
          ) : filteredReturns.length > 0 ? (
            <View style={styles.returnsList}>
              {filteredReturns.map((salesReturn, index) =>
                renderReturnCard(salesReturn, index)
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
  returnsList: {
    gap: 10,
  },
  cardContainer: {
    marginBottom: 2,
  },
  returnCard: {
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
  returnNumberContainer: {
    flex: 1,
  },
  returnNumber: {
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
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  originalInvoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  originalInvoiceLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  originalInvoiceNumber: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
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
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  reasonLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  reasonText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  rejectedWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(239, 68, 68, 0.1)',
  },
  rejectedText: {
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
