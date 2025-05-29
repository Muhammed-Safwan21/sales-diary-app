import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Save, Building2, CreditCard, IndianRupee, Hash } from 'lucide-react-native';

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  openingBalance: number;
  currentBalance: number;
}

export default function AddBankAccountScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [account, setAccount] = useState<BankAccount>({
    id: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    openingBalance: 0,
    currentBalance: 0,
  });

  const handleSave = () => {
    // Validate form
    if (!account.accountName) {
      Alert.alert('Error', 'Please enter account name');
      return;
    }

    if (!account.accountNumber) {
      Alert.alert('Error', 'Please enter account number');
      return;
    }

    if (!account.bankName) {
      Alert.alert('Error', 'Please enter bank name');
      return;
    }

    if (!account.ifscCode) {
      Alert.alert('Error', 'Please enter IFSC code');
      return;
    }

    // In a real app, you would save the bank account to your backend
    console.log('Saving bank account:', account);
    Alert.alert(
      'Success',
      'Bank account added successfully',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Add Bank Account
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Account Name</Text>
            <View style={[styles.inputWrapper, { borderColor: theme.colors.border }]}>
              <CreditCard size={20} color={theme.colors.textLight} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={account.accountName}
                onChangeText={(text) => setAccount({ ...account, accountName: text })}
                placeholder="Enter account name"
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Account Number</Text>
            <View style={[styles.inputWrapper, { borderColor: theme.colors.border }]}>
              <Hash size={20} color={theme.colors.textLight} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={account.accountNumber}
                onChangeText={(text) => setAccount({ ...account, accountNumber: text })}
                placeholder="Enter account number"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Bank Name</Text>
            <View style={[styles.inputWrapper, { borderColor: theme.colors.border }]}>
              <Building2 size={20} color={theme.colors.textLight} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={account.bankName}
                onChangeText={(text) => setAccount({ ...account, bankName: text })}
                placeholder="Enter bank name"
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>IFSC Code</Text>
            <View style={[styles.inputWrapper, { borderColor: theme.colors.border }]}>
              <Hash size={20} color={theme.colors.textLight} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={account.ifscCode}
                onChangeText={(text) => setAccount({ ...account, ifscCode: text.toUpperCase() })}
                placeholder="Enter IFSC code"
                placeholderTextColor={theme.colors.textLight}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Opening Balance</Text>
            <View style={[styles.inputWrapper, { borderColor: theme.colors.border }]}>
              <IndianRupee size={20} color={theme.colors.textLight} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={account.openingBalance.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 0;
                  setAccount({ 
                    ...account, 
                    openingBalance: value,
                    currentBalance: value,
                  });
                }}
                placeholder="Enter opening balance"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Current Balance</Text>
          <Text style={[styles.balanceText, { color: theme.colors.primary }]}>
            {formatAmount(account.currentBalance)}
          </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 