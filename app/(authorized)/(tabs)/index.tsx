import { useAuthSession } from "@/app/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
// import styles from "../styles";
import { StyleSheet } from "react-native";

export default function AnalyticsDashboard() {
  const [activeChartTab, setActiveChartTab] = useState("week");
  const navigation: any = useNavigation();
  // Sample data for revenue chart
  const revenueData: any = {
    week: [4500, 5200, 3800, 6100, 5800, 7200, 6800],
    month: [18000, 22000, 25000, 20000],
    year: [220000, 280000, 260000, 310000],
  };

  // Get dimensions for responsive design
  const windowWidth = Dimensions.get("window").width;

  // Calculate the max value for normalization
  const maxValue = Math.max(...revenueData[activeChartTab]);

  const getLabelByPeriod = () => {
    switch (activeChartTab) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "month":
        return ["Week 1", "Week 2", "Week 3", "Week 4"];
      case "year":
        return ["Q1", "Q2", "Q3", "Q4"];
      default:
        return [];
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const renderChart = () => {
    const labels = getLabelByPeriod();

    return (
      <View style={enhancedStyles.chartContent}>
        {revenueData[activeChartTab].map((value: any, index: number) => (
          <View key={index} style={enhancedStyles.barContainer}>
            <View style={enhancedStyles.barValueContainer}>
              <Text style={enhancedStyles.barValue}>
                {formatCurrency(value)}
              </Text>
            </View>
            <LinearGradient
              colors={["#48a877", "#6dd5a2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[enhancedStyles.bar, { height: (value / maxValue) * 160 }]}
            />
            <Text style={enhancedStyles.barLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={enhancedStyles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={enhancedStyles.header}>
        <View>
          <Text style={enhancedStyles.headerTitle}>Analytics</Text>
          <Text style={enhancedStyles.headerSubtitle}>Dashboard overview</Text>
        </View>
        <View style={enhancedStyles.profileContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={enhancedStyles.profileImage}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={enhancedStyles.scrollContent}
      >
        {/* Summary Cards */}
        <View style={enhancedStyles.summaryContainer}>
          <View style={enhancedStyles.summaryCard}>
            <View style={enhancedStyles.summaryIconContainer}>
              <LinearGradient
                colors={["#4F6CF7", "#8A4EF5"]}
                style={enhancedStyles.summaryIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="cash-outline" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={enhancedStyles.summaryValue}>$24,580</Text>
            <Link href={`/printScreen`} asChild>
              <Text
                style={enhancedStyles.summaryTitle}
                onPress={() => navigation.navigate("printScreen")}
              >
                Total Revenue
              </Text>
            </Link>
            <View style={enhancedStyles.summaryTrend}>
              <Ionicons name="arrow-up" size={12} color="#4CAF50" />
              <Text style={enhancedStyles.summaryTrendText}>12.8%</Text>
            </View>
          </View>

          <View style={enhancedStyles.summaryCard}>
            <View style={enhancedStyles.summaryIconContainer}>
              <LinearGradient
                colors={["#FF6B6B", "#FF8E53"]}
                style={enhancedStyles.summaryIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="cart-outline" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={enhancedStyles.summaryValue}>386</Text>
            <Text style={enhancedStyles.summaryTitle}>Orders</Text>
            <View style={enhancedStyles.summaryTrend}>
              <Ionicons name="arrow-up" size={12} color="#4CAF50" />
              <Text style={enhancedStyles.summaryTrendText}>8.5%</Text>
            </View>
          </View>

          <View style={enhancedStyles.summaryCard}>
            <View style={enhancedStyles.summaryIconContainer}>
              <LinearGradient
                colors={["#4CAF50", "#8BC34A"]}
                style={enhancedStyles.summaryIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="cube-outline" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={enhancedStyles.summaryValue}>42</Text>
            <Text style={enhancedStyles.summaryTitle}>Products</Text>
            <View style={enhancedStyles.summaryTrend}>
              <Ionicons name="arrow-up" size={12} color="#4CAF50" />
              <Text style={enhancedStyles.summaryTrendText}>4.2%</Text>
            </View>
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={enhancedStyles.chartContainer}>
          <View style={enhancedStyles.chartHeader}>
            <View>
              <Text style={enhancedStyles.chartTitle}>Revenue Analysis</Text>
              <Text style={enhancedStyles.chartSubtitle}>
                Performance overview
              </Text>
            </View>
            <TouchableOpacity style={enhancedStyles.detailsButton}>
              <Text style={enhancedStyles.detailsButtonText}>Details</Text>
              <Ionicons name="chevron-forward" size={14} color="#4F6CF7" />
            </TouchableOpacity>
          </View>

          <View style={enhancedStyles.chartTabs}>
            <TouchableOpacity
              style={[
                enhancedStyles.chartTab,
                activeChartTab === "week" && enhancedStyles.activeTab,
              ]}
              onPress={() => setActiveChartTab("week")}
            >
              <Text
                style={[
                  enhancedStyles.tabText,
                  activeChartTab === "week" && enhancedStyles.activeTabText,
                ]}
              >
                Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                enhancedStyles.chartTab,
                activeChartTab === "month" && enhancedStyles.activeTab,
              ]}
              onPress={() => setActiveChartTab("month")}
            >
              <Text
                style={[
                  enhancedStyles.tabText,
                  activeChartTab === "month" && enhancedStyles.activeTabText,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                enhancedStyles.chartTab,
                activeChartTab === "year" && enhancedStyles.activeTab,
              ]}
              onPress={() => setActiveChartTab("year")}
            >
              <Text
                style={[
                  enhancedStyles.tabText,
                  activeChartTab === "year" && enhancedStyles.activeTabText,
                ]}
              >
                Year
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chart visualization */}
          {renderChart()}
        </View>

        {/* Recent Orders */}
        <View style={enhancedStyles.sectionHeader}>
          <Text style={enhancedStyles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity style={enhancedStyles.viewAllButton}>
            <Text style={enhancedStyles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={14} color="#4F6CF7" />
          </TouchableOpacity>
        </View>

        <View style={enhancedStyles.recentOrdersContainer}>
          {/* Order 1 */}
          <View style={enhancedStyles.orderCard}>
            <View style={enhancedStyles.orderIconContainer}>
              <LinearGradient
                colors={["#4F6CF7", "#8A4EF5"]}
                style={enhancedStyles.orderIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="receipt-outline" size={16} color="#fff" />
              </LinearGradient>
            </View>
            <View style={enhancedStyles.orderDetails}>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderTitle}>Order #12345</Text>
                <View style={enhancedStyles.orderStatusContainer}>
                  <View style={enhancedStyles.orderStatusDot} />
                  <Text style={enhancedStyles.orderStatusText}>Completed</Text>
                </View>
              </View>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderDate}>March 15, 2025</Text>
                <Text style={enhancedStyles.orderAmount}>$152.00</Text>
              </View>
            </View>
          </View>

          {/* Order 2 */}
          <View style={enhancedStyles.orderCard}>
            <View style={enhancedStyles.orderIconContainer}>
              <LinearGradient
                colors={["#4F6CF7", "#8A4EF5"]}
                style={enhancedStyles.orderIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="receipt-outline" size={16} color="#fff" />
              </LinearGradient>
            </View>
            <View style={enhancedStyles.orderDetails}>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderTitle}>Order #12344</Text>
                <View
                  style={[
                    enhancedStyles.orderStatusContainer,
                    enhancedStyles.processingStatus,
                  ]}
                >
                  <View
                    style={[
                      enhancedStyles.orderStatusDot,
                      enhancedStyles.processingDot,
                    ]}
                  />
                  <Text
                    style={[
                      enhancedStyles.orderStatusText,
                      enhancedStyles.processingText,
                    ]}
                  >
                    Processing
                  </Text>
                </View>
              </View>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderDate}>March 14, 2025</Text>
                <Text style={enhancedStyles.orderAmount}>$89.50</Text>
              </View>
            </View>
          </View>

          {/* Order 3 */}
          <View style={enhancedStyles.orderCard}>
            <View style={enhancedStyles.orderIconContainer}>
              <LinearGradient
                colors={["#4F6CF7", "#8A4EF5"]}
                style={enhancedStyles.orderIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="receipt-outline" size={16} color="#fff" />
              </LinearGradient>
            </View>
            <View style={enhancedStyles.orderDetails}>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderTitle}>Order #12343</Text>
                <View style={enhancedStyles.orderStatusContainer}>
                  <View style={enhancedStyles.orderStatusDot} />
                  <Text style={enhancedStyles.orderStatusText}>Completed</Text>
                </View>
              </View>
              <View style={enhancedStyles.orderRow}>
                <Text style={enhancedStyles.orderDate}>March 13, 2025</Text>
                <Text style={enhancedStyles.orderAmount}>$247.75</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Enhanced styles
const enhancedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E0E7FF",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 10,
    justifyContent: "space-between",
  },
  summaryCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryIconContainer: {
    marginBottom: 10,
  },
  summaryIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  summaryTrend: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryTrendText: {
    fontSize: 11,
    color: "#4CAF50",
    marginLeft: 2,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginTop: 20,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#4F6CF7",
    marginRight: 2,
  },
  chartTabs: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",
    padding: 4,
  },
  chartTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "rgba(79, 108, 247, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#4F6CF7",
    fontWeight: "600",
  },
  chartContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  barValueContainer: {
    marginBottom: 5,
  },
  barValue: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#888",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: "#4F6CF7",
    marginRight: 2,
  },
  recentOrdersContainer: {
    paddingHorizontal: 15,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  orderIconContainer: {
    marginRight: 15,
  },
  orderIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  orderDetails: {
    flex: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4F6CF7",
  },
  orderDate: {
    fontSize: 13,
    color: "#888",
  },
  orderStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F2EA",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  orderStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 4,
  },
  orderStatusText: {
    fontSize: 12,
    color: "#4CAF50",
  },
  processingStatus: {
    backgroundColor: "#FFF6E9",
  },
  processingDot: {
    backgroundColor: "#FF9800",
  },
  processingText: {
    color: "#FF9800",
  },
});
