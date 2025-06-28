import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  CreditCard,
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
import { useSelector } from 'react-redux';
import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';

interface OtherPayment {
  id: string;
  paymentNumber: string;
  recipientName: string;
  recipientId: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
  paymentDate: string;
  paymentMethod: string;
  category: string;
  notes: string;
  reference: string;
  ledgerFromId: number;
  ledgerToId: number;
  ledgerFromName?: string;
  ledgerToName?: string;
}

export default function OtherPaymentsListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { branchInfo, financialYear } = useSelector(
    (state: any) => state.auth
  );

  // Fetch other payments
  const {
    data: paymentsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.TRANSACTIONS, 'OTHER_PAYMENT', page, searchQuery, selectedFilter],
    queryFn: async () => {
      const params: any = {
        order: 'DESC',
        page,
        take: 20,
        invoiceType: 'OTHER_PAYMENT',
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedFilter !== 'all') {
        params.status = selectedFilter.toUpperCase();
      }

      const response = await apiClient.get(API.TRANSACTIONS, { params });
      return response.data;
    },
  });

  const payments: OtherPayment[] = paymentsData?.data?.rows || [];
  const totalPayments = paymentsData?.data?.count || 0;
  const totalAmount = payments.reduce((sum, pay) => sum + pay.totalAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      case 'processing':
        return '#3B82F6';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={12} color="#10B981" />;
      case 'pending':
        return <Clock size={12} color="#F59E0B" />;
      case 'rejected':
        return <AlertCircle size={12} color="#EF4444" />;
      case 'processing':
        return <Clock size={12} color="#3B82F6" />;
      default:
        return <Clock size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleViewPayment = (paymentId: string) => {
    router.push(`/payments/others/${paymentId}`);
  };

  const onRefresh = () => {
    refetch();
  };

  const filteredPayments = payments.filter((pay) => {
    if (selectedFilter === 'all') return true;
    return pay.status?.toLowerCase() === selectedFilter;
  });

  const statusCounts = {
    all: totalPayments,
    completed: payments.filter((p) => p.status?.toLowerCase() === 'completed').length,
    pending: payments.filter((p) => p.status?.toLowerCase() === 'pending').length,
    rejected: payments.filter((p) => p.status?.toLowerCase() === 'rejected').length,
    processing: payments.filter((p) => p.status?.toLowerCase() === 'processing').length,
  };

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
            <CreditCard size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Other Payments</Text>
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
              <Text style={styles.summaryLabel}>Total Payments</Text>
              <Text style={styles.summaryValue}>{totalPayments}</Text>
            </BlurView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryValue}>
                ₹{totalAmount.toLocaleString('en-IN')}
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
          { key: 'all', label: 'All', count: statusCounts.all },
          {
            key: 'completed',
            label: 'Completed',
            count: statusCounts.completed,
          },
          {
            key: 'pending',
            label: 'Pending',
            count: statusCounts.pending,
          },
          {
            key: 'rejected',
            label: 'Rejected',
            count: statusCounts.rejected,
          },
          {
            key: 'processing',
            label: 'Processing',
            count: statusCounts.processing,
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

  const renderPaymentCard = (pay: OtherPayment, index: number) => (
    <Animated.View
      key={pay.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleViewPayment(pay.id)}
        activeOpacity={0.95}
        style={styles.cardTouchable}
      >
        <BlurView
          intensity={themeType === 'dark' ? 20 : 85}
          tint={themeType}
          style={[
            styles.paymentCard,
            {
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        >
          <View style={styles.cardContent}>
            {/* Top Row - Payment Number and Status */}
            <View style={styles.topRow}>
              <Text style={[styles.paymentNumber, { color: theme.colors.text }]}> 
                {pay.paymentNumber || `PAY-${pay.id}`}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(pay.status)}15` }]}> 
                {getStatusIcon(pay.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(pay.status) },
                  ]}
                >
                  {pay.status?.charAt(0).toUpperCase() + pay.status?.slice(1) || 'Unknown'}
                </Text>
              </View>
            </View>

            {/* Recipient Row */}
            <View style={styles.recipientRow}>
              <User size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.recipientName, { color: theme.colors.textSecondary }]}> 
                {pay.ledgerToName || 'Unknown Account'}
              </Text>
            </View>

            {/* Category and Payment Method Row */}
            <View style={styles.categoryRow}>
              <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}> 
                {pay.ledgerFromName || 'Unknown'} • {pay.paymentMethod}
              </Text>
            </View>

            {/* Bottom Row - Date, Amount and chevron */}
            <View style={styles.bottomRow}>
              <View style={styles.dateContainer}>
                <Calendar size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}> 
                  {new Date(pay.paymentDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <View style={styles.amountContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text style={[styles.amount, { color: theme.colors.primary }]}> 
                    {pay.totalAmount.toLocaleString('en-IN')}
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
          <CreditCard
            size={56}
            color={theme.colors.textSecondary}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No {selectedFilter === 'all' ? '' : selectedFilter} payments
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Create your first other payment to get started'
            : `No ${selectedFilter} payments found`}
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
        onPress={() => router.push('/payments/others/form')}
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
              refreshing={false} 
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
                Loading payments...
              </Text>
            </View>
          ) : isError ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.colors.text }]}>
                Failed to load payments
              </Text>
              <TouchableOpacity
                style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => refetch()}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : filteredPayments.length > 0 ? (
            <View style={styles.paymentsList}>
              {filteredPayments.map((pay, index) =>
                renderPaymentCard(pay, index)
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
  paymentsList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  paymentCard: {
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
  paymentNumber: {
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
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoryRow: {
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
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
