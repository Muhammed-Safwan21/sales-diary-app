import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Box,
  Layers,
  Package,
  Plus,
  Tag,
  TrendingDown,
  TrendingUp,
  Warehouse,
  ChevronRight,
  AlertTriangle,
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
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for items
const mockItems = [
  {
    id: '1',
    name: 'A4 Paper Pack',
    category: 'Stationery',
    stock: 120,
    lowStockAlert: 20,
    unit: 'Pack',
    sellingPrice: 350,
    purchasePrice: 300,
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Ball Pen',
    category: 'Stationery',
    stock: 10,
    lowStockAlert: 15,
    unit: 'Box',
    sellingPrice: 120,
    purchasePrice: 90,
    status: 'low_stock',
  },
  {
    id: '3',
    name: 'Printer Ink',
    category: 'Electronics',
    stock: 0,
    lowStockAlert: 5,
    unit: 'Bottle',
    sellingPrice: 800,
    purchasePrice: 650,
    status: 'out_of_stock',
  },
  {
    id: '4',
    name: 'Stapler',
    category: 'Stationery',
    stock: 50,
    lowStockAlert: 10,
    unit: 'Piece',
    sellingPrice: 75,
    purchasePrice: 60,
    status: 'in_stock',
  },
  {
    id: '5',
    name: 'USB Drive 32GB',
    category: 'Electronics',
    stock: 5,
    lowStockAlert: 10,
    unit: 'Piece',
    sellingPrice: 600,
    purchasePrice: 500,
    status: 'low_stock',
  },
];

export default function ItemsListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [items, setItems] = useState(mockItems);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return theme.colors.success;
      case 'low_stock':
        return theme.colors.warning;
      case 'out_of_stock':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <TrendingUp size={12} color={theme.colors.success} />;
      case 'low_stock':
        return <AlertTriangle size={12} color={theme.colors.warning} />;
      case 'out_of_stock':
        return <TrendingDown size={12} color={theme.colors.error} />;
      default:
        return <Box size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleViewItem = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'in_stock') return item.status === 'in_stock';
    if (selectedFilter === 'low_stock') return item.status === 'low_stock';
    if (selectedFilter === 'out_of_stock') return item.status === 'out_of_stock';
    return true;
  });

  const totalStockValue = items.reduce((sum, item) => sum + item.stock * item.sellingPrice, 0);

  const renderHeader = () => (
    <LinearGradient
      colors={
        themeType === 'dark'
          ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
          : ['#06D6A0', '#34D399', 'rgba(52, 211, 153, 0.2)', 'transparent']
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
            <Warehouse size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Items</Text>
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
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{items.length}</Text>
            </BlurView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Stock Value</Text>
              <Text style={styles.summaryValue}>
                ₹{totalStockValue.toLocaleString('en-IN')}
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
          { key: 'all', label: 'All', count: items.length },
          {
            key: 'in_stock',
            label: 'In Stock',
            count: items.filter((i) => i.status === 'in_stock').length,
          },
          {
            key: 'low_stock',
            label: 'Low Stock',
            count: items.filter((i) => i.status === 'low_stock').length,
          },
          {
            key: 'out_of_stock',
            label: 'Out of Stock',
            count: items.filter((i) => i.status === 'out_of_stock').length,
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

  const renderItemCard = (item: any, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleViewItem(item.id)}
        activeOpacity={0.95}
        style={styles.cardTouchable}
      >
        <BlurView
          intensity={themeType === 'dark' ? 20 : 85}
          tint={themeType}
          style={[
            styles.itemCard,
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
              <Text style={[styles.itemName, { color: theme.colors.text }]}> 
                {item.name}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}15` }]}> 
                {getStatusIcon(item.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </Text>
              </View>
            </View>

            {/* Category Row */}
            <View style={styles.categoryRow}>
              <Layers size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.categoryName, { color: theme.colors.textSecondary }]}> 
                {item.category}
              </Text>
            </View>

            {/* Bottom Row - Stock, Price, Unit, Chevron */}
            <View style={styles.bottomRow}>
              <View style={styles.stockContainer}>
                <Package size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.stockText, { color: theme.colors.textSecondary }]}> 
                  {item.stock} {item.unit}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <View style={styles.priceContainer}>
                  <Tag size={16} color={theme.colors.primary} />
                  <Text style={[styles.price, { color: theme.colors.primary }]}> 
                    ₹{item.sellingPrice.toLocaleString('en-IN')}
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
          <Box
            size={56}
            color={theme.colors.textSecondary}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No {selectedFilter === 'all' ? '' : selectedFilter.replace(/_/g, ' ')} items
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Add your first item to get started'
            : `No ${selectedFilter.replace(/_/g, ' ')} items found`}
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
        onPress={() => router.push('/items/form')}
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
                Loading items...
              </Text>
            </View>
          ) : filteredItems.length > 0 ? (
            <View style={styles.itemsList}>
              {filteredItems.map((item, index) =>
                renderItemCard(item, index)
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
  itemsList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  itemCard: {
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
  itemName: {
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
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
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
