import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { CreditCard as Edit2, Trash2, Send, Download } from 'lucide-react-native';

export default function PurchaseOrderDetailsScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  // Mock data - replace with actual data fetching
  const orderDetails = {
    orderNumber: 'PO-0001',
    orderDate: '2024-01-25',
    expectedDate: '2024-02-01',
    supplier: {
      name: 'ABC Suppliers',
      address: '123 Main St, City',
      phone: '+91 9876543210',
    },
    items: [
      {
        id: '1',
        name: 'Item 1',
        quantity: 10,
        price: 100,
        amount: 1000,
      },
      {
        id: '2',
        name: 'Item 2',
        quantity: 5,
        price: 200,
        amount: 1000,
      },
    ],
    subtotal: 2000,
    tax: 360,
    total: 2360,
    status: 'draft',
    notes: 'Please deliver during business hours.',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <HeaderBar 
        title="Purchase Order Details" 
        showBack
        rightElement={
          <View style={styles.headerActions}>
            <Button
              title="Edit"
              variant="outline"
              icon={<Edit2 size={18} color={theme.colors.primary} />}
              size="sm"
              style={{ marginRight: 8 }}
            />
            <Button
              title="Delete"
              variant="outline"
              icon={<Trash2 size={18} color={theme.colors.error} />}
              size="sm"
              style={{ borderColor: theme.colors.error }}
              textStyle={{ color: theme.colors.error }}
            />
          </View>
        }
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.orderNumber, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                {orderDetails.orderNumber}
              </Text>
              <Text style={[styles.orderDate, { color: theme.colors.textLight }]}>
                Created on {orderDetails.orderDate}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: theme.colors.primaryLight }]}>
              <Text style={[styles.statusText, { color: theme.colors.primary }]}>
                {orderDetails.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.supplierInfo}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Supplier</Text>
            <Text style={[styles.supplierName, { color: theme.colors.text }]}>{orderDetails.supplier.name}</Text>
            <Text style={[styles.supplierDetails, { color: theme.colors.textLight }]}>{orderDetails.supplier.address}</Text>
            <Text style={[styles.supplierDetails, { color: theme.colors.textLight }]}>{orderDetails.supplier.phone}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.itemsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Items</Text>
            {orderDetails.items.map((item, index) => (
              <View 
                key={item.id}
                style={[
                  styles.itemRow,
                  index < orderDetails.items.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                  }
                ]}
              >
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: theme.colors.text }]}>{item.name}</Text>
                  <Text style={[styles.itemQuantity, { color: theme.colors.textLight }]}>
                    {item.quantity} x ₹{item.price}
                  </Text>
                </View>
                <Text style={[styles.itemAmount, { color: theme.colors.text }]}>
                  ₹{item.amount}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{orderDetails.subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textLight }]}>Tax (18%)</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{orderDetails.tax}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total</Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>₹{orderDetails.total}</Text>
            </View>
          </View>

          {orderDetails.notes && (
            <>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              <View style={styles.notes}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notes</Text>
                <Text style={[styles.notesText, { color: theme.colors.textLight }]}>{orderDetails.notes}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
        <Button 
          title="Download PDF"
          variant="outline"
          icon={<Download size={18} color={theme.colors.primary} />}
          style={{ marginRight: 12 }}
        />
        <Button 
          title="Send to Supplier"
          icon={<Send size={18} color="#FFFFFF" />}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 18,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  supplierInfo: {
    marginBottom: 8,
  },
  supplierName: {
    fontSize: 16,
    marginBottom: 4,
  },
  supplierDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  itemsSection: {
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  summary: {
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  notes: {
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});