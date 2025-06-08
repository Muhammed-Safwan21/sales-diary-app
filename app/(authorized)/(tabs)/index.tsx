// import { BusinessInfoCard } from '@/components/home/BusinessInfoCard';
// import { QuickAction } from '@/components/home/QuickAction';
// import { useTheme } from '@/context/ThemeContext';
// import { apiClient } from '@/services/api'; // Adjust import path as needed
// import { useQuery } from '@tanstack/react-query';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import {
//   ArrowUpRight,
//   BarChart3,
//   Bell,
//   Clock,
//   CreditCard,
//   FileText,
//   IndianRupee,
//   Package,
//   Search,
//   Sparkles,
//   Wallet,
// } from 'lucide-react-native';
// import React from 'react';
// import {
//   ActivityIndicator,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';


// const TransactionItem = ({ transaction, theme }: { transaction: any; theme: any }) => {
//   const getInvoiceTypeColor = (type: string) => {
//     switch (type) {
//       case 'SALES':
//         return '#06D6A0';
//       case 'PURCHASE':
//         return '#F59E0B';
//       case 'CREDIT_NOTE':
//         return '#EC4899';
//       case 'DEBIT_NOTE':
//         return '#EF4444';
//       default:
//         return theme.colors.primary;
//     }
//   };

//   const getInvoiceTypeLabel = (type: string) => {
//     switch (type) {
//       case 'SALES':
//         return 'Sales';
//       case 'PURCHASE':
//         return 'Purchase';
//       case 'CREDIT_NOTE':
//         return 'Credit Note';
//       case 'DEBIT_NOTE':
//         return 'Debit Note';
//       case 'OPENING_BALANCE':
//         return 'Opening Balance';
//       default:
//         return type;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'COMPLETED':
//         return '#06D6A0';
//       case 'PENDING':
//         return '#F59E0B';
//       case 'CANCELLED':
//         return '#EF4444';
//       default:
//         return theme.colors.textSecondary;
//     }
//   };

//   return (
//     <View style={[styles.transactionItem, { backgroundColor: theme.colors.surface }]}>
//       <View style={styles.transactionHeader}>
//         <View style={styles.transactionInfo}>
//           <View style={styles.transactionTypeContainer}>
//             <View
//               style={[
//                 styles.transactionTypeBadge,
//                 { backgroundColor: `${getInvoiceTypeColor(transaction.invoiceType)}20` },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.transactionTypeText,
//                   { color: getInvoiceTypeColor(transaction.invoiceType) },
//                 ]}
//               >
//                 {getInvoiceTypeLabel(transaction.invoiceType)}
//               </Text>
//             </View>
//             <Text style={[styles.voucherNumber, { color: theme.colors.text }]}>
//               {transaction.voucherNo}
//             </Text>
//           </View>
//           <View style={styles.transactionMeta}>
//             <Clock size={12} color={theme.colors.textSecondary} />
//             <Text style={[styles.transactionDate, { color: theme.colors.textSecondary }]}>
//               {formatDate(transaction.transactionDate)}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.transactionAmount}>
//           <View style={styles.amountContainer}>
//             <IndianRupee size={14} color={theme.colors.text} />
//             <Text style={[styles.amount, { color: theme.colors.text }]}>
//               {parseFloat(transaction.totalAmount).toLocaleString('en-IN')}
//             </Text>
//           </View>
//           <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(transaction.status)}20` }]}>
//             <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
//               {transaction.status}
//             </Text>
//           </View>
//         </View>
//       </View>
//       {parseFloat(transaction.outstanding) > 0 && (
//         <View style={styles.outstandingContainer}>
//           <Text style={[styles.outstandingLabel, { color: theme.colors.textSecondary }]}>
//             Outstanding: ₹{parseFloat(transaction.outstanding).toLocaleString('en-IN')}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default function HomeScreen() {
//   const { theme, themeType }: any = useTheme();
//   const { branchInfo, configuration, countryInfo, financialYear, user } =
//     useSelector((state: any) => state.auth);
//   const router = useRouter();

//   // Fetch transactions using TanStack Query
//   const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useQuery<any>({
//     queryKey: ['transactions', branchInfo?.id, financialYear?.id, user?.id],
//     queryFn: async () => {
//       const params = new URLSearchParams({
//         order: 'DESC', // Latest first
//         page: '1',
//         take: '5', // Limit to 5 recent transactions
//         ...(branchInfo?.id && { branchId: branchInfo.id }),
//         ...(financialYear?.id && { financialYearId: financialYear.id }),
//         ...(user?.id && { staffId: user.id }),
//       });

//       const response = await apiClient.get(`transactions?${params.toString()}`);
//       return response.data;
//     },
//     enabled: !!branchInfo?.id && !!financialYear?.id && !!user?.id, // Only run when we have required data
//   });


//   console.log("transactionsData",transactionsData)
//   const transactions = transactionsData?.data || [];
//   const hasTransactions = transactions.length > 0;

//   console.log("branchInfo, configuration, countryInfo, financialYear, user", branchInfo, configuration, countryInfo, financialYear, user);

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

//       {/* Ultra-modern header with extended gradient background */}
//       <LinearGradient
//         colors={
//           themeType === 'dark'
//             ? [
//                 '#1A1B3A',
//                 '#2D1B69',
//                 '#3D2A7A',
//                 'rgba(61, 42, 122, 0.6)',
//                 'rgba(26, 27, 58, 0.3)',
//                 'transparent',
//               ]
//             : [
//                 '#6366F1',
//                 '#8B5CF6',
//                 '#EC4899',
//                 'rgba(236, 72, 153, 0.4)',
//                 'rgba(139, 92, 246, 0.2)',
//                 'transparent',
//               ]
//         }
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.header}>
//             <View style={styles.headerTop}>
//               <View style={styles.greetingSection}>
//                 <Text
//                   style={[
//                     styles.greeting,
//                     { color: 'rgba(255, 255, 255, 0.8)' },
//                   ]}
//                 >
//                   Good morning ✨
//                 </Text>
//                 <Text style={[styles.userName, { color: '#FFFFFF' }]}>
//                   Welcome back, {user?.firstName}
//                 </Text>
//               </View>

//               <View style={styles.headerActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.headerButton,
//                     {
//                       backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                       borderColor: 'rgba(255, 255, 255, 0.2)',
//                       borderWidth: 1,
//                     },
//                   ]}
//                 >
//                   <Search size={18} color="rgba(255, 255, 255, 0.9)" />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => router.push('/notification')}
//                   style={[
//                     styles.headerButton,
//                     {
//                       backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                       borderColor: 'rgba(255, 255, 255, 0.2)',
//                       borderWidth: 1,
//                     },
//                   ]}
//                 >
//                   <Bell size={18} color="rgba(255, 255, 255, 0.9)" />
//                   <View style={styles.notificationDot} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       {/* Floating business card - positioned in the gradient fade area */}
//       <View style={styles.businessCardContainer}>
//         <BusinessInfoCard />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Quick Actions with modern cards */}
//         <View style={styles.quickActionsSection}>
//           <View style={styles.sectionTitleContainer}>
//             <Sparkles size={22} color={theme.colors.accent} />
//             <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
//               Quick Actions
//             </Text>
//           </View>

//           <View style={styles.actionGrid}>
//             <QuickAction
//               icon={<FileText size={24} color="#FFFFFF" />}
//               title="New Invoice"
//               subtitle="Create & send invoices"
//               route="/invoice/create"
//               gradient={['#6366F1', '#8B5CF6']}
//             />
//             <QuickAction
//               icon={<Package size={24} color="#FFFFFF" />}
//               title="Add Product"
//               subtitle="Manage inventory"
//               route="/inventory/add-item"
//               gradient={['#EC4899', '#F472B6']}
//             />
//             <QuickAction
//               icon={<CreditCard size={24} color="#FFFFFF" />}
//               title="Payment"
//               subtitle="Record transactions"
//               route="/payments/add"
//               gradient={['#06D6A0', '#34D399']}
//             />
//             <QuickAction
//               icon={<Wallet size={24} color="#FFFFFF" />}
//               title="Expense"
//               subtitle="Track business costs"
//               route="/expenses/add"
//               gradient={['#F59E0B', '#FBBF24']}
//             />
//           </View>
//         </View>

//         {/* Recent Activity with glass card */}
//         <BlurView
//           intensity={themeType === 'dark' ? 15 : 60}
//           tint={themeType}
//           style={styles.activitySection}
//         >
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
//               Recent Activity
//             </Text>
//             <TouchableOpacity 
//               style={styles.viewAllButton}
//               // onPress={() => router.push('/transactions')}
//             >
//               <Text
//                 style={[styles.viewAllText, { color: theme.colors.primary }]}
//               >
//                 View All
//               </Text>
//               <ArrowUpRight size={16} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>

//           {/* Loading State */}
//           {isTransactionsLoading && (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color={theme.colors.primary} />
//               <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
//                 Loading transactions...
//               </Text>
//             </View>
//           )}

//           {/* Error State */}
//           {transactionsError && (
//             <View style={styles.errorContainer}>
//               <Text style={[styles.errorText, { color: theme.colors.error }]}>
//                 Failed to load transactions
//               </Text>
//               <TouchableOpacity
//                 style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
//                 onPress={() => {
//                   // Add retry logic here if needed
//                 }}
//               >
//                 <Text style={styles.retryButtonText}>Retry</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* Transactions List */}
//           {!isTransactionsLoading && !transactionsError && hasTransactions && (
//             <View style={styles.transactionsList}>
//               {transactions.map((transaction: any) => (
//                 <TransactionItem
//                   key={transaction.id}
//                   transaction={transaction}
//                   theme={theme}
//                 />
//               ))}
//             </View>
//           )}

//           {/* Empty State */}
//           {!isTransactionsLoading && !transactionsError && !hasTransactions && (
//             <View style={styles.emptyState}>
//               <LinearGradient
//                 colors={
//                   themeType === 'dark'
//                     ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
//                     : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
//                 }
//                 style={styles.emptyIconContainer}
//               >
//                 <BarChart3 size={32} color={theme.colors.primary} />
//               </LinearGradient>

//               <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
//                 Ready to start?
//               </Text>
//               <Text
//                 style={[
//                   styles.emptySubtitle,
//                   { color: theme.colors.textSecondary },
//                 ]}
//               >
//                 Create your first invoice or add products to see activity here
//               </Text>

//               <TouchableOpacity
//                 style={[
//                   styles.actionButton,
//                   {
//                     backgroundColor: theme.colors.primary,
//                     shadowColor: theme.colors.primary,
//                   },
//                 ]}
//                 onPress={() => router.push('/invoice/create')}
//               >
//                 <Text style={styles.actionButtonText}>Get Started</Text>
//                 <Sparkles size={16} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </BlurView>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerGradient: {
//     height: 280, // Extended height for natural gradient fade
//     width: '100%',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 12 : 8,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 24,
//   },
//   greetingSection: {
//     flex: 1,
//   },
//   greeting: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   headerButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   notificationDot: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#EF4444',
//   },
//   businessCardContainer: {
//     position: 'absolute',
//     top: 160, // Positioned in the gradient fade area
//     left: 20,
//     right: 20,
//     zIndex: 999,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: -80, // Overlap to create seamless flow
//   },
//   scrollContent: {
//     paddingTop: 200, // Space for the business card and gradient overlap
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   viewAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   viewAllText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   quickActionsSection: {
//     marginBottom: 32,
//   },
//   actionGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 12,
//     marginTop: 16,
//   },
//   activitySection: {
//     borderRadius: 24,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//   },
//   // Loading States
//   loadingContainer: {
//     alignItems: 'center',
//     paddingVertical: 32,
//   },
//   loadingText: {
//     fontSize: 14,
//     marginTop: 12,
//   },
//   errorContainer: {
//     alignItems: 'center',
//     paddingVertical: 32,
//   },
//   errorText: {
//     fontSize: 14,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   retryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 12,
//   },
//   retryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   // Transaction Items
//   transactionsList: {
//     gap: 12,
//   },
//   transactionItem: {
//     padding: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   transactionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   transactionInfo: {
//     flex: 1,
//   },
//   transactionTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 4,
//   },
//   transactionTypeBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   transactionTypeText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   voucherNumber: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   transactionMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   transactionDate: {
//     fontSize: 12,
//   },
//   transactionAmount: {
//     alignItems: 'flex-end',
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//     marginBottom: 4,
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },
//   outstandingContainer: {
//     marginTop: 8,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   outstandingLabel: {
//     fontSize: 12,
//     fontStyle: 'italic',
//   },
//   // Empty State
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 32,
//   },
//   emptyIconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 8,
//     letterSpacing: -0.2,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 24,
//     maxWidth: 280,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 16,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   actionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

import { BusinessInfoCard } from '@/components/home/BusinessInfoCard';
import { QuickAction } from '@/components/home/QuickAction';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Package,
  Search,
  Sparkles,
  Wallet,
  Clock,
  IndianRupee,
} from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api'; // Adjust import path as needed

const TransactionItem = ({ transaction, theme }: { transaction: any; theme: any }) => {
  const getInvoiceTypeColor = (type: string) => {
    switch (type) {
      case 'SALES':
        return '#06D6A0';
      case 'PURCHASE':
        return '#F59E0B';
      case 'CREDIT_NOTE':
        return '#EC4899';
      case 'DEBIT_NOTE':
        return '#EF4444';
      default:
        return theme.colors.primary;
    }
  };

  const getInvoiceTypeLabel = (type: string) => {
    switch (type) {
      case 'SALES':
        return 'Sales';
      case 'PURCHASE':
        return 'Purchase';
      case 'CREDIT_NOTE':
        return 'Credit Note';
      case 'DEBIT_NOTE':
        return 'Debit Note';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '#06D6A0';
      case 'PENDING':
        return '#F59E0B';
      case 'CANCELLED':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.transactionItem, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <View style={styles.transactionTypeContainer}>
            <View
              style={[
                styles.transactionTypeBadge,
                { backgroundColor: `${getInvoiceTypeColor(transaction.invoiceType)}20` },
              ]}
            >
              <Text
                style={[
                  styles.transactionTypeText,
                  { color: getInvoiceTypeColor(transaction.invoiceType) },
                ]}
              >
                {getInvoiceTypeLabel(transaction.invoiceType)}
              </Text>
            </View>
            <Text style={[styles.voucherNumber, { color: theme.colors.text }]}>
              {transaction.voucherNo}
            </Text>
          </View>
          <View style={styles.transactionMeta}>
            <Clock size={12} color={theme.colors.textSecondary} />
            <Text style={[styles.transactionDate, { color: theme.colors.textSecondary }]}>
              {formatDate(transaction.transactionDate)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionAmount}>
          <View style={styles.amountContainer}>
            <IndianRupee size={14} color={theme.colors.text} />
            <Text style={[styles.amount, { color: theme.colors.text }]}>
              {parseFloat(transaction.totalAmount).toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(transaction.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
              {transaction.status}
            </Text>
          </View>
        </View>
      </View>
      {parseFloat(transaction.outstanding) > 0 && (
        <View style={styles.outstandingContainer}>
          <Text style={[styles.outstandingLabel, { color: theme.colors.textSecondary }]}>
            Outstanding: ₹{parseFloat(transaction.outstanding).toLocaleString('en-IN')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const { theme, themeType }: any = useTheme();
  const { branchInfo, configuration, countryInfo, financialYear, user } =
    useSelector((state: any) => state.auth);
  const router = useRouter();

  // Fetch transactions using TanStack Query
  const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useQuery<any>({
    queryKey: ['transactions', branchInfo?.id, financialYear?.id, user?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        order: 'DESC', // Latest first
        page: '1',
        take: '5', // Limit to 5 recent transactions
        ...(branchInfo?.id && { branchId: branchInfo.id }),
        ...(financialYear?.id && { financialYearId: financialYear.id }),
        ...(user?.id && { staffId: user.id }),
      });

      const response = await apiClient.get(`transactions?${params.toString()}`);
      return response.data;
    },
    enabled: !!branchInfo?.id && !!financialYear?.id && !!user?.id, // Only run when we have required data
  });

  const transactions = transactionsData?.data || [];
  const hasTransactions = transactions.length > 0;

  console.log("branchInfo, configuration, countryInfo, financialYear, user", branchInfo, configuration, countryInfo, financialYear, user);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Ultra-modern header with extended gradient background */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? [
                '#1A1B3A',
                '#2D1B69',
                '#3D2A7A',
                'rgba(61, 42, 122, 0.6)',
                'rgba(26, 27, 58, 0.3)',
                'transparent',
              ]
            : [
                '#6366F1',
                '#8B5CF6',
                '#EC4899',
                'rgba(236, 72, 153, 0.4)',
                'rgba(139, 92, 246, 0.2)',
                'transparent',
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.greetingSection}>
                <Text
                  style={[
                    styles.greeting,
                    { color: 'rgba(255, 255, 255, 0.8)' },
                  ]}
                >
                  Good morning ✨
                </Text>
                <Text style={[styles.userName, { color: '#FFFFFF' }]}>
                  Welcome back, {user?.firstName}
                </Text>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={[
                    styles.headerButton,
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Search size={18} color="rgba(255, 255, 255, 0.9)" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/notification')}
                  style={[
                    styles.headerButton,
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Bell size={18} color="rgba(255, 255, 255, 0.9)" />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Floating business card - positioned in the gradient fade area */}
      <View style={styles.businessCardContainer}>
        <BusinessInfoCard />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions with modern cards */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionTitleContainer}>
            <Sparkles size={22} color={theme.colors.accent} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Quick Actions
            </Text>
          </View>

          <View style={styles.actionGrid}>
            <QuickAction
              icon={<FileText size={24} color="#FFFFFF" />}
              title="New Invoice"
              subtitle="Create & send invoices"
              route="/invoice/create"
              gradient={['#6366F1', '#8B5CF6']}
            />
            <QuickAction
              icon={<Package size={24} color="#FFFFFF" />}
              title="Add Product"
              subtitle="Manage inventory"
              route="/inventory/add-item"
              gradient={['#EC4899', '#F472B6']}
            />
            <QuickAction
              icon={<CreditCard size={24} color="#FFFFFF" />}
              title="Payment"
              subtitle="Record transactions"
              route="/payments/add"
              gradient={['#06D6A0', '#34D399']}
            />
            <QuickAction
              icon={<Wallet size={24} color="#FFFFFF" />}
              title="Expense"
              subtitle="Track business costs"
              route="/expenses/add"
              gradient={['#F59E0B', '#FBBF24']}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recent Activity
            </Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              // onPress={() => router.push('/transactions')}
            >
              <Text
                style={[styles.viewAllText, { color: theme.colors.primary }]}
              >
                View All
              </Text>
              <ArrowUpRight size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Loading State */}
          {isTransactionsLoading && (
            <BlurView
              intensity={themeType === 'dark' ? 15 : 60}
              tint={themeType}
              style={styles.activitySection}
            >
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
                  Loading transactions...
                </Text>
              </View>
            </BlurView>
          )}

          {/* Error State */}
          {transactionsError && (
            <BlurView
              intensity={themeType === 'dark' ? 15 : 60}
              tint={themeType}
              style={styles.activitySection}
            >
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  Failed to load transactions
                </Text>
                <TouchableOpacity
                  style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => {
                    // Add retry logic here if needed
                  }}
                >
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          )}

          {/* Transactions List - No card wrapper when transactions exist */}
          {!isTransactionsLoading && !transactionsError && hasTransactions && (
            <View style={styles.transactionsList}>
              {transactions.map((transaction: any) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  theme={theme}
                />
              ))}
            </View>
          )}

          {/* Empty State - Keep card wrapper for empty state */}
          {!isTransactionsLoading && !transactionsError && !hasTransactions && (
            <BlurView
              intensity={themeType === 'dark' ? 15 : 60}
              tint={themeType}
              style={styles.activitySection}
            >
              <View style={styles.emptyState}>
                <LinearGradient
                  colors={
                    themeType === 'dark'
                      ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
                      : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
                  }
                  style={styles.emptyIconContainer}
                >
                  <BarChart3 size={32} color={theme.colors.primary} />
                </LinearGradient>

                <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                  Ready to start?
                </Text>
                <Text
                  style={[
                    styles.emptySubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Create your first invoice or add products to see activity here
                </Text>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: theme.colors.primary,
                      shadowColor: theme.colors.primary,
                    },
                  ]}
                  onPress={() => router.push('/invoice/create')}
                >
                  <Text style={styles.actionButtonText}>Get Started</Text>
                  <Sparkles size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </BlurView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    height: 280, // Extended height for natural gradient fade
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  businessCardContainer: {
    position: 'absolute',
    top: 160, // Positioned in the gradient fade area
    left: 20,
    right: 20,
    zIndex: 999,
  },
  scrollView: {
    flex: 1,
    marginTop: -80, // Overlap to create seamless flow
  },
  scrollContent: {
    paddingTop: 200, // Space for the business card and gradient overlap
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  recentActivityContainer: {
    marginBottom: 20,
  },
  activitySection: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  // Loading States
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    fontSize: 14,
    marginTop: 12,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Transaction Items
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  transactionTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  transactionTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  voucherNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  outstandingContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  outstandingLabel: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
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
    marginBottom: 24,
    maxWidth: 280,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});