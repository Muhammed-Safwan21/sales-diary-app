import { useTheme } from '@/context/ThemeContext';
import { Customer } from '@/types';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowUpRight,
  Calendar,
  IndianRupee,
  Phone,
  Plus,
  Search,
  TrendingUp,
  Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInRight, FadeInUp, FadeOut, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data
const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '9876543210',
    outstandingAmount: 15000,
    lastTransaction: new Date('2023-12-15')
  },
  {
    id: '2',
    name: 'Priya Singh',
    phone: '8765432109',
    outstandingAmount: 8500,
    lastTransaction: new Date('2023-12-20')
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '7654321098',
    outstandingAmount: 0,
    lastTransaction: new Date('2024-01-05')
  },
  {
    id: '4',
    name: 'Neha Gupta',
    phone: '6543210987',
    outstandingAmount: 22350,
    lastTransaction: new Date('2023-11-28')
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    phone: '9876543211',
    outstandingAmount: 7250,
    lastTransaction: new Date('2024-01-10')
  }
];

export default function PartiesScreen() {
  const { theme, themeType }: any = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('customers');
  const [showFabMenu, setShowFabMenu] = useState(false);
  const router:any = useRouter()
  const filteredCustomers = SAMPLE_CUSTOMERS.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const totalOutstanding = filteredCustomers.reduce((sum, customer) => sum + customer.outstandingAmount, 0);

  const handleAddCustomer = () => {
    setShowFabMenu(false);
    router.push("/parties/add-customer")
  };

  const handleAddSupplier = () => {
    setShowFabMenu(false);
    router.push("/parties/add-supplier")

  };

  const toggleFabMenu = () => {
    setShowFabMenu(!showFabMenu);
  };

  const renderCustomerItem = ({ item, index }: { item: any, index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 50).springify()}
      style={styles.customerCardWrapper}
    >
      <TouchableOpacity 
        style={styles.customerCard}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={themeType === 'dark' ? 20 : 30} 
          tint={themeType} 
          style={[
            styles.customerCardContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.7)',
              borderColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.1)',
            }
          ]}
        >
          {/* Gradient overlay */}
          <LinearGradient
            colors={item.outstandingAmount > 0 
              ? ['rgba(34, 197, 94, 0.12)', 'rgba(34, 197, 94, 0.04)', 'transparent']
              : ['rgba(99, 102, 241, 0.1)', 'rgba(99, 102, 241, 0.04)', 'transparent']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.customerGradientOverlay}
          />
          
          <View style={styles.customerMainContent}>
            <View style={styles.customerInfo}>
              <View style={styles.nameContainer}>
                <Text style={[
                  styles.customerName,
                  { color: theme.colors.text }
                ]}>
                  {item.name}
                </Text>
                <View style={[
                  styles.statusDot,
                  { 
                    backgroundColor: item.outstandingAmount > 0 
                      ? theme.colors.success 
                      : theme.colors.primary 
                  }
                ]} />
              </View>
              
              <View style={styles.phoneContainer}>
                <View style={[
                  styles.phoneIconContainer,
                  { backgroundColor: `${theme.colors.primary}15` }
                ]}>
                  <Phone size={12} color={theme.colors.primary} />
                </View>
                <Text style={[
                  styles.customerPhone,
                  { color: theme.colors.textSecondary }
                ]}>
                  {item.phone}
                </Text>
              </View>
              
              <View style={styles.lastTransactionContainer}>
                <Calendar size={12} color={theme.colors.textSecondary} />
                <Text style={[
                  styles.lastTransactionText,
                  { color: theme.colors.textSecondary }
                ]}>
                  {item.lastTransaction.toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short' 
                  })}
                </Text>
              </View>
            </View>
            
            <View style={styles.amountSection}>
              <Text style={[
                styles.amountLabel,
                { color: theme.colors.textSecondary }
              ]}>
                {item.outstandingAmount > 0 ? "You'll Get" : "Settled"}
              </Text>
              
              <View style={styles.amountContainer}>
                <IndianRupee 
                  size={14} 
                  color={item.outstandingAmount > 0 ? theme.colors.success : theme.colors.textSecondary} 
                />
                <Text style={[
                  styles.amount,
                  { 
                    color: item.outstandingAmount > 0 ? theme.colors.success : theme.colors.textSecondary,
                    fontWeight: item.outstandingAmount > 0 ? '700' : '500'
                  }
                ]}>
                  {item.outstandingAmount.toLocaleString('en-IN')}
                </Text>
              </View>
              
              <TouchableOpacity style={[
                styles.actionButton,
                {
                  backgroundColor: themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                }
              ]}>
                <ArrowUpRight size={12} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

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
          }
        ]}
        onPress={() => setActiveTab(tabId)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.tabIconContainer,
          {
            backgroundColor: isActive ? `${theme.colors.primary}20` : 'transparent',
          }
        ]}>
          {React.cloneElement(icon, {
            size: 16,
            color: isActive ? theme.colors.primary : theme.colors.textSecondary
          })}
        </View>
        <Text style={[
          styles.tabText,
          {
            color: isActive ? theme.colors.primary : theme.colors.textSecondary,
            fontWeight: isActive ? '600' : '500',
          }
        ]}>
          {label}
        </Text>
        {isActive && (
          <View style={[
            styles.activeTabIndicator,
            { backgroundColor: theme.colors.primary }
          ]} />
        )}
      </TouchableOpacity>
    );
  };

  const renderFabMenuItem = (icon: any, label: string, onPress: () => void, delay: number) => (
    <Animated.View
      entering={FadeIn.delay(delay).springify()}
      exiting={FadeOut.springify()}
      style={styles.fabMenuItemWrapper}
    >
      <TouchableOpacity
        style={styles.fabMenuItem}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={themeType === 'dark' ? 25 : 40} 
          tint={themeType} 
          style={[
            styles.fabMenuItemContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(255, 255, 255, 0.8)',
              borderColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.08)',
            }
          ]}
        >
          <LinearGradient
            colors={themeType === 'dark' 
              ? ['rgba(99, 102, 241, 0.12)', 'rgba(139, 92, 246, 0.12)', 'transparent']
              : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)', 'transparent']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabMenuGradient}
          />
          
          <View style={styles.fabMenuContent}>
            <View style={[
              styles.fabMenuIconContainer,
              { backgroundColor: `${theme.colors.primary}25` }
            ]}>
              {React.cloneElement(icon, {
                size: 18,
                color: theme.colors.primary
              })}
            </View>
            <Text style={[
              styles.fabMenuText,
              { color: theme.colors.text }
            ]}>
              {label}
            </Text>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      {/* Modern header with gradient */}
      <LinearGradient
        colors={themeType === 'dark' 
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
      
      {/* Simple Stats */}
      <Animated.View 
        entering={FadeInUp.delay(100)}
        style={styles.statsSection}
      >
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.statsCard}>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                {filteredCustomers.length}
              </Text>
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                Parties
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.success }]}>
                ₹{totalOutstanding.toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                Outstanding
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
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.searchContainer}>
          <View style={[
            styles.searchBar,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
              borderColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            }
          ]}>
            <View style={[
              styles.searchIconContainer,
              { backgroundColor: `${theme.colors.primary}15` }
            ]}>
              <Search size={14} color={theme.colors.primary} />
            </View>
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search by name or phone"
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </BlurView>
      </Animated.View>
      
      {/* Tabs Section */}
      <Animated.View 
        entering={FadeInUp.delay(300)}
        style={styles.tabsSection}
      >
        <View style={styles.tabsContainer}>
          {renderTabButton('customers', 'Customers', <Users />)}
          {renderTabButton('suppliers', 'Suppliers', <TrendingUp />)}
        </View>
      </Animated.View>
      
      {/* Content */}
      {activeTab === 'customers' ? (
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={renderCustomerItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LinearGradient
                colors={themeType === 'dark' 
                  ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
                  : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
                }
                style={styles.emptyIconContainer}
              >
                <Users size={32} color={theme.colors.primary} />
              </LinearGradient>
              
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                No customers found
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
                Start by adding your first customer
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <LinearGradient
            colors={themeType === 'dark' 
              ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
              : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
            }
            style={styles.emptyIconContainer}
          >
            <TrendingUp size={32} color={theme.colors.primary} />
          </LinearGradient>
          
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            No suppliers found
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Start by adding your first supplier
          </Text>
        </View>
      )}
      
      {/* FAB Menu Overlay */}
      {showFabMenu && (
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut.springify()}
          style={styles.fabMenuOverlay}
        >
          <TouchableOpacity 
            style={styles.fabMenuBackdrop}
            onPress={() => setShowFabMenu(false)}
            activeOpacity={1}
          />
          
          <View style={styles.fabMenuContainer}>
            {renderFabMenuItem(<Users />, 'Add Customer', handleAddCustomer, 100)}
            {renderFabMenuItem(<TrendingUp />, 'Add Supplier', handleAddSupplier, 150)}
          </View>
        </Animated.View>
      )}
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[
          styles.fab,
          { 
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          }
        ]}
        onPress={toggleFabMenu}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
          style={styles.fabGradient}
        >
          <Animated.View
            style={useAnimatedStyle(() => ({
              transform: [{ rotate: withSpring(showFabMenu ? '45deg' : '0deg') }],
            }))}
          >
            <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
          </Animated.View>
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
  searchRow: {
    flexDirection: 'row',
    gap: 8,
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
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    }),
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
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
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
  lastTransactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastTransactionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  amountSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 100,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  amount: {
    fontSize: 15,
    letterSpacing: -0.2,
  },
  actionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  fabMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  fabMenuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  fabMenuContainer: {
    position: 'absolute',
    right: 20,
    bottom: 85,
    gap: 10,
  },
  fabMenuItemWrapper: {
    alignItems: 'flex-end',
  },
  fabMenuItem: {
    overflow: 'hidden',
  },
  fabMenuItemContainer: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 150,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  fabMenuGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fabMenuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    position: 'relative',
    zIndex: 2,
  },
  fabMenuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabMenuText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});