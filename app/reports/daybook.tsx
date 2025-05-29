import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, Calendar, ChevronDown, Download, IndianRupee, Filter, Search, Plus, FileText, Info } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DateRange {
  start: Date;
  end: Date;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: string;
  status: 'pending' | 'completed' | 'cancelled';
  category: string;
  reference: string;
}

export default function DaybookReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTransactionTypeFilter, setShowTransactionTypeFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedTransactionType, setSelectedTransactionType] = useState('All Transactions');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const transactionTypes = [
    'All Transactions',
    'Sales',
    'Purchases',
    'Payments',
    'Receipts',
    'Expenses',
    'Journal Entries',
  ];

  const categories = [
    'All Categories',
    'Cash',
    'Bank',
    'Credit Card',
    'Accounts Receivable',
    'Accounts Payable',
    'Inventory',
    'Fixed Assets',
    'Other',
  ];

  const statuses = [
    'All Status',
    'Pending',
    'Completed',
    'Cancelled',
  ];

  const transactions: Transaction[] = [
    { id: '1', date: '2024-03-15', type: 'Sale', description: 'Invoice #1234', amount: '25,000', status: 'completed', category: 'Accounts Receivable', reference: 'INV-1234' },
    { id: '2', date: '2024-03-15', type: 'Payment', description: 'Rent', amount: '15,000', status: 'completed', category: 'Bank', reference: 'PAY-5678' },
    { id: '3', date: '2024-03-14', type: 'Purchase', description: 'Stock', amount: '35,000', status: 'pending', category: 'Accounts Payable', reference: 'PO-9012' },
    { id: '4', date: '2024-03-14', type: 'Receipt', description: 'Customer Payment', amount: '20,000', status: 'completed', category: 'Cash', reference: 'REC-3456' },
    { id: '5', date: '2024-03-13', type: 'Expense', description: 'Office Supplies', amount: '5,000', status: 'completed', category: 'Credit Card', reference: 'EXP-7890' },
  ];

  const cashFlowData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [25000, 35000, 28000, 45000],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const transactionTypeData = {
    labels: ['Sales', 'Purchases', 'Payments', 'Receipts', 'Expenses'],
    datasets: [
      {
        data: [250000, 150000, 100000, 200000, 50000],
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
      stroke: theme.colors.primary,
    },
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report...');
  };

  const handleAddTransaction = () => {
    // TODO: Implement add transaction functionality
    console.log('Adding new transaction...');
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTransactionType === 'All Transactions' || transaction.type === selectedTransactionType;
    const matchesCategory = selectedCategory === 'All Categories' || transaction.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || transaction.status === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Daybook</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleExport} style={styles.headerButton}>
            <Download size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddTransaction} style={styles.headerButton}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search transactions..."
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
              onPress={() => setShowTransactionTypeFilter(!showTransactionTypeFilter)}
            >
              <BookOpen size={20} color={theme.colors.text} />
              <Text style={[styles.filterButtonText, { color: theme.colors.text }]}>
                {selectedTransactionType}
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

            <TouchableOpacity
              style={[styles.filterButton, { borderColor: theme.colors.border }]}
              onPress={() => setShowStatusFilter(!showStatusFilter)}
            >
              <Info size={20} color={theme.colors.text} />
              <Text style={[styles.filterButtonText, { color: theme.colors.text }]}>
                {selectedStatus}
              </Text>
              <ChevronDown size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {showTransactionTypeFilter && (
          <View style={[styles.filterDropdown, { backgroundColor: theme.colors.card }]}>
            {transactionTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterItem,
                  selectedTransactionType === type && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedTransactionType(type);
                  setShowTransactionTypeFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.filterItemText,
                    { color: selectedTransactionType === type ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {type}
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

        {showStatusFilter && (
          <View style={[styles.filterDropdown, { backgroundColor: theme.colors.card }]}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterItem,
                  selectedStatus === status && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedStatus(status);
                  setShowStatusFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.filterItemText,
                    { color: selectedStatus === status ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Opening Balance</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.text} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>1,50,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Closing Balance</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.text} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>1,85,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Income</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.success }]}>₹75,000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Expenses</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.error }]}>₹40,000</Text>
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Cash Flow</Text>
          <LineChart
            data={cashFlowData}
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
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Transaction Types</Text>
          <BarChart
            data={transactionTypeData}
            width={Platform.OS === 'web' ? 600 : 320}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel="₹"
            yAxisSuffix=""
            showValuesOnTopOfBars
          />
        </View>

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Daily Transactions</Text>
            <TouchableOpacity style={styles.tableAction}>
              <FileText size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Date</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Type</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Reference</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Description</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Category</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Status</Text>
          </View>
          {filteredTransactions.map((transaction, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{transaction.date}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{transaction.type}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{transaction.reference}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{transaction.description}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{transaction.category}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{transaction.amount}</Text>
              <Text 
                style={[
                  styles.tableCell, 
                  { 
                    color: transaction.status === 'completed' 
                      ? theme.colors.success 
                      : transaction.status === 'pending' 
                        ? theme.colors.warning 
                        : theme.colors.error 
                  }
                ]}
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Text>
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
}); 