import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Download, Filter, ChevronDown, Users, IndianRupee } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/shared/Button';
import { LineChart } from 'react-native-chart-kit';

interface DateRange {
  start: Date;
  end: Date;
}

export default function PartyReportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showPartyTypeFilter, setShowPartyTypeFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [selectedPartyType, setSelectedPartyType] = useState('All Parties');

  const partyTypes = [
    'All Parties',
    'Customers',
    'Suppliers',
    'Both',
  ];

  const agingData = {
    labels: ['0-30', '31-60', '61-90', '>90'],
    datasets: [
      {
        data: [45000, 25000, 15000, 5000],
        color: () => theme.colors.primary,
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
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Party Report</Text>
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
            style={[styles.partyTypeFilter, { borderColor: theme.colors.border }]}
            onPress={() => setShowPartyTypeFilter(!showPartyTypeFilter)}
          >
            <Users size={20} color={theme.colors.text} />
            <Text style={[styles.partyTypeText, { color: theme.colors.text }]}>
              {selectedPartyType}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {showPartyTypeFilter && (
          <View style={[styles.partyTypeDropdown, { backgroundColor: theme.colors.card }]}>
            {partyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.partyTypeItem,
                  selectedPartyType === type && { backgroundColor: theme.colors.primaryLight },
                ]}
                onPress={() => {
                  setSelectedPartyType(type);
                  setShowPartyTypeFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.partyTypeItemText,
                    { color: selectedPartyType === type ? theme.colors.primary : theme.colors.text },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Receivables</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.primary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>1,25,000</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Total Payables</Text>
              <View style={styles.summaryValue}>
                <IndianRupee size={16} color={theme.colors.secondary} />
                <Text style={[styles.summaryAmount, { color: theme.colors.text }]}>85,000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Aging Analysis</Text>
          <LineChart
            data={agingData}
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

        <View style={[styles.tableCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Top Parties</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Party Name</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Type</Text>
            <Text style={[styles.tableHeaderText, { color: theme.colors.textLight }]}>Balance</Text>
          </View>
          {[
            { name: 'ABC Corp', type: 'Customer', balance: '45,000' },
            { name: 'XYZ Ltd', type: 'Supplier', balance: '35,000' },
            { name: 'PQR Inc', type: 'Customer', balance: '25,000' },
          ].map((party, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{party.name}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>{party.type}</Text>
              <Text style={[styles.tableCell, { color: theme.colors.text }]}>₹{party.balance}</Text>
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
  partyTypeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  partyTypeText: {
    fontSize: 14,
  },
  partyTypeDropdown: {
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
  partyTypeItem: {
    padding: 12,
    borderRadius: 6,
  },
  partyTypeItemText: {
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