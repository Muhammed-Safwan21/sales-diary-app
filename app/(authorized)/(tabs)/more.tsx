import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  Settings,
  Store,
  CreditCard,
  FileText,
  Headphones,
  Share2,
  Star,
  Sun,
  Moon,
  ChevronRight,
  LogOut,
  Users,
  Menu,
  Sparkles,
  Crown,
  Shield,
  ArrowUpRight,
  Printer,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { printThermalReceipt, useBluetoothPrinter } from '@/hooks/useBlutoothPrinter';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  delay?: number;
  gradient?: string[];
}

export default function MoreScreen() {
  const { theme, themeType, toggleTheme }: any = useTheme();
  const router = useRouter();
  const { logout } = useAuth();
  
  // Use our improved Bluetooth hook
  const {
    isConnecting,
    connectedDevice,
    handleConnectPrinter,
    disconnectPrinter,
    checkConnection,
  } :any = useBluetoothPrinter();

  const handlePrintDemo = async () => {
    try {
      // Check connection first
      const isConnected = await checkConnection();
      if (!isConnected) {
        Alert.alert(
          'Printer Not Connected',
          'Please connect to a printer first.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Connect Now', onPress: handleConnectPrinter },
          ]
        );
        return;
      }

      // Sample data for demo bill
      const demoData = {
        orderId: 'DEMO001',
        tokenNo: '123',
        staff: 'Demo Staff',
        orderItems: [
          {
            idescription: 'Chicken Biryani',
            vat: 5,
            quantity: 2,
            sp_price: 250,
          },
          {
            idescription: 'Mutton Curry',
            vat: 5,
            quantity: 1,
            sp_price: 300,
          },
          {
            idescription: 'Naan Bread',
            vat: 5,
            quantity: 3,
            sp_price: 50,
          },
        ],
        total: 950,
        barcodeId: 'DEMO123456',
      };

      const demoTable = {
        table_number: 'T01',
      };

      // Print using our improved function
      await printThermalReceipt(demoData, demoTable, {});
      
    } catch (error) {
      console.error('Print demo error:', error);
      Alert.alert('Print Error', 'Failed to print demo bill. Please check printer connection.');
    }
  };

  const SettingsItem: React.FC<SettingsItemProps> = ({
    icon,
    title,
    description,
    onPress,
    rightElement,
    delay = 0,
    gradient,
  }: any) => (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.settingsItemContainer,
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
          {/* Gradient overlay */}
          {gradient && (
            <LinearGradient
              colors={[`${gradient[0]}12`, `${gradient[1]}06`, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.settingsGradientOverlay}
            />
          )}

          <View style={styles.settingsItemContent}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: gradient
                    ? `${gradient[0]}20`
                    : `${theme.colors.primary}20`,
                  borderColor: gradient
                    ? `${gradient[0]}30`
                    : `${theme.colors.primary}30`,
                },
              ]}
            >
              {React.cloneElement(icon, {
                color: gradient ? gradient[0] : theme.colors.primary,
              })}
            </View>

            <View style={styles.settingsTextContainer}>
              <Text
                style={[styles.settingsItemTitle, { color: theme.colors.text }]}
              >
                {title}
              </Text>
              {description && (
                <Text
                  style={[
                    styles.settingsItemDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {description}
                </Text>
              )}
            </View>
          </View>

          <View
            style={[
              styles.rightElementContainer,
              !rightElement && {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          >
            {rightElement || (
              <ChevronRight size={16} color={theme.colors.textSecondary} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Modern header with gradient */}
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
            <View style={styles.headerTitleContainer}>
              <Menu size={24} color="#FFFFFF" />
              <Text style={styles.headerTitle}>More</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section with Glass Effect */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.profileSection}
          >
            <View style={styles.profileContent}>
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.profileImageContainer}
              >
                <Text style={styles.profileInitials}>MB</Text>
                <View style={styles.onlineIndicator} />
              </LinearGradient>

              <View style={styles.profileInfo}>
                <Text
                  style={[styles.businessName, { color: theme.colors.text }]}
                >
                  My Business Store
                </Text>
                <Text
                  style={[
                    styles.businessEmail,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  mybusiness@example.com
                </Text>

                <View style={styles.subscriptionBadge}>
                  <Crown size={12} color="#F59E0B" />
                  <Text style={styles.subscriptionText}>Silver Pro</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    backgroundColor:
                      themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.05)',
                  },
                ]}
                onPress={() => router.push('/business/profile')}
              >
                <Settings size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>

        {/* Business Section */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Store size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Business
            </Text>
          </View>

          <SettingsItem
            icon={<Store size={20} />}
            title="Business Profile"
            description="Manage your business details"
            onPress={() => router.push('/business/profile')}
            delay={200}
            gradient={['#6366F1', '#8B5CF6']}
          />

          <SettingsItem
            icon={<CreditCard size={20} />}
            title="Subscription"
            description="Silver Plan • Valid till 01 Dec 2024"
            onPress={() => {}}
            delay={250}
            gradient={['#F59E0B', '#FBBF24']}
          />

          <SettingsItem
            icon={<FileText size={20} />}
            title="Invoice Settings"
            description="Customize invoice format and terms"
            onPress={() => {}}
            delay={300}
            gradient={['#EC4899', '#F472B6']}
          />

          <SettingsItem
            icon={<Users size={20} />}
            title="Manage Staff"
            description="Manage your staffs and their permissions"
            onPress={() => router.push('/business/staff')}
            delay={350}
            gradient={['#06D6A0', '#34D399']}
          />
        </View>

        {/* Appearance Section */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={18} color={theme.colors.accent} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Appearance
            </Text>
          </View>

          <SettingsItem
            icon={themeType === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            title="Dark Mode"
            description="Switch between light and dark themes"
            onPress={toggleTheme}
            rightElement={
              <Switch
                value={themeType === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{
                  false: themeType === 'dark' ? '#374151' : '#D1D5DB',
                  true: `${theme.colors.primary}40`,
                }}
                thumbColor={
                  themeType === 'dark' ? theme.colors.primary : '#FFFFFF'
                }
                ios_backgroundColor={
                  themeType === 'dark' ? '#374151' : '#D1D5DB'
                }
              />
            }
            delay={400}
            gradient={
              themeType === 'dark'
                ? ['#6366F1', '#8B5CF6']
                : ['#F59E0B', '#FBBF24']
            }
          />
        </View>

        {/* Support Section */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Shield size={18} color={theme.colors.success} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Support & About
            </Text>
          </View>

          <SettingsItem
            icon={<Headphones size={20} />}
            title="Help & Support"
            description="Get assistance and answers to your questions"
            onPress={() => {}}
            delay={500}
            gradient={['#06B6D4', '#22D3EE']}
          />

          <SettingsItem
            icon={<Share2 size={20} />}
            title="Share App"
            description="Tell your friends about Sales Diary"
            onPress={() => {}}
            delay={550}
            gradient={['#8B5CF6', '#A78BFA']}
          />

          <SettingsItem
            icon={<Star size={20} />}
            title="Rate App"
            description="Rate your experience with Sales Diary"
            onPress={() => {}}
            delay={600}
            gradient={['#F59E0B', '#FBBF24']}
          />
        </View>

        {/* Printer Settings Section */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Printer size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Printer Settings
            </Text>
          </View>

          {/* Connection Status */}
          {connectedDevice && (
            <View style={styles.connectionStatus}>
              <Text style={[styles.connectionText, { color: theme.colors.success }]}>
                ✅ Connected to: {connectedDevice.device_name || connectedDevice.name}
              </Text>
              <TouchableOpacity
                style={styles.disconnectButton}
                onPress={disconnectPrinter}
              >
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          )}

          <SettingsItem
            icon={<Printer size={20} />}
            title={connectedDevice ? "Change Printer" : "Connect Printer"}
            description={
              isConnecting 
                ? "Connecting..." 
                : connectedDevice 
                  ? `Connected to ${connectedDevice.device_name || connectedDevice.name}`
                  : "Connect to a Bluetooth thermal printer"
            }
            onPress={handleConnectPrinter}
            delay={400}
            gradient={['#3B82F6', '#60A5FA']}
          />

          <SettingsItem
            icon={<Printer size={20} />}
            title="Print Demo Bill"
            description={
              connectedDevice 
                ? "Print a sample bill to test printer connection"
                : "Connect a printer first to test printing"
            }
            onPress={handlePrintDemo}
            delay={450}
            gradient={connectedDevice ? ['#10B981', '#34D399'] : ['#6B7280', '#9CA3AF']}
          />
        </View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(650)}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => logout()}
          >
            <LinearGradient
              colors={['#EF4444', '#F87171']}
              style={styles.logoutGradient}
            >
              <LogOut size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Logout</Text>
              <ArrowUpRight size={16} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text
          style={[styles.versionText, { color: theme.colors.textSecondary }]}
        >
          Version 1.0.0 • Built with ❤️
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  businessEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  subscriptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsItem: {
    marginBottom: 12,
  },
  settingsItemContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  settingsGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  settingsTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  rightElementContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Connection status styles
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  connectionText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  disconnectButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  disconnectText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
});