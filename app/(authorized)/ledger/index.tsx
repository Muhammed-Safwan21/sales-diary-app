import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  BookOpen,
  Plus,
  ChevronRight,
  CheckCircle,
  XCircle,
  FileText,
  Search,
  X,
} from 'lucide-react-native';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Define types for better type safety
interface LedgerData {
  data: any[];
  meta: {
    itemCount: number;
    hasNextPage: boolean;
  };
}

export default function LedgerListingScreen() {
  const { theme, themeType } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allLedgers, setAllLedgers] = useState<any[]>([]);
  
  const { branchInfo, user } = useSelector((state: any) => state.auth);
  const itemsPerPage = 10;

  const { data, isLoading, error, refetch, isFetching } = useQuery<LedgerData>({
    queryKey: [QUERY_KEY.CHART_OF_ACCOUNTS, searchQuery, currentPage, selectedFilter],
    queryFn: async (): Promise<LedgerData> => {
      const response = await apiClient.get(`${API.CHART_OF_ACCOUNTS}`, {
        params: {
          query: searchQuery,
          page: currentPage,
          take: itemsPerPage,
          order: 'ASC',
          adminId: user?.id,
          branchId: branchInfo?.id,
        },
      });
      return response.data;
    },
    enabled: !!(user?.id && branchInfo?.id),
  });

  // Handle success and error cases with useEffect
  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setAllLedgers(data.data || []);
      } else {
        setAllLedgers((prev: any[]) => [...prev, ...(data.data || [])]);
      }
      setIsLoadingMore(false);
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching ledgers:', error);
      setIsLoadingMore(false);
      Alert.alert('Error', 'Failed to fetch ledgers. Please try again.');
    }
  }, [error]);

  const meta = data?.meta || { itemCount: 0, hasNextPage: false };
  const ledgers = allLedgers || [];

  // Filter ledgers based on selected filter
  const filteredLedgers = useMemo(() => {
    let filtered = [...ledgers];
    
    // Apply status filter if needed (you can add status logic based on your business rules)
    if (selectedFilter === 'active') {
      filtered = filtered.filter((ledger: any) => ledger.deletedAt === null);
    } else if (selectedFilter === 'inactive') {
      filtered = filtered.filter((ledger: any) => ledger.deletedAt !== null);
    }
    
    return filtered;
  }, [ledgers, selectedFilter]);

  const getStatusColor = (ledger: any) => {
    if (ledger.deletedAt) {
      return theme.colors.error;
    }
    return theme.colors.success;
  };

  const getStatusIcon = (ledger: any) => {
    if (ledger.deletedAt) {
      return <XCircle size={12} color={theme.colors.error} />;
    }
    return <CheckCircle size={12} color={theme.colors.success} />;
  };

  const getStatusText = (ledger: any) => {
    return ledger.deletedAt ? 'Inactive' : 'Active';
  };

  const handleViewLedger = (ledgerId: any) => {
    router.push(`/ledger/${ledgerId}`);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
    setAllLedgers([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    setCurrentPage(1);
    setAllLedgers([]);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setAllLedgers([]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(1);
    setAllLedgers([]);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const totalBalance = useMemo(() => {
    return ledgers.reduce((sum: number, ledger: any) => sum + parseFloat(ledger.totalAmount || 0), 0);
  }, [ledgers]);

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
            <BookOpen size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Ledgers</Text>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSearch(!showSearch)}
            activeOpacity={0.7}
          >
            <Search size={20} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {showSearch && (
          <Animated.View
            entering={FadeInUp.springify()}
            style={styles.searchContainer}
          >
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.searchBar}
            >
              <Search size={18} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search ledgers..."
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <X size={18} color="rgba(255, 255, 255, 0.7)" />
                </TouchableOpacity>
              )}
            </BlurView>
          </Animated.View>
        )}

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Ledgers</Text>
              <Text style={styles.summaryValue}>{meta.itemCount || 0}</Text>
            </BlurView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Balance</Text>
              <Text style={styles.summaryValue}>
                ₹{totalBalance.toLocaleString('en-IN')}
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
          { key: 'all', label: 'All', count: ledgers.length },
          {
            key: 'active',
            label: 'Active',
            count: ledgers.filter((l: any) => !l.deletedAt).length,
          },
          {
            key: 'inactive',
            label: 'Inactive',
            count: ledgers.filter((l: any) => l.deletedAt).length,
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
            onPress={() => handleFilterChange(filter.key)}
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

  const renderLedgerCard = (ledger: any, index: number) => (
    <Animated.View
      key={ledger.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleViewLedger(ledger.id)}
        activeOpacity={0.95}
        style={styles.cardTouchable}
      >
        <BlurView
          intensity={themeType === 'dark' ? 20 : 85}
          tint={themeType}
          style={[
            styles.ledgerCard,
            {
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        >
          <View style={styles.cardContent}>
            {/* Top Row - Name and Status */}
            <View style={styles.topRow}>
              <Text style={[styles.ledgerName, { color: theme.colors.text }]}> 
                {ledger.name}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(ledger)}15` }]}> 
                {getStatusIcon(ledger)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(ledger) },
                  ]}
                >
                  {getStatusText(ledger)}
                </Text>
              </View>
            </View>

            {/* Type Row */}
            <View style={styles.typeRow}>
              <FileText size={14} color={theme.colors.text} />
              <Text style={[styles.typeName, { color: theme.colors.text }]}> 
                {ledger.category?.name || 'N/A'}
              </Text>
            </View>

            {/* Bottom Row - Balance and Chevron */}
            <View style={styles.bottomRow}>
              <View style={styles.balanceContainer}>
                <BookOpen size={16} color={theme.colors.primary} />
                <Text style={[styles.balance, { color: theme.colors.primary }]}> 
                  ₹{parseFloat(ledger.totalAmount || 0).toLocaleString('en-IN')}
                </Text>
              </View>
              <ChevronRight size={16} color={theme.colors.text} />
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
          <BookOpen
            size={56}
            color={theme.colors.text}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No {selectedFilter === 'all' ? '' : selectedFilter} ledgers found
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.text }]}
        >
          {selectedFilter === 'all'
            ? searchQuery 
              ? 'No ledgers match your search criteria'
              : 'Add your first ledger to get started'
            : `No ${selectedFilter} ledgers found`}
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
        onPress={() => router.push('/ledger/form')}
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
          {isLoading && currentPage === 1 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.text },
                ]}
              >
                Loading ledgers...
              </Text>
            </View>
          ) : filteredLedgers.length > 0 ? (
            <View style={styles.ledgersList}>
              {filteredLedgers.map((ledger, index) =>
                renderLedgerCard(ledger, index)
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
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
  ledgersList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  ledgerCard: {
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
  ledgerName: {
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
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  typeName: {
    fontSize: 13,
    fontWeight: '500',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balance: {
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