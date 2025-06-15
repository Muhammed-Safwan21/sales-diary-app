import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Check,
  Loader,
  Package,
  Search,
  X
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Types
interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  productId: string;
  itemType: string;
  salePrice: string;
  rate: string;
  costPrice: string;
  taxPercentage: string;
  taxAmount: string;
  availableQuantity: string;
  openingQuantity: string;
  openingRate: string;
  reorderQuantity: string;
  sku: string;
  barcode: string;
  includeTax: boolean;
  hsnCodeId: string;
  imageUrl: string;
  status: string;
  categoryId: string;
  branchId: string;
  adminId: string;
  isAvailable: boolean;
  unitId: string;
  combination: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  attributeValuesInfo: any[];
  categoryInfo: {
    id: string;
    name: string;
  };
}

interface ProductSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  selectedProducts?: string[]; // Array of selected product IDs to disable them
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  visible,
  onClose,
  onSelectProduct,
  selectedProducts = [],
}) => {
  const { theme, themeType }: any = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get adminId and branchId from Redux
  const adminId = useSelector((state: any) => state.auth?.user?.id);
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  // Query for fetching products
  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, currentPage, searchQuery],
    queryFn: async () => {
      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : '';
      return await apiClient.get(
        `${API.PRODUCTS}?order=ASC&page=${currentPage}&take=10${searchParam}`
      );
    },
    enabled: visible,
    select: (res: any) => res?.data,
  });

  // Update products list when data changes
  useEffect(() => {
    if (productsResponse?.data) {
      if (currentPage === 1) {
        // First page or search - replace all products
        setAllProducts(productsResponse.data);
      } else {
        // Subsequent pages - append to existing products
        setAllProducts((prev) => [...prev, ...productsResponse.data]);
      }

      // Check if there's more data
      setHasMoreData(productsResponse.meta?.hasNextPage || false);
      setIsLoadingMore(false);
    }
  }, [productsResponse, currentPage]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setAllProducts([]);
    setHasMoreData(true);
  }, [searchQuery]);

  const filteredProducts = searchQuery
    ? allProducts.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.barcode.includes(searchQuery) ||
          product.categoryInfo?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : allProducts;

  const handleSelectProduct = (product: Product) => {
    // Check if product is already selected
    if (selectedProducts.includes(product.id)) {
      Alert.alert(
        'Product Already Selected',
        'This product is already added to the invoice.'
      );
      return;
    }

    // Check if product is available
    if (!product.isAvailable || product.status !== 'STOCK') {
      Alert.alert(
        'Product Unavailable',
        'This product is currently out of stock.'
      );
      return;
    }

    onSelectProduct(product);
    onClose();
    setSearchQuery('');
  };

  const loadMoreProducts = () => {
    if (hasMoreData && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const isSelected = selectedProducts.includes(item.id);
    const isOutOfStock = !item.isAvailable || item.status !== 'STOCK';
    const quantity = parseFloat(item.availableQuantity) || 0;

    return (
      <Animated.View entering={FadeIn.delay(50)}>
        <TouchableOpacity
          style={[
            styles.productItem,
            isSelected && {
              backgroundColor: `${theme.colors.primary}15`,
              borderColor: `${theme.colors.primary}40`,
              opacity: 0.6,
            },
            isOutOfStock && {
              opacity: 0.5,
            },
            {
              backgroundColor: isSelected
                ? `${theme.colors.primary}15`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.6)',
              borderColor: isSelected
                ? `${theme.colors.primary}40`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
          onPress={() => handleSelectProduct(item)}
          activeOpacity={0.7}
          disabled={isSelected || isOutOfStock}
        >
          <View style={styles.productItemContent}>
            <View style={styles.productInfo}>
              <View
                style={[
                  styles.productIconContainer,
                  {
                    backgroundColor: isSelected
                      ? `${theme.colors.primary}20`
                      : isOutOfStock
                      ? `${theme.colors.textSecondary}15`
                      : `${theme.colors.secondary}15`,
                  },
                ]}
              >
                <Package
                  size={16}
                  color={
                    isSelected
                      ? theme.colors.primary
                      : isOutOfStock
                      ? theme.colors.textSecondary
                      : theme.colors.secondary
                  }
                />
              </View>
              <View style={styles.productTextContainer}>
                <Text
                  style={[
                    styles.productName,
                    {
                      color: isSelected
                        ? theme.colors.primary
                        : isOutOfStock
                        ? theme.colors.textSecondary
                        : theme.colors.text,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <View style={styles.productDetails}>
                  <Text
                    style={[
                      styles.productCode,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.code}
                  </Text>
                  <Text
                    style={[
                      styles.productSeparator,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    •
                  </Text>
                  <Text
                    style={[
                      styles.productCategory,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.categoryInfo?.name}
                  </Text>
                </View>
                {/* <View style={styles.productMetrics}>
                  <View style={styles.priceContainer}>
                    <IndianRupee size={12} color={theme.colors.success} />
                    <Text
                      style={[
                        styles.productPrice,
                        { color: theme.colors.success },
                      ]}
                    >
                      {parseFloat(item.salePrice).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                </View> */}
              </View>
            </View>

            {isSelected ? (
              <Animated.View entering={FadeIn.duration(200)}>
                <View
                  style={[
                    styles.checkContainer,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Check size={14} color="#FFFFFF" />
                </View>
              </Animated.View>
            ) : (
              <View style={styles.statusContainer}>
                {isOutOfStock ? (
                  <View style={styles.outOfStockBadge}>
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.availableBadge,
                      { backgroundColor: `${theme.colors.success}15` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.availableText,
                        { color: theme.colors.success },
                      ]}
                    >
                      Available
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderLoadMoreButton = () => {
    if (!hasMoreData) return null;

    return (
      <TouchableOpacity
        style={[
          styles.loadMoreButton,
          {
            backgroundColor: `${theme.colors.primary}10`,
            borderColor: `${theme.colors.primary}20`,
          },
        ]}
        onPress={loadMoreProducts}
        disabled={isLoadingMore || isLoading}
      >
        {isLoadingMore ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <Loader size={16} color={theme.colors.primary} />
        )}
        <Text style={[styles.loadMoreText, { color: theme.colors.primary }]}>
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <BlurView
      intensity={themeType === 'dark' ? 20 : 80}
      tint={themeType}
      style={[
        styles.header,
        {
          paddingTop: 16,
          borderBottomColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    >
      <LinearGradient
        colors={[
          `${theme.colors.primary}15`,
          `${theme.colors.primary}05`,
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      />

      <View style={styles.headerContent}>
        <View style={styles.headerTitleContainer}>
          <Package size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Select Product
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
            },
          ]}
          onPress={() => {
            onClose();
            setSearchQuery('');
          }}
        >
          <X size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
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
        <Search size={16} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search products by name, code, or barcode..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </BlurView>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
      <View
        style={[
          styles.emptyIconContainer,
          { backgroundColor: `${theme.colors.textSecondary}15` },
        ]}
      >
        <Package size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery ? 'No products found' : 'No products available'}
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        {searchQuery
          ? 'Try adjusting your search terms'
          : 'Add products to get started'}
      </Text>
    </Animated.View>
  );

  const renderLoadingState = () => (
    <Animated.View entering={FadeIn} style={styles.loadingState}>
      <View
        style={[
          styles.loadingIconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <Package size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading products...
      </Text>
    </Animated.View>
  );

  const renderErrorState = () => (
    <Animated.View entering={FadeIn} style={styles.errorState}>
      <Text style={[styles.errorText, { color: '#EF4444' }]}>
        Failed to load products
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => {
          setCurrentPage(1);
          setAllProducts([]);
          refetch();
        }}
      >
        <Text style={[styles.retryText, { color: theme.colors.primary }]}>
          Retry
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
      onRequestClose={() => {
        onClose();
        setSearchQuery('');
      }}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => {
            onClose();
            setSearchQuery('');
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(250)}
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            {renderHeader()}

            <View style={styles.content}>
              {isLoading && currentPage === 1 ? (
                renderLoadingState()
              ) : error ? (
                renderErrorState()
              ) : filteredProducts.length === 0 ? (
                renderEmptyState()
              ) : (
                <FlatList
                  data={filteredProducts}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  ListFooterComponent={renderLoadMoreButton}
                  onEndReached={loadMoreProducts}
                  onEndReachedThreshold={0.3}
                />
              )}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: '85%',
    minHeight: '60%',
  },
  header: {
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    position: 'relative',
    zIndex: 2,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    position: 'relative',
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    minHeight: 200,
  },
  listContainer: {
    padding: 20,
  },
  productItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  productItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  productIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
    marginBottom: 4,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  productCode: {
    fontSize: 12,
    fontWeight: '500',
  },
  productCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  productSeparator: {
    fontSize: 12,
    marginHorizontal: 6,
  },
  productMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
  stockInfo: {
    fontSize: 12,
    fontWeight: '600',
  },
  taxInfo: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  availableBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availableText: {
    fontSize: 10,
    fontWeight: '600',
  },
  outOfStockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  outOfStockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  barcodeText: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
    gap: 8,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductSelectionModal;
