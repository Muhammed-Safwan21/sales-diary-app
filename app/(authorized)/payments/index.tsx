// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   RefreshControl,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import {
//   ArrowLeft,
//   Calendar,
//   IndianRupee,
//   CreditCard,
//   Smartphone,
//   Building2,
//   Banknote,
//   FileText,
//   Plus,
//   TrendingUp,
//   TrendingDown,
//   Edit3,
//   Trash2,
//   User,
//   Hash,
//   MessageSquare,
//   Clock,
//   Filter,
// } from 'lucide-react-native';
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from 'react-native-reanimated';

// // Mock data - replace with your actual data source
// const mockPayments: any = [
//   {
//     id: '1',
//     type: 'in',
//     amount: 15000.0,
//     date: '2024-01-25',
//     paymentMode: 'bank',
//     reference: 'TXN123456789',
//     notes: 'Payment received for invoice INV-001',
//     partyName: 'John Doe',
//     partyId: '1',
//     status: 'completed',
//   },
//   {
//     id: '2',
//     type: 'out',
//     amount: 8500.0,
//     date: '2024-01-24',
//     paymentMode: 'upi',
//     reference: 'UPI-987654321',
//     notes: 'Office supplies payment',
//     partyName: 'Office Mart',
//     partyId: '2',
//     status: 'completed',
//   },
//   {
//     id: '3',
//     type: 'in',
//     amount: 25000.0,
//     date: '2024-01-23',
//     paymentMode: 'cash',
//     reference: '',
//     notes: 'Cash payment from client',
//     partyName: 'Jane Smith',
//     partyId: '3',
//     status: 'completed',
//   },
//   {
//     id: '4',
//     type: 'out',
//     amount: 3200.0,
//     date: '2024-01-22',
//     paymentMode: 'card',
//     reference: 'CARD-456789123',
//     notes: 'Equipment purchase',
//     partyName: 'Tech Solutions',
//     partyId: '4',
//     status: 'pending',
//   },
//   {
//     id: '5',
//     type: 'in',
//     amount: 12000.0,
//     date: '2024-01-21',
//     paymentMode: 'cheque',
//     reference: 'CHQ-001234',
//     notes: 'Cheque payment from ABC Corp',
//     partyName: 'ABC Corporation',
//     partyId: '5',
//     status: 'completed',
//   },
//   {
//     id: '6',
//     type: 'out',
//     amount: 5500.0,
//     date: '2024-01-20',
//     paymentMode: 'bank',
//     reference: 'NEFT-789456123',
//     notes: 'Rent payment',
//     partyName: 'Property Manager',
//     partyId: '6',
//     status: 'completed',
//   },
//   {
//     id: '7',
//     type: 'in',
//     amount: 18000.0,
//     date: '2024-01-19',
//     paymentMode: 'upi',
//     reference: 'UPI-123789456',
//     notes: 'Project milestone payment',
//     partyName: 'XYZ Industries',
//     partyId: '7',
//     status: 'completed',
//   },
//   {
//     id: '8',
//     type: 'out',
//     amount: 2800.0,
//     date: '2024-01-18',
//     paymentMode: 'cash',
//     reference: '',
//     notes: 'Petty cash expenses',
//     partyName: 'Miscellaneous',
//     partyId: '8',
//     status: 'completed',
//   },
// ];

// interface Payment {
//   id: string;
//   type: 'in' | 'out';
//   amount: number;
//   date: string;
//   paymentMode: string;
//   reference: string;
//   notes: string;
//   partyName: string;
//   partyId: string;
//   status: string;
// }

// export default function PaymentListingScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();
//   const [payments, setPayments] = useState<Payment[]>(mockPayments);
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   const paymentModes = [
//     { id: 'cash', label: 'Cash', icon: Banknote, color: '#10B981' },
//     { id: 'card', label: 'Card', icon: CreditCard, color: '#3B82F6' },
//     { id: 'bank', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
//     { id: 'upi', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
//     { id: 'cheque', label: 'Cheque', icon: FileText, color: '#EF4444' },
//   ];

//   const getPaymentModeDetails = (mode: string) => {
//     return paymentModes.find((m) => m.id === mode) || paymentModes[0];
//   };

//   const handleDeletePayment = (
//     paymentId: string,
//     amount: number,
//     type: string
//   ) => {
//     Alert.alert(
//       'Delete Payment',
//       `Are you sure you want to delete this ₹${amount.toLocaleString(
//         'en-IN'
//       )} payment ${
//         type === 'in' ? 'in' : 'out'
//       }? This action cannot be undone.`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             setPayments(payments.filter((payment) => payment.id !== paymentId));
//           },
//         },
//       ]
//     );
//   };

//   const handleEditPayment = (paymentId: string) => {
//     // Navigate to edit screen
//     // router.push(`/payments/form/create/${paymentId}`);
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     // Simulate API call
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   };

//   const filteredPayments = payments.filter((payment) => {
//     if (selectedFilter === 'all') return true;
//     return payment.type === selectedFilter;
//   });

//   const getTotalAmount = (type: 'in' | 'out') => {
//     return payments
//       .filter((p) => p.type === type)
//       .reduce((sum, p) => sum + p.amount, 0);
//   };

//   const renderHeader = () => (
//     <LinearGradient
//       colors={
//         themeType === 'dark'
//           ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
//           : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
//       }
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       style={styles.headerGradient}
//     >
//       <SafeAreaView>
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
//           </TouchableOpacity>

//           <View style={styles.headerTitleContainer}>
//             <IndianRupee size={20} color="#FFFFFF" />
//             <Text style={styles.headerTitle}>Payments</Text>
//           </View>

//           <View style={styles.headerRightSpacer} />
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );

//   const renderSummaryCards = () => (
//     <Animated.View
//       entering={FadeInUp.delay(100)}
//       style={styles.summaryContainer}
//     >
//       <View style={styles.summaryRow}>
//         <BlurView
//           intensity={themeType === 'dark' ? 15 : 80}
//           tint={themeType}
//           style={[styles.summaryCard, styles.summaryCardIn]}
//         >
//           <LinearGradient
//             colors={[
//               'rgba(16, 185, 129, 0.15)',
//               'rgba(16, 185, 129, 0.05)',
//               'transparent',
//             ]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.summaryGradientOverlay}
//           />
//           <View style={styles.summaryContent}>
//             <View
//               style={[
//                 styles.summaryIconContainer,
//                 { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
//               ]}
//             >
//               <TrendingUp size={20} color="#10B981" />
//             </View>
//             <Text
//               style={[
//                 styles.summaryLabel,
//                 { color: theme.colors.textSecondary },
//               ]}
//             >
//               Total In
//             </Text>
//             <View style={styles.summaryAmountContainer}>
//               <IndianRupee size={14} color="#10B981" />
//               <Text style={[styles.summaryAmount, { color: '#10B981' }]}>
//                 {getTotalAmount('in').toLocaleString('en-IN')}
//               </Text>
//             </View>
//           </View>
//         </BlurView>

//         <BlurView
//           intensity={themeType === 'dark' ? 15 : 80}
//           tint={themeType}
//           style={[styles.summaryCard, styles.summaryCardOut]}
//         >
//           <LinearGradient
//             colors={[
//               'rgba(239, 68, 68, 0.15)',
//               'rgba(239, 68, 68, 0.05)',
//               'transparent',
//             ]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.summaryGradientOverlay}
//           />
//           <View style={styles.summaryContent}>
//             <View
//               style={[
//                 styles.summaryIconContainer,
//                 { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
//               ]}
//             >
//               <TrendingDown size={20} color="#EF4444" />
//             </View>
//             <Text
//               style={[
//                 styles.summaryLabel,
//                 { color: theme.colors.textSecondary },
//               ]}
//             >
//               Total Out
//             </Text>
//             <View style={styles.summaryAmountContainer}>
//               <IndianRupee size={14} color="#EF4444" />
//               <Text style={[styles.summaryAmount, { color: '#EF4444' }]}>
//                 {getTotalAmount('out').toLocaleString('en-IN')}
//               </Text>
//             </View>
//           </View>
//         </BlurView>
//       </View>
//     </Animated.View>
//   );

//   const renderFilterTabs = () => (
//     <Animated.View
//       entering={FadeInUp.delay(200)}
//       style={styles.filterContainer}
//     >
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filterTabsContainer}
//       >
//         {[
//           { key: 'all', label: 'All', count: payments.length },
//           {
//             key: 'in',
//             label: 'Payment In',
//             count: payments.filter((p) => p.type === 'in').length,
//           },
//           {
//             key: 'out',
//             label: 'Payment Out',
//             count: payments.filter((p) => p.type === 'out').length,
//           },
//         ].map((filter) => (
//           <TouchableOpacity
//             key={filter.key}
//             style={[
//               styles.filterTab,
//               {
//                 backgroundColor:
//                   selectedFilter === filter.key
//                     ? theme.colors.primary
//                     : themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.7)',
//                 borderColor:
//                   selectedFilter === filter.key
//                     ? theme.colors.primary
//                     : themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.1)'
//                     : 'rgba(255, 255, 255, 0.3)',
//               },
//             ]}
//             onPress={() => setSelectedFilter(filter.key)}
//           >
//             <Text
//               style={[
//                 styles.filterTabText,
//                 {
//                   color:
//                     selectedFilter === filter.key
//                       ? '#FFFFFF'
//                       : theme.colors.text,
//                   fontWeight: selectedFilter === filter.key ? '600' : '500',
//                 },
//               ]}
//             >
//               {filter.label}
//             </Text>
//             {filter.count > 0 && (
//               <View
//                 style={[
//                   styles.filterTabBadge,
//                   {
//                     backgroundColor:
//                       selectedFilter === filter.key
//                         ? 'rgba(255, 255, 255, 0.2)'
//                         : `${theme.colors.primary}20`,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.filterTabBadgeText,
//                     {
//                       color:
//                         selectedFilter === filter.key
//                           ? '#FFFFFF'
//                           : theme.colors.primary,
//                     },
//                   ]}
//                 >
//                   {filter.count}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </Animated.View>
//   );

//   const renderPaymentCard = (payment: Payment, index: number) => {
//     const modeDetails = getPaymentModeDetails(payment.paymentMode);
//     const IconComponent = modeDetails.icon;
//     const isPaymentIn = payment.type === 'in';

//     return (
//       <Animated.View
//         key={payment.id}
//         entering={FadeInDown.delay(index * 50).springify()}
//         style={styles.cardContainer}
//       >
//         <BlurView
//           intensity={themeType === 'dark' ? 15 : 80}
//           tint={themeType}
//           style={[
//             styles.paymentCard,
//             {
//               borderColor:
//                 themeType === 'dark'
//                   ? 'rgba(255, 255, 255, 0.1)'
//                   : 'rgba(255, 255, 255, 0.3)',
//               borderLeftWidth: 4,
//               borderLeftColor: isPaymentIn ? '#10B981' : '#EF4444',
//             },
//           ]}
//         >
//           <LinearGradient
//             colors={[
//               isPaymentIn
//                 ? 'rgba(16, 185, 129, 0.08)'
//                 : 'rgba(239, 68, 68, 0.08)',
//               'transparent',
//             ]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.cardGradientOverlay}
//           />

//           <View style={styles.cardContent}>
//             <View style={styles.cardHeader}>
//               <View style={styles.paymentTypeContainer}>
//                 <View
//                   style={[
//                     styles.typeIconContainer,
//                     {
//                       backgroundColor: isPaymentIn
//                         ? 'rgba(16, 185, 129, 0.2)'
//                         : 'rgba(239, 68, 68, 0.2)',
//                     },
//                   ]}
//                 >
//                   {isPaymentIn ? (
//                     <TrendingUp size={16} color="#10B981" />
//                   ) : (
//                     <TrendingDown size={16} color="#EF4444" />
//                   )}
//                 </View>
//                 <View style={styles.typeTextContainer}>
//                   <Text
//                     style={[styles.paymentType, { color: theme.colors.text }]}
//                   >
//                     Payment {isPaymentIn ? 'In' : 'Out'}
//                   </Text>
//                   <Text
//                     style={[
//                       styles.paymentDate,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     {new Date(payment.date).toLocaleDateString('en-IN', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                     })}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.cardActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionButton,
//                     styles.editButton,
//                     { backgroundColor: `${theme.colors.primary}15` },
//                   ]}
//                   onPress={() => handleEditPayment(payment.id)}
//                 >
//                   <Edit3 size={14} color={theme.colors.primary} />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[
//                     styles.actionButton,
//                     styles.deleteButton,
//                     { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
//                   ]}
//                   onPress={() =>
//                     handleDeletePayment(
//                       payment.id,
//                       payment.amount,
//                       payment.type
//                     )
//                   }
//                 >
//                   <Trash2 size={14} color="#EF4444" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.amountContainer}>
//               <IndianRupee
//                 size={18}
//                 color={isPaymentIn ? '#10B981' : '#EF4444'}
//               />
//               <Text
//                 style={[
//                   styles.amount,
//                   { color: isPaymentIn ? '#10B981' : '#EF4444' },
//                 ]}
//               >
//                 {payment.amount.toLocaleString('en-IN', {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </Text>
//             </View>

//             <View style={styles.paymentDetails}>
//               <View style={styles.detailRow}>
//                 <User size={12} color={theme.colors.textSecondary} />
//                 <Text style={[styles.partyName, { color: theme.colors.text }]}>
//                   {payment.partyName}
//                 </Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <IconComponent size={12} color={modeDetails.color} />
//                 <Text
//                   style={[
//                     styles.paymentMode,
//                     { color: theme.colors.textSecondary },
//                   ]}
//                 >
//                   {modeDetails.label}
//                 </Text>
//               </View>

//               {payment.reference && (
//                 <View style={styles.detailRow}>
//                   <Hash size={12} color={theme.colors.textSecondary} />
//                   <Text
//                     style={[
//                       styles.reference,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     {payment.reference}
//                   </Text>
//                 </View>
//               )}

//               {payment.notes && (
//                 <View style={styles.detailRow}>
//                   <MessageSquare size={12} color={theme.colors.textSecondary} />
//                   <Text
//                     style={[
//                       styles.notes,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                     numberOfLines={2}
//                   >
//                     {payment.notes}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         </BlurView>
//       </Animated.View>
//     );
//   };

//   const renderEmptyState = () => (
//     <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
//       <BlurView
//         intensity={themeType === 'dark' ? 15 : 80}
//         tint={themeType}
//         style={styles.emptyCard}
//       >
//         <IndianRupee
//           size={48}
//           color={theme.colors.textSecondary}
//           strokeWidth={1}
//         />
//         <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
//           No {selectedFilter === 'all' ? '' : `payment ${selectedFilter}`}{' '}
//           records found
//         </Text>
//         <Text
//           style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
//         >
//           {selectedFilter === 'all'
//             ? 'Start by recording your first payment'
//             : `No payment ${selectedFilter} records at the moment`}
//         </Text>
//       </BlurView>
//     </Animated.View>
//   );

//   const renderFloatingActionButtons = () => (
//     <Animated.View
//       entering={FadeIn.delay(500)}
//       style={styles.floatingButtonsContainer}
//     >
//       <TouchableOpacity
//         style={[
//           styles.floatingButton,
//           styles.floatingButtonIn,
//           { backgroundColor: '#10B981', shadowColor: '#10B981' },
//         ]}
//         onPress={() => router.push('/payments/form/create?type=in')}
//         activeOpacity={0.8}
//       >
//         <TrendingUp size={20} color="#FFFFFF" strokeWidth={2.5} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.floatingButton,
//           styles.floatingButtonOut,
//           { backgroundColor: '#EF4444', shadowColor: '#EF4444' },
//         ]}
//         onPress={() => router.push('/payments/form/create?type=out')}
//         activeOpacity={0.8}
//       >
//         <TrendingDown size={20} color="#FFFFFF" strokeWidth={2.5} />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

//       {renderHeader()}

//       <View style={styles.content}>
//         {renderSummaryCards()}
//         {renderFilterTabs()}

//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           {isLoading ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color={theme.colors.primary} />
//               <Text
//                 style={[
//                   styles.loadingText,
//                   { color: theme.colors.textSecondary },
//                 ]}
//               >
//                 Loading payments...
//               </Text>
//             </View>
//           ) : filteredPayments.length > 0 ? (
//             <View style={styles.paymentsList}>
//               {filteredPayments.map((payment, index) =>
//                 renderPaymentCard(payment, index)
//               )}
//             </View>
//           ) : (
//             renderEmptyState()
//           )}
//         </ScrollView>
//       </View>

//       {renderFloatingActionButtons()}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerGradient: {
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 12 : 8,
//     paddingVertical: 16,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.2,
//   },
//   headerRightSpacer: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//     marginTop: -10,
//   },
//   summaryContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   summaryCard: {
//     flex: 1,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   summaryCardIn: {},
//   summaryCardOut: {},
//   summaryGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   summaryContent: {
//     padding: 16,
//     position: 'relative',
//     zIndex: 2,
//   },
//   summaryIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   summaryAmountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   summaryAmount: {
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//   },
//   filterContainer: {
//     marginHorizontal: 20,
//     marginBottom: 16,
//   },
//   filterTabsContainer: {
//     paddingHorizontal: 0,
//     paddingVertical: 8,
//     gap: 8,
//   },
//   filterTab: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     borderWidth: 1,
//     gap: 4,
//     minHeight: 32,
//   },
//   filterTabText: {
//     fontSize: 12,
//     letterSpacing: -0.1,
//   },
//   filterTabBadge: {
//     minWidth: 16,
//     height: 16,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//   },
//   filterTabBadgeText: {
//     fontSize: 9,
//     fontWeight: '600',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 120,
//   },
//   paymentsList: {
//     gap: 10,
//   },
//   cardContainer: {
//     marginBottom: 2,
//   },
//   paymentCard: {
//     borderRadius: 16,
//     borderWidth: 1,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   cardGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   cardContent: {
//     padding: 16,
//     position: 'relative',
//     zIndex: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   paymentTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     flex: 1,
//   },
//   typeIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   typeTextContainer: {
//     flex: 1,
//   },
//   paymentType: {
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//     marginBottom: 2,
//   },
//   paymentDate: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   cardActions: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   actionButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   editButton: {
//     borderColor: 'rgba(99, 102, 241, 0.2)',
//   },
//   deleteButton: {
//     borderColor: 'rgba(239, 68, 68, 0.2)',
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     marginBottom: 16,
//   },
//   amount: {
//     fontSize: 24,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   paymentDetails: {
//     gap: 8,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   partyName: {
//     fontSize: 14,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//   },
//   paymentMode: {
//     fontSize: 12,
//     fontWeight: '500',
//     textTransform: 'capitalize',
//   },
//   reference: {
//     fontSize: 12,
//     fontWeight: '500',
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//   },
//   notes: {
//     fontSize: 12,
//     fontWeight: '500',
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   loadingText: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 12,
//   },
//   emptyContainer: {
//     flex: 1,
//     paddingVertical: 60,
//   },
//   emptyCard: {
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 32,
//     alignItems: 'center',
//     gap: 12,
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     letterSpacing: -0.2,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   floatingButtonsContainer: {
//     position: 'absolute',
//     bottom: 30,
//     right: 20,
//     gap: 12,
//   },
//   floatingButton: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   floatingButtonIn: {},
//   floatingButtonOut: {},
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  IndianRupee,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  FileText,
  TrendingUp,
  TrendingDown,
  Edit3,
  Trash2,
  User,
  Hash,
  Plus,
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

// Mock data - replace with your actual data source
const mockPayments = [
  {
    id: '1',
    type: 'in',
    amount: 15000.0,
    date: '2024-01-25',
    paymentMode: 'bank',
    reference: 'TXN123456789',
    notes: 'Payment received for invoice INV-001',
    partyName: 'John Doe',
    partyId: '1',
    status: 'completed',
  },
  {
    id: '2',
    type: 'out',
    amount: 8500.0,
    date: '2024-01-24',
    paymentMode: 'upi',
    reference: 'UPI-987654321',
    notes: 'Office supplies payment',
    partyName: 'Office Mart',
    partyId: '2',
    status: 'completed',
  },
  {
    id: '3',
    type: 'in',
    amount: 25000.0,
    date: '2024-01-23',
    paymentMode: 'cash',
    reference: '',
    notes: 'Cash payment from client',
    partyName: 'Jane Smith',
    partyId: '3',
    status: 'completed',
  },
  {
    id: '4',
    type: 'out',
    amount: 3200.0,
    date: '2024-01-22',
    paymentMode: 'card',
    reference: 'CARD-456789123',
    notes: 'Equipment purchase',
    partyName: 'Tech Solutions',
    partyId: '4',
    status: 'pending',
  },
  {
    id: '5',
    type: 'in',
    amount: 12000.0,
    date: '2024-01-21',
    paymentMode: 'cheque',
    reference: 'CHQ-001234',
    notes: 'Cheque payment from ABC Corp',
    partyName: 'ABC Corporation',
    partyId: '5',
    status: 'completed',
  },
];

interface Payment {
  id: string;
  type: 'in' | 'out';
  amount: number;
  date: string;
  paymentMode: string;
  reference: string;
  notes: string;
  partyName: string;
  partyId: string;
  status: string;
}

export default function PaymentListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [payments, setPayments] = useState(mockPayments);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const paymentModes = [
    { id: 'cash', label: 'Cash', icon: Banknote, color: '#10B981' },
    { id: 'card', label: 'Card', icon: CreditCard, color: '#3B82F6' },
    { id: 'bank', label: 'Bank Transfer', icon: Building2, color: '#8B5CF6' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: '#F59E0B' },
    { id: 'cheque', label: 'Cheque', icon: FileText, color: '#EF4444' },
  ];

  const getPaymentModeDetails = (mode: any) => {
    return paymentModes.find((m) => m.id === mode) || paymentModes[0];
  };

  const handleDeletePayment = (paymentId: any, amount: any, type: any) => {
    Alert.alert(
      'Delete Payment',
      `Are you sure you want to delete this ₹${amount.toLocaleString(
        'en-IN'
      )} payment ${
        type === 'in' ? 'in' : 'out'
      }? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPayments(payments.filter((payment) => payment.id !== paymentId));
          },
        },
      ]
    );
  };

  const handleEditPayment = (paymentId: any) => {
    // Navigate to edit screen
    // router.push(`/payments/form/create/${paymentId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredPayments = payments.filter((payment) => {
    if (selectedFilter === 'all') return true;
    return payment.type === selectedFilter;
  });

  const renderHeader = () => (
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <IndianRupee size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Payments</Text>
          </View>

          <View style={styles.headerRightSpacer} />
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
          { key: 'all', label: 'All', count: payments.length },
          {
            key: 'in',
            label: 'Payment In',
            count: payments.filter((p) => p.type === 'in').length,
          },
          {
            key: 'out',
            label: 'Payment Out',
            count: payments.filter((p) => p.type === 'out').length,
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
                    : 'rgba(255, 255, 255, 0.7)',
                borderColor:
                  selectedFilter === filter.key
                    ? theme.colors.primary
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.3)',
              },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                {
                  color:
                    selectedFilter === filter.key
                      ? '#FFFFFF'
                      : theme.colors.text,
                  fontWeight: selectedFilter === filter.key ? '600' : '500',
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
                        ? 'rgba(255, 255, 255, 0.2)'
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

  const renderPaymentCard = (payment: any, index: any) => {
    const modeDetails = getPaymentModeDetails(payment.paymentMode);
    const IconComponent = modeDetails.icon;
    const isPaymentIn = payment.type === 'in';

    return (
      <Animated.View
        key={payment.id}
        entering={FadeInDown.delay(index * 50).springify()}
        style={styles.cardContainer}
      >
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={[
            styles.paymentCard,
            {
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.paymentInfo}>
                <View style={styles.paymentTypeRow}>
                  <View
                    style={[
                      styles.typeIndicator,
                      {
                        backgroundColor: isPaymentIn
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(239, 68, 68, 0.2)',
                      },
                    ]}
                  >
                    {isPaymentIn ? (
                      <TrendingUp size={12} color="#10B981" />
                    ) : (
                      <TrendingDown size={12} color="#EF4444" />
                    )}
                  </View>
                  <Text
                    style={[styles.paymentType, { color: theme.colors.text }]}
                  >
                    {isPaymentIn ? 'Payment In' : 'Payment Out'}
                  </Text>
                  <Text
                    style={[
                      styles.paymentDate,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {new Date(payment.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </View>

                <View style={styles.amountRow}>
                  <IndianRupee
                    size={16}
                    color={isPaymentIn ? '#10B981' : '#EF4444'}
                  />
                  <Text
                    style={[
                      styles.amount,
                      { color: isPaymentIn ? '#10B981' : '#EF4444' },
                    ]}
                  >
                    {payment.amount.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: `${theme.colors.primary}15` },
                  ]}
                  onPress={() => handleEditPayment(payment.id)}
                >
                  <Edit3 size={12} color={theme.colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                  ]}
                  onPress={() =>
                    handleDeletePayment(
                      payment.id,
                      payment.amount,
                      payment.type
                    )
                  }
                >
                  <Trash2 size={12} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.paymentDetails}>
              <View style={styles.detailRow}>
                <User size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.partyName, { color: theme.colors.text }]}>
                  {payment.partyName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <IconComponent size={12} color={modeDetails.color} />
                <Text
                  style={[
                    styles.paymentMode,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {modeDetails.label}
                </Text>
                {payment.reference && (
                  <>
                    <Text
                      style={[
                        styles.separator,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      •
                    </Text>
                    <Text
                      style={[
                        styles.reference,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {payment.reference}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
      <BlurView
        intensity={themeType === 'dark' ? 15 : 80}
        tint={themeType}
        style={styles.emptyCard}
      >
        <IndianRupee
          size={48}
          color={theme.colors.textSecondary}
          strokeWidth={1}
        />
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No {selectedFilter === 'all' ? '' : `payment ${selectedFilter}`}{' '}
          records found
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          {selectedFilter === 'all'
            ? 'Start by recording your first payment'
            : `No payment ${selectedFilter} records at the moment`}
        </Text>
      </BlurView>
    </Animated.View>
  );

  const renderFloatingActionButton = () => (
    <Animated.View
      entering={FadeIn.delay(400)}
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
        onPress={() => router.push('/payments/form/create')}
        activeOpacity={0.8}
      >
        <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                Loading payments...
              </Text>
            </View>
          ) : filteredPayments.length > 0 ? (
            <View style={styles.paymentsList}>
              {filteredPayments.map((payment, index) =>
                renderPaymentCard(payment, index)
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
    paddingBottom: 20,
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
  headerRightSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    marginTop: -10,
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  filterTabsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    minHeight: 32,
  },
  filterTabText: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  filterTabBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterTabBadgeText: {
    fontSize: 9,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  paymentsList: {
    gap: 8,
  },
  cardContainer: {
    marginBottom: 2,
  },
  paymentCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  typeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentType: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
    flex: 1,
  },
  paymentDate: {
    fontSize: 11,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  partyName: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
    flex: 1,
  },
  paymentMode: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  separator: {
    fontSize: 11,
    fontWeight: '500',
  },
  reference: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: 60,
  },
  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
