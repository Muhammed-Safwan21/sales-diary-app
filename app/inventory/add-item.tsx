import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HeaderBar } from '@/components/shared/HeaderBar';
import { Button } from '@/components/shared/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Camera } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInUp } from 'react-native-reanimated';

const UnitOptions = ['Pcs', 'Kg', 'Ltr', 'Box', 'Dozen', 'Bundle'];
const GstRates = [0, 3, 5, 12, 18, 28];

export default function AddItemScreen() {
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    hsnCode: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    unit: 'Pcs',
    lowStockAlert: '',
    gstRate: '18',
    description: '',
    includeGst: true,
  });
  
  const [showUnitOptions, setShowUnitOptions] = useState(false);
  const [showGstOptions, setShowGstOptions] = useState(false);
  
  const updateField = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const selectUnit = (unit: string) => {
    updateField('unit', unit);
    setShowUnitOptions(false);
  };
  
  const selectGstRate = (rate: number) => {
    updateField('gstRate', rate.toString());
    setShowGstOptions(false);
  };
  
  const calculateProfit = () => {
    const purchase = parseFloat(formData.purchasePrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    
    if (purchase === 0 || selling === 0) return { amount: 0, percentage: 0 };
    
    const profit = selling - purchase;
    const percentage = (profit / purchase) * 100;
    
    return {
      amount: profit,
      percentage: parseFloat(percentage.toFixed(2))
    };
  };
  
  const profit = calculateProfit();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <HeaderBar 
          title="Add Item" 
          showBack
        />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            {/* Basic Information */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Basic Information
            </Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>
                  Item Name*
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.text
                    }
                  ]}
                  placeholder="Enter item name"
                  placeholderTextColor={theme.colors.textLight}
                  value={formData.name}
                  onChangeText={(text) => updateField('name', text)}
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.textLight }]}>
                  Category
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.text
                    }
                  ]}
                  placeholder="Enter category"
                  placeholderTextColor={theme.colors.textLight}
                  value={formData.category}
                  onChangeText={(text) => updateField('category', text)}
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>
                    HSN/SAC Code
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                        color: theme.colors.text
                      }
                    ]}
                    placeholder="Enter code"
                    placeholderTextColor={theme.colors.textLight}
                    value={formData.hsnCode}
                    onChangeText={(text) => updateField('hsnCode', text)}
                  />
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>
                    Unit
                  </Text>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={[
                        styles.input,
                        styles.selectInput,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                        }
                      ]}
                      onPress={() => setShowUnitOptions(!showUnitOptions)}
                    >
                      <Text style={{ color: theme.colors.text }}>
                        {formData.unit}
                      </Text>
                      <ChevronDown size={20} color={theme.colors.textLight} />
                    </TouchableOpacity>
                    
                    {showUnitOptions && (
                      <View 
                        style={[
                          styles.optionsContainer, 
                          { 
                            backgroundColor: theme.colors.card,
                            borderColor: theme.colors.border,
                          }
                        ]}
                      >
                        {UnitOptions.map((unit, index) => (
                          <TouchableOpacity
                            key={unit}
                            style={[
                              styles.optionItem,
                              index < UnitOptions.length - 1 && {
                                borderBottomWidth: 1,
                                borderBottomColor: theme.colors.border,
                              }
                            ]}
                            onPress={() => selectUnit(unit)}
                          >
                            <Text style={{ color: theme.colors.text }}>
                              {unit}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            
            {/* Pricing Information */}
            <Animated.View entering={FadeInUp.delay(200).springify()}>
              <Text 
                style={[
                  styles.sectionTitle, 
                  { 
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily.medium, 
                    marginTop: 24 
                  }
                ]}
              >
                Pricing Information
              </Text>
              
              <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={[styles.label, { color: theme.colors.textLight }]}>
                      Purchase Price*
                    </Text>
                    <View style={styles.priceInputContainer}>
                      <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.text,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            flex: 1,
                          }
                        ]}
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.textLight}
                        keyboardType="numeric"
                        value={formData.purchasePrice}
                        onChangeText={(text) => updateField('purchasePrice', text)}
                      />
                    </View>
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={[styles.label, { color: theme.colors.textLight }]}>
                      Selling Price*
                    </Text>
                    <View style={styles.priceInputContainer}>
                      <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.text,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            flex: 1,
                          }
                        ]}
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.textLight}
                        keyboardType="numeric"
                        value={formData.sellingPrice}
                        onChangeText={(text) => updateField('sellingPrice', text)}
                      />
                    </View>
                  </View>
                </View>
                
                <View style={[styles.profitContainer, { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primaryDark }]}>
                  <View style={styles.profitItem}>
                    <Text style={[styles.profitLabel, { color: theme.colors.primary }]}>Profit Amount</Text>
                    <Text style={[styles.profitValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                      ₹{profit.amount.toFixed(2)}
                    </Text>
                  </View>
                  
                  <View style={styles.profitDivider} />
                  
                  <View style={styles.profitItem}>
                    <Text style={[styles.profitLabel, { color: theme.colors.primary }]}>Profit Margin</Text>
                    <Text style={[styles.profitValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                      {profit.percentage}%
                    </Text>
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>
                    GST Rate
                  </Text>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={[
                        styles.input,
                        styles.selectInput,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                        }
                      ]}
                      onPress={() => setShowGstOptions(!showGstOptions)}
                    >
                      <Text style={{ color: theme.colors.text }}>
                        {formData.gstRate}%
                      </Text>
                      <ChevronDown size={20} color={theme.colors.textLight} />
                    </TouchableOpacity>
                    
                    {showGstOptions && (
                      <View 
                        style={[
                          styles.optionsContainer, 
                          { 
                            backgroundColor: theme.colors.card,
                            borderColor: theme.colors.border,
                          }
                        ]}
                      >
                        {GstRates.map((rate, index) => (
                          <TouchableOpacity
                            key={rate.toString()}
                            style={[
                              styles.optionItem,
                              index < GstRates.length - 1 && {
                                borderBottomWidth: 1,
                                borderBottomColor: theme.colors.border,
                              }
                            ]}
                            onPress={() => selectGstRate(rate)}
                          >
                            <Text style={{ color: theme.colors.text }}>
                              {rate}%
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.switchContainer}>
                  <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                    Price inclusive of GST
                  </Text>
                  <Switch
                    value={formData.includeGst}
                    onValueChange={(value) => updateField('includeGst', value)}
                    trackColor={{ false: '#D1D5DB', true: theme.colors.primaryLight }}
                    thumbColor={formData.includeGst ? theme.colors.primary : '#FFFFFF'}
                  />
                </View>
              </View>
            </Animated.View>
            
            {/* Stock Information */}
            <Animated.View entering={FadeInUp.delay(300).springify()}>
              <Text 
                style={[
                  styles.sectionTitle, 
                  { 
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily.medium, 
                    marginTop: 24 
                  }
                ]}
              >
                Stock Information
              </Text>
              
              <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={[styles.label, { color: theme.colors.textLight }]}>
                      Opening Stock
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                          color: theme.colors.text,
                        }
                      ]}
                      placeholder="0"
                      placeholderTextColor={theme.colors.textLight}
                      keyboardType="numeric"
                      value={formData.stock}
                      onChangeText={(text) => updateField('stock', text)}
                    />
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={[styles.label, { color: theme.colors.textLight }]}>
                      Low Stock Alert
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                          color: theme.colors.text,
                        }
                      ]}
                      placeholder="0"
                      placeholderTextColor={theme.colors.textLight}
                      keyboardType="numeric"
                      value={formData.lowStockAlert}
                      onChangeText={(text) => updateField('lowStockAlert', text)}
                    />
                  </View>
                </View>
              </View>
            </Animated.View>
            
            {/* Description */}
            <Animated.View entering={FadeInUp.delay(400).springify()}>
              <Text 
                style={[
                  styles.sectionTitle, 
                  { 
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily.medium, 
                    marginTop: 24 
                  }
                ]}
              >
                Additional Information
              </Text>
              
              <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <View style={styles.formGroup}>
                  <Text style={[styles.label, { color: theme.colors.textLight }]}>
                    Description (Optional)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.textareaInput,
                      {
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                        color: theme.colors.text,
                        textAlignVertical: 'top',
                      }
                    ]}
                    placeholder="Enter description"
                    placeholderTextColor={theme.colors.textLight}
                    multiline
                    numberOfLines={4}
                    value={formData.description}
                    onChangeText={(text) => updateField('description', text)}
                  />
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.imageButton, 
                    { 
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background
                    }
                  ]}
                >
                  <Camera size={24} color={theme.colors.primary} />
                  <Text style={[styles.imageButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.medium }]}>
                    Add Image
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
        
        <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
          <Button 
            title="Save" 
            onPress={() => {}}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
  },
  textareaInput: {
    height: 100,
    paddingTop: 12,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1000,
    maxHeight: 200,
  },
  optionItem: {
    padding: 12,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  currencySymbol: {
    width: 36,
    height: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    lineHeight: 48,
  },
  profitContainer: {
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom: 16,
  },
  profitItem: {
    flex: 1,
  },
  profitLabel: {
    fontSize: 12,
  },
  profitValue: {
    fontSize: 16,
    marginTop: 2,
  },
  profitDivider: {
    width: 1,
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
    marginHorizontal: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderStyle: 'dashed',
  },
  imageButtonText: {
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});