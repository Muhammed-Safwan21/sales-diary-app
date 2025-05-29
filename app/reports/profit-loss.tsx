import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Download, Filter, ChevronDown, TrendingUp, IndianRupee, Search, Info, FileText, Plus } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

interface DateRange {
  start: Date;
  end: Date;
}

interface FinancialMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export default function ProfitLossReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showNotes, setShowNotes] = useState(false);

  const periods = [
    'This Month',
    'Last Month',
    'This Quarter',
    'Last Quarter',
    'This Year',
    'Last Year',
    'Custom',
  ];

  const categories = [
    'All Categories',
    'Revenue',
    'Cost of Sales',
    'Operating Expenses',
    'Other Income',
    'Other Expenses',
    'Taxes',
  ];

  const profitTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [15000, 25000, 18000, 30000, 22000, 35000],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const revenueVsExpenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [250000, 300000, 280000, 350000, 320000, 400000],
        color: () => theme.colors.success,
      },
      {
        data: [175000, 200000, 190000, 250000, 220000, 280000],
        color: () => theme.colors.error,
      },
    ],
  };

  const expenseDistributionData = [
    {
      name: 'Cost of Goods',
      population: 45,
      color: theme.colors.primary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Operating Expenses',
      population: 30,
      color: theme.colors.secondary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Taxes',
      population: 15,
      color: theme.colors.accent,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Other',
      population: 10,
      color: theme.colors.success,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
  ];

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

  const financialMetrics: FinancialMetric[] = [
    { name: 'Gross Profit Margin', value: '45%', change: '+2%', trend: 'up' },
    { name: 'Operating Margin', value: '25%', change: '+1%', trend: 'up' },
    { name: 'Net Profit Margin', value: '18%', change: '-1%', trend: 'down' },
    { name: 'EBITDA Margin', value: '30%', change: '+3%', trend: 'up' },
  ];

  const notes = [
    'The financial statements are prepared in accordance with Indian Accounting Standards (Ind AS).',
    'All amounts are in Indian Rupees (₹).',
    'The company follows the accrual basis of accounting.',
    'Revenue is recognized when goods are delivered or services are rendered.',
    'Expenses are recognized when incurred, regardless of when payment is made.',
  ];

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report...');
  };

  const handleAddEntry = () => {
    // TODO: Implement add entry functionality
    console.log('Adding new entry...');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profit & Loss</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleExport} style={styles.headerButton}>
            <Download size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddEntry} style={styles.headerButton}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search entries..."
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filters}>
          <View style={styles.dateFilters}>
            <TouchableOpacity
              style={[styles.dateInput, { borderColor: theme.colors.border }]}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Calendar size={20} color={theme.colors.text} />
              <Text style={[styles.dateText, { color: theme.colors.text }]}>
                {dateRange.start.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.dateSeparator, { color: theme.colors.text }]}>to</Text>

            <TouchableOpacity
              style={[styles.dateInput, { borderColor: theme.colors.border }]}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Calendar size={20} color={theme.colors.text} />
              <Text style={[styles.dateText, { color: theme.colors.text }]}>
                {dateRange.end.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, { borderColor: theme.colors.border }]}
              onPress={() => setShowPeriodFilter(!showPeriodFilter)}
            >
              <TrendingUp size={20} color={theme.colors.text} />
              <Text style={[styles.filterButtonText, { color: theme.colors.text }]}>
                {selectedPeriod}
              </Text>
              <ChevronDown size={20} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, { borderColor: theme.colors.border }]}
              onPress={() => setShowCategoryFilter(!showCategoryFilter)}
            >
              <Filter size={20} color={theme.colors.text} />
              <Text style={[styles.filterButtonText, { color: theme.colors.text }]}>
                {selectedCategory}
              </Text>
              <ChevronDown size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {showPeriodFilter && (
          <View style={[styles.filterDropdown, { backgroundColor: theme.colors.card }]}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.filterItem,
                  selectedPeriod === period && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedPeriod(period);
                  setShowPeriodFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.filterItemText,
                    { color: selectedPeriod === period ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {showCategoryFilter && (
          <View style={[styles.filterDropdown, { backgroundColor: theme.colors.card }]}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterItem,
                  selectedCategory === category && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategoryFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.filterItemText,
                    { color: selectedCategory === category ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Financial Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Revenue</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.success} />
                <Text style={[styles.summaryAmount, { color: theme.colors.success }]}>2,50,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Expenses</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.error} />
                <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>1,75,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Net Profit</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>75,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Profit Margin</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>30%</Text>
            </View>
          </View>
        </View>

        <View style={[styles.metricsCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.metricsTitle, { color: theme.colors.text }]}>Key Financial Metrics</Text>
          <View style={styles.metricsGrid}>
            {financialMetrics.map((metric, index) => (
              <View key={index} style={styles.metricItem}>
                <Text style={[styles.metricName, { color: theme.colors.textLight }]}>{metric.name}</Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text 
                  style={[
                    styles.metricChange,
                    { 
                      color: metric.trend === 'up' 
                        ? theme.colors.success 
                        : metric.trend === 'down' 
                          ? theme.colors.error 
                          : theme.colors.text 
                    }
                  ]}
                >
                  {metric.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Profit Trend</Text>
          <LineChart
            data={profitTrendData}
            width={Platform.OS === 'web' ? 600 : 320}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisLabel="₹"
            yAxisSuffix=""
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

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Revenue vs Expenses</Text>
          <BarChart
            data={revenueVsExpenseData}
            width={Platform.OS === 'web' ? 600 : 320}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel="₹"
            yAxisSuffix=""
            showValuesOnTopOfBars
          />
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Expense Distribution</Text>
          <PieChart
            data={expenseDistributionData}
            width={Platform.OS === 'web' ? 600 : 320}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Income Details</Text>
            <TouchableOpacity style={styles.tableAction}>
              <FileText size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {[
            { category: 'Sales', amount: '1,80,000', percentage: '72%' },
            { category: 'Services', amount: '45,000', percentage: '18%' },
            { category: 'Other Income', amount: '25,000', percentage: '10%' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Expense Details</Text>
            <TouchableOpacity style={styles.tableAction}>
              <FileText size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {[
            { category: 'Cost of Goods', amount: '78,750', percentage: '45%' },
            { category: 'Operating Expenses', amount: '52,500', percentage: '30%' },
            { category: 'Taxes', amount: '26,250', percentage: '15%' },
            { category: 'Other Expenses', amount: '17,500', percentage: '10%' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.notesButton, { backgroundColor: theme.colors.card }]}
          onPress={() => setShowNotes(!showNotes)}
        >
          <Text style={[styles.notesButtonText, { color: theme.colors.primary }]}>
            {showNotes ? 'Hide Notes' : 'Show Notes'}
          </Text>
        </TouchableOpacity>

        {showNotes && (
          <View style={[styles.notesCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.notesTitle, { color: theme.colors.text }]}>Notes to Financial Statements</Text>
            {notes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <Text style={[styles.noteText, { color: theme.colors.text }]}>{index + 1}. {note}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {(showStartDatePicker || showEndDatePicker) && (
        <DateTimePicker
          value={showStartDatePicker ? dateRange.start : dateRange.end}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              if (showStartDatePicker) {
                setDateRange({ ...dateRange, start: selectedDate });
                setShowStartDatePicker(false);
              } else {
                setDateRange({ ...dateRange, end: selectedDate });
                setShowEndDatePicker(false);
              }
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 14,
  },
  filters: {
    marginBottom: 16,
  },
  dateFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 14,
  },
  dateSeparator: {
    marginHorizontal: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  filterButtonText: {
    flex: 1,
    fontSize: 14,
  },
  filterDropdown: {
    position: 'absolute',
    top: 180,
    right: 16,
    width: 200,
    borderRadius: 8,
    padding: 8,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  filterItem: {
    padding: 12,
    borderRadius: 6,
  },
  filterItemText: {
    fontSize: 14,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  metricsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  metricName: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  tableCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tableAction: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  notesButton: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  notesButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  notesCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  noteItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 