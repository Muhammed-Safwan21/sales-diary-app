import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Crown,
} from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock staff data
const mockStaff = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    role: 'Manager',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 9876543211',
    role: 'Sales Executive',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+91 9876543212',
    role: 'Accountant',
  },
];

export default function StaffViewPage() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the staff by id (mock)
  const staff = mockStaff.find((s) => s.id === id) || mockStaff[0];

  const handleEdit = () => {
    router.push(`/staff/form?id=${staff.id}`);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Staff',
      'Are you sure you want to delete this staff member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>  
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
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <User size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Staff Details</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Edit size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personal Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Full Name</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{staff.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Email</Text>
            <View style={styles.detailValueRow}>
              <Mail size={15} color={theme.colors.secondary} style={{ marginRight: 6 }} />
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{staff.email}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Phone</Text>
            <View style={styles.detailValueRow}>
              <Phone size={15} color={theme.colors.accent} style={{ marginRight: 6 }} />
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{staff.phone}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Role/Position</Text>
            <View style={styles.detailValueRow}>
              <Crown size={15} color={theme.colors.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{staff.role}</Text>
            </View>
          </View>
        </BlurView>
      </ScrollView>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1.2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 2,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
});
