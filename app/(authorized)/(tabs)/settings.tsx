// import { useAuthSession } from "@/app/providers/AuthProvider";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   Image,
//   Switch,
//   ScrollView,
// } from "react-native";
// import { StyleSheet } from "react-native";

// export default function Settings() {
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [darkModeEnabled, setDarkModeEnabled] = useState(false);
//   const [biometricsEnabled, setBiometricsEnabled] = useState(true);
//   const [newsletterEnabled, setNewsletterEnabled] = useState(false);

//   const toggleSwitch = (setting: string, value: boolean) => {
//     switch (setting) {
//       case "notifications":
//         setNotificationsEnabled(value);
//         break;
//       case "darkMode":
//         setDarkModeEnabled(value);
//         break;
//       case "biometrics":
//         setBiometricsEnabled(value);
//         break;
//       case "newsletter":
//         setNewsletterEnabled(value);
//         break;
//     }
//   };

//   const renderSettingItem = (
//     icon: string,
//     title: string,
//     description: string,
//     color1: string,
//     color2: string,
//     value: boolean,
//     setting: string
//   ) => {
//     return (
//       <View style={styles.settingCard}>
//         <View style={styles.settingIconContainer}>
//           <LinearGradient
//             colors={[color1, color2]}
//             style={styles.settingIconBg}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           >
//             <Ionicons name={icon as any} size={18} color="#fff" />
//           </LinearGradient>
//         </View>
//         <View style={styles.settingDetails}>
//           <Text style={styles.settingTitle}>{title}</Text>
//           <Text style={styles.settingDescription}>{description}</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "#E0E0E0", true: "#D4E2FC" }}
//           thumbColor={value ? "#4F6CF7" : "#f4f3f4"}
//           ios_backgroundColor="#E0E0E0"
//           onValueChange={(newValue) => toggleSwitch(setting, newValue)}
//           value={value}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="light" />

//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Settings</Text>
//           <Text style={styles.headerSubtitle}>Manage your preferences</Text>
//         </View>
//         <View style={styles.profileContainer}>
//           <Image
//             source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
//             style={styles.profileImage}
//           />
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileHeaderContainer}>
//             <Image
//               source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
//               style={styles.largeProfileImage}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>John Doe</Text>
//               <Text style={styles.profileEmail}>john.doe@example.com</Text>
//               <TouchableOpacity style={styles.editProfileButton}>
//                 <Text style={styles.editProfileText}>Edit Profile</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         {/* Settings Sections */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>App Preferences</Text>
//         </View>

//         {renderSettingItem(
//           "notifications-outline",
//           "Push Notifications",
//           "Receive alerts for new orders and updates",
//           "#4F6CF7",
//           "#8A4EF5",
//           notificationsEnabled,
//           "notifications"
//         )}

//         {renderSettingItem(
//           "moon-outline",
//           "Dark Mode",
//           "Switch to dark theme for comfortable viewing",
//           "#6B7FD7",
//           "#8662D7",
//           darkModeEnabled,
//           "darkMode"
//         )}

//         {renderSettingItem(
//           "finger-print-outline",
//           "Biometric Login",
//           "Use fingerprint or face recognition to login",
//           "#FF6B6B",
//           "#FF8E53",
//           biometricsEnabled,
//           "biometrics"
//         )}

//         {renderSettingItem(
//           "mail-outline",
//           "Newsletter",
//           "Receive weekly insights and tips",
//           "#4CAF50",
//           "#8BC34A",
//           newsletterEnabled,
//           "newsletter"
//         )}

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Account</Text>
//         </View>

//         {/* Account Options */}
//         <View style={styles.plainCard}>
//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="lock-closed-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Change Password</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//           </TouchableOpacity>

//           <View style={styles.separator} />

//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="card-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Payment Methods</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//           </TouchableOpacity>

//           <View style={styles.separator} />

//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="language-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Language</Text>
//             </View>
//             <View style={styles.optionValue}>
//               <Text style={styles.optionValueText}>English</Text>
//               <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Support</Text>
//         </View>

//         <View style={styles.plainCard}>
//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="help-circle-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Help Center</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//           </TouchableOpacity>

//           <View style={styles.separator} />

//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="chatbox-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Contact Support</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//           </TouchableOpacity>

//           <View style={styles.separator} />

//           <TouchableOpacity style={styles.accountOption}>
//             <View style={styles.accountOptionContent}>
//               <Ionicons name="document-text-outline" size={20} color="#4F6CF7" />
//               <Text style={styles.accountOptionText}>Privacy Policy</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.logoutButton}>
//           <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
//           <Text style={styles.logoutText}>Sign Out</Text>
//         </TouchableOpacity>

//         <View style={styles.versionContainer}>
//           <Text style={styles.versionText}>Version 1.0.5</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFF",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#333",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 4,
//   },
//   profileContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#E0E7FF",
//   },
//   profileImage: {
//     width: "100%",
//     height: "100%",
//   },
//   scrollContent: {
//     paddingBottom: 30,
//   },
//   profileSection: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     marginHorizontal: 15,
//     marginTop: 10,
//     padding: 20,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   profileHeaderContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   largeProfileImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderWidth: 3,
//     borderColor: "#E0E7FF",
//   },
//   profileInfo: {
//     marginLeft: 20,
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 4,
//   },
//   profileEmail: {
//     fontSize: 14,
//     color: "#888",
//     marginBottom: 10,
//   },
//   editProfileButton: {
//     backgroundColor: "#F0F4FF",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   editProfileText: {
//     fontSize: 12,
//     color: "#4F6CF7",
//     fontWeight: "600",
//   },
//   sectionHeader: {
//     paddingHorizontal: 20,
//     marginTop: 25,
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   settingCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     marginHorizontal: 15,
//     marginBottom: 12,
//     padding: 15,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   settingIconContainer: {
//     marginRight: 15,
//   },
//   settingIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   settingDetails: {
//     flex: 1,
//   },
//   settingTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   settingDescription: {
//     fontSize: 13,
//     color: "#888",
//   },
//   plainCard: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     marginHorizontal: 15,
//     marginBottom: 12,
//     padding: 5,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   accountOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//   },
//   accountOptionContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   accountOptionText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 12,
//   },
//   optionValue: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   optionValueText: {
//     fontSize: 14,
//     color: "#888",
//     marginRight: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#F0F0F0",
//     marginHorizontal: 15,
//   },
//   logoutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFF0F0",
//     marginHorizontal: 15,
//     marginTop: 20,
//     marginBottom: 20,
//     padding: 15,
//     borderRadius: 16,
//   },
//   logoutText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#FF6B6B",
//     marginLeft: 10,
//   },
//   versionContainer: {
//     alignItems: "center",
//     paddingBottom: 20,
//   },
//   versionText: {
//     fontSize: 12,
//     color: "#888",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const { width } = Dimensions.get("window");

// Brand colors (same as your dashboard)
const COLOR = {
  primary: "#48a877",
  secondary: "#e8f5ef",
  accent: "#3d8d64",
  white: "#ffffff",
  black: "#000",
  grey: "#888",
  lightGrey: "#f1f5f9",
  darkGrey: "#4b5563",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#f59e0b",
  purple: "#8b5cf6",
};

const Settings = () => {
  // State for toggle switches
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [dataSync, setDataSync] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  // Settings sections and items
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          icon: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
          title: "Profile Information",
          subtitle: "Change your account information",
          type: "link",
        },
        {
          id: "password",
          icon: "https://img.icons8.com/ios-filled/50/000000/password.png",
          title: "Change Password",
          subtitle: "Update your password",
          type: "link",
        },
        {
          id: "biometric",
          icon: "https://img.icons8.com/ios-filled/50/000000/fingerprint.png",
          title: "Biometric Login",
          subtitle: "Login with fingerprint or face recognition",
          type: "toggle",
          value: biometricLogin,
          onToggle: setBiometricLogin,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          icon: "https://img.icons8.com/ios-filled/50/000000/bell.png",
          title: "Push Notifications",
          subtitle: "Get notified about important updates",
          type: "toggle",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: "darkMode",
          icon: "https://img.icons8.com/ios-filled/50/000000/moon-symbol.png",
          title: "Dark Mode",
          subtitle: "Switch between light and dark theme",
          type: "toggle",
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: "emailUpdates",
          icon: "https://img.icons8.com/ios-filled/50/000000/mail.png",
          title: "Email Updates",
          subtitle: "Receive company news and updates",
          type: "toggle",
          value: emailUpdates,
          onToggle: setEmailUpdates,
        },
      ],
    },
    {
      title: "Data & Privacy",
      items: [
        {
          id: "dataSync",
          icon: "https://img.icons8.com/ios-filled/50/000000/sync.png",
          title: "Data Synchronization",
          subtitle: "Keep your data synced across devices",
          type: "toggle",
          value: dataSync,
          onToggle: setDataSync,
        },
        {
          id: "privacy",
          icon: "https://img.icons8.com/ios-filled/50/000000/privacy.png",
          title: "Privacy Settings",
          subtitle: "Manage your data and privacy options",
          type: "link",
        },
        {
          id: "download",
          icon: "https://img.icons8.com/ios-filled/50/000000/download.png",
          title: "Download My Data",
          subtitle: "Get a copy of your personal data",
          type: "link",
        },
      ],
    },
    {
      title: "Help & Support",
      items: [
        {
          id: "help",
          icon: "https://img.icons8.com/ios-filled/50/000000/help.png",
          title: "Help Center",
          subtitle: "Get answers to your questions",
          type: "link",
        },
        {
          id: "feedback",
          icon: "https://img.icons8.com/ios-filled/50/000000/feedback.png",
          title: "Send Feedback",
          subtitle: "Help us improve our service",
          type: "link",
        },
        {
          id: "about",
          icon: "https://img.icons8.com/ios-filled/50/000000/info.png",
          title: "About App",
          subtitle: "Version 1.0.5",
          type: "link",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Settings</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/search.png",
            }}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item:any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.settingItem}
                onPress={() => {
                  if (item.type === "toggle") {
                    item.onToggle(!item.value);
                  } else if (item.type === "link") {
                    // Handle navigation or action for links
                    console.log(`Navigate to ${item.id}`);
                  }
                }}
              >
                <View style={styles.settingItemLeft}>
                  <View
                    style={[
                      styles.settingIconContainer,
                      item.id === "notifications" && styles.notificationIcon,
                      item.id === "darkMode" && styles.darkModeIcon,
                      item.id === "privacy" && styles.privacyIcon,
                      item.id === "profile" && styles.profileIcon,
                      item.id === "biometric" && styles.biometricIcon,
                      item.id === "help" && styles.helpIcon,
                    ]}
                  >
                    <Image
                      source={{ uri: item.icon }}
                      style={styles.settingIcon}
                    />
                  </View>
                  <View style={styles.settingDetails}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                {item.type === "toggle" ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: "#DDDDDD", true: COLOR.secondary }}
                    thumbColor={item.value ? COLOR.primary : "#F4F3F4"}
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://img.icons8.com/ios-filled/50/000000/chevron-right.png",
                    }}
                    style={styles.arrowIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/logout-rounded.png",
            }}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version 1.0.5</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightGrey,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLOR.white,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLOR.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.black,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.white,
    padding: 20,
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLOR.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.primary,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLOR.secondary,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: COLOR.primary,
  },
  settingsSection: {
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLOR.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationIcon: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  darkModeIcon: {
    backgroundColor: "rgba(75, 85, 99, 0.1)",
  },
  privacyIcon: {
    backgroundColor: "rgba(139, 92, 246, 0.1)",
  },
  profileIcon: {
    backgroundColor: "rgba(72, 168, 119, 0.1)",
  },
  biometricIcon: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  helpIcon: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  settingIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.black,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: COLOR.black,
  },
  settingSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
    marginTop: 2,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: COLOR.grey,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.red,
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.white,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.white,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
  },
});

export default Settings;