import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit,
  Layers,
  Package,
  Plus,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    name: 'A4 Paper Pack',
    category: 'Stationery',
    stock: 120,
    lowStockAlert: 20,
    unit: 'Pack',
    sellingPrice: 350,
    purchasePrice: 300,
    description: 'High quality A4 size paper for office use.',
    status: 'in_stock',
    hsnCode: '4802',
    gstRate: 12,
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Ball Pen',
    category: 'Stationery',
    stock: 10,
    lowStockAlert: 15,
    unit: 'Box',
    sellingPrice: 120,
    purchasePrice: 90,
    description: 'Smooth writing ball pens, blue ink.',
    status: 'low_stock',
    hsnCode: '9608',
    gstRate: 18,
    image: '',
  },
  {
    id: '3',
    name: 'Printer Ink',
    category: 'Electronics',
    stock: 0,
    lowStockAlert: 5,
    unit: 'Bottle',
    sellingPrice: 800,
    purchasePrice: 650,
    description: 'Compatible with most inkjet printers.',
    status: 'out_of_stock',
    hsnCode: '3215',
    gstRate: 18,
    image: '',
  },
];

const getStatusColor = (status: string, theme: any) => {
  switch (status) {
    case 'in_stock':
      return theme.colors.success;
    case 'low_stock':
      return theme.colors.warning;
    case 'out_of_stock':
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'In Stock';
    case 'low_stock':
      return 'Low Stock';
    case 'out_of_stock':
      return 'Out of Stock';
    default:
      return 'Unknown';
  }
};

function AdjustStockModal({
  visible,
  onClose,
  onSave,
  currentStock,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (newStock: number) => void;
  currentStock: number;
}) {
  const { theme, themeType }: any = useTheme();
  const [newStock, setNewStock] = useState('');
  React.useEffect(() => {
    if (visible) setNewStock('');
  }, [visible]);
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={onClose}
          />
          <Animated.View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              backgroundColor: theme.colors.background,
              maxHeight: SCREEN_HEIGHT * 0.9,
              minHeight: SCREEN_HEIGHT * 0.5,
            }}
          >
            <LinearGradient
              colors={
                themeType === 'dark'
                  ? [
                      '#1A1B3A',
                      '#2D1B69',
                      'rgba(61, 42, 122, 0.3)',
                      'transparent',
                    ]
                  : [
                      '#06D6A0',
                      '#34D399',
                      'rgba(52, 211, 153, 0.2)',
                      'transparent',
                    ]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ paddingBottom: 20 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingTop: Platform.OS === 'android' ? 12 : 8,
                  paddingVertical: 8,
                }}
              >
                <View style={{ width: 40 }} />
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <Package size={20} color="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      letterSpacing: -0.2,
                    }}
                  >
                    Adjust Stock
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={onClose}
                >
                  <Text
                    style={{ color: theme.colors.textSecondary, fontSize: 18 }}
                  >
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 24,
              }}
              showsVerticalScrollIndicator={false}
            >
              <BlurView
                intensity={themeType === 'dark' ? 15 : 80}
                tint={themeType}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <View style={{ marginBottom: 18 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: theme.colors.textSecondary,
                      marginBottom: 8,
                    }}
                  >
                    Current Stock
                  </Text>
                  <View
                    style={{
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(255,255,255,0.8)',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.06)',
                      paddingHorizontal: 16,
                      height: 48,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.text,
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      {currentStock}
                    </Text>
                  </View>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: theme.colors.textSecondary,
                      marginBottom: 8,
                    }}
                  >
                    New Stock Level <Text style={{ color: '#EF4444' }}>*</Text>
                  </Text>
                  <View
                    style={{
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(255,255,255,0.8)',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.06)',
                      paddingHorizontal: 16,
                      height: 48,
                      justifyContent: 'center',
                    }}
                  >
                    <TextInput
                      style={{
                        color: theme.colors.text,
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                      value={newStock}
                      onChangeText={setNewStock}
                      placeholder="Enter new stock level"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      returnKeyType="done"
                    />
                  </View>
                </View>
              </BlurView>
            </ScrollView>
            <BlurView
              intensity={themeType === 'dark' ? 20 : 80}
              tint={themeType}
              style={{
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                paddingBottom: Platform.OS === 'ios' ? 34 : 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 24,
                  paddingTop: 24,
                  gap: 16,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderRadius: 16,
                    borderWidth: 1,
                    gap: 10,
                    backgroundColor:
                      themeType === 'dark'
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.05)',
                    borderColor:
                      themeType === 'dark'
                        ? 'rgba(255,255,255,0.15)'
                        : 'rgba(0,0,0,0.1)',
                  }}
                  onPress={onClose}
                >
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: -0.1,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 2, borderRadius: 16, overflow: 'hidden' }}
                  onPress={() => {
                    if (!newStock || isNaN(Number(newStock))) return;
                    onSave(Number(newStock));
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[
                      theme.colors.primary,
                      theme.colors.primaryLight || theme.colors.primary,
                    ]}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 16,
                      paddingHorizontal: 20,
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 16,
                        letterSpacing: -0.1,
                      }}
                    >
                      Save
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function ItemView() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the item by id (mock)
  const item = mockItems.find((i) => i.id === id) || mockItems[0];

  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [mockStock, setMockStock] = useState(item.stock);

  const handleEdit = () => {
    router.push(`/items/form?id=${item.id}`);
  };
  const handleDelete = () => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => router.back() },
    ]);
  };
  const handleAddStock = () => {
    setShowAdjustModal(true);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#06D6A0', '#34D399', 'rgba(52, 211, 153, 0.2)', 'transparent']
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
              <Package size={20} color="#FFFFFF" />
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                Item
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
        <View style={styles.imageCard}>
          <View style={styles.imageWrapper}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                {/* Placeholder content */}
              </View>
            )}
          </View>
        </View>
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Item Details
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status, theme) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(item.status)}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Name
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Category
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.category}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              HSN Code
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.hsnCode || '-'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              GST Rate
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.gstRate ? `${item.gstRate}%` : '-'}
            </Text>
          </View>
        </BlurView>
        <BlurView
          intensity={themeType === 'dark' ? 15 : 80}
          tint={themeType}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Layers size={18} color={theme.colors.accent} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Stock & Pricing
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Stock
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.stock} {item.unit}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Low Stock Alert
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.lowStockAlert} {item.unit}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Selling Price
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
              ₹{item.sellingPrice.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>
              Purchase Price
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              ₹{item.purchasePrice.toLocaleString('en-IN')}
            </Text>
          </View>
        </BlurView>
        {item.description ? (
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Description
              </Text>
            </View>
            <Text
              style={[styles.notesText, { color: theme.colors.textSecondary }]}
            >
              {item.description}
            </Text>
          </BlurView>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          },
        ]}
        onPress={handleAddStock}
        activeOpacity={0.85}
      >
        <Plus size={28} color="#fff" />
        <Text style={styles.fabLabel}>Adjust Stock</Text>
      </TouchableOpacity>
      <AdjustStockModal
        visible={showAdjustModal}
        onClose={() => setShowAdjustModal(false)}
        onSave={(newStock) => {
          setMockStock(newStock);
          setShowAdjustModal(false);
        }}
        currentStock={mockStock}
      />
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
    paddingBottom: 80,
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  fabLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: -0.2,
  },
  imageCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    padding: 18,
    // backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(99,102,241,0.15)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(148,163,184,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
