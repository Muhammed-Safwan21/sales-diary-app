import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { BlurView } from 'expo-blur';
import { Save, X, FileText } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InvoiceTermsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialValue?: string;
  initialInvoiceType?: string;
}

export const InvoiceTermsModal: React.FC<InvoiceTermsModalProps> = ({
  visible,
  onClose,
  onSave,
  initialValue = '',
  initialInvoiceType = 'Standard',
}) => {
  const { theme, themeType }: any = useTheme();
  const modalStyles = getModalStyles(themeType, theme);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
      invoiceType: initialInvoiceType?.toLowerCase() || 'standard',
      terms: initialValue,
    },
  });

  const invoiceType = watch('invoiceType');
  const terms = watch('terms');

  React.useEffect(() => {
    if (visible) {
      setValue('invoiceType', initialInvoiceType?.toLowerCase() || 'standard');
      setValue('terms', initialValue || '');

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
    initialInvoiceType,
    initialValue,
    setValue,
    scaleValue,
    fadeValue,
    translateY,
  ]);

  const getInputBorderStyle = React.useCallback(
    (hasError: boolean, isFocused: boolean = false) => ({
      borderColor: hasError
        ? theme.colors.error || '#EF4444'
        : isFocused
        ? theme.colors.primary
        : themeType === 'dark'
        ? theme.colors.border || 'rgba(255, 255, 255, 0.1)'
        : theme.colors.border || 'rgba(0, 0, 0, 0.08)',
      borderWidth: hasError || isFocused ? 2 : 1,
      shadowColor: isFocused ? theme.colors.primary : 'transparent',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isFocused ? 0.1 : 0,
      shadowRadius: 8,
      elevation: isFocused ? 4 : 0,
    }),
    [theme.colors.primary, theme.colors.error, theme.colors.border, themeType]
  );

  const selectedType = invoiceTypes.find((type) => type.id === invoiceType);

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
            {/* Enhanced Header with Gradient */}
            <View style={modalStyles.headerWrapper}>
              <LinearGradient
                colors={[
                  `${theme.colors.primary}25`,
                  `${theme.colors.primary}15`,
                  `${theme.colors.primary}05`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={modalStyles.headerGradientBg}
              />
              <BlurView
                intensity={themeType === 'dark' ? 30 : 90}
                tint={themeType}
                style={modalStyles.header}
              >
                <View style={modalStyles.headerContent}>
                  <View style={modalStyles.headerTitleContainer}>
                    <View
                      style={[
                        modalStyles.iconContainer,
                        { backgroundColor: `${theme.colors.primary}15` },
                      ]}
                    >
                      <FileText size={22} color={theme.colors.primary} />
                    </View>
                    <View>
                      <Text
                        style={[
                          modalStyles.headerTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        Terms & Conditions
                      </Text>
                      <Text
                        style={[
                          modalStyles.headerSubtitle,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        Configure your invoice terms
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      modalStyles.closeButton,
                      {
                        backgroundColor:
                          theme.colors.surface ||
                          (themeType === 'dark'
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.05)'),
                      },
                    ]}
                    onPress={onClose}
                  >
                    <X size={20} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>

            <ScrollView
              style={modalStyles.content}
              contentContainerStyle={modalStyles.contentContainer}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {/* Invoice Type Selection */}
              <View style={modalStyles.section}>
                <Text
                  style={[
                    modalStyles.inputLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Invoice Type
                </Text>

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
                                  : theme.colors.surface ||
                                    (themeType === 'dark'
                                      ? 'rgba(255,255,255,0.08)'
                                      : 'rgba(255,255,255,0.9)'),
                              borderColor:
                                value === type.id
                                  ? theme.colors.primary
                                  : theme.colors.border ||
                                    (themeType === 'dark'
                                      ? 'rgba(255,255,255,0.15)'
                                      : 'rgba(0,0,0,0.08)'),
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
                                    ? '#FFF'
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
              </View>

              {/* Terms Input */}
              <View style={modalStyles.section}>
                <Text
                  style={[
                    modalStyles.inputLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Terms Content{' '}
                  <Text style={{ color: theme.colors.error || '#EF4444' }}>
                    *
                  </Text>
                </Text>
                <Controller
                  control={control}
                  name="terms"
                  rules={{ required: 'Terms are required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        modalStyles.textAreaContainer,
                        {
                          backgroundColor:
                            theme.colors.surface ||
                            (themeType === 'dark'
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(255,255,255,0.8)'),
                        },
                        getInputBorderStyle(!!errors.terms),
                      ]}
                    >
                      <TextInput
                        style={[
                          modalStyles.textArea,
                          { color: theme.colors.text },
                        ]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter your terms and conditions here..."
                        placeholderTextColor={theme.colors.textSecondary}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                      />
                    </View>
                  )}
                />
                {errors.terms && (
                  <Text
                    style={[
                      modalStyles.errorText,
                      { color: theme.colors.error || '#EF4444' },
                    ]}
                  >
                    {errors.terms.message}
                  </Text>
                )}
              </View>

              {/* Enhanced Save Button */}
              <TouchableOpacity
                style={[
                  modalStyles.saveButton,
                  {
                    shadowColor: theme.colors.primary,
                  },
                ]}
                onPress={handleSubmit(onSave)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[
                    theme.colors.primary,
                    theme.colors.primaryLight || theme.colors.primary,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={modalStyles.saveGradient}
                >
                  <Save size={22} color="#FFF" />
                  <Text style={modalStyles.saveButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
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
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
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
      minHeight: SCREEN_HEIGHT * 0.6,
    },
    headerWrapper: {
      position: 'relative',
      overflow: 'hidden',
    },
    headerGradientBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    header: {
      paddingTop: 8,
      paddingBottom: 16,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      flex: 1,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: -0.3,
      marginBottom: 2,
    },
    headerSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      opacity: 0.8,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 32,
    },
    previewCard: {
      padding: 20,
      borderRadius: 20,
      marginBottom: 32,
      borderWidth: 1,
      position: 'relative',
      overflow: 'hidden',
    },
    previewGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    previewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    previewLabel: {
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    previewText: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.5,
      marginBottom: 4,
    },
    previewDescription: {
      fontSize: 13,
      fontWeight: '500',
      opacity: 0.8,
    },
    section: {
      paddingVertical: 8,
      marginBottom: 6,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    sectionDescription: {
      fontSize: 14,
      marginBottom: 20,
      opacity: 0.8,
      lineHeight: 20,
    },
    typeScrollContainer: {
      marginHorizontal: -4,
    },
    typeScrollContent: {
      paddingHorizontal: 4,
      paddingVertical: 4,
    },
    typeCard: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 2,
      alignItems: 'center',
      minWidth: 120,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    typeIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
    typeLabel: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      letterSpacing: -0.1,
      marginBottom: 4,
    },
    typeDescription: {
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'center',
      opacity: 0.8,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 12,
      letterSpacing: -0.1,
    },
    textAreaContainer: {
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
      minHeight: 120,
    },
    textArea: {
      fontSize: 16,
      fontWeight: '500',
      minHeight: 88,
      lineHeight: 22,
    },
    errorText: {
      fontSize: 13,
      marginTop: 8,
      marginLeft: 4,
      fontWeight: '500',
    },
    saveButton: {
      borderRadius: 20,
      overflow: 'hidden',
      marginTop: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
    },
    saveGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 24,
      gap: 12,
    },
    saveButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: -0.2,
    },
  });
}
