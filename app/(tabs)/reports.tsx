// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   FileBarChart,
//   IndianRupee,
//   Download,
//   ChevronRight,
//   Users,
//   ShoppingBag,
//   CreditCard,
//   Package,
//   TrendingUp,
//   Landmark,
//   Percent,
//   CalendarDays,
// } from 'lucide-react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { useRouter } from 'expo-router';

// export default function ReportsScreen() {
//   const { theme } = useTheme();
//   const [showAllReports, setShowAllReports] = useState(false);
//   const router = useRouter();

//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//         color: () => theme.colors.primary,
//         strokeWidth: 2,
//       },
//       {
//         data: [10, 25, 16, 55, 70, 35],
//         color: () => theme.colors.secondary,
//         strokeWidth: 2,
//       },
//     ],
//     legend: ['Sales', 'Purchases'],
//   };

//   const chartConfig = {
//     backgroundColor: theme.colors.card,
//     backgroundGradientFrom: theme.colors.card,
//     backgroundGradientTo: theme.colors.card,
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     labelColor: (opacity = 1) => theme.colors.text,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '6',
//       strokeWidth: '2',
//       stroke: theme.colors.primary,
//     },
//   };

//   const reportItems = [
//     { title: 'Sales Report', icon: <FileBarChart size={20} color={theme.colors.primary} /> },
//     { title: 'Purchase Report', icon: <ShoppingBag size={20} color={theme.colors.secondary} /> },
//     { title: 'Party Report', icon: <Users size={20} color={theme.colors.accent} /> },
//     { title: 'Payment Collection', icon: <CreditCard size={20} color={theme.colors.success} /> },
//     { title: 'Daybook', icon: <CalendarDays size={20} color={theme.colors.success} /> },
//     { title: 'Profit and Loss', icon: <TrendingUp size={20} color={theme.colors.success} /> },
//     { title: 'Stock Summary', icon: <Package size={20} color={theme.colors.success} /> },
//     { title: 'Balance Sheet', icon: <Landmark size={20} color={theme.colors.success} /> },
//     { title: 'GST Report', icon: <Percent size={20} color={theme.colors.success} /> },
//   ];

//   const renderReportCard = (title: string, icon: React.ReactNode) => {
//     const getRoute = () => {
//       switch (title) {
//         case 'Sales Report':
//           return '/reports/sales';
//         case 'Purchase Report':
//           return '/reports/purchases';
//         case 'Party Report':
//           return '/reports/parties';
//         case 'Payment Collection':
//           return '/reports/payments';
//         case 'Daybook':
//           return '/reports/daybook';
//         case 'Profit and Loss':
//           return '/reports/profit-loss';
//         case 'Stock Summary':
//           return '/reports/stock';
//         case 'Balance Sheet':
//           return '/reports/balance-sheet';
//         case 'GST Report':
//           return '/reports/gst';
//         default:
//           return '/reports/sales';
//       }
//     };

//     return (
//       <TouchableOpacity
//         style={[
//           styles.reportCard,
//           {
//             backgroundColor: theme.colors.card,
//             borderColor: theme.colors.border,
//             shadowColor: theme.colors.shadow,
//           },
//         ]}
//         onPress={() => router.push(getRoute())}
//       >
//         <View style={styles.reportCardContent}>
//           <View style={styles.reportCardIcon}>{icon}</View>
//           <Text
//             style={[
//               styles.reportCardTitle,
//               {
//                 color: theme.colors.text,
//                 fontFamily: theme.typography.fontFamily.medium,
//               },
//             ]}
//           >
//             {title}
//           </Text>
//         </View>
//         <ChevronRight size={20} color={theme.colors.textLight} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <View
//         style={[
//           styles.header,
//           {
//             backgroundColor: theme.colors.card,
//             borderBottomColor: theme.colors.border,
//           },
//         ]}
//       >
//         <Text
//           style={[
//             styles.headerTitle,
//             {
//               color: theme.colors.text,
//               fontFamily: theme.typography.fontFamily.bold,
//             },
//           ]}
//         >
//           Reports & Analytics
//         </Text>
//         <TouchableOpacity
//           style={[
//             styles.downloadButton,
//             { backgroundColor: theme.colors.primaryLight },
//           ]}
//         >
//           <Download size={16} color={theme.colors.primary} />
//           <Text
//             style={[
//               styles.downloadText,
//               {
//                 color: theme.colors.primary,
//                 fontFamily: theme.typography.fontFamily.medium,
//               },
//             ]}
//           >
//             Export
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.chartSection}>
//           <Text
//             style={[
//               styles.sectionTitle,
//               {
//                 color: theme.colors.text,
//                 fontFamily: theme.typography.fontFamily.medium,
//               },
//             ]}
//           >
//             Business Overview
//           </Text>

//           <View
//             style={[
//               styles.chartCard,
//               {
//                 backgroundColor: theme.colors.card,
//                 borderColor: theme.colors.border,
//               },
//             ]}
//           >
//             <View style={styles.chartHeader}>
//               <Text
//                 style={[
//                   styles.chartTitle,
//                   {
//                     color: theme.colors.text,
//                     fontFamily: theme.typography.fontFamily.medium,
//                   },
//                 ]}
//               >
//                 Sales vs Purchases
//               </Text>
//               <TouchableOpacity>
//                 <Text
//                   style={[styles.periodText, { color: theme.colors.primary }]}
//                 >
//                   Last 6 months
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.chartContainer}>
//               <LineChart
//                 data={data}
//                 width={Platform.OS === 'web' ? 600 : 320}
//                 height={220}
//                 chartConfig={chartConfig}
//                 bezier
//                 style={styles.chart}
//                 yAxisLabel="₹"
//                 yAxisSuffix="k"
//                 withInnerLines={true}
//                 withOuterLines={true}
//                 withVerticalLines={false}
//                 withHorizontalLines={true}
//                 withDots={true}
//                 withShadow={true}
//                 withVerticalLabels={true}
//                 withHorizontalLabels={true}
//                 fromZero={true}
//               />
//             </View>

//             <View style={styles.summaryRow}>
//               <View style={styles.summaryItem}>
//                 <Text
//                   style={[
//                     styles.summaryLabel,
//                     { color: theme.colors.textLight },
//                   ]}
//                 >
//                   Total Sales
//                 </Text>
//                 <View style={styles.summaryValue}>
//                   <IndianRupee size={16} color={theme.colors.primary} />
//                   <Text
//                     style={[styles.summaryAmount, { color: theme.colors.text }]}
//                   >
//                     2,85,450
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.summaryItem}>
//                 <Text
//                   style={[
//                     styles.summaryLabel,
//                     { color: theme.colors.textLight },
//                   ]}
//                 >
//                   Total Purchases
//                 </Text>
//                 <View style={styles.summaryValue}>
//                   <IndianRupee size={16} color={theme.colors.secondary} />
//                   <Text
//                     style={[styles.summaryAmount, { color: theme.colors.text }]}
//                   >
//                     1,98,325
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.reportsSection}>
//           <Text
//             style={[
//               styles.sectionTitle,
//               {
//                 color: theme.colors.text,
//                 fontFamily: theme.typography.fontFamily.medium,
//               },
//             ]}
//           >
//             Detailed Reports
//           </Text>

//           {(showAllReports ? reportItems : reportItems.slice(0, 3)).map((item, index) => (
//             <View key={index}>
//               {renderReportCard(item.title, item.icon)}
//             </View>
//           ))}

//           <TouchableOpacity
//             style={[
//               styles.viewMoreButton,
//               { backgroundColor: theme.colors.primaryLight },
//             ]}
//             onPress={() => setShowAllReports(!showAllReports)}
//           >
//             <Text
//               style={[
//                 styles.viewMoreText,
//                 {
//                   color: theme.colors.primary,
//                   fontFamily: theme.typography.fontFamily.medium,
//                 },
//               ]}
//             >
//               {showAllReports ? 'View Less' : 'View More'}
//             </Text>
//           </TouchableOpacity>
//         </View>
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
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: Platform.OS === 'android' ? 25 : 0,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//   },
//   headerTitle: {
//     fontSize: 18,
//   },
//   downloadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   downloadText: {
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//   },
//   chartSection: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   chartCard: {
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//       web: {
//         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//       },
//     }),
//   },
//   chartHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   chartTitle: {
//     fontSize: 16,
//   },
//   periodText: {
//     fontSize: 14,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   chart: {
//     borderRadius: 12,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   summaryItem: {
//     flex: 1,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   summaryValue: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   summaryAmount: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   reportsSection: {
//     marginBottom: 24,
//   },
//   reportCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//       web: {
//         boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
//       },
//     }),
//   },
//   reportCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   reportCardIcon: {
//     marginRight: 12,
//   },
//   reportCardTitle: {
//     fontSize: 16,
//   },
//   viewMoreButton: {
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   viewMoreText: {
//     fontSize: 16,
//   },
// });

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
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

export default function ReportsScreen() {
  const { theme, themeType }: any = useTheme();
  const [showAllReports, setShowAllReports] = useState(false);
  const router = useRouter();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => theme.colors.primary,
        strokeWidth: 3,
      },
      {
        data: [10, 25, 16, 55, 70, 35],
        color: () => theme.colors.accent,
        strokeWidth: 3,
      },
    ],
    legend: ['Sales', 'Purchases'],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => themeType === 'dark' 
      ? `rgba(255, 255, 255, ${opacity * 0.8})` 
      : `rgba(0, 0, 0, ${opacity * 0.6})`,
    labelColor: (opacity = 1) => themeType === 'dark'
      ? `rgba(255, 255, 255, ${opacity * 0.7})`
      : `rgba(0, 0, 0, ${opacity * 0.8})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: themeType === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
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
    <TouchableOpacity
      key={index}
      style={styles.reportCard}
      onPress={() => router.push(getRoute(item.title))}
      activeOpacity={0.8}
    >
      <View style={[
        styles.reportCardContainer,
        {
          backgroundColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.8)',
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
      </View>
    </TouchableOpacity>
  );

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
                <BarChart3 size={24} color="#FFFFFF" />
                <Text style={styles.headerTitle}>
                  Reports & Analytics
                </Text>
              </View>
              
              <TouchableOpacity style={styles.exportButton}>
                <Download size={16} color="rgba(255, 255, 255, 0.9)" />
                <Text style={styles.exportText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Chart Section with Glass Effect */}
        <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleContainer}>
              <Sparkles size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Business Overview
              </Text>
            </View>
            <TouchableOpacity style={styles.periodButton}>
              <Text style={[styles.periodText, { color: theme.colors.primary }]}>
                Last 6 months
              </Text>
              <ArrowUpRight size={14} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <LineChart
              data={data}
              width={Platform.OS === 'web' ? 600 : 320}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              yAxisLabel="₹"
              yAxisSuffix="k"
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              withDots={true}
              withShadow={false}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={true}
            />
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryHeader}>
                <View style={[styles.summaryDot, { backgroundColor: theme.colors.primary }]} />
                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                  Total Sales
                </Text>
              </View>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>
                  2,85,450
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <View style={styles.summaryHeader}>
                <View style={[styles.summaryDot, { backgroundColor: theme.colors.accent }]} />
                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                  Total Purchases
                </Text>
              </View>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.accent} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>
                  1,98,325
                </Text>
              </View>
            </View>
          </View>
        </BlurView>

        {/* Reports Section */}
        <View style={styles.reportsSection}>
          <View style={styles.reportsSectionHeader}>
            <FileBarChart size={22} color={theme.colors.accent} />
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
            <Text style={styles.viewMoreText}>
              {showAllReports ? 'Show Less Reports' : 'View All Reports'}
            </Text>
            <ArrowUpRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
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
  chartSection: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    borderRadius: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 24,
  },
  summaryItem: {
    flex: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  summaryValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  reportsSection: {
    marginBottom: 32,
  },
  reportsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  reportsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  reportCard: {
    marginBottom: 0,
  },
  reportCardContainer: {
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
    padding: 16,
    position: 'relative',
    zIndex: 2,
  },
  reportIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  reportCardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
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
  viewMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});