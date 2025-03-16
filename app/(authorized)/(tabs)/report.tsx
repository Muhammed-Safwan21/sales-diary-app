import { useAuthSession } from "@/app/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StyleSheet } from "react-native";

type ReportType = {
  id: string;
  title: string;
  icon: string;
  color1: string;
  color2: string;
  description: string;
};

type DateRange = {
  id: string;
  title: string;
  period: string;
};

export default function Report() {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("last30days");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const reportTypes: ReportType[] = [
    {
      id: "sales",
      title: "Sales Report",
      icon: "cash-outline",
      color1: "#4F6CF7",
      color2: "#8A4EF5",
      description: "Detailed sales data with revenues, trends, and top products",
    },
    {
      id: "inventory",
      title: "Inventory Report",
      icon: "cube-outline",
      color1: "#4CAF50",
      color2: "#8BC34A",
      description: "Stock levels, low stock alerts, and inventory turnover rates",
    },
    {
      id: "customers",
      title: "Customer Analysis",
      icon: "people-outline",
      color1: "#FF6B6B",
      color2: "#FF8E53",
      description: "Customer demographics, purchase history, and retention data",
    },
    {
      id: "marketing",
      title: "Marketing Performance",
      icon: "megaphone-outline",
      color1: "#6B7FD7",
      color2: "#8662D7",
      description: "Campaign metrics, channel performance, and ROI data",
    },
  ];

  const dateRanges: DateRange[] = [
    { id: "today", title: "Today", period: "March 16, 2025" },
    { id: "yesterday", title: "Yesterday", period: "March 15, 2025" },
    { id: "last7days", title: "Last 7 Days", period: "Mar 10 - Mar 16, 2025" },
    { id: "last30days", title: "Last 30 Days", period: "Feb 15 - Mar 16, 2025" },
    { id: "thisMonth", title: "This Month", period: "Mar 1 - Mar 16, 2025" },
    { id: "lastMonth", title: "Last Month", period: "Feb 1 - Feb 29, 2025" },
    { id: "custom", title: "Custom Range", period: "Select custom dates" },
  ];

  const getSelectedDateRange = () => {
    return dateRanges.find((range) => range.id === selectedDateRange);
  };

  const getSelectedReport = () => {
    return reportTypes.find((report) => report.id === selectedReportType);
  };

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      Alert.alert("Select Report Type", "Please select a report type to continue.");
      return;
    }

    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportGenerated(true);
    }, 2000);
  };

  const handleShareReport = () => {
    if (!reportGenerated) {
      Alert.alert("Generate Report", "Please generate a report first.");
      return;
    }
    setShowShareModal(true);
  };

  const renderReportTypeItem = (report: ReportType) => {
    const isSelected = selectedReportType === report.id;
    return (
      <TouchableOpacity
        key={report.id}
        style={[
          styles.reportTypeCard,
          isSelected && styles.selectedReportCard,
        ]}
        onPress={() => setSelectedReportType(report.id)}
      >
        <View style={styles.reportIconContainer}>
          <LinearGradient
            colors={[report.color1, report.color2]}
            style={styles.reportIconBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name={report.icon as any} size={20} color="#fff" />
          </LinearGradient>
        </View>
        <View style={styles.reportDetails}>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <Text style={styles.reportDescription} numberOfLines={2}>
            {report.description}
          </Text>
        </View>
        <View style={styles.checkCircle}>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#4F6CF7" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Reports</Text>
          <Text style={styles.headerSubtitle}>Generate and analyze reports</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Report Types Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Report Type</Text>
        </View>

        <View style={styles.reportTypesContainer}>
          {reportTypes.map((report) => renderReportTypeItem(report))}
        </View>

        {/* Date Range Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Date Range</Text>
        </View>

        <TouchableOpacity
          style={styles.dateRangeCard}
          onPress={() => setShowDateModal(true)}
        >
          <View style={styles.dateRangeContent}>
            <View style={styles.dateIconContainer}>
              <LinearGradient
                colors={["#4F6CF7", "#8A4EF5"]}
                style={styles.dateIconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="calendar-outline" size={20} color="#fff" />
              </LinearGradient>
            </View>
            <View style={styles.dateDetails}>
              <Text style={styles.dateRangeTitle}>
                {getSelectedDateRange()?.title || "Select Range"}
              </Text>
              <Text style={styles.dateRangePeriod}>
                {getSelectedDateRange()?.period || "No date selected"}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        {/* Report Preview */}
        {selectedReportType && (
          <View style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Report Preview</Text>
              <Text style={styles.previewSubtitle}>
                {getSelectedReport()?.title} • {getSelectedDateRange()?.period}
              </Text>
            </View>

            {reportGenerated ? (
              <View style={styles.reportContentPreview}>
                <LinearGradient
                  colors={[
                    getSelectedReport()?.color1 || "#4F6CF7",
                    getSelectedReport()?.color2 || "#8A4EF5",
                  ]}
                  style={styles.previewGraph}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <Ionicons 
                    name={
                      (getSelectedReport()?.icon as any) || "document-outline"
                    } 
                    size={36} 
                    color="#fff" 
                  />
                </LinearGradient>
                <View style={styles.previewStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>42</Text>
                    <Text style={styles.statLabel}>Total Items</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>$12,845</Text>
                    <Text style={styles.statLabel}>Revenue</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>+18%</Text>
                    <Text style={styles.statLabel}>Growth</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderContainer}>
                <Ionicons name="document-text-outline" size={40} color="#CCC" />
                <Text style={styles.placeholderText}>
                  Generate report to preview data
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              isGeneratingReport && styles.disabledButton,
            ]}
            onPress={handleGenerateReport}
            disabled={isGeneratingReport || !selectedReportType}
          >
            {isGeneratingReport ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="refresh-outline" size={20} color="#fff" />
                <Text style={styles.generateButtonText}>
                  {reportGenerated ? "Regenerate Report" : "Generate Report"}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {reportGenerated && (
            <View style={styles.reportActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => Alert.alert("Success", "Report downloaded successfully!")}
              >
                <LinearGradient
                  colors={["#4CAF50", "#8BC34A"]}
                  style={styles.actionButtonBg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="download-outline" size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleShareReport}>
                <LinearGradient
                  colors={["#FF6B6B", "#FF8E53"]}
                  style={styles.actionButtonBg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="share-social-outline" size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Date Range Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date Range</Text>
              <TouchableOpacity onPress={() => setShowDateModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {dateRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.dateRangeOption,
                    selectedDateRange === range.id && styles.selectedDateRange,
                  ]}
                  onPress={() => {
                    setSelectedDateRange(range.id);
                    if (range.id !== "custom") {
                      setShowDateModal(false);
                    }
                  }}
                >
                  <View style={styles.dateOptionContent}>
                    <Text style={styles.dateOptionTitle}>{range.title}</Text>
                    <Text style={styles.dateOptionPeriod}>{range.period}</Text>
                  </View>
                  {selectedDateRange === range.id && (
                    <Ionicons name="checkmark" size={20} color="#4F6CF7" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Report</Text>
              <TouchableOpacity onPress={() => setShowShareModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.shareOptions}>
              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert("Success", "Report sent via email!");
                }}
              >
                <View style={[styles.shareIconBg, { backgroundColor: "#D93025" }]}>
                  <Ionicons name="mail" size={24} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert("Success", "Report shared via Messages!");
                }}
              >
                <View style={[styles.shareIconBg, { backgroundColor: "#34B7F1" }]}>
                  <Ionicons name="chatbubble" size={24} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Message</Text>
                </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert("Success", "Report copied to clipboard!");
                }}
              >
                <View style={[styles.shareIconBg, { backgroundColor: "#8A8A8A" }]}>
                  <Ionicons name="copy" size={24} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Copy Link</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert("Success", "Report saved to files!");
                }}
              >
                <View style={[styles.shareIconBg, { backgroundColor: "#4CAF50" }]}>
                  <Ionicons name="save" size={24} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Save</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  reportTypesContainer: {
    paddingHorizontal: 15,
  },
  reportTypeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedReportCard: {
    borderWidth: 2,
    borderColor: "#4F6CF7",
  },
  reportIconContainer: {
    marginRight: 15,
  },
  reportIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  reportDetails: {
    flex: 1,
    marginRight: 10,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 13,
    color: "#888",
  },
  checkCircle: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  dateRangeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  dateRangeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIconContainer: {
    marginRight: 15,
  },
  dateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateDetails: {
    flex: 1,
  },
  dateRangeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dateRangePeriod: {
    fontSize: 13,
    color: "#888",
  },
  previewContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  previewHeader: {
    marginBottom: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  previewSubtitle: {
    fontSize: 13,
    color: "#888",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
  reportContentPreview: {
    alignItems: "center",
  },
  previewGraph: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  previewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
  actionButtonsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F6CF7",
    borderRadius: 16,
    paddingVertical: 15,
    marginBottom: 15,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  reportActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  actionButtonBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  dateRangeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedDateRange: {
    backgroundColor: "#F0F4FF",
  },
  dateOptionContent: {
    flex: 1,
  },
  dateOptionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  dateOptionPeriod: {
    fontSize: 13,
    color: "#888",
  },
  applyButton: {
    backgroundColor: "#4F6CF7",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  shareOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shareOption: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
  },
  shareIconBg: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  shareOptionText: {
    fontSize: 14,
    color: "#333",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});