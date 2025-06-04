import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ChevronDown, Download, IndianRupee, Info, Scale } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DateRange {
  start: Date;
  end: Date;
}

export default function BalanceSheetScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showNotes, setShowNotes] = useState(false);

  const periods = [
    'This Month',
    'Last Month',
    'This Quarter',
    'This Year',
    'Custom',
  ];

  const equityTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [500000, 550000, 600000, 650000, 700000, 750000],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const assetDistributionData = [
    {
      name: 'Current Assets',
      population: 45,
      color: theme.colors.primary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Fixed Assets',
      population: 35,
      color: theme.colors.secondary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Investments',
      population: 15,
      color: theme.colors.accent,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Other Assets',
      population: 5,
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

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report...');
  };

  const currentAssets = [
    { name: 'Cash and Cash Equivalents', amount: '2,50,000', percentage: '16.7%' },
    { name: 'Accounts Receivable', amount: '3,00,000', percentage: '20%' },
    { name: 'Inventory', amount: '1,25,000', percentage: '8.3%' },
    { name: 'Prepaid Expenses', amount: '50,000', percentage: '3.3%' },
    { name: 'Other Current Assets', amount: '50,000', percentage: '3.3%' },
  ];

  const fixedAssets = [
    { name: 'Property, Plant & Equipment', amount: '4,00,000', percentage: '26.7%' },
    { name: 'Intangible Assets', amount: '1,00,000', percentage: '6.7%' },
    { name: 'Long-term Investments', amount: '2,25,000', percentage: '15%' },
  ];

  const currentLiabilities = [
    { name: 'Accounts Payable', amount: '1,50,000', percentage: '10%' },
    { name: 'Short-term Loans', amount: '1,00,000', percentage: '6.7%' },
    { name: 'Accrued Expenses', amount: '50,000', percentage: '3.3%' },
  ];

  const longTermLiabilities = [
    { name: 'Long-term Loans', amount: '3,00,000', percentage: '20%' },
    { name: 'Deferred Tax Liabilities', amount: '1,50,000', percentage: '10%' },
  ];

  const equityItems = [
    { name: 'Share Capital', amount: '5,00,000', percentage: '33.3%' },
    { name: 'Retained Earnings', amount: '2,50,000', percentage: '16.7%' },
  ];

  const financialRatios = [
    { ratio: 'Current Ratio', value: '2.5', status: 'Good', description: 'Measures ability to pay short-term obligations' },
    { ratio: 'Debt to Equity', value: '1.0', status: 'Good', description: 'Measures financial leverage' },
    { ratio: 'Return on Assets', value: '15%', status: 'Good', description: 'Measures profitability relative to assets' },
    { ratio: 'Return on Equity', value: '20%', status: 'Good', description: 'Measures profitability relative to equity' },
    { ratio: 'Working Capital Ratio', value: '1.8', status: 'Good', description: 'Measures operational efficiency' },
  ];

  const notes = [
    'The financial statements are prepared in accordance with Indian Accounting Standards (Ind AS).',
    'All amounts are in Indian Rupees (₹).',
    'The company follows the accrual basis of accounting.',
    'Fixed assets are stated at cost less accumulated depreciation.',
    'Inventory is valued at the lower of cost or net realizable value.',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Balance Sheet</Text>
        <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
          <Download size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
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

          <TouchableOpacity
            style={[styles.periodFilter, { borderColor: theme.colors.border }]}
            onPress={() => setShowPeriodFilter(!showPeriodFilter)}
          >
            <Scale size={20} color={theme.colors.text} />
            <Text style={[styles.periodText, { color: theme.colors.text }]}>
              {selectedPeriod}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {showPeriodFilter && (
          <View style={[styles.periodDropdown, { backgroundColor: theme.colors.card }]}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodItem,
                  selectedPeriod === period && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedPeriod(period);
                  setShowPeriodFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.periodItemText,
                    { color: selectedPeriod === period ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Financial Position</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Assets</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.success} />
                <Text style={[styles.summaryAmount, { color: theme.colors.success }]}>15,00,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Liabilities</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.error} />
                <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>7,50,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Equity</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>7,50,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Working Capital</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.secondary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.secondary }]}>3,00,000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Equity Trend</Text>
          <LineChart
            data={equityTrendData}
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
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Asset Distribution</Text>
          <PieChart
            data={assetDistributionData}
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
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Current Assets</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {currentAssets.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Fixed Assets</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {fixedAssets.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Current Liabilities</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {currentLiabilities.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Long-term Liabilities</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {longTermLiabilities.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Shareholders' Equity</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>% of Total</Text>
          </View>
          {equityItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.percentage}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Financial Ratios</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Ratio</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Value</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Status</Text>
          </View>
          {financialRatios.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.ratioCell}>
                <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.ratio}</Text>
                <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
                  <Info size={16} color={theme.colors.textLight} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.value}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.success }]}>{item.status}</Text>
            </View>
          ))}
        </View>

        {showNotes && (
          <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Notes to Financial Statements</Text>
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
  exportButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateFilters: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
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
  periodFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  periodText: {
    fontSize: 14,
  },
  periodDropdown: {
    position: 'absolute',
    top: 100,
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
  periodItem: {
    padding: 12,
    borderRadius: 6,
  },
  periodItemText: {
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
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  ratioCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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