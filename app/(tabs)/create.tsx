// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { useRouter } from 'expo-router';
// import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
// import { FileText, Package, Receipt, CreditCard, ArrowLeft, Users, Truck, Wallet, ChartBar as FileBarChart, ClipboardList, WalletCards } from 'lucide-react-native';

// interface CreateOption {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   route: string;
//   color: string;
// }

// export default function CreateScreen() {
//   const { theme, themeType } = useTheme();
//   const router = useRouter();
  
//   const [selectedCategory, setSelectedCategory] = useState<string>('sales');
  
//   const categories = [
//     { id: 'sales', label: 'Sales' },
//     { id: 'purchase', label: 'Purchase' },
//     { id: 'items', label: 'Items' },
//     { id: 'parties', label: 'Parties' },
//     { id: 'banking', label: 'Banking' },
//     { id: 'others', label: 'Others' },
//   ];
  
//   const createOptions: Record<string, CreateOption[]> = {
//     sales: [
//       {
//         id: 'invoice',
//         title: 'Invoice',
//         description: 'Create GST or non-GST invoices',
//         icon: <FileText size={24} color="#fff" />,
//         route: '/invoice/create',
//         color: theme.colors.primary,
//       },
//       {
//         id: 'payment',
//         title: 'Payment In',
//         description: 'Record payments from customers',
//         icon: <CreditCard size={24} color="#fff" />,
//         route: '/payments/add?type=in',
//         color: theme.colors.success,
//       },
//       {
//         id: 'salesReturn',
//         title: 'Sales Return',
//         description: 'Create sales returns',
//         icon: <Receipt size={24} color="#fff" />,
//         route: '/sales/return/create',
//         color: theme.colors.success,
//       },
//       {
//         id: 'estimate',
//         title: 'Estimate',
//         description: 'Create quotations for customers',
//         icon: <FileBarChart size={24} color="#fff" />,
//         route: '/estimate/create',
//         color: theme.colors.accent,
//       }
//     ],
//     purchase: [
//       {
//         id: 'purchaseBill',
//         title: 'Purchase Bill',
//         description: 'Record purchases from suppliers',
//         icon: <Receipt size={24} color="#fff" />,
//         route: '/purchase/bill/create',
//         color: theme.colors.secondary,
//       },
//       {
//         id: 'purchaseOrder',
//         title: 'Purchase Order',
//         description: 'Create purchase orders for suppliers',
//         icon: <ClipboardList size={24} color="#fff" />,
//         route: '/purchase/order/create',
//         color: theme.colors.accent,
//       },
//       {
//         id: 'purchaseReturn',
//         title: 'Purchase Return',
//         description: 'Create purchase returns',
//         icon: <Receipt size={24} color="#fff" />,
//         route: '/purchase/return/create',
//         color: theme.colors.secondary,
//       },
//       {
//         id: 'paymentOut',
//         title: 'Payment Out',
//         description: 'Record payments to suppliers',
//         icon: <Wallet size={24} color="#fff" />,
//         route: '/payments/add?type=out',
//         color: theme.colors.error,
//       }
//     ],
//     items: [
//       {
//         id: 'addItem',
//         title: 'Add Item',
//         description: 'Create new product or service',
//         icon: <Package size={24} color="#fff" />,
//         route: '/inventory/add-item',
//         color: theme.colors.primary,
//       },
//       {
//         id: 'stockAdjustment',
//         title: 'Stock Adjustment',
//         description: 'Update current inventory levels',
//         icon: <Truck size={24} color="#fff" />,
//         route: '/inventory/stock-adjustment',
//         color: theme.colors.warning,
//       }
//     ],
//     parties: [
//       {
//         id: 'addCustomer',
//         title: 'Add Customer',
//         description: 'Create new customer profile',
//         icon: <Users size={24} color="#fff" />,
//         route: '/parties/add-customer',
//         color: theme.colors.primary,
//       },
//       {
//         id: 'addSupplier',
//         title: 'Add Supplier',
//         description: 'Create new supplier profile',
//         icon: <Truck size={24} color="#fff" />,
//         route: '/parties/add-supplier',
//         color: theme.colors.secondary,
//       }
//     ],
//     banking:[
//       {
//         id: 'addBankAccount',
//         title: 'Add Bank Account',
//         description: 'Create bank account',
//         icon: <FileText size={24} color="#fff" />,
//         route: '/banking/add',
//         color: theme.colors.primary,
//       },
//     ],
//     others:[
//       {
//         id: 'journal',
//         title: 'Add Journal',
//         description: 'Create journal entries',
//         icon: <FileText size={24} color="#fff" />,
//         route: '/journal/create',
//         color: theme.colors.secondary,
//       },
//       {
//         id: 'otherReceipt',
//         title: 'Add Other Receipt',
//         description: 'Create other receipts',
//         icon: <Receipt size={24} color="#fff" />,
//         route: '/payments/add?type=other',
//         color: theme.colors.primary,
//       },
//       {
//         id: 'otherPayments',
//         title: 'Add Other Payment',
//         description: 'Create other payments',
//         icon: <WalletCards size={24} color="#fff" />, 
//         route: '/payments/add?type=other',
//         color: theme.colors.warning,
//       },
//     ]
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
//       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
//         <TouchableOpacity 
//           onPress={() => router.back()} 
//           style={styles.backButton}
//         >
//           <ArrowLeft size={24} color={theme.colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
//           Create New
//         </Text>
//         <View style={styles.placeholder} />
//       </View>
      
//       <View style={styles.categoryContainer}>
//         <ScrollView 
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoryScroll}
//         >
//           {categories.map((category) => (
//             <TouchableOpacity
//               key={category.id}
//               style={[
//                 styles.categoryButton,
//                 selectedCategory === category.id && {
//                   backgroundColor: theme.colors.primaryLight,
//                   borderColor: theme.colors.primary,
//                 },
//                 selectedCategory !== category.id && {
//                   backgroundColor: theme.colors.card,
//                   borderColor: theme.colors.border,
//                 }
//               ]}
//               onPress={() => setSelectedCategory(category.id)}
//             >
//               <Text
//                 style={[
//                   styles.categoryText,
//                   { fontFamily: theme.typography.fontFamily.medium },
//                   selectedCategory === category.id
//                     ? { color: theme.colors.primary }
//                     : { color: theme.colors.textLight }
//                 ]}
//               >
//                 {category.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
      
//       <ScrollView style={styles.optionsContainer}>
//         <Animated.View 
//           entering={FadeIn}
//           style={styles.optionsGrid}
//         >
//           {createOptions[selectedCategory].map((option, index) => (
//             <Animated.View 
//               key={option.id}
//               entering={FadeInUp.delay(index * 100)}
//               style={styles.optionWrapper}
//             >
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => router.push(option.route as any)}
//               >
//                 <View style={[styles.optionIconContainer, { backgroundColor: option.color }]}>
//                   {option.icon}
//                 </View>
//                 <View style={styles.optionContent}>
//                   <Text 
//                     style={[
//                       styles.optionTitle, 
//                       { 
//                         color: theme.colors.text,
//                         fontFamily: theme.typography.fontFamily.medium
//                       }
//                     ]}
//                   >
//                     {option.title}
//                   </Text>
//                   <Text 
//                     style={[
//                       styles.optionDescription, 
//                       { 
//                         color: theme.colors.textLight,
//                         fontFamily: theme.typography.fontFamily.regular
//                       }
//                     ]}
//                     numberOfLines={2}
//                   >
//                     {option.description}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     justifyContent: 'space-between',
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//   },
//   placeholder: {
//     width: 40,
//   },
//   categoryContainer: {
//     paddingTop: 16,
//   },
//   categoryScroll: {
//     paddingHorizontal: 16,
//   },
//   categoryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginRight: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   categoryText: {
//     fontSize: 14,
//   },
//   optionsContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   optionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   optionWrapper: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   option: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 2.65,
//     elevation: 2,
//   },
//   optionIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionContent: {
//     flex: 1,
//     paddingLeft: 16,
//     justifyContent: 'center',
//   },
//   optionTitle: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   optionDescription: {
//     fontSize: 14,
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { 
  FileText, 
  Package, 
  Receipt, 
  CreditCard, 
  ArrowLeft, 
  Users, 
  Truck, 
  Wallet, 
  ChartBar as FileBarChart, 
  ClipboardList, 
  WalletCards,
  Sparkles,
  Plus
} from 'lucide-react-native';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  gradient: string[];
}

export default function CreateScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('sales');
  
  const categories = [
    { id: 'sales', label: 'Sales', icon: <FileText size={16} /> },
    { id: 'purchase', label: 'Purchase', icon: <Receipt size={16} /> },
    { id: 'items', label: 'Items', icon: <Package size={16} /> },
    { id: 'parties', label: 'Parties', icon: <Users size={16} /> },
    { id: 'banking', label: 'Banking', icon: <CreditCard size={16} /> },
    { id: 'others', label: 'Others', icon: <Wallet size={16} /> },
  ];
  
  const createOptions: Record<string, CreateOption[]> = {
    sales: [
      {
        id: 'invoice',
        title: 'Invoice',
        description: 'Create GST or non-GST invoices',
        icon: <FileText size={22} />,
        route: '/invoice/create',
        gradient: ['#6366F1', '#8B5CF6'],
      },
      {
        id: 'payment',
        title: 'Payment In',
        description: 'Record payments from customers',
        icon: <CreditCard size={22} />,
        route: '/payments/add?type=in',
        gradient: ['#06D6A0', '#34D399'],
      },
      {
        id: 'salesReturn',
        title: 'Sales Return',
        description: 'Create sales returns',
        icon: <Receipt size={22} />,
        route: '/sales/return/create',
        gradient: ['#F59E0B', '#FBBF24'],
      },
      {
        id: 'estimate',
        title: 'Estimate',
        description: 'Create quotations for customers',
        icon: <FileBarChart size={22} />,
        route: '/estimate/create',
        gradient: ['#EC4899', '#F472B6'],
      }
    ],
    purchase: [
      {
        id: 'purchaseBill',
        title: 'Purchase Bill',
        description: 'Record purchases from suppliers',
        icon: <Receipt size={22} />,
        route: '/purchase/bill/create',
        gradient: ['#8B5CF6', '#A78BFA'],
      },
      {
        id: 'purchaseOrder',
        title: 'Purchase Order',
        description: 'Create purchase orders for suppliers',
        icon: <ClipboardList size={22} />,
        route: '/purchase/order/create',
        gradient: ['#06B6D4', '#22D3EE'],
      },
      {
        id: 'purchaseReturn',
        title: 'Purchase Return',
        description: 'Create purchase returns',
        icon: <Receipt size={22} />,
        route: '/purchase/return/create',
        gradient: ['#F97316', '#FB923C'],
      },
      {
        id: 'paymentOut',
        title: 'Payment Out',
        description: 'Record payments to suppliers',
        icon: <Wallet size={22} />,
        route: '/payments/add?type=out',
        gradient: ['#EF4444', '#F87171'],
      }
    ],
    items: [
      {
        id: 'addItem',
        title: 'Add Item',
        description: 'Create new product or service',
        icon: <Package size={22} />,
        route: '/inventory/add-item',
        gradient: ['#6366F1', '#8B5CF6'],
      },
      {
        id: 'stockAdjustment',
        title: 'Stock Adjustment',
        description: 'Update current inventory levels',
        icon: <Truck size={22} />,
        route: '/inventory/stock-adjustment',
        gradient: ['#F59E0B', '#FBBF24'],
      }
    ],
    parties: [
      {
        id: 'addCustomer',
        title: 'Add Customer',
        description: 'Create new customer profile',
        icon: <Users size={22} />,
        route: '/parties/add-customer',
        gradient: ['#6366F1', '#8B5CF6'],
      },
      {
        id: 'addSupplier',
        title: 'Add Supplier',
        description: 'Create new supplier profile',
        icon: <Truck size={22} />,
        route: '/parties/add-supplier',
        gradient: ['#8B5CF6', '#A78BFA'],
      }
    ],
    banking: [
      {
        id: 'addBankAccount',
        title: 'Add Bank Account',
        description: 'Create bank account',
        icon: <CreditCard size={22} />,
        route: '/banking/add',
        gradient: ['#06B6D4', '#22D3EE'],
      },
    ],
    others: [
      {
        id: 'journal',
        title: 'Add Journal',
        description: 'Create journal entries',
        icon: <FileText size={22} />,
        route: '/journal/create',
        gradient: ['#8B5CF6', '#A78BFA'],
      },
      {
        id: 'otherReceipt',
        title: 'Add Other Receipt',
        description: 'Create other receipts',
        icon: <Receipt size={22} />,
        route: '/payments/add?type=other',
        gradient: ['#06D6A0', '#34D399'],
      },
      {
        id: 'otherPayments',
        title: 'Add Other Payment',
        description: 'Create other payments',
        icon: <WalletCards size={22} />,
        route: '/payments/add?type=other',
        gradient: ['#F59E0B', '#FBBF24'],
      },
    ]
  };

  const renderCategoryButton = (category: any) => {
    const isSelected = selectedCategory === category.id;
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryButton,
          {
            backgroundColor: isSelected 
              ? themeType === 'dark' 
                ? 'rgba(99, 102, 241, 0.15)' 
                : 'rgba(99, 102, 241, 0.1)'
              : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.03)',
            borderColor: isSelected 
              ? theme.colors.primary 
              : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
          }
        ]}
        onPress={() => setSelectedCategory(category.id)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.categoryIconContainer,
          {
            backgroundColor: isSelected ? `${theme.colors.primary}20` : 'transparent',
          }
        ]}>
          {React.cloneElement(category.icon, {
            color: isSelected ? theme.colors.primary : theme.colors.textSecondary
          })}
        </View>
        <Text style={[
          styles.categoryText,
          {
            color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
            fontWeight: isSelected ? '600' : '500',
          }
        ]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCreateOption = (option: any, index: number) => (
    <Animated.View 
      key={option.id}
      entering={FadeInUp.delay(index * 50)}
      style={styles.optionWrapper}
    >
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push(option.route as any)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.optionContainer,
          {
            backgroundColor: themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.8)',
            borderColor: themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
          }
        ]}>
          {/* Gradient overlay */}
          <LinearGradient
            colors={[
              `${option.gradient[0]}12`,
              `${option.gradient[1]}06`,
              'transparent'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradientOverlay}
          />
          
          <View style={styles.optionContent}>
            <View style={[
              styles.optionIconContainer,
              {
                backgroundColor: `${option.gradient[0]}20`,
                borderColor: `${option.gradient[0]}30`,
              }
            ]}>
              {React.cloneElement(option.icon, {
                color: option.gradient[0]
              })}
            </View>
            
            <View style={styles.optionTextContainer}>
              <Text style={[
                styles.optionTitle,
                { color: theme.colors.text }
              ]}>
                {option.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                { color: theme.colors.textSecondary }
              ]}>
                {option.description}
              </Text>
            </View>
          </View>
          
          <View style={[
            styles.optionArrowContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.05)',
            }
          ]}>
            <Plus size={14} color={theme.colors.textSecondary} />
          </View>
        </View>
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <Sparkles size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Create New</Text>
            </View>
            
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      
      {/* Category Section */}
      <View style={styles.categorySection}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>
      
      {/* Options Section */}
      <ScrollView 
        style={styles.optionsScrollView}
        contentContainerStyle={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn}
          style={styles.optionsGrid}
        >
          {createOptions[selectedCategory].map((option, index) => 
            renderCreateOption(option, index)
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    // paddingBottom: 20,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  placeholder: {
    width: 40,
  },
  categorySection: {
    marginTop: -30,
    paddingVertical: 20,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    minWidth: 100,
  },
  categoryIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  optionsScrollView: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  optionsGrid: {
    gap: 12,
  },
  optionWrapper: {
    marginBottom: 0,
  },
  option: {
    overflow: 'hidden',
  },
  optionContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  optionGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
    lineHeight: 18,
  },
  optionArrowContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -14 }],
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
});