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
// import { StatusBar } from 'expo-status-bar';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
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
//   BarChart3,
//   ArrowUpRight,
//   Sparkles,
// } from 'lucide-react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { useRouter } from 'expo-router';

// export default function ReportsScreen() {
//   const { theme, themeType }: any = useTheme();
//   const [showAllReports, setShowAllReports] = useState(false);
//   const router = useRouter();

//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//         color: () => theme.colors.primary,
//         strokeWidth: 3,
//       },
//       {
//         data: [10, 25, 16, 55, 70, 35],
//         color: () => theme.colors.accent,
//         strokeWidth: 3,
//       },
//     ],
//     legend: ['Sales', 'Purchases'],
//   };

//   const chartConfig = {
//     backgroundColor: 'transparent',
//     backgroundGradientFrom: 'transparent',
//     backgroundGradientTo: 'transparent',
//     decimalPlaces: 0,
//     color: (opacity = 1) => themeType === 'dark' 
//       ? `rgba(255, 255, 255, ${opacity * 0.8})` 
//       : `rgba(0, 0, 0, ${opacity * 0.6})`,
//     labelColor: (opacity = 1) => themeType === 'dark'
//       ? `rgba(255, 255, 255, ${opacity * 0.7})`
//       : `rgba(0, 0, 0, ${opacity * 0.8})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: theme.colors.primary,
//     },
//     propsForBackgroundLines: {
//       strokeDasharray: '',
//       stroke: themeType === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
//     },
//   };

//   const reportItems = [
//     { 
//       title: 'Sales Report', 
//       icon: <FileBarChart size={20} color={theme.colors.primary} />,
//       gradient: [theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]
//     },
//     { 
//       title: 'Purchase Report', 
//       icon: <ShoppingBag size={20} color={theme.colors.secondary} />,
//       gradient: [theme.colors.secondary, theme.colors.secondaryLight || theme.colors.secondary]
//     },
//     { 
//       title: 'Party Report', 
//       icon: <Users size={20} color={theme.colors.accent} />,
//       gradient: [theme.colors.accent, theme.colors.accentLight || theme.colors.accent]
//     },
//     { 
//       title: 'Payment Collection', 
//       icon: <CreditCard size={20} color={theme.colors.success} />,
//       gradient: ['#06D6A0', '#34D399']
//     },
//     { 
//       title: 'Daybook', 
//       icon: <CalendarDays size={20} color="#F59E0B" />,
//       gradient: ['#F59E0B', '#FBBF24']
//     },
//     { 
//       title: 'Profit and Loss', 
//       icon: <TrendingUp size={20} color="#EF4444" />,
//       gradient: ['#EF4444', '#F87171']
//     },
//     { 
//       title: 'Stock Summary', 
//       icon: <Package size={20} color="#8B5CF6" />,
//       gradient: ['#8B5CF6', '#A78BFA']
//     },
//     { 
//       title: 'Balance Sheet', 
//       icon: <Landmark size={20} color="#06B6D4" />,
//       gradient: ['#06B6D4', '#22D3EE']
//     },
//     { 
//       title: 'GST Report', 
//       icon: <Percent size={20} color="#EC4899" />,
//       gradient: ['#EC4899', '#F472B6']
//     },
//   ];

//   const getRoute = (title: string) => {
//     switch (title) {
//       case 'Sales Report': return '/reports/sales';
//       case 'Purchase Report': return '/reports/purchases';
//       case 'Party Report': return '/reports/parties';
//       case 'Payment Collection': return '/reports/payments';
//       case 'Daybook': return '/reports/daybook';
//       case 'Profit and Loss': return '/reports/profit-loss';
//       case 'Stock Summary': return '/reports/stock';
//       case 'Balance Sheet': return '/reports/balance-sheet';
//       case 'GST Report': return '/reports/gst';
//       default: return '/reports/sales';
//     }
//   };

//   const renderReportCard = (item: any, index: number) => (
//     <TouchableOpacity
//       key={index}
//       style={styles.reportCard}
//       onPress={() => router.push(getRoute(item.title))}
//       activeOpacity={0.8}
//     >
//       <View style={[
//         styles.reportCardContainer,
//         {
//           backgroundColor: themeType === 'dark'
//             ? 'rgba(255, 255, 255, 0.05)'
//             : 'rgba(255, 255, 255, 0.8)',
//           borderColor: themeType === 'dark'
//             ? 'rgba(255, 255, 255, 0.08)'
//             : 'rgba(0, 0, 0, 0.06)',
//         }
//       ]}>
//         {/* Gradient overlay */}
//         <LinearGradient
//           colors={[
//             `${item.gradient[0]}15`,
//             `${item.gradient[1]}08`,
//             'transparent'
//           ]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.reportGradientOverlay}
//         />
        
//         <View style={styles.reportCardContent}>
//           <View style={[
//             styles.reportIconContainer,
//             { 
//               backgroundColor: `${item.gradient[0]}20`,
//               borderColor: `${item.gradient[0]}30`,
//             }
//           ]}>
//             {item.icon}
//           </View>
          
//           <View style={styles.reportTextContainer}>
//             <Text style={[
//               styles.reportCardTitle,
//               { color: theme.colors.text }
//             ]}>
//               {item.title}
//             </Text>
//             <Text style={[
//               styles.reportCardSubtitle,
//               { color: theme.colors.textSecondary }
//             ]}>
//               View detailed analytics
//             </Text>
//           </View>
//         </View>
        
//         <View style={[
//           styles.arrowContainer,
//           {
//             backgroundColor: themeType === 'dark'
//               ? 'rgba(255, 255, 255, 0.08)'
//               : 'rgba(0, 0, 0, 0.05)',
//           }
//         ]}>
//           <ChevronRight size={16} color={theme.colors.textSecondary} />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
//       {/* Modern header with gradient */}
//       <LinearGradient
//         colors={themeType === 'dark' 
//           ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent'] 
//           : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
//         }
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.header}>
//             <View style={styles.headerContent}>
//               <View style={styles.headerTitleContainer}>
//                 <BarChart3 size={24} color="#FFFFFF" />
//                 <Text style={styles.headerTitle}>
//                   Reports & Analytics
//                 </Text>
//               </View>
              
//               <TouchableOpacity style={styles.exportButton}>
//                 <Download size={16} color="rgba(255, 255, 255, 0.9)" />
//                 <Text style={styles.exportText}>Export</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Chart Section with Glass Effect */}
//         <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.chartSection}>
//           <View style={styles.chartHeader}>
//             <View style={styles.chartTitleContainer}>
//               <Sparkles size={20} color={theme.colors.primary} />
//               <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
//                 Business Overview
//               </Text>
//             </View>
//             <TouchableOpacity style={styles.periodButton}>
//               <Text style={[styles.periodText, { color: theme.colors.primary }]}>
//                 Last 6 months
//               </Text>
//               <ArrowUpRight size={14} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.chartContainer}>
//             <LineChart
//               data={data}
//               width={Platform.OS === 'web' ? 600 : 320}
//               height={200}
//               chartConfig={chartConfig}
//               bezier
//               style={styles.chart}
//               yAxisLabel="₹"
//               yAxisSuffix="k"
//               withInnerLines={false}
//               withOuterLines={false}
//               withVerticalLines={false}
//               withHorizontalLines={true}
//               withDots={true}
//               withShadow={false}
//               withVerticalLabels={true}
//               withHorizontalLabels={true}
//               fromZero={true}
//             />
//           </View>

//           <View style={styles.summaryRow}>
//             <View style={styles.summaryItem}>
//               <View style={styles.summaryHeader}>
//                 <View style={[styles.summaryDot, { backgroundColor: theme.colors.primary }]} />
//                 <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
//                   Total Sales
//                 </Text>
//               </View>
//               <View style={styles.summaryValue}>
//                 <IndianRupee size={16} color={theme.colors.primary} />
//                 <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>
//                   2,85,450
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.summaryItem}>
//               <View style={styles.summaryHeader}>
//                 <View style={[styles.summaryDot, { backgroundColor: theme.colors.accent }]} />
//                 <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
//                   Total Purchases
//                 </Text>
//               </View>
//               <View style={styles.summaryValue}>
//                 <IndianRupee size={16} color={theme.colors.accent} />
//                 <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>
//                   1,98,325
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </BlurView>

//         {/* Reports Section */}
//         <View style={styles.reportsSection}>
//           <View style={styles.reportsSectionHeader}>
//             <FileBarChart size={22} color={theme.colors.accent} />
//             <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
//               Detailed Reports
//             </Text>
//           </View>

//           <View style={styles.reportsGrid}>
//             {(showAllReports ? reportItems : reportItems.slice(0, 6)).map((item, index) => 
//               renderReportCard(item, index)
//             )}
//           </View>

//           <TouchableOpacity
//             style={[
//               styles.viewMoreButton,
//               { 
//                 backgroundColor: theme.colors.primary,
//                 shadowColor: theme.colors.primary,
//               }
//             ]}
//             onPress={() => setShowAllReports(!showAllReports)}
//           >
//             <Text style={styles.viewMoreText}>
//               {showAllReports ? 'Show Less Reports' : 'View All Reports'}
//             </Text>
//             <ArrowUpRight size={16} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerGradient: {
//     paddingBottom: 20,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 12 : 8,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   headerTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.3,
//   },
//   exportButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   exportText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: 'rgba(255, 255, 255, 0.9)',
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: -30,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   chartSection: {
//     borderRadius: 24,
//     padding: 24,
//     marginBottom: 32,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//   },
//   chartHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   chartTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//   },
//   periodButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   periodText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   chart: {
//     borderRadius: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     gap: 24,
//   },
//   summaryItem: {
//     flex: 1,
//   },
//   summaryHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 8,
//   },
//   summaryDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     letterSpacing: -0.1,
//   },
//   summaryValue: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   summaryAmount: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   reportsSection: {
//     marginBottom: 32,
//   },
//   reportsSectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 20,
//   },
//   reportsGrid: {
//     gap: 12,
//     marginBottom: 24,
//   },
//   reportCard: {
//     marginBottom: 0,
//   },
//   reportCardContainer: {
//     borderRadius: 16,
//     borderWidth: 1,
//     overflow: 'hidden',
//     position: 'relative',
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.08,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 2,
//       },
//       web: {
//         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
//       },
//     }),
//   },
//   reportGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   reportCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     position: 'relative',
//     zIndex: 2,
//   },
//   reportIconContainer: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     marginRight: 16,
//   },
//   reportTextContainer: {
//     flex: 1,
//   },
//   reportCardTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.2,
//     marginBottom: 2,
//   },
//   reportCardSubtitle: {
//     fontSize: 12,
//     fontWeight: '500',
//     letterSpacing: -0.1,
//   },
//   arrowContainer: {
//     position: 'absolute',
//     right: 16,
//     top: '50%',
//     transform: [{ translateY: -12 }],
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 3,
//   },
//   viewMoreButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     paddingVertical: 16,
//     borderRadius: 16,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//       web: {
//         boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
//       },
//     }),
//   },
//   viewMoreText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
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
  Dimensions,
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
  TrendingDown,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const { theme, themeType }: any = useTheme();
  const [showAllReports, setShowAllReports] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
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
        color: () => theme.colors.success,
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
                  Business Overview
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
                  Last 6 months
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
                        <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>
                          Sales
                        </Text>
                      </View>
                      <Text style={[styles.valueAmount, { color: theme.colors.primary }]}>
                        ₹2,85,450
                      </Text>
                      <View style={styles.valueChange}>
                        <TrendingUp size={12} color="#22C55E" />
                        <Text style={[styles.changeText, { color: '#22C55E' }]}>+12%</Text>
                      </View>
                    </View>
                    
                    <View style={styles.chartValue}>
                      <View style={styles.valueHeader}>
                        <View style={[styles.valueDot, { backgroundColor: theme.colors.success }]} />
                        <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>
                          Purchases
                        </Text>
                      </View>
                      <Text style={[styles.valueAmount, { color: theme.colors.success }]}>
                        ₹1,98,325
                      </Text>
                      <View style={styles.valueChange}>
                        <TrendingDown size={12} color="#EF4444" />
                        <Text style={[styles.changeText, { color: '#EF4444' }]}>-5%</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Custom Bar Chart */}
                  <View style={styles.barsContainer}>
                    {[
                      { month: 'Jan', sales: 20, purchases: 10 },
                      { month: 'Feb', sales: 45, purchases: 25 },
                      { month: 'Mar', sales: 28, purchases: 16 },
                      { month: 'Apr', sales: 80, purchases: 55 },
                      { month: 'May', sales: 99, purchases: 70 },
                      { month: 'Jun', sales: 43, purchases: 35 },
                    ].map((data, index) => (
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
                          {data.month}
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
                    <Text style={[styles.profitLabel, { color: theme.colors.textSecondary }]}>
                      Net Profit
                    </Text>
                  </View>
                  <View style={styles.profitValueContainer}>
                    <IndianRupee size={18} color="#22C55E" />
                    <Text style={[styles.profitValue, { color: '#22C55E' }]}>
                      87,125
                    </Text>
                  </View>
                  <View style={styles.profitChange}>
                    <View style={styles.profitChangeBadge}>
                      <TrendingUp size={10} color="#22C55E" />
                      <Text style={[styles.profitChangeText, { color: '#22C55E' }]}>
                        +8.5% from last month
                      </Text>
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
    marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
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
  // customChartContainer: {
  //   marginBottom: 20,
  //   position: 'relative',
  //   zIndex: 2,
  // },
  // customChart: {
  //   borderRadius: 16,
  //   borderWidth: 1,
  //   borderColor: 'rgba(255, 255, 255, 0.1)',
  //   overflow: 'hidden',
  //   position: 'relative',
  // },
  // chartValuesRow: {
  //   flexDirection: 'row',
  //   gap: 16,
  //   marginBottom: 24,
  // },
  // chartValue: {
  //   flex: 1,
  // },
  // valueHeader: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 6,
  //   marginBottom: 8,
  // },
  // valueDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  // },
  // valueLabel: {
  //   fontSize: 12,
  //   fontWeight: '500',
  // },
  // valueAmount: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   letterSpacing: -0.3,
  //   marginBottom: 4,
  // },
  // valueChange: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 3,
  // },
  // changeText: {
  //   fontSize: 11,
  //   fontWeight: '600',
  // },
  // barsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  //   height: 120,
  //   paddingHorizontal: 8,
  // },
  // barGroup: {
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // barsWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  //   height: 100,
  //   gap: 3,
  //   marginBottom: 8,
  // },
  // barContainer: {
  //   width: 12,
  //   height: 100,
  //   justifyContent: 'flex-end',
  // },
  // bar: {
  //   width: 12,
  //   borderRadius: 6,
  //   minHeight: 8,
  // },
  // barLabel: {
  //   fontSize: 10,
  //   fontWeight: '500',
  // },
  // profitSummary: {
  //   position: 'relative',
  //   zIndex: 2,
  // },
  // profitCard: {
  //   borderRadius: 12,
  //   borderWidth: 1,
  //   borderColor: 'rgba(255, 255, 255, 0.08)',
  //   overflow: 'hidden',
  //   position: 'relative',
  // },
  // profitGradientOverlay: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  // profitContent: {
  //   padding: 16,
  //   position: 'relative',
  //   zIndex: 2,
  // },
  // profitHeader: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // profitIconContainer: {
  //   width: 24,
  //   height: 24,
  //   borderRadius: 6,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // profitLabel: {
  //   fontSize: 13,
  //   fontWeight: '500',
  // },
  // profitValueContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 4,
  //   marginBottom: 8,
  // },
  // profitValue: {
  //   fontSize: 22,
  //   fontWeight: '700',
  //   letterSpacing: -0.3,
  // },
  // profitChange: {
  //   alignItems: 'flex-start',
  // },
  // profitChangeBadge: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 4,
  // },
  // profitChangeText: {
  //   fontSize: 12,
  //   fontWeight: '500',
  // },
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