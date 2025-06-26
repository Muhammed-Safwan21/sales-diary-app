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
  FileText,
  IndianRupee,
  Plus,
  User,
  ChevronRight,
  RotateCcw,
  Send,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
    returnNumber: 'SR-0001',
    customerName: 'John Doe',
    customerId: '1',
    amount: 4200.0,
    status: 'draft',
    returnDate: '2025-01-25',
    refundDate: '2025-02-10',
    items: 2,
    originalInvoiceNumber: 'INV-0001',
  },
  {
    id: '2',
    returnNumber: 'SR-0002',
    customerName: 'Acme Corp',
    customerId: '2',
    amount: 3100.5,
    status: 'sent',
    returnDate: '2025-01-24',
    refundDate: '2025-02-08',
    items: 1,
    originalInvoiceNumber: 'INV-0002',
  },
  {
    id: '3',
    returnNumber: 'SR-0003',
    customerName: 'Jane Smith',
    customerId: '3',
    amount: 7800.0,
    status: 'accepted',
    returnDate: '2025-01-23',
    refundDate: '2025-02-07',
    items: 3,
    originalInvoiceNumber: 'INV-0003',
  },
  {
    id: '4',
    returnNumber: 'SR-0004',
    customerName: 'Beta Traders',
    customerId: '4',
    amount: 2500.25,
    status: 'completed',
    returnDate: '2025-01-22',
    refundDate: '2025-01-30',
    items: 1,
    originalInvoiceNumber: 'INV-0004',
  },
  {
    id: '5',
    returnNumber: 'SR-0005',
    customerName: 'Gamma Enterprises',
    customerId: '5',
    amount: 1600.0,
    status: 'cancelled',
    returnDate: '2025-01-21',
    refundDate: '2025-02-05',
    items: 2,
    originalInvoiceNumber: 'INV-0005',
  },
];

export default function SalesReturnsScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [salesReturns, setSalesReturns] = useState(mockSalesReturns);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#8B5CF6';
      case 'sent':
        return '#F59E0B';
      case 'accepted':
        return '#10B981';
      case 'completed':
        return '#06B6D4';
      case 'cancelled':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText size={12} color="#8B5CF6" />;
      case 'sent':
        return <Send size={12} color="#F59E0B" />;
      case 'accepted':
        return <CheckCircle size={12} color="#10B981" />;
      case 'completed':
        return <RotateCcw size={12} color="#06B6D4" />;
      case 'cancelled':
        return <X size={12} color="#EF4444" />;
      default:
        return <Clock size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleViewSalesReturn = (returnId: string) => {
    // Navigate to view screen
    router.push(`/sales/return/${returnId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredSalesReturns = salesReturns.filter((returnItem) => {
    if (selectedFilter === 'all') return true;
    return returnItem.status === selectedFilter;
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
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <RotateCcw size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Sales Returns</Text>
          </View>

          <View style={styles.headerRightSpacer} />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Returns</Text>
              <Text style={styles.summaryValue}>{salesReturns.length}</Text>
            </BlurView>
            
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryValue}>
                ₹{salesReturns.reduce((sum, returnItem) => sum + returnItem.amount, 0).toLocaleString('en-IN')}
              </Text>
            </BlurView>
          </View>
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
            key: 'draft',
            label: 'Draft',
            count: salesReturns.filter((r) => r.status === 'draft').length,
          },
          {
            key: 'sent',
            label: 'Sent',
            count: salesReturns.filter((r) => r.status === 'sent').length,
          },
          {
            key: 'accepted',
            label: 'Accepted',
            count: salesReturns.filter((r) => r.status === 'accepted').length,
          },
          {
            key: 'completed',
            label: 'Completed',
            count: salesReturns.filter((r) => r.status === 'completed').length,
          },
          {
            key: 'cancelled',
            label: 'Cancelled',
            count: salesReturns.filter((r) => r.status === 'cancelled').length,
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
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor:
                  selectedFilter === filter.key
                    ? theme.colors.primary
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.5)',
                shadowColor: selectedFilter === filter.key ? theme.colors.primary : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: selectedFilter === filter.key ? 0.3 : 0,
                shadowRadius: 4,
                elevation: selectedFilter === filter.key ? 4 : 0,
              },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterTabText,
                {
                  color:
                    selectedFilter === filter.key
                      ? '#FFFFFF'
                      : theme.colors.text,
                  fontWeight: selectedFilter === filter.key ? '700' : '600',
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
                        ? 'rgba(255, 255, 255, 0.25)'
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

  const renderSalesReturnCard = (returnItem: any, index: number) => (
    <Animated.View
      key={returnItem.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleViewSalesReturn(returnItem.id)}
        activeOpacity={0.95}
        style={styles.cardTouchable}
      >
        <BlurView
          intensity={themeType === 'dark' ? 20 : 85}
          tint={themeType}
          style={[
            styles.returnCard,
            {
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        >
          <View style={styles.cardContent}>
            {/* Top Row - Return Number and Status */}
            <View style={styles.topRow}>
              <Text style={[styles.returnNumber, { color: theme.colors.text }]}> 
                {returnItem.returnNumber}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(returnItem.status)}15` }]}> 
                {getStatusIcon(returnItem.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(returnItem.status) },
                  ]}
                >
                  {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Customer Row */}
            <View style={styles.supplierRow}>
              <User size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.supplierName, { color: theme.colors.textSecondary }]}> 
                {returnItem.customerName}
              </Text>
            </View>

            {/* Bottom Row - Date, Amount and chevron */}
            <View style={styles.bottomRow}>
              <View style={styles.dateContainer}>
                <Calendar size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}> 
                  {new Date(returnItem.returnDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </Text>
              </View>
              
              <View style={styles.rightSection}>
                <View style={styles.amountContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text style={[styles.amount, { color: theme.colors.primary }]}> 
                    {returnItem.amount.toLocaleString('en-IN')}
                  </Text>
                </View>
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>
            </View>

            {/* Items count info and original invoice */}
            <View style={styles.itemsInfo}>
              <RotateCcw size={12} color={theme.colors.textSecondary} />
              <Text style={[styles.itemsText, { color: theme.colors.textSecondary }]}> 
                {returnItem.items} item{returnItem.items !== 1 ? 's' : ''}
              </Text>
              <Text style={[styles.separator, { color: theme.colors.textSecondary }]}>•</Text>
              <Text style={[styles.originalOrderText, { color: theme.colors.textSecondary }]}> 
                From: {returnItem.originalInvoiceNumber}
              </Text>
              {returnItem.refundDate && (
                <>
                  <Text style={[styles.separator, { color: theme.colors.textSecondary }]}>•</Text>
                  <Text style={[styles.refundText, { color: theme.colors.textSecondary }]}> 
                    Refund: {new Date(returnItem.refundDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </>
              )}
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
      <BlurView
        intensity={themeType === 'dark' ? 20 : 80}
        tint={themeType}
        style={styles.emptyCard}
      >
        <View style={styles.emptyIconContainer}>
          <RotateCcw
            size={56}
            color={theme.colors.textSecondary}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No {selectedFilter === 'all' ? '' : selectedFilter} sales returns
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Create your first sales return to get started'
            : `No ${selectedFilter} sales returns found`}
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
        onPress={() => router.push('/sales/return/form')}
        activeOpacity={0.8}
      >
        <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
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
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
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
                Loading sales returns...
              </Text>
            </View>
          ) : filteredSalesReturns.length > 0 ? (
            <View style={styles.returnsList}>
              {filteredSalesReturns.map((returnItem, index) =>
                renderSalesReturnCard(returnItem, index)
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
    paddingBottom: 24,
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  headerRightSpacer: {
    width: 42,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    overflow: 'hidden',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  filterTabsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    gap: 10,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    minHeight: 40,
  },
  filterTabText: {
    fontSize: 13,
    letterSpacing: -0.1,
  },
  filterTabBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  filterTabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  returnsList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  returnCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  returnNumber: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  supplierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  supplierName: {
    fontSize: 13,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  itemsText: {
    fontSize: 11,
    fontWeight: '500',
  },
  separator: {
    fontSize: 11,
    fontWeight: '500',
  },
  originalOrderText: {
    fontSize: 11,
    fontWeight: '500',
  },
  refundText: {
    fontSize: 11,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 80,
  },
  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 48,
    alignItems: 'center',
    overflow: 'hidden',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
});
