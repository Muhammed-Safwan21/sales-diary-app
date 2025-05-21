// import { useAuthSession } from "@/app/providers/AuthProvider";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { Link, useNavigation } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   Dimensions,
//   Image,
//   Animated,
// } from "react-native";
// // import styles from "../styles";
// import { StyleSheet } from "react-native";

// export default function AnalyticsDashboard() {
//   const [activeChartTab, setActiveChartTab] = useState("week");
//   const navigation: any = useNavigation();
//   // Sample data for revenue chart
//   const revenueData: any = {
//     week: [4500, 5200, 3800, 6100, 5800, 7200, 6800],
//     month: [18000, 22000, 25000, 20000],
//     year: [220000, 280000, 260000, 310000],
//   };

//   // Get dimensions for responsive design
//   const windowWidth = Dimensions.get("window").width;

//   // Calculate the max value for normalization
//   const maxValue = Math.max(...revenueData[activeChartTab]);

//   const getLabelByPeriod = () => {
//     switch (activeChartTab) {
//       case "week":
//         return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//       case "month":
//         return ["Week 1", "Week 2", "Week 3", "Week 4"];
//       case "year":
//         return ["Q1", "Q2", "Q3", "Q4"];
//       default:
//         return [];
//     }
//   };

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return `$${amount.toLocaleString()}`;
//   };

//   const renderChart = () => {
//     const labels = getLabelByPeriod();

//     return (
//       <View style={enhancedStyles.chartContent}>
//         {revenueData[activeChartTab].map((value: any, index: number) => (
//           <View key={index} style={enhancedStyles.barContainer}>
//             <View style={enhancedStyles.barValueContainer}>
//               <Text style={enhancedStyles.barValue}>
//                 {formatCurrency(value)}
//               </Text>
//             </View>
//             <LinearGradient
//               colors={["#48a877", "#6dd5a2"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={[enhancedStyles.bar, { height: (value / maxValue) * 160 }]}
//             />
//             <Text style={enhancedStyles.barLabel}>{labels[index]}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={enhancedStyles.container}>
//       <StatusBar style="light" />

//       {/* Header */}
//       <View style={enhancedStyles.header}>
//         <View>
//           <Text style={enhancedStyles.headerTitle}>Analytics</Text>
//           <Text style={enhancedStyles.headerSubtitle}>Dashboard overview</Text>
//         </View>
//         <View style={enhancedStyles.profileContainer}>
//           <Image
//             source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
//             style={enhancedStyles.profileImage}
//           />
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={enhancedStyles.scrollContent}
//       >
//         {/* Summary Cards */}
//         <View style={enhancedStyles.summaryContainer}>
//           <View style={enhancedStyles.summaryCard}>
//             <View style={enhancedStyles.summaryIconContainer}>
//               <LinearGradient
//                 colors={["#4F6CF7", "#8A4EF5"]}
//                 style={enhancedStyles.summaryIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="cash-outline" size={18} color="#fff" />
//               </LinearGradient>
//             </View>
//             <Text style={enhancedStyles.summaryValue}>$24,580</Text>
//             <Link href={`/printScreen`} asChild>
//               <Text
//                 style={enhancedStyles.summaryTitle}
//                 onPress={() => navigation.navigate("printScreen")}
//               >
//                 Total Revenue
//               </Text>
//             </Link>
//             <View style={enhancedStyles.summaryTrend}>
//               <Ionicons name="arrow-up" size={12} color="#4CAF50" />
//               <Text style={enhancedStyles.summaryTrendText}>12.8%</Text>
//             </View>
//           </View>

//           <View style={enhancedStyles.summaryCard}>
//             <View style={enhancedStyles.summaryIconContainer}>
//               <LinearGradient
//                 colors={["#FF6B6B", "#FF8E53"]}
//                 style={enhancedStyles.summaryIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="cart-outline" size={18} color="#fff" />
//               </LinearGradient>
//             </View>
//             <Text style={enhancedStyles.summaryValue}>386</Text>
//             <Text style={enhancedStyles.summaryTitle}>Orders</Text>
//             <View style={enhancedStyles.summaryTrend}>
//               <Ionicons name="arrow-up" size={12} color="#4CAF50" />
//               <Text style={enhancedStyles.summaryTrendText}>8.5%</Text>
//             </View>
//           </View>

//           <View style={enhancedStyles.summaryCard}>
//             <View style={enhancedStyles.summaryIconContainer}>
//               <LinearGradient
//                 colors={["#4CAF50", "#8BC34A"]}
//                 style={enhancedStyles.summaryIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="cube-outline" size={18} color="#fff" />
//               </LinearGradient>
//             </View>
//             <Text style={enhancedStyles.summaryValue}>42</Text>
//             <Text style={enhancedStyles.summaryTitle}>Products</Text>
//             <View style={enhancedStyles.summaryTrend}>
//               <Ionicons name="arrow-up" size={12} color="#4CAF50" />
//               <Text style={enhancedStyles.summaryTrendText}>4.2%</Text>
//             </View>
//           </View>
//         </View>

//         {/* Revenue Chart */}
//         <View style={enhancedStyles.chartContainer}>
//           <View style={enhancedStyles.chartHeader}>
//             <View>
//               <Text style={enhancedStyles.chartTitle}>Revenue Analysis</Text>
//               <Text style={enhancedStyles.chartSubtitle}>
//                 Performance overview
//               </Text>
//             </View>
//             <TouchableOpacity style={enhancedStyles.detailsButton}>
//               <Text style={enhancedStyles.detailsButtonText}>Details</Text>
//               <Ionicons name="chevron-forward" size={14} color="#4F6CF7" />
//             </TouchableOpacity>
//           </View>

//           <View style={enhancedStyles.chartTabs}>
//             <TouchableOpacity
//               style={[
//                 enhancedStyles.chartTab,
//                 activeChartTab === "week" && enhancedStyles.activeTab,
//               ]}
//               onPress={() => setActiveChartTab("week")}
//             >
//               <Text
//                 style={[
//                   enhancedStyles.tabText,
//                   activeChartTab === "week" && enhancedStyles.activeTabText,
//                 ]}
//               >
//                 Week
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 enhancedStyles.chartTab,
//                 activeChartTab === "month" && enhancedStyles.activeTab,
//               ]}
//               onPress={() => setActiveChartTab("month")}
//             >
//               <Text
//                 style={[
//                   enhancedStyles.tabText,
//                   activeChartTab === "month" && enhancedStyles.activeTabText,
//                 ]}
//               >
//                 Month
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 enhancedStyles.chartTab,
//                 activeChartTab === "year" && enhancedStyles.activeTab,
//               ]}
//               onPress={() => setActiveChartTab("year")}
//             >
//               <Text
//                 style={[
//                   enhancedStyles.tabText,
//                   activeChartTab === "year" && enhancedStyles.activeTabText,
//                 ]}
//               >
//                 Year
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Chart visualization */}
//           {renderChart()}
//         </View>

//         {/* Recent Orders */}
//         <View style={enhancedStyles.sectionHeader}>
//           <Text style={enhancedStyles.sectionTitle}>Recent Orders</Text>
//           <TouchableOpacity style={enhancedStyles.viewAllButton}>
//             <Text style={enhancedStyles.viewAllText}>View All</Text>
//             <Ionicons name="chevron-forward" size={14} color="#4F6CF7" />
//           </TouchableOpacity>
//         </View>

//         <View style={enhancedStyles.recentOrdersContainer}>
//           {/* Order 1 */}
//           <View style={enhancedStyles.orderCard}>
//             <View style={enhancedStyles.orderIconContainer}>
//               <LinearGradient
//                 colors={["#4F6CF7", "#8A4EF5"]}
//                 style={enhancedStyles.orderIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="receipt-outline" size={16} color="#fff" />
//               </LinearGradient>
//             </View>
//             <View style={enhancedStyles.orderDetails}>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderTitle}>Order #12345</Text>
//                 <View style={enhancedStyles.orderStatusContainer}>
//                   <View style={enhancedStyles.orderStatusDot} />
//                   <Text style={enhancedStyles.orderStatusText}>Completed</Text>
//                 </View>
//               </View>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderDate}>March 15, 2025</Text>
//                 <Text style={enhancedStyles.orderAmount}>$152.00</Text>
//               </View>
//             </View>
//           </View>

//           {/* Order 2 */}
//           <View style={enhancedStyles.orderCard}>
//             <View style={enhancedStyles.orderIconContainer}>
//               <LinearGradient
//                 colors={["#4F6CF7", "#8A4EF5"]}
//                 style={enhancedStyles.orderIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="receipt-outline" size={16} color="#fff" />
//               </LinearGradient>
//             </View>
//             <View style={enhancedStyles.orderDetails}>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderTitle}>Order #12344</Text>
//                 <View
//                   style={[
//                     enhancedStyles.orderStatusContainer,
//                     enhancedStyles.processingStatus,
//                   ]}
//                 >
//                   <View
//                     style={[
//                       enhancedStyles.orderStatusDot,
//                       enhancedStyles.processingDot,
//                     ]}
//                   />
//                   <Text
//                     style={[
//                       enhancedStyles.orderStatusText,
//                       enhancedStyles.processingText,
//                     ]}
//                   >
//                     Processing
//                   </Text>
//                 </View>
//               </View>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderDate}>March 14, 2025</Text>
//                 <Text style={enhancedStyles.orderAmount}>$89.50</Text>
//               </View>
//             </View>
//           </View>

//           {/* Order 3 */}
//           <View style={enhancedStyles.orderCard}>
//             <View style={enhancedStyles.orderIconContainer}>
//               <LinearGradient
//                 colors={["#4F6CF7", "#8A4EF5"]}
//                 style={enhancedStyles.orderIconBg}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Ionicons name="receipt-outline" size={16} color="#fff" />
//               </LinearGradient>
//             </View>
//             <View style={enhancedStyles.orderDetails}>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderTitle}>Order #12343</Text>
//                 <View style={enhancedStyles.orderStatusContainer}>
//                   <View style={enhancedStyles.orderStatusDot} />
//                   <Text style={enhancedStyles.orderStatusText}>Completed</Text>
//                 </View>
//               </View>
//               <View style={enhancedStyles.orderRow}>
//                 <Text style={enhancedStyles.orderDate}>March 13, 2025</Text>
//                 <Text style={enhancedStyles.orderAmount}>$247.75</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // Enhanced styles
// const enhancedStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFF",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#333",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 4,
//   },
//   profileContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#E0E7FF",
//   },
//   profileImage: {
//     width: "100%",
//     height: "100%",
//   },
//   scrollContent: {
//     paddingBottom: 30,
//   },
//   summaryContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 15,
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   summaryCard: {
//     width: "31%",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 12,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   summaryIconContainer: {
//     marginBottom: 10,
//   },
//   summaryIconBg: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   summaryTitle: {
//     fontSize: 12,
//     color: "#888",
//     marginBottom: 4,
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 2,
//   },
//   summaryTrend: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   summaryTrendText: {
//     fontSize: 11,
//     color: "#4CAF50",
//     marginLeft: 2,
//   },
//   chartContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     marginHorizontal: 15,
//     marginTop: 20,
//     padding: 15,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   chartHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   chartSubtitle: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 2,
//   },
//   detailsButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   detailsButtonText: {
//     fontSize: 14,
//     color: "#4F6CF7",
//     marginRight: 2,
//   },
//   chartTabs: {
//     flexDirection: "row",
//     marginBottom: 20,
//     borderRadius: 8,
//     backgroundColor: "#F4F6FA",
//     padding: 4,
//   },
//   chartTab: {
//     flex: 1,
//     paddingVertical: 8,
//     alignItems: "center",
//     borderRadius: 6,
//   },
//   activeTab: {
//     backgroundColor: "#fff",
//     shadowColor: "rgba(79, 108, 247, 0.2)",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#888",
//   },
//   activeTabText: {
//     color: "#4F6CF7",
//     fontWeight: "600",
//   },
//   chartContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     height: 200,
//     paddingTop: 20,
//   },
//   barContainer: {
//     alignItems: "center",
//     flex: 1,
//   },
//   barValueContainer: {
//     marginBottom: 5,
//   },
//   barValue: {
//     fontSize: 10,
//     color: "#888",
//     textAlign: "center",
//   },
//   bar: {
//     width: 20,
//     borderRadius: 4,
//   },
//   barLabel: {
//     marginTop: 8,
//     fontSize: 12,
//     color: "#888",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginTop: 25,
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   viewAllButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: "#4F6CF7",
//     marginRight: 2,
//   },
//   recentOrdersContainer: {
//     paddingHorizontal: 15,
//   },
//   orderCard: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 15,
//     marginBottom: 12,
//     shadowColor: "rgba(100, 100, 111, 0.1)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   orderIconContainer: {
//     marginRight: 15,
//   },
//   orderIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   orderDetails: {
//     flex: 1,
//   },
//   orderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   orderTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   orderAmount: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#4F6CF7",
//   },
//   orderDate: {
//     fontSize: 13,
//     color: "#888",
//   },
//   orderStatusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E6F2EA",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//   },
//   orderStatusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#4CAF50",
//     marginRight: 4,
//   },
//   orderStatusText: {
//     fontSize: 12,
//     color: "#4CAF50",
//   },
//   processingStatus: {
//     backgroundColor: "#FFF6E9",
//   },
//   processingDot: {
//     backgroundColor: "#FF9800",
//   },
//   processingText: {
//     color: "#FF9800",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LineChart, BarChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

// Brand colors
export const COLOR = {
  primary: "#48a877",
  secondary: "#e8f5ef",
  accent: "#3d8d64",
  white: "#ffffff",
  black: "#000",
  grey: "#888",
  lightGrey: "#f1f5f9",
  darkGrey: "#4b5563",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#f59e0b",
  purple: "#8b5cf6",
};

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  // Sample data for charts
  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3500, 4200, 3800, 5000, 4900, 6000, 7500],
        color: (opacity = 1) => `rgba(72, 168, 119, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const salesByCategory = {
    labels: ["Electronics", "Furniture", "Clothing", "Food", "Services"],
    datasets: [
      {
        data: [35, 28, 15, 12, 10],
        colors: [
          COLOR.primary,
          COLOR.accent,
          COLOR.blue,
          COLOR.purple,
          COLOR.yellow,
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <Text style={styles.dateText}>April 23, 2025</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/search.png",
              }}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/bell.png",
              }}
              style={styles.headerIcon}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.periodSelector}>
        {["day", "week", "month", "year"].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.selectedPeriodButtonText,
              ]}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <>
          <View style={styles.chartSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Revenue Trend</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
              <LineChart
                data={revenueData}
                width={width - 70}
                height={180}
                chartConfig={{
                  backgroundColor: COLOR.white,
                  backgroundGradientFrom: COLOR.white,
                  backgroundGradientTo: COLOR.white,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(72, 168, 119, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(72, 72, 72, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: COLOR.primary,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                  paddingRight: 0,
                  paddingLeft: 0,
                }}
              />
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-filled/50/ffffff/total-sales.png",
                  }}
                  style={styles.statIcon}
                />
              </View>
              <Text style={styles.statValue}>$24,580</Text>
              <Text style={styles.statLabel}>Total Sales</Text>
              <View style={styles.statChangeContainer}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/22c55e/up.png",
                  }}
                  style={styles.changeIcon}
                />
                <Text style={[styles.statChangeText, styles.positiveChange]}>
                  +12.5%
                </Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, styles.blueIconBg]}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-filled/50/ffffff/invoice.png",
                  }}
                  style={styles.statIcon}
                />
              </View>
              <Text style={styles.statValue}>143</Text>
              <Text style={styles.statLabel}>Invoices</Text>
              <View style={styles.statChangeContainer}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/22c55e/up.png",
                  }}
                  style={styles.changeIcon}
                />
                <Text style={[styles.statChangeText, styles.positiveChange]}>
                  +8.2%
                </Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, styles.purpleIconBg]}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-filled/50/ffffff/client-company.png",
                  }}
                  style={styles.statIcon}
                />
              </View>
              <Text style={styles.statValue}>38</Text>
              <Text style={styles.statLabel}>Clients</Text>
              <View style={styles.statChangeContainer}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/ef4444/down.png",
                  }}
                  style={styles.changeIcon}
                />
                <Text style={[styles.statChangeText, styles.negativeChange]}>
                  -2.4%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.recentTransactionsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.transactionsList}>
              {[
                {
                  id: 1,
                  client: "TechWave Solutions",
                  amount: 2450,
                  date: "Today, 10:45 AM",
                  status: "Paid",
                },
                {
                  id: 2,
                  client: "Green Meadows Inc.",
                  amount: 1800,
                  date: "Yesterday, 3:20 PM",
                  status: "Pending",
                },
                {
                  id: 3,
                  client: "Urban Designers Co.",
                  amount: 3200,
                  date: "Apr 21, 2025",
                  status: "Paid",
                },
              ].map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <View style={styles.clientInitialContainer}>
                      <Text style={styles.clientInitial}>
                        {transaction.client.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionClient}>
                        {transaction.client}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {transaction.date}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmount}>
                      ${transaction.amount}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        transaction.status === "Paid"
                          ? styles.paidBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          transaction.status === "Paid"
                            ? styles.paidText
                            : styles.pendingText,
                        ]}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightGrey,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: COLOR.white,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLOR.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    position: "relative",
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.black,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLOR.red,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: COLOR.white,
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedPeriodButton: {
    backgroundColor: COLOR.secondary,
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: COLOR.grey,
  },
  selectedPeriodButtonText: {
    color: COLOR.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statCard: {
    width: (width - 56) / 3,
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLOR.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  blueIconBg: {
    backgroundColor: COLOR.blue,
  },
  purpleIconBg: {
    backgroundColor: COLOR.purple,
  },
  statIcon: {
    width: 18,
    height: 18,
    tintColor: COLOR.white,
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
    marginBottom: 8,
  },
  statChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  statChangeText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  positiveChange: {
    color: COLOR.green,
  },
  negativeChange: {
    color: COLOR.red,
  },
  chartSection: {
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
  },
  moreButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  moreButtonText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: COLOR.primary,
  },
  chartContainer: {
    alignItems: "center",
    // backgroundColor:"red"
  },
  recentTransactionsContainer: {
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  transactionsList: {
    marginTop: 8,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientInitialContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  clientInitial: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.primary,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionClient: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: COLOR.black,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.black,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paidBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
  },
  pendingBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  statusText: {
    fontSize: 10,
    fontFamily: "Poppins_500Medium",
  },
  paidText: {
    color: COLOR.green,
  },
  pendingText: {
    color: COLOR.yellow,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    backgroundColor: COLOR.white,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
  },
  activeTabText: {
    color: COLOR.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  comingSoonText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLOR.darkGrey,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLOR.grey,
  },
});

export default AnalyticsDashboard;
