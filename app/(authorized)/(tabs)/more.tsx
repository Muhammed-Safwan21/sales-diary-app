// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Image } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import {
//   Settings,
//   Store,
//   CreditCard,
//   FileText,
//   Headphones,
//   Share2,
//   Star,
//   Sun,
//   Moon,
//   ChevronRight,
//   LogOut,
//   Users
// } from 'lucide-react-native';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// interface SettingsItemProps {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
//   onPress: () => void;
//   rightElement?: React.ReactNode;
//   delay?: number;
// }

// export default function MoreScreen() {
//   const { theme, themeType, toggleTheme } = useTheme();
//   const router = useRouter();

//   const SettingsItem: React.FC<SettingsItemProps> = ({
//     icon,
//     title,
//     description,
//     onPress,
//     rightElement,
//     delay = 0
//   }) => (
//     <Animated.View entering={FadeInDown.delay(delay).springify()}>
//       <TouchableOpacity
//         style={[
//           styles.settingsItem,
//           {
//             backgroundColor: theme.colors.card,
//             borderColor: theme.colors.border,
//           }
//         ]}
//         onPress={onPress}
//       >
//         <View style={styles.settingsItemLeft}>
//           <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
//             {icon}
//           </View>
//           <View style={styles.settingsItemContent}>
//             <Text
//               style={[
//                 styles.settingsItemTitle,
//                 { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }
//               ]}
//             >
//               {title}
//             </Text>
//             {description && (
//               <Text
//                 style={[
//                   styles.settingsItemDescription,
//                   { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }
//                 ]}
//               >
//                 {description}
//               </Text>
//             )}
//           </View>
//         </View>

//         {rightElement || <ChevronRight size={20} color={theme.colors.textLight} />}
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
//         <Text style={[styles.headerTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
//           More
//         </Text>
//       </View>

//       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
//         <View style={styles.profileSection}>
//           <View style={[styles.profileImageContainer, { backgroundColor: theme.colors.primaryLight }]}>
//             <Text style={[styles.profileInitials, { color: theme.colors.primary }]}>MB</Text>
//           </View>

//           <View style={styles.profileInfo}>
//             <Text style={[styles.businessName, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
//               My Business
//             </Text>
//             <Text style={[styles.businessEmail, { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }]}>
//               mybusiness@example.com
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.editButton, { backgroundColor: theme.colors.primaryLight }]}
//             onPress={() => router.push('/business/profile')}
//           >
//             <Settings size={18} color={theme.colors.primary} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.settingsSection}>
//           <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
//             Business
//           </Text>

//           <SettingsItem
//             icon={<Store size={20} color={theme.colors.primary} />}
//             title="Business Profile"
//             description="Manage your business details"
//             onPress={() => router.push('/business/profile')}
//             delay={100}
//           />

//           <SettingsItem
//             icon={<CreditCard size={20} color={theme.colors.primary} />}
//             title="Subscription"
//             description="Silver Plan • Valid till 01 Dec 2024"
//             onPress={() => {}}
//             delay={200}
//           />

//           <SettingsItem
//             icon={<FileText size={20} color={theme.colors.primary} />}
//             title="Invoice Settings"
//             description="Customize invoice format and terms"
//             onPress={() => {}}
//             delay={300}
//           />

//           <SettingsItem
//             icon={<Users size={20} color={theme.colors.primary} />}
//             title="Manage Staff"
//             description="Manage your staffs and their permissions"
//             onPress={() => router.push('/business/staff')}
//             delay={300}
//           />
//         </View>

//         <View style={styles.settingsSection}>
//           <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
//             Appearance
//           </Text>

//           <SettingsItem
//             icon={themeType === 'dark' ?
//               <Moon size={20} color={theme.colors.primary} /> :
//               <Sun size={20} color={theme.colors.primary} />
//             }
//             title="Dark Mode"
//             onPress={toggleTheme}
//             rightElement={
//               <Switch
//                 value={themeType === 'dark'}
//                 onValueChange={toggleTheme}
//                 trackColor={{ false: '#D1D5DB', true: theme.colors.primaryLight }}
//                 thumbColor={themeType === 'dark' ? theme.colors.primary : '#FFFFFF'}
//               />
//             }
//             delay={400}
//           />
//         </View>

//         <View style={styles.settingsSection}>
//           <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
//             Support & About
//           </Text>

//           <SettingsItem
//             icon={<Headphones size={20} color={theme.colors.primary} />}
//             title="Help & Support"
//             description="Get assistance and answers to your questions"
//             onPress={() => {}}
//             delay={500}
//           />

//           <SettingsItem
//             icon={<Share2 size={20} color={theme.colors.primary} />}
//             title="Share App"
//             description="Tell your friends about Sales Diary"
//             onPress={() => {}}
//             delay={600}
//           />

//           <SettingsItem
//             icon={<Star size={20} color={theme.colors.primary} />}
//             title="Rate App"
//             description="Rate your experience with Sales Diary"
//             onPress={() => {}}
//             delay={700}
//           />
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.logoutButton,
//             {
//               backgroundColor: theme.colors.errorLight,
//               borderColor: theme.colors.error,
//             }
//           ]}
//         >
//           <LogOut size={20} color={theme.colors.error} />
//           <Text
//             style={[
//               styles.logoutText,
//               {
//                 color: theme.colors.error,
//                 fontFamily: theme.typography.fontFamily.medium
//               }
//             ]}
//           >
//             Logout
//           </Text>
//         </TouchableOpacity>

//         <Text style={[styles.versionText, { color: theme.colors.textLight }]}>
//           Version 1.0.0
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Platform.OS === 'android' ? 25 : 0,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//   },
//   headerTitle: {
//     fontSize: 18,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   profileImageContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileInitials: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   businessName: {
//     fontSize: 18,
//     marginBottom: 4,
//   },
//   businessEmail: {
//     fontSize: 14,
//   },
//   editButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   settingsSection: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   settingsItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     justifyContent: 'space-between',
//   },
//   settingsItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   settingsItemContent: {
//     flex: 1,
//   },
//   settingsItemTitle: {
//     fontSize: 16,
//   },
//   settingsItemDescription: {
//     fontSize: 14,
//     marginTop: 2,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     borderRadius: 12,
//     marginVertical: 16,
//     borderWidth: 1,
//   },
//   logoutText: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   versionText: {
//     textAlign: 'center',
//     fontSize: 14,
//     marginBottom: 16,
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
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
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';

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
  const { logout } = useAuth(); // Use the custom hook

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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  businessEmail: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
    marginBottom: 8,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  subscriptionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  settingsItem: {
    marginBottom: 12,
  },
  settingsItemContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
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
  settingsTextContainer: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.1,
    lineHeight: 16,
  },
  rightElementContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  logoutButton: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
      },
    }),
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 16,
    letterSpacing: -0.1,
  },
});
