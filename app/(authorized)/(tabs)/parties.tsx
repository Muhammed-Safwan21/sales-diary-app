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
  ArrowUpRight,
  Building2,
  IndianRupee,
  Mail,
  Phone,
  Plus,
  Search,
  TrendingUp,
  Users,
  User,
  AlertCircle,
  ChevronRight,
} from 'lucide-react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Types based on your API response
interface ContactLedger {
  id: string;
  name: string;
  totalAmount: string;
  openingBalance: string;
}

interface Contact {
  id: string;
  name: string;
  businessName: string;
  email: string;
  mobile: string;
  ledger: ContactLedger;
}

export default function PartiesScreen() {
  const router = useRouter();
  const { theme, themeType }: any = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'CUSTOMER' | 'SUPPLIER'>(
    'CUSTOMER'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageSize = 10;

  const { branchInfo, user } = useSelector((state: any) => state.auth);

  // Fetch contacts with pagination and search
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: [
      QUERY_KEY.PARTIES,
      activeTab,
      searchQuery,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const response = await apiClient.get(`${API.PARTIES}`, {
        params: {
          query: searchQuery,
          page: currentPage,
          take: pageSize,
          adminId: user?.id,
          branchId: branchInfo?.id ,
          contactType: activeTab,
        },
      });
      return response.data;
    },
  });

  const contacts : any = data?.data?.rows ?? [];
  const totalOutstanding = parseFloat(data?.data?.totalOutstanding ?? '0');
  const totalParties = parseInt(data?.data?.totalParties ?? '0');
  const meta = data?.meta;

  // Reset data when search query or tab changes
  useEffect(() => {
    setAllContacts([]);
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  // Accumulate contacts when new data arrives
  useEffect(() => {
    if (contacts.length > 0) {
      setAllContacts((prevContacts) => {
        // If it's the first page or a new search/tab, replace the data
        if (currentPage === 1) {
          return contacts;
        }

        // For subsequent pages, append new contacts
        // Filter out duplicates based on ID
        const existingIds = new Set(prevContacts.map((contact) => contact.id));
        const newContacts = contacts.filter(
          (contact:any) => !existingIds.has(contact.id)
        );

        return [...prevContacts, ...newContacts];
      });

      setIsLoadingMore(false);
    }
  }, [contacts, currentPage]);

  const handleEndReached = useCallback(() => {
    // Prevent multiple simultaneous requests
    if (isLoadingMore || isLoading || isFetching) {
      return;
    }

    // Check if there are more pages
    if (meta?.hasNextPage) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isLoadingMore, isLoading, isFetching, meta?.hasNextPage]);

  const formatAmount = (amount: string | number): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return numAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    // The useEffect will handle resetting the page and contacts
  }, []);

  const handleTabChange = useCallback((tab: 'CUSTOMER' | 'SUPPLIER') => {
    setActiveTab(tab);
    // The useEffect will handle resetting the page and contacts
  }, []);

  const renderContactItem = ({
    item,
    index,
  }: {
    item: Contact;
    index: number;
  }) => {
    const outstandingAmount = parseFloat(item.ledger.totalAmount || '0');
    const hasOutstanding = outstandingAmount > 0;
  
    return (
      <Animated.View
        entering={FadeInRight.delay(index * 50).springify()}
        style={styles.cardContainer}
      >
        <TouchableOpacity
          onPress={() => {
            // Navigate to contact details
            router.push(`/parties/${item.id}`);
          }}
          activeOpacity={0.95}
          style={styles.cardTouchable}
        >
          <BlurView
            intensity={themeType === 'dark' ? 20 : 85}
            tint={themeType}
            style={[
              styles.contactCard,
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
                <Text style={[styles.contactName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                <View style={[
                  styles.statusBadge, 
                  { 
                    backgroundColor: hasOutstanding
                      ? activeTab === 'CUSTOMER'
                        ? `${theme.colors.success}15`
                        : `${theme.colors.error}15`
                      : `${theme.colors.primary}15`
                  }
                ]}>
                  <View style={[
                    styles.statusDot,
                    {
                      backgroundColor: hasOutstanding
                        ? activeTab === 'CUSTOMER'
                          ? theme.colors.success
                          : theme.colors.error
                        : theme.colors.primary,
                    },
                  ]} />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: hasOutstanding
                          ? activeTab === 'CUSTOMER'
                            ? theme.colors.success
                            : theme.colors.error
                          : theme.colors.primary,
                      },
                    ]}
                  >
                    {hasOutstanding ? 'Outstanding' : 'Settled'}
                  </Text>
                </View>
              </View>
  
              {/* Business Name Row */}
              {item.businessName && (
                <View style={styles.businessRow}>
                  <Building2 size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.businessName, { color: theme.colors.textSecondary }]}>
                    {item.businessName}
                  </Text>
                </View>
              )}
  
              {/* Contact Details Row */}
              <View style={styles.contactDetailsRow}>
                <View style={styles.phoneContainer}>
                  <Phone size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.phoneText, { color: theme.colors.textSecondary }]}>
                    {item.mobile}
                  </Text>
                </View>
                <View style={styles.rightSection}>
                  <View style={styles.amountContainer}>
                    <IndianRupee 
                      size={16} 
                      color={
                        hasOutstanding
                          ? activeTab === 'CUSTOMER'
                            ? theme.colors.success
                            : theme.colors.error
                          : theme.colors.primary
                      } 
                    />
                    <Text
                      style={[
                        styles.amount,
                        {
                          color: hasOutstanding
                            ? activeTab === 'CUSTOMER'
                              ? theme.colors.success
                              : theme.colors.error
                            : theme.colors.primary,
                        },
                      ]}
                    >
                      {formatAmount(item.ledger.totalAmount)}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={theme.colors.textSecondary} />
                </View>
              </View>
  
              {/* Overdue Warning - if applicable */}
              {hasOutstanding && activeTab === 'SUPPLIER' && (
                <View style={styles.overdueWarning}>
                  <AlertCircle size={12} color={theme.colors.error} />
                  <Text style={[styles.overdueText, { color: theme.colors.error }]}>
                    Outstanding amount pending
                  </Text>
                </View>
              )}
            </View>
          </BlurView>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderTabButton = (tabId: string, label: string, icon: any) => {
    const isActive = activeTab === tabId;

    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          {
            backgroundColor: isActive
              ? `${theme.colors.primary}15`
              : 'transparent',
          },
        ]}
        onPress={() => handleTabChange(tabId as 'CUSTOMER' | 'SUPPLIER')}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.tabIconContainer,
            {
              backgroundColor: isActive
                ? `${theme.colors.primary}20`
                : 'transparent',
            },
          ]}
        >
          {React.cloneElement(icon, {
            size: 16,
            color: isActive ? theme.colors.primary : theme.colors.textSecondary,
          })}
        </View>
        <Text
          style={[
            styles.tabText,
            {
              color: isActive
                ? theme.colors.primary
                : theme.colors.textSecondary,
              fontWeight: isActive ? '600' : '500',
            },
          ]}
        >
          {label}
        </Text>
        {isActive && (
          <View
            style={[
              styles.activeTabIndicator,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading contacts...
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={[styles.errorTitle, { color: theme.colors.text }]}>
        Failed to load contacts
      </Text>
      <Text
        style={[styles.errorSubtitle, { color: theme.colors.textSecondary }]}
      >
        Please check your connection and try again
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => refetch()}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <Text
          style={[
            styles.footerLoaderText,
            { color: theme.colors.textSecondary },
          ]}
        >
          Loading more...
        </Text>
      </View>
    );
  };

  const handleAdd = () => {
    router.push(`/parties/form?contactType=${activeTab}`);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

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
            <View style={styles.headerTitleContainer}>
              <Users size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Parties</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Stats Section */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.statsSection}>
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.statsCard}
        >
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                {isLoading ? '-' : totalParties}
              </Text>
              <Text
                style={[styles.statText, { color: theme.colors.textSecondary }]}
              >
                Parties
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statNumber,
                  {
                    color:
                      activeTab === 'CUSTOMER'
                        ? theme.colors.success
                        : theme.colors.error,
                  },
                ]}
              >
                {isLoading ? '-' : `₹${formatAmount(totalOutstanding)}`}
              </Text>
              <Text
                style={[styles.statText, { color: theme.colors.textSecondary }]}
              >
                {activeTab === 'CUSTOMER' ? "You'll Get" : "You'll Pay"}
              </Text>
            </View>
          </View>
        </BlurView>
      </Animated.View>

      {/* Search and Filter Section */}
      <Animated.View
        entering={FadeInUp.delay(200)}
        style={styles.searchSection}
      >
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={[
            styles.searchContainer,
            styles.searchBar,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
        >
          {/* <View
            style={[
              styles.searchBar,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
          > */}
          <View
            style={[
              styles.searchIconContainer,
              { backgroundColor: `${theme.colors.primary}15` },
            ]}
          >
            <Search size={14} color={theme.colors.primary} />
          </View>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search by name, phone, or business"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {/* </View> */}
        </BlurView>
      </Animated.View>

      {/* Tabs Section */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.tabsSection}>
        <View style={styles.tabsContainer}>
          {renderTabButton('CUSTOMER', 'Customers', <Users />)}
          {renderTabButton('SUPPLIER', 'Suppliers', <TrendingUp />)}
        </View>
      </Animated.View>

      {/* Content */}
      {isLoading && allContacts.length === 0 ? (
        renderLoadingState()
      ) : error ? (
        renderErrorState()
      ) : (
        <FlatList
          data={allContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LinearGradient
                colors={
                  themeType === 'dark'
                    ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
                    : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
                }
                style={styles.emptyIconContainer}
              >
                {activeTab === 'CUSTOMER' ? (
                  <Users size={32} color={theme.colors.primary} />
                ) : (
                  <TrendingUp size={32} color={theme.colors.primary} />
                )}
              </LinearGradient>
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                No {activeTab} found
              </Text>
              <Text
                style={[
                  styles.emptySubtitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : `Start by adding your first ${
                      activeTab === 'CUSTOMER' ? 'customer' : 'supplier'
                    }`}
              </Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          },
        ]}
        onPress={handleAdd}
      >
        <LinearGradient
          colors={[
            theme.colors.primary,
            theme.colors.primaryLight || theme.colors.primary,
          ]}
          style={styles.fabGradient}
        >
          <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
        </LinearGradient>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
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
  statsSection: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statsCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  statsContent: {
    flexDirection: 'row',
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchContainer: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  tabsSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    position: 'relative',
  },
  tabIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    borderRadius: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  customerCardWrapper: {
    marginBottom: 12,
  },
  customerCard: {
    overflow: 'hidden',
  },
  customerCardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  customerGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  customerMainContent: {
    flexDirection: 'row',
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  customerInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  businessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  businessIconContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerPhone: {
    fontSize: 13,
    fontWeight: '500',
  },
  amountSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 100,
  },
  actionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  errorSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  footerLoaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardContainer: {
    marginBottom: 16,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  contactCard: {
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
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  businessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  businessName: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  contactDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'flex-end',
  },
  emailText: {
    fontSize: 11,
    fontWeight: '500',
    maxWidth: 120,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabelContainer: {
    flex: 1,
  },
  amountLabel: {
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
    fontSize: 10,
    fontWeight: '600',
  },
});