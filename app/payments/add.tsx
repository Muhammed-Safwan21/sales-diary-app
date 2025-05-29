import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, IndianRupee } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PaymentForm {
  amount: string;
  date: Date;
  paymentMode: string;
  reference: string;
  notes: string;
  partyId: string;
}

export default function PaymentForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    amount: '',
    date: new Date(),
    paymentMode: 'cash',
    reference: '',
    notes: '',
    partyId: '',
  });

  const paymentModes = [
    { id: 'cash', label: 'Cash' },
    { id: 'card', label: 'Card' },
    { id: 'bank', label: 'Bank Transfer' },
    { id: 'upi', label: 'UPI' },
    { id: 'cheque', label: 'Cheque' },
  ];

  const handleSubmit = () => {
    // TODO: Implement payment submission logic
    console.log('Payment submitted:', paymentForm);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {type === 'in' ? 'Payment In' : 'Payment Out'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Amount</Text>
            <View style={[styles.amountInput, { borderColor: theme.colors.border }]}>
              <IndianRupee size={20} color={theme.colors.text} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Enter amount"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="numeric"
                value={paymentForm.amount}
                onChangeText={(text) => setPaymentForm({ ...paymentForm, amount: text })}
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
                {paymentForm.date.toLocaleDateString()}
              </Text>
              <Calendar size={20} color={theme.colors.text} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={paymentForm.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setPaymentForm({ ...paymentForm, date: selectedDate });
                  }
                }}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Payment Mode</Text>
            <View style={styles.paymentModes}>
              {paymentModes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.paymentModeButton,
                    {
                      backgroundColor:
                        paymentForm.paymentMode === mode.id
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setPaymentForm({ ...paymentForm, paymentMode: mode.id })}
                >
                  <Text
                    style={[
                      styles.paymentModeText,
                      {
                        color:
                          paymentForm.paymentMode === mode.id
                            ? '#fff'
                            : theme.colors.text,
                      },
                    ]}
                  >
                    {mode.label}
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
              value={paymentForm.reference}
              onChangeText={(text) => setPaymentForm({ ...paymentForm, reference: text })}
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
              value={paymentForm.notes}
              onChangeText={(text) => setPaymentForm({ ...paymentForm, notes: text })}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Payment</Text>
          </TouchableOpacity>
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
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  paymentModes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paymentModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  paymentModeText: {
    fontSize: 14,
    fontWeight: '500',
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
}); 