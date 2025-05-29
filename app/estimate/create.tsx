import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Plus, Trash2 } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';

interface EstimateItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface EstimateForm {
  customerId: string;
  date: Date;
  validUntil: Date;
  items: EstimateItem[];
  notes: string;
  terms: string;
}

export default function EstimateForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState<'date' | 'validUntil' | null>(null);
  const [estimateForm, setEstimateForm] = useState<EstimateForm>({
    customerId: '',
    date: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
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

  const handleSubmit = () => {
    // TODO: Implement estimate submission logic
    console.log('Estimate submitted:', estimateForm);
  };

  const calculateTotal = () => {
    return estimateForm.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Create Estimate</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Customer</Text>
            <TouchableOpacity
              style={[styles.input, { borderColor: theme.colors.border }]}
              onPress={() => {/* TODO: Implement customer selection */}}
            >
              <Text style={{ color: theme.colors.text }}>Select Customer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Date</Text>
              <TouchableOpacity
                style={[styles.dateInput, { borderColor: theme.colors.border }]}
                onPress={() => setShowDatePicker('date')}
              >
                <Text style={{ color: theme.colors.text }}>
                  {estimateForm.date.toLocaleDateString()}
                </Text>
                <Calendar size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Valid Until</Text>
              <TouchableOpacity
                style={[styles.dateInput, { borderColor: theme.colors.border }]}
                onPress={() => setShowDatePicker('validUntil')}
              >
                <Text style={{ color: theme.colors.text }}>
                  {estimateForm.validUntil.toLocaleDateString()}
                </Text>
                <Calendar size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={showDatePicker === 'date' ? estimateForm.date : estimateForm.validUntil}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(null);
                if (selectedDate) {
                  setEstimateForm({
                    ...estimateForm,
                    [showDatePicker === 'date' ? 'date' : 'validUntil']: selectedDate,
                  });
                }
              }}
            />
          )}

          <View style={styles.itemsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Items</Text>
            {estimateForm.items.map((item, index) => (
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
            <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total Amount</Text>
            <Text style={[styles.totalAmount, { color: theme.colors.text }]}>
              ₹{calculateTotal().toFixed(2)}
            </Text>
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
              value={estimateForm.notes}
              onChangeText={(text) => setEstimateForm({ ...estimateForm, notes: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Terms & Conditions</Text>
            <TextInput
              style={[
                styles.input,
                styles.notesInput,
                { borderColor: theme.colors.border, color: theme.colors.text },
              ]}
              placeholder="Add terms and conditions"
              placeholderTextColor={theme.colors.textLight}
              multiline
              numberOfLines={4}
              value={estimateForm.terms}
              onChangeText={(text) => setEstimateForm({ ...estimateForm, terms: text })}
            />
          </View>

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
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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