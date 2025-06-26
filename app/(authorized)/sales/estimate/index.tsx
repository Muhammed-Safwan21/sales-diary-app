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
  FileBarChart,
  IndianRupee,
  Plus,
  User,
  ChevronRight,
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

// Mock data for sales estimates
const mockEstimates = [
  {
    id: '1',
    estimateNumber: 'EST-001',
    customerName: 'John Doe',
    customerId: '1',
    amount: 12000.0,
    status: 'accepted',
    estimateDate: '2025-01-10',
    validTill: '2025-01-20',
    items: 4,
  },
  {
    id: '2',
    estimateNumber: 'EST-002',
    customerName: 'Acme Corp',
    customerId: '2',
    amount: 8500.5,
    status: 'pending',
    estimateDate: '2025-01-15',
    validTill: '2025-01-25',
    items: 2,
  },
  {
    id: '3',
    estimateNumber: 'EST-003',
    customerName: 'Jane Smith',
    customerId: '3',
    amount: 5000.0,
    status: 'rejected',
    estimateDate: '2025-01-18',
    validTill: '2025-01-28',
    items: 1,
  },
  {
    id: '4',
    estimateNumber: 'EST-004',
    customerName: 'Global Traders',
    customerId: '4',
    amount: 15000.0,
    status: 'accepted',
    estimateDate: '2025-01-20',
    validTill: '2025-01-30',
    items: 5,
  },
  {
    id: '5',
    estimateNumber: 'EST-005',
    customerName: 'Mega Supplies',
    customerId: '5',
    amount: 7000.0,
    status: 'pending',
    estimateDate: '2025-01-22',
    validTill: '2025-02-01',
    items: 3,
  },
];

export default function SalesEstimateListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [estimates, setEstimates] = useState(mockEstimates);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle size={12} color="#10B981" />;
      case 'pending':
        return <Clock size={12} color="#F59E0B" />;
      case 'rejected':
        return <AlertCircle size={12} color="#EF4444" />;
      default:
        return <Clock size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleViewEstimate = (estimateId: string) => {
    // Navigate to view screen (to be implemented)
    router.push(`/sales/estimate/${estimateId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredEstimates = estimates.filter((est) => {
    if (selectedFilter === 'all') return true;
    return est.status === selectedFilter;
  });

  const renderHeader = () => (
    <LinearGradient
      colors={
        themeType === 'dark'
          ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
          : ['#EC4899', '#F472B6', 'rgba(236, 72, 153, 0.2)', 'transparent']
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
            <FileBarChart size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Sales Estimates</Text>
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
              <Text style={styles.summaryLabel}>Total Estimates</Text>
              <Text style={styles.summaryValue}>{estimates.length}</Text>
            </BlurView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryValue}>
                ₹{estimates.reduce((sum, est) => sum + est.amount, 0).toLocaleString('en-IN')}
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
          { key: 'all', label: 'All', count: estimates.length },
          {
            key: 'accepted',
            label: 'Accepted',
            count: estimates.filter((e) => e.status === 'accepted').length,
          },
          {
            key: 'pending',
            label: 'Pending',
            count: estimates.filter((e) => e.status === 'pending').length,
          },
          {
            key: 'rejected',
            label: 'Rejected',
            count: estimates.filter((e) => e.status === 'rejected').length,
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

  const renderEstimateCard = (est: any, index: number) => (
    <Animated.View
      key={est.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleViewEstimate(est.id)}
        activeOpacity={0.95}
        style={styles.cardTouchable}
      >
        <BlurView
          intensity={themeType === 'dark' ? 20 : 85}
          tint={themeType}
          style={[
            styles.billCard,
            {
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        >
          <View style={styles.cardContent}>
            {/* Top Row - Estimate Number and Status */}
            <View style={styles.topRow}>
              <Text style={[styles.billNumber, { color: theme.colors.text }]}> 
                {est.estimateNumber}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(est.status)}15` }]}> 
                {getStatusIcon(est.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(est.status) },
                  ]}
                >
                  {est.status.charAt(0).toUpperCase() + est.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Customer Row */}
            <View style={styles.supplierRow}>
              <User size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.supplierName, { color: theme.colors.textSecondary }]}> 
                {est.customerName}
              </Text>
            </View>

            {/* Bottom Row - Date, Amount and chevron */}
            <View style={styles.bottomRow}>
              <View style={styles.dateContainer}>
                <Calendar size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}> 
                  {new Date(est.estimateDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <View style={styles.amountContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text style={[styles.amount, { color: theme.colors.primary }]}> 
                    {est.amount.toLocaleString('en-IN')}
                  </Text>
                </View>
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>
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
          <FileBarChart
            size={56}
            color={theme.colors.textSecondary}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No {selectedFilter === 'all' ? '' : selectedFilter} estimates
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Create your first sales estimate to get started'
            : `No ${selectedFilter} estimates found`}
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
        onPress={() => router.push('/sales/estimate/form')}
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
                Loading estimates...
              </Text>
            </View>
          ) : filteredEstimates.length > 0 ? (
            <View style={styles.billsList}>
              {filteredEstimates.map((est, index) =>
                renderEstimateCard(est, index)
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
  billsList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  billCard: {
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
  billNumber: {
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
