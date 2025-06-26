import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    FileText,
    Phone,
    Plus,
    User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for staff
const mockStaff = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Manager',
    status: 'active',
    phone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Sales Executive',
    status: 'inactive',
    phone: '+91 8765432109',
  },
  {
    id: '3',
    name: 'Carol Lee',
    role: 'Accountant',
    status: 'active',
    phone: '+91 7654321098',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Support',
    status: 'active',
    phone: '+91 6543210987',
  },
  {
    id: '5',
    name: 'Eva Green',
    role: 'Sales Executive',
    status: 'inactive',
    phone: '+91 9123456780',
  },
];

export default function StaffListingScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [staff, setStaff] = useState(mockStaff);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'inactive':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={12} color="#10B981" />;
      case 'inactive':
        return <AlertCircle size={12} color="#EF4444" />;
      default:
        return <AlertCircle size={12} color={theme.colors.textSecondary} />;
    }
  };

  const handleViewStaff = (staffId: string) => {
    router.push(`/staff/${staffId}`);
  };

  const renderHeader = () => (
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <User size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Staff</Text>
          </View>

          <View style={styles.headerRightSpacer} />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Total Staff</Text>
              <Text style={styles.summaryValue}>{staff.length}</Text>
            </BlurView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryLabel}>Active</Text>
              <Text style={styles.summaryValue}>{staff.filter(s => s.status === 'active').length}</Text>
            </BlurView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderStaffCard = (member: any, index: number) => {
    return (
      <Animated.View
        key={member.id}
        entering={FadeInDown.delay(index * 50).springify()}
        style={styles.cardContainer}
      >
        <TouchableOpacity
          onPress={() => handleViewStaff(member.id)}
          activeOpacity={0.95}
          style={styles.cardTouchable}
        >
          <BlurView
            intensity={themeType === 'dark' ? 20 : 85}
            tint={themeType}
            style={[
              styles.staffCard,
              {
                borderColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.4)',
              },
            ]}
          >
            <View style={styles.cardContent}>
              {/* Top Row - Name and Status */}
              <View style={styles.topRow}>
                <Text style={[styles.staffName, { color: theme.colors.text }]}>
                  {member.name}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(member.status)}15` }]}> 
                  {getStatusIcon(member.status)}
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(member.status) },
                    ]}
                  >
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Text>
                </View>
              </View>

              {/* Role Row */}
              <View style={styles.roleRow}>
                <FileText size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.roleText, { color: theme.colors.textSecondary }]}> 
                  {member.role}
                </Text>
              </View>

              {/* Phone Row with Chevron */}
              <View style={styles.phoneRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Phone size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.phoneText, { color: theme.colors.text, marginLeft: 6 }]}> 
                    {member?.phone || 'N/A'}
                  </Text>
                </View>
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>
            </View>
          </BlurView>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
      <BlurView
        intensity={themeType === 'dark' ? 20 : 80}
        tint={themeType}
        style={styles.emptyCard}
      >
        <View style={styles.emptyIconContainer}>
          <User
            size={56}
            color={theme.colors.textSecondary}
            strokeWidth={1.5}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
          No staff members
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          Add your first staff member to get started
        </Text>
      </BlurView>
    </Animated.View>
  );

  const renderFloatingActionButton = () => (
    <Animated.View
      entering={FadeIn.delay(500)}
      style={styles.floatingButtonContainer}
    >
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          },
        ]}
        onPress={() => router.push('/staff/form')}
        activeOpacity={0.8}
      >
        <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {renderHeader()}

      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Loading staff...
              </Text>
            </View>
          ) : staff.length > 0 ? (
            <View style={styles.staffList}>
              {staff.map((member, index) =>
                renderStaffCard(member, index)
              )}
            </View>
          ) : (
            renderEmptyState()
          )}
        </ScrollView>
      </View>

      {renderFloatingActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  headerRightSpacer: {
    width: 42,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    overflow: 'hidden',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  staffList: {
    gap: 16,
  },
  cardContainer: {
    marginBottom: 0,
  },
  cardTouchable: {
    borderRadius: 16,
  },
  staffCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '500',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '500'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 80,
  },
  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 48,
    alignItems: 'center',
    overflow: 'hidden',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
});
