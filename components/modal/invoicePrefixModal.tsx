import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Hash, Save, X, Eye } from 'lucide-react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InvoicePrefixModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialValues?: {
    invoiceType?: string;
    prefix?: string;
    startNumber?: string;
  };
}

export const InvoicePrefixModal: React.FC<InvoicePrefixModalProps> = ({
  visible,
  onClose,
  onSave,
  initialValues = {},
}) => {
  const { theme, themeType }: any = useTheme();
  const modalStyles = getModalStyles(themeType, theme);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Extended invoice types for horizontal scrolling
  const invoiceTypes = [
    {
      id: 'standard',
      label: 'Standard',
      icon: '📄',
      description: 'Regular invoice',
    },
    { id: 'gst', label: 'GST', icon: '🧾', description: 'GST compliant' },
    {
      id: 'proforma',
      label: 'Proforma',
      icon: '📋',
      description: 'Preliminary bill',
    },
    {
      id: 'tax',
      label: 'Tax Invoice',
      icon: '💰',
      description: 'With tax details',
    },
    {
      id: 'receipt',
      label: 'Receipt',
      icon: '🧾',
      description: 'Payment receipt',
    },
    {
      id: 'estimate',
      label: 'Estimate',
      icon: '📊',
      description: 'Cost estimate',
    },
    {
      id: 'quotation',
      label: 'Quotation',
      icon: '💼',
      description: 'Price quote',
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      invoiceType: initialValues.invoiceType || 'standard',
      prefix: initialValues.prefix || '',
      startNumber: initialValues.startNumber || '',
    },
  });

  const prefix = watch('prefix');
  const startNumber = watch('startNumber');
  const invoiceType = watch('invoiceType');

  React.useEffect(() => {
    if (visible) {
      setValue('invoiceType', initialValues.invoiceType || 'standard');
      setValue('prefix', initialValues.prefix || '');
      setValue('startNumber', initialValues.startNumber || '');

      // Reset animations
      scaleValue.setValue(0.8);
      fadeValue.setValue(0);
      translateY.setValue(50);

      // Animate in
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    visible,
    initialValues.invoiceType,
    initialValues.prefix,
    initialValues.startNumber,
    setValue,
    scaleValue,
    fadeValue,
    translateY,
  ]);

  const generatePreview = React.useMemo(() => {
    const prefixValue = prefix || 'INV-';
    const startNumberValue = startNumber || '1001';
    return `${prefixValue}${startNumberValue}`;
  }, [prefix, startNumber]);

  const selectedType = invoiceTypes.find((type) => type.id === invoiceType);

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    keyboardType: any = 'default',
    error?: string,
    required: boolean = false
  ) => (
    <View style={modalStyles.formGroup}>
      <Text style={[modalStyles.label, { color: theme.colors.textSecondary }]}>
        {label}
        {required && <Text style={{ color: theme.colors.error || '#EF4444' }}> *</Text>}
      </Text>
      <View
        style={[
          modalStyles.inputContainer,
          {
            backgroundColor:
              themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
            borderColor: error
              ? theme.colors.error || '#EF4444'
              : themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
            borderWidth: error ? 2 : 1,
          },
        ]}
      >
        <TextInput
          style={[modalStyles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
        />
      </View>
      {error && (
        <Text style={[modalStyles.errorText, { color: theme.colors.error || '#EF4444' }]}>
          {error}
        </Text>
      )}
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={modalStyles.keyboardAvoidingView}
      >
        <Animated.View style={[modalStyles.overlay, { opacity: fadeValue }]}>
          <TouchableOpacity
            style={modalStyles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />
          <Animated.View
            style={[
              modalStyles.modalContainer,
              {
                transform: [{ scale: scaleValue }, { translateY: translateY }],
              },
            ]}
          >
            {/* Enhanced Header with Gradient - close button on right */}
            <LinearGradient
              colors={
                themeType === 'dark'
                  ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
                  : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={modalStyles.headerGradient}
            >
              <View style={modalStyles.header}>
                <View style={modalStyles.headerLeftSpacer} />
                <View style={modalStyles.headerTitleContainer}>
                  <Hash size={20} color="#FFFFFF" />
                  <Text style={modalStyles.headerTitle}>Invoice Settings</Text>
                </View>
                <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
                  <X size={20} color="rgba(255, 255, 255, 0.9)" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <ScrollView
              style={modalStyles.content}
              contentContainerStyle={modalStyles.contentContainer}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {/* Invoice Type Selection */}
              <BlurView 
                intensity={themeType === 'dark' ? 15 : 80} 
                tint={themeType} 
                style={modalStyles.section}
              >
                <View style={modalStyles.sectionHeader}>
                  <Hash size={18} color={theme.colors.primary} />
                  <Text style={[modalStyles.sectionTitle, { color: theme.colors.text }]}>
                    Invoice Type
                  </Text>
                </View>

                <Controller
                  control={control}
                  name="invoiceType"
                  render={({ field: { onChange, value } }) => (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={modalStyles.typeScrollContainer}
                      contentContainerStyle={modalStyles.typeScrollContent}
                    >
                      {invoiceTypes.map((type, index) => (
                        <TouchableOpacity
                          key={type.id}
                          style={[
                            modalStyles.typeCard,
                            {
                              backgroundColor:
                                value === type.id
                                  ? theme.colors.primary
                                  : themeType === 'dark'
                                  ? 'rgba(255, 255, 255, 0.08)'
                                  : 'rgba(255, 255, 255, 0.9)',
                              borderColor:
                                value === type.id
                                  ? theme.colors.primary
                                  : themeType === 'dark'
                                  ? 'rgba(255, 255, 255, 0.15)'
                                  : 'rgba(0, 0, 0, 0.08)',
                              marginLeft: index === 0 ? 0 : 12,
                            },
                          ]}
                          onPress={() => onChange(type.id)}
                        >
                          <Text
                            style={[
                              modalStyles.typeLabel,
                              {
                                color:
                                  value === type.id
                                    ? '#FFFFFF'
                                    : theme.colors.text,
                              },
                            ]}
                          >
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                />
              </BlurView>

              {/* Input Fields */}
              <BlurView 
                intensity={themeType === 'dark' ? 15 : 80} 
                tint={themeType} 
                style={modalStyles.section}
              >
                <View style={modalStyles.sectionHeader}>
                  <Hash size={18} color={theme.colors.primary} />
                  <Text style={[modalStyles.sectionTitle, { color: theme.colors.text }]}>
                    Numbering Configuration
                  </Text>
                </View>
                
                <View style={modalStyles.inputRow}>
                  <View style={modalStyles.inputGroup}>
                    <Controller
                      control={control}
                      name="prefix"
                      rules={{ required: 'Prefix is required' }}
                      render={({ field: { onChange, onBlur, value } }) =>
                        renderFormInput(
                          'Prefix',
                          value,
                          onChange,
                          'INV-',
                          'default',
                          errors.prefix?.message,
                          true
                        )
                      }
                    />
                  </View>

                  <View style={modalStyles.inputGroup}>
                    <Controller
                      control={control}
                      name="startNumber"
                      rules={{ required: 'Start number is required' }}
                      render={({ field: { onChange, onBlur, value } }) =>
                        renderFormInput(
                          'Start Number',
                          value,
                          onChange,
                          '1001',
                          'numeric',
                          errors.startNumber?.message,
                          true
                        )
                      }
                    />
                  </View>
                </View>
              </BlurView>
            </ScrollView>

            {/* Footer with Save Button - matching staff form */}
            <BlurView 
              intensity={themeType === 'dark' ? 20 : 80} 
              tint={themeType} 
              style={modalStyles.footer}
            >
              <View style={modalStyles.footerContent}>
                <TouchableOpacity
                  style={[
                    modalStyles.cancelButton,
                    {
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.05)',
                      borderColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(0, 0, 0, 0.1)',
                    },
                  ]}
                  onPress={onClose}
                >
                  <X size={18} color={theme.colors.textSecondary} />
                  <Text style={[modalStyles.cancelButtonText, { color: theme.colors.textSecondary }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalStyles.saveButton}
                  onPress={handleSubmit(onSave)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                    style={modalStyles.saveGradient}
                  >
                    <Save size={18} color="#FFFFFF" />
                    <Text style={modalStyles.saveButtonText}>Submit</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

function getModalStyles(themeType: string, theme: any) {
  return StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    backdrop: {
      flex: 1,
    },
    modalContainer: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 12,
      backgroundColor:
        theme.colors.background ||
        (themeType === 'dark' ? '#18181B' : '#FFFFFF'),
      maxHeight: SCREEN_HEIGHT * 0.9,
      minHeight: SCREEN_HEIGHT * 0.7,
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
      paddingVertical: 8,
    },
    headerLeftSpacer: {
      width: 40,
    },
    closeButton: {
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
    },
    contentContainer: {
      paddingHorizontal: 20,
    },
    section: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    previewCard: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: themeType === 'dark' 
        ? 'rgba(255, 255, 255, 0.03)' 
        : 'rgba(255, 255, 255, 0.5)',
      borderWidth: 1,
      borderColor: themeType === 'dark' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.05)',
    },
    previewLabel: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    previewText: {
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: -0.3,
      marginBottom: 4,
    },
    previewDescription: {
      fontSize: 12,
      fontWeight: '500',
      opacity: 0.8,
    },
    typeScrollContainer: {
      marginHorizontal: -4,
    },
    typeScrollContent: {
      paddingHorizontal: 4,
      paddingVertical: 4,
    },
    typeCard: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      alignItems: 'center',
      minWidth: 100,
      justifyContent: 'center',
    },
    typeLabel: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 16,
    },
    inputGroup: {
      flex: 1,
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 8
    },
    textInput: {
      flex: 1,
      fontSize: 15,
      fontWeight: '500',
      minHeight: 20,
    },
    errorText: {
      fontSize: 12,
      marginTop: 6,
      marginLeft: 4,
      fontWeight: '500',
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
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingTop: 24,
      gap: 16,
    },
    cancelButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      borderWidth: 1,
      gap: 10,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    saveButton: {
      flex: 2,
      borderRadius: 16,
      overflow: 'hidden',
    },
    saveGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
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
}