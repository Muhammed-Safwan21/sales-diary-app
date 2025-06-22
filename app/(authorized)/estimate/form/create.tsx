import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Plus,
  Save,
  Share,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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

interface EstimateItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface EstimateForm {
  customerId: string;
  customerName: string;
  date: Date;
  validUntil: Date;
  items: EstimateItem[];
  notes: string;
  terms: string;
}

export default function EstimateForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState<
    'date' | 'validUntil' | null
  >(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isCreatingEstimate, setIsCreatingEstimate] = useState(false);
  const [estimateForm, setEstimateForm] = useState<EstimateForm>({
    customerId: '',
    customerName: '',
    date: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    items: [
      {
        id: '1',
        description: '',
        quantity: '',
        rate: '',
        amount: '',
      },
    ],
    notes: '',
    terms: '',
  });

  const addItem = () => {
    setEstimateForm({
      ...estimateForm,
      items: [
        ...estimateForm.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: '',
          rate: '',
          amount: '',
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (estimateForm.items.length > 1) {
      setEstimateForm({
        ...estimateForm,
        items: estimateForm.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: string, field: keyof EstimateItem, value: string) => {
    setEstimateForm({
      ...estimateForm,
      items: estimateForm.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            const quantity = parseFloat(updatedItem.quantity) || 0;
            const rate = parseFloat(updatedItem.rate) || 0;
            updatedItem.amount = (quantity * rate).toFixed(2);
          }
          return updatedItem;
        }
        return item;
      }),
    });
  };

  const handleCustomerSelect = (customer: any) => {
    setEstimateForm({
      ...estimateForm,
      customerName: customer.name,
      customerId: customer.id,
    });
    setShowCustomerModal(false);
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsCreatingEstimate(true);
    try {
      // TODO: Implement estimate submission logic
      console.log('Estimate submitted:', { ...estimateForm, isDraft });
      setTimeout(() => {
        setIsCreatingEstimate(false);
        // router.push('/estimate/preview');
      }, 1000);
    } catch (error) {
      console.error('Error creating estimate:', error);
      setIsCreatingEstimate(false);
    }
  };

  const calculateTotal = () => {
    return estimateForm.items.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string,
    rightIcon?: React.ReactNode,
    editable = true,
    onPress?: () => void
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
      <TouchableOpacity
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
        onPress={onPress}
        disabled={!onPress}
      >
        <TextInput
          style={[styles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          editable={editable}
        />
        {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <BlurView
      intensity={themeType === 'dark' ? 20 : 80}
      tint={themeType}
      style={styles.footer}
    >
      <View style={styles.footerContent}>
        <TouchableOpacity
          style={[
            styles.draftButton,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
              borderColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.08)',
              opacity: isCreatingEstimate ? 0.5 : 1,
            },
          ]}
          disabled={isCreatingEstimate}
          onPress={() => handleSubmit(true)}
        >
          {isCreatingEstimate ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.textSecondary}
            />
          ) : (
            <Save size={20} color={theme.colors.textSecondary} />
          )}
          <Text
            style={[
              styles.draftButtonText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Save Draft
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shareButton,
            {
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
              opacity: isCreatingEstimate ? 0.5 : 1,
            },
          ]}
          disabled={isCreatingEstimate}
          onPress={() => handleSubmit(false)}
        >
          <LinearGradient
            colors={[
              theme.colors.primary,
              theme.colors.primaryLight || theme.colors.primary,
            ]}
            style={styles.shareGradient}
          >
            <View style={styles.shareButtonContent}>
              {isCreatingEstimate ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Share size={20} color="#FFFFFF" />
              )}
              <Text style={styles.shareButtonText}>
                {isCreatingEstimate ? 'Creating...' : 'Save & Share'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
              <Text style={styles.headerTitle}>Create Estimate</Text>
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
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Estimate Details
                </Text>
              </View>

              {renderFormInput(
                'Customer',
                estimateForm.customerName,
                (text) =>
                  setEstimateForm({ ...estimateForm, customerName: text }),
                'Select or add customer',
                <Calendar size={18} color={theme.colors.textSecondary} />,
                false,
                () => setShowCustomerModal(true)
              )}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Estimate Date
                  </Text>
                  <TouchableOpacity
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
                    onPress={() => setShowDatePicker('date')}
                  >
                    <Text
                      style={[styles.textInput, { color: theme.colors.text }]}
                    >
                      {estimateForm.date.toLocaleDateString()}
                    </Text>
                    <View style={styles.inputIcon}>
                      <Calendar size={18} color={theme.colors.textSecondary} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Valid Until
                  </Text>
                  <TouchableOpacity
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
                    onPress={() => setShowDatePicker('validUntil')}
                  >
                    <Text
                      style={[styles.textInput, { color: theme.colors.text }]}
                    >
                      {estimateForm.validUntil.toLocaleDateString()}
                    </Text>
                    <View style={styles.inputIcon}>
                      <Calendar size={18} color={theme.colors.textSecondary} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Items
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addItemButton,
                    {
                      backgroundColor: theme.colors.primary,
                      shadowColor: theme.colors.primary,
                    },
                  ]}
                  onPress={addItem}
                >
                  <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.addItemText}>Add Item</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.itemsContainer}>
                {estimateForm.items.map((item, index) => (
                  <Animated.View
                    key={item.id}
                    entering={FadeInDown.delay(index * 50).springify()}
                    style={[
                      styles.itemCard,
                      {
                        backgroundColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(255, 255, 255, 0.6)',
                        borderColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.04)',
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={[
                        `${theme.colors.accent}08`,
                        `${theme.colors.accent}02`,
                        'transparent',
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.itemGradientOverlay}
                    />

                    {estimateForm.items.length > 1 && (
                      <TouchableOpacity
                        style={[
                          styles.deleteButtonCorner,
                          {
                            backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          },
                        ]}
                        onPress={() => removeItem(item.id)}
                      >
                        <Trash2 size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}

                    <View style={styles.itemContent}>
                      <View style={styles.itemMainRow}>
                        <View style={styles.itemNameContainer}>
                          <View
                            style={[
                              styles.inputContainer,
                              styles.itemNameInput,
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
                            <TextInput
                              style={[
                                styles.textInput,
                                { color: theme.colors.text },
                              ]}
                              placeholder="Description"
                              placeholderTextColor={theme.colors.textSecondary}
                              value={item.description}
                              onChangeText={(text) =>
                                updateItem(item.id, 'description', text)
                              }
                            />
                          </View>
                        </View>
                      </View>

                      <View style={styles.itemDetailsRow}>
                        <View style={styles.quantityContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Qty
                          </Text>
                          <TextInput
                            style={[
                              styles.smallInput,
                              {
                                color: theme.colors.text,
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
                            value={item.quantity}
                            onChangeText={(text) =>
                              updateItem(item.id, 'quantity', text)
                            }
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor={theme.colors.textSecondary}
                            textAlign="center"
                          />
                        </View>

                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Rate
                          </Text>
                          <View style={styles.priceInputContainer}>
                            <TextInput
                              style={[
                                styles.smallInput,
                                styles.priceInput,
                                {
                                  color: theme.colors.text,
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
                              value={item.rate}
                              onChangeText={(text) =>
                                updateItem(item.id, 'rate', text)
                              }
                              keyboardType="numeric"
                              placeholder="0.00"
                              placeholderTextColor={theme.colors.textSecondary}
                            />
                          </View>
                        </View>

                        <View style={styles.amountContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Amount
                          </Text>
                          <TextInput
                            style={[
                              styles.smallInput,
                              {
                                color: theme.colors.text,
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
                            value={item.amount}
                            editable={false}
                            placeholder="0.00"
                            placeholderTextColor={theme.colors.textSecondary}
                            textAlign="center"
                          />
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(250)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Additional Details
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.label, { color: theme.colors.textSecondary }]}
                >
                  Notes (Optional)
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    styles.notesContainer,
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
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.notesInput,
                      { color: theme.colors.text },
                    ]}
                    value={estimateForm.notes}
                    onChangeText={(text) =>
                      setEstimateForm({ ...estimateForm, notes: text })
                    }
                    placeholder="Add any notes for this estimate..."
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <View style={[styles.formGroup, { marginVertical: 20 }]}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.textSecondary, marginTop: 18 },
                  ]}
                >
                  Terms & Conditions
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    styles.notesContainer,
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
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.notesInput,
                      { color: theme.colors.text },
                    ]}
                    value={estimateForm.terms}
                    onChangeText={(text) =>
                      setEstimateForm({ ...estimateForm, terms: text })
                    }
                    placeholder="Add terms and conditions..."
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.totalSection}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.primary}12`,
                  `${theme.colors.primary}06`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.totalGradientOverlay}
              />

              <View style={styles.totalContent}>
                <View style={styles.totalRow}>
                  <Text
                    style={[
                      styles.totalLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Total Amount
                  </Text>
                  <View style={styles.grandTotalContainer}>
                    <Text
                      style={[
                        styles.grandTotalValue,
                        { color: theme.colors.primary },
                      ]}
                    >
                      ₹
                      {calculateTotal().toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>

        {renderFooter()}
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={
            showDatePicker === 'date'
              ? estimateForm.date
              : estimateForm.validUntil
          }
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(null);
            if (selectedDate) {
              setEstimateForm({
                ...estimateForm,
                [showDatePicker === 'date' ? 'date' : 'validUntil']:
                  selectedDate,
              });
            }
          }}
        />
      )}
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
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
    marginLeft: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
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
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  inputIcon: {
    marginLeft: 8,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
      },
    }),
  },
  addItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  itemsContainer: {
    gap: 12,
  },
  itemCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  itemGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  deleteButtonCorner: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContent: {
    padding: 16,
    paddingTop: 40,
    position: 'relative',
    zIndex: 2,
  },
  itemMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  itemNameContainer: {
    flex: 1,
  },
  itemNameInput: {
    height: 44,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quantityContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 2,
  },
  amountContainer: {
    flex: 2,
  },
  smallLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: -0.1,
  },
  smallInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceInput: {
    flex: 1,
  },
  totalSection: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  totalGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  totalContent: {
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  grandTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
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
  draftButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  shareButton: {
    flex: 2,
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
  shareGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  notesContainer: {
    minHeight: 80,
  },
  notesInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
