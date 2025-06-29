import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
  Users,
  Edit3,
} from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Form data interface
interface ContactFormData {
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
  openingBalanceType: 'CREDIT' | 'DEBIT';
}

// Validation rules
const validationRules = {
  name: {
    required: 'Contact name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
  phone: {
    required: 'Phone number is required',
    // pattern: {
    //   value: /^[0-9]{10}$/,
    //   message: 'Please enter a valid 10-digit phone number',
    // },
  },
  email: {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  gstNumber: {
    // pattern: {
    //   value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    //   message: 'Please enter a valid GST number (15 characters)',
    // },
  },
  pan: {
    // pattern: {
    //   value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    //   message: 'Please enter a valid PAN number (10 characters)',
    // },
  },
  pincode: {
    // pattern: {
    //   value: /^[0-9]{6}$/,
    //   message: 'Please enter a valid 6-digit pincode',
    // },
  },
  openingBalance: {
    pattern: {
      value: /^\d*\.?\d*$/,
      message: 'Please enter a valid amount',
    },
  },
};

// Contact type display names
const contactTypeNames: any = {
  CUSTOMER: 'Customer',
  SUPPLIER: 'Supplier',
};

export default function ContactFormScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams();

  // Extract params
  const contactType = (params.contactType as string) || 'CUSTOMER';
  const contactId = params.id as string;
  const isEditing = !!contactId;

  const { branchInfo, financialYear, user } = useSelector(
    (state: any) => state.auth
  );

  // Fetch contact data for editing
  const { data: contactData, isLoading: isLoadingContact } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: async () => {
      if (!contactId) return null;
      const response = await apiClient.get(`/contacts/${contactId}`);
      return response.data;
    },
    enabled: isEditing,
  });

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
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
      openingBalance: '0'
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && contactData?.data) {
       const intitalContactData = contactData?.data
      reset({
        name: intitalContactData.name || '',
        businessName: intitalContactData.businessName || '',
        phone: intitalContactData?.mobile,
        email: intitalContactData.email || '',
        gstNumber: intitalContactData.gstin || '',
        address: intitalContactData.address || '',
        state: intitalContactData.state || '',
        pincode: intitalContactData.pincode || '',
        city: intitalContactData.city || '',
        country: intitalContactData.country || 'India',
        pan: intitalContactData.pan || '',
        notes: intitalContactData.notes || '',
        openingBalance: intitalContactData.openingBalance?.toString() || '0'
      });
    }
  }, [contactData, isEditing, reset]);

  // Create/Update contact mutation
  const { mutate: saveContact, isPending } = useMutation({
    mutationFn: async (contactData: any) => {
      console.log(
        `${isEditing ? 'Updating' : 'Creating'} contact with data:`,
        contactData
      );

      if (isEditing) {
        const response = await apiClient.patch(
          `/contacts/${contactId}`,
          contactData
        );
        console.log('Contact update response:', response);
        return response.data;
      } else {
        const response = await apiClient.post('/contacts', contactData);
        console.log('Contact creation response:', response);
        return response.data;
      }
    },
    onSuccess: (data) => {
      console.log(
        `Contact ${isEditing ? 'updated' : 'created'} successfully:`,
        data
      );
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['contact', contactId] });
      }

      const successMessage = isEditing
        ? `${contactTypeNames[contactType]} updated successfully!`
        : `${contactTypeNames[contactType]} added successfully!`;

      Alert.alert('Success', successMessage, [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error(
        `Contact ${isEditing ? 'update' : 'creation'} error:`,
        error
      );
      let errorMessage = `Failed to ${
        isEditing ? 'update' : 'add'
      } ${contactTypeNames[contactType].toLowerCase()}. Please try again.`;

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
  const onSubmit = (data: ContactFormData) => {
    const cleanPhone = data.phone.replace(/\D/g, '');

    // Prepare data for API
    const contactPayload: any = {
      name: data.name.trim(),
      contactType: contactType,
      mobile: `+91 ${cleanPhone}`,
      phone: `+91 ${cleanPhone}`,
      openingBalance: parseFloat(data.openingBalance) || 0,
      openingBalanceType: data.openingBalanceType,

      // Required fields from Redux state (only for creation)
      ...(!isEditing && {
        adminId: Number(user?.id) || parseInt(user?.adminId) || 1,
        branchId: Number(branchInfo?.id) || parseInt(branchInfo?.branchId) || 1,
        financialYearId:
          Number(financialYear?.id) ||
          parseInt(financialYear?.financialYearId) ||
          1,
      }),
    };

    // Add optional fields
    contactPayload.businessName = data.businessName.trim() || '';
    contactPayload.email = data.email.trim() || '';
    contactPayload.address = data.address.trim() || '';
    contactPayload.city = data.city.trim() || '';
    contactPayload.state = data.state.trim() || '';
    contactPayload.country = data.country.trim() || 'India';
    contactPayload.pincode = data.pincode.trim() || '';
    contactPayload.notes = data.notes.trim() || '';

    // Business information
    if (data.gstNumber.trim()) {
      contactPayload.gstin = data.gstNumber.trim().toUpperCase();
    }

    if (data.pan.trim()) {
      contactPayload.pan = data.pan.trim().toUpperCase();
    }

    // Add image field as empty string (from API requirement)
    contactPayload.image = '';

    saveContact(contactPayload);
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
    name: keyof ContactFormData,
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
        {label} {required && <Text style={{ color: '#EF4444' }}>*</Text>}
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
                    : `${theme.colors.primary}15`,
                },
              ]}
            >
              {React.cloneElement(
                icon as React.ReactElement,
                {
                  color: errors[name] ? '#EF4444' : theme.colors.primary,
                } as any
              )}
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
              editable={!isPending && !isLoadingContact}
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

  // Get contact type icon
  const getContactTypeIcon = () => {
    switch (contactType) {
      case 'VENDOR':
      case 'SUPPLIER':
        return <Users size={20} color="#FFFFFF" />;
      case 'CLIENT':
        return <Building size={20} color="#FFFFFF" />;
      default:
        return <UserPlus size={20} color="#FFFFFF" />;
    }
  };

  // Show loading state when fetching contact data
  if (isEditing && isLoadingContact) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading contact...
        </Text>
      </View>
    );
  }

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
              {isEditing ? (
                <Edit3 size={20} color="#FFFFFF" />
              ) : (
                getContactTypeIcon()
              )}
              <Text style={styles.headerTitle}>
                {isEditing ? 'Edit' : 'Add'} {contactTypeNames[contactType]}
              </Text>
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
                'name',
                `${contactTypeNames[contactType]} Name`,
                `Enter ${contactTypeNames[contactType].toLowerCase()} name`,
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
                'Enter business name',
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
                'Enter email address',
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
                'Enter GST number',
                <Hash size={18} />,
                'default',
                'characters',
                false,
                false,
                // { pattern: validationRules.gstNumber.pattern }
              )}

              {renderFormInput(
                'pan',
                'PAN Number',
                'Enter PAN number',
                <FileText size={18} />,
                'default',
                'characters',
                false,
                false,
                // { pattern: validationRules.pan.pattern }
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
                    'City',
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
                    'State',
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
                    'Pin',
                    <Hash size={18} />,
                    'numeric',
                    'none',
                    false,
                    false,
                    // { pattern: validationRules.pincode.pattern }
                  )}
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).springify()}
                  style={[styles.halfWidth, { marginLeft: 8 }]}
                >
                  {renderFormInput(
                    'country',
                    'Country',
                    'Country',
                    <Globe size={18} />
                  )}
                </Animated.View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Financial Information Section */}
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

              {renderFormInput(
                'notes',
                'Notes',
                `Add any notes about the ${contactTypeNames[
                  contactType
                ].toLowerCase()} (optional)`,
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
                    <Text style={styles.saveButtonText}>
                      {isEditing ? 'Updating...' : 'Saving...'}
                    </Text>
                  </View>
                ) : (
                  <>
                    <Save size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>
                      {isEditing ? 'Update' : 'Save'}{' '}
                      {contactTypeNames[contactType]}
                    </Text>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerGradient: {
    // paddingBottom: 20==,
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});
