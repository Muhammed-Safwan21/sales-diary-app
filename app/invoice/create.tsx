import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Package, ChevronDown, Plus, Trash2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreateInvoiceScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const [invoiceItems, setInvoiceItems] = useState([
    { id: '1', name: '', quantity: '1', price: '', amount: '0' }
  ]);
  
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: '',
    invoiceNumber: 'INV-0001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  
  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems, 
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
    if (invoiceItems.length <= 1) return;
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };
  
  const updateItem = (id: string, field: string, value: string) => {
    setInvoiceItems(
      invoiceItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Calculate amount if quantity or price changes
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
    return invoiceItems.reduce((total, item) => {
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
          title="Create Invoice" 
          showBack
        />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Invoice Details
            </Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                  Customer
                </Text>
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
                    placeholder="Select or add customer"
                    placeholderTextColor={theme.colors.textLight}
                    value={invoiceDetails.customerName}
                    onChangeText={(text) => setInvoiceDetails({...invoiceDetails, customerName: text})}
                  />
                  <ChevronDown size={20} color={theme.colors.textLight} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                    Invoice Number
                  </Text>
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
                      value={invoiceDetails.invoiceNumber}
                      onChangeText={(text) => setInvoiceDetails({...invoiceDetails, invoiceNumber: text})}
                    />
                  </View>
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                    Invoice Date
                  </Text>
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
                      {invoiceDetails.invoiceDate}
                    </Text>
                    <Calendar size={20} color={theme.colors.textLight} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                  Due Date
                </Text>
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
                    {invoiceDetails.dueDate}
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
              {invoiceItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                  style={[
                    styles.itemRow, 
                    index < invoiceItems.length - 1 && {
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
                      <View style={[ { flex: 1, marginRight: 8 }]}>
                        <Text style={[styles.smallLabel, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                          Qty
                        </Text>
                        <TextInput
                          style={[styles.smallInput, { color: theme.colors.text, borderColor: theme.colors.border }]}
                          value={item.quantity}
                          onChangeText={(text) => updateItem(item.id, 'quantity', text)}
                          keyboardType="numeric"
                        />
                      </View>
                      
                      <View style={[{ flex: 2, marginRight: 8 }]}>
                        <Text style={[styles.smallLabel, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                          Price
                        </Text>
                        <View style={styles.priceInputContainer}>
                          {/* <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text> */}
                          <TextInput
                            style={[styles.smallInput, { color: theme.colors.text, borderColor: theme.colors.border, flex: 1 }]}
                            value={item.price}
                            onChangeText={(text) => updateItem(item.id, 'price', text)}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                      
                      <View style={[ { flex: 2 }]}>
                        <Text style={[styles.smallLabel, { textAlign:"right",color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
                          Amount
                        </Text>
                        <Text style={[styles.amountText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
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
            <View style={[styles.totalContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.colors.textLight }]}>Subtotal</Text>
                <Text style={[styles.totalValue, { color: theme.colors.text }]}>₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
              
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.colors.textLight }]}>Tax</Text>
                <Text style={[styles.totalValue, { color: theme.colors.text }]}>₹0.00</Text>
              </View>
              
              <View style={[styles.totalRow, styles.finalRow, { borderTopColor: theme.colors.border }]}>
                <Text style={[styles.grandTotalLabel, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>Total</Text>
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
            title="Save & Share" 
            onPress={() => {}}
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
    justifyContent: 'center',
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
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },
});