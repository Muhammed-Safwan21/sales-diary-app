import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Phone, ArrowLeft } from 'lucide-react-native';
import { Button } from '@/components/shared/Button';

export default function PhoneLoginScreen() {
  const { theme } = useTheme();
  const router: any = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Implement actual send OTP logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('otp');
      Alert.alert('Success', 'OTP sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Implement actual verify OTP logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {step === 'phone' ? 'Phone Login' : 'Verify OTP'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
              {step === 'phone'
                ? 'Enter your phone number to receive an OTP'
                : 'Enter the OTP sent to your phone'}
            </Text>
          </View>

          <View style={styles.form}>
            {step === 'phone' ? (
              <>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: theme.colors.border },
                  ]}
                >
                  <Phone size={20} color={theme.colors.textLight} />
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Phone Number"
                    placeholderTextColor={theme.colors.textLight}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                  />
                </View>
                <Button
                  title="Send OTP"
                  onPress={handleSendOtp}
                  loading={isLoading}
                  fullWidth
                />
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: theme.colors.border },
                  ]}
                >
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter OTP"
                    placeholderTextColor={theme.colors.textLight}
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                  />
                </View>
                <Button
                  title="Verify OTP"
                  onPress={handleVerifyOtp}
                  loading={isLoading}
                  fullWidth
                />
              </>
            )}
          </View>
          <View style={styles.footer}>
            <Text
              style={[styles.footerText, { color: theme.colors.textLight }]}
            >
              {step === 'phone'
                ? 'Already have an account? '
                : "Didn't receive OTP? "}
            </Text>
            <TouchableOpacity
              onPress={() =>
                step === 'phone' ? router.push('/auth/login') : setStep('phone')
              }
            >
              <Text
                style={[styles.footerLink, { color: theme.colors.primary }]}
              >
                {step === 'phone' ? 'Sign In' : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
            {step === 'phone' && (
              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text
                  style={[
                    styles.footerLink,
                    { color: theme.colors.primary, marginLeft: 16 },
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});
