import { useAuthSession } from "@/app/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [newsletterEnabled, setNewsletterEnabled] = useState(false);

  const toggleSwitch = (setting: string, value: boolean) => {
    switch (setting) {
      case "notifications":
        setNotificationsEnabled(value);
        break;
      case "darkMode":
        setDarkModeEnabled(value);
        break;
      case "biometrics":
        setBiometricsEnabled(value);
        break;
      case "newsletter":
        setNewsletterEnabled(value);
        break;
    }
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    description: string,
    color1: string,
    color2: string,
    value: boolean,
    setting: string
  ) => {
    return (
      <View style={styles.settingCard}>
        <View style={styles.settingIconContainer}>
          <LinearGradient
            colors={[color1, color2]}
            style={styles.settingIconBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name={icon as any} size={18} color="#fff" />
          </LinearGradient>
        </View>
        <View style={styles.settingDetails}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#D4E2FC" }}
          thumbColor={value ? "#4F6CF7" : "#f4f3f4"}
          ios_backgroundColor="#E0E0E0"
          onValueChange={(newValue) => toggleSwitch(setting, newValue)}
          value={value}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your preferences</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeaderContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.largeProfileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
        </View>

        {renderSettingItem(
          "notifications-outline",
          "Push Notifications",
          "Receive alerts for new orders and updates",
          "#4F6CF7",
          "#8A4EF5",
          notificationsEnabled,
          "notifications"
        )}

        {renderSettingItem(
          "moon-outline",
          "Dark Mode",
          "Switch to dark theme for comfortable viewing",
          "#6B7FD7",
          "#8662D7",
          darkModeEnabled,
          "darkMode"
        )}

        {renderSettingItem(
          "finger-print-outline",
          "Biometric Login",
          "Use fingerprint or face recognition to login",
          "#FF6B6B",
          "#FF8E53",
          biometricsEnabled,
          "biometrics"
        )}

        {renderSettingItem(
          "mail-outline",
          "Newsletter",
          "Receive weekly insights and tips",
          "#4CAF50",
          "#8BC34A",
          newsletterEnabled,
          "newsletter"
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account</Text>
        </View>

        {/* Account Options */}
        <View style={styles.plainCard}>
          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="lock-closed-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="card-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="language-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Language</Text>
            </View>
            <View style={styles.optionValue}>
              <Text style={styles.optionValueText}>English</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Support</Text>
        </View>

        <View style={styles.plainCard}>
          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="help-circle-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="chatbox-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.accountOption}>
            <View style={styles.accountOptionContent}>
              <Ionicons name="document-text-outline" size={20} color="#4F6CF7" />
              <Text style={styles.accountOptionText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.5</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E0E7FF",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 20,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  profileHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  largeProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#E0E7FF",
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: "#F0F4FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 12,
    color: "#4F6CF7",
    fontWeight: "600",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  settingIconContainer: {
    marginRight: 15,
  },
  settingIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#888",
  },
  plainCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 5,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  accountOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  accountOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountOptionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  optionValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionValueText: {
    fontSize: 14,
    color: "#888",
    marginRight: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F0",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: "#888",
  },
});