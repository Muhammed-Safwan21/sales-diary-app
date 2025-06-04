import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Package, ChevronDown, Plus, Trash2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreatePurchaseOrderScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const [orderItems, setOrderItems] = useState([
    { id: '1', name: '', quantity: '1', price: '', amount: '0' }
  ]);
  
  const [orderDetails, setOrderDetails] = useState({
    supplierName: '',
    orderNumber: 'PO-0001',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const addItem = () => {
    setOrderItems([
      ...orderItems,
      {
        id: Date.now().toString(),
        name: '',
        quantity: '1',
        price: '',
        amount: '0'
      }
    ]);
  };

  const removeItem = (id: string) => {
    if (orderItems.length <= 1) return;
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: string) => {
    setOrderItems(
      orderItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          if (field === 'quantity' || field === 'price') {
            const quantity = parseFloat(field === 'quantity' ? value : item.quantity) || 0;
            const price = parseFloat(field === 'price' ? value : item.price) || 0;
            updatedItem.amount = (quantity * price).toString();
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <HeaderBar 
          title="Create Purchase Order" 
          showBack
        />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Order Details
            </Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>Supplier</Text>
                <TouchableOpacity 
                  style={[
                    styles.input, 
                    styles.selectInput,
                    { 
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    }
                  ]}
                >
                  <TextInput
                    style={[styles.textInput, { color: theme.colors.text }]}
                    placeholder="Select or add supplier"
                    placeholderTextColor={theme.colors.textLight}
                    value={orderDetails.supplierName}
                    onChangeText={(text) => setOrderDetails({...orderDetails, supplierName: text})}
                  />
                  <ChevronDown size={20} color={theme.colors.textLight} />
                </TouchableOpacity>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>Order Number</Text>
                  <View 
                    style={[
                      styles.input, 
                      { 
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                      }
                    ]}
                  >
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={orderDetails.orderNumber}
                      onChangeText={(text) => setOrderDetails({...orderDetails, orderNumber: text})}
                    />
                  </View>
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>Order Date</Text>
                  <TouchableOpacity 
                    style={[
                      styles.input, 
                      styles.selectInput,
                      { 
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                      }
                    ]}
                  >
                    <Text style={[styles.textInput, { color: theme.colors.text }]}>
                      {orderDetails.orderDate}
                    </Text>
                    <Calendar size={20} color={theme.colors.textLight} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>Expected Delivery Date</Text>
                <TouchableOpacity 
                  style={[
                    styles.input, 
                    styles.selectInput,
                    { 
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    }
                  ]}
                >
                  <Text style={[styles.textInput, { color: theme.colors.text }]}>
                    {orderDetails.expectedDate}
                  </Text>
                  <Calendar size={20} color={theme.colors.textLight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                Items
              </Text>
              <TouchableOpacity
                style={[styles.addItemButton, { backgroundColor: theme.colors.primaryLight }]}
                onPress={addItem}
              >
                <Plus size={18} color={theme.colors.primary} />
                <Text 
                  style={[
                    styles.addItemText, 
                    { 
                      color: theme.colors.primary,
                      fontFamily: theme.typography.fontFamily.medium
                    }
                  ]}
                >
                  Add Item
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.itemsContainer, { borderColor: theme.colors.border }]}>
              {orderItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                  style={[
                    styles.itemRow,
                    index < orderItems.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.border,
                    }
                  ]}
                >
                  <View style={styles.itemDetails}>
                    <TouchableOpacity 
                      style={[
                        styles.input,
                        styles.selectInput,
                        { 
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                        }
                      ]}
                    >
                      <TextInput
                        style={[styles.textInput, { color: theme.colors.text }]}
                        placeholder="Select or add item"
                        placeholderTextColor={theme.colors.textLight}
                        value={item.name}
                        onChangeText={(text) => updateItem(item.id, 'name', text)}
                      />
                      <Package size={20} color={theme.colors.textLight} />
                    </TouchableOpacity>

                    <View style={styles.itemQuantityRow}>
                      <View style={[styles.quantityInput, { flex: 1, marginRight: 8 }]}>
                        <Text style={[styles.smallLabel, { color: theme.colors.textLight }]}>Qty</Text>
                        <TextInput
                          style={[
                            styles.smallInput,
                            { color: theme.colors.text, borderColor: theme.colors.border }
                          ]}
                          value={item.quantity}
                          onChangeText={(text) => updateItem(item.id, 'quantity', text)}
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={[styles.priceInput, { flex: 2, marginRight: 8 }]}>
                        <Text style={[styles.smallLabel, { color: theme.colors.textLight }]}>Price</Text>
                        <View style={styles.priceInputContainer}>
                          <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
                          <TextInput
                            style={[
                              styles.smallInput,
                              { color: theme.colors.text, borderColor: theme.colors.border, flex: 1 }
                            ]}
                            value={item.price}
                            onChangeText={(text) => updateItem(item.id, 'price', text)}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>

                      <View style={[styles.amountContainer, { flex: 2 }]}>
                        <Text style={[styles.smallLabel, { color: theme.colors.textLight }]}>Amount</Text>
                        <Text style={[styles.amountText, { color: theme.colors.text }]}>
                          ₹{parseFloat(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Additional Information
            </Text>

            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>Notes</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                      textAlignVertical: 'top',
                    }
                  ]}
                  placeholder="Add notes or terms"
                  placeholderTextColor={theme.colors.textLight}
                  multiline
                  numberOfLines={4}
                  value={orderDetails.notes}
                  onChangeText={(text) => setOrderDetails({...orderDetails, notes: text})}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={[styles.totalContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.colors.textLight }]}>Subtotal</Text>
                <Text style={[styles.totalValue, { color: theme.colors.text }]}>
                  ₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.colors.textLight }]}>Tax</Text>
                <Text style={[styles.totalValue, { color: theme.colors.text }]}>₹0.00</Text>
              </View>

              <View style={[styles.totalRow, styles.finalRow, { borderTopColor: theme.colors.border }]}>
                <Text style={[styles.grandTotalLabel, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                  Total
                </Text>
                <Text style={[styles.grandTotalValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                  ₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
          <Button 
            title="Save as Draft" 
            variant="outline"
            onPress={() => {}}
            style={{ marginRight: 12 }}
          />
          <Button 
            title="Create Order" 
            onPress={() => {}}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addItemText: {
    fontSize: 14,
    marginLeft: 4,
  },
  itemsContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    padding: 16,
  },
  itemDetails: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 12,
    justifyContent: 'center',
    width: 40,
    alignItems: 'center',
  },
  itemQuantityRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  smallLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  smallInput: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    paddingHorizontal: 8,
    fontSize: 14,
  },
  amountContainer: {
    justifyContent: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    textAlign: 'right',
    paddingVertical: 10,
  },
  totalContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
  },
  finalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 0,
  },
  grandTotalLabel: {
    fontSize: 18,
  },
  grandTotalValue: {
    fontSize: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});