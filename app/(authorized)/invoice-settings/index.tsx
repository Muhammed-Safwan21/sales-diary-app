import { InvoicePrefixModal } from '@/components/modal/invoicePrefixModal';
import { InvoiceTermsModal } from '@/components/modal/invoiceTermsModal';
import { PrinterSettingsModal } from '@/components/modal/printerSettingsModal';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ChevronRight, FileText, Hash, Printer } from 'lucide-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InvoiceSettingsScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();

  // Modal state
  const [showPrefixModal, setShowPrefixModal] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);
  const [showPrinterModal, setShowPrinterModal] = React.useState(false);

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      invoiceType: 'Standard',
      prefix: '',
    },
  });

  const invoiceTypes = ['Standard', 'GST', 'Proforma'];

  // Save handlers (replace with actual save logic as needed)
  const handleSavePrefix = (data: any) => {
    setShowPrefixModal(false);
  };
  const handleSaveTerms = (data: any) => {
    setShowTermsModal(false);
  };
  const handleSavePrinter = (settings: any) => {
    setShowPrinterModal(false);
  };

  const getInputBorderStyle = (hasError: boolean) => ({
    borderColor: hasError
      ? '#EF4444'
      : themeType === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.06)',
    borderWidth: hasError ? 1.5 : 1,
  });

  const options = [
    {
      icon: <Hash size={20} />, // Invoice Number Prefix
      title: 'Invoice Number Prefix',
      description: 'Set a custom prefix for invoice numbers',
      onPress: () => setShowPrefixModal(true),
      gradient: ['#6366F1', '#8B5CF6'],
    },
    {
      icon: <FileText size={20} />, // Terms and Conditions
      title: 'Terms and Conditions',
      description: 'Edit default terms for invoices',
      onPress: () => setShowTermsModal(true),
      gradient: ['#EC4899', '#F472B6'],
    },
    {
      icon: <Printer size={20} />, // Printer Settings
      title: 'Printer Settings',
      description: 'Configure printer and print options',
      onPress: () => setShowPrinterModal(true),
      gradient: ['#06B6D4', '#22D3EE'],
    },
  ];

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
        style={{ paddingBottom: 24 }}
      >
        <SafeAreaView>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 12 : 8,
            paddingVertical: 16,
          }}>
            <TouchableOpacity
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <FileText size={22} color="#FFFFFF" />
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 }}>
                Invoice Settings
              </Text>
            </View>
            <View style={{ width: 42 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.optionsContainer}>
        {options.map((item, idx) => (
          <TouchableOpacity
            key={item.title}
            style={styles.optionItem}
            activeOpacity={0.8}
            onPress={item.onPress}
          >
            <LinearGradient
              colors={[`${item.gradient[0]}12`, `${item.gradient[1]}06`, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionGradientOverlay}
            />
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: `${item.gradient[0]}20`,
                    borderColor: `${item.gradient[0]}30`,
                  },
                ]}
              >
                {React.cloneElement(item.icon, {
                  color: item.gradient[0],
                })}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.optionTitle, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={[styles.optionDescription, { color: theme.colors.textSecondary }]}>{item.description}</Text>
              </View>
              <View style={styles.chevronContainer}>
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* Use modular modals */}
      <InvoicePrefixModal
        visible={showPrefixModal}
        onClose={() => setShowPrefixModal(false)}
        onSave={handleSavePrefix}
      />
      <InvoiceTermsModal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onSave={handleSaveTerms}
      />
      <PrinterSettingsModal
        visible={showPrinterModal}
        onClose={() => setShowPrinterModal(false)}
        onSave={handleSavePrinter}
        devices={[
          { name: 'Printer001', address: 'DC:0D:30:F2:CF:43', connected: true },
          { name: '4B-2034PA-7106', address: '10:23:81:3F:71:06' },
          { name: 'CMF Buds', address: '2C:BE:EB:E0:20:4A' },
          { name: 'rk3568_r68p', address: '22:22:FD:6C:09:00' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionItem: {
    marginBottom: 18,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'rgba(0,0,0,0.06)',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  optionGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.1,
    lineHeight: 16,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 8,
    left: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
});
