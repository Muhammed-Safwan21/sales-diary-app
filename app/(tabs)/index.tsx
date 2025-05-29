import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowUpRight, IndianRupee, TrendingUp, TrendingDown, Package, FileText, Wallet, CreditCard } from 'lucide-react-native';
import { BusinessInfoCard } from '@/components/home/BusinessInfoCard';
import { QuickAction } from '@/components/home/QuickAction';
import { SummaryCard } from '@/components/home/SummaryCard';

export default function HomeScreen() {
  const { theme, themeType } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Sales Diary</Text>
        
        <View style={styles.businessInfo}>
          <BusinessInfoCard />
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <QuickAction
              icon={<FileText size={24} color={theme.colors.primary} />}
              title="Create Invoice"
              route="/invoice/create"
            />
            <QuickAction
              icon={<Package size={24} color={theme.colors.primary} />}
              title="Add Item"
              route="/inventory/add-item"
            />
            <QuickAction
              icon={<CreditCard size={24} color={theme.colors.primary} />}
              title="Record Payment"
              route="/payments/add"
            />
            <QuickAction
              icon={<Wallet size={24} color={theme.colors.primary} />}
              title="Add Expense"
              route="/expenses/add"
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium, marginTop: theme.spacing.lg }]}>Business Summary</Text>

        <View style={styles.summaryContainer}>
          <SummaryCard
            title="Sales"
            amount="₹45,280"
            change={+12.5}
            icon={<IndianRupee size={20} color={theme.colors.primary} />}
            trend={<TrendingUp size={16} color={theme.colors.success} />}
          />
          
          <SummaryCard
            title="Purchases"
            amount="₹28,350"
            change={-8.3}
            icon={<Wallet size={20} color={theme.colors.secondary} />}
            trend={<TrendingDown size={16} color={theme.colors.error} />}
          />
          
          <SummaryCard
            title="Receivables"
            amount="₹12,830"
            change={+5.2}
            icon={<ArrowUpRight size={20} color={theme.colors.warning} />}
            trend={<TrendingUp size={16} color={theme.colors.success} />}
          />
        </View>
        
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: theme.colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.activityCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>No recent activity found</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 6 : 0,
    paddingHorizontal: 16,
    paddingBottom: 96,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  businessInfo: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  quickActions: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activitySection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
  },
  activityCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  emptyText: {
    fontSize: 14,
  },
});