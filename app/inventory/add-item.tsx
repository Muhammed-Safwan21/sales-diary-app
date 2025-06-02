// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { HeaderBar } from '@/components/shared/HeaderBar';
// import { Button } from '@/components/shared/Button';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ChevronDown, Camera } from 'lucide-react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Animated, { FadeInUp } from 'react-native-reanimated';

// const UnitOptions = ['Pcs', 'Kg', 'Ltr', 'Box', 'Dozen', 'Bundle'];
// const GstRates = [0, 3, 5, 12, 18, 28];

// export default function AddItemScreen() {
//   const { theme } = useTheme();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     hsnCode: '',
//     purchasePrice: '',
//     sellingPrice: '',
//     stock: '',
//     unit: 'Pcs',
//     lowStockAlert: '',
//     gstRate: '18',
//     description: '',
//     includeGst: true,
//   });
  
//   const [showUnitOptions, setShowUnitOptions] = useState(false);
//   const [showGstOptions, setShowGstOptions] = useState(false);
  
//   const updateField = (field: string, value: string | boolean) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });
//   };
  
//   const selectUnit = (unit: string) => {
//     updateField('unit', unit);
//     setShowUnitOptions(false);
//   };
  
//   const selectGstRate = (rate: number) => {
//     updateField('gstRate', rate.toString());
//     setShowGstOptions(false);
//   };
  
//   const calculateProfit = () => {
//     const purchase = parseFloat(formData.purchasePrice) || 0;
//     const selling = parseFloat(formData.sellingPrice) || 0;
    
//     if (purchase === 0 || selling === 0) return { amount: 0, percentage: 0 };
    
//     const profit = selling - purchase;
//     const percentage = (profit / purchase) * 100;
    
//     return {
//       amount: profit,
//       percentage: parseFloat(percentage.toFixed(2))
//     };
//   };
  
//   const profit = calculateProfit();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <HeaderBar 
//           title="Add Item" 
//           showBack
//         />
        
//         <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
//           <View style={styles.formContainer}>
//             {/* Basic Information */}
//             <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
//               Basic Information
//             </Text>
            
//             <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
//               <View style={styles.formGroup}>
//                 <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                   Item Name*
//                 </Text>
//                 <TextInput
//                   style={[
//                     styles.input,
//                     {
//                       backgroundColor: theme.colors.background,
//                       borderColor: theme.colors.border,
//                       color: theme.colors.text
//                     }
//                   ]}
//                   placeholder="Enter item name"
//                   placeholderTextColor={theme.colors.textLight}
//                   value={formData.name}
//                   onChangeText={(text) => updateField('name', text)}
//                 />
//               </View>
              
//               <View style={styles.formGroup}>
//                 <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                   Category
//                 </Text>
//                 <TextInput
//                   style={[
//                     styles.input,
//                     {
//                       backgroundColor: theme.colors.background,
//                       borderColor: theme.colors.border,
//                       color: theme.colors.text
//                     }
//                   ]}
//                   placeholder="Enter category"
//                   placeholderTextColor={theme.colors.textLight}
//                   value={formData.category}
//                   onChangeText={(text) => updateField('category', text)}
//                 />
//               </View>
              
//               <View style={styles.formRow}>
//                 <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
//                   <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                     HSN/SAC Code
//                   </Text>
//                   <TextInput
//                     style={[
//                       styles.input,
//                       {
//                         backgroundColor: theme.colors.background,
//                         borderColor: theme.colors.border,
//                         color: theme.colors.text
//                       }
//                     ]}
//                     placeholder="Enter code"
//                     placeholderTextColor={theme.colors.textLight}
//                     value={formData.hsnCode}
//                     onChangeText={(text) => updateField('hsnCode', text)}
//                   />
//                 </View>
                
//                 <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
//                   <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                     Unit
//                   </Text>
//                   <View style={{ position: 'relative' }}>
//                     <TouchableOpacity
//                       style={[
//                         styles.input,
//                         styles.selectInput,
//                         {
//                           backgroundColor: theme.colors.background,
//                           borderColor: theme.colors.border,
//                         }
//                       ]}
//                       onPress={() => setShowUnitOptions(!showUnitOptions)}
//                     >
//                       <Text style={{ color: theme.colors.text }}>
//                         {formData.unit}
//                       </Text>
//                       <ChevronDown size={20} color={theme.colors.textLight} />
//                     </TouchableOpacity>
                    
//                     {showUnitOptions && (
//                       <View 
//                         style={[
//                           styles.optionsContainer, 
//                           { 
//                             backgroundColor: theme.colors.card,
//                             borderColor: theme.colors.border,
//                           }
//                         ]}
//                       >
//                         {UnitOptions.map((unit, index) => (
//                           <TouchableOpacity
//                             key={unit}
//                             style={[
//                               styles.optionItem,
//                               index < UnitOptions.length - 1 && {
//                                 borderBottomWidth: 1,
//                                 borderBottomColor: theme.colors.border,
//                               }
//                             ]}
//                             onPress={() => selectUnit(unit)}
//                           >
//                             <Text style={{ color: theme.colors.text }}>
//                               {unit}
//                             </Text>
//                           </TouchableOpacity>
//                         ))}
//                       </View>
//                     )}
//                   </View>
//                 </View>
//               </View>
//             </View>
            
//             {/* Pricing Information */}
//             <Animated.View entering={FadeInUp.delay(200).springify()}>
//               <Text 
//                 style={[
//                   styles.sectionTitle, 
//                   { 
//                     color: theme.colors.text,
//                     fontFamily: theme.typography.fontFamily.medium, 
//                     marginTop: 24 
//                   }
//                 ]}
//               >
//                 Pricing Information
//               </Text>
              
//               <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
//                 <View style={styles.formRow}>
//                   <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
//                     <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                       Purchase Price*
//                     </Text>
//                     <View style={styles.priceInputContainer}>
//                       <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
//                       <TextInput
//                         style={[
//                           styles.input,
//                           {
//                             backgroundColor: theme.colors.background,
//                             borderColor: theme.colors.border,
//                             color: theme.colors.text,
//                             borderTopLeftRadius: 0,
//                             borderBottomLeftRadius: 0,
//                             flex: 1,
//                           }
//                         ]}
//                         placeholder="0.00"
//                         placeholderTextColor={theme.colors.textLight}
//                         keyboardType="numeric"
//                         value={formData.purchasePrice}
//                         onChangeText={(text) => updateField('purchasePrice', text)}
//                       />
//                     </View>
//                   </View>
                  
//                   <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
//                     <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                       Selling Price*
//                     </Text>
//                     <View style={styles.priceInputContainer}>
//                       <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>₹</Text>
//                       <TextInput
//                         style={[
//                           styles.input,
//                           {
//                             backgroundColor: theme.colors.background,
//                             borderColor: theme.colors.border,
//                             color: theme.colors.text,
//                             borderTopLeftRadius: 0,
//                             borderBottomLeftRadius: 0,
//                             flex: 1,
//                           }
//                         ]}
//                         placeholder="0.00"
//                         placeholderTextColor={theme.colors.textLight}
//                         keyboardType="numeric"
//                         value={formData.sellingPrice}
//                         onChangeText={(text) => updateField('sellingPrice', text)}
//                       />
//                     </View>
//                   </View>
//                 </View>
                
//                 <View style={[styles.profitContainer, { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primaryDark }]}>
//                   <View style={styles.profitItem}>
//                     <Text style={[styles.profitLabel, { color: theme.colors.primary }]}>Profit Amount</Text>
//                     <Text style={[styles.profitValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
//                       ₹{profit.amount.toFixed(2)}
//                     </Text>
//                   </View>
                  
//                   <View style={styles.profitDivider} />
                  
//                   <View style={styles.profitItem}>
//                     <Text style={[styles.profitLabel, { color: theme.colors.primary }]}>Profit Margin</Text>
//                     <Text style={[styles.profitValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
//                       {profit.percentage}%
//                     </Text>
//                   </View>
//                 </View>
                
//                 <View style={styles.formGroup}>
//                   <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                     GST Rate
//                   </Text>
//                   <View style={{ position: 'relative' }}>
//                     <TouchableOpacity
//                       style={[
//                         styles.input,
//                         styles.selectInput,
//                         {
//                           backgroundColor: theme.colors.background,
//                           borderColor: theme.colors.border,
//                         }
//                       ]}
//                       onPress={() => setShowGstOptions(!showGstOptions)}
//                     >
//                       <Text style={{ color: theme.colors.text }}>
//                         {formData.gstRate}%
//                       </Text>
//                       <ChevronDown size={20} color={theme.colors.textLight} />
//                     </TouchableOpacity>
                    
//                     {showGstOptions && (
//                       <View 
//                         style={[
//                           styles.optionsContainer, 
//                           { 
//                             backgroundColor: theme.colors.card,
//                             borderColor: theme.colors.border,
//                           }
//                         ]}
//                       >
//                         {GstRates.map((rate, index) => (
//                           <TouchableOpacity
//                             key={rate.toString()}
//                             style={[
//                               styles.optionItem,
//                               index < GstRates.length - 1 && {
//                                 borderBottomWidth: 1,
//                                 borderBottomColor: theme.colors.border,
//                               }
//                             ]}
//                             onPress={() => selectGstRate(rate)}
//                           >
//                             <Text style={{ color: theme.colors.text }}>
//                               {rate}%
//                             </Text>
//                           </TouchableOpacity>
//                         ))}
//                       </View>
//                     )}
//                   </View>
//                 </View>
                
//                 <View style={styles.switchContainer}>
//                   <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
//                     Price inclusive of GST
//                   </Text>
//                   <Switch
//                     value={formData.includeGst}
//                     onValueChange={(value) => updateField('includeGst', value)}
//                     trackColor={{ false: '#D1D5DB', true: theme.colors.primaryLight }}
//                     thumbColor={formData.includeGst ? theme.colors.primary : '#FFFFFF'}
//                   />
//                 </View>
//               </View>
//             </Animated.View>
            
//             {/* Stock Information */}
//             <Animated.View entering={FadeInUp.delay(300).springify()}>
//               <Text 
//                 style={[
//                   styles.sectionTitle, 
//                   { 
//                     color: theme.colors.text,
//                     fontFamily: theme.typography.fontFamily.medium, 
//                     marginTop: 24 
//                   }
//                 ]}
//               >
//                 Stock Information
//               </Text>
              
//               <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
//                 <View style={styles.formRow}>
//                   <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
//                     <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                       Opening Stock
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.input,
//                         {
//                           backgroundColor: theme.colors.background,
//                           borderColor: theme.colors.border,
//                           color: theme.colors.text,
//                         }
//                       ]}
//                       placeholder="0"
//                       placeholderTextColor={theme.colors.textLight}
//                       keyboardType="numeric"
//                       value={formData.stock}
//                       onChangeText={(text) => updateField('stock', text)}
//                     />
//                   </View>
                  
//                   <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
//                     <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                       Low Stock Alert
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.input,
//                         {
//                           backgroundColor: theme.colors.background,
//                           borderColor: theme.colors.border,
//                           color: theme.colors.text,
//                         }
//                       ]}
//                       placeholder="0"
//                       placeholderTextColor={theme.colors.textLight}
//                       keyboardType="numeric"
//                       value={formData.lowStockAlert}
//                       onChangeText={(text) => updateField('lowStockAlert', text)}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </Animated.View>
            
//             {/* Description */}
//             <Animated.View entering={FadeInUp.delay(400).springify()}>
//               <Text 
//                 style={[
//                   styles.sectionTitle, 
//                   { 
//                     color: theme.colors.text,
//                     fontFamily: theme.typography.fontFamily.medium, 
//                     marginTop: 24 
//                   }
//                 ]}
//               >
//                 Additional Information
//               </Text>
              
//               <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
//                 <View style={styles.formGroup}>
//                   <Text style={[styles.label, { color: theme.colors.textLight }]}>
//                     Description (Optional)
//                   </Text>
//                   <TextInput
//                     style={[
//                       styles.input,
//                       styles.textareaInput,
//                       {
//                         backgroundColor: theme.colors.background,
//                         borderColor: theme.colors.border,
//                         color: theme.colors.text,
//                         textAlignVertical: 'top',
//                       }
//                     ]}
//                     placeholder="Enter description"
//                     placeholderTextColor={theme.colors.textLight}
//                     multiline
//                     numberOfLines={4}
//                     value={formData.description}
//                     onChangeText={(text) => updateField('description', text)}
//                   />
//                 </View>
                
//                 <TouchableOpacity 
//                   style={[
//                     styles.imageButton, 
//                     { 
//                       borderColor: theme.colors.border,
//                       backgroundColor: theme.colors.background
//                     }
//                   ]}
//                 >
//                   <Camera size={24} color={theme.colors.primary} />
//                   <Text style={[styles.imageButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.medium }]}>
//                     Add Image
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </View>
//         </ScrollView>
        
//         <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
//           <Button 
//             title="Save" 
//             onPress={() => {}}
//             fullWidth
//           />
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: Platform.OS === 'ios' ? 100 : 80,
//   },
//   formContainer: {
//     flex: 1,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   card: {
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   formRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   input: {
//     borderRadius: 8,
//     borderWidth: 1,
//     height: 48,
//     paddingHorizontal: 12,
//   },
//   textareaInput: {
//     height: 100,
//     paddingTop: 12,
//   },
//   selectInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   optionsContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     right: 0,
//     borderWidth: 1,
//     borderRadius: 8,
//     zIndex: 1000,
//     maxHeight: 200,
//   },
//   optionItem: {
//     padding: 12,
//   },
//   priceInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//   },
//   currencySymbol: {
//     width: 36,
//     height: 48,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     borderTopWidth: 1,
//     borderLeftWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#E5E7EB',
//     backgroundColor: '#F9FAFB',
//     fontSize: 16,
//     lineHeight: 48,
//   },
//   profitContainer: {
//     borderRadius: 8,
//     padding: 12,
//     flexDirection: 'row',
//     borderWidth: 1,
//     marginBottom: 16,
//   },
//   profitItem: {
//     flex: 1,
//   },
//   profitLabel: {
//     fontSize: 12,
//   },
//   profitValue: {
//     fontSize: 16,
//     marginTop: 2,
//   },
//   profitDivider: {
//     width: 1,
//     backgroundColor: 'rgba(37, 99, 235, 0.3)',
//     marginHorizontal: 12,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   switchLabel: {
//     fontSize: 16,
//   },
//   imageButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     borderStyle: 'dashed',
//   },
//   imageButtonText: {
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  ArrowLeft,
  Package,
  IndianRupee,
  Hash,
  Tag,
  BarChart3,
  Camera,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  FileText,
  Save,
  Sparkles,
  Info,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const UnitOptions = ['Pcs', 'Kg', 'Ltr', 'Box', 'Dozen', 'Bundle'];
const GstRates = [0, 3, 5, 12, 18, 28];

export default function AddItemScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  
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

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    multiline = false,
    required = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}{required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
      <View style={[
        styles.inputContainer,
        multiline && styles.multilineContainer,
        {
          backgroundColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.8)',
          borderColor: themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
        }
      ]}>
        <TextInput
          style={[
            styles.textInput,
            multiline && styles.multilineInput,
            { color: theme.colors.text }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );

  const renderPriceInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    required = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <IndianRupee size={16} color={theme.colors.primary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}{required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
      <View style={styles.priceInputContainer}>
        <View style={[
          styles.currencyContainer,
          {
            backgroundColor: `${theme.colors.primary}15`,
            borderColor: `${theme.colors.primary}20`,
          }
        ]}>
          <IndianRupee size={14} color={theme.colors.primary} />
        </View>
        <TextInput
          style={[
            styles.priceInput,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
              borderColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
              color: theme.colors.text,
            }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderSelectInput = (
    label: string,
    value: string,
    options: string[] | number[],
    onSelect: (value: any) => void,
    showOptions: boolean,
    setShowOptions: (show: boolean) => void,
    icon: React.ReactNode,
    suffix = ''
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      </View>
      <View style={{ position: 'relative', zIndex: showOptions ? 1000 : 1 }}>
        <TouchableOpacity
          style={[
            styles.selectContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
              borderColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            }
          ]}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Text style={[styles.selectText, { color: theme.colors.text }]}>
            {value}{suffix}
          </Text>
          <ChevronDown 
            size={18} 
            color={theme.colors.textSecondary}
            style={{ transform: [{ rotate: showOptions ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
        
        {showOptions && (
          <BlurView 
            intensity={themeType === 'dark' ? 20 : 80} 
            tint={themeType} 
            style={[
              styles.optionsContainer,
              {
                borderColor: themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              }
            ]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={option.toString()}
                style={[
                  styles.optionItem,
                  index < options.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                  }
                ]}
                onPress={() => onSelect(option)}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>
                  {option}{suffix}
                </Text>
              </TouchableOpacity>
            ))}
          </BlurView>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
      {/* Ultra-modern header with gradient */}
      <LinearGradient
        colors={themeType === 'dark' 
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
              <Package size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Add New Item</Text>
            </View>
            
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Info size={18} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Basic Information
                </Text>
              </View>

              {renderFormInput(
                'Item Name',
                formData.name,
                (text) => updateField('name', text),
                'Enter item name',
                <Tag size={16} color={theme.colors.primary} />,
                'default',
                false,
                true
              )}

              {renderFormInput(
                'Category',
                formData.category,
                (text) => updateField('category', text),
                'Enter category',
                <Package size={16} color={theme.colors.secondary} />
              )}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderFormInput(
                    'HSN/SAC Code',
                    formData.hsnCode,
                    (text) => updateField('hsnCode', text),
                    'Enter code',
                    <Hash size={16} color={theme.colors.accent} />
                  )}
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderSelectInput(
                    'Unit',
                    formData.unit,
                    UnitOptions,
                    selectUnit,
                    showUnitOptions,
                    setShowUnitOptions,
                    <Package size={16} color={theme.colors.primary} />
                  )}
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Pricing Information */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.accent} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Pricing Information
                </Text>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderPriceInput(
                    'Purchase Price',
                    formData.purchasePrice,
                    (text) => updateField('purchasePrice', text),
                    '0.00',
                    true
                  )}
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderPriceInput(
                    'Selling Price',
                    formData.sellingPrice,
                    (text) => updateField('sellingPrice', text),
                    '0.00',
                    true
                  )}
                </View>
              </View>

              {/* Profit Display */}
              {(formData.purchasePrice && formData.sellingPrice) && (
                <View style={[
                  styles.profitContainer,
                  {
                    backgroundColor: profit.amount >= 0 
                      ? `${theme.colors.success}15` 
                      : `rgba(239, 68, 68, 0.1)`,
                    borderColor: profit.amount >= 0 
                      ? `${theme.colors.success}20` 
                      : 'rgba(239, 68, 68, 0.2)',
                  }
                ]}>
                  <LinearGradient
                    colors={[
                      profit.amount >= 0 ? `${theme.colors.success}10` : 'rgba(239, 68, 68, 0.05)',
                      'transparent'
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profitGradientOverlay}
                  />
                  
                  <View style={styles.profitContent}>
                    <View style={styles.profitItem}>
                      <View style={styles.profitHeader}>
                        <TrendingUp size={14} color={profit.amount >= 0 ? theme.colors.success : '#EF4444'} />
                        <Text style={[
                          styles.profitLabel, 
                          { color: profit.amount >= 0 ? theme.colors.success : '#EF4444' }
                        ]}>
                          Profit Amount
                        </Text>
                      </View>
                      <Text style={[
                        styles.profitValue, 
                        { color: profit.amount >= 0 ? theme.colors.success : '#EF4444' }
                      ]}>
                        ₹{Math.abs(profit.amount).toFixed(2)}
                      </Text>
                    </View>
                    
                    <View style={[
                      styles.profitDivider,
                      { backgroundColor: profit.amount >= 0 ? `${theme.colors.success}30` : 'rgba(239, 68, 68, 0.3)' }
                    ]} />
                    
                    <View style={styles.profitItem}>
                      <View style={styles.profitHeader}>
                        <BarChart3 size={14} color={profit.amount >= 0 ? theme.colors.success : '#EF4444'} />
                        <Text style={[
                          styles.profitLabel, 
                          { color: profit.amount >= 0 ? theme.colors.success : '#EF4444' }
                        ]}>
                          {profit.amount >= 0 ? 'Profit Margin' : 'Loss Margin'}
                        </Text>
                      </View>
                      <Text style={[
                        styles.profitValue, 
                        { color: profit.amount >= 0 ? theme.colors.success : '#EF4444' }
                      ]}>
                        {Math.abs(profit.percentage)}%
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {renderSelectInput(
                'GST Rate',
                formData.gstRate,
                GstRates,
                selectGstRate,
                showGstOptions,
                setShowGstOptions,
                <FileText size={16} color={theme.colors.secondary} />,
                '%'
              )}

              <View style={styles.switchContainer}>
                <View style={styles.switchLabelContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                    Price inclusive of GST
                  </Text>
                </View>
                <Switch
                  value={formData.includeGst}
                  onValueChange={(value) => updateField('includeGst', value)}
                  trackColor={{ 
                    false: themeType === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#D1D5DB', 
                    true: `${theme.colors.primary}40` 
                  }}
                  thumbColor={formData.includeGst ? theme.colors.primary : '#FFFFFF'}
                />
              </View>
            </BlurView>
          </Animated.View>

          {/* Stock Information */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <BarChart3 size={18} color={theme.colors.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Stock Information
                </Text>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderFormInput(
                    'Opening Stock',
                    formData.stock,
                    (text) => updateField('stock', text),
                    '0',
                    <Package size={16} color={theme.colors.primary} />,
                    'numeric'
                  )}
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderFormInput(
                    'Low Stock Alert',
                    formData.lowStockAlert,
                    (text) => updateField('lowStockAlert', text),
                    '0',
                    <AlertTriangle size={16} color="#F59E0B" />,
                    'numeric'
                  )}
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Information */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={18} color={theme.colors.accent} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'Description',
                formData.description,
                (text) => updateField('description', text),
                'Enter item description (optional)',
                <FileText size={16} color={theme.colors.secondary} />,
                'default',
                true
              )}

              <TouchableOpacity 
                style={[
                  styles.imageButton,
                  {
                    backgroundColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(255, 255, 255, 0.6)',
                    borderColor: `${theme.colors.primary}30`,
                  }
                ]}
              >
                <LinearGradient
                  colors={[
                    `${theme.colors.primary}15`,
                    `${theme.colors.primary}05`,
                    'transparent'
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.imageGradientOverlay}
                />
                <View style={styles.imageButtonContent}>
                  <View style={[
                    styles.cameraIconContainer,
                    { backgroundColor: `${theme.colors.primary}20` }
                  ]}>
                    <Camera size={20} color={theme.colors.primary} />
                  </View>
                  <Text style={[styles.imageButtonText, { color: theme.colors.primary }]}>
                    Add Product Image
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.footer}>
          <TouchableOpacity style={[
            styles.saveButton,
            { 
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
            }
          ]}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
              style={styles.saveGradient}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Item</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 20,
  },
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
  placeholder: {
    width: 40,
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: -10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
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
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  multilineContainer: {
    paddingVertical: 12,
  },
  textInput: {
    fontSize: 15,
    fontWeight: '500',
    minHeight: 20,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectText: {
    fontSize: 15,
    fontWeight: '500',
  },
  optionsContainer: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: 200,
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  profitContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  profitGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profitContent: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
  },
  profitItem: {
    flex: 1,
  },
  profitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  profitLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  profitValue: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  profitDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  imageButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  imageGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    position: 'relative',
    zIndex: 2,
  },
  cameraIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  footer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
})