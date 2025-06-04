import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Download, Filter, ChevronDown, Receipt, IndianRupee, AlertCircle } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';
import { LineChart, PieChart } from 'react-native-chart-kit';

interface DateRange {
  start: Date;
  end: Date;
}

export default function GSTReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showReturnFilter, setShowReturnFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedReturn, setSelectedReturn] = useState('GSTR-1');

  const returnTypes = [
    'GSTR-1',
    'GSTR-2',
    'GSTR-3B',
    'GSTR-4',
    'GSTR-9',
  ];

  const taxLiabilityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [25000, 30000, 28000, 35000, 32000, 40000],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const taxDistributionData = [
    {
      name: 'CGST',
      population: 50,
      color: theme.colors.primary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'SGST',
      population: 50,
      color: theme.colors.secondary,
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>GST Report</Text>
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
            style={[styles.returnFilter, { borderColor: theme.colors.border }]}
            onPress={() => setShowReturnFilter(!showReturnFilter)}
          >
            <Receipt size={20} color={theme.colors.text} />
            <Text style={[styles.returnText, { color: theme.colors.text }]}>
              {selectedReturn}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {showReturnFilter && (
          <View style={[styles.returnDropdown, { backgroundColor: theme.colors.card }]}>
            {returnTypes.map((returnType) => (
              <TouchableOpacity
                key={returnType}
                style={[
                  styles.returnItem,
                  selectedReturn === returnType && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedReturn(returnType);
                  setShowReturnFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.returnItemText,
                    { color: selectedReturn === returnType ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {returnType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Tax Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Output Tax</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.error} />
                <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>2,00,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Input Tax</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.success} />
                <Text style={[styles.summaryAmount, { color: theme.colors.success }]}>1,50,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Net Tax</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>50,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>ITC Available</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.secondary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.secondary }]}>1,50,000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Tax Liability Trend</Text>
          <LineChart
            data={taxLiabilityData}
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
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Tax Distribution</Text>
          <PieChart
            data={taxDistributionData}
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
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Return Status</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Return Type</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Due Date</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Status</Text>
          </View>
          {[
            { type: 'GSTR-1', dueDate: '11/04/2024', status: 'Filed' },
            { type: 'GSTR-2', dueDate: '15/04/2024', status: 'Pending' },
            { type: 'GSTR-3B', dueDate: '20/04/2024', status: 'Pending' },
            { type: 'GSTR-4', dueDate: '30/04/2024', status: 'Upcoming' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.type}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.dueDate}</Text>
              <Text
                style={[
                  styles.tableCell,
                  {
                    color:
                      item.status === 'Filed'
                        ? theme.colors.success
                        : item.status === 'Pending'
                        ? theme.colors.error
                        : theme.colors.warning,
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Tax Payment History</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Date</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Return Type</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
          </View>
          {[
            { date: '20/03/2024', type: 'GSTR-3B', amount: '45,000' },
            { date: '20/02/2024', type: 'GSTR-3B', amount: '38,000' },
            { date: '20/01/2024', type: 'GSTR-3B', amount: '42,000' },
            { date: '20/12/2023', type: 'GSTR-3B', amount: '35,000' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.date}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.type}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>ITC Summary</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Eligible</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Ineligible</Text>
          </View>
          {[
            { category: 'Raw Materials', eligible: '1,00,000', ineligible: '0' },
            { category: 'Capital Goods', eligible: '25,000', ineligible: '5,000' },
            { category: 'Services', eligible: '15,000', ineligible: '2,000' },
            { category: 'Others', eligible: '10,000', ineligible: '3,000' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.success }]}>₹{item.eligible}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.error }]}>₹{item.ineligible}</Text>
            </View>
          ))}
        </View>
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
  returnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  returnText: {
    fontSize: 14,
  },
  returnDropdown: {
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
  returnItem: {
    padding: 12,
    borderRadius: 6,
  },
  returnItemText: {
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
}); 