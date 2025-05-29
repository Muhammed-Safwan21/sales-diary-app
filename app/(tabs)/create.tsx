import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { FileText, Package, Receipt, CreditCard, ArrowLeft, Users, Truck, Wallet, ChartBar as FileBarChart, ClipboardList, WalletCards } from 'lucide-react-native';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

export default function CreateScreen() {
  const { theme, themeType } = useTheme();
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('sales');
  
  const categories = [
    { id: 'sales', label: 'Sales' },
    { id: 'purchase', label: 'Purchase' },
    { id: 'items', label: 'Items' },
    { id: 'parties', label: 'Parties' },
    { id: 'banking', label: 'Banking' },
    { id: 'others', label: 'Others' },
  ];
  
  const createOptions: Record<string, CreateOption[]> = {
    sales: [
      {
        id: 'invoice',
        title: 'Invoice',
        description: 'Create GST or non-GST invoices',
        icon: <FileText size={24} color="#fff" />,
        route: '/invoice/create',
        color: theme.colors.primary,
      },
      {
        id: 'payment',
        title: 'Payment In',
        description: 'Record payments from customers',
        icon: <CreditCard size={24} color="#fff" />,
        route: '/payments/add?type=in',
        color: theme.colors.success,
      },
      {
        id: 'salesReturn',
        title: 'Sales Return',
        description: 'Create sales returns',
        icon: <Receipt size={24} color="#fff" />,
        route: '/sales/return/create',
        color: theme.colors.success,
      },
      {
        id: 'estimate',
        title: 'Estimate',
        description: 'Create quotations for customers',
        icon: <FileBarChart size={24} color="#fff" />,
        route: '/estimate/create',
        color: theme.colors.accent,
      }
    ],
    purchase: [
      {
        id: 'purchaseBill',
        title: 'Purchase Bill',
        description: 'Record purchases from suppliers',
        icon: <Receipt size={24} color="#fff" />,
        route: '/purchase/bill/create',
        color: theme.colors.secondary,
      },
      {
        id: 'purchaseOrder',
        title: 'Purchase Order',
        description: 'Create purchase orders for suppliers',
        icon: <ClipboardList size={24} color="#fff" />,
        route: '/purchase/order/create',
        color: theme.colors.accent,
      },
      {
        id: 'purchaseReturn',
        title: 'Purchase Return',
        description: 'Create purchase returns',
        icon: <Receipt size={24} color="#fff" />,
        route: '/purchase/return/create',
        color: theme.colors.secondary,
      },
      {
        id: 'paymentOut',
        title: 'Payment Out',
        description: 'Record payments to suppliers',
        icon: <Wallet size={24} color="#fff" />,
        route: '/payments/add?type=out',
        color: theme.colors.error,
      }
    ],
    items: [
      {
        id: 'addItem',
        title: 'Add Item',
        description: 'Create new product or service',
        icon: <Package size={24} color="#fff" />,
        route: '/inventory/add-item',
        color: theme.colors.primary,
      },
      {
        id: 'stockAdjustment',
        title: 'Stock Adjustment',
        description: 'Update current inventory levels',
        icon: <Truck size={24} color="#fff" />,
        route: '/inventory/stock-adjustment',
        color: theme.colors.warning,
      }
    ],
    parties: [
      {
        id: 'addCustomer',
        title: 'Add Customer',
        description: 'Create new customer profile',
        icon: <Users size={24} color="#fff" />,
        route: '/parties/add-customer',
        color: theme.colors.primary,
      },
      {
        id: 'addSupplier',
        title: 'Add Supplier',
        description: 'Create new supplier profile',
        icon: <Truck size={24} color="#fff" />,
        route: '/parties/add-supplier',
        color: theme.colors.secondary,
      }
    ],
    banking:[
      {
        id: 'addBankAccount',
        title: 'Add Bank Account',
        description: 'Create bank account',
        icon: <FileText size={24} color="#fff" />,
        route: '/banking/add',
        color: theme.colors.primary,
      },
    ],
    others:[
      {
        id: 'journal',
        title: 'Add Journal',
        description: 'Create journal entries',
        icon: <FileText size={24} color="#fff" />,
        route: '/journal/create',
        color: theme.colors.secondary,
      },
      {
        id: 'otherReceipt',
        title: 'Add Other Receipt',
        description: 'Create other receipts',
        icon: <Receipt size={24} color="#fff" />,
        route: '/payments/add?type=other',
        color: theme.colors.primary,
      },
      {
        id: 'otherPayments',
        title: 'Add Other Payment',
        description: 'Create other payments',
        icon: <WalletCards size={24} color="#fff" />, 
        route: '/payments/add?type=other',
        color: theme.colors.warning,
      },
    ]
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Create New
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && {
                  backgroundColor: theme.colors.primaryLight,
                  borderColor: theme.colors.primary,
                },
                selectedCategory !== category.id && {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  { fontFamily: theme.typography.fontFamily.medium },
                  selectedCategory === category.id
                    ? { color: theme.colors.primary }
                    : { color: theme.colors.textLight }
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.optionsContainer}>
        <Animated.View 
          entering={FadeIn}
          style={styles.optionsGrid}
        >
          {createOptions[selectedCategory].map((option, index) => (
            <Animated.View 
              key={option.id}
              entering={FadeInUp.delay(index * 100)}
              style={styles.optionWrapper}
            >
              <TouchableOpacity
                style={styles.option}
                onPress={() => router.push(option.route as any)}
              >
                <View style={[styles.optionIconContainer, { backgroundColor: option.color }]}>
                  {option.icon}
                </View>
                <View style={styles.optionContent}>
                  <Text 
                    style={[
                      styles.optionTitle, 
                      { 
                        color: theme.colors.text,
                        fontFamily: theme.typography.fontFamily.medium
                      }
                    ]}
                  >
                    {option.title}
                  </Text>
                  <Text 
                    style={[
                      styles.optionDescription, 
                      { 
                        color: theme.colors.textLight,
                        fontFamily: theme.typography.fontFamily.regular
                      }
                    ]}
                    numberOfLines={2}
                  >
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  categoryContainer: {
    paddingTop: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
  },
  optionsContainer: {
    flex: 1,
    padding: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.65,
    elevation: 2,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
});