import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Wallet, Tag, CreditCard, FileText } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';

interface Expense {
  date: Date;
  amount: string;
  category: string;
  description: string;
  paymentMode: 'cash' | 'bank' | 'upi' | 'card';
  reference: string;
  notes: string;
}

export default function AddExpenseScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expense, setExpense] = useState<Expense>({
    date: new Date(),
    amount: '',
    category: '',
    description: '',
    paymentMode: 'cash',
    reference: '',
    notes: '',
  });

  const handleSubmit = () => {
    // TODO: Implement expense submission logic
    console.log('Expense submitted:', expense);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Add Expense</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Amount</Text>
            <View style={[styles.amountInput, { borderColor: theme.colors.border }]}>
              <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="0.00"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="numeric"
                value={expense.amount}
                onChangeText={(text) => setExpense({ ...expense, amount: text })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Date</Text>
            <TouchableOpacity
              style={[styles.dateInput, { borderColor: theme.colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: theme.colors.text }}>
                {expense.date.toLocaleDateString()}
              </Text>
              <Calendar size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={expense.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setExpense({ ...expense, date: selectedDate });
                }
              }}
            />
          )}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Category</Text>
            <TouchableOpacity
              style={[styles.input, { borderColor: theme.colors.border }]}
              onPress={() => {/* TODO: Implement category selection */}}
            >
              <View style={styles.inputContent}>
                <Tag size={20} color={theme.colors.textLight} />
                <Text style={[styles.inputText, { color: theme.colors.text }]}>
                  {expense.category || 'Select Category'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Enter expense description"
              placeholderTextColor={theme.colors.textLight}
              value={expense.description}
              onChangeText={(text) => setExpense({ ...expense, description: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Payment Mode</Text>
            <View style={styles.paymentModes}>
              {['cash', 'bank', 'upi', 'card'].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.paymentModeButton,
                    expense.paymentMode === mode && {
                      backgroundColor: theme.colors.primaryLight,
                      borderColor: theme.colors.primary,
                    },
                    expense.paymentMode !== mode && {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setExpense({ ...expense, paymentMode: mode as Expense['paymentMode'] })}
                >
                  <Text
                    style={[
                      styles.paymentModeText,
                      { color: expense.paymentMode === mode ? theme.colors.primary : theme.colors.text },
                    ]}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Reference Number</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Enter reference number"
              placeholderTextColor={theme.colors.textLight}
              value={expense.reference}
              onChangeText={(text) => setExpense({ ...expense, reference: text })}
            />
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
              value={expense.notes}
              onChangeText={(text) => setExpense({ ...expense, notes: text })}
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
          title="Add Expense" 
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
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputText: {
    fontSize: 16,
  },
  paymentModes: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentModeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  paymentModeText: {
    fontSize: 14,
    fontWeight: '500',
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