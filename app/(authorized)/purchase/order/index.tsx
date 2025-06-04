import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Search, Plus, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierName: string;
  date: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'completed' | 'cancelled';
}

const SAMPLE_ORDERS: PurchaseOrder[] = [
  {
    id: '1',
    orderNumber: 'PO-0001',
    supplierName: 'ABC Suppliers',
    date: '2024-01-25',
    amount: 25000,
    status: 'draft'
  },
  {
    id: '2',
    orderNumber: 'PO-0002',
    supplierName: 'XYZ Trading',
    date: '2024-01-24',
    amount: 18500,
    status: 'sent'
  },
  {
    id: '3',
    orderNumber: 'PO-0003',
    supplierName: 'Global Imports',
    date: '2024-01-23',
    amount: 32000,
    status: 'accepted'
  },
  {
    id: '4',
    orderNumber: 'PO-0004',
    supplierName: 'City Wholesalers',
    date: '2024-01-22',
    amount: 15750,
    status: 'completed'
  },
  {
    id: '5',
    orderNumber: 'PO-0005',
    supplierName: 'Metro Distributors',
    date: '2024-01-21',
    amount: 9800,
    status: 'cancelled'
  }
];

export default function PurchaseOrdersScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statusFilters = [
    { id: 'all', label: 'All' },
    { id: 'draft', label: 'Draft' },
    { id: 'sent', label: 'Sent' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = SAMPLE_ORDERS.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return { bg: theme.colors.primaryLight, text: theme.colors.primary };
      case 'sent':
        return { bg: theme.colors.warningLight, text: theme.colors.warning };
      case 'accepted':
        return { bg: theme.colors.successLight, text: theme.colors.success };
      case 'completed':
        return { bg: theme.colors.accentLight, text: theme.colors.accent };
      case 'cancelled':
        return { bg: theme.colors.errorLight, text: theme.colors.error };
      default:
        return { bg: theme.colors.primaryLight, text: theme.colors.primary };
    }
  };

  const renderOrderItem = ({ item, index }: { item: PurchaseOrder; index: number }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <Animated.View
        entering={FadeInRight.delay(index * 100).springify()}
      >
        <TouchableOpacity
          style={[
            styles.orderCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.shadow
            }
          ]}
          onPress={() => router.push(`/purchase/order/${item.id}`)}
        >
          <View style={styles.orderHeader}>
            <View>
              <Text style={[styles.orderNumber, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                {item.orderNumber}
              </Text>
              <Text style={[styles.supplierName, { color: theme.colors.textLight }]}>
                {item.supplierName}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textLight} />
          </View>

          <View style={styles.orderFooter}>
            <Text style={[styles.date, { color: theme.colors.textLight }]}>
              {item.date}
            </Text>
            <View style={styles.rightSection}>
              <Text style={[styles.amount, { color: theme.colors.text }]}>
                ₹{item.amount.toLocaleString('en-IN')}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                <Text style={[styles.statusText, { color: statusColors.text }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <HeaderBar
        title="Purchase Orders"
        showBack
        rightElement={
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/purchase/order/create')}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search orders"
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {statusFilters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedStatus === filter.id && {
                  backgroundColor: theme.colors.primaryLight,
                  borderColor: theme.colors.primary,
                },
                selectedStatus !== filter.id && {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                }
              ]}
              onPress={() => setSelectedStatus(filter.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  { fontFamily: theme.typography.fontFamily.medium },
                  selectedStatus === filter.id
                    ? { color: theme.colors.primary }
                    : { color: theme.colors.textLight }
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
              No purchase orders found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    marginBottom: 4,
  },
  supplierName: {
    fontSize: 14,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    marginRight: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});