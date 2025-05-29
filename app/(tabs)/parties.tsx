import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Phone, IndianRupee } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Customer } from '@/types';

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
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('customers'); // customers or suppliers
  
  const filteredCustomers = SAMPLE_CUSTOMERS.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const renderCustomerItem = ({ item, index }: { item: Customer, index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
    >
      <TouchableOpacity 
        style={[
          styles.customerCard, 
          { 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow
          }
        ]}
      >
        <View style={styles.customerInfo}>
          <Text 
            style={[
              styles.customerName, 
              { 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium
              }
            ]}
          >
            {item.name}
          </Text>
          
          <View style={styles.phoneContainer}>
            <Phone size={14} color={theme.colors.textLight} />
            <Text 
              style={[
                styles.customerPhone, 
                { 
                  color: theme.colors.textLight,
                  fontFamily: theme.typography.fontFamily.regular 
                }
              ]}
            >
              {item.phone}
            </Text>
          </View>
        </View>
        
        <View style={[styles.amountContainer, { borderLeftColor: theme.colors.border }]}>
          <Text 
            style={[
              styles.amountLabel, 
              { 
                color: theme.colors.textLight,
                fontFamily: theme.typography.fontFamily.regular
              }
            ]}
          >
            You'll Get
          </Text>
          
          <View style={styles.amountValue}>
            <IndianRupee size={14} color={item.outstandingAmount > 0 ? theme.colors.success : theme.colors.text} />
            <Text 
              style={[
                styles.amount, 
                { 
                  color: item.outstandingAmount > 0 ? theme.colors.success : theme.colors.text,
                  fontFamily: theme.typography.fontFamily.medium
                }
              ]}
            >
              {item.outstandingAmount.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Parties
        </Text>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search by name or phone"
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'customers' && [
              styles.activeTab,
              { borderBottomColor: theme.colors.primary }
            ]
          ]}
          onPress={() => setActiveTab('customers')}
        >
          <Text
            style={[
              styles.tabText,
              { fontFamily: theme.typography.fontFamily.medium },
              activeTab === 'customers'
                ? { color: theme.colors.primary }
                : { color: theme.colors.textLight }
            ]}
          >
            Customers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'suppliers' && [
              styles.activeTab,
              { borderBottomColor: theme.colors.primary }
            ]
          ]}
          onPress={() => setActiveTab('suppliers')}
        >
          <Text
            style={[
              styles.tabText,
              { fontFamily: theme.typography.fontFamily.medium },
              activeTab === 'suppliers'
                ? { color: theme.colors.primary }
                : { color: theme.colors.textLight }
            ]}
          >
            Suppliers
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'customers' ? (
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={renderCustomerItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
                No customers found
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
            No suppliers found
          </Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  customerCard: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
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
  customerInfo: {
    flex: 1,
    padding: 16,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerPhone: {
    fontSize: 14,
    marginLeft: 6,
  },
  amountContainer: {
    padding: 16,
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  amountValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    marginLeft: 2,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
});