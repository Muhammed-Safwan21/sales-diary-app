import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Plus, Trash2, Package, Receipt } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/shared/Button';

interface BillItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
  hsn: string;
  gstRate: string;
  gstAmount: string;
}

interface PurchaseBill {
  supplierId: string;
  billNumber: string;
  billDate: Date;
  dueDate: Date;
  items: BillItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  notes: string;
  paymentStatus: 'pending' | 'partial' | 'paid';
}

export default function PurchaseBillForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState<'billDate' | 'dueDate' | null>(null);
  const [bill, setBill] = useState<PurchaseBill>({
    supplierId: '',
    billNumber: '',
    billDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    items: [
      {
        id: '1',
        description: '',
        quantity: '',
        rate: '',
        amount: '',
        hsn: '',
        gstRate: '',
        gstAmount: '',
      },
    ],
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    notes: '',
    paymentStatus: 'pending',
  });

  const addItem = () => {
    setBill({
      ...bill,
      items: [
        ...bill.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: '',
          rate: '',
          amount: '',
          hsn: '',
          gstRate: '',
          gstAmount: '',
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (bill.items.length > 1) {
      setBill({
        ...bill,
        items: bill.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: string, field: keyof BillItem, value: string) => {
    setBill({
      ...bill,
      items: bill.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            const quantity = parseFloat(updatedItem.quantity) || 0;
            const rate = parseFloat(updatedItem.rate) || 0;
            updatedItem.amount = (quantity * rate).toFixed(2);
          }
          if (field === 'amount' || field === 'gstRate') {
            const amount = parseFloat(updatedItem.amount) || 0;
            const gstRate = parseFloat(updatedItem.gstRate) || 0;
            updatedItem.gstAmount = ((amount * gstRate) / 100).toFixed(2);
          }
          return updatedItem;
        }
        return item;
      }),
    });
  };

  const calculateTotals = () => {
    const subtotal = bill.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const taxAmount = bill.items.reduce((sum, item) => sum + (parseFloat(item.gstAmount) || 0), 0);
    const total = subtotal + taxAmount;

    setBill({
      ...bill,
      subtotal,
      taxAmount,
      total,
    });
  };

  const handleSubmit = () => {
    // TODO: Implement bill submission logic
    console.log('Bill submitted:', bill);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Create Purchase Bill</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Supplier</Text>
            <TouchableOpacity
              style={[styles.input, { borderColor: theme.colors.border }]}
              onPress={() => {/* TODO: Implement supplier selection */}}
            >
              <Text style={{ color: theme.colors.text }}>Select Supplier</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Bill Number</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Enter bill number"
              placeholderTextColor={theme.colors.textLight}
              value={bill.billNumber}
              onChangeText={(text) => setBill({ ...bill, billNumber: text })}
            />
          </View>

          <View style={styles.dateRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Bill Date</Text>
              <TouchableOpacity
                style={[styles.dateInput, { borderColor: theme.colors.border }]}
                onPress={() => setShowDatePicker('billDate')}
              >
                <Text style={{ color: theme.colors.text }}>
                  {bill.billDate.toLocaleDateString()}
                </Text>
                <Calendar size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Due Date</Text>
              <TouchableOpacity
                style={[styles.dateInput, { borderColor: theme.colors.border }]}
                onPress={() => setShowDatePicker('dueDate')}
              >
                <Text style={{ color: theme.colors.text }}>
                  {bill.dueDate.toLocaleDateString()}
                </Text>
                <Calendar size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={showDatePicker === 'billDate' ? bill.billDate : bill.dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(null);
                if (selectedDate) {
                  setBill({
                    ...bill,
                    [showDatePicker === 'billDate' ? 'billDate' : 'dueDate']: selectedDate,
                  });
                }
              }}
            />
          )}

          <View style={styles.itemsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Items</Text>
            {bill.items.map((item, index) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemInputs}>
                  <TextInput
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
                    placeholder="Description"
                    placeholderTextColor={theme.colors.textLight}
                    value={item.description}
                    onChangeText={(text) => updateItem(item.id, 'description', text)}
                  />
                  <View style={styles.quantityRateRow}>
                    <TextInput
                      style={[styles.input, styles.quantityInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="Qty"
                      placeholderTextColor={theme.colors.textLight}
                      keyboardType="numeric"
                      value={item.quantity}
                      onChangeText={(text) => updateItem(item.id, 'quantity', text)}
                    />
                    <TextInput
                      style={[styles.input, styles.rateInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="Rate"
                      placeholderTextColor={theme.colors.textLight}
                      keyboardType="numeric"
                      value={item.rate}
                      onChangeText={(text) => updateItem(item.id, 'rate', text)}
                    />
                    <TextInput
                      style={[styles.input, styles.amountInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="Amount"
                      placeholderTextColor={theme.colors.textLight}
                      value={item.amount}
                      editable={false}
                    />
                  </View>
                  <View style={styles.gstRow}>
                    <TextInput
                      style={[styles.input, styles.hsnInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="HSN/SAC"
                      placeholderTextColor={theme.colors.textLight}
                      value={item.hsn}
                      onChangeText={(text) => updateItem(item.id, 'hsn', text)}
                    />
                    <TextInput
                      style={[styles.input, styles.gstRateInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="GST %"
                      placeholderTextColor={theme.colors.textLight}
                      keyboardType="numeric"
                      value={item.gstRate}
                      onChangeText={(text) => updateItem(item.id, 'gstRate', text)}
                    />
                    <TextInput
                      style={[styles.input, styles.gstAmountInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
                      placeholder="GST Amount"
                      placeholderTextColor={theme.colors.textLight}
                      value={item.gstAmount}
                      editable={false}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Trash2 size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primaryLight }]}
              onPress={addItem}
            >
              <Plus size={20} color={theme.colors.primary} />
              <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
                Add Item
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Subtotal</Text>
              <Text style={[styles.totalValue, { color: theme.colors.text }]}>
                ₹{bill.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>GST Amount</Text>
              <Text style={[styles.totalValue, { color: theme.colors.text }]}>
                ₹{bill.taxAmount.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.totalRow, styles.grandTotalRow]}>
              <Text style={[styles.grandTotalLabel, { color: theme.colors.text }]}>Total</Text>
              <Text style={[styles.grandTotalValue, { color: theme.colors.primary }]}>
                ₹{bill.total.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Notes</Text>
            <TextInput
              style={[
                styles.input,
                styles.notesInput,
                { borderColor: theme.colors.border, color: theme.colors.text },
              ]}
              placeholder="Add any additional notes"
              placeholderTextColor={theme.colors.textLight}
              multiline
              numberOfLines={4}
              value={bill.notes}
              onChangeText={(text) => setBill({ ...bill, notes: text })}
            />
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
          title="Create Bill" 
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  itemsSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  itemInputs: {
    flex: 1,
    gap: 8,
  },
  quantityRateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityInput: {
    flex: 1,
  },
  rateInput: {
    flex: 1,
  },
  amountInput: {
    flex: 1,
  },
  gstRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hsnInput: {
    flex: 1,
  },
  gstRateInput: {
    flex: 1,
  },
  gstAmountInput: {
    flex: 1,
  },
  removeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalSection: {
    gap: 12,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    paddingTop: 12,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}); 