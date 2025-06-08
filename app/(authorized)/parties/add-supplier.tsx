// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
// // import { useTheme } from '@/context/ThemeContext';
// // import { HeaderBar } from '@/components/shared/HeaderBar';
// // import { Button } from '@/components/shared/Button';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useRouter } from 'expo-router';

// // export default function AddSupplierScreen() {
// //   const { theme } = useTheme();
// //   const router = useRouter();
  
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     gstNumber: '',
// //     address: '',
// //     state: '',
// //     pincode: '',
// //     bankName: '',
// //     accountNumber: '',
// //     ifscCode: '',
// //   });

// //   const updateField = (field: string, value: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={styles.keyboardAvoid}
// //       >
// //         <HeaderBar 
// //           title="Add Supplier" 
// //           showBack
// //         />
        
// //         <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
// //           <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Supplier Name*</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter supplier name"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 value={formData.name}
// //                 onChangeText={(text) => updateField('name', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Phone Number*</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter phone number"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 keyboardType="phone-pad"
// //                 value={formData.phone}
// //                 onChangeText={(text) => updateField('phone', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Email (Optional)</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter email address"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //                 value={formData.email}
// //                 onChangeText={(text) => updateField('email', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>GST Number (Optional)</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter GST number"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 autoCapitalize="characters"
// //                 value={formData.gstNumber}
// //                 onChangeText={(text) => updateField('gstNumber', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Address (Optional)</Text>
// //               <TextInput
// //                 style={[styles.input, styles.textArea, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter complete address"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 multiline
// //                 numberOfLines={4}
// //                 value={formData.address}
// //                 onChangeText={(text) => updateField('address', text)}
// //               />
// //             </View>

// //             <View style={styles.formRow}>
// //               <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
// //                 <Text style={[styles.label, { color: theme.colors.textLight }]}>State</Text>
// //                 <TextInput
// //                   style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                   placeholder="Enter state"
// //                   placeholderTextColor={theme.colors.textLight}
// //                   value={formData.state}
// //                   onChangeText={(text) => updateField('state', text)}
// //                 />
// //               </View>

// //               <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
// //                 <Text style={[styles.label, { color: theme.colors.textLight }]}>Pincode</Text>
// //                 <TextInput
// //                   style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                   placeholder="Enter pincode"
// //                   placeholderTextColor={theme.colors.textLight}
// //                   keyboardType="numeric"
// //                   value={formData.pincode}
// //                   onChangeText={(text) => updateField('pincode', text)}
// //                 />
// //               </View>
// //             </View>

// //             <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 16, marginBottom: 16 }]}>Bank Details (Optional)</Text>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Bank Name</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter bank name"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 value={formData.bankName}
// //                 onChangeText={(text) => updateField('bankName', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>Account Number</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter account number"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 keyboardType="numeric"
// //                 value={formData.accountNumber}
// //                 onChangeText={(text) => updateField('accountNumber', text)}
// //               />
// //             </View>

// //             <View style={styles.formGroup}>
// //               <Text style={[styles.label, { color: theme.colors.textLight }]}>IFSC Code</Text>
// //               <TextInput
// //                 style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
// //                 placeholder="Enter IFSC code"
// //                 placeholderTextColor={theme.colors.textLight}
// //                 autoCapitalize="characters"
// //                 value={formData.ifscCode}
// //                 onChangeText={(text) => updateField('ifscCode', text)}
// //               />
// //             </View>
// //           </View>
// //         </ScrollView>

// //         <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
// //           <Button 
// //             title="Save Supplier" 
// //             onPress={() => {}}
// //             fullWidth
// //           />
// //         </View>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   keyboardAvoid: {
// //     flex: 1,
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   scrollContent: {
// //     padding: 16,
// //     paddingBottom: Platform.OS === 'ios' ? 100 : 80,
// //   },
// //   card: {
// //     borderRadius: 12,
// //     padding: 16,
// //     borderWidth: 1,
// //   },
// //   formGroup: {
// //     marginBottom: 16,
// //   },
// //   formRow: {
// //     flexDirection: 'row',
// //     marginBottom: 16,
// //   },
// //   label: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// //   input: {
// //     height: 48,
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     paddingHorizontal: 12,
// //     fontSize: 16,
// //   },
// //   textArea: {
// //     height: 100,
// //     paddingTop: 12,
// //     textAlignVertical: 'top',
// //   },
// //   footer: {
// //     padding: 16,
// //     borderTopWidth: 1,
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //   },
// // });


// import { useTheme } from '@/context/ThemeContext';
// import { apiClient } from '@/services/api';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import {
//   AlertCircle,
//   ArrowLeft,
//   Building,
//   FileText,
//   Globe,
//   Hash,
//   Mail,
//   MapPin,
//   Phone,
//   Save,
//   User,
//   UserPlus,
//   CreditCard,
//   Building2,
// } from 'lucide-react-native';
// import React from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';

// // Form data interface
// interface SupplierFormData {
//   name: string;
//   businessName: string;
//   phone: string;
//   email: string;
//   gstNumber: string;
//   address: string;
//   state: string;
//   pincode: string;
//   city: string;
//   country: string;
//   pan: string;
//   notes: string;
//   openingBalance: string;
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// // Validation rules
// const validationRules = {
//   name: {
//     required: 'Supplier name is required',
//     minLength: {
//       value: 2,
//       message: 'Name must be at least 2 characters',
//     },
//   },
//   phone: {
//     required: 'Phone number is required',
//     pattern: {
//       value: /^[0-9]{10}$/,
//       message: 'Please enter a valid 10-digit phone number',
//     },
//   },
//   email: {
//     pattern: {
//       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: 'Please enter a valid email address',
//     },
//   },
//   gstNumber: {
//     pattern: {
//       value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
//       message: 'Please enter a valid GST number (15 characters)',
//     },
//   },
//   pan: {
//     pattern: {
//       value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//       message: 'Please enter a valid PAN number (10 characters)',
//     },
//   },
//   pincode: {
//     pattern: {
//       value: /^[0-9]{6}$/,
//       message: 'Please enter a valid 6-digit pincode',
//     },
//   },
//   openingBalance: {
//     pattern: {
//       value: /^\d*\.?\d*$/,
//       message: 'Please enter a valid amount',
//     },
//   },
//   accountNumber: {
//     pattern: {
//       value: /^[0-9]{9,18}$/,
//       message: 'Please enter a valid account number (9-18 digits)',
//     },
//   },
//   ifscCode: {
//     pattern: {
//       value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
//       message: 'Please enter a valid IFSC code (e.g., SBIN0001234)',
//     },
//   },
// };

// export default function AddSupplierScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const { branchInfo, financialYear, user } = useSelector((state: any) => state.auth);

//   // React Hook Form setup
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<SupplierFormData>({
//     mode: 'onBlur',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       name: '',
//       businessName: '',
//       phone: '',
//       email: '',
//       gstNumber: '',
//       address: '',
//       state: '',
//       pincode: '',
//       city: '',
//       country: 'India',
//       pan: '',
//       notes: '',
//       openingBalance: '0',
//       bankName: '',
//       accountNumber: '',
//       ifscCode: '',
//     },
//   });

//   // Create supplier mutation
//   const { mutate: createSupplier, isPending } = useMutation({
//     mutationFn: async (supplierData: any) => {
//       console.log('Creating supplier with data:', supplierData);
//       const response = await apiClient.post('/contacts', supplierData);
//       console.log('Supplier creation response:', response);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       console.log('Supplier created successfully:', data);
//       queryClient.invalidateQueries({ queryKey: ['suppliers'] });
//       queryClient.invalidateQueries({ queryKey: ['contacts'] });

//       Alert.alert('Success', 'Supplier added successfully!', [
//         {
//           text: 'OK',
//           onPress: () => router.back(),
//         },
//       ]);
//     },
//     onError: (error: any) => {
//       console.error('Supplier creation error:', error);
//       let errorMessage = 'Failed to add supplier. Please try again.';

//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       Alert.alert('Error', errorMessage);
//     },
//   });

//   // Form submission handler
//   const onSubmit = (data: SupplierFormData) => {
//     const cleanPhone = data.phone.replace(/\D/g, '');

//     // Prepare data for API - matching the customer structure but for supplier
//     const supplierPayload: any = {
//       name: data.name.trim(),
//       contactType: 'SUPPLIER', // Different from customer
//       mobile: `+91 ${cleanPhone}`,
//       phone: `+91 ${cleanPhone}`,
//       openingBalance: parseFloat(data.openingBalance) || 0,
//       openingBalanceType: 'CREDIT', // For suppliers, we typically owe them (CREDIT)
      
//       // Required fields from Redux state
//       adminId: Number(user?.id) || parseInt(user?.adminId) || 1,
//       branchId: Number(branchInfo?.id) || parseInt(branchInfo?.branchId) || 1,
//       financialYearId: Number(financialYear?.id) || parseInt(financialYear?.financialYearId) || 1,
//     };

//     // Add optional fields - include empty strings to match API expectations
//     supplierPayload.businessName = data.businessName.trim() || '';
//     supplierPayload.email = data.email.trim() || '';
//     supplierPayload.address = data.address.trim() || '';
//     supplierPayload.city = data.city.trim() || '';
//     supplierPayload.state = data.state.trim() || '';
//     supplierPayload.country = data.country.trim() || 'India';
//     supplierPayload.pincode = data.pincode.trim() || '';
//     supplierPayload.notes = data.notes.trim() || '';
    
//     // Business information
//     if (data.gstNumber.trim()) {
//       supplierPayload.gstin = data.gstNumber.trim().toUpperCase();
//     }
    
//     if (data.pan.trim()) {
//       supplierPayload.pan = data.pan.trim().toUpperCase();
//     }

//     // Bank details (add to notes if provided since API doesn't have dedicated bank fields)
//     let bankDetails = '';
//     if (data.bankName.trim() || data.accountNumber.trim() || data.ifscCode.trim()) {
//       bankDetails = '\n\nBank Details:\n';
//       if (data.bankName.trim()) bankDetails += `Bank: ${data.bankName.trim()}\n`;
//       if (data.accountNumber.trim()) bankDetails += `Account: ${data.accountNumber.trim()}\n`;
//       if (data.ifscCode.trim()) bankDetails += `IFSC: ${data.ifscCode.trim().toUpperCase()}\n`;
//     }

//     if (bankDetails) {
//       supplierPayload.notes = (supplierPayload.notes + bankDetails).trim();
//     }

//     // Add image field as empty string
//     supplierPayload.image = '';

//     console.log('Submitting supplier data:', supplierPayload);
//     createSupplier(supplierPayload);
//   };

//   // Get input border style based on error state
//   const getInputBorderStyle = (hasError: boolean) => ({
//     borderColor: hasError 
//       ? '#EF4444' 
//       : themeType === 'dark'
//         ? 'rgba(255, 255, 255, 0.08)'
//         : 'rgba(0, 0, 0, 0.06)',
//     borderWidth: hasError ? 1.5 : 1,
//   });

//   const renderFormInput = (
//     name: keyof SupplierFormData,
//     label: string,
//     placeholder: string,
//     icon: React.ReactNode,
//     keyboardType: any = 'default',
//     autoCapitalize: any = 'words',
//     multiline = false,
//     required = false,
//     rules?: any
//   ) => (
//     <View style={styles.inputGroup}>
//       <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
//         {label}{' '}
//         {required && <Text style={{ color: '#EF4444' }}>*</Text>}
//       </Text>
//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <View
//             style={[
//               styles.inputContainer,
//               multiline && styles.textAreaContainer,
//               {
//                 backgroundColor:
//                   themeType === 'dark'
//                     ? 'rgba(255, 255, 255, 0.05)'
//                     : 'rgba(255, 255, 255, 0.8)',
//               },
//               getInputBorderStyle(!!errors[name]),
//             ]}
//           >
//             <View
//               style={[
//                 styles.inputIconContainer,
//                 { 
//                   backgroundColor: errors[name] 
//                     ? 'rgba(239, 68, 68, 0.15)' 
//                     : `${theme.colors.primary}15` 
//                 },
//               ]}
//             >
//               {React.cloneElement(icon as React.ReactElement, {
//                 color: errors[name] ? '#EF4444' : theme.colors.primary,
//               } as any)}
//             </View>
//             <TextInput
//               style={[
//                 styles.input,
//                 multiline && styles.textArea,
//                 { color: theme.colors.text },
//               ]}
//               value={value}
//               onChangeText={onChange}
//               onBlur={onBlur}
//               placeholder={placeholder}
//               placeholderTextColor={theme.colors.textSecondary}
//               keyboardType={keyboardType}
//               autoCapitalize={autoCapitalize}
//               multiline={multiline}
//               numberOfLines={multiline ? 4 : 1}
//               textAlignVertical={multiline ? 'top' : 'center'}
//               editable={!isPending}
//               returnKeyType={multiline ? 'default' : 'next'}
//             />
//             {errors[name] && (
//               <AlertCircle size={18} color="#EF4444" style={styles.errorIcon} />
//             )}
//           </View>
//         )}
//       />
//       {errors[name] && (
//         <Animated.View entering={FadeInDown.duration(200)}>
//           <Text style={styles.errorText}>{errors[name]?.message}</Text>
//         </Animated.View>
//       )}
//     </View>
//   );

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

//       {/* Modern header with gradient */}
//       <LinearGradient
//         colors={
//           themeType === 'dark'
//             ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
//             : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
//         }
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => router.back()}
//               disabled={isPending}
//             >
//               <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
//             </TouchableOpacity>

//             <View style={styles.headerTitleContainer}>
//               <Building2 size={20} color="#FFFFFF" />
//               <Text style={styles.headerTitle}>Add Supplier</Text>
//             </View>

//             <View style={styles.placeholder} />
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Supplier Information Section */}
//           <Animated.View entering={FadeInUp.delay(100)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.primary}08`,
//                   `${theme.colors.primary}04`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.sectionGradientOverlay}
//               />

//               <View style={styles.sectionHeader}>
//                 <Building2 size={18} color={theme.colors.primary} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Supplier Information
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'name',
//                 'Supplier Name',
//                 'Enter supplier name',
//                 <User size={18} />,
//                 'default',
//                 'words',
//                 false,
//                 true,
//                 validationRules.name
//               )}

//               {renderFormInput(
//                 'businessName',
//                 'Business Name',
//                 'Enter business name (optional)',
//                 <Building size={18} />
//               )}

//               {renderFormInput(
//                 'phone',
//                 'Phone Number',
//                 'Enter 10-digit phone number',
//                 <Phone size={18} />,
//                 'phone-pad',
//                 'none',
//                 false,
//                 true,
//                 validationRules.phone
//               )}

//               {renderFormInput(
//                 'email',
//                 'Email Address',
//                 'Enter email address (optional)',
//                 <Mail size={18} />,
//                 'email-address',
//                 'none',
//                 false,
//                 false,
//                 { pattern: validationRules.email.pattern }
//               )}
//             </BlurView>
//           </Animated.View>

//           {/* Business Information Section */}
//           <Animated.View entering={FadeInUp.delay(200)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.accent}08`,
//                   `${theme.colors.accent}04`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.sectionGradientOverlay}
//               />

//               <View style={styles.sectionHeader}>
//                 <FileText size={18} color={theme.colors.accent} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Business Information
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'gstNumber',
//                 'GST Number',
//                 'Enter GST number (15 characters)',
//                 <Hash size={18} />,
//                 'default',
//                 'characters',
//                 false,
//                 false,
//                 { pattern: validationRules.gstNumber.pattern }
//               )}

//               {renderFormInput(
//                 'pan',
//                 'PAN Number',
//                 'Enter PAN number (10 characters)',
//                 <FileText size={18} />,
//                 'default',
//                 'characters',
//                 false,
//                 false,
//                 { pattern: validationRules.pan.pattern }
//               )}
//             </BlurView>
//           </Animated.View>

//           {/* Address Information Section */}
//           <Animated.View entering={FadeInUp.delay(300)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.success}08`,
//                   `${theme.colors.success}04`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.sectionGradientOverlay}
//               />

//               <View style={styles.sectionHeader}>
//                 <MapPin size={18} color={theme.colors.success} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Address Information
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'address',
//                 'Complete Address',
//                 'Enter complete address (optional)',
//                 <MapPin size={18} />,
//                 'default',
//                 'sentences',
//                 true
//               )}

//               <View style={styles.formRow}>
//                 <Animated.View
//                   entering={FadeInDown.delay(50).springify()}
//                   style={[styles.halfWidth, { marginRight: 8 }]}
//                 >
//                   {renderFormInput(
//                     'city',
//                     'City',
//                     'Enter city',
//                     <Building size={18} />
//                   )}
//                 </Animated.View>

//                 <Animated.View
//                   entering={FadeInDown.delay(100).springify()}
//                   style={[styles.halfWidth, { marginLeft: 8 }]}
//                 >
//                   {renderFormInput(
//                     'state',
//                     'State',
//                     'Enter state',
//                     <Globe size={18} />
//                   )}
//                 </Animated.View>
//               </View>

//               <View style={styles.formRow}>
//                 <Animated.View
//                   entering={FadeInDown.delay(150).springify()}
//                   style={[styles.halfWidth, { marginRight: 8 }]}
//                 >
//                   {renderFormInput(
//                     'pincode',
//                     'Pincode',
//                     'Enter 6-digit pincode',
//                     <Hash size={18} />,
//                     'numeric',
//                     'none',
//                     false,
//                     false,
//                     { pattern: validationRules.pincode.pattern }
//                   )}
//                 </Animated.View>

//                 <Animated.View
//                   entering={FadeInDown.delay(200).springify()}
//                   style={[styles.halfWidth, { marginLeft: 8 }]}
//                 >
//                   {renderFormInput(
//                     'country',
//                     'Country',
//                     'Enter country',
//                     <Globe size={18} />
//                   )}
//                 </Animated.View>
//               </View>
//             </BlurView>
//           </Animated.View>

//           {/* Bank Details Section */}
//           <Animated.View entering={FadeInUp.delay(400)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.warning}08`,
//                   `${theme.colors.warning}04`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.sectionGradientOverlay}
//               />

//               <View style={styles.sectionHeader}>
//                 <CreditCard size={18} color={theme.colors.warning} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Bank Details
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'bankName',
//                 'Bank Name',
//                 'Enter bank name (optional)',
//                 <Building size={18} />
//               )}

//               {renderFormInput(
//                 'accountNumber',
//                 'Account Number',
//                 'Enter account number (optional)',
//                 <Hash size={18} />,
//                 'numeric',
//                 'none',
//                 false,
//                 false,
//                 { pattern: validationRules.accountNumber.pattern }
//               )}

//               {renderFormInput(
//                 'ifscCode',
//                 'IFSC Code',
//                 'Enter IFSC code (optional)',
//                 <CreditCard size={18} />,
//                 'default',
//                 'characters',
//                 false,
//                 false,
//                 { pattern: validationRules.ifscCode.pattern }
//               )}
//             </BlurView>
//           </Animated.View>

//           {/* Financial Information Section */}
//           <Animated.View entering={FadeInUp.delay(500)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.error}08`,
//                   `${theme.colors.error}04`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.sectionGradientOverlay}
//               />

//               <View style={styles.sectionHeader}>
//                 <FileText size={18} color={theme.colors.error} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Financial Information
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'openingBalance',
//                 'Opening Balance',
//                 'Enter opening balance (0 if none)',
//                 <Hash size={18} />,
//                 'numeric',
//                 'none',
//                 false,
//                 false,
//                 { pattern: validationRules.openingBalance.pattern }
//               )}

//               <View style={styles.inputGroup}>
//                 <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
//                   Opening Balance Type
//                 </Text>
//                 <View style={styles.infoContainer}>
//                   <View style={[
//                     styles.infoBox,
//                     { 
//                       backgroundColor: `${theme.colors.success}20`,
//                       borderColor: theme.colors.success
//                     }
//                   ]}>
//                     <Text style={[
//                       styles.infoText,
//                       { color: theme.colors.success }
//                     ]}>
//                       Set to CREDIT (You owe them)
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {renderFormInput(
//                 'notes',
//                 'Notes',
//                 'Add any notes about the supplier (optional)',
//                 <FileText size={18} />,
//                 'default',
//                 'sentences',
//                 true
//               )}
//             </BlurView>
//           </Animated.View>
//         </ScrollView>

//         {/* Footer Actions */}
//         <BlurView
//           intensity={themeType === 'dark' ? 20 : 80}
//           tint={themeType}
//           style={styles.footer}
//         >
//           <View style={styles.footerContent}>
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 {
//                   backgroundColor: theme.colors.primary,
//                   shadowColor: theme.colors.primary,
//                   opacity: isPending ? 0.7 : 1,
//                 },
//               ]}
//               onPress={handleSubmit(onSubmit)}
//               disabled={isPending}
//             >
//               <LinearGradient
//                 colors={[
//                   theme.colors.primary,
//                   theme.colors.primaryLight || theme.colors.primary,
//                 ]}
//                 style={styles.saveGradient}
//               >
//                 {isPending ? (
//                   <View style={styles.loadingContainer}>
//                     <Text style={styles.saveButtonText}>Saving...</Text>
//                   </View>
//                 ) : (
//                   <>
//                     <Save size={20} color="#FFFFFF" />
//                     <Text style={styles.saveButtonText}>Save Supplier</Text>
//                   </>
//                 )}
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </BlurView>
//       </KeyboardAvoidingView>
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
//   placeholder: {
//     width: 40,
//   },
//   keyboardAvoid: {
//     flex: 1,
//     marginTop: -10,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 120,
//   },
//   section: {
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   sectionGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     position: 'relative',
//     zIndex: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//     marginLeft: 12,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginBottom: 8,
//     letterSpacing: -0.1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 56,
//     gap: 12,
//   },
//   textAreaContainer: {
//     height: 100,
//     alignItems: 'flex-start',
//     paddingVertical: 12,
//   },
//   inputIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   textArea: {
//     textAlignVertical: 'top',
//     height: 76,
//   },
//   errorIcon: {
//     marginLeft: 4,
//   },
//   errorText: {
//     fontSize: 12,
//     color: '#EF4444',
//     marginTop: 6,
//     marginLeft: 4,
//     fontWeight: '500',
//   },
//   formRow: {
//     flexDirection: 'row',
//     marginBottom: 0,
//   },
//   halfWidth: {
//     flex: 1,
//   },
//   infoContainer: {
//     marginTop: 8,
//   },
//   infoBox: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     borderWidth: 1.5,
//     alignItems: 'center',
//   },
//   infoText: {
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   footer: {
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     paddingBottom: Platform.OS === 'ios' ? 34 : 20,
//   },
//   footerContent: {
//     paddingHorizontal: 24,
//     paddingTop: 24,
//   },
//   saveButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.25,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 6,
//       },
//       web: {
//         boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
//       },
//     }),
//   },
//   saveGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
//   },
// });

import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertCircle,
  ArrowLeft,
  Building,
  FileText,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  UserPlus,
  CreditCard,
  Building2,
} from 'lucide-react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Form data interface
interface SupplierFormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  gstNumber: string;
  address: string;
  state: string;
  pincode: string;
  city: string;
  country: string;
  pan: string;
  notes: string;
  openingBalance: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

// Validation rules
const validationRules = {
  name: {
    required: 'Supplier name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Please enter a valid 10-digit phone number',
    },
  },
  email: {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  gstNumber: {
    pattern: {
      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      message: 'Please enter a valid GST number (15 characters)',
    },
  },
  pan: {
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: 'Please enter a valid PAN number (10 characters)',
    },
  },
  pincode: {
    pattern: {
      value: /^[0-9]{6}$/,
      message: 'Please enter a valid 6-digit pincode',
    },
  },
  openingBalance: {
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
  accountNumber: {
    pattern: {
      value: /^[0-9]{9,18}$/,
      message: 'Please enter a valid account number (9-18 digits)',
    },
  },
  ifscCode: {
    pattern: {
      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      message: 'Please enter a valid IFSC code (e.g., SBIN0001234)',
    },
  },
};

export default function AddSupplierScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { branchInfo, financialYear, user } = useSelector((state: any) => state.auth);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SupplierFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      businessName: '',
      phone: '',
      email: '',
      gstNumber: '',
      address: '',
      state: '',
      pincode: '',
      city: '',
      country: 'India',
      pan: '',
      notes: '',
      openingBalance: '0',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
    },
  });

  // Create supplier mutation
  const { mutate: createSupplier, isPending } = useMutation({
    mutationFn: async (supplierData: any) => {
      console.log('Creating supplier with data:', supplierData);
      const response = await apiClient.post('/contacts', supplierData);
      console.log('Supplier creation response:', response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Supplier created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });

      Alert.alert('Success', 'Supplier added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Supplier creation error:', error);
      let errorMessage = 'Failed to add supplier. Please try again.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    },
  });

  // Form submission handler
  const onSubmit = (data: SupplierFormData) => {
    const cleanPhone = data.phone.replace(/\D/g, '');

    // Prepare data for API - matching the customer structure but for supplier
    const supplierPayload: any = {
      name: data.name.trim(),
      contactType: 'SUPPLIER', // Different from customer
      mobile: `+91 ${cleanPhone}`,
      phone: `+91 ${cleanPhone}`,
      openingBalance: parseFloat(data.openingBalance) || 0,
      openingBalanceType: 'CREDIT', // For suppliers, we typically owe them (CREDIT)
      
      // Required fields from Redux state
      adminId: Number(user?.id) || parseInt(user?.adminId) || 1,
      branchId: Number(branchInfo?.id) || parseInt(branchInfo?.branchId) || 1,
      financialYearId: Number(financialYear?.id) || parseInt(financialYear?.financialYearId) || 1,
    };

    // Add optional fields - include empty strings to match API expectations
    supplierPayload.businessName = data.businessName.trim() || '';
    supplierPayload.email = data.email.trim() || '';
    supplierPayload.address = data.address.trim() || '';
    supplierPayload.city = data.city.trim() || '';
    supplierPayload.state = data.state.trim() || '';
    supplierPayload.country = data.country.trim() || 'India';
    supplierPayload.pincode = data.pincode.trim() || '';
    supplierPayload.notes = data.notes.trim() || '';
    
    // Business information
    if (data.gstNumber.trim()) {
      supplierPayload.gstin = data.gstNumber.trim().toUpperCase();
    }
    
    if (data.pan.trim()) {
      supplierPayload.pan = data.pan.trim().toUpperCase();
    }

    // Bank details (add to notes if provided since API doesn't have dedicated bank fields)
    let bankDetails = '';
    if (data.bankName.trim() || data.accountNumber.trim() || data.ifscCode.trim()) {
      bankDetails = '\n\nBank Details:\n';
      if (data.bankName.trim()) bankDetails += `Bank: ${data.bankName.trim()}\n`;
      if (data.accountNumber.trim()) bankDetails += `Account: ${data.accountNumber.trim()}\n`;
      if (data.ifscCode.trim()) bankDetails += `IFSC: ${data.ifscCode.trim().toUpperCase()}\n`;
    }

    if (bankDetails) {
      supplierPayload.notes = (supplierPayload.notes + bankDetails).trim();
    }

    // Add image field as empty string
    supplierPayload.image = '';

    console.log('Submitting supplier data:', supplierPayload);
    createSupplier(supplierPayload);
  };

  // Get input border style based on error state
  const getInputBorderStyle = (hasError: boolean) => ({
    borderColor: hasError 
      ? '#EF4444' 
      : themeType === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)',
    borderWidth: hasError ? 1.5 : 1,
  });

  const renderFormInput = (
    name: keyof SupplierFormData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    autoCapitalize: any = 'words',
    multiline = false,
    required = false,
    rules?: any
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
        {label}{' '}
        {required && <Text style={{ color: '#EF4444' }}>*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.inputContainer,
              multiline && styles.textAreaContainer,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
              },
              getInputBorderStyle(!!errors[name]),
            ]}
          >
            <View
              style={[
                styles.inputIconContainer,
                { 
                  backgroundColor: errors[name] 
                    ? 'rgba(239, 68, 68, 0.15)' 
                    : `${theme.colors.primary}15` 
                },
              ]}
            >
              {React.cloneElement(icon as React.ReactElement, {
                color: errors[name] ? '#EF4444' : theme.colors.primary,
              } as any)}
            </View>
            <TextInput
              style={[
                styles.input,
                multiline && styles.textArea,
                { color: theme.colors.text },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
              numberOfLines={multiline ? 4 : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
              editable={!isPending}
              returnKeyType={multiline ? 'default' : 'next'}
            />
            {errors[name] && (
              <AlertCircle size={18} color="#EF4444" style={styles.errorIcon} />
            )}
          </View>
        )}
      />
      {errors[name] && (
        <Animated.View entering={FadeInDown.duration(200)}>
          <Text style={styles.errorText}>{errors[name]?.message}</Text>
        </Animated.View>
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Modern header with gradient */}
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
              disabled={isPending}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Building2 size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add Supplier</Text>
            </View>

            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Supplier Information Section */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.primary}08`,
                  `${theme.colors.primary}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <Building2 size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Supplier Information
                </Text>
              </View>

              {renderFormInput(
                'name',
                'Supplier Name',
                'Enter supplier name',
                <User size={18} />,
                'default',
                'words',
                false,
                true,
                validationRules.name
              )}

              {renderFormInput(
                'businessName',
                'Business Name',
                'Enter business name (optional)',
                <Building size={18} />
              )}

              {renderFormInput(
                'phone',
                'Phone Number',
                'Enter 10-digit phone number',
                <Phone size={18} />,
                'phone-pad',
                'none',
                false,
                true,
                validationRules.phone
              )}

              {renderFormInput(
                'email',
                'Email Address',
                'Enter email address (optional)',
                <Mail size={18} />,
                'email-address',
                'none',
                false,
                false,
                { pattern: validationRules.email.pattern }
              )}
            </BlurView>
          </Animated.View>

          {/* Business Information Section */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.accent}08`,
                  `${theme.colors.accent}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <FileText size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Business Information
                </Text>
              </View>

              {renderFormInput(
                'gstNumber',
                'GST Number',
                'Enter GST number (15 characters)',
                <Hash size={18} />,
                'default',
                'characters',
                false,
                false,
                { pattern: validationRules.gstNumber.pattern }
              )}

              {renderFormInput(
                'pan',
                'PAN Number',
                'Enter PAN number (10 characters)',
                <FileText size={18} />,
                'default',
                'characters',
                false,
                false,
                { pattern: validationRules.pan.pattern }
              )}
            </BlurView>
          </Animated.View>

          {/* Address Information Section */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.success}08`,
                  `${theme.colors.success}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <MapPin size={18} color={theme.colors.success} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Address Information
                </Text>
              </View>

              {renderFormInput(
                'address',
                'Complete Address',
                'Enter complete address (optional)',
                <MapPin size={18} />,
                'default',
                'sentences',
                true
              )}

              <View style={styles.formRow}>
                <Animated.View
                  entering={FadeInDown.delay(50).springify()}
                  style={[styles.halfWidth, { marginRight: 8 }]}
                >
                  {renderFormInput(
                    'city',
                    'City',
                    'Enter city',
                    <Building size={18} />
                  )}
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(100).springify()}
                  style={[styles.halfWidth, { marginLeft: 8 }]}
                >
                  {renderFormInput(
                    'state',
                    'State',
                    'Enter state',
                    <Globe size={18} />
                  )}
                </Animated.View>
              </View>

              <View style={styles.formRow}>
                <Animated.View
                  entering={FadeInDown.delay(150).springify()}
                  style={[styles.halfWidth, { marginRight: 8 }]}
                >
                  {renderFormInput(
                    'pincode',
                    'Pincode',
                    'Enter 6-digit pincode',
                    <Hash size={18} />,
                    'numeric',
                    'none',
                    false,
                    false,
                    { pattern: validationRules.pincode.pattern }
                  )}
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).springify()}
                  style={[styles.halfWidth, { marginLeft: 8 }]}
                >
                  {renderFormInput(
                    'country',
                    'Country',
                    'Enter country',
                    <Globe size={18} />
                  )}
                </Animated.View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Bank Details Section */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.warning}08`,
                  `${theme.colors.warning}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <CreditCard size={18} color={theme.colors.warning} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Bank Details
                </Text>
              </View>

              {renderFormInput(
                'bankName',
                'Bank Name',
                'Enter bank name (optional)',
                <Building size={18} />
              )}

              {renderFormInput(
                'accountNumber',
                'Account Number',
                'Enter account number (optional)',
                <Hash size={18} />,
                'numeric',
                'none',
                false,
                false,
                { pattern: validationRules.accountNumber.pattern }
              )}

              {renderFormInput(
                'ifscCode',
                'IFSC Code',
                'Enter IFSC code (optional)',
                <CreditCard size={18} />,
                'default',
                'characters',
                false,
                false,
                { pattern: validationRules.ifscCode.pattern }
              )}
            </BlurView>
          </Animated.View>

          {/* Financial Information Section */}
          <Animated.View entering={FadeInUp.delay(500)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.error}08`,
                  `${theme.colors.error}04`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionGradientOverlay}
              />

              <View style={styles.sectionHeader}>
                <FileText size={18} color={theme.colors.error} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Financial Information
                </Text>
              </View>

              {renderFormInput(
                'openingBalance',
                'Opening Balance',
                'Enter opening balance (0 if none)',
                <Hash size={18} />,
                'numeric',
                'none',
                false,
                false,
                { pattern: validationRules.openingBalance.pattern }
              )}

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Opening Balance Type
                </Text>
                <View style={styles.infoContainer}>
                  <View style={[
                    styles.infoBox,
                    { 
                      backgroundColor: `${theme.colors.success}20`,
                      borderColor: theme.colors.success
                    }
                  ]}>
                    <Text style={[
                      styles.infoText,
                      { color: theme.colors.success }
                    ]}>
                      Set to CREDIT (You owe them)
                    </Text>
                  </View>
                </View>
              </View>

              {renderFormInput(
                'notes',
                'Notes',
                'Add any notes about the supplier (optional)',
                <FileText size={18} />,
                'default',
                'sentences',
                true
              )}
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer Actions */}
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <View style={styles.footerContent}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                  opacity: isPending ? 0.7 : 1,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.saveGradient}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.saveButtonText}>Saving...</Text>
                  </View>
                ) : (
                  <>
                    <Save size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Supplier</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
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
  placeholder: {
    width: 40,
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: -10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  section: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  sectionGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginLeft: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  textArea: {
    textAlignVertical: 'top',
    height: 76,
  },
  errorIcon: {
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  halfWidth: {
    flex: 1,
  },
  infoContainer: {
    marginTop: 8,
  },
  infoBox: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  footerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});