// import ProductSelectionModal from '@/components/modal/productSelectionModal';
// import API from '@/config/api';
// import { useTheme } from '@/context/ThemeContext';
// import { apiClient } from '@/services/api';
// import { BlurView } from 'expo-blur';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Linking from 'expo-linking';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import {
//   ArrowLeft,
//   Calendar,
//   ChevronDown,
//   FileText,
//   IndianRupee,
//   Package,
//   Plus,
//   QrCode,
//   Save,
//   Share,
//   Users,
//   X,
// } from 'lucide-react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   Vibration,
//   View,
// } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
//   FadeOut,
//   SlideInDown,
//   SlideOutDown,
// } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface InvoiceItem {
//   id: string;
//   name: string;
//   quantity: string;
//   price: string;
//   amount: string;
//   taxPercentage?: string;
//   productId?: string;
//   barcode?: string;
//   availableStock?: number;
//   includeTax?: boolean;
// }

// interface Product {
//   id: string;
//   name: string;
//   code: string;
//   description: string;
//   productId: string;
//   itemType: string;
//   salePrice: string;
//   rate: string;
//   costPrice: string;
//   taxPercentage: string;
//   taxAmount: string;
//   availableQuantity: string;
//   openingQuantity: string;
//   openingRate: string;
//   reorderQuantity: string;
//   sku: string;
//   barcode: string;
//   includeTax: boolean;
//   hsnCodeId: string;
//   imageUrl: string;
//   status: string;
//   categoryId: string;
//   branchId: string;
//   adminId: string;
//   isAvailable: boolean;
//   unitId: string;
//   combination: any;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   attributeValuesInfo: any[];
//   categoryInfo: {
//     id: string;
//     name: string;
//   };
// }

// export default function CreateInvoiceScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();
//   const [permission, requestPermission] = useCameraPermissions();

//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
//     { id: '1', name: '', quantity: '1', price: '', amount: '0' },
//   ]);

//   const [invoiceDetails, setInvoiceDetails] = useState({
//     customerName: '',
//     invoiceNumber: 'INV-0001',
//     invoiceDate: new Date().toISOString().split('T')[0],
//     dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split('T')[0],
//   });

//   const [showProductModal, setShowProductModal] = useState(false);
//   const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
//   const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
//   const [scanningForItem, setScanningForItem] = useState<number | null>(null);
//   const [isScanned, setIsScanned] = useState(false);
//   const [isLoadingProduct, setIsLoadingProduct] = useState(false);
//   const [scannedData, setScannedData] = useState<string>('');
//   const [showScanResult, setShowScanResult] = useState(false);
//   const [autoProcessScan, setAutoProcessScan] = useState(true); // New setting for auto-processing

//   // Refs for managing scan debouncing
//   const scanTimeoutRef: any = useRef<NodeJS.Timeout | null>(null);
//   const lastScannedRef = useRef<string>('');

//   const addItem = () => {
//     setInvoiceItems([
//       ...invoiceItems,
//       {
//         id: Date.now().toString(),
//         name: '',
//         quantity: '1',
//         price: '',
//         amount: '0',
//       },
//     ]);
//   };

//   const removeItem = (id: string) => {
//     if (invoiceItems.length <= 1) return;
//     setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
//   };

//   const updateItem = (id: string, field: string, value: string) => {
//     setInvoiceItems(
//       invoiceItems.map((item) => {
//         if (item.id === id) {
//           const updatedItem = { ...item, [field]: value };

//           if (field === 'quantity' || field === 'price') {
//             const quantity =
//               parseFloat(field === 'quantity' ? value : item.quantity) || 0;
//             const price =
//               parseFloat(field === 'price' ? value : item.price) || 0;
//             updatedItem.amount = (quantity * price).toString();
//           }

//           return updatedItem;
//         }
//         return item;
//       })
//     );
//   };

//   const handleProductSelect = (product: Product) => {
//     if (currentItemIndex !== null) {
//       const updatedItems = [...invoiceItems];
//       const quantity = parseFloat(updatedItems[currentItemIndex].quantity) || 1;
//       const price = parseFloat(product.salePrice);

//       updatedItems[currentItemIndex] = {
//         ...updatedItems[currentItemIndex],
//         name: product.name,
//         price: product.salePrice,
//         amount: (quantity * price).toString(),
//         taxPercentage: product.taxPercentage,
//         productId: product.id,
//         barcode: product.barcode,
//         availableStock: parseFloat(product.availableQuantity),
//         includeTax: product.includeTax,
//       };

//       setInvoiceItems(updatedItems);
//       setCurrentItemIndex(null);
//     }
//   };

//   const fetchProductByBarcode = async (
//     barcode: string
//   ): Promise<Product | null> => {
//     try {
//       setIsLoadingProduct(true);
//       const response = await apiClient.get(
//         `${API.PRODUCTS}/barcode/${barcode}`
//       );
//       return response.data?.data || null;
//     } catch (error: any) {
//       console.error('Error fetching product by barcode:', error);
//       return null;
//     } finally {
//       setIsLoadingProduct(false);
//     }
//   };

//   const processScannedProduct = async (barcode: string, itemIndex: number) => {
//     try {
//       const product = await fetchProductByBarcode(barcode);

//       if (product) {
//         const updatedItems = [...invoiceItems];
//         const quantity = parseFloat(updatedItems[itemIndex].quantity) || 1;
//         const price = parseFloat(product.salePrice);

//         updatedItems[itemIndex] = {
//           ...updatedItems[itemIndex],
//           name: product.name,
//           price: product.salePrice,
//           amount: (quantity * price).toString(),
//           taxPercentage: product.taxPercentage,
//           productId: product.id,
//           barcode: product.barcode,
//           availableStock: parseFloat(product.availableQuantity),
//           includeTax: product.includeTax,
//         };

//         setInvoiceItems(updatedItems);

//         // Close scanner and show brief success feedback
//         setShowBarcodeScanner(false);
//         setScanningForItem(null);
//         setIsScanned(false);

//         // Optional vibration feedback
//         Vibration.vibrate(100);

//         return product;
//       } else {
//         // Product not found
//         setShowBarcodeScanner(false);
//         setScanningForItem(null);
//         setIsScanned(false);

//         Alert.alert(
//           'Product Not Found',
//           `No product found with barcode: ${barcode}`,
//           [{ text: 'OK' }],
//           { cancelable: true }
//         );
//         return null;
//       }
//     } catch (error) {
//       console.error('Error processing barcode:', error);
//       setShowBarcodeScanner(false);
//       setScanningForItem(null);
//       setIsScanned(false);

//       Alert.alert(
//         'Error',
//         'Failed to process barcode. Please try again.',
//         [{ text: 'OK' }],
//         { cancelable: true }
//       );
//       return null;
//     }
//   };

//   const handleBarCodeScanned = async ({ data }: { data: string }) => {
//     // Prevent duplicate scans
//     if (
//       isScanned ||
//       scanningForItem === null ||
//       data === lastScannedRef.current
//     ) {
//       return;
//     }

//     // Clear any existing timeout
//     if (scanTimeoutRef.current) {
//       clearTimeout(scanTimeoutRef.current);
//     }

//     setIsScanned(true);
//     lastScannedRef.current = data;
//     setScannedData(data);

//     if (autoProcessScan) {
//       // Auto-process the scan without showing alert
//       await processScannedProduct(data, scanningForItem);
//     } else {
//       // Show scan result for user confirmation
//       setShowScanResult(true);
//     }

//     // Reset scanning state after a delay
//     scanTimeoutRef.current = setTimeout(() => {
//       setIsScanned(false);
//       lastScannedRef.current = '';
//     }, 2000);
//   };

//   const handleConfirmScan = async () => {
//     setShowScanResult(false);
//     if (scanningForItem !== null && scannedData) {
//       await processScannedProduct(scannedData, scanningForItem);
//     }
//   };

//   const handleCancelScan = () => {
//     setShowScanResult(false);
//     setIsScanned(false);
//     setScannedData('');
//     lastScannedRef.current = '';
//   };

//   const closeBarcodeScanner = () => {
//     setShowBarcodeScanner(false);
//     setScanningForItem(null);
//     setIsScanned(false);
//     setScannedData('');
//     setShowScanResult(false);
//     lastScannedRef.current = '';

//     // Clear timeout
//     if (scanTimeoutRef.current) {
//       clearTimeout(scanTimeoutRef.current);
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (scanTimeoutRef.current) {
//         clearTimeout(scanTimeoutRef.current);
//       }
//     };
//   }, []);

//   const scanBarcode = async (itemIndex: number) => {
//     try {
//       if (!permission) {
//         const { status, canAskAgain } = await requestPermission();
//         if (status !== 'granted') {
//           if (canAskAgain) {
//             Alert.alert(
//               'Permission Required',
//               'Camera permission is required to scan barcodes. Please allow camera access.',
//               [
//                 { text: 'Cancel', style: 'cancel' },
//                 { text: 'Try Again', onPress: () => scanBarcode(itemIndex) },
//               ]
//             );
//           } else {
//             Alert.alert(
//               'Permission Required',
//               'Camera permission was denied. Please enable it in Settings to scan barcodes.',
//               [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                   text: 'Open Settings',
//                   onPress: () => Linking.openSettings(),
//                 },
//               ]
//             );
//           }
//           return;
//         }
//       } else if (!permission.granted) {
//         if (permission.canAskAgain) {
//           const { status } = await requestPermission();
//           if (status !== 'granted') {
//             Alert.alert(
//               'Permission Required',
//               'Camera permission is required to scan barcodes. Please allow camera access.',
//               [
//                 { text: 'Cancel', style: 'cancel' },
//                 { text: 'Try Again', onPress: () => scanBarcode(itemIndex) },
//               ]
//             );
//             return;
//           }
//         } else {
//           Alert.alert(
//             'Permission Required',
//             'Camera permission was denied. Please enable it in Settings to scan barcodes.',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               { text: 'Open Settings', onPress: () => Linking.openSettings() },
//             ]
//           );
//           return;
//         }
//       }

//       setScanningForItem(itemIndex);
//       setShowBarcodeScanner(true);
//       setIsScanned(false);
//       setScannedData('');
//       setShowScanResult(false);
//       lastScannedRef.current = '';
//     } catch (error) {
//       console.error('Error requesting camera permission:', error);
//       Alert.alert(
//         'Error',
//         'Failed to request camera permission. Please try again.',
//         [{ text: 'OK' }],
//         { cancelable: true }
//       );
//     }
//   };

//   const calculateTotal = () => {
//     return invoiceItems.reduce((total, item) => {
//       return total + (parseFloat(item.amount) || 0);
//     }, 0);
//   };

//   const getSelectedProductIds = () => {
//     return invoiceItems
//       .filter((item) => item.productId)
//       .map((item) => item.productId!)
//       .filter(Boolean);
//   };

//   const renderFormInput = (
//     label: string,
//     value: string,
//     onChangeText: (text: string) => void,
//     placeholder?: string,
//     rightIcon?: React.ReactNode,
//     editable = true
//   ) => (
//     <View style={styles.formGroup}>
//       <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
//         {label}
//       </Text>
//       <View
//         style={[
//           styles.inputContainer,
//           {
//             backgroundColor:
//               themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.05)'
//                 : 'rgba(255, 255, 255, 0.8)',
//             borderColor:
//               themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.08)'
//                 : 'rgba(0, 0, 0, 0.06)',
//           },
//         ]}
//       >
//         <TextInput
//           style={[styles.textInput, { color: theme.colors.text }]}
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor={theme.colors.textSecondary}
//           editable={editable}
//         />
//         {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
//       </View>
//     </View>
//   );

//   const renderScanResultModal = () => (
//     <Modal
//       visible={showScanResult}
//       transparent
//       animationType="none"
//       onRequestClose={handleCancelScan}
//     >
//       <Animated.View
//         entering={FadeIn.duration(200)}
//         exiting={FadeOut.duration(200)}
//         style={styles.scanResultOverlay}
//       >
//         <TouchableOpacity
//           style={styles.scanResultBackdrop}
//           activeOpacity={1}
//           onPress={handleCancelScan}
//         />

//         <Animated.View
//           entering={SlideInDown.duration(300)}
//           exiting={SlideOutDown.duration(250)}
//           style={[
//             styles.scanResultModal,
//             { backgroundColor: theme.colors.background },
//           ]}
//         >
//           <View style={styles.scanResultHeader}>
//             <QrCode size={24} color={theme.colors.primary} />
//             <Text
//               style={[styles.scanResultTitle, { color: theme.colors.text }]}
//             >
//               Barcode Scanned
//             </Text>
//           </View>

//           <View style={styles.scanResultContent}>
//             <Text
//               style={[
//                 styles.scanResultCode,
//                 { color: theme.colors.textSecondary },
//               ]}
//             >
//               {scannedData}
//             </Text>
//             <Text style={[styles.scanResultText, { color: theme.colors.text }]}>
//               Do you want to add this product to the invoice?
//             </Text>
//           </View>

//           <View style={styles.scanResultButtons}>
//             <TouchableOpacity
//               style={[
//                 styles.scanResultButton,
//                 styles.cancelScanButton,
//                 { backgroundColor: `${theme.colors.textSecondary}15` },
//               ]}
//               onPress={handleCancelScan}
//             >
//               <Text
//                 style={[
//                   styles.cancelScanText,
//                   { color: theme.colors.textSecondary },
//                 ]}
//               >
//                 Cancel
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.scanResultButton,
//                 styles.confirmScanButton,
//                 { backgroundColor: theme.colors.primary },
//               ]}
//               onPress={handleConfirmScan}
//             >
//               <Text style={styles.confirmScanText}>Add Product</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </Animated.View>
//     </Modal>
//   );

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

//       {/* Modern header with gradient */}
//       <LinearGradient
//         colors={
//           themeType === 'dark'
//             ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
//             : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
//         }
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
//             </TouchableOpacity>

//             <View style={styles.headerTitleContainer}>
//               <FileText size={20} color="#FFFFFF" />
//               <Text style={styles.headerTitle}>Create Invoice</Text>
//             </View>

//             <View style={styles.placeholder} />
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Invoice Details Section */}
//           <Animated.View entering={FadeInUp.delay(100)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <View style={styles.sectionHeader}>
//                 <Users size={18} color={theme.colors.primary} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Invoice Details
//                 </Text>
//               </View>

//               {renderFormInput(
//                 'Customer',
//                 invoiceDetails.customerName,
//                 (text) =>
//                   setInvoiceDetails({ ...invoiceDetails, customerName: text }),
//                 'Select or add customer',
//                 <ChevronDown size={18} color={theme.colors.textSecondary} />
//               )}

//               <View style={styles.formRow}>
//                 <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
//                   <Text
//                     style={[
//                       styles.label,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     Invoice Number
//                   </Text>
//                   <View
//                     style={[
//                       styles.inputContainer,
//                       {
//                         backgroundColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.05)'
//                             : 'rgba(255, 255, 255, 0.8)',
//                         borderColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.08)'
//                             : 'rgba(0, 0, 0, 0.06)',
//                       },
//                     ]}
//                   >
//                     <TextInput
//                       style={[styles.textInput, { color: theme.colors.text }]}
//                       value={invoiceDetails.invoiceNumber}
//                       onChangeText={(text) =>
//                         setInvoiceDetails({
//                           ...invoiceDetails,
//                           invoiceNumber: text,
//                         })
//                       }
//                     />
//                   </View>
//                 </View>

//                 <View style={[styles.formGroup, { flex: 1 }]}>
//                   <Text
//                     style={[
//                       styles.label,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     Invoice Date
//                   </Text>
//                   <TouchableOpacity
//                     style={[
//                       styles.inputContainer,
//                       {
//                         backgroundColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.05)'
//                             : 'rgba(255, 255, 255, 0.8)',
//                         borderColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.08)'
//                             : 'rgba(0, 0, 0, 0.06)',
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[styles.textInput, { color: theme.colors.text }]}
//                     >
//                       {invoiceDetails.invoiceDate}
//                     </Text>
//                     <View style={styles.inputIcon}>
//                       <Calendar size={18} color={theme.colors.textSecondary} />
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {renderFormInput(
//                 'Due Date',
//                 invoiceDetails.dueDate,
//                 (text) =>
//                   setInvoiceDetails({ ...invoiceDetails, dueDate: text }),
//                 undefined,
//                 <Calendar size={18} color={theme.colors.textSecondary} />,
//                 false
//               )}
//             </BlurView>
//           </Animated.View>

//           {/* Items Section */}
//           <Animated.View entering={FadeInUp.delay(200)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.section}
//             >
//               <View style={styles.sectionHeader}>
//                 <Package size={18} color={theme.colors.accent} />
//                 <Text
//                   style={[styles.sectionTitle, { color: theme.colors.text }]}
//                 >
//                   Items
//                 </Text>
//                 <TouchableOpacity
//                   style={[
//                     styles.addItemButton,
//                     {
//                       backgroundColor: theme.colors.primary,
//                       shadowColor: theme.colors.primary,
//                     },
//                   ]}
//                   onPress={addItem}
//                 >
//                   <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
//                   <Text style={styles.addItemText}>Add Item</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.itemsContainer}>
//                 {invoiceItems.map((item, index) => (
//                   <Animated.View
//                     key={item.id}
//                     entering={FadeInDown.delay(index * 50).springify()}
//                     style={[
//                       styles.itemCard,
//                       {
//                         backgroundColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.03)'
//                             : 'rgba(255, 255, 255, 0.6)',
//                         borderColor:
//                           themeType === 'dark'
//                             ? 'rgba(255, 255, 255, 0.06)'
//                             : 'rgba(0, 0, 0, 0.04)',
//                       },
//                     ]}
//                   >
//                     {/* Subtle gradient overlay */}
//                     <LinearGradient
//                       colors={[
//                         `${theme.colors.accent}08`,
//                         `${theme.colors.accent}02`,
//                         'transparent',
//                       ]}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={styles.itemGradientOverlay}
//                     />

//                     {/* Delete button in top right corner */}
//                     {invoiceItems.length > 1 && (
//                       <TouchableOpacity
//                         style={[
//                           styles.deleteButtonCorner,
//                           {
//                             backgroundColor: 'rgba(239, 68, 68, 0.9)',
//                           },
//                         ]}
//                         onPress={() => removeItem(item.id)}
//                       >
//                         <X size={14} color="#FFFFFF" />
//                       </TouchableOpacity>
//                     )}

//                     <View style={styles.itemContent}>
//                       <View style={styles.itemMainRow}>
//                         <View style={styles.itemNameContainer}>
//                           <TouchableOpacity
//                             style={[
//                               styles.inputContainer,
//                               styles.itemNameInput,
//                               {
//                                 backgroundColor:
//                                   themeType === 'dark'
//                                     ? 'rgba(255, 255, 255, 0.05)'
//                                     : 'rgba(255, 255, 255, 0.8)',
//                                 borderColor:
//                                   themeType === 'dark'
//                                     ? 'rgba(255, 255, 255, 0.08)'
//                                     : 'rgba(0, 0, 0, 0.06)',
//                               },
//                             ]}
//                             onPress={() => {
//                               setCurrentItemIndex(index);
//                               setShowProductModal(true);
//                             }}
//                           >
//                             <TextInput
//                               style={[
//                                 styles.textInput,
//                                 { color: theme.colors.text },
//                               ]}
//                               placeholder="Select or add item"
//                               placeholderTextColor={theme.colors.textSecondary}
//                               value={item.name}
//                               onChangeText={(text) =>
//                                 updateItem(item.id, 'name', text)
//                               }
//                               editable={!item.productId}
//                             />
//                             <View style={styles.inputIcon}>
//                               <Package
//                                 size={16}
//                                 color={theme.colors.textSecondary}
//                               />
//                             </View>
//                           </TouchableOpacity>

//                           {/* Show product info if selected */}
//                           {item.productId && (
//                             <View style={styles.productInfo}>
//                               <Text
//                                 style={[
//                                   styles.productCode,
//                                   { color: theme.colors.textSecondary },
//                                 ]}
//                               >
//                                 {item.barcode ? `Barcode: ${item.barcode}` : ''}
//                               </Text>
//                               {item.availableStock !== undefined && (
//                                 <Text
//                                   style={[
//                                     styles.stockInfo,
//                                     {
//                                       color:
//                                         item.availableStock > 0
//                                           ? theme.colors.success
//                                           : '#EF4444',
//                                     },
//                                   ]}
//                                 >
//                                   Stock: {item.availableStock}
//                                 </Text>
//                               )}
//                             </View>
//                           )}
//                         </View>

//                         {/* Scanner button */}
//                         <TouchableOpacity
//                           style={[
//                             styles.scannerButton,
//                             { backgroundColor: theme.colors.primary },
//                           ]}
//                           onPress={() => scanBarcode(index)}
//                           disabled={
//                             isLoadingProduct && scanningForItem === index
//                           }
//                         >
//                           {isLoadingProduct && scanningForItem === index ? (
//                             <ActivityIndicator size="small" color="#FFFFFF" />
//                           ) : (
//                             <QrCode size={18} color="#FFFFFF" />
//                           )}
//                         </TouchableOpacity>
//                       </View>

//                       <View style={styles.itemDetailsRow}>
//                         <View style={styles.quantityContainer}>
//                           <Text
//                             style={[
//                               styles.smallLabel,
//                               { color: theme.colors.textSecondary },
//                             ]}
//                           >
//                             Qty
//                           </Text>
//                           <TextInput
//                             style={[
//                               styles.smallInput,
//                               {
//                                 color: theme.colors.text,
//                                 backgroundColor:
//                                   themeType === 'dark'
//                                     ? 'rgba(255, 255, 255, 0.05)'
//                                     : 'rgba(255, 255, 255, 0.8)',
//                                 borderColor:
//                                   themeType === 'dark'
//                                     ? 'rgba(255, 255, 255, 0.08)'
//                                     : 'rgba(0, 0, 0, 0.06)',
//                               },
//                             ]}
//                             value={item.quantity}
//                             onChangeText={(text) =>
//                               updateItem(item.id, 'quantity', text)
//                             }
//                             keyboardType="numeric"
//                             placeholder="0"
//                             placeholderTextColor={theme.colors.textSecondary}
//                             textAlign="center"
//                           />
//                         </View>

//                         <View style={styles.priceContainer}>
//                           <Text
//                             style={[
//                               styles.smallLabel,
//                               { color: theme.colors.textSecondary },
//                             ]}
//                           >
//                             Price
//                           </Text>
//                           <View style={styles.priceInputContainer}>
//                             <View
//                               style={[
//                                 styles.currencyContainer,
//                                 {
//                                   backgroundColor: `${theme.colors.primary}15`,
//                                   borderColor: `${theme.colors.primary}20`,
//                                 },
//                               ]}
//                             >
//                               <IndianRupee
//                                 size={12}
//                                 color={theme.colors.primary}
//                               />
//                             </View>
//                             <TextInput
//                               style={[
//                                 styles.smallInput,
//                                 styles.priceInput,
//                                 {
//                                   color: theme.colors.text,
//                                   backgroundColor:
//                                     themeType === 'dark'
//                                       ? 'rgba(255, 255, 255, 0.05)'
//                                       : 'rgba(255, 255, 255, 0.8)',
//                                   borderColor:
//                                     themeType === 'dark'
//                                       ? 'rgba(255, 255, 255, 0.08)'
//                                       : 'rgba(0, 0, 0, 0.06)',
//                                   opacity: item.productId ? 0.7 : 1,
//                                 },
//                               ]}
//                               value={item.price}
//                               onChangeText={(text) =>
//                                 updateItem(item.id, 'price', text)
//                               }
//                               keyboardType="numeric"
//                               placeholder="0.00"
//                               placeholderTextColor={theme.colors.textSecondary}
//                               editable={!item.productId}
//                             />
//                           </View>
//                         </View>

//                         <View style={styles.amountContainer}>
//                           <Text
//                             style={[
//                               styles.smallLabel,
//                               { color: theme.colors.textSecondary },
//                             ]}
//                           >
//                             Amount
//                           </Text>
//                           <View style={styles.amountDisplay}>
//                             <IndianRupee
//                               size={12}
//                               color={theme.colors.success}
//                             />
//                             <Text
//                               style={[
//                                 styles.amountText,
//                                 { color: theme.colors.success },
//                               ]}
//                             >
//                               {parseFloat(item.amount).toLocaleString('en-IN', {
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2,
//                               })}
//                             </Text>
//                           </View>
//                         </View>
//                       </View>

//                       {/* Tax Information */}
//                       {item.taxPercentage &&
//                         parseFloat(item.taxPercentage) > 0 && (
//                           <View style={styles.taxInfoRow}>
//                             <Text
//                               style={[
//                                 styles.taxLabel,
//                                 { color: theme.colors.textSecondary },
//                               ]}
//                             >
//                               GST: {item.taxPercentage}%
//                               {item.includeTax
//                                 ? ' (Inclusive)'
//                                 : ' (Exclusive)'}
//                             </Text>
//                           </View>
//                         )}
//                     </View>
//                   </Animated.View>
//                 ))}
//               </View>
//             </BlurView>
//           </Animated.View>

//           {/* Total Section */}
//           <Animated.View entering={FadeInUp.delay(300)}>
//             <BlurView
//               intensity={themeType === 'dark' ? 15 : 80}
//               tint={themeType}
//               style={styles.totalSection}
//             >
//               <LinearGradient
//                 colors={[
//                   `${theme.colors.primary}12`,
//                   `${theme.colors.primary}06`,
//                   'transparent',
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.totalGradientOverlay}
//               />

//               <View style={styles.totalContent}>
//                 <View style={styles.totalRow}>
//                   <Text
//                     style={[
//                       styles.totalLabel,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     Subtotal
//                   </Text>
//                   <Text
//                     style={[styles.totalValue, { color: theme.colors.text }]}
//                   >
//                     ₹
//                     {calculateTotal().toLocaleString('en-IN', {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text
//                     style={[
//                       styles.totalLabel,
//                       { color: theme.colors.textSecondary },
//                     ]}
//                   >
//                     Tax (0%)
//                   </Text>
//                   <Text
//                     style={[styles.totalValue, { color: theme.colors.text }]}
//                   >
//                     ₹0.00
//                   </Text>
//                 </View>

//                 <View
//                   style={[
//                     styles.totalRow,
//                     styles.grandTotalRow,
//                     {
//                       borderTopColor:
//                         themeType === 'dark'
//                           ? 'rgba(255, 255, 255, 0.08)'
//                           : 'rgba(0, 0, 0, 0.06)',
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.grandTotalLabel,
//                       { color: theme.colors.text },
//                     ]}
//                   >
//                     Total Amount
//                   </Text>
//                   <View style={styles.grandTotalContainer}>
//                     <IndianRupee size={16} color={theme.colors.primary} />
//                     <Text
//                       style={[
//                         styles.grandTotalValue,
//                         { color: theme.colors.primary },
//                       ]}
//                     >
//                       {calculateTotal().toLocaleString('en-IN', {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </BlurView>
//           </Animated.View>
//         </ScrollView>

//         {/* Footer Actions */}
//         <BlurView
//           intensity={themeType === 'dark' ? 20 : 80}
//           tint={themeType}
//           style={styles.footer}
//         >
//           <View style={styles.footerContent}>
//             <TouchableOpacity
//               style={[
//                 styles.draftButton,
//                 {
//                   backgroundColor:
//                     themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.08)'
//                       : 'rgba(0, 0, 0, 0.05)',
//                   borderColor:
//                     themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.12)'
//                       : 'rgba(0, 0, 0, 0.08)',
//                 },
//               ]}
//             >
//               <Save size={20} color={theme.colors.textSecondary} />
//               <Text
//                 style={[
//                   styles.draftButtonText,
//                   { color: theme.colors.textSecondary },
//                 ]}
//               >
//                 Save Draft
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.shareButton,
//                 {
//                   backgroundColor: theme.colors.primary,
//                   shadowColor: theme.colors.primary,
//                 },
//               ]}
//             >
//               <LinearGradient
//                 colors={[
//                   theme.colors.primary,
//                   theme.colors.primaryLight || theme.colors.primary,
//                 ]}
//                 style={styles.shareGradient}
//               >
//                 <Share size={20} color="#FFFFFF" />
//                 <Text style={styles.shareButtonText}>Save & Share</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </BlurView>
//       </KeyboardAvoidingView>

//       {/* Product Selection Modal */}
//       <ProductSelectionModal
//         visible={showProductModal}
//         onClose={() => {
//           setShowProductModal(false);
//           setCurrentItemIndex(null);
//         }}
//         onSelectProduct={handleProductSelect}
//         selectedProducts={getSelectedProductIds()}
//       />

//       {/* Scan Result Confirmation Modal */}
//       {renderScanResultModal()}

//       {/* Barcode Scanner Modal */}
//       <Modal
//         visible={showBarcodeScanner}
//         animationType="slide"
//         onRequestClose={closeBarcodeScanner}
//       >
//         <View style={styles.scannerContainer}>
//           {permission?.granted && !isScanned ? (
//             <CameraView
//               style={styles.camera}
//               facing="back"
//               barcodeScannerSettings={{
//                 barcodeTypes: [
//                   'upc_a',
//                   'upc_e',
//                   'ean13',
//                   'ean8',
//                   'code39',
//                   'code93',
//                   'code128',
//                   'codabar',
//                   'itf14',
//                   'qr',
//                 ],
//               }}
//               onBarcodeScanned={handleBarCodeScanned}
//             >
//               {/* Scanner Overlay */}
//               <View style={styles.scannerOverlay}>
//                 <View style={styles.scannerFrame}>
//                   <View style={[styles.corner, styles.topLeft]} />
//                   <View style={[styles.corner, styles.topRight]} />
//                   <View style={[styles.corner, styles.bottomLeft]} />
//                   <View style={[styles.corner, styles.bottomRight]} />
//                 </View>
//                 <Text style={styles.scannerText}>
//                   Position the barcode within the frame
//                 </Text>

//                 {/* Scan feedback */}
//                 {isScanned && (
//                   <Animated.View
//                     entering={FadeIn.duration(200)}
//                     style={styles.scanFeedback}
//                   >
//                     <Text style={styles.scanFeedbackText}>
//                       Barcode detected! Processing...
//                     </Text>
//                   </Animated.View>
//                 )}

//                 {/* Auto-process toggle */}
//                 <View style={styles.scanOptionsContainer}>
//                   <TouchableOpacity
//                     style={[
//                       styles.scanOptionButton,
//                       {
//                         backgroundColor: autoProcessScan
//                           ? theme.colors.primary
//                           : 'rgba(255, 255, 255, 0.2)',
//                       },
//                     ]}
//                     onPress={() => setAutoProcessScan(!autoProcessScan)}
//                   >
//                     <Text style={styles.scanOptionText}>
//                       {autoProcessScan ? 'Auto Add: ON' : 'Auto Add: OFF'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </CameraView>
//           ) : (
//             <View style={styles.cameraPermissionContainer}>
//               <Text style={styles.cameraPermissionText}>
//                 {permission?.granted
//                   ? 'Processing barcode...'
//                   : 'Camera permission is required to scan barcodes.'}
//               </Text>
//               {!permission?.granted && (
//                 <>
//                   {permission?.canAskAgain ? (
//                     <TouchableOpacity
//                       style={[
//                         styles.permissionButton,
//                         { backgroundColor: theme.colors.primary },
//                       ]}
//                       onPress={() => requestPermission()}
//                     >
//                       <Text style={styles.permissionButtonText}>
//                         Request Permission
//                       </Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity
//                       style={[
//                         styles.permissionButton,
//                         { backgroundColor: theme.colors.primary },
//                       ]}
//                       onPress={() => Linking.openSettings()}
//                     >
//                       <Text style={styles.permissionButtonText}>
//                         Open Settings
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                 </>
//               )}
//             </View>
//           )}

//           {/* Enhanced Close Button */}
//           <TouchableOpacity
//             style={[
//               styles.closeScannerButton,
//               { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
//             ]}
//             onPress={closeBarcodeScanner}
//           >
//             <X size={24} color="#FFFFFF" />
//           </TouchableOpacity>

//           {/* Loading indicator when processing */}
//           {isLoadingProduct && (
//             <View style={styles.loadingOverlay}>
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#FFFFFF" />
//                 <Text style={styles.loadingText}>Processing barcode...</Text>
//               </View>
//             </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerGradient: {
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 12 : 8,
//     paddingVertical: 16,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.2,
//   },
//   placeholder: {
//     width: 40,
//   },
//   keyboardAvoid: {
//     flex: 1,
//     marginTop: -10,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 120,
//   },
//   section: {
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//     flex: 1,
//     marginLeft: 12,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   formRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginBottom: 8,
//     letterSpacing: -0.1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 12,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     height: 48,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   inputIcon: {
//     marginLeft: 8,
//   },
//   addItemButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 12,
//     gap: 6,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.15,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//       web: {
//         boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
//       },
//     }),
//   },
//   addItemText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
//   },
//   itemsContainer: {
//     gap: 12,
//   },
//   itemCard: {
//     borderRadius: 16,
//     borderWidth: 1,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   itemGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   deleteButtonCorner: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   itemContent: {
//     padding: 16,
//     position: 'relative',
//     zIndex: 2,
//   },
//   itemMainRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 12,
//   },
//   itemNameContainer: {
//     flex: 1,
//   },
//   itemNameInput: {
//     height: 44,
//   },
//   productInfo: {
//     marginTop: 8,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   productCode: {
//     fontSize: 11,
//     fontWeight: '500',
//     marginBottom: 2,
//   },
//   stockInfo: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   scannerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemDetailsRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   quantityContainer: {
//     flex: 1,
//   },
//   priceContainer: {
//     flex: 2,
//   },
//   amountContainer: {
//     flex: 2,
//   },
//   smallLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     marginBottom: 6,
//     letterSpacing: -0.1,
//   },
//   smallInput: {
//     height: 40,
//     borderRadius: 10,
//     borderWidth: 1,
//     paddingHorizontal: 12,
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   priceInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   currencyContainer: {
//     width: 28,
//     height: 28,
//     borderRadius: 8,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   priceInput: {
//     flex: 1,
//   },
//   amountDisplay: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     paddingVertical: 10,
//   },
//   amountText: {
//     fontSize: 14,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//   },
//   taxInfoRow: {
//     marginTop: 8,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   taxLabel: {
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   totalSection: {
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   totalGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   totalContent: {
//     padding: 20,
//     position: 'relative',
//     zIndex: 2,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   totalLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   totalValue: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   grandTotalRow: {
//     borderTopWidth: 1,
//     paddingTop: 16,
//     marginTop: 8,
//     marginBottom: 0,
//   },
//   grandTotalLabel: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   grandTotalContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   grandTotalValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   footer: {
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     paddingBottom: Platform.OS === 'ios' ? 34 : 20,
//   },
//   footerContent: {
//     flexDirection: 'row',
//     paddingHorizontal: 24,
//     paddingTop: 24,
//     gap: 16,
//   },
//   draftButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 20,
//     borderRadius: 16,
//     borderWidth: 1,
//     gap: 10,
//   },
//   draftButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//   },
//   shareButton: {
//     flex: 2,
//     borderRadius: 16,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.25,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 6,
//       },
//       web: {
//         boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
//       },
//     }),
//   },
//   shareGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   shareButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
//   },
//   // Scanner Styles
//   scannerContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   scannerOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//   },
//   scannerFrame: {
//     width: 250,
//     height: 250,
//     position: 'relative',
//   },
//   corner: {
//     position: 'absolute',
//     width: 30,
//     height: 30,
//     borderColor: '#FFFFFF',
//     borderWidth: 4,
//   },
//   topLeft: {
//     top: 0,
//     left: 0,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   topRight: {
//     top: 0,
//     right: 0,
//     borderLeftWidth: 0,
//     borderBottomWidth: 0,
//   },
//   bottomLeft: {
//     bottom: 0,
//     left: 0,
//     borderRightWidth: 0,
//     borderTopWidth: 0,
//   },
//   bottomRight: {
//     bottom: 0,
//     right: 0,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   scannerText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 30,
//     paddingHorizontal: 40,
//   },
//   scanFeedback: {
//     position: 'absolute',
//     bottom: 120,
//     backgroundColor: 'rgba(74, 222, 128, 0.9)',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   scanFeedbackText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   scanOptionsContainer: {
//     position: 'absolute',
//     bottom: 60,
//     alignItems: 'center',
//   },
//   scanOptionButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//   },
//   scanOptionText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   cameraPermissionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#000',
//   },
//   cameraPermissionText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   permissionButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   permissionButtonText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   closeScannerButton: {
//     position: 'absolute',
//     top: 50,
//     right: 30,
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingContainer: {
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 12,
//   },
//   // Scan Result Modal Styles
//   scanResultOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   scanResultBackdrop: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   scanResultModal: {
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 24,
//     maxHeight: '50%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   scanResultHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     gap: 12,
//   },
//   scanResultTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//   },
//   scanResultContent: {
//     marginBottom: 24,
//   },
//   scanResultCode: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 8,
//     fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
//   },
//   scanResultText: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   scanResultButtons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   scanResultButton: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cancelScanButton: {
//     borderWidth: 1,
//     borderColor: 'rgba(156, 163, 175, 0.3)',
//   },
//   confirmScanButton: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cancelScanText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   confirmScanText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
// });
import ProductSelectionModal from '@/components/modal/productSelectionModal';
import API from '@/config/api';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  FileText,
  IndianRupee,
  Package,
  Plus,
  QrCode,
  Save,
  Share,
  Users,
  X,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface InvoiceItem {
  id: string;
  name: string;
  quantity: string;
  price: string;
  amount: string;
  taxPercentage?: string;
  productId?: string;
  barcode?: string;
  availableStock?: number;
  includeTax?: boolean;
}

interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  productId: string;
  itemType: string;
  salePrice: string;
  rate: string;
  costPrice: string;
  taxPercentage: string;
  taxAmount: string;
  availableQuantity: string;
  openingQuantity: string;
  openingRate: string;
  reorderQuantity: string;
  sku: string;
  barcode: string;
  includeTax: boolean;
  hsnCodeId: string;
  imageUrl: string;
  status: string;
  categoryId: string;
  branchId: string;
  adminId: string;
  isAvailable: boolean;
  unitId: string;
  combination: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  attributeValuesInfo: any[];
  categoryInfo: {
    id: string;
    name: string;
  };
}

export default function CreateInvoiceScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: '1', name: '', quantity: '1', price: '', amount: '0' },
  ]);

  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: '',
    invoiceNumber: 'INV-0001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
  const [scanningForItem, setScanningForItem] = useState<number | null>(null);
  const [isScanned, setIsScanned] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const [showScanResult, setShowScanResult] = useState(false);
  const [autoProcessScan, setAutoProcessScan] = useState(true); // New setting for auto-processing

  // Refs for managing scan debouncing
  const scanTimeoutRef: any = useRef<NodeJS.Timeout | null>(null);
  const lastScannedRef = useRef<string>('');

  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: Date.now().toString(),
        name: '',
        quantity: '1',
        price: '',
        amount: '0',
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (invoiceItems.length <= 1) return;
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: string) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          if (field === 'quantity' || field === 'price') {
            const quantity =
              parseFloat(field === 'quantity' ? value : item.quantity) || 0;
            const price =
              parseFloat(field === 'price' ? value : item.price) || 0;
            updatedItem.amount = (quantity * price).toString();
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleProductSelect = (product: Product) => {
    if (currentItemIndex !== null) {
      const updatedItems = [...invoiceItems];
      const quantity = parseFloat(updatedItems[currentItemIndex].quantity) || 1;
      const price = parseFloat(product.salePrice);

      updatedItems[currentItemIndex] = {
        ...updatedItems[currentItemIndex],
        name: product.name,
        price: product.salePrice,
        amount: (quantity * price).toString(),
        taxPercentage: product.taxPercentage,
        productId: product.id,
        barcode: product.barcode,
        availableStock: parseFloat(product.availableQuantity),
        includeTax: product.includeTax,
      };

      setInvoiceItems(updatedItems);
      setCurrentItemIndex(null);
    }
  };

  const fetchProductByBarcode = async (
    barcode: string
  ): Promise<Product | null> => {
    try {
      setIsLoadingProduct(true);
      const response = await apiClient.get(
        `${API.PRODUCTS}/barcode/${barcode}`
      );
      return response.data?.data || null;
    } catch (error: any) {
      console.error('Error fetching product by barcode:', error);
      return null;
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const processScannedProduct = async (barcode: string, itemIndex: number) => {
    try {
      const product = await fetchProductByBarcode(barcode);

      if (product) {
        const updatedItems = [...invoiceItems];
        const quantity = parseFloat(updatedItems[itemIndex].quantity) || 1;
        const price = parseFloat(product.salePrice);

        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          name: product.name,
          price: product.salePrice,
          amount: (quantity * price).toString(),
          taxPercentage: product.taxPercentage,
          productId: product.id,
          barcode: product.barcode,
          availableStock: parseFloat(product.availableQuantity),
          includeTax: product.includeTax,
        };

        setInvoiceItems(updatedItems);

        // Close scanner and show brief success feedback
        setShowBarcodeScanner(false);
        setScanningForItem(null);
        setIsScanned(false);

        // Optional vibration feedback
        Vibration.vibrate(100);

        return product;
      } else {
        // Product not found
        setShowBarcodeScanner(false);
        setScanningForItem(null);
        setIsScanned(false);

        Alert.alert(
          'Product Not Found',
          `No product found with barcode: ${barcode}`,
          [{ text: 'OK' }],
          { cancelable: true }
        );
        return null;
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      setShowBarcodeScanner(false);
      setScanningForItem(null);
      setIsScanned(false);

      Alert.alert(
        'Error',
        'Failed to process barcode. Please try again.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
      return null;
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    // Prevent duplicate scans
    if (
      isScanned ||
      scanningForItem === null ||
      data === lastScannedRef.current
    ) {
      return;
    }

    // Clear any existing timeout
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    setIsScanned(true);
    lastScannedRef.current = data;
    setScannedData(data);

    if (autoProcessScan) {
      // Auto-process the scan without showing alert
      await processScannedProduct(data, scanningForItem);
    } else {
      // Show scan result for user confirmation
      setShowScanResult(true);
    }

    // Reset scanning state after a delay
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanned(false);
      lastScannedRef.current = '';
    }, 2000);
  };

  const handleConfirmScan = async () => {
    setShowScanResult(false);
    if (scanningForItem !== null && scannedData) {
      await processScannedProduct(scannedData, scanningForItem);
    }
  };

  const handleCancelScan = () => {
    setShowScanResult(false);
    setIsScanned(false);
    setScannedData('');
    lastScannedRef.current = '';
  };

  const closeBarcodeScanner = () => {
    setShowBarcodeScanner(false);
    setScanningForItem(null);
    setIsScanned(false);
    setScannedData('');
    setShowScanResult(false);
    lastScannedRef.current = '';

    // Clear timeout
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  const scanBarcode = async (itemIndex: number) => {
    try {
      if (!permission) {
        const { status, canAskAgain } = await requestPermission();
        if (status !== 'granted') {
          if (canAskAgain) {
            Alert.alert(
              'Permission Required',
              'Camera permission is required to scan barcodes. Please allow camera access.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Try Again', onPress: () => scanBarcode(itemIndex) },
              ]
            );
          } else {
            Alert.alert(
              'Permission Required',
              'Camera permission was denied. Please enable it in Settings to scan barcodes.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
              ]
            );
          }
          return;
        }
      } else if (!permission.granted) {
        if (permission.canAskAgain) {
          const { status } = await requestPermission();
          if (status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Camera permission is required to scan barcodes. Please allow camera access.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Try Again', onPress: () => scanBarcode(itemIndex) },
              ]
            );
            return;
          }
        } else {
          Alert.alert(
            'Permission Required',
            'Camera permission was denied. Please enable it in Settings to scan barcodes.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }
      }

      setScanningForItem(itemIndex);
      setShowBarcodeScanner(true);
      setIsScanned(false);
      setScannedData('');
      setShowScanResult(false);
      lastScannedRef.current = '';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert(
        'Error',
        'Failed to request camera permission. Please try again.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0);
  };

  const getSelectedProductIds = () => {
    return invoiceItems
      .filter((item) => item.productId)
      .map((item) => item.productId!)
      .filter(Boolean);
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string,
    rightIcon?: React.ReactNode,
    editable = true
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor:
              themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
            borderColor:
              themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
          },
        ]}
      >
        <TextInput
          style={[styles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          editable={editable}
        />
        {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
      </View>
    </View>
  );

  const renderScanResultModal = () => (
    <Modal
      visible={showScanResult}
      transparent
      animationType="none"
      onRequestClose={handleCancelScan}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.scanResultOverlay}
      >
        <TouchableOpacity
          style={styles.scanResultBackdrop}
          activeOpacity={1}
          onPress={handleCancelScan}
        />

        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(250)}
          style={[
            styles.scanResultModal,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.scanResultHeader}>
            <QrCode size={24} color={theme.colors.primary} />
            <Text
              style={[styles.scanResultTitle, { color: theme.colors.text }]}
            >
              Barcode Scanned
            </Text>
          </View>

          <View style={styles.scanResultContent}>
            <Text
              style={[
                styles.scanResultCode,
                { color: theme.colors.textSecondary },
              ]}
            >
              {scannedData}
            </Text>
            <Text style={[styles.scanResultText, { color: theme.colors.text }]}>
              Do you want to add this product to the invoice?
            </Text>
          </View>

          <View style={styles.scanResultButtons}>
            <TouchableOpacity
              style={[
                styles.scanResultButton,
                styles.cancelScanButton,
                { backgroundColor: `${theme.colors.textSecondary}15` },
              ]}
              onPress={handleCancelScan}
            >
              <Text
                style={[
                  styles.cancelScanText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.scanResultButton,
                styles.confirmScanButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleConfirmScan}
            >
              <Text style={styles.confirmScanText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Modern header with gradient */}
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
              <Text style={styles.headerTitle}>Create Invoice</Text>
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
          {/* Invoice Details Section */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Users size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Invoice Details
                </Text>
              </View>

              {renderFormInput(
                'Customer',
                invoiceDetails.customerName,
                (text) =>
                  setInvoiceDetails({ ...invoiceDetails, customerName: text }),
                'Select or add customer',
                <ChevronDown size={18} color={theme.colors.textSecondary} />
              )}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Invoice Number
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                        borderColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                      },
                    ]}
                  >
                    <TextInput
                      style={[styles.textInput, { color: theme.colors.text }]}
                      value={invoiceDetails.invoiceNumber}
                      onChangeText={(text) =>
                        setInvoiceDetails({
                          ...invoiceDetails,
                          invoiceNumber: text,
                        })
                      }
                    />
                  </View>
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Invoice Date
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                        borderColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)',
                      },
                    ]}
                  >
                    <Text
                      style={[styles.textInput, { color: theme.colors.text }]}
                    >
                      {invoiceDetails.invoiceDate}
                    </Text>
                    <View style={styles.inputIcon}>
                      <Calendar size={18} color={theme.colors.textSecondary} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {renderFormInput(
                'Due Date',
                invoiceDetails.dueDate,
                (text) =>
                  setInvoiceDetails({ ...invoiceDetails, dueDate: text }),
                undefined,
                <Calendar size={18} color={theme.colors.textSecondary} />,
                false
              )}
            </BlurView>
          </Animated.View>

          {/* Items Section */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Package size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Items
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addItemButton,
                    {
                      backgroundColor: theme.colors.primary,
                      shadowColor: theme.colors.primary,
                    },
                  ]}
                  onPress={addItem}
                >
                  <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.addItemText}>Add Item</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.itemsContainer}>
                {invoiceItems.map((item, index) => (
                  <Animated.View
                    key={item.id}
                    entering={FadeInDown.delay(index * 50).springify()}
                    style={[
                      styles.itemCard,
                      {
                        backgroundColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(255, 255, 255, 0.6)',
                        borderColor:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.04)',
                      },
                    ]}
                  >
                    {/* Subtle gradient overlay */}
                    <LinearGradient
                      colors={[
                        `${theme.colors.accent}08`,
                        `${theme.colors.accent}02`,
                        'transparent',
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.itemGradientOverlay}
                    />

                    {/* Delete button in top right corner - positioned absolutely */}
                    {invoiceItems.length > 1 && (
                      <TouchableOpacity
                        style={[
                          styles.deleteButtonCorner,
                          {
                            backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          },
                        ]}
                        onPress={() => removeItem(item.id)}
                      >
                        <X size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}

                    <View style={styles.itemContent}>
                      <View style={styles.itemMainRow}>
                        <View style={styles.itemNameContainer}>
                          <TouchableOpacity
                            style={[
                              styles.inputContainer,
                              styles.itemNameInput,
                              {
                                backgroundColor:
                                  themeType === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                borderColor:
                                  themeType === 'dark'
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : 'rgba(0, 0, 0, 0.06)',
                              },
                            ]}
                            onPress={() => {
                              setCurrentItemIndex(index);
                              setShowProductModal(true);
                            }}
                          >
                            <TextInput
                              style={[
                                styles.textInput,
                                { color: theme.colors.text },
                              ]}
                              placeholder="Select or add item"
                              placeholderTextColor={theme.colors.textSecondary}
                              value={item.name}
                              onChangeText={(text) =>
                                updateItem(item.id, 'name', text)
                              }
                              editable={!item.productId}
                            />
                            <View style={styles.inputIcon}>
                              <Package
                                size={16}
                                color={theme.colors.textSecondary}
                              />
                            </View>
                          </TouchableOpacity>

                          {/* Show product info if selected */}
                          {item.productId && (
                            <View style={styles.productInfo}>
                              <Text
                                style={[
                                  styles.productCode,
                                  { color: theme.colors.textSecondary },
                                ]}
                              >
                                {item.barcode ? `Barcode: ${item.barcode}` : ''}
                              </Text>
                              {item.availableStock !== undefined && (
                                <Text
                                  style={[
                                    styles.stockInfo,
                                    {
                                      color:
                                        item.availableStock > 0
                                          ? theme.colors.success
                                          : '#EF4444',
                                    },
                                  ]}
                                >
                                  Stock: {item.availableStock}
                                </Text>
                              )}
                            </View>
                          )}
                        </View>

                        {/* Scanner button */}
                        <TouchableOpacity
                          style={[
                            styles.scannerButton,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          onPress={() => scanBarcode(index)}
                          disabled={
                            isLoadingProduct && scanningForItem === index
                          }
                        >
                          {isLoadingProduct && scanningForItem === index ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          ) : (
                            <QrCode size={18} color="#FFFFFF" />
                          )}
                        </TouchableOpacity>
                      </View>

                      <View style={styles.itemDetailsRow}>
                        <View style={styles.quantityContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Qty
                          </Text>
                          <TextInput
                            style={[
                              styles.smallInput,
                              {
                                color: theme.colors.text,
                                backgroundColor:
                                  themeType === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                borderColor:
                                  themeType === 'dark'
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : 'rgba(0, 0, 0, 0.06)',
                              },
                            ]}
                            value={item.quantity}
                            onChangeText={(text) =>
                              updateItem(item.id, 'quantity', text)
                            }
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor={theme.colors.textSecondary}
                            textAlign="center"
                          />
                        </View>

                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              styles.smallLabel,
                              { color: theme.colors.textSecondary },
                            ]}
                          >
                            Price
                          </Text>
                          <View style={styles.priceInputContainer}>
                            <View
                              style={[
                                styles.currencyContainer,
                                {
                                  backgroundColor: `${theme.colors.primary}15`,
                                  borderColor: `${theme.colors.primary}20`,
                                },
                              ]}
                            >
                              <IndianRupee
                                size={12}
                                color={theme.colors.primary}
                              />
                            </View>
                            <TextInput
                              style={[
                                styles.smallInput,
                                styles.priceInput,
                                {
                                  color: theme.colors.text,
                                  backgroundColor:
                                    themeType === 'dark'
                                      ? 'rgba(255, 255, 255, 0.05)'
                                      : 'rgba(255, 255, 255, 0.8)',
                                  borderColor:
                                    themeType === 'dark'
                                      ? 'rgba(255, 255, 255, 0.08)'
                                      : 'rgba(0, 0, 0, 0.06)',
                                  opacity: item.productId ? 0.7 : 1,
                                },
                              ]}
                              value={item.price}
                              onChangeText={(text) =>
                                updateItem(item.id, 'price', text)
                              }
                              keyboardType="numeric"
                              placeholder="0.00"
                              placeholderTextColor={theme.colors.textSecondary}
                              editable={!item.productId}
                            />
                          </View>
                        </View>
                      </View>

                      {/* Tax Information */}
                      {item.taxPercentage &&
                        parseFloat(item.taxPercentage) > 0 && (
                          <View style={styles.taxInfoRow}>
                            <Text
                              style={[
                                styles.taxLabel,
                                { color: theme.colors.textSecondary },
                              ]}
                            >
                              GST: {item.taxPercentage}%
                              {item.includeTax
                                ? ' (Inclusive)'
                                : ' (Exclusive)'}
                            </Text>
                          </View>
                        )}
                    </View>
                  </Animated.View>
                ))}
              </View>
            </BlurView>
          </Animated.View>

          {/* Total Section */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.totalSection}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.primary}12`,
                  `${theme.colors.primary}06`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.totalGradientOverlay}
              />

              <View style={styles.totalContent}>
                <View style={styles.totalRow}>
                  <Text
                    style={[
                      styles.totalLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Subtotal
                  </Text>
                  <Text
                    style={[styles.totalValue, { color: theme.colors.text }]}
                  >
                    ₹
                    {calculateTotal().toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>

                <View style={styles.totalRow}>
                  <Text
                    style={[
                      styles.totalLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Tax (0%)
                  </Text>
                  <Text
                    style={[styles.totalValue, { color: theme.colors.text }]}
                  >
                    ₹0.00
                  </Text>
                </View>

                <View
                  style={[
                    styles.totalRow,
                    styles.grandTotalRow,
                    {
                      borderTopColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.grandTotalLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Total Amount
                  </Text>
                  <View style={styles.grandTotalContainer}>
                    <IndianRupee size={16} color={theme.colors.primary} />
                    <Text
                      style={[
                        styles.grandTotalValue,
                        { color: theme.colors.primary },
                      ]}
                    >
                      {calculateTotal().toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer Actions */}
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <View style={styles.footerContent}>
            <TouchableOpacity
              style={[
                styles.draftButton,
                {
                  backgroundColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)',
                  borderColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            >
              <Save size={20} color={theme.colors.textSecondary} />
              <Text
                style={[
                  styles.draftButtonText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Save Draft
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.shareButton,
                {
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                },
              ]}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.shareGradient}
              >
                <Share size={20} color="#FFFFFF" />
                <Text style={styles.shareButtonText}>Save & Share</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>

      {/* Product Selection Modal */}
      <ProductSelectionModal
        visible={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setCurrentItemIndex(null);
        }}
        onSelectProduct={handleProductSelect}
        selectedProducts={getSelectedProductIds()}
      />

      {/* Scan Result Confirmation Modal */}
      {renderScanResultModal()}

      {/* Barcode Scanner Modal */}
      <Modal
        visible={showBarcodeScanner}
        animationType="slide"
        onRequestClose={closeBarcodeScanner}
      >
        <View style={styles.scannerContainer}>
          {permission?.granted && !isScanned ? (
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: [
                  'upc_a',
                  'upc_e',
                  'ean13',
                  'ean8',
                  'code39',
                  'code93',
                  'code128',
                  'codabar',
                  'itf14',
                  'qr',
                ],
              }}
              onBarcodeScanned={handleBarCodeScanned}
            >
              {/* Scanner Overlay */}
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerFrame}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>
                <Text style={styles.scannerText}>
                  Position the barcode within the frame
                </Text>

                {/* Scan feedback */}
                {isScanned && (
                  <Animated.View
                    entering={FadeIn.duration(200)}
                    style={styles.scanFeedback}
                  >
                    <Text style={styles.scanFeedbackText}>
                      Barcode detected! Processing...
                    </Text>
                  </Animated.View>
                )}

                {/* Auto-process toggle */}
                <View style={styles.scanOptionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.scanOptionButton,
                      {
                        backgroundColor: autoProcessScan
                          ? theme.colors.primary
                          : 'rgba(255, 255, 255, 0.2)',
                      },
                    ]}
                    onPress={() => setAutoProcessScan(!autoProcessScan)}
                  >
                    <Text style={styles.scanOptionText}>
                      {autoProcessScan ? 'Auto Add: ON' : 'Auto Add: OFF'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Close Camera Button - Added inside CameraView */}
              <TouchableOpacity
                style={[
                  styles.closeCameraButton,
                  { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                ]}
                onPress={closeBarcodeScanner}
              >
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </CameraView>
          ) : (
            <View style={styles.cameraPermissionContainer}>
              <Text style={styles.cameraPermissionText}>
                {permission?.granted
                  ? 'Processing barcode...'
                  : 'Camera permission is required to scan barcodes.'}
              </Text>
              {!permission?.granted && (
                <>
                  {permission?.canAskAgain ? (
                    <TouchableOpacity
                      style={[
                        styles.permissionButton,
                        { backgroundColor: theme.colors.primary },
                      ]}
                      onPress={() => requestPermission()}
                    >
                      <Text style={styles.permissionButtonText}>
                        Request Permission
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.permissionButton,
                        { backgroundColor: theme.colors.primary },
                      ]}
                      onPress={() => Linking.openSettings()}
                    >
                      <Text style={styles.permissionButtonText}>
                        Open Settings
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              {/* Close button for permission screen too */}
              <TouchableOpacity
                style={[
                  styles.closeCameraButton,
                  { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                ]}
                onPress={closeBarcodeScanner}
              >
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {/* Loading indicator when processing */}
          {isLoadingProduct && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Processing barcode...</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
    marginLeft: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  inputIcon: {
    marginLeft: 8,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
      },
    }),
  },
  addItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  itemsContainer: {
    gap: 12,
  },
  itemCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  itemGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  deleteButtonCorner: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContent: {
    padding: 16,
    paddingTop: 40, // Add padding to avoid delete button overlap
    position: 'relative',
    zIndex: 2,
  },
  itemMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  itemNameContainer: {
    flex: 1,
  },
  itemNameInput: {
    height: 44,
  },
  productInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  productCode: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  stockInfo: {
    fontSize: 11,
    fontWeight: '600',
  },
  scannerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quantityContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 2,
  },
  smallLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: -0.1,
  },
  smallInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
  },
  taxInfoRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  taxLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  totalSection: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  totalGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  totalContent: {
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  grandTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  footer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  footerContent: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  draftButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  shareButton: {
    flex: 2,
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
  shareGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  // Scanner Styles
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 40,
  },
  scanFeedback: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: 'rgba(74, 222, 128, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scanFeedbackText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scanOptionsContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  scanOptionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  scanOptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cameraPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    position: 'relative',
  },
  cameraPermissionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  closeCameraButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  // Scan Result Modal Styles
  scanResultOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanResultBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  scanResultModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  scanResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  scanResultTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  scanResultContent: {
    marginBottom: 24,
  },
  scanResultCode: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  scanResultText: {
    fontSize: 16,
    lineHeight: 24,
  },
  scanResultButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  scanResultButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelScanButton: {
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.3)',
  },
  confirmScanButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelScanText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmScanText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
