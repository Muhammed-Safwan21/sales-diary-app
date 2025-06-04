import { BusinessInfoCard } from '@/components/home/BusinessInfoCard';
import { QuickAction } from '@/components/home/QuickAction';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Package,
  Search,
  Sparkles,
  Wallet,
} from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Ultra-modern header with extended gradient background */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? [
                '#1A1B3A',
                '#2D1B69',
                '#3D2A7A',
                'rgba(61, 42, 122, 0.6)',
                'rgba(26, 27, 58, 0.3)',
                'transparent',
              ]
            : [
                '#6366F1',
                '#8B5CF6',
                '#EC4899',
                'rgba(236, 72, 153, 0.4)',
                'rgba(139, 92, 246, 0.2)',
                'transparent',
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.greetingSection}>
                <Text
                  style={[
                    styles.greeting,
                    { color: 'rgba(255, 255, 255, 0.8)' },
                  ]}
                >
                  Good morning ✨
                </Text>
                <Text style={[styles.userName, { color: '#FFFFFF' }]}>
                  Welcome back, Alex
                </Text>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={[
                    styles.headerButton,
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Search size={18} color="rgba(255, 255, 255, 0.9)" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/notification')}
                  style={[
                    styles.headerButton,
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Bell size={18} color="rgba(255, 255, 255, 0.9)" />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Floating business card - positioned in the gradient fade area */}
      <View style={styles.businessCardContainer}>
        <BusinessInfoCard />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions with modern cards */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionTitleContainer}>
            <Sparkles size={22} color={theme.colors.accent} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Quick Actions
            </Text>
          </View>

          <View style={styles.actionGrid}>
            <QuickAction
              icon={<FileText size={24} color="#FFFFFF" />}
              title="New Invoice"
              subtitle="Create & send invoices"
              route="/invoice/create"
              gradient={['#6366F1', '#8B5CF6']}
            />
            <QuickAction
              icon={<Package size={24} color="#FFFFFF" />}
              title="Add Product"
              subtitle="Manage inventory"
              route="/inventory/add-item"
              gradient={['#EC4899', '#F472B6']}
            />
            <QuickAction
              icon={<CreditCard size={24} color="#FFFFFF" />}
              title="Payment"
              subtitle="Record transactions"
              route="/payments/add"
              gradient={['#06D6A0', '#34D399']}
            />
            <QuickAction
              icon={<Wallet size={24} color="#FFFFFF" />}
              title="Expense"
              subtitle="Track business costs"
              route="/expenses/add"
              gradient={['#F59E0B', '#FBBF24']}
            />
          </View>
        </View>

        {/* Recent Activity with glass card */}
        <BlurView
          intensity={themeType === 'dark' ? 15 : 60}
          tint={themeType}
          style={styles.activitySection}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recent Activity
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text
                style={[styles.viewAllText, { color: theme.colors.primary }]}
              >
                View All
              </Text>
              <ArrowUpRight size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyState}>
            <LinearGradient
              colors={
                themeType === 'dark'
                  ? ['rgba(129, 140, 248, 0.1)', 'rgba(139, 92, 246, 0.1)']
                  : ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']
              }
              style={styles.emptyIconContainer}
            >
              <BarChart3 size={32} color={theme.colors.primary} />
            </LinearGradient>

            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              Ready to start?
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Create your first invoice or add products to see activity here
            </Text>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                },
              ]}
            >
              <Text style={styles.actionButtonText}>Get Started</Text>
              <Sparkles size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    height: 280, // Extended height for natural gradient fade
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  businessCardContainer: {
    position: 'absolute',
    top: 160, // Positioned in the gradient fade area
    left: 20,
    right: 20,
    zIndex: 999,
  },
  scrollView: {
    flex: 1,
    marginTop: -80, // Overlap to create seamless flow
  },
  scrollContent: {
    paddingTop: 200, // Space for the business card and gradient overlap
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  analyticsSection: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  activitySection: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: 280,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
