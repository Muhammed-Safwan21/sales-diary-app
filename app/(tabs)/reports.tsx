import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FileBarChart,
  IndianRupee,
  Download,
  ChevronRight,
  Users,
  ShoppingBag,
  CreditCard,
  Package,
  TrendingUp,
  Landmark,
  Percent,
  CalendarDays,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

export default function ReportsScreen() {
  const { theme } = useTheme();
  const [showAllReports, setShowAllReports] = useState(false);
  const router = useRouter();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
      {
        data: [10, 25, 16, 55, 70, 35],
        color: () => theme.colors.secondary,
        strokeWidth: 2,
      },
    ],
    legend: ['Sales', 'Purchases'],
  };

  const chartConfig = {
    backgroundColor: theme.colors.card,
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  const reportItems = [
    { title: 'Sales Report', icon: <FileBarChart size={20} color={theme.colors.primary} /> },
    { title: 'Purchase Report', icon: <ShoppingBag size={20} color={theme.colors.secondary} /> },
    { title: 'Party Report', icon: <Users size={20} color={theme.colors.accent} /> },
    { title: 'Payment Collection', icon: <CreditCard size={20} color={theme.colors.success} /> },
    { title: 'Daybook', icon: <CalendarDays size={20} color={theme.colors.success} /> },
    { title: 'Profit and Loss', icon: <TrendingUp size={20} color={theme.colors.success} /> },
    { title: 'Stock Summary', icon: <Package size={20} color={theme.colors.success} /> },
    { title: 'Balance Sheet', icon: <Landmark size={20} color={theme.colors.success} /> },
    { title: 'GST Report', icon: <Percent size={20} color={theme.colors.success} /> },
  ];

  const renderReportCard = (title: string, icon: React.ReactNode) => {
    const getRoute = () => {
      switch (title) {
        case 'Sales Report':
          return '/reports/sales';
        case 'Purchase Report':
          return '/reports/purchases';
        case 'Party Report':
          return '/reports/parties';
        case 'Payment Collection':
          return '/reports/payments';
        case 'Daybook':
          return '/reports/daybook';
        case 'Profit and Loss':
          return '/reports/profit-loss';
        case 'Stock Summary':
          return '/reports/stock';
        case 'Balance Sheet':
          return '/reports/balance-sheet';
        case 'GST Report':
          return '/reports/gst';
        default:
          return '/reports/sales';
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.reportCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
          },
        ]}
        onPress={() => router.push(getRoute())}
      >
        <View style={styles.reportCardContent}>
          <View style={styles.reportCardIcon}>{icon}</View>
          <Text
            style={[
              styles.reportCardTitle,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            {title}
          </Text>
        </View>
        <ChevronRight size={20} color={theme.colors.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.card,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          Reports & Analytics
        </Text>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            { backgroundColor: theme.colors.primaryLight },
          ]}
        >
          <Download size={16} color={theme.colors.primary} />
          <Text
            style={[
              styles.downloadText,
              {
                color: theme.colors.primary,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            Export
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.chartSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            Business Overview
          </Text>

          <View
            style={[
              styles.chartCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.chartHeader}>
              <Text
                style={[
                  styles.chartTitle,
                  {
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily.medium,
                  },
                ]}
              >
                Sales vs Purchases
              </Text>
              <TouchableOpacity>
                <Text
                  style={[styles.periodText, { color: theme.colors.primary }]}
                >
                  Last 6 months
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
              <LineChart
                data={data}
                width={Platform.OS === 'web' ? 600 : 320}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                yAxisLabel="₹"
                yAxisSuffix="k"
                withInnerLines={true}
                withOuterLines={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                withShadow={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                fromZero={true}
              />
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: theme.colors.textLight },
                  ]}
                >
                  Total Sales
                </Text>
                <View style={styles.summaryValue}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text
                    style={[styles.summaryAmount, { color: theme.colors.text }]}
                  >
                    2,85,450
                  </Text>
                </View>
              </View>

              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: theme.colors.textLight },
                  ]}
                >
                  Total Purchases
                </Text>
                <View style={styles.summaryValue}>
                  <IndianRupee size={16} color={theme.colors.secondary} />
                  <Text
                    style={[styles.summaryAmount, { color: theme.colors.text }]}
                  >
                    1,98,325
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.reportsSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            Detailed Reports
          </Text>

          {(showAllReports ? reportItems : reportItems.slice(0, 3)).map((item, index) => (
            <View key={index}>
              {renderReportCard(item.title, item.icon)}
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.viewMoreButton,
              { backgroundColor: theme.colors.primaryLight },
            ]}
            onPress={() => setShowAllReports(!showAllReports)}
          >
            <Text
              style={[
                styles.viewMoreText,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.typography.fontFamily.medium,
                },
              ]}
            >
              {showAllReports ? 'View Less' : 'View More'}
            </Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  downloadText: {
    fontSize: 14,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  chartSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  chartCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
  },
  periodText: {
    fontSize: 14,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  reportsSection: {
    marginBottom: 24,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  reportCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportCardIcon: {
    marginRight: 12,
  },
  reportCardTitle: {
    fontSize: 16,
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewMoreText: {
    fontSize: 16,
  },
});