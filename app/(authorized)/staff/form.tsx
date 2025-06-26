import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Crown,
  X,
} from 'lucide-react-native';

export default function StaffForm() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Success', 'Staff member saved!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}> {label} </Text>
      </View>
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
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>  
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
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
            <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <User size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Manage Staff</Text>
            </View>
            <View style={styles.headerRightSpacer} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Staff Details</Text>
          </View>
          {renderFormInput(
            'Full Name',
            formData.name,
            (text) => handleChange('name', text),
            'Enter full name',
            <User size={16} color={theme.colors.primary} />
          )}
          {renderFormInput(
            'Email Address',
            formData.email,
            (text) => handleChange('email', text),
            'Enter email address',
            <Mail size={16} color={theme.colors.secondary} />,
            'email-address'
          )}
          {renderFormInput(
            'Phone Number',
            formData.phone,
            (text) => handleChange('phone', text),
            'Enter phone number',
            <Phone size={16} color={theme.colors.accent} />,
            'phone-pad'
          )}
          {renderFormInput(
            'Role/Position',
            formData.role,
            (text) => handleChange('role', text),
            'Enter role or position',
            <Crown size={16} color={theme.colors.primary} />
          )}
        </BlurView>
      </ScrollView>
      <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.footer}>
        <View style={styles.footerContent}>
          <TouchableOpacity
            style={[
              styles.cancelButton,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
              },
            ]}
            onPress={handleCancel}
            disabled={isSaving}
          >
            <X size={18} color={theme.colors.textSecondary} />
            <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
            disabled={isSaving}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
              style={styles.saveGradient}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Save size={18} color="#FFFFFF" />
              )}
              <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingBottom: 20 },
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
  headerRightSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
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
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  formGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 20,
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
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  saveButton: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});
