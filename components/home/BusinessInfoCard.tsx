import { useTheme } from '@/context/ThemeContext';
import { Calendar, Settings, Star } from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'expo-router';

dayjs.extend(utc);

export const BusinessInfoCard = () => {
  const { theme }: any = useTheme();
  const router: any = useRouter();
  const {
    branchInfo,
    configuration,
    countryInfo,
    financialYear,
    user,
    accessToken,
  } = useSelector((state: any) => state.auth);
  console.log('accessTokenaccessTokenaccessToken', accessToken);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadowMedium,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.businessDetails}>
          <Text
            style={[
              styles.businessName,
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            My Business Store
          </Text>
          <Text
            style={[
              styles.businessType,
              { color: theme.colors.textSecondary, fontWeight: '500' },
            ]}
          >
            Retail & E-commerce
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.settingsButton,
            { backgroundColor: theme.colors.background },
          ]}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/more')}
        >
          <Settings size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <View style={styles.infoHeader}>
              <Star size={14} color={theme.colors.warning} />
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary, fontWeight: '500' },
                ]}
              >
                Plan
              </Text>
            </View>
            <Text
              style={[
                styles.infoValue,
                { color: theme.colors.primary, fontWeight: '600' },
              ]}
            >
              Silver Pro
            </Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoHeader}>
              <Calendar size={14} color={theme.colors.accent} />
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary, fontWeight: '500' },
                ]}
              >
                Valid Until
              </Text>
            </View>
            <Text
              style={[
                styles.infoValue,
                { color: theme.colors.text, fontWeight: '600' },
              ]}
            >
              {/* {user?.subscriptionExpiry}
              {user?.subscriptionExpiry ? formatDate(user.subscriptionExpiry) : 'N/A'} */}
              {dayjs(user?.subscriptionExpiry).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBar,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: theme.colors.success },
              ]}
            />
            <Text
              style={[styles.statusText, { color: theme.colors.textSecondary }]}
            >
              All systems operational
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    zIndex: 999,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  businessDetails: {
    flex: 1,
    marginRight: 16,
  },
  businessName: {
    fontSize: 18,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  businessType: {
    fontSize: 13,
    letterSpacing: -0.1,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  infoSection: {
    padding: 20,
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  infoValue: {
    fontSize: 14,
    letterSpacing: -0.2,
  },
  statusBar: {
    borderRadius: 8,
    padding: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
});
