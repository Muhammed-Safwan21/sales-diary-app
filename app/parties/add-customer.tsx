import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AddCustomerScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gstNumber: '',
    address: '',
    state: '',
    pincode: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <HeaderBar 
          title="Add Customer" 
          showBack
        />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.textLight }]}>Customer Name*</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter customer name"
                placeholderTextColor={theme.colors.textLight}
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.textLight }]}>Phone Number*</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter phone number"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.textLight }]}>Email (Optional)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter email address"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.textLight }]}>GST Number (Optional)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter GST number"
                placeholderTextColor={theme.colors.textLight}
                autoCapitalize="characters"
                value={formData.gstNumber}
                onChangeText={(text) => updateField('gstNumber', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.textLight }]}>Address (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter complete address"
                placeholderTextColor={theme.colors.textLight}
                multiline
                numberOfLines={4}
                value={formData.address}
                onChangeText={(text) => updateField('address', text)}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>State</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                  placeholder="Enter state"
                  placeholderTextColor={theme.colors.textLight}
                  value={formData.state}
                  onChangeText={(text) => updateField('state', text)}
                />
              </View>

              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>Pincode</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                  placeholder="Enter pincode"
                  placeholderTextColor={theme.colors.textLight}
                  keyboardType="numeric"
                  value={formData.pincode}
                  onChangeText={(text) => updateField('pincode', text)}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
          <Button 
            title="Save Customer" 
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
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});