import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  CreditCard,
  FileBarChart,
  IndianRupee,
  Landmark,
  Package,
  Percent,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const { theme, themeType }: any = useTheme();
  const [showAllReports, setShowAllReports] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const router = useRouter();
  const { branchInfo, financialYear, user } =
  useSelector((state: any) => state.auth);

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 6); // 7 days including today
  const startDate = oneWeekAgo;
  const endDate = today;

  // Define the query key for the report
  const reportQueryKey = ['overall-business-report', user?.id, branchInfo?.id, financialYear?.id];

  const { data: reportData, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: reportQueryKey,
    queryFn: async () => {
      const response = await apiClient.get('/reports/overall-business', {
        params: {
          adminId: user?.id,
          branchId: branchInfo?.id,
          financialYearId: financialYear?.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      return response.data.data;
    },
    enabled: !!(user?.id && branchInfo?.id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });


  // Extract summary and comparison from API response
  const summary = reportData?.graph?.summary || {};
  const comparison = reportData?.comparison || {};
  const chartData = reportData?.graph?.salesPurchaseData || [];

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => themeType === 'dark' 
      ? `rgba(255, 255, 255, ${opacity * 0.4})` 
      : `rgba(0, 0, 0, ${opacity * 0.3})`,
    labelColor: (opacity = 1) => themeType === 'dark'
      ? `rgba(255, 255, 255, ${opacity * 0.6})`
      : `rgba(0, 0, 0, ${opacity * 0.7})`,
    style: {
      borderRadius: 20,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '3',
      stroke: 'transparent',
      fill: theme.colors.primary,
    },
    propsForBackgroundLines: {
      strokeDasharray: '3,3',
      stroke: themeType === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      strokeWidth: 1,
    },
    fillShadowGradient: theme.colors.primary,
    fillShadowGradientOpacity: 0.1,
  };

  const reportItems = [
    { 
      title: 'Sales Report', 
      icon: <FileBarChart size={20} color={theme.colors.primary} />,
      gradient: [theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]
    },
    { 
      title: 'Purchase Report', 
      icon: <ShoppingBag size={20} color={theme.colors.secondary} />,
      gradient: [theme.colors.secondary, theme.colors.secondaryLight || theme.colors.secondary]
    },
    { 
      title: 'Party Report', 
      icon: <Users size={20} color={theme.colors.accent} />,
      gradient: [theme.colors.accent, theme.colors.accentLight || theme.colors.accent]
    },
    { 
      title: 'Payment Collection', 
      icon: <CreditCard size={20} color={theme.colors.success} />,
      gradient: ['#06D6A0', '#34D399']
    },
    { 
      title: 'Daybook', 
      icon: <CalendarDays size={20} color="#F59E0B" />,
      gradient: ['#F59E0B', '#FBBF24']
    },
    { 
      title: 'Profit and Loss', 
      icon: <TrendingUp size={20} color="#EF4444" />,
      gradient: ['#EF4444', '#F87171']
    },
    { 
      title: 'Stock Summary', 
      icon: <Package size={20} color="#8B5CF6" />,
      gradient: ['#8B5CF6', '#A78BFA']
    },
    { 
      title: 'Balance Sheet', 
      icon: <Landmark size={20} color="#06B6D4" />,
      gradient: ['#06B6D4', '#22D3EE']
    },
    { 
      title: 'GST Report', 
      icon: <Percent size={20} color="#EC4899" />,
      gradient: ['#EC4899', '#F472B6']
    },
  ];

  const getRoute = (title: string) => {
    switch (title) {
      case 'Sales Report': return '/reports/sales';
      case 'Purchase Report': return '/reports/purchases';
      case 'Party Report': return '/reports/parties';
      case 'Payment Collection': return '/reports/payments';
      case 'Daybook': return '/reports/daybook';
      case 'Profit and Loss': return '/reports/profit-loss';
      case 'Stock Summary': return '/reports/stock';
      case 'Balance Sheet': return '/reports/balance-sheet';
      case 'GST Report': return '/reports/gst';
      default: return '/reports/sales';
    }
  };

  const renderReportCard = (item: any, index: number) => (
    <Animated.View
      key={index}
      entering={FadeInDown.delay(index * 50)}
    >
      <TouchableOpacity
        style={styles.reportCard}
        onPress={() => router.push(getRoute(item.title))}
        activeOpacity={0.8}
      >
        <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={[
          styles.reportCardContainer,
          {
            borderColor: themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
          }
        ]}>
          {/* Gradient overlay */}
          <LinearGradient
            colors={[
              `${item.gradient[0]}15`,
              `${item.gradient[1]}08`,
              'transparent'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.reportGradientOverlay}
          />
          
          <View style={styles.reportCardContent}>
            <View style={[
              styles.reportIconContainer,
              { 
                backgroundColor: `${item.gradient[0]}20`,
                borderColor: `${item.gradient[0]}30`,
              }
            ]}>
              {item.icon}
            </View>
            
            <View style={styles.reportTextContainer}>
              <Text style={[
                styles.reportCardTitle,
                { color: theme.colors.text }
              ]}>
                {item.title}
              </Text>
              <Text style={[
                styles.reportCardSubtitle,
                { color: theme.colors.textSecondary }
              ]}>
                View detailed analytics
              </Text>
            </View>
          </View>
          
          <View style={[
            styles.arrowContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.05)',
            }
          ]}>
            <ChevronRight size={16} color={theme.colors.textSecondary} />
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading report</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      {/* Modern header with gradient */}
      <LinearGradient
        colors={themeType === 'dark' 
          ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent'] 
          : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerTitleContainer}>
                <BarChart3 size={20} color="#FFFFFF" />
                <Text style={styles.headerTitle}>
                  Reports & Analytics
                </Text>
              </View>
              
              {/* <TouchableOpacity style={styles.exportButton}>
                <Download size={16} color="rgba(255, 255, 255, 0.9)" />
                <Text style={styles.exportText}>Export</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Custom Modern Chart Section */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.chartSection}>
            <LinearGradient
              colors={[
                `${theme.colors.primary}08`,
                `${theme.colors.primary}04`,
                'transparent'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.chartGradientOverlay}
            />
            
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleContainer}>
                <View style={[
                  styles.chartIconContainer,
                  { backgroundColor: `${theme.colors.primary}20` }
                ]}>
                  <Sparkles size={18} color={theme.colors.primary} />
                </View>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                   Overview
                </Text>
              </View>
              
              <TouchableOpacity style={[
                styles.periodButton,
                {
                  backgroundColor: `${theme.colors.primary}15`,
                  borderColor: `${theme.colors.primary}20`,
                }
              ]}>
                <Text style={[styles.periodText, { color: theme.colors.primary }]}>
                  Last Week
                </Text>
                <ArrowUpRight size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Custom Chart Container */}
            <View style={styles.customChartContainer}>
              <BlurView intensity={themeType === 'dark' ? 10 : 60} tint={themeType} style={styles.customChart}>
                <LinearGradient
                  colors={themeType === 'dark' 
                    ? ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.01)', 'transparent']
                    : ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)', 'transparent']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.chartBackgroundGradient}
                />
                
                <View style={styles.chartContent}>
                  {/* Chart Header with Values */}
                  <View style={styles.chartValuesRow}>
                    <View style={styles.chartValue}>
                      <View style={styles.valueHeader}>
                        <View style={[styles.valueDot, { backgroundColor: theme.colors.primary }]} />
                        <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>Sales</Text>
                      </View>
                      <Text style={[styles.valueAmount, { color: theme.colors.primary }]}>₹{summary.totalSales?.toLocaleString('en-IN') ?? 0}</Text>
                      <View style={styles.valueChange}>
                        <TrendingUp size={12} color="#22C55E" />
                        <Text style={[styles.changeText, { color: '#22C55E' }]}>{comparison.sales?.changePercent ?? 0}%</Text>
                      </View>
                    </View>
                    <View style={styles.chartValue}>
                      <View style={styles.valueHeader}>
                        <View style={[styles.valueDot, { backgroundColor: theme.colors.success }]} />
                        <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>Purchases</Text>
                      </View>
                      <Text style={[styles.valueAmount, { color: theme.colors.success }]}>₹{summary.totalPurchases?.toLocaleString('en-IN') ?? 0}</Text>
                      <View style={styles.valueChange}>
                        <TrendingDown size={12} color="#EF4444" />
                        <Text style={[styles.changeText, { color: '#EF4444' }]}> {comparison.purchases?.changePercent ?? 0}%</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Custom Bar Chart */}
                  <View style={styles.barsContainer}>
                    {chartData.map((data: any, index: number) => (
                      <View key={index} style={styles.barGroup}>
                        <View style={styles.barsWrapper}>
                          {/* Sales Bar */}
                          <View style={styles.barContainer}>
                            <LinearGradient
                              colors={[theme.colors.primary, `${theme.colors.primary}80`]}
                              style={[
                                styles.bar,
                                { height: `${data.sales}%` }
                              ]}
                            />
                          </View>
                          {/* Purchases Bar */}
                          <View style={styles.barContainer}>
                            <LinearGradient
                              colors={[theme.colors.success, `${theme.colors.success}80`]}
                              style={[
                                styles.bar,
                                { height: `${data.purchases}%` }
                              ]}
                            />
                          </View>
                        </View>
                        <Text style={[styles.barLabel, { color: theme.colors.textSecondary }]}>
                          {data.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Profit Summary */}
            <View style={styles.profitSummary}>
              <BlurView intensity={themeType === 'dark' ? 10 : 60} tint={themeType} style={styles.profitCard}>
                <LinearGradient
                  colors={['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.profitGradientOverlay}
                />
                <View style={styles.profitContent}>
                  <View style={styles.profitHeader}>
                    <View style={[
                      styles.profitIconContainer,
                      { backgroundColor: 'rgba(34, 197, 94, 0.2)' }
                    ]}>
                      <TrendingUp size={16} color="#22C55E" />
                    </View>
                    <Text style={[styles.profitLabel, { color: theme.colors.textSecondary }]}>Net Profit</Text>
                  </View>
                  <View style={styles.profitValueContainer}>
                    <IndianRupee size={18} color="#22C55E" />
                    <Text style={[styles.profitValue, { color: '#22C55E' }]}> {comparison.netProfit?.current?.toLocaleString('en-IN') ?? 0}</Text>
                  </View>
                  <View style={styles.profitChange}>
                    <View style={styles.profitChangeBadge}>
                      <TrendingUp size={10} color="#22C55E" />
                      <Text style={[styles.profitChangeText, { color: '#22C55E' }]}> {comparison.netProfit?.changePercent ?? 0}% from last month</Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </View>
          </BlurView>
        </Animated.View>

        {/* Reports Section */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <View style={styles.reportsSection}>
            <View style={styles.reportsSectionHeader}>
              <FileBarChart size={18} color={theme.colors.accent} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Detailed Reports
              </Text>
            </View>

            <View style={styles.reportsGrid}>
              {(showAllReports ? reportItems : reportItems.slice(0, 6)).map((item, index) => 
                renderReportCard(item, index)
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.viewMoreButton,
                { 
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                }
              ]}
              onPress={() => setShowAllReports(!showAllReports)}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                style={styles.viewMoreGradient}
              >
                <Text style={styles.viewMoreText}>
                  {showAllReports ? 'Show Less Reports' : 'View All Reports'}
                </Text>
                <ArrowUpRight size={16} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    // paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 20 : 4,
    paddingTop: Platform.OS === 'android' ? 20 : 8,
  },
  headerContent:{

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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  exportText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    // marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chartSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  chartGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    zIndex: 2,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chartIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  periodSelector: {
    position: 'relative',
    zIndex: 2,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customChartContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 2,
  },
  customChart: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  chartBackgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  chartContent: {
    padding: 16,
    position: 'relative',
    zIndex: 2,
  },
  chartValuesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  chartValue: {
    flex: 1,
  },
  valueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  valueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  valueAmount: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  valueChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 3,
    marginBottom: 8,
  },
  barContainer: {
    width: 12,
    height: 100,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 12,
    borderRadius: 6,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  profitSummary: {
    position: 'relative',
    zIndex: 2,
  },
  profitCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    position: 'relative',
  },
  profitGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profitContent: {
    padding: 16,
    position: 'relative',
    zIndex: 2,
  },
  profitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  profitIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profitLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  profitValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  profitValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  profitChange: {
    alignItems: 'flex-start',
  },
  profitChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profitChangeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reportsSection: {
    marginBottom: 32,
  },
  reportsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  reportsGrid: {
    gap: 10,
    marginBottom: 20,
  },
  reportCard: {
    marginBottom: 0,
  },
  reportCardContainer: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  reportGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  reportCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    position: 'relative',
    zIndex: 2,
  },
  reportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  reportCardSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  arrowContainer: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  viewMoreButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
      },
    }),
  },
  viewMoreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});