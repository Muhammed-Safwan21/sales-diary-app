import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  FileText,
  IndianRupee,
  Package,
  Plus,
  Save,
  Share,
  Trash2,
  Users,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
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

export default function CreateInvoiceScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();

  const [invoiceItems, setInvoiceItems] = useState([
    { id: '1', name: '', quantity: '1', price: '', amount: '0' },
  ]);

  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: '',
    invoiceNumber: 'INV-0001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: Date.now().toString(),
        name: '',
        quantity: '1',
        price: '',
        amount: '0',
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (invoiceItems.length <= 1) return;
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: string) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          if (field === 'quantity' || field === 'price') {
            const quantity =
              parseFloat(field === 'quantity' ? value : item.quantity) || 0;
            const price =
              parseFloat(field === 'price' ? value : item.price) || 0;
            updatedItem.amount = (quantity * price).toString();
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0);
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string,
    rightIcon?: React.ReactNode,
    editable = true
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
        {label}
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
        <TextInput
          style={[styles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          editable={editable}
        />
        {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
      </View>
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
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <FileText size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Create Invoice</Text>
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
          {/* Invoice Details Section */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Users size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Invoice Details
                </Text>
              </View>

              {renderFormInput(
                'Customer',
                invoiceDetails.customerName,
                (text) =>
                  setInvoiceDetails({ ...invoiceDetails, customerName: text }),
                'Select or add customer',
                <ChevronDown size={18} color={theme.colors.textSecondary} />
              )}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Invoice Number
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
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={invoiceDetails.invoiceNumber}
                      onChangeText={(text) =>
                        setInvoiceDetails({
                          ...invoiceDetails,
                          invoiceNumber: text,
                        })
                      }
                    />
                  </View>
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Invoice Date
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
                  >
                    <Text
                      style={[styles.textInput, { color: theme.colors.text }]}
                    >
                      {invoiceDetails.invoiceDate}
                    </Text>
                    <View style={styles.inputIcon}>
                      <Calendar size={18} color={theme.colors.textSecondary} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {renderFormInput(
                'Due Date',
                invoiceDetails.dueDate,
                (text) =>
                  setInvoiceDetails({ ...invoiceDetails, dueDate: text }),
                undefined,
                <Calendar size={18} color={theme.colors.textSecondary} />,
                false
              )}
            </BlurView>
          </Animated.View>

          {/* Items Section */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Package size={18} color={theme.colors.accent} />
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
                {invoiceItems.map((item, index) => (
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
                    {/* Subtle gradient overlay */}
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

                    <View style={styles.itemContent}>
                      <View style={styles.itemMainRow}>
                        <View style={styles.itemNameContainer}>
                          <TouchableOpacity
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
                              placeholder="Select or add item"
                              placeholderTextColor={theme.colors.textSecondary}
                              value={item.name}
                              onChangeText={(text) =>
                                updateItem(item.id, 'name', text)
                              }
                            />
                            <View style={styles.inputIcon}>
                              <Package
                                size={16}
                                color={theme.colors.textSecondary}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>

                        {invoiceItems.length > 1 && (
                          <TouchableOpacity
                            style={[
                              styles.deleteButton,
                              {
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                borderColor: 'rgba(239, 68, 68, 0.2)',
                              },
                            ]}
                            onPress={() => removeItem(item.id)}
                          >
                            <Trash2 size={16} color="#EF4444" />
                          </TouchableOpacity>
                        )}
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
                          />
                        </View>

                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Price
                          </Text>
                          <View style={styles.priceInputContainer}>
                            <View
                              style={[
                                styles.currencyContainer,
                                {
                                  backgroundColor: `${theme.colors.primary}15`,
                                  borderColor: `${theme.colors.primary}20`,
                                },
                              ]}
                            >
                              <IndianRupee
                                size={12}
                                color={theme.colors.primary}
                              />
                            </View>
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
                              value={item.price}
                              onChangeText={(text) =>
                                updateItem(item.id, 'price', text)
                              }
                              keyboardType="numeric"
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
                          <View style={styles.amountDisplay}>
                            <IndianRupee
                              size={12}
                              color={theme.colors.success}
                            />
                            <Text
                              style={[
                                styles.amountText,
                                { color: theme.colors.success },
                              ]}
                            >
                              {parseFloat(item.amount).toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </BlurView>
          </Animated.View>

          {/* Total Section */}
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
                    Subtotal
                  </Text>
                  <Text
                    style={[styles.totalValue, { color: theme.colors.text }]}
                  >
                    ₹
                    {calculateTotal().toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>

                <View style={styles.totalRow}>
                  <Text
                    style={[
                      styles.totalLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Tax (0%)
                  </Text>
                  <Text
                    style={[styles.totalValue, { color: theme.colors.text }]}
                  >
                    ₹0.00
                  </Text>
                </View>

                <View
                  style={[
                    styles.totalRow,
                    styles.grandTotalRow,
                    {
                      borderTopColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.grandTotalLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Total Amount
                  </Text>
                  <View style={styles.grandTotalContainer}>
                    <IndianRupee size={16} color={theme.colors.primary} />
                    <Text
                      style={[
                        styles.grandTotalValue,
                        { color: theme.colors.primary },
                      ]}
                    >
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

        {/* Footer Actions */}
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
                },
              ]}
            >
              <Save size={20} color={theme.colors.textSecondary} />
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
                },
              ]}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.shareGradient}
              >
                <Share size={20} color="#FFFFFF" />
                <Text style={styles.shareButtonText}>Save & Share</Text>
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
  itemContent: {
    padding: 16,
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
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  currencyContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
  },
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
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
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
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
});
