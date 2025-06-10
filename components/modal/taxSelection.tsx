import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, FileText, Plus, Search, X, Loader } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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
interface Tax {
  id: string;
  taxType: string;
  percentage: string;
  adminId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface TaxSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTax: (tax: any) => void;
  selectedTax?: string;
}

const TaxSelectionModal: React.FC<TaxSelectionModalProps> = ({
  visible,
  onClose,
  onSelectTax,
  selectedTax,
}) => {
  const { theme, themeType }: any = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaxRate, setNewTaxRate] = useState('');
  const [allTaxes, setAllTaxes] = useState<Tax[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get adminId and branchId from Redux
  const adminId = useSelector((state: any) => state.auth?.user?.id);
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  // Query for fetching taxes
  const {
    data: taxesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.TAX, currentPage, searchQuery],
    queryFn: async () => {
      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : '';
      return await apiClient.get(
        `${API.TAX}?order=ASC&page=${currentPage}&take=10&taxType=GST${searchParam}`
      );
    },
    enabled: visible,
    select: (res: any) => res?.data,
  });

  // Update taxes list when data changes
  useEffect(() => {
    if (taxesResponse?.data) {
      if (currentPage === 1) {
        // First page or search - replace all taxes
        setAllTaxes(taxesResponse.data);
      } else {
        // Subsequent pages - append to existing taxes
        setAllTaxes((prev) => [...prev, ...taxesResponse.data]);
      }

      // Check if there's more data
      setHasMoreData(taxesResponse.meta?.hasNextPage || false);
      setIsLoadingMore(false);
    }
  }, [taxesResponse, currentPage]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setAllTaxes([]);
    setHasMoreData(true);
  }, [searchQuery]);

  // Add tax mutation
  const addTaxMutation = useMutation({
    mutationFn: async (taxData: any) => {
      return await apiClient.post(API.TAX, taxData);
    },
    onSuccess: () => {
      // Invalidate and refetch taxes query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TAX] });
      setCurrentPage(1);
      setAllTaxes([]);
      setNewTaxRate('');
      setShowAddForm(false);
      Alert.alert('Success', 'Tax rate added successfully!');
    },
    onError: (error: any) => {
      console.log('Error adding tax:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to add tax rate'
      );
    },
  });

  const filteredTaxes = searchQuery
    ? allTaxes.filter(
        (tax: Tax) =>
          tax.taxType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tax.percentage.toString().includes(searchQuery)
      )
    : allTaxes;

  const handleSelectTax = (tax: Tax) => {
    onSelectTax(tax);
    onClose();
    setSearchQuery('');
  };

  const handleAddTax = () => {
    const rate = parseFloat(newTaxRate);

    if (!newTaxRate.trim()) {
      Alert.alert('Error', 'Please enter a tax rate');
      return;
    }

    if (isNaN(rate) || rate < 0 || rate > 100) {
      Alert.alert('Error', 'Please enter a valid tax rate between 0 and 100');
      return;
    }

    if (!adminId || !branchId) {
      console.error('Admin ID or Branch ID not found in Redux state');
      Alert.alert('Error', 'User information not found');
      return;
    }

    // Check if rate already exists
    const existingRate = allTaxes.find(
      (tax: Tax) => parseFloat(tax.percentage) === rate
    );
    if (existingRate) {
      Alert.alert('Error', 'This tax rate already exists');
      return;
    }

    const taxData = {
      taxType: 'GST',
      percentage: rate,
      adminId: Number(adminId),
      branchId: Number(branchId),
    };

    console.log('Attempting to add tax:', taxData);

    try {
      addTaxMutation.mutate(taxData);
    } catch (error) {
      console.error('Error in handleAddTax:', error);
      Alert.alert('Error', 'Failed to submit tax data');
    }
  };

  const loadMoreTaxes = () => {
    if (hasMoreData && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderTaxItem = ({ item }: { item: Tax }) => {
    const isSelected = selectedTax === `${item.percentage}%`;

    return (
      <Animated.View entering={FadeIn.delay(50)}>
        <TouchableOpacity
          style={[
            styles.taxItem,
            isSelected && {
              backgroundColor: `${theme.colors.primary}15`,
              borderColor: `${theme.colors.primary}40`,
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
          onPress={() => handleSelectTax(item)}
          activeOpacity={0.7}
        >
          <View style={styles.taxItemContent}>
            <View style={styles.taxInfo}>
              <View
                style={[
                  styles.taxIconContainer,
                  {
                    backgroundColor: isSelected
                      ? `${theme.colors.primary}20`
                      : `${theme.colors.secondary}15`,
                  },
                ]}
              >
                <FileText
                  size={16}
                  color={
                    isSelected ? theme.colors.primary : theme.colors.secondary
                  }
                />
              </View>
              <View style={styles.taxTextContainer}>
                <Text
                  style={[
                    styles.taxName,
                    {
                      color: isSelected
                        ? theme.colors.primary
                        : theme.colors.text,
                    },
                  ]}
                >
                  {item.taxType} {item.percentage}%
                </Text>
                <Text
                  style={[
                    styles.taxType,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.taxType} • {item.percentage}%
                </Text>
              </View>
            </View>

            {isSelected && (
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
        onPress={loadMoreTaxes}
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
          <FileText size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            {showAddForm ? 'Add New Tax Rate' : 'Select Tax Rate'}
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
            setShowAddForm(false);
            setNewTaxRate('');
            onClose();
          }}
        >
          <X size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {!showAddForm && (
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
            placeholder="Search tax rates..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
    </BlurView>
  );

  const renderAddTaxForm = () => (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.addFormContainer}
    >
      <View style={styles.formContent}>
        <Text style={[styles.formLabel, { color: theme.colors.text }]}>
          Tax Rate (%)
        </Text>
        <TextInput
          style={[
            styles.formInput,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              color: theme.colors.text,
            },
          ]}
          placeholder="Enter tax rate (e.g., 15)"
          placeholderTextColor={theme.colors.textSecondary}
          value={newTaxRate}
          onChangeText={setNewTaxRate}
          keyboardType="numeric"
        />

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[
              styles.formButton,
              styles.cancelButton,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
            onPress={() => {
              setShowAddForm(false);
              setNewTaxRate('');
            }}
          >
            <Text
              style={[
                styles.cancelButtonText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.formButton,
              styles.submitButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleAddTax}
            disabled={addTaxMutation.isPending}
          >
            <Text style={styles.submitButtonText}>
              {addTaxMutation.isPending ? 'Adding...' : 'Add Tax Rate'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
      <View
        style={[
          styles.emptyIconContainer,
          { backgroundColor: `${theme.colors.textSecondary}15` },
        ]}
      >
        <FileText size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery ? 'No tax rates found' : 'No tax rates available'}
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        {searchQuery
          ? 'Try adjusting your search terms'
          : 'Add your first tax rate to get started'}
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
        <FileText size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading tax rates...
      </Text>
    </Animated.View>
  );

  const renderErrorState = () => (
    <Animated.View entering={FadeIn} style={styles.errorState}>
      <Text style={[styles.errorText, { color: '#EF4444' }]}>
        Failed to load tax rates
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => {
          setCurrentPage(1);
          setAllTaxes([]);
          refetch();
        }}
      >
        <Text style={[styles.retryText, { color: theme.colors.primary }]}>
          Retry
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderFooter = () => (
    <BlurView
      intensity={themeType === 'dark' ? 15 : 80}
      tint={themeType}
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom + 16,
          borderTopColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => setShowAddForm(true)}
      >
        <Plus size={16} color={theme.colors.primary} />
        <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
          Add New Tax Rate
        </Text>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
      onRequestClose={() => {
        setShowAddForm(false);
        setNewTaxRate('');
        onClose();
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
            setShowAddForm(false);
            setNewTaxRate('');
            onClose();
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
              {showAddForm ? (
                renderAddTaxForm()
              ) : isLoading && currentPage === 1 ? (
                renderLoadingState()
              ) : error ? (
                renderErrorState()
              ) : filteredTaxes.length === 0 ? (
                renderEmptyState()
              ) : (
                <FlatList
                  data={filteredTaxes}
                  renderItem={renderTaxItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  ListFooterComponent={renderLoadMoreButton}
                  onEndReached={loadMoreTaxes}
                  onEndReachedThreshold={0.3}
                />
              )}
            </View>

            {!showAddForm && renderFooter()}
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
  taxItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  taxItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taxInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taxIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taxTextContainer: {
    flex: 1,
  },
  taxName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  taxType: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  addFormContainer: {
    flex: 1,
    padding: 20,
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 24,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    // backgroundColor set dynamically
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TaxSelectionModal;
