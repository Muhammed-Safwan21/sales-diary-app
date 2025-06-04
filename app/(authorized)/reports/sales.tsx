import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Filter,
  IndianRupee,
  MessageCircle,
  Package,
  Search,
  Share2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

interface SalesData {
  id: string;
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: number;
}

interface SummaryCard {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  gradient: string[];
  change?: string;
  changeType?: 'positive' | 'negative';
}

interface DateRange {
  id: string;
  label: string;
  startDate?: Date;
  endDate?: Date;
}

export default function SalesReportScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

  const dateRanges: DateRange[] = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: '90days', label: 'Last 90 Days' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' },
  ];

  const statusOptions = ['All Status', 'Paid', 'Pending', 'Overdue'];

  const summaryData: SummaryCard[] = [
    {
      title: 'Total Sales',
      value: '₹2,45,680',
      subValue: 'Last 30 days',
      icon: <IndianRupee size={20} color="#FFFFFF" />,
      gradient: ['#6366F1', '#8B5CF6'],
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      title: 'Total Orders',
      value: '156',
      subValue: 'This month',
      icon: <FileText size={20} color="#FFFFFF" />,
      gradient: ['#EC4899', '#F472B6'],
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      title: 'Customers',
      value: '89',
      subValue: 'Active buyers',
      icon: <Users size={20} color="#FFFFFF" />,
      gradient: ['#06D6A0', '#34D399'],
      change: '+15.3%',
      changeType: 'positive',
    },
    {
      title: 'Avg. Order',
      value: '₹1,574',
      subValue: 'Per transaction',
      icon: <TrendingUp size={20} color="#FFFFFF" />,
      gradient: ['#F59E0B', '#FBBF24'],
      change: '-2.1%',
      changeType: 'negative',
    },
    {
      title: 'Profit Margin',
      value: '24.5%',
      subValue: 'Overall margin',
      icon: <BarChart3 size={20} color="#FFFFFF" />,
      gradient: ['#8B5CF6', '#A855F7'],
      change: '+3.2%',
      changeType: 'positive',
    },
  ];

  const salesData: SalesData[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'Rajesh Kumar',
      date: '2024-06-01',
      amount: 15420,
      status: 'paid',
      items: 5,
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'Priya Sharma',
      date: '2024-06-01',
      amount: 8750,
      status: 'pending',
      items: 3,
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'Arjun Patel',
      date: '2024-05-31',
      amount: 22300,
      status: 'paid',
      items: 8,
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'Sneha Reddy',
      date: '2024-05-30',
      amount: 5680,
      status: 'overdue',
      items: 2,
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      customerName: 'Vikram Singh',
      date: '2024-05-29',
      amount: 18950,
      status: 'paid',
      items: 6,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return theme.colors.success;
      case 'pending':
        return '#F59E0B';
      case 'overdue':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'paid':
        return `${theme.colors.success}15`;
      case 'pending':
        return 'rgba(245, 158, 11, 0.15)';
      case 'overdue':
        return 'rgba(239, 68, 68, 0.15)';
      default:
        return `${theme.colors.textSecondary}15`;
    }
  };

  const filteredSalesData = salesData.filter((sale) => {
    const matchesSearch =
      sale.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All Status' ||
      sale.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isDateInRange = (date: Date, start: Date, end: Date) => {
    return date >= start && date <= end;
  };

  const isDateSelected = (date: Date) => {
    const startTime = customStartDate.getTime();
    const endTime = customEndDate.getTime();
    const dateTime = date.getTime();

    return dateTime === startTime || dateTime === endTime;
  };

  const handleDateSelect = (date: Date) => {
    if (isSelectingStartDate) {
      setCustomStartDate(date);
      setIsSelectingStartDate(false);
    } else {
      if (date < customStartDate) {
        setCustomStartDate(date);
        setCustomEndDate(customStartDate);
      } else {
        setCustomEndDate(date);
      }
      setIsSelectingStartDate(true);
    }
  };

  const handleShare = (type: 'whatsapp' | 'pdf') => {
    setShowShareModal(false);
    if (type === 'whatsapp') {
      // Implement WhatsApp sharing logic
      console.log('Sharing to WhatsApp...');
    } else {
      // Implement PDF download logic
      console.log('Downloading PDF...');
    }
  };

  const renderSummaryCard = ({
    item: card,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInUp.delay(100 + index * 50)}
      style={styles.summaryCardWrapper}
    >
      <BlurView
        intensity={themeType === 'dark' ? 15 : 80}
        tint={themeType}
        style={styles.summaryCard}
      >
        <LinearGradient
          colors={[
            `${card.gradient[0]}15`,
            `${card.gradient[1]}10`,
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryGradientOverlay}
        />

        <View style={styles.summaryCardContent}>
          <View style={styles.summaryHeader}>
            <View
              style={[
                styles.summaryIconContainer,
                { backgroundColor: `${card.gradient[0]}20` },
              ]}
            >
              <LinearGradient
                colors={card.gradient}
                style={styles.summaryIconGradient}
              >
                {card.icon}
              </LinearGradient>
            </View>

            {card.change && (
              <View
                style={[
                  styles.changeContainer,
                  {
                    backgroundColor:
                      card.changeType === 'positive'
                        ? `${theme.colors.success}15`
                        : 'rgba(239, 68, 68, 0.15)',
                  },
                ]}
              >
                <TrendingUp
                  size={12}
                  color={
                    card.changeType === 'positive'
                      ? theme.colors.success
                      : '#EF4444'
                  }
                  style={{
                    transform: [
                      {
                        rotate:
                          card.changeType === 'positive' ? '0deg' : '180deg',
                      },
                    ],
                  }}
                />
                <Text
                  style={[
                    styles.changeText,
                    {
                      color:
                        card.changeType === 'positive'
                          ? theme.colors.success
                          : '#EF4444',
                    },
                  ]}
                >
                  {card.change}
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            {card.value}
          </Text>
          <Text
            style={[styles.summaryTitle, { color: theme.colors.textSecondary }]}
          >
            {card.title}
          </Text>
          {card.subValue && (
            <Text
              style={[
                styles.summarySubValue,
                { color: theme.colors.textSecondary },
              ]}
            >
              {card.subValue}
            </Text>
          )}
        </View>
      </BlurView>
    </Animated.View>
  );

  const renderCalendarDay = (date: Date, index: number) => {
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date, customStartDate, customEndDate);

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          isSelected && styles.selectedDay,
          isInRange && !isSelected && styles.rangeDay,
          !isCurrentMonth && styles.otherMonthDay,
        ]}
        onPress={() => handleDateSelect(date)}
        disabled={!isCurrentMonth}
      >
        <Text
          style={[
            styles.calendarDayText,
            { color: theme.colors.text },
            !isCurrentMonth && {
              color: theme.colors.textSecondary,
              opacity: 0.3,
            },
            isToday && { color: theme.colors.primary, fontWeight: '700' },
            isSelected && { color: '#FFFFFF', fontWeight: '700' },
            isInRange && !isSelected && { color: theme.colors.primary },
          ]}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSalesItem = (item: SalesData, index: number) => (
    <Animated.View key={item.id} entering={FadeInDown.delay(200 + index * 50)}>
      <TouchableOpacity
        style={styles.salesItem}
        onPress={() => {
          /* Navigate to invoice details */
        }}
        activeOpacity={0.8}
      >
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.salesItemContainer}
        >
          <View style={styles.salesItemContent}>
            <View style={styles.salesItemHeader}>
              <View style={styles.salesItemInfo}>
                <Text
                  style={[styles.invoiceNumber, { color: theme.colors.text }]}
                >
                  {item.invoiceNumber}
                </Text>
                <Text
                  style={[
                    styles.customerName,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.customerName}
                </Text>
              </View>

              <View style={styles.salesItemMeta}>
                <Text
                  style={[styles.salesAmount, { color: theme.colors.text }]}
                >
                  ₹{item.amount.toLocaleString()}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusBackground(item.status) },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.salesItemFooter}>
              <View style={styles.salesItemDetails}>
                <Package size={14} color={theme.colors.textSecondary} />
                <Text
                  style={[
                    styles.itemCount,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.items} items
                </Text>
                <View style={styles.dotSeparator} />
                <Calendar size={14} color={theme.colors.textSecondary} />
                <Text
                  style={[
                    styles.saleDate,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {new Date(item.date).toLocaleDateString('en-IN')}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.viewButton,
                  { backgroundColor: `${theme.colors.primary}15` },
                ]}
              >
                <Eye size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Modern header with gradient */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <BarChart3 size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Sales Report</Text>
            </View>

            <TouchableOpacity
              style={styles.exportButton}
              onPress={() => setShowShareModal(true)}
            >
              <Share2 size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Summary Cards */}
        <View style={styles.summarySection}>
          <FlatList
            data={summaryData}
            renderItem={renderSummaryCard}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.summaryListContent}
            snapToInterval={screenWidth * 0.8}
            decelerationRate="fast"
            pagingEnabled={false}
          />
        </View>

        {/* Filters Section */}
        <Animated.View entering={FadeInUp.delay(400)}>
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.filtersSection}
          >
            <View style={styles.sectionHeader}>
              <Filter size={18} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Filters & Search
              </Text>
            </View>

            {/* Search Bar */}
            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                  borderColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)',
                },
              ]}
            >
              <Search size={18} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search by customer or invoice..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterRow}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                    borderColor:
                      themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                  },
                ]}
                onPress={() => setShowDateRangePicker(true)}
              >
                <Calendar size={16} color={theme.colors.primary} />
                <Text
                  style={[
                    styles.filterButtonText,
                    { color: theme.colors.text },
                  ]}
                >
                  {selectedDateRange}
                </Text>
                <ChevronDown size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                    borderColor:
                      themeType === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                  },
                ]}
                onPress={() => setShowStatusFilter(!showStatusFilter)}
              >
                <FileText size={16} color={theme.colors.secondary} />
                <Text
                  style={[
                    styles.filterButtonText,
                    { color: theme.colors.text },
                  ]}
                >
                  {selectedStatus}
                </Text>
                <ChevronDown
                  size={16}
                  color={theme.colors.textSecondary}
                  style={{
                    transform: [
                      { rotate: showStatusFilter ? '180deg' : '0deg' },
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Status Filter Dropdown */}
            {showStatusFilter && (
              <Animated.View
                entering={FadeInDown.duration(200)}
                style={styles.statusDropdown}
              >
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      {
                        backgroundColor:
                          selectedStatus === status
                            ? `${theme.colors.primary}20`
                            : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      setSelectedStatus(status);
                      setShowStatusFilter(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.statusOptionText,
                        {
                          color:
                            selectedStatus === status
                              ? theme.colors.primary
                              : theme.colors.text,
                        },
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </BlurView>
        </Animated.View>

        {/* Sales List */}
        <Animated.View entering={FadeInUp.delay(500)}>
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.salesListSection}
          >
            <View style={styles.sectionHeader}>
              <FileText size={18} color={theme.colors.accent} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Recent Sales ({filteredSalesData.length})
              </Text>
            </View>

            <View style={styles.salesList}>
              {filteredSalesData.map((item, index) =>
                renderSalesItem(item, index)
              )}
            </View>

            {filteredSalesData.length === 0 && (
              <View style={styles.emptyState}>
                <View
                  style={[
                    styles.emptyIconContainer,
                    { backgroundColor: `${theme.colors.primary}15` },
                  ]}
                >
                  <FileText size={32} color={theme.colors.primary} />
                </View>
                <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                  No sales found
                </Text>
                <Text
                  style={[
                    styles.emptySubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            )}
          </BlurView>
        </Animated.View>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setShowShareModal(false)}
            activeOpacity={1}
          />
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(200)}
            style={styles.shareModal}
          >
            <BlurView
              intensity={themeType === 'dark' ? 20 : 90}
              tint={themeType}
              style={styles.shareModalContent}
            >
              <View style={styles.shareModalHeader}>
                <Text
                  style={[styles.shareModalTitle, { color: theme.colors.text }]}
                >
                  Share Report
                </Text>
                <TouchableOpacity
                  onPress={() => setShowShareModal(false)}
                  style={styles.closeButton}
                >
                  <X size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.shareOptions}>
                <TouchableOpacity
                  style={[
                    styles.shareOption,
                    {
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(37, 211, 102, 0.1)'
                          : 'rgba(37, 211, 102, 0.1)',
                    },
                  ]}
                  onPress={() => handleShare('whatsapp')}
                >
                  <View
                    style={[
                      styles.shareOptionIcon,
                      { backgroundColor: '#25D366' },
                    ]}
                  >
                    <MessageCircle size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.shareOptionText}>
                    <Text
                      style={[
                        styles.shareOptionTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      Share to WhatsApp
                    </Text>
                    <Text
                      style={[
                        styles.shareOptionSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Send report summary
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.shareOption,
                    {
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(239, 68, 68, 0.1)',
                    },
                  ]}
                  onPress={() => handleShare('pdf')}
                >
                  <View
                    style={[
                      styles.shareOptionIcon,
                      { backgroundColor: '#EF4444' },
                    ]}
                  >
                    <Download size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.shareOptionText}>
                    <Text
                      style={[
                        styles.shareOptionTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      Download PDF
                    </Text>
                    <Text
                      style={[
                        styles.shareOptionSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Save detailed report
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </Modal>

      {/* Date Range Picker Modal */}
      <Modal
        visible={showDateRangePicker}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowDateRangePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setShowDateRangePicker(false)}
            activeOpacity={1}
          />
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(200)}
            style={styles.datePickerModal}
          >
            <BlurView
              intensity={themeType === 'dark' ? 20 : 90}
              tint={themeType}
              style={styles.datePickerContent}
            >
              <View style={styles.datePickerHeader}>
                <Text
                  style={[styles.datePickerTitle, { color: theme.colors.text }]}
                >
                  Select Date Range
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDateRangePicker(false)}
                  style={styles.closeButton}
                >
                  <X size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Quick Date Ranges */}
              <View style={styles.quickRanges}>
                {dateRanges.slice(0, -1).map((range) => (
                  <TouchableOpacity
                    key={range.id}
                    style={[
                      styles.quickRangeButton,
                      {
                        backgroundColor:
                          selectedDateRange === range.label
                            ? `${theme.colors.primary}20`
                            : 'transparent',
                        borderColor:
                          selectedDateRange === range.label
                            ? theme.colors.primary
                            : 'rgba(255, 255, 255, 0.1)',
                      },
                    ]}
                    onPress={() => {
                      setSelectedDateRange(range.label);
                      setShowDateRangePicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.quickRangeText,
                        {
                          color:
                            selectedDateRange === range.label
                              ? theme.colors.primary
                              : theme.colors.text,
                        },
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Custom Date Range */}
              <View style={styles.customRangeSection}>
                <Text
                  style={[
                    styles.customRangeTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Custom Range
                </Text>

                <View style={styles.selectedDatesContainer}>
                  <View style={styles.selectedDate}>
                    <Text
                      style={[
                        styles.selectedDateLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Start Date
                    </Text>
                    <Text
                      style={[
                        styles.selectedDateValue,
                        {
                          color: isSelectingStartDate
                            ? theme.colors.primary
                            : theme.colors.text,
                          fontWeight: isSelectingStartDate ? '600' : '500',
                        },
                      ]}
                    >
                      {customStartDate.toLocaleDateString('en-IN')}
                    </Text>
                  </View>
                  <View style={styles.selectedDate}>
                    <Text
                      style={[
                        styles.selectedDateLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      End Date
                    </Text>
                    <Text
                      style={[
                        styles.selectedDateValue,
                        {
                          color: !isSelectingStartDate
                            ? theme.colors.primary
                            : theme.colors.text,
                          fontWeight: !isSelectingStartDate ? '600' : '500',
                        },
                      ]}
                    >
                      {customEndDate.toLocaleDateString('en-IN')}
                    </Text>
                  </View>
                </View>

                {/* Calendar Header */}
                <View style={styles.calendarHeader}>
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                    style={styles.calendarNavButton}
                  >
                    <ChevronLeft size={20} color={theme.colors.primary} />
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.calendarMonthYear,
                      { color: theme.colors.text },
                    ]}
                  >
                    {currentMonth.toLocaleDateString('en-IN', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                    style={styles.calendarNavButton}
                  >
                    <ChevronRight size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>

                {/* Calendar Days Header */}
                <View style={styles.calendarDaysHeader}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                      <Text
                        key={day}
                        style={[
                          styles.calendarDayHeader,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {day}
                      </Text>
                    )
                  )}
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                  {generateCalendarDays(currentMonth).map((date, index) =>
                    renderCalendarDay(date, index)
                  )}
                </View>

                {/* Apply Custom Range Button */}
                <TouchableOpacity
                  style={[
                    styles.applyRangeButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={() => {
                    setSelectedDateRange('Custom Range');
                    setShowDateRangePicker(false);
                  }}
                >
                  <Text style={styles.applyRangeButtonText}>
                    Apply Custom Range
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryListContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  summaryCardWrapper: {
    width: screenWidth * 0.75,
  },
  summaryCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  summaryGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  summaryCardContent: {
    padding: 16,
    position: 'relative',
    zIndex: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    overflow: 'hidden',
  },
  summaryIconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  summarySubValue: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  filtersSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  filterButtonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  statusDropdown: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  statusOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  salesListSection: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  salesList: {
    gap: 12,
  },
  salesItem: {
    marginBottom: 2,
  },
  salesItemContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  salesItemContent: {
    padding: 16,
  },
  salesItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  salesItemInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  customerName: {
    fontSize: 13,
    fontWeight: '500',
  },
  salesItemMeta: {
    alignItems: 'flex-end',
  },
  salesAmount: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  salesItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salesItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(156, 163, 175, 0.5)',
    marginHorizontal: 2,
  },
  saleDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 200,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  shareModal: {
    maxHeight: '50%',
  },
  shareModalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  shareModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  shareModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  shareOptions: {
    padding: 24,
    gap: 16,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  shareOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  shareOptionText: {
    flex: 1,
  },
  shareOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  shareOptionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Date Picker Modal Styles
  datePickerModal: {
    maxHeight: '85%',
  },
  datePickerContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  quickRanges: {
    padding: 24,
    paddingBottom: 16,
  },
  quickRangeButton: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  quickRangeText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  customRangeSection: {
    padding: 24,
    paddingTop: 8,
  },
  customRangeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  selectedDatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  selectedDate: {
    flex: 1,
    alignItems: 'center',
  },
  selectedDateLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  selectedDateValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  calendarMonthYear: {
    fontSize: 16,
    fontWeight: '600',
  },
  calendarDaysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarDayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedDay: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
  },
  rangeDay: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 8,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  applyRangeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyRangeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
