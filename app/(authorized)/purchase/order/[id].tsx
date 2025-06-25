import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Edit,
  FileText,
  IndianRupee,
  Package,
  Trash2,
  Download,
  Send,
  Building2,
} from 'lucide-react-native';

export default function PurchaseOrderDetailsScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
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

  const handleEdit = () => {
    router.push(`/purchase/order/form/create?id=${orderDetails.orderNumber}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Purchase Order',
      'Are you sure you want to delete this purchase order?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Download PDF functionality coming soon.');
  };

  const handleSend = () => {
    Alert.alert('Send', 'Send to supplier functionality coming soon.');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
              <FileText size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                Purchase Order
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Edit size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleDelete}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Details Section */}
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Order Details
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: theme.colors.primaryLight },
              ]}
            >
              <Text
                style={[styles.statusText, { color: theme.colors.primary }]}
              >
                {orderDetails.status.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Order Number
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {orderDetails.orderNumber}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Order Date
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {new Date(orderDetails.orderDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Expected Date
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {new Date(orderDetails.expectedDate).toLocaleDateString()}
            </Text>
          </View>
        </BlurView>

        {/* Supplier Information Section */}
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Building2 size={18} color="#10B981" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Supplier Information
            </Text>
          </View>
          <View style={styles.supplierInfo}>
            <Text style={[styles.supplierName, { color: theme.colors.text }]}>
              {orderDetails.supplier.name}
            </Text>
            <Text
              style={[
                styles.supplierDetails,
                { color: theme.colors.textSecondary },
              ]}
            >
              {orderDetails.supplier.address}
            </Text>
            <Text
              style={[
                styles.supplierDetails,
                { color: theme.colors.textSecondary },
              ]}
            >
              {orderDetails.supplier.phone}
            </Text>
          </View>
        </BlurView>

        {/* Items Section */}
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Package size={18} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Order Items
            </Text>
          </View>
          {orderDetails.items.map((item, idx) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.itemMeta,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Qty: {item.quantity} x ₹{item.price}
                </Text>
              </View>
              <View style={styles.itemRight}>
                <Text
                  style={[styles.itemAmount, { color: theme.colors.primary }]}
                >
                  ₹{item.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </BlurView>

        {/* Summary Section */}
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <IndianRupee size={18} color="#F97316" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Summary
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Subtotal
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              ₹{orderDetails.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Tax (18%)
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              ₹{orderDetails.tax.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text
              style={[styles.summaryTotalLabel, { color: theme.colors.text }]}
            >
              Total Amount
            </Text>
            <Text
              style={[
                styles.summaryTotalValue,
                { color: theme.colors.primary },
              ]}
            >
              ₹{orderDetails.total.toFixed(2)}
            </Text>
          </View>
        </BlurView>

        {/* Notes Section */}
        {orderDetails.notes ? (
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Notes
              </Text>
            </View>
            <Text
              style={[styles.notesText, { color: theme.colors.textSecondary }]}
            >
              {orderDetails.notes}
            </Text>
          </BlurView>
        ) : null}
      </ScrollView>

      {/* Footer Actions */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity style={styles.footerAction} onPress={handleDownload}>
          <Download size={22} color={theme.colors.primary} />
          <Text
            style={[
              styles.footerActionLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerAction} onPress={handleSend}>
          <Send size={22} color={theme.colors.primary} />
          <Text
            style={[
              styles.footerActionLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingBottom: 20 },
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  section: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  supplierInfo: {
    gap: 4,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  supplierDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
  },
  itemRight: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
  },
  footerAction: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  footerActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
