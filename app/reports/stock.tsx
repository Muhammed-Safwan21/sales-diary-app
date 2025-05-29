import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Download, Filter, ChevronDown, Package, IndianRupee, AlertTriangle } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';
import { LineChart, PieChart } from 'react-native-chart-kit';

interface DateRange {
  start: Date;
  end: Date;
}

export default function StockReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Electronics',
    'Clothing',
    'Food',
    'Other',
  ];

  const stockTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [150, 200, 180, 250, 220, 300],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const categoryDistributionData = [
    {
      name: 'Electronics',
      population: 40,
      color: theme.colors.primary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Clothing',
      population: 30,
      color: theme.colors.secondary,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Food',
      population: 20,
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
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Stock Summary</Text>
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
            style={[styles.categoryFilter, { borderColor: theme.colors.border }]}
            onPress={() => setShowCategoryFilter(!showCategoryFilter)}
          >
            <Package size={20} color={theme.colors.text} />
            <Text style={[styles.categoryText, { color: theme.colors.text }]}>
              {selectedCategory}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {showCategoryFilter && (
          <View style={[styles.categoryDropdown, { backgroundColor: theme.colors.card }]}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategoryFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryItemText,
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
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Items</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>1,250</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Value</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>5,75,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Low Stock Items</Text>
              <View style={styles.summaryValue}>
                <AlertTriangle size={16} color={theme.colors.error} />
                <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>15</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Out of Stock</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.error }]}>5</Text>
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Stock Trend</Text>
          <LineChart
            data={stockTrendData}
            width={Platform.OS === 'web' ? 600 : 320}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=" units"
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
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Category Distribution</Text>
          <PieChart
            data={categoryDistributionData}
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
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Low Stock Items</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Current Stock</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Reorder Level</Text>
          </View>
          {[
            { item: 'Laptop Model X', category: 'Electronics', current: '5', reorder: '10' },
            { item: 'T-Shirt M', category: 'Clothing', current: '8', reorder: '15' },
            { item: 'Protein Powder', category: 'Food', current: '3', reorder: '20' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.item}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.error }]}>{item.current}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.reorder}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Top Stock Items</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Quantity</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Value</Text>
          </View>
          {[
            { item: 'Smartphone Y', category: 'Electronics', quantity: '100', value: '15,00,000' },
            { item: 'Jeans L', category: 'Clothing', quantity: '150', value: '2,25,000' },
            { item: 'Protein Bars', category: 'Food', quantity: '200', value: '1,00,000' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.item}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{item.value}</Text>
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
  categoryFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
  },
  categoryDropdown: {
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
  categoryItem: {
    padding: 12,
    borderRadius: 6,
  },
  categoryItemText: {
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