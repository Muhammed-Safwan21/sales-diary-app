// import { useTheme } from '@/context/ThemeContext';
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Building2, Mail, Phone, Plus, Search, X } from 'lucide-react-native';
// import React, { useState, useEffect } from 'react';
// import {
//   FlatList,
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import Animated, {
//   FadeIn,
//   FadeOut,
//   SlideInDown,
//   SlideOutDown,
// } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import { apiClient } from '@/services/api';
// import API from '@/config/api';
// import QUERY_KEY from '@/config/queryKey';

// // Types
// interface ContactLedger {
//   id: string;
//   name: string;
//   totalAmount: string;
//   openingBalance: string;
// }

// interface Contact {
//   id: string;
//   name: string;
//   businessName: string;
//   email: string;
//   mobile: string;
//   ledger: ContactLedger;
// }

// interface PartySelectionModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSelectParty: (party: Contact) => void;
//   selectedPartyId?: string;
//   contactType: 'CUSTOMER' | 'SUPPLIER';
// }

// const PartySelectionModal: React.FC<PartySelectionModalProps> = ({
//   visible,
//   onClose,
//   onSelectParty,
//   selectedPartyId,
//   contactType,
// }) => {
//   const { theme, themeType }: any = useTheme();
//   const insets = useSafeAreaInsets();
//   const queryClient = useQueryClient();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newParty, setNewParty] = useState({
//     name: '',
//     businessName: '',
//     email: '',
//     mobile: '',
//   });
//   const [allParties, setAllParties] = useState<Contact[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMoreData, setHasMoreData] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   // Get adminId and branchId from Redux
//   const adminId = useSelector((state: any) => state.auth?.user?.id);
//   const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

//   // Query for fetching parties
//   const {
//     data: partiesResponse,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: [QUERY_KEY.PARTIES, contactType, currentPage, searchQuery],
//     queryFn: async () => {
//       const searchParam = searchQuery
//         ? `&search=${encodeURIComponent(searchQuery)}`
//         : '';
//       return await apiClient.get(
//         `${API.PARTIES}?order=ASC&page=${currentPage}&take=10&adminId=${adminId}&branchId=${branchId}&contactType=${contactType}${searchParam}`
//       );
//     },
//     enabled: visible,
//     select: (res: any) => res?.data,
//   });

//   // Update parties list when data changes
//   useEffect(() => {
//     if (partiesResponse?.data?.rows) {
//       if (currentPage === 1) {
//         setAllParties(partiesResponse.data.rows);
//       } else {
//         setAllParties((prev) => [...prev, ...partiesResponse.data.rows]);
//       }
//       setHasMoreData(partiesResponse.meta?.hasNextPage || false);
//       setIsLoadingMore(false);
//     }
//   }, [partiesResponse, currentPage]);

//   // Reset pagination when search query or contactType changes
//   useEffect(() => {
//     setCurrentPage(1);
//     setAllParties([]);
//     setHasMoreData(true);
//   }, [searchQuery, contactType]);

//   // Add party mutation
//   const addPartyMutation = useMutation({
//     mutationFn: async (partyData: any) => {
//       return await apiClient.post(API.PARTIES, partyData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PARTIES] });
//       setCurrentPage(1);
//       setAllParties([]);
//       setNewParty({ name: '', businessName: '', email: '', mobile: '' });
//       setShowAddForm(false);
//       Alert.alert('Success', `${contactType} added successfully!`);
//     },
//     onError: (error: any) => {
//       console.log(`Error adding ${contactType.toLowerCase()}:`, error);
//       Alert.alert(
//         'Error',
//         error?.response?.data?.message || `Failed to add ${contactType.toLowerCase()}`
//       );
//     },
//   });

//   const filteredParties = searchQuery
//     ? allParties.filter(
//         (party: Contact) =>
//           party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           party.mobile.includes(searchQuery) ||
//           party.businessName.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : allParties;

//   const handleSelectParty = (party: Contact) => {
//     onSelectParty(party);
//     onClose();
//     setSearchQuery('');
//   };

//   const handleAddParty = () => {
//     if (!newParty.name.trim()) {
//       Alert.alert('Error', 'Please enter a name');
//       return;
//     }

//     if (!newParty.mobile.trim()) {
//       Alert.alert('Error', 'Please enter a mobile number');
//       return;
//     }

//     if (!adminId || !branchId) {
//       console.error('Admin ID or Branch ID not found in Redux state');
//       Alert.alert('Error', 'User information not found');
//       return;
//     }

//     const partyData = {
//       name: newParty.name,
//       businessName: newParty.businessName || undefined,
//       email: newParty.email || undefined,
//       mobile: newParty.mobile,
//       contactType,
//       adminId: Number(adminId),
//       branchId: Number(branchId),
//     };

//     console.log(`Attempting to add ${contactType.toLowerCase()}:`, partyData);

//     try {
//       addPartyMutation.mutate(partyData);
//     } catch (error) {
//       console.error(`Error in handleAdd${contactType}:`, error);
//       Alert.alert('Error', `Failed to submit ${contactType.toLowerCase()} data`);
//     }
//   };

//   const loadMoreParties = () => {
//     if (hasMoreData && !isLoadingMore && !isLoading) {
//       setIsLoadingMore(true);
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const renderPartyItem = ({ item }: { item: Contact }) => {
//     const isSelected = selectedPartyId === item.id;
//     const outstandingAmount = parseFloat(item.ledger.totalAmount || '0');
//     const hasOutstanding = outstandingAmount > 0;

//     return (
//       <Animated.View entering={FadeIn.delay(50)}>
//         <TouchableOpacity
//           style={[
//             styles.partyItem,
//             isSelected && {
//               backgroundColor: `${theme.colors.primary}15`,
//               borderColor: `${theme.colors.primary}40`,
//             },
//             {
//               backgroundColor: isSelected
//                 ? `${theme.colors.primary}15`
//                 : themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.03)'
//                 : 'rgba(255, 255, 255, 0.6)',
//               borderColor: isSelected
//                 ? `${theme.colors.primary}40`
//                 : themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.08)'
//                 : 'rgba(0, 0, 0, 0.06)',
//             },
//           ]}
//           onPress={() => handleSelectParty(item)}
//           activeOpacity={0.7}
//         >
//           <View style={styles.partyItemContent}>
//             <View style={styles.partyInfo}>
//               <View style={styles.nameContainer}>
//                 <Text
//                   style={[
//                     styles.partyName,
//                     {
//                       color: isSelected ? theme.colors.primary : theme.colors.text,
//                     },
//                   ]}
//                 >
//                   {item.name}
//                 </Text>
//                 <View
//                   style={[
//                     styles.statusDot,
//                     {
//                       backgroundColor: hasOutstanding
//                         ? contactType === 'CUSTOMER'
//                           ? theme.colors.success
//                           : theme.colors.error
//                         : theme.colors.primary,
//                     },
//                   ]}
//                 />
//               </View>

//               {item.businessName && (
//                 <View style={styles.businessContainer}>
//                   <View
//                     style={[
//                       styles.iconContainer,
//                       { backgroundColor: `${theme.colors.secondary}15` },
//                     ]}
//                   >
//                     <Building2 size={14} color={theme.colors.secondary} />
//                   </View>
//                   <Text
//                     style={[
//                       styles.businessName,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     {item.businessName}
//                   </Text>
//                 </View>
//               )}

//               <View style={styles.phoneContainer}>
//                 <View
//                   style={[
//                     styles.iconContainer,
//                     { backgroundColor: `${theme.colors.secondary}15` },
//                     ]}
//                   >
//                     <Phone size={14} color={theme.colors.secondary} />
//                   </View>
//                   <Text
//                     style={[
//                       styles.partyPhone,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     {item.mobile}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>
//       );
//     };

//     const renderLoadMoreButton = () => {
//       if (!hasMoreData) return null;

//       return (
//         <TouchableOpacity
//           style={[
//             styles.loadMoreButton,
//             {
//               backgroundColor: `${theme.colors.primary}10`,
//               borderColor: `${theme.colors.primary}20`,
//             },
//           ]}
//           onPress={loadMoreParties}
//           disabled={isLoadingMore || isLoading}
//         >
//           {isLoadingMore ? (
//             <ActivityIndicator size="small" color={theme.colors.primary} />
//           ) : (
//             <Plus size={16} color={theme.colors.primary} />
//           )}
//           <Text style={[styles.loadMoreText, { color: theme.colors.primary }]}>
//             {isLoadingMore ? 'Loading...' : 'Load More'}
//           </Text>
//         </TouchableOpacity>
//       );
//     };

//     const renderHeader = () => (
//       <BlurView
//         intensity={themeType === 'dark' ? 20 : 80}
//         tint={themeType}
//         style={[
//           styles.header,
//           {
//             paddingTop: 16,
//             borderBottomColor:
//               themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.08)'
//                 : 'rgba(0, 0, 0, 0.06)',
//           },
//         ]}
//       >
//         <LinearGradient
//           colors={[
//             `${theme.colors.primary}15`,
//             `${theme.colors.primary}05`,
//             'transparent',
//           ]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//           style={styles.headerGradient}
//         />

//         <View style={styles.headerContent}>
//           <View style={styles.headerTitleContainer}>
//             <Building2 size={20} color={theme.colors.primary} />
//             <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
//               {showAddForm
//                 ? `Add New ${contactType.charAt(0) + contactType.slice(1).toLowerCase()}`
//                 : `Select ${contactType.charAt(0) + contactType.slice(1).toLowerCase()}`}
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[
//               styles.closeButton,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.1)'
//                     : 'rgba(0, 0, 0, 0.05)',
//               },
//             ]}
//             onPress={() => {
//               setShowAddForm(false);
//               setNewParty({ name: '', businessName: '', email: '', mobile: '' });
//               onClose();
//             }}
//           >
//             <X size={18} color={theme.colors.textSecondary} />
//           </TouchableOpacity>
//         </View>

//         {!showAddForm && (
//           <View
//             style={[
//               styles.searchContainer,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//                 borderColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.08)'
//                     : 'rgba(0, 0, 0, 0.06)',
//               },
//             ]}
//           >
//             <Search size={16} color={theme.colors.textSecondary} />
//             <TextInput
//               style={[styles.searchInput, { color: theme.colors.text }]}
//               placeholder="Search by name, phone, or business"
//               placeholderTextColor={theme.colors.textSecondary}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
//         )}
//       </BlurView>
//     );

//     const renderAddPartyForm = () => (
//       <Animated.View
//         entering={FadeIn.duration(300)}
//         style={styles.addFormContainer}
//       >
//         <View style={styles.formContent}>
//           <Text style={[styles.formLabel, { color: theme.colors.text }]}>
//             Name *
//           </Text>
//           <TextInput
//             style={[
//               styles.formInput,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//                 borderColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.08)'
//                     : 'rgba(0, 0, 0, 0.06)',
//                 color: theme.colors.text,
//               },
//             ]}
//             placeholder="Enter name"
//             placeholderTextColor={theme.colors.textSecondary}
//             value={newParty.name}
//             onChangeText={(text) => setNewParty({ ...newParty, name: text })}
//           />

//           <Text style={[styles.formLabel, { color: theme.colors.text }]}>
//             Business Name
//           </Text>
//           <TextInput
//             style={[
//               styles.formInput,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//                 borderColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.08)'
//                     : 'rgba(0, 0, 0, 0.06)',
//                 color: theme.colors.text,
//               },
//             ]}
//             placeholder="Enter business name"
//             placeholderTextColor={theme.colors.textSecondary}
//             value={newParty.businessName}
//             onChangeText={(text) =>
//               setNewParty({ ...newParty, businessName: text })
//             }
//           />

//           <Text style={[styles.formLabel, { color: theme.colors.text }]}>
//             Mobile *
//           </Text>
//           <TextInput
//             style={[
//               styles.formInput,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//                 borderColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.08)'
//                     : 'rgba(0, 0, 0, 0.06)',
//                 color: theme.colors.text,
//               },
//             ]}
//             placeholder="Enter mobile number"
//             placeholderTextColor={theme.colors.textSecondary}
//             value={newParty.mobile}
//             onChangeText={(text) => setNewParty({ ...newParty, mobile: text })}
//             keyboardType="phone-pad"
//           />

//           <Text style={[styles.formLabel, { color: theme.colors.text }]}>
//             Email
//           </Text>
//           <TextInput
//             style={[
//               styles.formInput,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//                 borderColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.08)'
//                     : 'rgba(0, 0, 0, 0.06)',
//                 color: theme.colors.text,
//               },
//             ]}
//             placeholder="Enter email"
//             placeholderTextColor={theme.colors.textSecondary}
//             value={newParty.email}
//             onChangeText={(text) => setNewParty({ ...newParty, email: text })}
//             keyboardType="email-address"
//           />

//           <View style={styles.formButtons}>
//             <TouchableOpacity
//               style={[
//                 styles.formButton,
//                 styles.cancelButton,
//                 {
//                   backgroundColor:
//                     themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.05)'
//                       : 'rgba(0, 0, 0, 0.05)',
//                 },
//               ]}
//               onPress={() => {
//                 setShowAddForm(false);
//                 setNewParty({ name: '', businessName: '', email: '', mobile: '' });
//               }}
//             >
//               <Text
//                 style={[
//                   styles.cancelButtonText,
//                   { color: theme.colors.textSecondary },
//                 ]}
//               >
//                 Cancel
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.formButton,
//                 styles.submitButton,
//                 { backgroundColor: theme.colors.primary },
//               ]}
//               onPress={handleAddParty}
//               disabled={addPartyMutation.isPending}
//             >
//               <Text style={styles.submitButtonText}>
//                 {addPartyMutation.isPending
//                   ? `Adding ${contactType.toLowerCase()}...`
//                   : `Add ${contactType.charAt(0) + contactType.slice(1).toLowerCase()}`}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Animated.View>
//     );

//     const renderEmptyState = () => (
//       <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
//         <View
//           style={[
//             styles.emptyIconContainer,
//             { backgroundColor: `${theme.colors.textSecondary}15` },
//           ]}
//         >
//           <Building2 size={32} color={theme.colors.textSecondary} />
//         </View>
//         <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
//           {searchQuery
//             ? `No ${contactType.toLowerCase()}s found`
//             : `No ${contactType.toLowerCase()}s available`}
//         </Text>
//         <Text
//           style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
//         >
//           {searchQuery
//             ? 'Try adjusting your search terms'
//             : `Add your first ${contactType.toLowerCase()} to get started`}
//         </Text>
//       </Animated.View>
//     );

//     const renderLoadingState = () => (
//       <Animated.View entering={FadeIn} style={styles.loadingState}>
//         <View
//           style={[
//             styles.loadingIconContainer,
//             { backgroundColor: `${theme.colors.primary}15` },
//           ]}
//         >
//           <Building2 size={24} color={theme.colors.primary} />
//         </View>
//         <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
//           Loading {contactType.toLowerCase()}s...
//         </Text>
//       </Animated.View>
//     );

//     const renderErrorState = () => (
//       <Animated.View entering={FadeIn} style={styles.errorState}>
//         <Text style={[styles.errorText, { color: '#EF4444' }]}>
//           Failed to load {contactType.toLowerCase()}s
//         </Text>
//         <TouchableOpacity
//           style={[
//             styles.retryButton,
//             { backgroundColor: `${theme.colors.primary}15` },
//           ]}
//           onPress={() => {
//             setCurrentPage(1);
//             setAllParties([]);
//             refetch();
//           }}
//         >
//           <Text style={[styles.retryText, { color: theme.colors.primary }]}>
//             Retry
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     );

//     const renderFooter = () => (
//       <BlurView
//         intensity={themeType === 'dark' ? 15 : 80}
//         tint={themeType}
//         style={[
//           styles.footer,
//           {
//             paddingBottom: insets.bottom + 16,
//             borderTopColor:
//               themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.08)'
//                 : 'rgba(0, 0, 0, 0.06)',
//           },
//         ]}
//       >
//         <TouchableOpacity
//           style={[
//             styles.addButton,
//             { backgroundColor: `${theme.colors.primary}15` },
//           ]}
//           onPress={() => setShowAddForm(true)}
//         >
//           <Plus size={16} color={theme.colors.primary} />
//           <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
//             Add New {contactType.charAt(0) + contactType.slice(1).toLowerCase()}
//           </Text>
//         </TouchableOpacity>
//       </BlurView>
//     );

//     return (
//       <Modal
//         visible={visible}
//         animationType="none"
//         transparent
//         statusBarTranslucent
//         onRequestClose={() => {
//           setShowAddForm(false);
//           setNewParty({ name: '', businessName: '', email: '', mobile: '' });
//           onClose();
//         }}
//       >
//         <Animated.View
//           entering={FadeIn.duration(200)}
//           exiting={FadeOut.duration(200)}
//           style={styles.overlay}
//         >
//           <TouchableOpacity
//             style={styles.backdrop}
//             activeOpacity={1}
//             onPress={() => {
//               setShowAddForm(false);
//               setNewParty({ name: '', businessName: '', email: '', mobile: '' });
//               onClose();
//             }}
//           />

//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.keyboardAvoidingView}
//           >
//             <Animated.View
//               entering={SlideInDown.duration(300)}
//               exiting={SlideOutDown.duration(250)}
//               style={[
//                 styles.modalContainer,
//                 {
//                   backgroundColor: theme.colors.background,
//                 },
//               ]}
//             >
//               {renderHeader()}

//               <View style={styles.content}>
//                 {showAddForm ? (
//                   renderAddPartyForm()
//                 ) : isLoading && currentPage === 1 ? (
//                   renderLoadingState()
//                 ) : error ? (
//                   renderErrorState()
//                 ) : filteredParties.length === 0 ? (
//                   renderEmptyState()
//                 ) : (
//                   <FlatList
//                     data={filteredParties}
//                     renderItem={renderPartyItem}
//                     keyExtractor={(item) => item.id}
//                     contentContainerStyle={styles.listContainer}
//                     showsVerticalScrollIndicator={false}
//                     ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
//                     ListFooterComponent={renderLoadMoreButton}
//                     onEndReached={loadMoreParties}
//                     onEndReachedThreshold={0.3}
//                   />
//                 )}
//               </View>

//               {!showAddForm && renderFooter()}
//             </Animated.View>
//           </KeyboardAvoidingView>
//         </Animated.View>
//       </Modal>
//     );
//   };

//   const styles = StyleSheet.create({
//     overlay: {
//       flex: 1,
//       justifyContent: 'flex-end',
//     },
//     backdrop: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     keyboardAvoidingView: {
//       flex: 1,
//       justifyContent: 'flex-end',
//     },
//     modalContainer: {
//       borderTopLeftRadius: 24,
//       borderTopRightRadius: 24,
//       overflow: 'hidden',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: -4,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 12,
//       elevation: 8,
//       maxHeight: '85%',
//       minHeight: '60%',
//     },
//     header: {
//       borderBottomWidth: 1,
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerGradient: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//     },
//     headerContent: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 20,
//       paddingBottom: 12,
//       position: 'relative',
//       zIndex: 2,
//     },
//     headerTitleContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 8,
//     },
//     headerTitle: {
//       fontSize: 18,
//       fontWeight: '700',
//       letterSpacing: -0.2,
//     },
//     closeButton: {
//       width: 32,
//       height: 32,
//       borderRadius: 16,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     searchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginHorizontal: 20,
//       marginBottom: 12,
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       borderRadius: 12,
//       borderWidth: 1,
//       gap: 8,
//       position: 'relative',
//       zIndex: 2,
//     },
//     searchInput: {
//       flex: 1,
//       fontSize: 15,
//       fontWeight: '500',
//     },
//     content: {
//       flex: 1,
//       minHeight: 200,
//     },
//     listContainer: {
//       padding: 20,
//     },
//     partyItem: {
//       borderRadius: 12,
//       borderWidth: 1,
//       padding: 16,
//     },
//     partyItemContent: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     partyInfo: {
//       flex: 1,
//     },
//     nameContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 8,
//       gap: 8,
//     },
//     partyName: {
//       fontSize: 15,
//       fontWeight: '600',
//       letterSpacing: -0.1,
//     },
//     statusDot: {
//       width: 6,
//       height: 6,
//       borderRadius: 3,
//     },
//     businessContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 6,
//       gap: 6,
//     },
//     iconContainer: {
//       width: 24,
//       height: 24,
//       borderRadius: 12,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     businessName: {
//       fontSize: 13,
//       fontWeight: '500',
//     },
//     phoneContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 6,
//     },
//     partyPhone: {
//       fontSize: 13,
//       fontWeight: '500',
//     },
//     loadMoreButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingVertical: 12,
//       paddingHorizontal: 20,
//       borderRadius: 10,
//       borderWidth: 1,
//       marginTop: 16,
//       gap: 8,
//     },
//     loadMoreText: {
//       fontSize: 14,
//       fontWeight: '600',
//     },
//     addFormContainer: {
//       flex: 1,
//       padding: 20,
//     },
//     formContent: {
//       flex: 1,
//       justifyContent: 'center',
//     },
//     formLabel: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 12,
//     },
//     formInput: {
//       borderWidth: 1,
//       borderRadius: 12,
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       fontSize: 15,
//       fontWeight: '500',
//       marginBottom: 24,
//     },
//     formButtons: {
//       flexDirection: 'row',
//       gap: 12,
//     },
//     formButton: {
//       flex: 1,
//       paddingVertical: 12,
//       borderRadius: 12,
//       alignItems: 'center',
//     },
//     cancelButton: {
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.1)',
//     },
//     submitButton: {
//       // backgroundColor set dynamically
//     },
//     cancelButtonText: {
//       fontSize: 14,
//       fontWeight: '600',
//     },
//     submitButtonText: {
//       fontSize: 14,
//       fontWeight: '600',
//       color: '#FFFFFF',
//     },
//     emptyState: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 40,
//     },
//     emptyIconContainer: {
//       width: 64,
//       height: 64,
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 16,
//     },
//     emptyTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 8,
//       textAlign: 'center',
//     },
//     emptySubtitle: {
//       fontSize: 14,
//       textAlign: 'center',
//       lineHeight: 20,
//     },
//     loadingState: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     loadingIconContainer: {
//       width: 48,
//       height: 48,
//       borderRadius: 16,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 12,
//     },
//     loadingText: {
//       fontSize: 14,
//       fontWeight: '500',
//     },
//     errorState: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 40,
//     },
//     errorText: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 16,
//       textAlign: 'center',
//     },
//     retryButton: {
//       paddingHorizontal: 20,
//       paddingVertical: 10,
//       borderRadius: 8,
//     },
//     retryText: {
//       fontSize: 14,
//       fontWeight: '600',
//     },
//     footer: {
//       borderTopWidth: 1,
//       paddingHorizontal: 20,
//       paddingTop: 16,
//     },
//     addButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingVertical: 12,
//       paddingHorizontal: 16,
//       borderRadius: 10,
//       gap: 8,
//     },
//     addButtonText: {
//       fontSize: 14,
//       fontWeight: '600',
//     },
//   });

//   export default PartySelectionModal;

import { useTheme } from '@/context/ThemeContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Building2, Search, X } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
import { apiClient } from '@/services/api';
import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';

// Types
interface ContactLedger {
  id: string;
  name: string;
  totalAmount: string;
  openingBalance: string;
}

interface Contact {
  id: string;
  name: string;
  ledger: ContactLedger;
}

interface PartySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectParty: (party: any) => void;
  selectedPartyId?: string;
  contactType: 'CUSTOMER' | 'SUPPLIER';
}

const PartySelectionModal: React.FC<PartySelectionModalProps> = ({
  visible,
  onClose,
  onSelectParty,
  selectedPartyId,
  contactType,
}) => {
  const { theme, themeType }: any = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [allParties, setAllParties] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get adminId and branchId from Redux
  const adminId = useSelector((state: any) => state.auth?.user?.id);
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  // Query for fetching parties
  const {
    data: partiesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.PARTIES, contactType, currentPage, searchQuery],
    queryFn: async () => {
      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : '';
      return await apiClient.get(
        `${API.PARTIES}?order=ASC&page=${currentPage}&take=10&adminId=${adminId}&branchId=${branchId}&contactType=${contactType}${searchParam}`
      );
    },
    enabled: visible,
    select: (res: any) => res?.data,
  });

  // Update parties list when data changes
  useEffect(() => {
    if (partiesResponse?.data?.rows) {
      if (currentPage === 1) {
        setAllParties(partiesResponse.data.rows);
      } else {
        setAllParties((prev) => [...prev, ...partiesResponse.data.rows]);
      }
      setHasMoreData(partiesResponse.meta?.hasNextPage || false);
      setIsLoadingMore(false);
    }
  }, [partiesResponse, currentPage]);

  // Reset pagination when search query or contactType changes
  useEffect(() => {
    setCurrentPage(1);
    setAllParties([]);
    setHasMoreData(true);
  }, [searchQuery, contactType]);

  const filteredParties = searchQuery
    ? allParties.filter((party: Contact) =>
        party.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allParties;

  const handleSelectParty = (party: Contact) => {
    onSelectParty(party);
    onClose();
    setSearchQuery('');
  };

  const loadMoreParties = () => {
    if (hasMoreData && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPartyItem = ({ item }: { item: Contact }) => {
    const isSelected = selectedPartyId === item.id;
    const outstandingAmount = parseFloat(item.ledger.totalAmount || '0');
    const hasOutstanding = outstandingAmount > 0;

    return (
      <Animated.View entering={FadeIn.delay(50)}>
        <TouchableOpacity
          style={[
            styles.partyItem,
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
          onPress={() => handleSelectParty(item)}
          activeOpacity={0.7}
        >
          <View style={styles.partyItemContent}>
            <View style={styles.partyInfo}>
              <View style={styles.nameContainer}>
                <Text
                  style={[
                    styles.partyName,
                    {
                      color: isSelected ? theme.colors.primary : theme.colors.text,
                    },
                  ]}
                >
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: hasOutstanding
                        ? contactType === 'CUSTOMER'
                          ? theme.colors.success
                          : theme.colors.error
                        : theme.colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
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
        onPress={loadMoreParties}
        disabled={isLoadingMore || isLoading}
      >
        {isLoadingMore ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <Building2 size={16} color={theme.colors.primary} />
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
          <Building2 size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Select {contactType.charAt(0) + contactType.slice(1).toLowerCase()}
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
          onPress={onClose}
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
          placeholder="Search by name"
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
        <Building2 size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery
          ? `No ${contactType.toLowerCase()}s found`
          : `No ${contactType.toLowerCase()}s available`}
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        {searchQuery ? 'Try adjusting your search terms' : 'No parties available'}
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
        <Building2 size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading {contactType.toLowerCase()}s...
      </Text>
    </Animated.View>
  );

  const renderErrorState = () => (
    <Animated.View entering={FadeIn} style={styles.errorState}>
      <Text style={[styles.errorText, { color: '#EF4444' }]}>
        Failed to load {contactType.toLowerCase()}s
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => {
          setCurrentPage(1);
          setAllParties([]);
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
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

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
            ) : filteredParties.length === 0 ? (
              renderEmptyState()
            ) : (
              <FlatList
                data={filteredParties}
                renderItem={renderPartyItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListFooterComponent={renderLoadMoreButton}
                onEndReached={loadMoreParties}
                onEndReachedThreshold={0.3}
              />
            )}
          </View>
        </Animated.View>
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
  partyItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    justifyContent: 'center',
  },
  partyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  partyName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
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

export default PartySelectionModal;