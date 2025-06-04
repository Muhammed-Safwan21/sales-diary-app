// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Platform,
//   KeyboardAvoidingView,
//   TouchableOpacity,
// } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   Mail,
//   FileText,
//   MapPin,
//   Globe,
//   Hash,
//   Save,
//   UserPlus,
// } from 'lucide-react-native';

// export default function AddCustomerScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     gstNumber: '',
//     address: '',
//     state: '',
//     pincode: '',
//   });

//   const updateField = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const renderFormInput = (
//     label: string,
//     value: string,
//     onChangeText: (text: string) => void,
//     placeholder: string,
//     icon: React.ReactNode,
//     keyboardType: any = 'default',
//     autoCapitalize: any = 'words',
//     multiline = false
//   ) => (
//     <Animated.View entering={FadeInUp.delay(100).springify()}>
//       <View style={styles.formGroup}>
//         <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
//           {label}
//         </Text>
//         <View
//           style={[
//             styles.inputContainer,
//             multiline && styles.textAreaContainer,
//             {
//               backgroundColor:
//                 themeType === 'dark'
//                   ? 'rgba(255, 255, 255, 0.05)'
//                   : 'rgba(255, 255, 255, 0.8)',
//               borderColor:
//                 themeType === 'dark'
//                   ? 'rgba(255, 255, 255, 0.08)'
//                   : 'rgba(0, 0, 0, 0.06)',
//             },
//           ]}
//         >
//           <View style={styles.inputIcon}>{icon}</View>
//           <TextInput
//             style={[
//               styles.textInput,
//               multiline && styles.textArea,
//               { color: theme.colors.text },
//             ]}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder}
//             placeholderTextColor={theme.colors.textSecondary}
//             keyboardType={keyboardType}
//             autoCapitalize={autoCapitalize}
//             multiline={multiline}
//             numberOfLines={multiline ? 4 : 1}
//             textAlignVertical={multiline ? 'top' : 'center'}
//           />
//         </View>
//       </View>
//     </Animated.View>
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
//             >
//               <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
//             </TouchableOpacity>

//             <View style={styles.headerTitleContainer}>
//               <UserPlus size={20} color="#FFFFFF" />
//               <Text style={styles.headerTitle}>Add Customer</Text>
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
//           {/* Personal Information Section */}
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
//                 <User size={18} color={theme.colors.primary} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Personal Information
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'Customer Name *',
//                 formData.name,
//                 (text) => updateField('name', text),
//                 'Enter customer name',
//                 <User size={18} color={theme.colors.textSecondary} />
//               )}

//               {renderFormInput(
//                 'Phone Number *',
//                 formData.phone,
//                 (text) => updateField('phone', text),
//                 'Enter phone number',
//                 <Phone size={18} color={theme.colors.textSecondary} />,
//                 'phone-pad',
//                 'none'
//               )}

//               {renderFormInput(
//                 'Email Address',
//                 formData.email,
//                 (text) => updateField('email', text),
//                 'Enter email address (optional)',
//                 <Mail size={18} color={theme.colors.textSecondary} />,
//                 'email-address',
//                 'none'
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
//                 'GST Number',
//                 formData.gstNumber,
//                 (text) => updateField('gstNumber', text),
//                 'Enter GST number (optional)',
//                 <Hash size={18} color={theme.colors.textSecondary} />,
//                 'default',
//                 'characters'
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
//                 'Complete Address',
//                 formData.address,
//                 (text) => updateField('address', text),
//                 'Enter complete address (optional)',
//                 <MapPin size={18} color={theme.colors.textSecondary} />,
//                 'default',
//                 'sentences',
//                 true
//               )}

//               <View style={styles.formRow}>
//                 <Animated.View
//                   entering={FadeInDown.delay(50).springify()}
//                   style={[styles.formGroup, { flex: 1, marginRight: 8 }]}
//                 >
//                   <Text
//                     style={[
//                       styles.label,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     State
//                   </Text>
//                   <View
//                     style={[
//                       styles.inputContainer,
//                       {
//                         backgroundColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.05)'
//                             : 'rgba(255, 255, 255, 0.8)',
//                         borderColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.08)'
//                             : 'rgba(0, 0, 0, 0.06)',
//                       },
//                     ]}
//                   >
//                     <View style={styles.inputIcon}>
//                       <Globe size={18} color={theme.colors.textSecondary} />
//                     </View>
//                     <TextInput
//                       style={[styles.textInput, { color: theme.colors.text }]}
//                       value={formData.state}
//                       onChangeText={(text) => updateField('state', text)}
//                       placeholder="Enter state"
//                       placeholderTextColor={theme.colors.textSecondary}
//                     />
//                   </View>
//                 </Animated.View>

//                 <Animated.View
//                   entering={FadeInDown.delay(100).springify()}
//                   style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}
//                 >
//                   <Text
//                     style={[
//                       styles.label,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     Pincode
//                   </Text>
//                   <View
//                     style={[
//                       styles.inputContainer,
//                       {
//                         backgroundColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.05)'
//                             : 'rgba(255, 255, 255, 0.8)',
//                         borderColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.08)'
//                             : 'rgba(0, 0, 0, 0.06)',
//                       },
//                     ]}
//                   >
//                     <View style={styles.inputIcon}>
//                       <Hash size={18} color={theme.colors.textSecondary} />
//                     </View>
//                     <TextInput
//                       style={[styles.textInput, { color: theme.colors.text }]}
//                       value={formData.pincode}
//                       onChangeText={(text) => updateField('pincode', text)}
//                       placeholder="Enter pincode"
//                       placeholderTextColor={theme.colors.textSecondary}
//                       keyboardType="numeric"
//                     />
//                   </View>
//                 </Animated.View>
//               </View>
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
//                 },
//               ]}
//             >
//               <LinearGradient
//                 colors={[
//                   theme.colors.primary,
//                   theme.colors.primaryLight || theme.colors.primary,
//                 ]}
//                 style={styles.saveGradient}
//               >
//                 <Save size={20} color="#FFFFFF" />
//                 <Text style={styles.saveButtonText}>Save Customer</Text>
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
//     marginTop: -30,
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
//   formGroup: {
//     marginBottom: 16,
//   },
//   formRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginBottom: 8,
//     letterSpacing: -0.1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 12,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     height: 48,
//   },
//   textAreaContainer: {
//     height: 100,
//     alignItems: 'flex-start',
//     paddingVertical: 12,
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   textArea: {
//     textAlignVertical: 'top',
//     height: 76,
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
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  Globe,
  Hash,
  Save,
  UserPlus,
  Building,
} from 'lucide-react-native';
import { apiClient } from '@/services/api';
import API from '@/config/api';

export default function AddCustomerScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const datas = useSelector((state: any) => state.auth);
  console.log('datasdatasdatas', datas);
  const [formData, setFormData] = useState({
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
    openingBalanceType: 'CREDIT',
  });

  // Create customer mutation
  const { mutate: createCustomer, isPending } = useMutation({
    mutationFn: async (customerData: any) => {
      console.log('Creating customer with data:', customerData);
      const response = await apiClient.post(API.PARTIES, customerData);
      console.log('Customer creation response:', response);
      return response.data;
    },
    onMutate: () => {
      // Optional: Set loading state if you have one in Redux
    },
    onSuccess: (data) => {
      console.log('Customer created successfully:', data);

      Alert.alert('Success', 'Customer added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Customer creation error:', error);

      let errorMessage = 'Failed to add customer. Please try again.';

      // Handle specific error cases
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    },
    onSettled: () => {
      // Optional: Clear loading state
    },
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCustomer = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Customer name is required');
      return;
    }

    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }

    // Validate email format if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    // Prepare data for API
    const customerPayload: any = {
      name: formData.name.trim(),
      businessName: formData.businessName.trim() || undefined,
      email: formData.email.trim() || undefined,
      mobile: formData.phone.replace(/\D/g, ''), // Remove non-digits
      phone: formData.phone.replace(/\D/g, ''),
      address: formData.address.trim() || undefined,
      city: formData.city.trim() || undefined,
      state: formData.state.trim() || undefined,
      country: formData.country.trim() || 'India',
      pincode: formData.pincode.trim() || undefined,
      gstin: formData.gstNumber.trim() || undefined,
      pan: formData.pan.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      openingBalance: parseFloat(formData.openingBalance) || 0,
      openingBalanceType: formData.openingBalanceType,
      contactType: 'CUSTOMER',
      // You might need to get these from your auth state
      adminId: 1, // Replace with actual admin ID
      branchId: 1, // Replace with actual branch ID
    };

    // Remove undefined fields
    Object.keys(customerPayload).forEach(
      (key) => customerPayload[key] === undefined && delete customerPayload[key]
    );

    console.log('Submitting customer data:', customerPayload);
    createCustomer(customerPayload);
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    autoCapitalize: any = 'words',
    multiline = false,
    required = false
  ) => (
    <Animated.View entering={FadeInUp.delay(100).springify()}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}{' '}
          {required && <Text style={{ color: theme.colors.error }}>*</Text>}
        </Text>
        <View
          style={[
            styles.inputContainer,
            multiline && styles.textAreaContainer,
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
          <View style={styles.inputIcon}>{icon}</View>
          <TextInput
            style={[
              styles.textInput,
              multiline && styles.textArea,
              { color: theme.colors.text },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            textAlignVertical={multiline ? 'top' : 'center'}
            editable={!isPending}
          />
        </View>
      </View>
    </Animated.View>
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
              <UserPlus size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add Customer</Text>
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
          {/* Personal Information Section */}
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
                <User size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Personal Information
                </Text>
              </View>

              {renderFormInput(
                'Customer Name',
                formData.name,
                (text) => updateField('name', text),
                'Enter customer name',
                <User size={18} color={theme.colors.textSecondary} />,
                'default',
                'words',
                false,
                true
              )}

              {renderFormInput(
                'Business Name',
                formData.businessName,
                (text) => updateField('businessName', text),
                'Enter business name (optional)',
                <Building size={18} color={theme.colors.textSecondary} />
              )}

              {renderFormInput(
                'Phone Number',
                formData.phone,
                (text) => updateField('phone', text),
                'Enter phone number',
                <Phone size={18} color={theme.colors.textSecondary} />,
                'phone-pad',
                'none',
                false,
                true
              )}

              {renderFormInput(
                'Email Address',
                formData.email,
                (text) => updateField('email', text),
                'Enter email address (optional)',
                <Mail size={18} color={theme.colors.textSecondary} />,
                'email-address',
                'none'
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
                'GST Number',
                formData.gstNumber,
                (text) => updateField('gstNumber', text),
                'Enter GST number (optional)',
                <Hash size={18} color={theme.colors.textSecondary} />,
                'default',
                'characters'
              )}

              {renderFormInput(
                'PAN Number',
                formData.pan,
                (text) => updateField('pan', text),
                'Enter PAN number (optional)',
                <FileText size={18} color={theme.colors.textSecondary} />,
                'default',
                'characters'
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
                'Complete Address',
                formData.address,
                (text) => updateField('address', text),
                'Enter complete address (optional)',
                <MapPin size={18} color={theme.colors.textSecondary} />,
                'default',
                'sentences',
                true
              )}

              <View style={styles.formRow}>
                <Animated.View
                  entering={FadeInDown.delay(50).springify()}
                  style={[styles.formGroup, { flex: 1, marginRight: 8 }]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    City
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
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
                    <View style={styles.inputIcon}>
                      <Building size={18} color={theme.colors.textSecondary} />
                    </View>
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={formData.city}
                      onChangeText={(text) => updateField('city', text)}
                      placeholder="Enter city"
                      placeholderTextColor={theme.colors.textSecondary}
                      editable={!isPending}
                    />
                  </View>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(100).springify()}
                  style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    State
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
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
                    <View style={styles.inputIcon}>
                      <Globe size={18} color={theme.colors.textSecondary} />
                    </View>
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={formData.state}
                      onChangeText={(text) => updateField('state', text)}
                      placeholder="Enter state"
                      placeholderTextColor={theme.colors.textSecondary}
                      editable={!isPending}
                    />
                  </View>
                </Animated.View>
              </View>

              <View style={styles.formRow}>
                <Animated.View
                  entering={FadeInDown.delay(150).springify()}
                  style={[styles.formGroup, { flex: 1, marginRight: 8 }]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Pincode
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
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
                    <View style={styles.inputIcon}>
                      <Hash size={18} color={theme.colors.textSecondary} />
                    </View>
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={formData.pincode}
                      onChangeText={(text) => updateField('pincode', text)}
                      placeholder="Enter pincode"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      editable={!isPending}
                    />
                  </View>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).springify()}
                  style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Country
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
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
                    <View style={styles.inputIcon}>
                      <Globe size={18} color={theme.colors.textSecondary} />
                    </View>
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={formData.country}
                      onChangeText={(text) => updateField('country', text)}
                      placeholder="Enter country"
                      placeholderTextColor={theme.colors.textSecondary}
                      editable={!isPending}
                    />
                  </View>
                </Animated.View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Information Section */}
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
                <FileText size={18} color={theme.colors.warning} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'Notes',
                formData.notes,
                (text) => updateField('notes', text),
                'Add any notes about the customer (optional)',
                <FileText size={18} color={theme.colors.textSecondary} />,
                'default',
                'sentences',
                true
              )}

              {renderFormInput(
                'Opening Balance',
                formData.openingBalance,
                (text) => updateField('openingBalance', text),
                'Enter opening balance (0 if none)',
                <Hash size={18} color={theme.colors.textSecondary} />,
                'numeric'
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
              onPress={handleSaveCustomer}
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
                    <Text style={styles.saveButtonText}>Save Customer</Text>
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
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  textArea: {
    textAlignVertical: 'top',
    height: 76,
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
