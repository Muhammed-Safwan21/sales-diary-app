import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  Users
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  delay?: number;
}

export default function MoreScreen() {
  const { theme, themeType, toggleTheme } = useTheme();
  const router = useRouter();

  const SettingsItem: React.FC<SettingsItemProps> = ({ 
    icon, 
    title, 
    description, 
    onPress,
    rightElement,
    delay = 0
  }) => (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity
        style={[
          styles.settingsItem,
          { 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          }
        ]}
        onPress={onPress}
      >
        <View style={styles.settingsItemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
            {icon}
          </View>
          <View style={styles.settingsItemContent}>
            <Text
              style={[
                styles.settingsItemTitle,
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }
              ]}
            >
              {title}
            </Text>
            {description && (
              <Text
                style={[
                  styles.settingsItemDescription,
                  { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }
                ]}
              >
                {description}
              </Text>
            )}
          </View>
        </View>
        
        {rightElement || <ChevronRight size={20} color={theme.colors.textLight} />}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          More
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={[styles.profileImageContainer, { backgroundColor: theme.colors.primaryLight }]}>
            <Text style={[styles.profileInitials, { color: theme.colors.primary }]}>MB</Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.businessName, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
              My Business
            </Text>
            <Text style={[styles.businessEmail, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
              mybusiness@example.com
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: theme.colors.primaryLight }]}
            onPress={() => router.push('/business/profile')}
          >
            <Settings size={18} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
            Business
          </Text>
          
          <SettingsItem
            icon={<Store size={20} color={theme.colors.primary} />}
            title="Business Profile"
            description="Manage your business details"
            onPress={() => router.push('/business/profile')}
            delay={100}
          />
          
          <SettingsItem
            icon={<CreditCard size={20} color={theme.colors.primary} />}
            title="Subscription"
            description="Silver Plan • Valid till 01 Dec 2024"
            onPress={() => {}}
            delay={200}
          />
          
          <SettingsItem
            icon={<FileText size={20} color={theme.colors.primary} />}
            title="Invoice Settings"
            description="Customize invoice format and terms"
            onPress={() => {}}
            delay={300}
          />
          
          <SettingsItem
            icon={<Users size={20} color={theme.colors.primary} />}
            title="Manage Staff"
            description="Manage your staffs and their permissions"
            onPress={() => router.push('/business/staff')}
            delay={300}
          />
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
            Appearance
          </Text>
          
          <SettingsItem
            icon={themeType === 'dark' ? 
              <Moon size={20} color={theme.colors.primary} /> : 
              <Sun size={20} color={theme.colors.primary} />
            }
            title="Dark Mode"
            onPress={toggleTheme}
            rightElement={
              <Switch
                value={themeType === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D1D5DB', true: theme.colors.primaryLight }}
                thumbColor={themeType === 'dark' ? theme.colors.primary : '#FFFFFF'}
              />
            }
            delay={400}
          />
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
            Support & About
          </Text>
          
          <SettingsItem
            icon={<Headphones size={20} color={theme.colors.primary} />}
            title="Help & Support"
            description="Get assistance and answers to your questions"
            onPress={() => {}}
            delay={500}
          />
          
          <SettingsItem
            icon={<Share2 size={20} color={theme.colors.primary} />}
            title="Share App"
            description="Tell your friends about Sales Diary"
            onPress={() => {}}
            delay={600}
          />
          
          <SettingsItem
            icon={<Star size={20} color={theme.colors.primary} />}
            title="Rate App"
            description="Rate your experience with Sales Diary"
            onPress={() => {}}
            delay={700}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.logoutButton, 
            { 
              backgroundColor: theme.colors.errorLight,
              borderColor: theme.colors.error,
            }
          ]}
        >
          <LogOut size={20} color={theme.colors.error} />
          <Text 
            style={[
              styles.logoutText, 
              { 
                color: theme.colors.error,
                fontFamily: theme.typography.fontFamily.medium
              }
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: theme.colors.textLight }]}>
          Version 1.0.0
        </Text>
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
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  businessName: {
    fontSize: 18,
    marginBottom: 4,
  },
  businessEmail: {
    fontSize: 14,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
  },
  settingsItemDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
});