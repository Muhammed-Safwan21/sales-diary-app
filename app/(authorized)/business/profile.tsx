// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

// interface BusinessProfile {
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
//   gstin: string;
//   logo?: string;
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     gstin: '',
//     logo: undefined,
//   });

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to upload a logo!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });

//     if (!result.canceled) {
//       setBusinessProfile({ ...businessProfile, logo: result.assets[0].uri });
//     }
//   };

//   const handleProfileUpdate = () => {
//     // TODO: Implement profile update logic
//     console.log('Profile updated:', businessProfile);
//   };

//   const handleCloseFinancialYear = () => {
//     // TODO: Implement financial year closing logic
//     console.log('Closing financial year');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Business Profile</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Business Information</Text>
        
//         <View style={styles.logoSection}>
//           <TouchableOpacity style={styles.logoContainer} onPress={pickImage}>
//             {businessProfile.logo ? (
//               <Image source={{ uri: businessProfile.logo }} style={styles.logoImage} />
//             ) : (
//               <View style={styles.logoPlaceholder}>
//                 <Ionicons name="business" size={40} color="#666" />
//                 <Text style={styles.logoPlaceholderText}>Add Logo</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//           <Text style={styles.logoHint}>Tap to upload business logo</Text>
//         </View>

//         <View style={styles.form}>
//           <Text style={styles.label}>Business Name</Text>
//           <TextInput
//             style={styles.input}
//             value={businessProfile.name}
//             onChangeText={(text) => setBusinessProfile({ ...businessProfile, name: text })}
//             placeholder="Enter business name"
//           />

//           <Text style={styles.label}>Address</Text>
//           <TextInput
//             style={styles.input}
//             value={businessProfile.address}
//             onChangeText={(text) => setBusinessProfile({ ...businessProfile, address: text })}
//             placeholder="Enter business address"
//             multiline
//           />

//           <Text style={styles.label}>Phone</Text>
//           <TextInput
//             style={styles.input}
//             value={businessProfile.phone}
//             onChangeText={(text) => setBusinessProfile({ ...businessProfile, phone: text })}
//             placeholder="Enter phone number"
//             keyboardType="phone-pad"
//           />

//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={businessProfile.email}
//             onChangeText={(text) => setBusinessProfile({ ...businessProfile, email: text })}
//             placeholder="Enter email address"
//             keyboardType="email-address"
//           />

//           <Text style={styles.label}>GSTIN</Text>
//           <TextInput
//             style={styles.input}
//             value={businessProfile.gstin}
//             onChangeText={(text) => setBusinessProfile({ ...businessProfile, gstin: text })}
//             placeholder="Enter GSTIN"
//           />

//           <TouchableOpacity style={styles.updateButton} onPress={handleProfileUpdate}>
//             <Text style={styles.buttonText}>Update Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Financial Year</Text>
//         {/* <View style={styles.financialYearCard}> */}
//           <Text style={styles.financialYearText}>
//             Current Financial Year: 2023-2024
//           </Text>
//           <TouchableOpacity 
//             style={styles.closeYearButton}
//             onPress={handleCloseFinancialYear}
//           >
//             <Text style={styles.closeYearButtonText}>Close Financial Year</Text>
//           </TouchableOpacity>
//         {/* </View> */}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 36,
//     paddingBottom: 16,
//     paddingHorizontal:16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   section: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   form: {
//     gap: 12,
//   },
//   label: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   updateButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   financialYearCard: {
//     backgroundColor: '#f8f9fa',
//     padding: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   financialYearText: {
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   closeYearButton: {
//     backgroundColor: '#dc3545',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   closeYearButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   logoSection: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//     overflow: 'hidden',
//   },
//   logoImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   logoPlaceholder: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoPlaceholderText: {
//     marginTop: 8,
//     color: '#666',
//     fontSize: 14,
//   },
//   logoHint: {
//     marginTop: 8,
//     color: '#666',
//     fontSize: 12,
//   },
// }); 

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import {
  ArrowLeft,
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Camera,
  Edit3,
  Save,
  Calendar,
  TrendingUp,
  Sparkles,
  Shield,
  Award,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface BusinessProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  logo?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { theme, themeType }: any = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: 'TechCorp Solutions',
    address: '123 Business District, Tech Park, Bangalore - 560001',
    phone: '+91 98765 43210',
    email: 'info@techcorp.com',
    gstin: '29ABCDE1234F1Z5',
    logo: undefined,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload a logo!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setBusinessProfile({ ...businessProfile, logo: result.assets[0].uri });
    }
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    console.log('Profile updated:', businessProfile);
  };

  const handleCloseFinancialYear = () => {
    console.log('Closing financial year');
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    multiline = false,
    keyboardType: any = 'default'
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      </View>
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.8)',
          borderColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
        }
      ]}>
        <TextInput
          style={[
            styles.textInput,
            multiline && styles.multilineInput,
            { color: theme.colors.text }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          editable={isEditing}
          multiline={multiline}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      {/* Ultra-modern header with gradient */}
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
              <User size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Business Profile</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Edit3 size={18} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
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
          {/* Business Logo Section */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.logoSection}>
              <LinearGradient
                colors={[
                  `${theme.colors.primary}12`,
                  `${theme.colors.primary}06`,
                  'transparent'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradientOverlay}
              />
              
              <View style={styles.logoContent}>
                <TouchableOpacity 
                  style={[
                    styles.logoContainer,
                    {
                      borderColor: `${theme.colors.primary}30`,
                      backgroundColor: themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.6)',
                    }
                  ]}
                  onPress={pickImage}
                  disabled={!isEditing}
                >
                  {businessProfile.logo ? (
                    <Image source={{ uri: businessProfile.logo }} style={styles.logoImage} />
                  ) : (
                    <View style={styles.logoPlaceholder}>
                      <LinearGradient
                        colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                        style={styles.logoIconContainer}
                      >
                        <Building2 size={32} color="#FFFFFF" />
                      </LinearGradient>
                    </View>
                  )}
                  
                  {isEditing && (
                    <View style={[
                      styles.cameraOverlay,
                      { backgroundColor: `${theme.colors.primary}90` }
                    ]}>
                      <Camera size={20} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
                
                <Text style={[styles.logoHint, { color: theme.colors.textSecondary }]}>
                  {isEditing ? 'Tap to change logo' : 'Business Logo'}
                </Text>
                
                <View style={styles.businessNameContainer}>
                  <Text style={[styles.businessName, { color: theme.colors.text }]}>
                    {businessProfile.name || 'Your Business Name'}
                  </Text>
                  <View style={[
                    styles.verifiedBadge,
                    { backgroundColor: `${theme.colors.success}15` }
                  ]}>
                    <Shield size={12} color={theme.colors.success} />
                    <Text style={[styles.verifiedText, { color: theme.colors.success }]}>
                      Verified
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Business Information */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Building2 size={18} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Business Information
                </Text>
                {isEditing && (
                  <View style={[
                    styles.editingIndicator,
                    { backgroundColor: `${theme.colors.accent}15` }
                  ]}>
                    <Sparkles size={12} color={theme.colors.accent} />
                    <Text style={[styles.editingText, { color: theme.colors.accent }]}>
                      Editing
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.form}>
                {renderFormInput(
                  'Business Name',
                  businessProfile.name,
                  (text) => setBusinessProfile({ ...businessProfile, name: text }),
                  'Enter your business name',
                  <Building2 size={16} color={theme.colors.primary} />
                )}

                {renderFormInput(
                  'Business Address',
                  businessProfile.address,
                  (text) => setBusinessProfile({ ...businessProfile, address: text }),
                  'Enter your complete business address',
                  <MapPin size={16} color={theme.colors.secondary} />,
                  true
                )}

                {renderFormInput(
                  'Phone Number',
                  businessProfile.phone,
                  (text) => setBusinessProfile({ ...businessProfile, phone: text }),
                  'Enter phone number',
                  <Phone size={16} color={theme.colors.accent} />,
                  false,
                  'phone-pad'
                )}

                {renderFormInput(
                  'Email Address',
                  businessProfile.email,
                  (text) => setBusinessProfile({ ...businessProfile, email: text }),
                  'Enter email address',
                  <Mail size={16} color={theme.colors.primary} />,
                  false,
                  'email-address'
                )}

                {renderFormInput(
                  'GSTIN',
                  businessProfile.gstin,
                  (text) => setBusinessProfile({ ...businessProfile, gstin: text }),
                  'Enter GST Identification Number',
                  <FileText size={16} color={theme.colors.secondary} />
                )}

                {isEditing && (
                  <TouchableOpacity 
                    style={[
                      styles.updateButton,
                      { 
                        backgroundColor: theme.colors.primary,
                        shadowColor: theme.colors.primary,
                      }
                    ]}
                    onPress={handleProfileUpdate}
                  >
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                      style={styles.updateGradient}
                    >
                      <Save size={20} color="#FFFFFF" />
                      <Text style={styles.updateButtonText}>Save Changes</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </BlurView>
          </Animated.View>

          {/* Financial Year Section */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <LinearGradient
                colors={[
                  `${theme.colors.accent}10`,
                  `${theme.colors.accent}05`,
                  'transparent'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.financialGradientOverlay}
              />
              
              <View style={styles.sectionHeader}>
                <Calendar size={18} color={theme.colors.accent} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Financial Year
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: `${theme.colors.success}15` }
                ]}>
                  <Award size={12} color={theme.colors.success} />
                  <Text style={[styles.statusText, { color: theme.colors.success }]}>
                    Active
                  </Text>
                </View>
              </View>

              <View style={styles.financialContent}>
                <View style={styles.financialRow}>
                  <View style={styles.financialInfo}>
                    <Text style={[styles.financialLabel, { color: theme.colors.textSecondary }]}>
                      Current Financial Year
                    </Text>
                    <Text style={[styles.financialValue, { color: theme.colors.text }]}>
                      2024-2025
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.financialStats,
                    {
                      backgroundColor: themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.6)',
                      borderColor: themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(0, 0, 0, 0.04)',
                    }
                  ]}>
                    <TrendingUp size={16} color={theme.colors.primary} />
                    <Text style={[styles.statsText, { color: theme.colors.text }]}>
                      8 months active
                    </Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={[
                    styles.closeYearButton,
                    {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                    }
                  ]}
                  onPress={handleCloseFinancialYear}
                >
                  <Calendar size={16} color="#EF4444" />
                  <Text style={styles.closeYearButtonText}>
                    Close Financial Year
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>
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
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 40,
  },
  logoSection: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  logoGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  logoHint: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
  },
  businessNameContainer: {
    alignItems: 'center',
    gap: 8,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
  },
  editingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  editingText: {
    fontSize: 11,
    fontWeight: '600',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    fontSize: 15,
    fontWeight: '500',
    minHeight: 20,
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  updateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
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
  updateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  financialGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  financialContent: {
    position: 'relative',
    zIndex: 2,
    gap: 20,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  financialInfo: {
    flex: 1,
  },
  financialLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  financialStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  statsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  closeYearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  closeYearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});