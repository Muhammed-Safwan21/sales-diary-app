import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Download, Filter, ChevronDown, Users } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';
import { LineChart } from 'react-native-chart-kit';

interface DateRange {
  start: Date;
  end: Date;
}

export default function PurchaseReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showSupplierFilter, setShowSupplierFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');

  const suppliers = [
    'All Suppliers',
    'ABC Suppliers',
    'XYZ Trading',
    'Global Imports',
    'Local Vendors',
  ];

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [25000, 35000, 22000, 45000],
        color: () => theme.colors.secondary,
        strokeWidth: 2,
      },
    ],
  };

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
      stroke: theme.colors.secondary,
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
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Purchase Report</Text>
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
            style={[styles.supplierFilter, { borderColor: theme.colors.border }]}
            onPress={() => setShowSupplierFilter(!showSupplierFilter)}
          >
            <Users size={20} color={theme.colors.text} />
            <Text style={[styles.supplierText, { color: theme.colors.text }]}>
              {selectedSupplier}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {showSupplierFilter && (
          <View style={[styles.supplierDropdown, { backgroundColor: theme.colors.card }]}>
            {suppliers.map((supplier) => (
              <TouchableOpacity
                key={supplier}
                style={[
                  styles.supplierItem,
                  selectedSupplier === supplier && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedSupplier(supplier);
                  setShowSupplierFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.supplierItemText,
                    { color: selectedSupplier === supplier ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {supplier}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Purchase Overview</Text>
          <LineChart
            data={data}
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

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Purchases</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹1,27,000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Bills</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>32</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Average Bill Value</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹3,969</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Growth</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.error }]}>-8.3%</Text>
            </View>
          </View>
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
  supplierFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  supplierText: {
    fontSize: 14,
  },
  supplierDropdown: {
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
  supplierItem: {
    padding: 12,
    borderRadius: 6,
  },
  supplierItemText: {
    fontSize: 14,
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
  summaryCard: {
    borderRadius: 12,
    padding: 16,
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
    fontSize: 16,
    fontWeight: '600',
  },
}); 