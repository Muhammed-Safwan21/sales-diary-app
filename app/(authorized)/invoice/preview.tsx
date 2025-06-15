// // // import { useTheme } from '@/context/ThemeContext';
// // // import { BlurView } from 'expo-blur';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { StatusBar } from 'expo-status-bar';
// // // import * as Print from 'expo-print';
// // // import * as Sharing from 'expo-sharing';
// // // import * as FileSystem from 'expo-file-system';
// // // import {
// // //   ArrowLeft,
// // //   Building2,
// // //   Calendar,
// // //   Download,
// // //   FileText,
// // //   IndianRupee,
// // //   Mail,
// // //   MapPin,
// // //   Phone,
// // //   Printer,
// // //   Share,
// // //   User,
// // //   CheckCircle,
// // // } from 'lucide-react-native';
// // // import React, { useState } from 'react';
// // // import {
// // //   ActivityIndicator,
// // //   Alert,
// // //   Platform,
// // //   ScrollView,
// // //   StyleSheet,
// // //   Text,
// // //   TouchableOpacity,
// // //   View,
// // // } from 'react-native';
// // // import Animated, {
// // //   FadeIn,
// // //   FadeInDown,
// // //   FadeInUp,
// // // } from 'react-native-reanimated';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useRouter, useLocalSearchParams } from 'expo-router';

// // // // Mock data - replace with actual invoice data from API
// // // const mockInvoiceData = {
// // //   id: 'INV-001',
// // //   invoiceNumber: 'INV-2024-001',
// // //   invoiceDate: '2024-06-15',
// // //   dueDate: '2024-06-22',
// // //   status: 'PAID',
// // //   customer: {
// // //     name: 'Acme Corporation',
// // //     email: 'contact@acme.com',
// // //     phone: '+91 98765 43210',
// // //     address: {
// // //       street: '123 Business Street',
// // //       city: 'Mumbai',
// // //       state: 'Maharashtra',
// // //       pincode: '400001',
// // //       country: 'India',
// // //     },
// // //   },
// // //   company: {
// // //     name: 'Your Business Name',
// // //     email: 'hello@yourbusiness.com',
// // //     phone: '+91 12345 67890',
// // //     address: {
// // //       street: '456 Company Lane',
// // //       city: 'Mumbai',
// // //       state: 'Maharashtra',
// // //       pincode: '400002',
// // //       country: 'India',
// // //     },
// // //     gstin: '27ABCDE1234F1Z5',
// // //   },
// // //   items: [
// // //     {
// // //       id: '1',
// // //       name: 'Premium Widget',
// // //       description: 'High-quality premium widget with advanced features',
// // //       quantity: 2,
// // //       unitPrice: 1500.0,
// // //       taxPercentage: 18,
// // //       taxAmount: 540.0,
// // //       totalAmount: 3540.0,
// // //     },
// // //     {
// // //       id: '2',
// // //       name: 'Standard Service',
// // //       description: 'Monthly maintenance and support service',
// // //       quantity: 1,
// // //       unitPrice: 2000.0,
// // //       taxPercentage: 18,
// // //       taxAmount: 360.0,
// // //       totalAmount: 2360.0,
// // //     },
// // //   ],
// // //   totals: {
// // //     subtotal: 5000.0,
// // //     discountAmount: 250.0,
// // //     taxAmount: 900.0,
// // //     totalAmount: 5650.0,
// // //     roundOffAmount: 0,
// // //     finalAmount: 5650.0,
// // //   },
// // //   paymentMethod: 'UPI',
// // //   notes: 'Thank you for your business. Payment terms: Net 7 days.',
// // // };

// // // export default function InvoicePreviewScreen() {
// // //   const { theme, themeType }: any = useTheme();
// // //   const router = useRouter();
// // //   const params = useLocalSearchParams();
// // //   console.log("paramsparamsparams",)
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [processingAction, setProcessingAction] = useState<'print' | 'download' | 'share' | null>(null);

// // //   // In real implementation, fetch invoice data using the ID from params
// // //   const invoice = mockInvoiceData;

// // //   const generateInvoiceHTML = () => {
// // //     const itemsHTML = invoice.items
// // //       .map(
// // //         (item) => `
// // //         <tr>
// // //           <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0;">
// // //             <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">
// // //               ${item.name}
// // //             </div>
// // //             ${item.description ? `<div style="font-size: 12px; color: #6b7280;">${item.description}</div>` : ''}
// // //           </td>
// // //           <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; text-align: center;">
// // //             ${item.quantity}
// // //           </td>
// // //           <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; text-align: right;">
// // //             ₹${item.unitPrice.toLocaleString('en-IN')}
// // //           </td>
// // //           <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; text-align: right;">
// // //             ${item.taxPercentage}%
// // //           </td>
// // //           <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600;">
// // //             ₹${item.totalAmount.toLocaleString('en-IN')}
// // //           </td>
// // //         </tr>
// // //       `
// // //       )
// // //       .join('');

// // //     return `
// // //       <!DOCTYPE html>
// // //       <html>
// // //         <head>
// // //           <meta charset="utf-8">
// // //           <title>Invoice ${invoice.invoiceNumber}</title>
// // //           <style>
// // //             * { margin: 0; padding: 0; box-sizing: border-box; }
// // //             body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.5; }
// // //             .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
// // //             .invoice-header { margin-bottom: 40px; }
// // //             .invoice-title { font-size: 28px; font-weight: 700; color: #6366f1; margin-bottom: 8px; }
// // //             .invoice-meta { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
// // //             .company-info, .customer-info { flex: 1; }
// // //             .company-info { margin-right: 40px; }
// // //             .info-title { font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
// // //             .company-name, .customer-name { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
// // //             .address-line { font-size: 14px; color: #6b7280; margin-bottom: 4px; }
// // //             .invoice-details { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; margin-bottom: 32px; }
// // //             .details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
// // //             .detail-item { }
// // //             .detail-label { font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 4px; text-transform: uppercase; }
// // //             .detail-value { font-size: 16px; font-weight: 600; color: #1f2937; }
// // //             .items-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
// // //             .items-table th { background: #6366f1; color: white; padding: 16px 8px; font-weight: 600; text-align: left; }
// // //             .items-table th:nth-child(2), .items-table th:nth-child(3), .items-table th:nth-child(4), .items-table th:nth-child(5) { text-align: center; }
// // //             .items-table th:nth-child(3), .items-table th:nth-child(5) { text-align: right; }
// // //             .totals-section { display: flex; justify-content: flex-end; margin-bottom: 32px; }
// // //             .totals-table { min-width: 300px; }
// // //             .totals-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
// // //             .totals-row.total { font-weight: 700; font-size: 18px; border-bottom: 2px solid #6366f1; padding: 16px 0; }
// // //             .notes-section { background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1; }
// // //             .notes-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
// // //             .notes-text { font-size: 14px; color: #6b7280; }
// // //             @media print {
// // //               body { print-color-adjust: exact; }
// // //               .invoice-container { padding: 20px; }
// // //             }
// // //           </style>
// // //         </head>
// // //         <body>
// // //           <div class="invoice-container">
// // //             <div class="invoice-header">
// // //               <div class="invoice-title">INVOICE</div>
// // //             </div>
            
// // //             <div class="invoice-meta">
// // //               <div class="company-info">
// // //                 <div class="info-title">From</div>
// // //                 <div class="company-name">${invoice.company.name}</div>
// // //                 <div class="address-line">${invoice.company.address.street}</div>
// // //                 <div class="address-line">${invoice.company.address.city}, ${invoice.company.address.state} ${invoice.company.address.pincode}</div>
// // //                 <div class="address-line">${invoice.company.address.country}</div>
// // //                 <div class="address-line">GSTIN: ${invoice.company.gstin}</div>
// // //                 <div class="address-line">${invoice.company.email}</div>
// // //                 <div class="address-line">${invoice.company.phone}</div>
// // //               </div>
              
// // //               <div class="customer-info">
// // //                 <div class="info-title">Bill To</div>
// // //                 <div class="customer-name">${invoice.customer.name}</div>
// // //                 <div class="address-line">${invoice.customer.address.street}</div>
// // //                 <div class="address-line">${invoice.customer.address.city}, ${invoice.customer.address.state} ${invoice.customer.address.pincode}</div>
// // //                 <div class="address-line">${invoice.customer.address.country}</div>
// // //                 <div class="address-line">${invoice.customer.email}</div>
// // //                 <div class="address-line">${invoice.customer.phone}</div>
// // //               </div>
// // //             </div>
            
// // //             <div class="invoice-details">
// // //               <div class="details-grid">
// // //                 <div class="detail-item">
// // //                   <div class="detail-label">Invoice Number</div>
// // //                   <div class="detail-value">${invoice.invoiceNumber}</div>
// // //                 </div>
// // //                 <div class="detail-item">
// // //                   <div class="detail-label">Invoice Date</div>
// // //                   <div class="detail-value">${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</div>
// // //                 </div>
// // //                 <div class="detail-item">
// // //                   <div class="detail-label">Due Date</div>
// // //                   <div class="detail-value">${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
// // //                 </div>
// // //                 <div class="detail-item">
// // //                   <div class="detail-label">Payment Method</div>
// // //                   <div class="detail-value">${invoice.paymentMethod}</div>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <table class="items-table">
// // //               <thead>
// // //                 <tr>
// // //                   <th>Item Description</th>
// // //                   <th>Qty</th>
// // //                   <th>Unit Price</th>
// // //                   <th>Tax</th>
// // //                   <th>Amount</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 ${itemsHTML}
// // //               </tbody>
// // //             </table>
            
// // //             <div class="totals-section">
// // //               <div class="totals-table">
// // //                 <div class="totals-row">
// // //                   <span>Subtotal:</span>
// // //                   <span>₹${invoice.totals.subtotal.toLocaleString('en-IN')}</span>
// // //                 </div>
// // //                 <div class="totals-row">
// // //                   <span>Discount:</span>
// // //                   <span>-₹${invoice.totals.discountAmount.toLocaleString('en-IN')}</span>
// // //                 </div>
// // //                 <div class="totals-row">
// // //                   <span>Tax (GST):</span>
// // //                   <span>₹${invoice.totals.taxAmount.toLocaleString('en-IN')}</span>
// // //                 </div>
// // //                 <div class="totals-row total">
// // //                   <span>Total Amount:</span>
// // //                   <span>₹${invoice.totals.finalAmount.toLocaleString('en-IN')}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             ${invoice.notes ? `
// // //               <div class="notes-section">
// // //                 <div class="notes-title">Notes:</div>
// // //                 <div class="notes-text">${invoice.notes}</div>
// // //               </div>
// // //             ` : ''}
// // //           </div>
// // //         </body>
// // //       </html>
// // //     `;
// // //   };

// // //   const handlePrint = async () => {
// // //     try {
// // //       setIsProcessing(true);
// // //       setProcessingAction('print');

// // //       const htmlContent = generateInvoiceHTML();
      
// // //       await Print.printAsync({
// // //         html: htmlContent,
// // //         printerUrl: undefined, // iOS only
// // //       });
// // //     } catch (error) {
// // //       console.error('Print error:', error);
// // //       Alert.alert('Error', 'Failed to print invoice. Please try again.');
// // //     } finally {
// // //       setIsProcessing(false);
// // //       setProcessingAction(null);
// // //     }
// // //   };

// // //   const handleDownload = async () => {
// // //     try {
// // //       setIsProcessing(true);
// // //       setProcessingAction('download');

// // //       const htmlContent = generateInvoiceHTML();
      
// // //       const { uri } = await Print.printToFileAsync({
// // //         html: htmlContent,
// // //         base64: false,
// // //       });

// // //       // Move to a permanent location
// // //       const fileName = `Invoice_${invoice.invoiceNumber}_${Date.now()}.pdf`;
// // //       const newUri = `${FileSystem.documentDirectory}${fileName}`;
// // //       await FileSystem.moveAsync({
// // //         from: uri,
// // //         to: newUri,
// // //       });

// // //       Alert.alert(
// // //         'Success',
// // //         `Invoice downloaded successfully!\nSaved as: ${fileName}`,
// // //         [
// // //           {
// // //             text: 'OK',
// // //             style: 'default',
// // //           },
// // //         ]
// // //       );
// // //     } catch (error) {
// // //       console.error('Download error:', error);
// // //       Alert.alert('Error', 'Failed to download invoice. Please try again.');
// // //     } finally {
// // //       setIsProcessing(false);
// // //       setProcessingAction(null);
// // //     }
// // //   };

// // //   const handleShare = async () => {
// // //     try {
// // //       setIsProcessing(true);
// // //       setProcessingAction('share');

// // //       const htmlContent = generateInvoiceHTML();
      
// // //       const { uri } = await Print.printToFileAsync({
// // //         html: htmlContent,
// // //         base64: false,
// // //       });

// // //       if (await Sharing.isAvailableAsync()) {
// // //         await Sharing.shareAsync(uri, {
// // //           mimeType: 'application/pdf',
// // //           dialogTitle: `Share Invoice ${invoice.invoiceNumber}`,
// // //           UTI: 'com.adobe.pdf',
// // //         });
// // //       } else {
// // //         Alert.alert('Error', 'Sharing is not available on this device.');
// // //       }
// // //     } catch (error) {
// // //       console.error('Share error:', error);
// // //       Alert.alert('Error', 'Failed to share invoice. Please try again.');
// // //     } finally {
// // //       setIsProcessing(false);
// // //       setProcessingAction(null);
// // //     }
// // //   };

// // //   const getStatusColor = (status: string) => {
// // //     switch (status) {
// // //       case 'PAID':
// // //         return '#06D6A0';
// // //       case 'PENDING':
// // //         return '#F59E0B';
// // //       case 'OVERDUE':
// // //         return '#EF4444';
// // //       case 'DRAFT':
// // //         return '#6B7280';
// // //       default:
// // //         return theme.colors.textSecondary;
// // //     }
// // //   };

// // //   const getStatusIcon = (status: string) => {
// // //     switch (status) {
// // //       case 'PAID':
// // //         return <CheckCircle size={14} color={getStatusColor(status)} />;
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <View
// // //       style={[styles.container, { backgroundColor: theme.colors.background }]}
// // //     >
// // //       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

// // //       {/* Header with Gradient */}
// // //       <LinearGradient
// // //         colors={
// // //           themeType === 'dark'
// // //             ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
// // //             : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
// // //         }
// // //         start={{ x: 0, y: 0 }}
// // //         end={{ x: 0, y: 1 }}
// // //         style={styles.headerGradient}
// // //       >
// // //         <SafeAreaView>
// // //           <View style={styles.header}>
// // //             <TouchableOpacity
// // //               style={styles.backButton}
// // //               onPress={() => router.back()}
// // //             >
// // //               <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
// // //             </TouchableOpacity>

// // //             <View style={styles.headerTitleContainer}>
// // //               <FileText size={20} color="#FFFFFF" />
// // //               <Text style={styles.headerTitle}>Invoice Preview</Text>
// // //             </View>

// // //             <View style={styles.placeholder} />
// // //           </View>
// // //         </SafeAreaView>
// // //       </LinearGradient>

// // //       <ScrollView
// // //         style={styles.scrollView}
// // //         contentContainerStyle={styles.scrollContent}
// // //         showsVerticalScrollIndicator={false}
// // //       >
// // //         {/* Success Banner */}
// // //         <Animated.View entering={FadeInDown.delay(100)}>
// // //           <BlurView
// // //             intensity={themeType === 'dark' ? 15 : 80}
// // //             tint={themeType}
// // //             style={styles.successBanner}
// // //           >
// // //             <LinearGradient
// // //               colors={['rgba(6, 214, 160, 0.1)', 'rgba(6, 214, 160, 0.05)']}
// // //               style={styles.successGradient}
// // //             >
// // //               <CheckCircle size={24} color="#06D6A0" />
// // //               <View style={styles.successContent}>
// // //                 <Text style={[styles.successTitle, { color: theme.colors.text }]}>
// // //                   Invoice Created Successfully!
// // //                 </Text>
// // //                 <Text style={[styles.successSubtitle, { color: theme.colors.textSecondary }]}>
// // //                   Your invoice has been generated and is ready to share
// // //                 </Text>
// // //               </View>
// // //             </LinearGradient>
// // //           </BlurView>
// // //         </Animated.View>

// // //         {/* Invoice Header Info */}
// // //         <Animated.View entering={FadeInUp.delay(200)}>
// // //           <BlurView
// // //             intensity={themeType === 'dark' ? 15 : 80}
// // //             tint={themeType}
// // //             style={styles.section}
// // //           >
// // //             <View style={styles.invoiceHeaderInfo}>
// // //               <View style={styles.invoiceNumberContainer}>
// // //                 <Text style={[styles.invoiceLabel, { color: theme.colors.textSecondary }]}>
// // //                   Invoice Number
// // //                 </Text>
// // //                 <Text style={[styles.invoiceNumber, { color: theme.colors.text }]}>
// // //                   {invoice.invoiceNumber}
// // //                 </Text>
// // //               </View>

// // //               <View style={styles.invoiceStatusContainer}>
// // //                 <View
// // //                   style={[
// // //                     styles.statusBadge,
// // //                     { backgroundColor: `${getStatusColor(invoice.status)}20` },
// // //                   ]}
// // //                 >
// // //                   {getStatusIcon(invoice.status)}
// // //                   <Text
// // //                     style={[
// // //                       styles.statusText,
// // //                       { color: getStatusColor(invoice.status) },
// // //                     ]}
// // //                   >
// // //                     {invoice.status}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>

// // //             <View style={styles.invoiceDatesContainer}>
// // //               <View style={styles.dateItem}>
// // //                 <Calendar size={16} color={theme.colors.textSecondary} />
// // //                 <View>
// // //                   <Text style={[styles.dateLabel, { color: theme.colors.textSecondary }]}>
// // //                     Invoice Date
// // //                   </Text>
// // //                   <Text style={[styles.dateValue, { color: theme.colors.text }]}>
// // //                     {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
// // //                   </Text>
// // //                 </View>
// // //               </View>

// // //               <View style={styles.dateItem}>
// // //                 <Calendar size={16} color={theme.colors.textSecondary} />
// // //                 <View>
// // //                   <Text style={[styles.dateLabel, { color: theme.colors.textSecondary }]}>
// // //                     Due Date
// // //                   </Text>
// // //                   <Text style={[styles.dateValue, { color: theme.colors.text }]}>
// // //                     {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </BlurView>
// // //         </Animated.View>

// // //         {/* Company & Customer Info */}
// // //         <Animated.View entering={FadeInUp.delay(300)}>
// // //           <BlurView
// // //             intensity={themeType === 'dark' ? 15 : 80}
// // //             tint={themeType}
// // //             style={styles.section}
// // //           >
// // //             <View style={styles.contactsContainer}>
// // //               <View style={styles.contactSection}>
// // //                 <View style={styles.contactHeader}>
// // //                   <Building2 size={16} color={theme.colors.primary} />
// // //                   <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
// // //                     From
// // //                   </Text>
// // //                 </View>
// // //                 <Text style={[styles.contactName, { color: theme.colors.text }]}>
// // //                   {invoice.company.name}
// // //                 </Text>
// // //                 <Text style={[styles.contactDetail, { color: theme.colors.textSecondary }]}>
// // //                   {invoice.company.address.street}
// // //                 </Text>
// // //                 <Text style={[styles.contactDetail, { color: theme.colors.textSecondary }]}>
// // //                   {invoice.company.address.city}, {invoice.company.address.state} {invoice.company.address.pincode}
// // //                 </Text>
// // //                 <View style={styles.contactMetaContainer}>
// // //                   <View style={styles.contactMeta}>
// // //                     <Mail size={12} color={theme.colors.textSecondary} />
// // //                     <Text style={[styles.contactMetaText, { color: theme.colors.textSecondary }]}>
// // //                       {invoice.company.email}
// // //                     </Text>
// // //                   </View>
// // //                   <View style={styles.contactMeta}>
// // //                     <Phone size={12} color={theme.colors.textSecondary} />
// // //                     <Text style={[styles.contactMetaText, { color: theme.colors.textSecondary }]}>
// // //                       {invoice.company.phone}
// // //                     </Text>
// // //                   </View>
// // //                 </View>
// // //               </View>

// // //               <View style={styles.contactSection}>
// // //                 <View style={styles.contactHeader}>
// // //                   <User size={16} color={theme.colors.accent} />
// // //                   <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
// // //                     Bill To
// // //                   </Text>
// // //                 </View>
// // //                 <Text style={[styles.contactName, { color: theme.colors.text }]}>
// // //                   {invoice.customer.name}
// // //                 </Text>
// // //                 <Text style={[styles.contactDetail, { color: theme.colors.textSecondary }]}>
// // //                   {invoice.customer.address.street}
// // //                 </Text>
// // //                 <Text style={[styles.contactDetail, { color: theme.colors.textSecondary }]}>
// // //                   {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.pincode}
// // //                 </Text>
// // //                 <View style={styles.contactMetaContainer}>
// // //                   <View style={styles.contactMeta}>
// // //                     <Mail size={12} color={theme.colors.textSecondary} />
// // //                     <Text style={[styles.contactMetaText, { color: theme.colors.textSecondary }]}>
// // //                       {invoice.customer.email}
// // //                     </Text>
// // //                   </View>
// // //                   <View style={styles.contactMeta}>
// // //                     <Phone size={12} color={theme.colors.textSecondary} />
// // //                     <Text style={[styles.contactMetaText, { color: theme.colors.textSecondary }]}>
// // //                       {invoice.customer.phone}
// // //                     </Text>
// // //                   </View>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </BlurView>
// // //         </Animated.View>

// // //         {/* Items List */}
// // //         <Animated.View entering={FadeInUp.delay(400)}>
// // //           <BlurView
// // //             intensity={themeType === 'dark' ? 15 : 80}
// // //             tint={themeType}
// // //             style={styles.section}
// // //           >
// // //             <View style={styles.sectionHeader}>
// // //               <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
// // //                 Items
// // //               </Text>
// // //             </View>

// // //             <View style={styles.itemsList}>
// // //               {invoice.items.map((item, index) => (
// // //                 <Animated.View
// // //                   key={item.id}
// // //                   entering={FadeInDown.delay(500 + index * 100)}
// // //                   style={[
// // //                     styles.itemCard,
// // //                     {
// // //                       backgroundColor:
// // //                         themeType === 'dark'
// // //                           ? 'rgba(255, 255, 255, 0.03)'
// // //                           : 'rgba(255, 255, 255, 0.6)',
// // //                       borderColor:
// // //                         themeType === 'dark'
// // //                           ? 'rgba(255, 255, 255, 0.06)'
// // //                           : 'rgba(0, 0, 0, 0.04)',
// // //                     },
// // //                   ]}
// // //                 >
// // //                   <View style={styles.itemHeader}>
// // //                     <Text style={[styles.itemName, { color: theme.colors.text }]}>
// // //                       {item.name}
// // //                     </Text>
// // //                     <Text style={[styles.itemAmount, { color: theme.colors.text }]}>
// // //                       ₹{item.totalAmount.toLocaleString('en-IN')}
// // //                     </Text>
// // //                   </View>

// // //                   {item.description && (
// // //                     <Text style={[styles.itemDescription, { color: theme.colors.textSecondary }]}>
// // //                       {item.description}
// // //                     </Text>
// // //                   )}

// // //                   <View style={styles.itemDetails}>
// // //                     <View style={styles.itemDetailRow}>
// // //                       <Text style={[styles.itemDetailLabel, { color: theme.colors.textSecondary }]}>
// // //                         Quantity: {item.quantity}
// // //                       </Text>
// // //                       <Text style={[styles.itemDetailLabel, { color: theme.colors.textSecondary }]}>
// // //                         Unit Price: ₹{item.unitPrice.toLocaleString('en-IN')}
// // //                       </Text>
// // //                     </View>
// // //                     <View style={styles.itemDetailRow}>
// // //                       <Text style={[styles.itemDetailLabel, { color: theme.colors.textSecondary }]}>
// // //                         Tax ({item.taxPercentage}%): ₹{item.taxAmount.toLocaleString('en-IN')}
// // //                       </Text>
// // //                     </View>
// // //                   </View>
// // //                 </Animated.View>
// // //               ))}
// // //             </View>
// // //           </BlurView>
// // //         </Animated.View>

// // //         {/* Totals */}
// // //         <Animated.View entering={FadeInUp.delay(600)}>
// // //           <BlurView
// // //             intensity={themeType === 'dark' ? 15 : 80}
// // //             tint={themeType}
// // //             style={styles.totalSection}
// // //           >
// // //             <LinearGradient
// // //               colors={[
// // //                 `${theme.colors.primary}12`,
// // //                 `${theme.colors.primary}06`,
// // //                 'transparent',
// // //               ]}
// // //               start={{ x: 0, y: 0 }}
// // //               end={{ x: 1, y: 1 }}
// // //               style={styles.totalGradientOverlay}
// // //             />

// // //             <View style={styles.totalContent}>
// // //               <View style={styles.totalRow}>
// // //                 <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
// // //                   Subtotal
// // //                 </Text>
// // //                 <Text style={[styles.totalValue, { color: theme.colors.text }]}>
// // //                   ₹{invoice.totals.subtotal.toLocaleString('en-IN')}
// // //                 </Text>
// // //               </View>

// // //               <View style={styles.totalRow}>
// // //                 <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
// // //                   Discount
// // //                 </Text>
// // //                 <Text style={[styles.totalValue, { color: theme.colors.text }]}>
// // //                   -₹{invoice.totals.discountAmount.toLocaleString('en-IN')}
// // //                 </Text>
// // //               </View>

// // //               <View style={styles.totalRow}>
// // //                 <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
// // //                   Tax (GST)
// // //                 </Text>
// // //                 <Text style={[styles.totalValue, { color: theme.colors.text }]}>
// // //                   ₹{invoice.totals.taxAmount.toLocaleString('en-IN')}
// // //                 </Text>
// // //               </View>

// // //               <View
// // //                 style={[
// // //                   styles.totalRow,
// // //                   styles.grandTotalRow,
// // //                   {
// // //                     borderTopColor:
// // //                       themeType === 'dark'
// // //                         ? 'rgba(255, 255, 255, 0.08)'
// // //                         : 'rgba(0, 0, 0, 0.06)',
// // //                   },
// // //                 ]}
// // //               >
// // //                 <Text style={[styles.grandTotalLabel, { color: theme.colors.text }]}>
// // //                   Total Amount
// // //                 </Text>
// // //                 <View style={styles.grandTotalContainer}>
// // //                   <IndianRupee size={16} color={theme.colors.primary} />
// // //                   <Text style={[styles.grandTotalValue, { color: theme.colors.primary }]}>
// // //                     {invoice.totals.finalAmount.toLocaleString('en-IN')}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </BlurView>
// // //         </Animated.View>

// // //         {/* Notes */}
// // //         {invoice.notes && (
// // //           <Animated.View entering={FadeInUp.delay(700)}>
// // //             <BlurView
// // //               intensity={themeType === 'dark' ? 15 : 80}
// // //               tint={themeType}
// // //               style={styles.section}
// // //             >
// // //               <View style={styles.sectionHeader}>
// // //                 <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
// // //                   Notes
// // //                 </Text>
// // //               </View>
// // //               <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>
// // //                 {invoice.notes}
// // //               </Text>
// // //             </BlurView>
// // //           </Animated.View>
// // //         )}
// // //       </ScrollView>

// // //       {/* Action Buttons Footer */}
// // //       <BlurView
// // //         intensity={themeType === 'dark' ? 20 : 80}
// // //         tint={themeType}
// // //         style={styles.footer}
// // //       >
// // //         <View style={styles.footerContent}>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.actionButton,
// // //               styles.printButton,
// // //               {
// // //                 backgroundColor:
// // //                   themeType === 'dark'
// // //                     ? 'rgba(255, 255, 255, 0.08)'
// // //                     : 'rgba(0, 0, 0, 0.05)',
// // //                 borderColor:
// // //                   themeType === 'dark'
// // //                     ? 'rgba(255, 255, 255, 0.12)'
// // //                     : 'rgba(0, 0, 0, 0.08)',
// // //                 opacity: isProcessing ? 0.5 : 1,
// // //               },
// // //             ]}
// // //             disabled={isProcessing}
// // //             onPress={handlePrint}
// // //           >
// // //             {isProcessing && processingAction === 'print' ? (
// // //               <ActivityIndicator size="small" color={theme.colors.textSecondary} />
// // //             ) : (
// // //               <Printer size={18} color={theme.colors.textSecondary} />
// // //             )}
// // //             <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>
// // //               Print
// // //             </Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.actionButton,
// // //               styles.downloadButton,
// // //               {
// // //                 backgroundColor:
// // //                   themeType === 'dark'
// // //                     ? 'rgba(255, 255, 255, 0.08)'
// // //                     : 'rgba(0, 0, 0, 0.05)',
// // //                 borderColor:
// // //                   themeType === 'dark'
// // //                     ? 'rgba(255, 255, 255, 0.12)'
// // //                     : 'rgba(0, 0, 0, 0.08)',
// // //                 opacity: isProcessing ? 0.5 : 1,
// // //               },
// // //             ]}
// // //             disabled={isProcessing}
// // //             onPress={handleDownload}
// // //           >
// // //             {isProcessing && processingAction === 'download' ? (
// // //               <ActivityIndicator size="small" color={theme.colors.textSecondary} />
// // //             ) : (
// // //               <Download size={18} color={theme.colors.textSecondary} />
// // //             )}
// // //             <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>
// // //               Download
// // //             </Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.actionButton,
// // //               styles.shareButton,
// // //               {
// // //                 backgroundColor: theme.colors.primary,
// // //                 shadowColor: theme.colors.primary,
// // //                 opacity: isProcessing ? 0.5 : 1,
// // //               },
// // //             ]}
// // //             disabled={isProcessing}
// // //             onPress={handleShare}
// // //           >
// // //             <LinearGradient
// // //               colors={[
// // //                 theme.colors.primary,
// // //                 theme.colors.primaryLight || theme.colors.primary,
// // //               ]}
// // //               style={styles.shareGradient}
// // //             >
// // //               <View style={styles.shareButtonContent}>
// // //                 {isProcessing && processingAction === 'share' ? (
// // //                   <ActivityIndicator size="small" color="#FFFFFF" />
// // //                 ) : (
// // //                   <Share size={18} color="#FFFFFF" />
// // //                 )}
// // //                 <Text style={styles.shareButtonText}>Share</Text>
// // //               </View>
// // //             </LinearGradient>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </BlurView>
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //   },
// // //   headerGradient: {
// // //     paddingBottom: 20,
// // //   },
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     paddingHorizontal: 20,
// // //     paddingTop: Platform.OS === 'android' ? 12 : 8,
// // //     paddingVertical: 16,
// // //   },
// // //   backButton: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: 'rgba(255, 255, 255, 0.15)',
// // //     borderWidth: 1,
// // //     borderColor: 'rgba(255, 255, 255, 0.2)',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   headerTitleContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 8,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 18,
// // //     fontWeight: '700',
// // //     color: '#FFFFFF',
// // //     letterSpacing: -0.2,
// // //   },
// // //   placeholder: {
// // //     width: 40,
// // //   },
// // //   scrollView: {
// // //     flex: 1,
// // //     marginTop: -10,
// // //   },
// // //   scrollContent: {
// // //     paddingHorizontal: 20,
// // //     paddingTop: 20,
// // //     paddingBottom: 120,
// // //   },
// // //   successBanner: {
// // //     borderRadius: 16,
// // //     borderWidth: 1,
// // //     borderColor: 'rgba(6, 214, 160, 0.2)',
// // //     overflow: 'hidden',
// // //     marginBottom: 20,
// // //   },
// // //   successGradient: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     padding: 20,
// // //     gap: 16,
// // //   },
// // //   successContent: {
// // //     flex: 1,
// // //   },
// // //   successTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //     marginBottom: 4,
// // //     letterSpacing: -0.2,
// // //   },
// // //   successSubtitle: {
// // //     fontSize: 14,
// // //     lineHeight: 20,
// // //   },
// // //   section: {
// // //     borderRadius: 20,
// // //     padding: 20,
// // //     marginBottom: 20,
// // //     borderWidth: 1,
// // //     borderColor: 'rgba(255, 255, 255, 0.1)',
// // //     overflow: 'hidden',
// // //   },
// // //   sectionHeader: {
// // //     marginBottom: 16,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //     letterSpacing: -0.2,
// // //   },
// // //   invoiceHeaderInfo: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'flex-start',
// // //     marginBottom: 20,
// // //   },
// // //   invoiceNumberContainer: {
// // //     flex: 1,
// // //   },
// // //   invoiceLabel: {
// // //     fontSize: 12,
// // //     fontWeight: '600',
// // //     marginBottom: 4,
// // //     textTransform: 'uppercase',
// // //     letterSpacing: 0.5,
// // //   },
// // //   invoiceNumber: {
// // //     fontSize: 20,
// // //     fontWeight: '700',
// // //     letterSpacing: -0.3,
// // //   },
// // //   invoiceStatusContainer: {
// // //     alignItems: 'flex-end',
// // //   },
// // //   statusBadge: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 6,
// // //     borderRadius: 12,
// // //     gap: 6,
// // //   },
// // //   statusText: {
// // //     fontSize: 12,
// // //     fontWeight: '600',
// // //     textTransform: 'uppercase',
// // //     letterSpacing: 0.5,
// // //   },
// // //   invoiceDatesContainer: {
// // //     flexDirection: 'row',
// // //     gap: 24,
// // //   },
// // //   dateItem: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 8,
// // //   },
// // //   dateLabel: {
// // //     fontSize: 11,
// // //     fontWeight: '600',
// // //     textTransform: 'uppercase',
// // //     letterSpacing: 0.5,
// // //   },
// // //   dateValue: {
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //   },
// // //   contactsContainer: {
// // //     flexDirection: 'row',
// // //     gap: 20,
// // //   },
// // //   contactSection: {
// // //     flex: 1,
// // //   },
// // //   contactHeader: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 8,
// // //     marginBottom: 12,
// // //   },
// // //   contactTitle: {
// // //     fontSize: 12,
// // //     fontWeight: '600',
// // //     textTransform: 'uppercase',
// // //     letterSpacing: 0.5,
// // //   },
// // //   contactName: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //     marginBottom: 8,
// // //     letterSpacing: -0.2,
// // //   },
// // //   contactDetail: {
// // //     fontSize: 14,
// // //     lineHeight: 20,
// // //     marginBottom: 4,
// // //   },
// // //   contactMetaContainer: {
// // //     marginTop: 8,
// // //     gap: 4,
// // //   },
// // //   contactMeta: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 6,
// // //   },
// // //   contactMetaText: {
// // //     fontSize: 12,
// // //     fontWeight: '500',
// // //   },
// // //   itemsList: {
// // //     gap: 12,
// // //   },
// // //   itemCard: {
// // //     borderRadius: 12,
// // //     borderWidth: 1,
// // //     padding: 16,
// // //   },
// // //   itemHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'flex-start',
// // //     marginBottom: 8,
// // //   },
// // //   itemName: {
// // //     fontSize: 15,
// // //     fontWeight: '600',
// // //     flex: 1,
// // //     marginRight: 12,
// // //     letterSpacing: -0.1,
// // //   },
// // //   itemAmount: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //     letterSpacing: -0.2,
// // //   },
// // //   itemDescription: {
// // //     fontSize: 13,
// // //     lineHeight: 18,
// // //     marginBottom: 12,
// // //   },
// // //   itemDetails: {
// // //     gap: 6,
// // //   },
// // //   itemDetailRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //   },
// // //   itemDetailLabel: {
// // //     fontSize: 12,
// // //     fontWeight: '500',
// // //   },
// // //   totalSection: {
// // //     borderRadius: 20,
// // //     borderWidth: 1,
// // //     borderColor: 'rgba(255, 255, 255, 0.1)',
// // //     overflow: 'hidden',
// // //     position: 'relative',
// // //   },
// // //   totalGradientOverlay: {
// // //     position: 'absolute',
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //   },
// // //   totalContent: {
// // //     padding: 20,
// // //     position: 'relative',
// // //     zIndex: 2,
// // //   },
// // //   totalRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: 12,
// // //   },
// // //   totalLabel: {
// // //     fontSize: 14,
// // //     fontWeight: '500',
// // //   },
// // //   totalValue: {
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //   },
// // //   grandTotalRow: {
// // //     borderTopWidth: 1,
// // //     paddingTop: 16,
// // //     marginTop: 8,
// // //     marginBottom: 0,
// // //   },
// // //   grandTotalLabel: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //   },
// // //   grandTotalContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 4,
// // //   },
// // //   grandTotalValue: {
// // //     fontSize: 18,
// // //     fontWeight: '700',
// // //     letterSpacing: -0.3,
// // //   },
// // //   notesText: {
// // //     fontSize: 14,
// // //     lineHeight: 22,
// // //   },
// // //   footer: {
// // //     borderTopLeftRadius: 24,
// // //     borderTopRightRadius: 24,
// // //     borderWidth: 1,
// // //     borderColor: 'rgba(255, 255, 255, 0.1)',
// // //     overflow: 'hidden',
// // //     paddingBottom: Platform.OS === 'ios' ? 34 : 20,
// // //   },
// // //   footerContent: {
// // //     flexDirection: 'row',
// // //     paddingHorizontal: 24,
// // //     paddingTop: 24,
// // //     gap: 12,
// // //   },
// // //   actionButton: {
// // //     flex: 1,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 14,
// // //     gap: 8,
// // //   },
// // //   printButton: {
// // //     borderWidth: 1,
// // //   },
// // //   downloadButton: {
// // //     borderWidth: 1,
// // //   },
// // //   shareButton: {
// // //     overflow: 'hidden',
// // //     ...Platform.select({
// // //       ios: {
// // //         shadowOffset: { width: 0, height: 4 },
// // //         shadowOpacity: 0.25,
// // //         shadowRadius: 8,
// // //       },
// // //       android: {
// // //         elevation: 4,
// // //       },
// // //       web: {
// // //         boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
// // //       },
// // //     }),
// // //   },
// // //   shareGradient: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   shareButtonContent: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 16,
// // //     gap: 8,
// // //   },
// // //   actionButtonText: {
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //     letterSpacing: -0.1,
// // //   },
// // //   shareButtonText: {
// // //     fontSize: 14,
// // //     fontWeight: '700',
// // //     color: '#FFFFFF',
// // //     letterSpacing: -0.1,
// // //   },
// // // });


// // import { useTheme } from '@/context/ThemeContext';
// // import { BlurView } from 'expo-blur';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { StatusBar } from 'expo-status-bar';
// // import * as Print from 'expo-print';
// // import * as Sharing from 'expo-sharing';
// // import * as FileSystem from 'expo-file-system';
// // import {
// //   ArrowLeft,
// //   Building2,
// //   Calendar,
// //   Download,
// //   FileText,
// //   IndianRupee,
// //   Mail,
// //   MapPin,
// //   Phone,
// //   Printer,
// //   Share,
// //   User,
// //   CheckCircle,
// //   Sparkles,
// // } from 'lucide-react-native';
// // import React, { useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   Dimensions,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import Animated, {
// //   FadeIn,
// //   FadeInDown,
// //   FadeInUp,
// // } from 'react-native-reanimated';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useRouter, useLocalSearchParams } from 'expo-router';

// // const { width: screenWidth } = Dimensions.get('window');
// // const A4_RATIO = 1.414; // A4 aspect ratio (height/width)
// // const INVOICE_WIDTH = screenWidth - 40; // 20px margin on each side
// // const INVOICE_HEIGHT = INVOICE_WIDTH * A4_RATIO;

// // // Mock data - replace with actual invoice data from API
// // const mockInvoiceData = {
// //   id: 'INV-001',
// //   invoiceNumber: 'INV-2024-001',
// //   invoiceDate: '2024-06-15',
// //   dueDate: '2024-06-22',
// //   status: 'PAID',
// //   customer: {
// //     name: 'Acme Corporation',
// //     email: 'contact@acme.com',
// //     phone: '+91 98765 43210',
// //     address: {
// //       street: '123 Business Street',
// //       city: 'Mumbai',
// //       state: 'Maharashtra',
// //       pincode: '400001',
// //       country: 'India',
// //     },
// //   },
// //   company: {
// //     name: 'Your Business Name',
// //     email: 'hello@yourbusiness.com',
// //     phone: '+91 12345 67890',
// //     address: {
// //       street: '456 Company Lane',
// //       city: 'Mumbai',
// //       state: 'Maharashtra',
// //       pincode: '400002',
// //       country: 'India',
// //     },
// //     gstin: '27ABCDE1234F1Z5',
// //     website: 'www.yourbusiness.com',
// //   },
// //   items: [
// //     {
// //       id: '1',
// //       name: 'Premium Widget',
// //       description: 'High-quality premium widget with advanced features',
// //       quantity: 2,
// //       unitPrice: 1500.0,
// //       taxPercentage: 18,
// //       taxAmount: 540.0,
// //       totalAmount: 3540.0,
// //     },
// //     {
// //       id: '2',
// //       name: 'Standard Service Package',
// //       description: 'Monthly maintenance and support service',
// //       quantity: 1,
// //       unitPrice: 2000.0,
// //       taxPercentage: 18,
// //       taxAmount: 360.0,
// //       totalAmount: 2360.0,
// //     },
// //     {
// //       id: '3',
// //       name: 'Consultation Hours',
// //       description: 'Professional consultation and setup',
// //       quantity: 3,
// //       unitPrice: 500.0,
// //       taxPercentage: 18,
// //       taxAmount: 270.0,
// //       totalAmount: 1770.0,
// //     },
// //   ],
// //   totals: {
// //     subtotal: 6500.0,
// //     discountAmount: 325.0,
// //     taxAmount: 1111.5,
// //     totalAmount: 7286.5,
// //     roundOffAmount: -1.5,
// //     finalAmount: 7285.0,
// //   },
// //   paymentMethod: 'UPI',
// //   notes: 'Thank you for your business. Payment terms: Net 7 days. Please retain this invoice for your records.',
// // };

// // export default function InvoicePreviewScreen() {
// //   const { theme, themeType }: any = useTheme();
// //   const router = useRouter();
// //   const params = useLocalSearchParams();
  
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [processingAction, setProcessingAction] = useState<'print' | 'download' | 'share' | null>(null);

// //   // In real implementation, fetch invoice data using the ID from params
// //   const invoice = mockInvoiceData;

// //   const generateInvoiceHTML = () => {
// //     const itemsHTML = invoice.items
// //       .map(
// //         (item) => `
// //         <tr>
// //           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top;">
// //             <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px; font-size: 14px;">
// //               ${item.name}
// //             </div>
// //             ${item.description ? `<div style="font-size: 12px; color: #6b7280; line-height: 1.4;">${item.description}</div>` : ''}
// //           </td>
// //           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
// //             ${item.quantity}
// //           </td>
// //           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px;">
// //             ₹${item.unitPrice.toLocaleString('en-IN')}
// //           </td>
// //           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
// //             ${item.taxPercentage}%
// //           </td>
// //           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; font-size: 14px;">
// //             ₹${item.totalAmount.toLocaleString('en-IN')}
// //           </td>
// //         </tr>
// //       `
// //       )
// //       .join('');

// //     return `
// //       <!DOCTYPE html>
// //       <html>
// //         <head>
// //           <meta charset="utf-8">
// //           <title>Invoice ${invoice.invoiceNumber}</title>
// //           <style>
// //             * { margin: 0; padding: 0; box-sizing: border-box; }
// //             body { 
// //               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
// //               color: #1f2937; 
// //               line-height: 1.5; 
// //               background: white;
// //             }
// //             .invoice-container { 
// //               max-width: 800px; 
// //               margin: 0 auto; 
// //               padding: 40px; 
// //               background: white;
// //               min-height: 100vh;
// //             }
// //             .invoice-header { 
// //               display: flex; 
// //               justify-content: space-between; 
// //               align-items: flex-start; 
// //               margin-bottom: 40px; 
// //               border-bottom: 3px solid #6366f1;
// //               padding-bottom: 20px;
// //             }
// //             .invoice-title { 
// //               font-size: 36px; 
// //               font-weight: 700; 
// //               color: #6366f1; 
// //               margin-bottom: 8px; 
// //               letter-spacing: -1px;
// //             }
// //             .invoice-number { 
// //               font-size: 16px; 
// //               color: #6b7280; 
// //               font-weight: 500;
// //             }
// //             .company-logo-section {
// //               text-align: right;
// //               flex-shrink: 0;
// //             }
// //             .company-name { 
// //               font-size: 24px; 
// //               font-weight: 700; 
// //               color: #1f2937; 
// //               margin-bottom: 4px;
// //             }
// //             .company-tagline {
// //               font-size: 14px;
// //               color: #6366f1;
// //               font-weight: 500;
// //             }
// //             .invoice-meta { 
// //               display: flex; 
// //               justify-content: space-between; 
// //               margin-bottom: 40px; 
// //               gap: 40px;
// //             }
// //             .company-info, .customer-info { 
// //               flex: 1; 
// //             }
// //             .info-section {
// //               background: #f8fafc;
// //               padding: 20px;
// //               border-radius: 8px;
// //               border-left: 4px solid #6366f1;
// //             }
// //             .info-title { 
// //               font-size: 12px; 
// //               font-weight: 700; 
// //               color: #6366f1; 
// //               margin-bottom: 12px; 
// //               text-transform: uppercase; 
// //               letter-spacing: 1px; 
// //             }
// //             .contact-name { 
// //               font-size: 18px; 
// //               font-weight: 700; 
// //               margin-bottom: 8px; 
// //               color: #1f2937;
// //             }
// //             .contact-detail { 
// //               font-size: 14px; 
// //               color: #6b7280; 
// //               margin-bottom: 3px; 
// //               line-height: 1.4;
// //             }
// //             .invoice-details { 
// //               background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
// //               padding: 24px; 
// //               border-radius: 12px; 
// //               margin-bottom: 32px; 
// //               border: 1px solid #e5e7eb;
// //             }
// //             .details-grid { 
// //               display: grid; 
// //               grid-template-columns: repeat(4, 1fr); 
// //               gap: 20px; 
// //             }
// //             .detail-item { 
// //               text-align: center;
// //             }
// //             .detail-label { 
// //               font-size: 11px; 
// //               font-weight: 600; 
// //               color: #6b7280; 
// //               margin-bottom: 6px; 
// //               text-transform: uppercase; 
// //               letter-spacing: 0.5px;
// //             }
// //             .detail-value { 
// //               font-size: 16px; 
// //               font-weight: 600; 
// //               color: #1f2937; 
// //             }
// //             .items-section {
// //               margin-bottom: 32px;
// //             }
// //             .section-title {
// //               font-size: 18px;
// //               font-weight: 700;
// //               color: #1f2937;
// //               margin-bottom: 16px;
// //               padding-bottom: 8px;
// //               border-bottom: 2px solid #f3f4f6;
// //             }
// //             .items-table { 
// //               width: 100%; 
// //               border-collapse: collapse; 
// //               background: white; 
// //               border-radius: 8px; 
// //               overflow: hidden; 
// //               box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
// //               border: 1px solid #e5e7eb;
// //             }
// //             .items-table th { 
// //               background: #6366f1; 
// //               color: white; 
// //               padding: 12px 8px; 
// //               font-weight: 600; 
// //               text-align: left; 
// //               font-size: 13px;
// //               text-transform: uppercase;
// //               letter-spacing: 0.5px;
// //             }
// //             .items-table th:nth-child(2), 
// //             .items-table th:nth-child(4) { 
// //               text-align: center; 
// //             }
// //             .items-table th:nth-child(3), 
// //             .items-table th:nth-child(5) { 
// //               text-align: right; 
// //             }
// //             .totals-section { 
// //               display: flex; 
// //               justify-content: flex-end; 
// //               margin-bottom: 32px; 
// //             }
// //             .totals-container {
// //               min-width: 350px;
// //               background: white;
// //               border-radius: 8px;
// //               border: 1px solid #e5e7eb;
// //               overflow: hidden;
// //             }
// //             .totals-row { 
// //               display: flex; 
// //               justify-content: space-between; 
// //               padding: 12px 20px; 
// //               border-bottom: 1px solid #f3f4f6; 
// //             }
// //             .totals-row:last-child {
// //               border-bottom: none;
// //             }
// //             .totals-row.subtotal { 
// //               background: #f8fafc; 
// //             }
// //             .totals-row.total { 
// //               background: #6366f1; 
// //               color: white; 
// //               font-weight: 700; 
// //               font-size: 18px; 
// //             }
// //             .totals-label {
// //               font-weight: 500;
// //             }
// //             .totals-value {
// //               font-weight: 600;
// //             }
// //             .notes-section { 
// //               background: #f8fafc; 
// //               padding: 20px; 
// //               border-radius: 8px; 
// //               border-left: 4px solid #10b981; 
// //               margin-bottom: 32px;
// //             }
// //             .notes-title { 
// //               font-size: 14px; 
// //               font-weight: 600; 
// //               margin-bottom: 8px; 
// //               color: #10b981;
// //             }
// //             .notes-text { 
// //               font-size: 14px; 
// //               color: #6b7280; 
// //               line-height: 1.6;
// //             }
// //             .footer-section {
// //               text-align: center;
// //               padding-top: 20px;
// //               border-top: 1px solid #e5e7eb;
// //               color: #6b7280;
// //               font-size: 12px;
// //             }
// //             @media print {
// //               body { print-color-adjust: exact; }
// //               .invoice-container { padding: 20px; }
// //             }
// //           </style>
// //         </head>
// //         <body>
// //           <div class="invoice-container">
// //             <div class="invoice-header">
// //               <div>
// //                 <div class="invoice-title">INVOICE</div>
// //                 <div class="invoice-number">${invoice.invoiceNumber}</div>
// //               </div>
// //               <div class="company-logo-section">
// //                 <div class="company-name">${invoice.company.name}</div>
// //                 <div class="company-tagline">Professional Services</div>
// //               </div>
// //             </div>
            
// //             <div class="invoice-meta">
// //               <div class="company-info">
// //                 <div class="info-section">
// //                   <div class="info-title">From</div>
// //                   <div class="contact-name">${invoice.company.name}</div>
// //                   <div class="contact-detail">${invoice.company.address.street}</div>
// //                   <div class="contact-detail">${invoice.company.address.city}, ${invoice.company.address.state} ${invoice.company.address.pincode}</div>
// //                   <div class="contact-detail">${invoice.company.address.country}</div>
// //                   <div class="contact-detail">GSTIN: ${invoice.company.gstin}</div>
// //                   <div class="contact-detail">${invoice.company.email}</div>
// //                   <div class="contact-detail">${invoice.company.phone}</div>
// //                   <div class="contact-detail">${invoice.company.website}</div>
// //                 </div>
// //               </div>
              
// //               <div class="customer-info">
// //                 <div class="info-section">
// //                   <div class="info-title">Bill To</div>
// //                   <div class="contact-name">${invoice.customer.name}</div>
// //                   <div class="contact-detail">${invoice.customer.address.street}</div>
// //                   <div class="contact-detail">${invoice.customer.address.city}, ${invoice.customer.address.state} ${invoice.customer.address.pincode}</div>
// //                   <div class="contact-detail">${invoice.customer.address.country}</div>
// //                   <div class="contact-detail">${invoice.customer.email}</div>
// //                   <div class="contact-detail">${invoice.customer.phone}</div>
// //                 </div>
// //               </div>
// //             </div>
            
// //             <div class="invoice-details">
// //               <div class="details-grid">
// //                 <div class="detail-item">
// //                   <div class="detail-label">Invoice Date</div>
// //                   <div class="detail-value">${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</div>
// //                 </div>
// //                 <div class="detail-item">
// //                   <div class="detail-label">Due Date</div>
// //                   <div class="detail-value">${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
// //                 </div>
// //                 <div class="detail-item">
// //                   <div class="detail-label">Payment Method</div>
// //                   <div class="detail-value">${invoice.paymentMethod}</div>
// //                 </div>
// //                 <div class="detail-item">
// //                   <div class="detail-label">Status</div>
// //                   <div class="detail-value">${invoice.status}</div>
// //                 </div>
// //               </div>
// //             </div>
            
// //             <div class="items-section">
// //               <div class="section-title">Items & Services</div>
// //               <table class="items-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Description</th>
// //                     <th>Qty</th>
// //                     <th>Unit Price</th>
// //                     <th>Tax</th>
// //                     <th>Amount</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   ${itemsHTML}
// //                 </tbody>
// //               </table>
// //             </div>
            
// //             <div class="totals-section">
// //               <div class="totals-container">
// //                 <div class="totals-row subtotal">
// //                   <span class="totals-label">Subtotal:</span>
// //                   <span class="totals-value">₹${invoice.totals.subtotal.toLocaleString('en-IN')}</span>
// //                 </div>
// //                 <div class="totals-row">
// //                   <span class="totals-label">Discount:</span>
// //                   <span class="totals-value">-₹${invoice.totals.discountAmount.toLocaleString('en-IN')}</span>
// //                 </div>
// //                 <div class="totals-row">
// //                   <span class="totals-label">Tax (GST):</span>
// //                   <span class="totals-value">₹${invoice.totals.taxAmount.toLocaleString('en-IN')}</span>
// //                 </div>
// //                 <div class="totals-row">
// //                   <span class="totals-label">Round Off:</span>
// //                   <span class="totals-value">₹${invoice.totals.roundOffAmount.toLocaleString('en-IN')}</span>
// //                 </div>
// //                 <div class="totals-row total">
// //                   <span class="totals-label">Total Amount:</span>
// //                   <span class="totals-value">₹${invoice.totals.finalAmount.toLocaleString('en-IN')}</span>
// //                 </div>
// //               </div>
// //             </div>
            
// //             ${invoice.notes ? `
// //               <div class="notes-section">
// //                 <div class="notes-title">Notes & Terms:</div>
// //                 <div class="notes-text">${invoice.notes}</div>
// //               </div>
// //             ` : ''}
            
// //             <div class="footer-section">
// //               <p>This is a computer generated invoice and does not require a signature.</p>
// //               <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
// //             </div>
// //           </div>
// //         </body>
// //       </html>
// //     `;
// //   };

// //   const handlePrint = async () => {
// //     try {
// //       setIsProcessing(true);
// //       setProcessingAction('print');

// //       const htmlContent = generateInvoiceHTML();
      
// //       await Print.printAsync({
// //         html: htmlContent,
// //         printerUrl: undefined,
// //       });
// //     } catch (error) {
// //       console.error('Print error:', error);
// //       Alert.alert('Error', 'Failed to print invoice. Please try again.');
// //     } finally {
// //       setIsProcessing(false);
// //       setProcessingAction(null);
// //     }
// //   };

// //   const handleDownload = async () => {
// //     try {
// //       setIsProcessing(true);
// //       setProcessingAction('download');

// //       const htmlContent = generateInvoiceHTML();
      
// //       const { uri } = await Print.printToFileAsync({
// //         html: htmlContent,
// //         base64: false,
// //       });

// //       const fileName = `Invoice_${invoice.invoiceNumber}_${Date.now()}.pdf`;
// //       const newUri = `${FileSystem.documentDirectory}${fileName}`;
// //       await FileSystem.moveAsync({
// //         from: uri,
// //         to: newUri,
// //       });

// //       Alert.alert(
// //         'Success',
// //         `Invoice downloaded successfully!\nSaved as: ${fileName}`,
// //         [{ text: 'OK', style: 'default' }]
// //       );
// //     } catch (error) {
// //       console.error('Download error:', error);
// //       Alert.alert('Error', 'Failed to download invoice. Please try again.');
// //     } finally {
// //       setIsProcessing(false);
// //       setProcessingAction(null);
// //     }
// //   };

// //   const handleShare = async () => {
// //     try {
// //       setIsProcessing(true);
// //       setProcessingAction('share');

// //       const htmlContent = generateInvoiceHTML();
      
// //       const { uri } = await Print.printToFileAsync({
// //         html: htmlContent,
// //         base64: false,
// //       });

// //       if (await Sharing.isAvailableAsync()) {
// //         await Sharing.shareAsync(uri, {
// //           mimeType: 'application/pdf',
// //           dialogTitle: `Share Invoice ${invoice.invoiceNumber}`,
// //           UTI: 'com.adobe.pdf',
// //         });
// //       } else {
// //         Alert.alert('Error', 'Sharing is not available on this device.');
// //       }
// //     } catch (error) {
// //       console.error('Share error:', error);
// //       Alert.alert('Error', 'Failed to share invoice. Please try again.');
// //     } finally {
// //       setIsProcessing(false);
// //       setProcessingAction(null);
// //     }
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case 'PAID':
// //         return '#06D6A0';
// //       case 'PENDING':
// //         return '#F59E0B';
// //       case 'OVERDUE':
// //         return '#EF4444';
// //       case 'DRAFT':
// //         return '#6B7280';
// //       default:
// //         return theme.colors.textSecondary;
// //     }
// //   };

// //   return (
// //     <View
// //       style={[styles.container, { backgroundColor: theme.colors.background }]}
// //     >
// //       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

// //       {/* Header with Gradient */}
// //       <LinearGradient
// //         colors={
// //           themeType === 'dark'
// //             ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
// //             : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
// //         }
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 0, y: 1 }}
// //         style={styles.headerGradient}
// //       >
// //         <SafeAreaView>
// //           <View style={styles.header}>
// //             <TouchableOpacity
// //               style={styles.backButton}
// //               onPress={() => router.back()}
// //             >
// //               <ArrowLeft size={20} color="rgba(255, 255, 255, 0.9)" />
// //             </TouchableOpacity>

// //             <View style={styles.headerTitleContainer}>
// //               <FileText size={20} color="#FFFFFF" />
// //               <Text style={styles.headerTitle}>Invoice Preview</Text>
// //             </View>

// //             <View style={styles.placeholder} />
// //           </View>
// //         </SafeAreaView>
// //       </LinearGradient>

// //       <ScrollView
// //         style={styles.scrollView}
// //         contentContainerStyle={styles.scrollContent}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* Success Banner */}
// //         <Animated.View entering={FadeInDown.delay(100)}>
// //           <BlurView
// //             intensity={themeType === 'dark' ? 15 : 80}
// //             tint={themeType}
// //             style={styles.successBanner}
// //           >
// //             <LinearGradient
// //               colors={['rgba(6, 214, 160, 0.15)', 'rgba(6, 214, 160, 0.05)']}
// //               style={styles.successGradient}
// //             >
// //               <View style={styles.successIconContainer}>
// //                 <CheckCircle size={20} color="#06D6A0" />
// //               </View>
// //               <View style={styles.successContent}>
// //                 <Text style={[styles.successTitle, { color: theme.colors.text }]}>
// //                   Invoice Created Successfully!
// //                 </Text>
// //                 <Text style={[styles.successSubtitle, { color: theme.colors.textSecondary }]}>
// //                   {invoice.invoiceNumber} • {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
// //                 </Text>
// //               </View>
// //               <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(invoice.status)}20` }]}>
// //                 <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
// //                   {invoice.status}
// //                 </Text>
// //               </View>
// //             </LinearGradient>
// //           </BlurView>
// //         </Animated.View>

// //         {/* A4 Invoice Preview */}
// //         <Animated.View entering={FadeInUp.delay(200)}>
// //           <View style={styles.invoiceContainer}>
// //             <View style={[styles.a4Container, { backgroundColor: '#FFFFFF' }]}>
// //               {/* Invoice Header */}
// //               <View style={styles.invoiceHeader}>
// //                 <View>
// //                   <Text style={styles.invoiceTitle}>INVOICE</Text>
// //                   <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
// //                 </View>
// //                 <View style={styles.companyLogoSection}>
// //                   <Text style={styles.companyName}>{invoice.company.name}</Text>
// //                   <Text style={styles.companyTagline}>Professional Services</Text>
// //                 </View>
// //               </View>

// //               {/* Company and Customer Info */}
// //               <View style={styles.contactsSection}>
// //                 <View style={styles.contactCard}>
// //                   <Text style={styles.contactTitle}>FROM</Text>
// //                   <Text style={styles.contactName}>{invoice.company.name}</Text>
// //                   <Text style={styles.contactDetail}>{invoice.company.address.street}</Text>
// //                   <Text style={styles.contactDetail}>
// //                     {invoice.company.address.city}, {invoice.company.address.state} {invoice.company.address.pincode}
// //                   </Text>
// //                   <Text style={styles.contactDetail}>GSTIN: {invoice.company.gstin}</Text>
// //                   <View style={styles.contactMetaRow}>
// //                     <Mail size={10} color="#6B7280" />
// //                     <Text style={styles.contactMeta}>{invoice.company.email}</Text>
// //                   </View>
// //                   <View style={styles.contactMetaRow}>
// //                     <Phone size={10} color="#6B7280" />
// //                     <Text style={styles.contactMeta}>{invoice.company.phone}</Text>
// //                   </View>
// //                 </View>

// //                 <View style={styles.contactCard}>
// //                   <Text style={styles.contactTitle}>BILL TO</Text>
// //                   <Text style={styles.contactName}>{invoice.customer.name}</Text>
// //                   <Text style={styles.contactDetail}>{invoice.customer.address.street}</Text>
// //                   <Text style={styles.contactDetail}>
// //                     {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.pincode}
// //                   </Text>
// //                   <View style={styles.contactMetaRow}>
// //                     <Mail size={10} color="#6B7280" />
// //                     <Text style={styles.contactMeta}>{invoice.customer.email}</Text>
// //                   </View>
// //                   <View style={styles.contactMetaRow}>
// //                     <Phone size={10} color="#6B7280" />
// //                     <Text style={styles.contactMeta}>{invoice.customer.phone}</Text>
// //                   </View>
// //                 </View>
// //               </View>

// //               {/* Invoice Details */}
// //               <View style={styles.invoiceDetailsSection}>
// //                 <View style={styles.detailItem}>
// //                   <Text style={styles.detailLabel}>INVOICE DATE</Text>
// //                   <Text style={styles.detailValue}>{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</Text>
// //                 </View>
// //                 <View style={styles.detailItem}>
// //                   <Text style={styles.detailLabel}>DUE DATE</Text>
// //                   <Text style={styles.detailValue}>{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</Text>
// //                 </View>
// //                 <View style={styles.detailItem}>
// //                   <Text style={styles.detailLabel}>PAYMENT METHOD</Text>
// //                   <Text style={styles.detailValue}>{invoice.paymentMethod}</Text>
// //                 </View>
// //               </View>

// //               {/* Items Table */}
// //               <View style={styles.itemsSection}>
// //                 <Text style={styles.sectionTitle}>Items & Services</Text>
                
// //                 {/* Table Header */}
// //                 <View style={styles.tableHeader}>
// //                   <Text style={[styles.tableHeaderText, { flex: 3 }]}>DESCRIPTION</Text>
// //                   <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>QTY</Text>
// //                   <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>RATE</Text>
// //                   <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>TAX</Text>
// //                   <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>AMOUNT</Text>
// //                 </View>

// //                 {/* Table Rows */}
// //                 {invoice.items.map((item, index) => (
// //                   <View key={item.id} style={styles.tableRow}>
// //                     <View style={{ flex: 3 }}>
// //                       <Text style={styles.itemName}>{item.name}</Text>
// //                       {item.description && (
// //                         <Text style={styles.itemDescription}>{item.description}</Text>
// //                       )}
// //                     </View>
// //                     <Text style={[styles.tableRowText, { flex: 1, textAlign: 'center' }]}>
// //                       {item.quantity}
// //                     </Text>
// //                     <Text style={[styles.tableRowText, { flex: 1.5, textAlign: 'right' }]}>
// //                       ₹{item.unitPrice.toLocaleString('en-IN')}
// //                     </Text>
// //                     <Text style={[styles.tableRowText, { flex: 1, textAlign: 'center' }]}>
// //                       {item.taxPercentage}%
// //                     </Text>
// //                     <Text style={[styles.tableRowText, { flex: 1.5, textAlign: 'right', fontWeight: '600' }]}>
// //                       ₹{item.totalAmount.toLocaleString('en-IN')}
// //                     </Text>
// //                   </View>
// //                 ))}
// //               </View>

// //               {/* Totals Section */}
// //               <View style={styles.totalsSection}>
// //                 <View style={styles.totalsContainer}>
// //                   <View style={[styles.totalRow, styles.subtotalRow]}>
// //                     <Text style={styles.totalLabel}>Subtotal</Text>
// //                     <Text style={styles.totalValue}>₹{invoice.totals.subtotal.toLocaleString('en-IN')}</Text>
// //                   </View>
// //                   <View style={styles.totalRow}>
// //                     <Text style={styles.totalLabel}>Discount</Text>
// //                     <Text style={styles.totalValue}>-₹{invoice.totals.discountAmount.toLocaleString('en-IN')}</Text>
// //                   </View>
// //                   <View style={styles.totalRow}>
// //                     <Text style={styles.totalLabel}>Tax (GST)</Text>
// //                     <Text style={styles.totalValue}>₹{invoice.totals.taxAmount.toLocaleString('en-IN')}</Text>
// //                   </View>
// //                   <View style={styles.totalRow}>
// //                     <Text style={styles.totalLabel}>Round Off</Text>
// //                     <Text style={styles.totalValue}>₹{invoice.totals.roundOffAmount.toLocaleString('en-IN')}</Text>
// //                   </View>
// //                   <View style={[styles.totalRow, styles.grandTotalRow]}>
// //                     <Text style={styles.grandTotalLabel}>Total Amount</Text>
// //                     <Text style={styles.grandTotalValue}>₹{invoice.totals.finalAmount.toLocaleString('en-IN')}</Text>
// //                   </View>
// //                 </View>
// //               </View>

// //               {/* Notes */}
// //               {invoice.notes && (
// //                 <View style={styles.notesSection}>
// //                   <Text style={styles.notesTitle}>Notes & Terms:</Text>
// //                   <Text style={styles.notesText}>{invoice.notes}</Text>
// //                 </View>
// //               )}

// //               {/* Footer */}
// //               <View style={styles.invoiceFooter}>
// //                 <Text style={styles.footerText}>This is a computer generated invoice and does not require a signature.</Text>
// //                 <Text style={styles.footerText}>Generated on {new Date().toLocaleString('en-IN')}</Text>
// //               </View>
// //             </View>
// //           </View>
// //         </Animated.View>
// //       </ScrollView>

// //       {/* Beautiful Action Buttons */}
// //       <Animated.View entering={FadeInUp.delay(400)}>
// //         <BlurView
// //           intensity={themeType === 'dark' ? 25 : 90}
// //           tint={themeType}
// //           style={styles.actionButtonsContainer}
// //         >
// //           <LinearGradient
// //             colors={
// //               themeType === 'dark'
// //                 ? ['rgba(26, 27, 58, 0.95)', 'rgba(45, 27, 105, 0.8)']
// //                 : ['rgba(248, 250, 252, 0.95)', 'rgba(241, 245, 249, 0.8)']
// //             }
// //             style={styles.actionButtonsGradient}
// //           >
// //             <View style={styles.actionButtonsContent}>
// //               {/* Print Button */}
// //               <TouchableOpacity
// //                 style={[
// //                   styles.actionButton,
// //                   {
// //                     backgroundColor: themeType === 'dark' 
// //                       ? 'rgba(255, 255, 255, 0.08)' 
// //                       : 'rgba(255, 255, 255, 0.9)',
// //                     borderColor: themeType === 'dark'
// //                       ? 'rgba(255, 255, 255, 0.12)'
// //                       : 'rgba(0, 0, 0, 0.06)',
// //                     opacity: isProcessing ? 0.6 : 1,
// //                   },
// //                 ]}
// //                 disabled={isProcessing}
// //                 onPress={handlePrint}
// //               >
// //                 <LinearGradient
// //                   colors={
// //                     themeType === 'dark'
// //                       ? ['rgba(139, 92, 246, 0.1)', 'rgba(99, 102, 241, 0.05)']
// //                       : ['rgba(139, 92, 246, 0.08)', 'rgba(99, 102, 241, 0.03)']
// //                   }
// //                   style={styles.actionButtonGradient}
// //                 >
// //                   <View style={styles.actionButtonIconContainer}>
// //                     {isProcessing && processingAction === 'print' ? (
// //                       <ActivityIndicator size="small" color={theme.colors.primary} />
// //                     ) : (
// //                       <Printer size={20} color={theme.colors.primary} strokeWidth={2} />
// //                     )}
// //                   </View>
// //                   <View style={styles.actionButtonTextContainer}>
// //                     <Text style={[styles.actionButtonTitle, { color: theme.colors.text }]}>
// //                       Print
// //                     </Text>
// //                     <Text style={[styles.actionButtonSubtitle, { color: theme.colors.textSecondary }]}>
// //                       Physical copy
// //                     </Text>
// //                   </View>
// //                 </LinearGradient>
// //               </TouchableOpacity>

// //               {/* Download Button */}
// //               <TouchableOpacity
// //                 style={[
// //                   styles.actionButton,
// //                   {
// //                     backgroundColor: themeType === 'dark' 
// //                       ? 'rgba(255, 255, 255, 0.08)' 
// //                       : 'rgba(255, 255, 255, 0.9)',
// //                     borderColor: themeType === 'dark'
// //                       ? 'rgba(255, 255, 255, 0.12)'
// //                       : 'rgba(0, 0, 0, 0.06)',
// //                     opacity: isProcessing ? 0.6 : 1,
// //                   },
// //                 ]}
// //                 disabled={isProcessing}
// //                 onPress={handleDownload}
// //               >
// //                 <LinearGradient
// //                   colors={
// //                     themeType === 'dark'
// //                       ? ['rgba(16, 185, 129, 0.1)', 'rgba(6, 214, 160, 0.05)']
// //                       : ['rgba(16, 185, 129, 0.08)', 'rgba(6, 214, 160, 0.03)']
// //                   }
// //                   style={styles.actionButtonGradient}
// //                 >
// //                   <View style={styles.actionButtonIconContainer}>
// //                     {isProcessing && processingAction === 'download' ? (
// //                       <ActivityIndicator size="small" color="#10B981" />
// //                     ) : (
// //                       <Download size={20} color="#10B981" strokeWidth={2} />
// //                     )}
// //                   </View>
// //                   <View style={styles.actionButtonTextContainer}>
// //                     <Text style={[styles.actionButtonTitle, { color: theme.colors.text }]}>
// //                       Download
// //                     </Text>
// //                     <Text style={[styles.actionButtonSubtitle, { color: theme.colors.textSecondary }]}>
// //                       Save as PDF
// //                     </Text>
// //                   </View>
// //                 </LinearGradient>
// //               </TouchableOpacity>

// //               {/* Share Button - Premium */}
// //               <TouchableOpacity
// //                 style={[
// //                   styles.actionButton,
// //                   styles.shareButtonSpecial,
// //                   {
// //                     opacity: isProcessing ? 0.6 : 1,
// //                   },
// //                 ]}
// //                 disabled={isProcessing}
// //                 onPress={handleShare}
// //               >
// //                 <LinearGradient
// //                   colors={['#6366F1', '#8B5CF6', '#EC4899']}
// //                   start={{ x: 0, y: 0 }}
// //                   end={{ x: 1, y: 1 }}
// //                   style={styles.shareButtonGradient}
// //                 >
// //                   <View style={styles.shareButtonContent}>
// //                     <View style={styles.shareButtonIconContainer}>
// //                       {isProcessing && processingAction === 'share' ? (
// //                         <ActivityIndicator size="small" color="#FFFFFF" />
// //                       ) : (
// //                         <Share size={20} color="#FFFFFF" strokeWidth={2.5} />
// //                       )}
// //                       <View style={styles.shareButtonSparkle}>
// //                         <Sparkles size={12} color="rgba(255, 255, 255, 0.8)" />
// //                       </View>
// //                     </View>
// //                     <View style={styles.shareButtonTextContainer}>
// //                       <Text style={styles.shareButtonTitle}>
// //                         Share Invoice
// //                       </Text>
// //                       <Text style={styles.shareButtonSubtitle}>
// //                         Send via email, WhatsApp & more
// //                       </Text>
// //                     </View>
// //                   </View>
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             </View>
// //           </LinearGradient>
// //         </BlurView>
// //       </Animated.View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   headerGradient: {
// //     paddingBottom: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 20,
// //     paddingTop: Platform.OS === 'android' ? 12 : 8,
// //     paddingVertical: 16,
// //   },
// //   backButton: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     backgroundColor: 'rgba(255, 255, 255, 0.15)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255, 255, 255, 0.2)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   headerTitleContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //     letterSpacing: -0.2,
// //   },
// //   placeholder: {
// //     width: 40,
// //   },
// //   scrollView: {
// //     flex: 1,
// //     marginTop: -10,
// //   },
// //   scrollContent: {
// //     paddingHorizontal: 20,
// //     paddingTop: 20,
// //     paddingBottom: 200,
// //   },
// //   successBanner: {
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     borderColor: 'rgba(6, 214, 160, 0.2)',
// //     overflow: 'hidden',
// //     marginBottom: 24,
// //   },
// //   successGradient: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 20,
// //     gap: 16,
// //   },
// //   successIconContainer: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     backgroundColor: 'rgba(6, 214, 160, 0.15)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   successContent: {
// //     flex: 1,
// //   },
// //   successTitle: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     marginBottom: 4,
// //     letterSpacing: -0.2,
// //   },
// //   successSubtitle: {
// //     fontSize: 13,
// //     fontWeight: '500',
// //   },
// //   statusBadge: {
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 12,
// //   },
// //   statusText: {
// //     fontSize: 11,
// //     fontWeight: '700',
// //     textTransform: 'uppercase',
// //     letterSpacing: 0.5,
// //   },
  
// //   // A4 Invoice Styles
// //   invoiceContainer: {
// //     alignItems: 'center',
// //     marginBottom: 24,
// //   },
// //   a4Container: {
// //     width: INVOICE_WIDTH,
// //     minHeight: INVOICE_HEIGHT * 0.8,
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 12,
// //     padding: 24,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.15,
// //     shadowRadius: 24,
// //     elevation: 8,
// //   },
// //   invoiceHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     paddingBottom: 16,
// //     marginBottom: 20,
// //     borderBottomWidth: 2,
// //     borderBottomColor: '#6366F1',
// //   },
// //   invoiceTitle: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     color: '#6366F1',
// //     letterSpacing: -1,
// //   },
// //   invoiceNumber: {
// //     fontSize: 14,
// //     color: '#6B7280',
// //     fontWeight: '500',
// //     marginTop: 4,
// //   },
// //   companyLogoSection: {
// //     alignItems: 'flex-end',
// //   },
// //   companyName: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#1F2937',
// //     marginBottom: 2,
// //   },
// //   companyTagline: {
// //     fontSize: 12,
// //     color: '#6366F1',
// //     fontWeight: '500',
// //   },
// //   contactsSection: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 24,
// //     gap: 16,
// //   },
// //   contactCard: {
// //     flex: 1,
// //     backgroundColor: '#F8FAFC',
// //     padding: 16,
// //     borderRadius: 8,
// //     borderLeftWidth: 3,
// //     borderLeftColor: '#6366F1',
// //   },
// //   contactTitle: {
// //     fontSize: 10,
// //     fontWeight: '700',
// //     color: '#6366F1',
// //     letterSpacing: 1,
// //     marginBottom: 8,
// //   },
// //   contactName: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //     color: '#1F2937',
// //     marginBottom: 6,
// //   },
// //   contactDetail: {
// //     fontSize: 11,
// //     color: '#6B7280',
// //     lineHeight: 16,
// //     marginBottom: 2,
// //   },
// //   contactMetaRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 4,
// //     marginTop: 2,
// //   },
// //   contactMeta: {
// //     fontSize: 10,
// //     color: '#6B7280',
// //     fontWeight: '500',
// //   },
// //   invoiceDetailsSection: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#F1F5F9',
// //     padding: 16,
// //     borderRadius: 8,
// //     marginBottom: 24,
// //   },
// //   detailItem: {
// //     alignItems: 'center',
// //     flex: 1,
// //   },
// //   detailLabel: {
// //     fontSize: 9,
// //     fontWeight: '700',
// //     color: '#6B7280',
// //     letterSpacing: 0.5,
// //     marginBottom: 4,
// //   },
// //   detailValue: {
// //     fontSize: 12,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //   },
// //   itemsSection: {
// //     marginBottom: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //     color: '#1F2937',
// //     marginBottom: 12,
// //     paddingBottom: 6,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E5E7EB',
// //   },
// //   tableHeader: {
// //     flexDirection: 'row',
// //     backgroundColor: '#6366F1',
// //     paddingVertical: 10,
// //     paddingHorizontal: 8,
// //     borderTopLeftRadius: 6,
// //     borderTopRightRadius: 6,
// //   },
// //   tableHeaderText: {
// //     fontSize: 10,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //     letterSpacing: 0.5,
// //   },
// //   tableRow: {
// //     flexDirection: 'row',
// //     paddingVertical: 8,
// //     paddingHorizontal: 8,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F3F4F6',
// //     alignItems: 'flex-start',
// //   },
// //   itemName: {
// //     fontSize: 12,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //     marginBottom: 2,
// //   },
// //   itemDescription: {
// //     fontSize: 10,
// //     color: '#6B7280',
// //     lineHeight: 14,
// //   },
// //   tableRowText: {
// //     fontSize: 11,
// //     color: '#1F2937',
// //     fontWeight: '500',
// //   },
// //   totalsSection: {
// //     alignItems: 'flex-end',
// //     marginBottom: 20,
// //   },
// //   totalsContainer: {
// //     minWidth: 200,
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     borderColor: '#E5E7EB',
// //     overflow: 'hidden',
// //   },
// //   totalRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F3F4F6',
// //   },
// //   subtotalRow: {
// //     backgroundColor: '#F8FAFC',
// //   },
// //   totalLabel: {
// //     fontSize: 11,
// //     fontWeight: '500',
// //     color: '#6B7280',
// //   },
// //   totalValue: {
// //     fontSize: 11,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //   },
// //   grandTotalRow: {
// //     backgroundColor: '#6366F1',
// //     borderBottomWidth: 0,
// //   },
// //   grandTotalLabel: {
// //     fontSize: 12,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //   },
// //   grandTotalValue: {
// //     fontSize: 12,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //   },
// //   notesSection: {
// //     backgroundColor: '#F0FDF4',
// //     padding: 12,
// //     borderRadius: 6,
// //     borderLeftWidth: 3,
// //     borderLeftColor: '#10B981',
// //     marginBottom: 16,
// //   },
// //   notesTitle: {
// //     fontSize: 11,
// //     fontWeight: '600',
// //     color: '#10B981',
// //     marginBottom: 4,
// //   },
// //   notesText: {
// //     fontSize: 10,
// //     color: '#6B7280',
// //     lineHeight: 14,
// //   },
// //   invoiceFooter: {
// //     alignItems: 'center',
// //     paddingTop: 16,
// //     borderTopWidth: 1,
// //     borderTopColor: '#E5E7EB',
// //   },
// //   footerText: {
// //     fontSize: 9,
// //     color: '#9CA3AF',
// //     textAlign: 'center',
// //     lineHeight: 12,
// //   },

// //   // Beautiful Action Buttons
// //   actionButtonsContainer: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     borderTopLeftRadius: 32,
// //     borderTopRightRadius: 32,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: -8 },
// //     shadowOpacity: 0.15,
// //     shadowRadius: 24,
// //     elevation: 12,
// //   },
// //   actionButtonsGradient: {
// //     paddingTop: 24,
// //     paddingHorizontal: 24,
// //     paddingBottom: Platform.OS === 'ios' ? 40 : 24,
// //   },
// //   actionButtonsContent: {
// //     gap: 16,
// //   },
// //   actionButton: {
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 12,
// //     elevation: 4,
// //   },
// //   actionButtonGradient: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 20,
// //     gap: 16,
// //   },
// //   actionButtonIconContainer: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   actionButtonTextContainer: {
// //     flex: 1,
// //   },
// //   actionButtonTitle: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     marginBottom: 2,
// //     letterSpacing: -0.2,
// //   },
// //   actionButtonSubtitle: {
// //     fontSize: 13,
// //     fontWeight: '500',
// //   },
// //   shareButtonSpecial: {
// //     borderWidth: 0,
// //     shadowColor: '#6366F1',
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 20,
// //     elevation: 8,
// //   },
// //   shareButtonGradient: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 20,
// //     gap: 16,
// //   },
// //   shareButtonContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 16,
// //     flex: 1,
// //   },
// //   shareButtonIconContainer: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     backgroundColor: 'rgba(255, 255, 255, 0.15)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     position: 'relative',
// //   },
// //   shareButtonSparkle: {
// //     position: 'absolute',
// //     top: -2,
// //     right: -2,
// //   },
// //   shareButtonTextContainer: {
// //     flex: 1,
// //   },
// //   shareButtonTitle: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //     marginBottom: 2,
// //     letterSpacing: -0.2,
// //   },
// //   shareButtonSubtitle: {
// //     fontSize: 13,
// //     fontWeight: '500',
// //     color: 'rgba(255, 255, 255, 0.8)',
// //   },
// // });

// import { useTheme } from '@/context/ThemeContext';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { StatusBar } from 'expo-status-bar';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import {
//   ArrowLeft,
//   Building2,
//   Calendar,
//   Download,
//   FileText,
//   IndianRupee,
//   Mail,
//   MapPin,
//   Phone,
//   Printer,
//   Share,
//   User,
//   CheckCircle,
//   Sparkles,
// } from 'lucide-react-native';
// import React, { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter, useLocalSearchParams } from 'expo-router';

// const { width: screenWidth } = Dimensions.get('window');
// const A4_RATIO = 1.414; // A4 aspect ratio (height/width)
// const INVOICE_WIDTH = screenWidth - 40; // 20px margin on each side
// const INVOICE_HEIGHT = INVOICE_WIDTH * A4_RATIO;

// // Mock data - replace with actual invoice data from API
// const mockInvoiceData = {
//   id: 'INV-001',
//   invoiceNumber: 'INV-2024-001',
//   invoiceDate: '2024-06-15',
//   dueDate: '2024-06-22',
//   status: 'PAID',
//   customer: {
//     name: 'Acme Corporation',
//     email: 'contact@acme.com',
//     phone: '+91 98765 43210',
//     address: {
//       street: '123 Business Street',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       country: 'India',
//     },
//   },
//   company: {
//     name: 'Your Business Name',
//     email: 'hello@yourbusiness.com',
//     phone: '+91 12345 67890',
//     address: {
//       street: '456 Company Lane',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400002',
//       country: 'India',
//     },
//     gstin: '27ABCDE1234F1Z5',
//     website: 'www.yourbusiness.com',
//   },
//   items: [
//     {
//       id: '1',
//       name: 'Premium Widget',
//       description: 'High-quality premium widget with advanced features',
//       quantity: 2,
//       unitPrice: 1500.0,
//       taxPercentage: 18,
//       taxAmount: 540.0,
//       totalAmount: 3540.0,
//     },
//     {
//       id: '2',
//       name: 'Standard Service Package',
//       description: 'Monthly maintenance and support service',
//       quantity: 1,
//       unitPrice: 2000.0,
//       taxPercentage: 18,
//       taxAmount: 360.0,
//       totalAmount: 2360.0,
//     },
//     {
//       id: '3',
//       name: 'Consultation Hours',
//       description: 'Professional consultation and setup',
//       quantity: 3,
//       unitPrice: 500.0,
//       taxPercentage: 18,
//       taxAmount: 270.0,
//       totalAmount: 1770.0,
//     },
//   ],
//   totals: {
//     subtotal: 6500.0,
//     discountAmount: 325.0,
//     taxAmount: 1111.5,
//     totalAmount: 7286.5,
//     roundOffAmount: -1.5,
//     finalAmount: 7285.0,
//   },
//   paymentMethod: 'UPI',
//   notes: 'Thank you for your business. Payment terms: Net 7 days. Please retain this invoice for your records.',
// };

// export default function InvoicePreviewScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();
//   const params = useLocalSearchParams();
  
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processingAction, setProcessingAction] = useState<'print' | 'download' | 'share' | null>(null);

//   // In real implementation, fetch invoice data using the ID from params
//   const invoice = mockInvoiceData;

//   const generateInvoiceHTML = () => {
//     const itemsHTML = invoice.items
//       .map(
//         (item) => `
//         <tr>
//           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top;">
//             <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px; font-size: 14px;">
//               ${item.name}
//             </div>
//             ${item.description ? `<div style="font-size: 12px; color: #6b7280; line-height: 1.4;">${item.description}</div>` : ''}
//           </td>
//           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
//             ${item.quantity}
//           </td>
//           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px;">
//             ₹${item.unitPrice.toLocaleString('en-IN')}
//           </td>
//           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
//             ${item.taxPercentage}%
//           </td>
//           <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; font-size: 14px;">
//             ₹${item.totalAmount.toLocaleString('en-IN')}
//           </td>
//         </tr>
//       `
//       )
//       .join('');

//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <title>Invoice ${invoice.invoiceNumber}</title>
//           <style>
//             * { margin: 0; padding: 0; box-sizing: border-box; }
//             body { 
//               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
//               color: #1f2937; 
//               line-height: 1.5; 
//               background: white;
//             }
//             .invoice-container { 
//               max-width: 800px; 
//               margin: 0 auto; 
//               padding: 40px; 
//               background: white;
//               min-height: 100vh;
//             }
//             .invoice-header { 
//               display: flex; 
//               justify-content: space-between; 
//               align-items: flex-start; 
//               margin-bottom: 40px; 
//               border-bottom: 3px solid #6366f1;
//               padding-bottom: 20px;
//             }
//             .invoice-title { 
//               font-size: 36px; 
//               font-weight: 700; 
//               color: #6366f1; 
//               margin-bottom: 8px; 
//               letter-spacing: -1px;
//             }
//             .invoice-number { 
//               font-size: 16px; 
//               color: #6b7280; 
//               font-weight: 500;
//             }
//             .company-logo-section {
//               text-align: right;
//               flex-shrink: 0;
//             }
//             .company-name { 
//               font-size: 24px; 
//               font-weight: 700; 
//               color: #1f2937; 
//               margin-bottom: 4px;
//             }
//             .company-tagline {
//               font-size: 14px;
//               color: #6366f1;
//               font-weight: 500;
//             }
//             .invoice-meta { 
//               display: flex; 
//               justify-content: space-between; 
//               margin-bottom: 40px; 
//               gap: 40px;
//             }
//             .company-info, .customer-info { 
//               flex: 1; 
//             }
//             .info-section {
//               background: #f8fafc;
//               padding: 20px;
//               border-radius: 8px;
//               border-left: 4px solid #6366f1;
//             }
//             .info-title { 
//               font-size: 12px; 
//               font-weight: 700; 
//               color: #6366f1; 
//               margin-bottom: 12px; 
//               text-transform: uppercase; 
//               letter-spacing: 1px; 
//             }
//             .contact-name { 
//               font-size: 18px; 
//               font-weight: 700; 
//               margin-bottom: 8px; 
//               color: #1f2937;
//             }
//             .contact-detail { 
//               font-size: 14px; 
//               color: #6b7280; 
//               margin-bottom: 3px; 
//               line-height: 1.4;
//             }
//             .invoice-details { 
//               background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
//               padding: 24px; 
//               border-radius: 12px; 
//               margin-bottom: 32px; 
//               border: 1px solid #e5e7eb;
//             }
//             .details-grid { 
//               display: grid; 
//               grid-template-columns: repeat(4, 1fr); 
//               gap: 20px; 
//             }
//             .detail-item { 
//               text-align: center;
//             }
//             .detail-label { 
//               font-size: 11px; 
//               font-weight: 600; 
//               color: #6b7280; 
//               margin-bottom: 6px; 
//               text-transform: uppercase; 
//               letter-spacing: 0.5px;
//             }
//             .detail-value { 
//               font-size: 16px; 
//               font-weight: 600; 
//               color: #1f2937; 
//             }
//             .items-section {
//               margin-bottom: 32px;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: 700;
//               color: #1f2937;
//               margin-bottom: 16px;
//               padding-bottom: 8px;
//               border-bottom: 2px solid #f3f4f6;
//             }
//             .items-table { 
//               width: 100%; 
//               border-collapse: collapse; 
//               background: white; 
//               border-radius: 8px; 
//               overflow: hidden; 
//               box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
//               border: 1px solid #e5e7eb;
//             }
//             .items-table th { 
//               background: #6366f1; 
//               color: white; 
//               padding: 12px 8px; 
//               font-weight: 600; 
//               text-align: left; 
//               font-size: 13px;
//               text-transform: uppercase;
//               letter-spacing: 0.5px;
//             }
//             .items-table th:nth-child(2), 
//             .items-table th:nth-child(4) { 
//               text-align: center; 
//             }
//             .items-table th:nth-child(3), 
//             .items-table th:nth-child(5) { 
//               text-align: right; 
//             }
//             .totals-section { 
//               display: flex; 
//               justify-content: flex-end; 
//               margin-bottom: 32px; 
//             }
//             .totals-container {
//               min-width: 350px;
//               background: white;
//               border-radius: 8px;
//               border: 1px solid #e5e7eb;
//               overflow: hidden;
//             }
//             .totals-row { 
//               display: flex; 
//               justify-content: space-between; 
//               padding: 12px 20px; 
//               border-bottom: 1px solid #f3f4f6; 
//             }
//             .totals-row:last-child {
//               border-bottom: none;
//             }
//             .totals-row.subtotal { 
//               background: #f8fafc; 
//             }
//             .totals-row.total { 
//               background: #6366f1; 
//               color: white; 
//               font-weight: 700; 
//               font-size: 18px; 
//             }
//             .totals-label {
//               font-weight: 500;
//             }
//             .totals-value {
//               font-weight: 600;
//             }
//             .notes-section { 
//               background: #f8fafc; 
//               padding: 20px; 
//               border-radius: 8px; 
//               border-left: 4px solid #10b981; 
//               margin-bottom: 32px;
//             }
//             .notes-title { 
//               font-size: 14px; 
//               font-weight: 600; 
//               margin-bottom: 8px; 
//               color: #10b981;
//             }
//             .notes-text { 
//               font-size: 14px; 
//               color: #6b7280; 
//               line-height: 1.6;
//             }
//             .footer-section {
//               text-align: center;
//               padding-top: 20px;
//               border-top: 1px solid #e5e7eb;
//               color: #6b7280;
//               font-size: 12px;
//             }
//             @media print {
//               body { print-color-adjust: exact; }
//               .invoice-container { padding: 20px; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="invoice-container">
//             <div class="invoice-header">
//               <div>
//                 <div class="invoice-title">INVOICE</div>
//                 <div class="invoice-number">${invoice.invoiceNumber}</div>
//               </div>
//               <div class="company-logo-section">
//                 <div class="company-name">${invoice.company.name}</div>
//                 <div class="company-tagline">Professional Services</div>
//               </div>
//             </div>
            
//             <div class="invoice-meta">
//               <div class="company-info">
//                 <div class="info-section">
//                   <div class="info-title">From</div>
//                   <div class="contact-name">${invoice.company.name}</div>
//                   <div class="contact-detail">${invoice.company.address.street}</div>
//                   <div class="contact-detail">${invoice.company.address.city}, ${invoice.company.address.state} ${invoice.company.address.pincode}</div>
//                   <div class="contact-detail">${invoice.company.address.country}</div>
//                   <div class="contact-detail">GSTIN: ${invoice.company.gstin}</div>
//                   <div class="contact-detail">${invoice.company.email}</div>
//                   <div class="contact-detail">${invoice.company.phone}</div>
//                   <div class="contact-detail">${invoice.company.website}</div>
//                 </div>
//               </div>
              
//               <div class="customer-info">
//                 <div class="info-section">
//                   <div class="info-title">Bill To</div>
//                   <div class="contact-name">${invoice.customer.name}</div>
//                   <div class="contact-detail">${invoice.customer.address.street}</div>
//                   <div class="contact-detail">${invoice.customer.address.city}, ${invoice.customer.address.state} ${invoice.customer.address.pincode}</div>
//                   <div class="contact-detail">${invoice.customer.address.country}</div>
//                   <div class="contact-detail">${invoice.customer.email}</div>
//                   <div class="contact-detail">${invoice.customer.phone}</div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="invoice-details">
//               <div class="details-grid">
//                 <div class="detail-item">
//                   <div class="detail-label">Invoice Date</div>
//                   <div class="detail-value">${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</div>
//                 </div>
//                 <div class="detail-item">
//                   <div class="detail-label">Due Date</div>
//                   <div class="detail-value">${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
//                 </div>
//                 <div class="detail-item">
//                   <div class="detail-label">Payment Method</div>
//                   <div class="detail-value">${invoice.paymentMethod}</div>
//                 </div>
//                 <div class="detail-item">
//                   <div class="detail-label">Status</div>
//                   <div class="detail-value">${invoice.status}</div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="items-section">
//               <div class="section-title">Items & Services</div>
//               <table class="items-table">
//                 <thead>
//                   <tr>
//                     <th>Description</th>
//                     <th>Qty</th>
//                     <th>Unit Price</th>
//                     <th>Tax</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${itemsHTML}
//                 </tbody>
//               </table>
//             </div>
            
//             <div class="totals-section">
//               <div class="totals-container">
//                 <div class="totals-row subtotal">
//                   <span class="totals-label">Subtotal:</span>
//                   <span class="totals-value">₹${invoice.totals.subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div class="totals-row">
//                   <span class="totals-label">Discount:</span>
//                   <span class="totals-value">-₹${invoice.totals.discountAmount.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div class="totals-row">
//                   <span class="totals-label">Tax (GST):</span>
//                   <span class="totals-value">₹${invoice.totals.taxAmount.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div class="totals-row">
//                   <span class="totals-label">Round Off:</span>
//                   <span class="totals-value">₹${invoice.totals.roundOffAmount.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div class="totals-row total">
//                   <span class="totals-label">Total Amount:</span>
//                   <span class="totals-value">₹${invoice.totals.finalAmount.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>
//             </div>
            
//             ${invoice.notes ? `
//               <div class="notes-section">
//                 <div class="notes-title">Notes & Terms:</div>
//                 <div class="notes-text">${invoice.notes}</div>
//               </div>
//             ` : ''}
            
//             <div class="footer-section">
//               <p>This is a computer generated invoice and does not require a signature.</p>
//               <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;
//   };

//   const handlePrint = async () => {
//     try {
//       setIsProcessing(true);
//       setProcessingAction('print');

//       const htmlContent = generateInvoiceHTML();
      
//       await Print.printAsync({
//         html: htmlContent,
//         printerUrl: undefined,
//       });
//     } catch (error) {
//       console.error('Print error:', error);
//       Alert.alert('Error', 'Failed to print invoice. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessingAction(null);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       setIsProcessing(true);
//       setProcessingAction('download');

//       const htmlContent = generateInvoiceHTML();
      
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: false,
//       });

//       const fileName = `Invoice_${invoice.invoiceNumber}_${Date.now()}.pdf`;
//       const newUri = `${FileSystem.documentDirectory}${fileName}`;
//       await FileSystem.moveAsync({
//         from: uri,
//         to: newUri,
//       });

//       Alert.alert(
//         'Success',
//         `Invoice downloaded successfully!\nSaved as: ${fileName}`,
//         [{ text: 'OK', style: 'default' }]
//       );
//     } catch (error) {
//       console.error('Download error:', error);
//       Alert.alert('Error', 'Failed to download invoice. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessingAction(null);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       setIsProcessing(true);
//       setProcessingAction('share');

//       const htmlContent = generateInvoiceHTML();
      
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: false,
//       });

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: 'application/pdf',
//           dialogTitle: `Share Invoice ${invoice.invoiceNumber}`,
//           UTI: 'com.adobe.pdf',
//         });
//       } else {
//         Alert.alert('Error', 'Sharing is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Share error:', error);
//       Alert.alert('Error', 'Failed to share invoice. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessingAction(null);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'PAID':
//         return '#06D6A0';
//       case 'PENDING':
//         return '#F59E0B';
//       case 'OVERDUE':
//         return '#EF4444';
//       case 'DRAFT':
//         return '#6B7280';
//       default:
//         return theme.colors.textSecondary;
//     }
//   };

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

//       {/* Header with Gradient */}
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
//               <Text style={styles.headerTitle}>Invoice Preview</Text>
//             </View>

//             <View style={styles.placeholder} />
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Success Banner */}
//         <Animated.View entering={FadeInDown.delay(100)}>
//           <BlurView
//             intensity={themeType === 'dark' ? 15 : 80}
//             tint={themeType}
//             style={styles.successBanner}
//           >
//             <LinearGradient
//               colors={['rgba(6, 214, 160, 0.15)', 'rgba(6, 214, 160, 0.05)']}
//               style={styles.successGradient}
//             >
//               <View style={styles.successIconContainer}>
//                 <CheckCircle size={20} color="#06D6A0" />
//               </View>
//               <View style={styles.successContent}>
//                 <Text style={[styles.successTitle, { color: theme.colors.text }]}>
//                   Invoice Created Successfully!
//                 </Text>
//                 <Text style={[styles.successSubtitle, { color: theme.colors.textSecondary }]}>
//                   {invoice.invoiceNumber} • {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
//                 </Text>
//               </View>
//               <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(invoice.status)}20` }]}>
//                 <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
//                   {invoice.status}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </BlurView>
//         </Animated.View>

//         {/* A4 Invoice Preview */}
//         <Animated.View entering={FadeInUp.delay(200)}>
//           <View style={styles.invoiceContainer}>
//             <View style={[styles.a4Container, { backgroundColor: '#FFFFFF' }]}>
//               {/* Invoice Header */}
//               <View style={styles.invoiceHeader}>
//                 <View>
//                   <Text style={styles.invoiceTitle}>INVOICE</Text>
//                   <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
//                 </View>
//                 <View style={styles.companyLogoSection}>
//                   <Text style={styles.companyName}>{invoice.company.name}</Text>
//                   <Text style={styles.companyTagline}>Professional Services</Text>
//                 </View>
//               </View>

//               {/* Company and Customer Info */}
//               <View style={styles.contactsSection}>
//                 <View style={styles.contactCard}>
//                   <Text style={styles.contactTitle}>FROM</Text>
//                   <Text style={styles.contactName}>{invoice.company.name}</Text>
//                   <Text style={styles.contactDetail}>{invoice.company.address.street}</Text>
//                   <Text style={styles.contactDetail}>
//                     {invoice.company.address.city}, {invoice.company.address.state} {invoice.company.address.pincode}
//                   </Text>
//                   <Text style={styles.contactDetail}>GSTIN: {invoice.company.gstin}</Text>
//                   <View style={styles.contactMetaRow}>
//                     <Mail size={10} color="#6B7280" />
//                     <Text style={styles.contactMeta}>{invoice.company.email}</Text>
//                   </View>
//                   <View style={styles.contactMetaRow}>
//                     <Phone size={10} color="#6B7280" />
//                     <Text style={styles.contactMeta}>{invoice.company.phone}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.contactCard}>
//                   <Text style={styles.contactTitle}>BILL TO</Text>
//                   <Text style={styles.contactName}>{invoice.customer.name}</Text>
//                   <Text style={styles.contactDetail}>{invoice.customer.address.street}</Text>
//                   <Text style={styles.contactDetail}>
//                     {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.pincode}
//                   </Text>
//                   <View style={styles.contactMetaRow}>
//                     <Mail size={10} color="#6B7280" />
//                     <Text style={styles.contactMeta}>{invoice.customer.email}</Text>
//                   </View>
//                   <View style={styles.contactMetaRow}>
//                     <Phone size={10} color="#6B7280" />
//                     <Text style={styles.contactMeta}>{invoice.customer.phone}</Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Invoice Details */}
//               <View style={styles.invoiceDetailsSection}>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>INVOICE DATE</Text>
//                   <Text style={styles.detailValue}>{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</Text>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>DUE DATE</Text>
//                   <Text style={styles.detailValue}>{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</Text>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>PAYMENT METHOD</Text>
//                   <Text style={styles.detailValue}>{invoice.paymentMethod}</Text>
//                 </View>
//               </View>

//               {/* Items Table */}
//               <View style={styles.itemsSection}>
//                 <Text style={styles.sectionTitle}>Items & Services</Text>
                
//                 {/* Table Header */}
//                 <View style={styles.tableHeader}>
//                   <Text style={[styles.tableHeaderText, { flex: 3 }]}>DESCRIPTION</Text>
//                   <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>QTY</Text>
//                   <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>RATE</Text>
//                   <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>TAX</Text>
//                   <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>AMOUNT</Text>
//                 </View>

//                 {/* Table Rows */}
//                 {invoice.items.map((item, index) => (
//                   <View key={item.id} style={styles.tableRow}>
//                     <View style={{ flex: 3 }}>
//                       <Text style={styles.itemName}>{item.name}</Text>
//                       {item.description && (
//                         <Text style={styles.itemDescription}>{item.description}</Text>
//                       )}
//                     </View>
//                     <Text style={[styles.tableRowText, { flex: 1, textAlign: 'center' }]}>
//                       {item.quantity}
//                     </Text>
//                     <Text style={[styles.tableRowText, { flex: 1.5, textAlign: 'right' }]}>
//                       ₹{item.unitPrice.toLocaleString('en-IN')}
//                     </Text>
//                     <Text style={[styles.tableRowText, { flex: 1, textAlign: 'center' }]}>
//                       {item.taxPercentage}%
//                     </Text>
//                     <Text style={[styles.tableRowText, { flex: 1.5, textAlign: 'right', fontWeight: '600' }]}>
//                       ₹{item.totalAmount.toLocaleString('en-IN')}
//                     </Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Totals Section */}
//               <View style={styles.totalsSection}>
//                 <View style={styles.totalsContainer}>
//                   <View style={[styles.totalRow, styles.subtotalRow]}>
//                     <Text style={styles.totalLabel}>Subtotal</Text>
//                     <Text style={styles.totalValue}>₹{invoice.totals.subtotal.toLocaleString('en-IN')}</Text>
//                   </View>
//                   <View style={styles.totalRow}>
//                     <Text style={styles.totalLabel}>Discount</Text>
//                     <Text style={styles.totalValue}>-₹{invoice.totals.discountAmount.toLocaleString('en-IN')}</Text>
//                   </View>
//                   <View style={styles.totalRow}>
//                     <Text style={styles.totalLabel}>Tax (GST)</Text>
//                     <Text style={styles.totalValue}>₹{invoice.totals.taxAmount.toLocaleString('en-IN')}</Text>
//                   </View>
//                   <View style={styles.totalRow}>
//                     <Text style={styles.totalLabel}>Round Off</Text>
//                     <Text style={styles.totalValue}>₹{invoice.totals.roundOffAmount.toLocaleString('en-IN')}</Text>
//                   </View>
//                   <View style={[styles.totalRow, styles.grandTotalRow]}>
//                     <Text style={styles.grandTotalLabel}>Total Amount</Text>
//                     <Text style={styles.grandTotalValue}>₹{invoice.totals.finalAmount.toLocaleString('en-IN')}</Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Notes */}
//               {invoice.notes && (
//                 <View style={styles.notesSection}>
//                   <Text style={styles.notesTitle}>Notes & Terms:</Text>
//                   <Text style={styles.notesText}>{invoice.notes}</Text>
//                 </View>
//               )}

//               {/* Footer */}
//               <View style={styles.invoiceFooter}>
//                 <Text style={styles.footerText}>This is a computer generated invoice and does not require a signature.</Text>
//                 <Text style={styles.footerText}>Generated on {new Date().toLocaleString('en-IN')}</Text>
//               </View>
//             </View>
//           </View>
//         </Animated.View>
//       </ScrollView>

//       {/* Beautiful Action Buttons */}
//       <Animated.View entering={FadeInUp.delay(400)}>
//         <BlurView
//           intensity={themeType === 'dark' ? 25 : 90}
//           tint={themeType}
//           style={styles.actionButtonsContainer}
//         >
//           <LinearGradient
//             colors={
//               themeType === 'dark'
//                 ? ['rgba(26, 27, 58, 0.95)', 'rgba(45, 27, 105, 0.8)']
//                 : ['rgba(248, 250, 252, 0.95)', 'rgba(241, 245, 249, 0.8)']
//             }
//             style={styles.actionButtonsGradient}
//           >
//             <View style={styles.actionButtonsContent}>
//               {/* Print Button */}
//               <TouchableOpacity
//                 style={[
//                   styles.actionButton,
//                   {
//                     backgroundColor: themeType === 'dark' 
//                       ? 'rgba(255, 255, 255, 0.08)' 
//                       : 'rgba(255, 255, 255, 0.9)',
//                     borderColor: themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.12)'
//                       : 'rgba(0, 0, 0, 0.06)',
//                     opacity: isProcessing ? 0.6 : 1,
//                   },
//                 ]}
//                 disabled={isProcessing}
//                 onPress={handlePrint}
//               >
//                 <LinearGradient
//                   colors={
//                     themeType === 'dark'
//                       ? ['rgba(139, 92, 246, 0.1)', 'rgba(99, 102, 241, 0.05)']
//                       : ['rgba(139, 92, 246, 0.08)', 'rgba(99, 102, 241, 0.03)']
//                   }
//                   style={styles.actionButtonGradient}
//                 >
//                   <View style={styles.actionButtonIconContainer}>
//                     {isProcessing && processingAction === 'print' ? (
//                       <ActivityIndicator size="small" color={theme.colors.primary} />
//                     ) : (
//                       <Printer size={20} color={theme.colors.primary} strokeWidth={2} />
//                     )}
//                   </View>
//                   <View style={styles.actionButtonTextContainer}>
//                     <Text style={[styles.actionButtonTitle, { color: theme.colors.text }]}>
//                       Print
//                     </Text>
//                     <Text style={[styles.actionButtonSubtitle, { color: theme.colors.textSecondary }]}>
//                       Physical copy
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Download Button */}
//               <TouchableOpacity
//                 style={[
//                   styles.actionButton,
//                   {
//                     backgroundColor: themeType === 'dark' 
//                       ? 'rgba(255, 255, 255, 0.08)' 
//                       : 'rgba(255, 255, 255, 0.9)',
//                     borderColor: themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.12)'
//                       : 'rgba(0, 0, 0, 0.06)',
//                     opacity: isProcessing ? 0.6 : 1,
//                   },
//                 ]}
//                 disabled={isProcessing}
//                 onPress={handleDownload}
//               >
//                 <LinearGradient
//                   colors={
//                     themeType === 'dark'
//                       ? ['rgba(16, 185, 129, 0.1)', 'rgba(6, 214, 160, 0.05)']
//                       : ['rgba(16, 185, 129, 0.08)', 'rgba(6, 214, 160, 0.03)']
//                   }
//                   style={styles.actionButtonGradient}
//                 >
//                   <View style={styles.actionButtonIconContainer}>
//                     {isProcessing && processingAction === 'download' ? (
//                       <ActivityIndicator size="small" color="#10B981" />
//                     ) : (
//                       <Download size={20} color="#10B981" strokeWidth={2} />
//                     )}
//                   </View>
//                   <View style={styles.actionButtonTextContainer}>
//                     <Text style={[styles.actionButtonTitle, { color: theme.colors.text }]}>
//                       Download
//                     </Text>
//                     <Text style={[styles.actionButtonSubtitle, { color: theme.colors.textSecondary }]}>
//                       Save as PDF
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Share Button - Premium */}
//               <TouchableOpacity
//                 style={[
//                   styles.actionButton,
//                   styles.shareButtonSpecial,
//                   {
//                     opacity: isProcessing ? 0.6 : 1,
//                   },
//                 ]}
//                 disabled={isProcessing}
//                 onPress={handleShare}
//               >
//                 <LinearGradient
//                   colors={['#6366F1', '#8B5CF6', '#EC4899']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={styles.shareButtonGradient}
//                 >
//                   <View style={styles.shareButtonContent}>
//                     <View style={styles.shareButtonIconContainer}>
//                       {isProcessing && processingAction === 'share' ? (
//                         <ActivityIndicator size="small" color="#FFFFFF" />
//                       ) : (
//                         <Share size={20} color="#FFFFFF" strokeWidth={2.5} />
//                       )}
//                       <View style={styles.shareButtonSparkle}>
//                         <Sparkles size={12} color="rgba(255, 255, 255, 0.8)" />
//                       </View>
//                     </View>
//                     <View style={styles.shareButtonTextContainer}>
//                       <Text style={styles.shareButtonTitle}>
//                         Share Invoice
//                       </Text>
//                       <Text style={styles.shareButtonSubtitle}>
//                         Send via email, WhatsApp & more
//                       </Text>
//                     </View>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </BlurView>
//       </Animated.View>
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
//   scrollView: {
//     flex: 1,
//     marginTop: -10,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 200,
//   },
//   successBanner: {
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(6, 214, 160, 0.2)',
//     overflow: 'hidden',
//     marginBottom: 24,
//   },
//   successGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     gap: 16,
//   },
//   successIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(6, 214, 160, 0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successContent: {
//     flex: 1,
//   },
//   successTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 4,
//     letterSpacing: -0.2,
//   },
//   successSubtitle: {
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontSize: 11,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
  
//   // A4 Invoice Styles
//   invoiceContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   a4Container: {
//     width: INVOICE_WIDTH,
//     minHeight: INVOICE_HEIGHT * 0.8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 8,
//   },
//   invoiceHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingBottom: 16,
//     marginBottom: 20,
//     borderBottomWidth: 2,
//     borderBottomColor: '#6366F1',
//   },
//   invoiceTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#6366F1',
//     letterSpacing: -1,
//   },
//   invoiceNumber: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//     marginTop: 4,
//   },
//   companyLogoSection: {
//     alignItems: 'flex-end',
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 2,
//   },
//   companyTagline: {
//     fontSize: 12,
//     color: '#6366F1',
//     fontWeight: '500',
//   },
//   contactsSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//     gap: 16,
//   },
//   contactCard: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//     padding: 16,
//     borderRadius: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#6366F1',
//   },
//   contactTitle: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: '#6366F1',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   contactName: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 6,
//   },
//   contactDetail: {
//     fontSize: 11,
//     color: '#6B7280',
//     lineHeight: 16,
//     marginBottom: 2,
//   },
//   contactMetaRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     marginTop: 2,
//   },
//   contactMeta: {
//     fontSize: 10,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   invoiceDetailsSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#F1F5F9',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   detailItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 9,
//     fontWeight: '700',
//     color: '#6B7280',
//     letterSpacing: 0.5,
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   itemsSection: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 12,
//     paddingBottom: 6,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#6366F1',
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//     borderTopLeftRadius: 6,
//     borderTopRightRadius: 6,
//   },
//   tableHeaderText: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.5,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//     alignItems: 'flex-start',
//   },
//   itemName: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 2,
//   },
//   itemDescription: {
//     fontSize: 10,
//     color: '#6B7280',
//     lineHeight: 14,
//   },
//   tableRowText: {
//     fontSize: 11,
//     color: '#1F2937',
//     fontWeight: '500',
//   },
//   totalsSection: {
//     alignItems: 'flex-end',
//     marginBottom: 20,
//   },
//   totalsContainer: {
//     minWidth: 200,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     overflow: 'hidden',
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   subtotalRow: {
//     backgroundColor: '#F8FAFC',
//   },
//   totalLabel: {
//     fontSize: 11,
//     fontWeight: '500',
//     color: '#6B7280',
//   },
//   totalValue: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   grandTotalRow: {
//     backgroundColor: '#6366F1',
//     borderBottomWidth: 0,
//   },
//   grandTotalLabel: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   grandTotalValue: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   notesSection: {
//     backgroundColor: '#F0FDF4',
//     padding: 12,
//     borderRadius: 6,
//     borderLeftWidth: 3,
//     borderLeftColor: '#10B981',
//     marginBottom: 16,
//   },
//   notesTitle: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   notesText: {
//     fontSize: 10,
//     color: '#6B7280',
//     lineHeight: 14,
//   },
//   invoiceFooter: {
//     alignItems: 'center',
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   footerText: {
//     fontSize: 9,
//     color: '#9CA3AF',
//     textAlign: 'center',
//     lineHeight: 12,
//   },

//   // Beautiful Action Buttons
//   actionButtonsContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     borderTopLeftRadius: 32,
//     borderTopRightRadius: 32,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -8 },
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },
//   actionButtonsGradient: {
//     paddingTop: 24,
//     paddingHorizontal: 24,
//     paddingBottom: Platform.OS === 'ios' ? 40 : 24,
//   },
//   actionButtonsContent: {
//     gap: 16,
//   },
//   actionButton: {
//     borderRadius: 20,
//     borderWidth: 1,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   actionButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     gap: 16,
//   },
//   actionButtonIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   actionButtonTextContainer: {
//     flex: 1,
//   },
//   actionButtonTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 2,
//     letterSpacing: -0.2,
//   },
//   actionButtonSubtitle: {
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   shareButtonSpecial: {
//     borderWidth: 0,
//     shadowColor: '#6366F1',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 8,
//   },
//   shareButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     gap: 16,
//   },
//   shareButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//     flex: 1,
//   },
//   shareButtonIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   shareButtonSparkle: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//   },
//   shareButtonTextContainer: {
//     flex: 1,
//   },
//   shareButtonTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 2,
//     letterSpacing: -0.2,
//   },
//   shareButtonSubtitle: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: 'rgba(255, 255, 255, 0.8)',
//   },
// });


import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
// import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Download,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Printer,
  Share,
  User,
  CheckCircle,
  Sparkles,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const A4_RATIO = 1.414; // A4 aspect ratio (height/width)
const INVOICE_WIDTH = screenWidth - 40; // 20px margin on each side
const INVOICE_HEIGHT = INVOICE_WIDTH * A4_RATIO;

// Mock data - replace with actual invoice data from API
const mockInvoiceData = {
  id: 'INV-001',
  invoiceNumber: 'INV-2024-001',
  invoiceDate: '2024-06-15',
  dueDate: '2024-06-22',
  status: 'PAID',
  customer: {
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+91 98765 43210',
    address: {
      street: '123 Business Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
  },
  company: {
    name: 'Your Business Name',
    email: 'hello@yourbusiness.com',
    phone: '+91 12345 67890',
    address: {
      street: '456 Company Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      country: 'India',
    },
    gstin: '27ABCDE1234F1Z5',
    website: 'www.yourbusiness.com',
  },
  items: [
    {
      id: '1',
      name: 'Premium Widget',
      description: 'High-quality premium widget with advanced features',
      quantity: 2,
      unitPrice: 1500.0,
      taxPercentage: 18,
      taxAmount: 540.0,
      totalAmount: 3540.0,
    },
    {
      id: '2',
      name: 'Standard Service Package',
      description: 'Monthly maintenance and support service',
      quantity: 1,
      unitPrice: 2000.0,
      taxPercentage: 18,
      taxAmount: 360.0,
      totalAmount: 2360.0,
    },
    {
      id: '3',
      name: 'Consultation Hours',
      description: 'Professional consultation and setup',
      quantity: 3,
      unitPrice: 500.0,
      taxPercentage: 18,
      taxAmount: 270.0,
      totalAmount: 1770.0,
    },
  ],
  totals: {
    subtotal: 6500.0,
    discountAmount: 325.0,
    taxAmount: 1111.5,
    totalAmount: 7286.5,
    roundOffAmount: -1.5,
    finalAmount: 7285.0,
  },
  paymentMethod: 'UPI',
  notes: 'Thank you for your business. Payment terms: Net 7 days. Please retain this invoice for your records.',
};

export default function InvoicePreviewScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingAction, setProcessingAction] = useState<'print' | 'download' | 'share' | null>(null);

  // In real implementation, fetch invoice data using the ID from params
  const invoice = mockInvoiceData;

  const generateInvoiceHTML = () => {
    const itemsHTML = invoice.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px; font-size: 14px;">
              ${item.name}
            </div>
            ${item.description ? `<div style="font-size: 12px; color: #6b7280; line-height: 1.4;">${item.description}</div>` : ''}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
            ${item.quantity}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px;">
            ₹${item.unitPrice.toLocaleString('en-IN')}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">
            ${item.taxPercentage}%
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; font-size: 14px;">
            ₹${item.totalAmount.toLocaleString('en-IN')}
          </td>
        </tr>
      `
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              color: #1f2937; 
              line-height: 1.5; 
              background: white;
            }
            .invoice-container { 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px; 
              background: white;
              min-height: 100vh;
            }
            .invoice-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start; 
              margin-bottom: 40px; 
              border-bottom: 3px solid #6366f1;
              padding-bottom: 20px;
            }
            .invoice-title { 
              font-size: 36px; 
              font-weight: 700; 
              color: #6366f1; 
              margin-bottom: 8px; 
              letter-spacing: -1px;
            }
            .invoice-number { 
              font-size: 16px; 
              color: #6b7280; 
              font-weight: 500;
            }
            .company-logo-section {
              text-align: right;
              flex-shrink: 0;
            }
            .company-name { 
              font-size: 24px; 
              font-weight: 700; 
              color: #1f2937; 
              margin-bottom: 4px;
            }
            .company-tagline {
              font-size: 14px;
              color: #6366f1;
              font-weight: 500;
            }
            .invoice-meta { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 40px; 
              gap: 40px;
            }
            .company-info, .customer-info { 
              flex: 1; 
            }
            .info-section {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #6366f1;
            }
            .info-title { 
              font-size: 12px; 
              font-weight: 700; 
              color: #6366f1; 
              margin-bottom: 12px; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
            }
            .contact-name { 
              font-size: 18px; 
              font-weight: 700; 
              margin-bottom: 8px; 
              color: #1f2937;
            }
            .contact-detail { 
              font-size: 14px; 
              color: #6b7280; 
              margin-bottom: 3px; 
              line-height: 1.4;
            }
            .invoice-details { 
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
              padding: 24px; 
              border-radius: 12px; 
              margin-bottom: 32px; 
              border: 1px solid #e5e7eb;
            }
            .details-grid { 
              display: grid; 
              grid-template-columns: repeat(4, 1fr); 
              gap: 20px; 
            }
            .detail-item { 
              text-align: center;
            }
            .detail-label { 
              font-size: 11px; 
              font-weight: 600; 
              color: #6b7280; 
              margin-bottom: 6px; 
              text-transform: uppercase; 
              letter-spacing: 0.5px;
            }
            .detail-value { 
              font-size: 16px; 
              font-weight: 600; 
              color: #1f2937; 
            }
            .items-section {
              margin-bottom: 32px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 16px;
              padding-bottom: 8px;
              border-bottom: 2px solid #f3f4f6;
            }
            .items-table { 
              width: 100%; 
              border-collapse: collapse; 
              background: white; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
              border: 1px solid #e5e7eb;
            }
            .items-table th { 
              background: #6366f1; 
              color: white; 
              padding: 12px 8px; 
              font-weight: 600; 
              text-align: left; 
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .items-table th:nth-child(2), 
            .items-table th:nth-child(4) { 
              text-align: center; 
            }
            .items-table th:nth-child(3), 
            .items-table th:nth-child(5) { 
              text-align: right; 
            }
            .totals-section { 
              display: flex; 
              justify-content: flex-end; 
              margin-bottom: 32px; 
            }
            .totals-container {
              min-width: 350px;
              background: white;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
              overflow: hidden;
            }
            .totals-row { 
              display: flex; 
              justify-content: space-between; 
              padding: 12px 20px; 
              border-bottom: 1px solid #f3f4f6; 
            }
            .totals-row:last-child {
              border-bottom: none;
            }
            .totals-row.subtotal { 
              background: #f8fafc; 
            }
            .totals-row.total { 
              background: #6366f1; 
              color: white; 
              font-weight: 700; 
              font-size: 18px; 
            }
            .totals-label {
              font-weight: 500;
            }
            .totals-value {
              font-weight: 600;
            }
            .notes-section { 
              background: #f8fafc; 
              padding: 20px; 
              border-radius: 8px; 
              border-left: 4px solid #10b981; 
              margin-bottom: 32px;
            }
            .notes-title { 
              font-size: 14px; 
              font-weight: 600; 
              margin-bottom: 8px; 
              color: #10b981;
            }
            .notes-text { 
              font-size: 14px; 
              color: #6b7280; 
              line-height: 1.6;
            }
            .footer-section {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body { print-color-adjust: exact; }
              .invoice-container { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-number">${invoice.invoiceNumber}</div>
              </div>
              <div class="company-logo-section">
                <div class="company-name">${invoice.company.name}</div>
                <div class="company-tagline">Professional Services</div>
              </div>
            </div>
            
            <div class="invoice-meta">
              <div class="company-info">
                <div class="info-section">
                  <div class="info-title">From</div>
                  <div class="contact-name">${invoice.company.name}</div>
                  <div class="contact-detail">${invoice.company.address.street}</div>
                  <div class="contact-detail">${invoice.company.address.city}, ${invoice.company.address.state} ${invoice.company.address.pincode}</div>
                  <div class="contact-detail">${invoice.company.address.country}</div>
                  <div class="contact-detail">GSTIN: ${invoice.company.gstin}</div>
                  <div class="contact-detail">${invoice.company.email}</div>
                  <div class="contact-detail">${invoice.company.phone}</div>
                  <div class="contact-detail">${invoice.company.website}</div>
                </div>
              </div>
              
              <div class="customer-info">
                <div class="info-section">
                  <div class="info-title">Bill To</div>
                  <div class="contact-name">${invoice.customer.name}</div>
                  <div class="contact-detail">${invoice.customer.address.street}</div>
                  <div class="contact-detail">${invoice.customer.address.city}, ${invoice.customer.address.state} ${invoice.customer.address.pincode}</div>
                  <div class="contact-detail">${invoice.customer.address.country}</div>
                  <div class="contact-detail">${invoice.customer.email}</div>
                  <div class="contact-detail">${invoice.customer.phone}</div>
                </div>
              </div>
            </div>
            
            <div class="invoice-details">
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label">Invoice Date</div>
                  <div class="detail-value">${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Due Date</div>
                  <div class="detail-value">${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Payment Method</div>
                  <div class="detail-value">${invoice.paymentMethod}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Status</div>
                  <div class="detail-value">${invoice.status}</div>
                </div>
              </div>
            </div>
            
            <div class="items-section">
              <div class="section-title">Items & Services</div>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Tax</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>
            
            <div class="totals-section">
              <div class="totals-container">
                <div class="totals-row subtotal">
                  <span class="totals-label">Subtotal:</span>
                  <span class="totals-value">₹${invoice.totals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div class="totals-row">
                  <span class="totals-label">Discount:</span>
                  <span class="totals-value">-₹${invoice.totals.discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="totals-row">
                  <span class="totals-label">Tax (GST):</span>
                  <span class="totals-value">₹${invoice.totals.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="totals-row">
                  <span class="totals-label">Round Off:</span>
                  <span class="totals-value">₹${invoice.totals.roundOffAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="totals-row total">
                  <span class="totals-label">Total Amount:</span>
                  <span class="totals-value">₹${invoice.totals.finalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            
            ${invoice.notes ? `
              <div class="notes-section">
                <div class="notes-title">Notes & Terms:</div>
                <div class="notes-text">${invoice.notes}</div>
              </div>
            ` : ''}
            
            <div class="footer-section">
              <p>This is a computer generated invoice and does not require a signature.</p>
              <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handlePrint = async () => {
    try {
      setIsProcessing(true);
      setProcessingAction('print');

      const htmlContent = generateInvoiceHTML();
      
      // await Print.printAsync({
      //   html: htmlContent,
      //   printerUrl: undefined,
      // });
    } catch (error) {
      console.error('Print error:', error);
      Alert.alert('Error', 'Failed to print invoice. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingAction(null);
    }
  };

  const handleDownload = async () => {
    try {
      setIsProcessing(true);
      setProcessingAction('download');

      const htmlContent = generateInvoiceHTML();
      
      // const { uri } = await Print.printToFileAsync({
      //   html: htmlContent,
      //   base64: false,
      // });

      // const fileName = `Invoice_${invoice.invoiceNumber}_${Date.now()}.pdf`;
      // const newUri = `${FileSystem.documentDirectory}${fileName}`;
      // await FileSystem.moveAsync({
      //   from: uri,
      //   to: newUri,
      // });

      // Alert.alert(
      //   'Success',
      //   `Invoice downloaded successfully!\nSaved as: ${fileName}`,
      //   [{ text: 'OK', style: 'default' }]
      // );
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download invoice. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingAction(null);
    }
  };

  const handleShare = async () => {
    try {
      setIsProcessing(true);
      setProcessingAction('share');

      const htmlContent = generateInvoiceHTML();
      
      // const { uri } = await Print.printToFileAsync({
      //   html: htmlContent,
      //   base64: false,
      // });

      // if (await Sharing.isAvailableAsync()) {
      //   await Sharing.shareAsync(uri, {
      //     mimeType: 'application/pdf',
      //     dialogTitle: `Share Invoice ${invoice.invoiceNumber}`,
      //     UTI: 'com.adobe.pdf',
      //   });
      // } else {
      //   Alert.alert('Error', 'Sharing is not available on this device.');
      // }
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Failed to share invoice. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingAction(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return '#06D6A0';
      case 'PENDING':
        return '#F59E0B';
      case 'OVERDUE':
        return '#EF4444';
      case 'DRAFT':
        return '#6B7280';
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Header with Gradient */}
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
              <Text style={styles.headerTitle}>Invoice Preview</Text>
            </View>

            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Banner */}
        <Animated.View entering={FadeInDown.delay(100)}>
          <BlurView
            intensity={themeType === 'dark' ? 15 : 80}
            tint={themeType}
            style={styles.successBanner}
          >
            <LinearGradient
              colors={['rgba(6, 214, 160, 0.15)', 'rgba(6, 214, 160, 0.05)']}
              style={styles.successGradient}
            >
              <View style={styles.successIconContainer}>
                <CheckCircle size={20} color="#06D6A0" />
              </View>
              <View style={styles.successContent}>
                <Text style={[styles.successTitle, { color: theme.colors.text }]}>
                  Invoice Created Successfully!
                </Text>
                <Text style={[styles.successSubtitle, { color: theme.colors.textSecondary }]}>
                  {invoice.invoiceNumber} • {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(invoice.status)}20` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
                  {invoice.status}
                </Text>
              </View>
            </LinearGradient>
          </BlurView>
        </Animated.View>

        {/* A4 Invoice Preview */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <View style={styles.invoiceContainer}>
            <View style={[styles.a4Container, { backgroundColor: '#FFFFFF' }]}>
              {/* Invoice Header */}
              <View style={styles.invoiceHeader}>
                <Text style={styles.companyName}>{invoice.company.name}</Text>
                <View style={styles.invoiceNumberSection}>
                  <Text style={styles.invoiceLabel}>Invoice #:</Text>
                  <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
                </View>
              </View>

              {/* Company and Customer Info */}
              <View style={styles.contactsSection}>
                <View style={styles.contactContainer}>
                  <View style={styles.blueHeader}>
                    <Text style={styles.headerText}>From</Text>
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactName}>{invoice.company.name}</Text>
                    <Text style={styles.contactDetail}>{invoice.company.address.street}</Text>
                    <Text style={styles.contactDetail}>
                      {invoice.company.address.city}, {invoice.company.address.state}
                    </Text>
                    <Text style={styles.contactDetail}>{invoice.company.address.country}</Text>
                    <Text style={styles.contactDetail}>{invoice.company.address.pincode}</Text>
                    <Text style={styles.contactDetail}>{invoice.company.phone}</Text>
                  </View>
                </View>

                <View style={styles.contactContainer}>
                  <View style={styles.blueHeader}>
                    <Text style={styles.headerText}>To</Text>
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactName}>{invoice.customer.name}</Text>
                    <Text style={styles.contactDetail}>{invoice.customer.address.street}</Text>
                    <Text style={styles.contactDetail}>
                      {invoice.customer.address.city}, {invoice.customer.address.state}
                    </Text>
                    <Text style={styles.contactDetail}>{invoice.customer.address.country}</Text>
                    <Text style={styles.contactDetail}>{invoice.customer.address.pincode}</Text>
                    <Text style={styles.contactDetail}>{invoice.customer.phone}</Text>
                  </View>
                </View>
              </View>

              {/* Items Table */}
              <View style={styles.itemsSection}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { flex: 4 }]}>Description</Text>
                  <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'center' }]}>Unit Cost</Text>
                  <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'center' }]}>Rate/Hr</Text>
                  <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'right' }]}>Total</Text>
                </View>

                {/* Table Rows */}
                {invoice.items.map((item, index) => (
                  <View 
                    key={item.id} 
                    style={[
                      styles.tableRow,
                      { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8F9FA' }
                    ]}
                  >
                    <Text style={[styles.tableRowText, { flex: 4 }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'center' }]}>
                      ₹{item.unitPrice.toLocaleString('en-IN')}
                    </Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'center' }]}>
                      {item.quantity > 1 ? `${item.quantity} hrs` : '-'}
                    </Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'right', fontWeight: '600' }]}>
                      ₹{item.totalAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                ))}

                {/* Empty rows for visual balance */}
                {Array.from({ length: Math.max(0, 5 - invoice.items.length) }).map((_, index) => (
                  <View 
                    key={`empty-${index}`} 
                    style={[
                      styles.tableRow,
                      { backgroundColor: (invoice.items.length + index) % 2 === 0 ? '#FFFFFF' : '#F8F9FA' }
                    ]}
                  >
                    <Text style={[styles.tableRowText, { flex: 4 }]}>-</Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'center' }]}>-</Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'center' }]}>-</Text>
                    <Text style={[styles.tableRowText, { flex: 2, textAlign: 'right' }]}>-</Text>
                  </View>
                ))}
              </View>

              {/* Notes Section */}
              {invoice.notes && (
                <View style={styles.notesSection}>
                  <View style={styles.blueHeader}>
                    <Text style={styles.headerText}>Notes</Text>
                  </View>
                  <View style={styles.notesContent}>
                    <Text style={styles.notesText}>{invoice.notes}</Text>
                  </View>
                </View>
              )}

              {/* Totals Section */}
              <View style={styles.totalsSection}>
                <View style={styles.totalsContainer}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal</Text>
                    <Text style={styles.totalValue}>₹{invoice.totals.subtotal.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Discount</Text>
                    <Text style={styles.totalValue}>₹{invoice.totals.discountAmount.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal (discount)</Text>
                    <Text style={styles.totalValue}>₹{(invoice.totals.subtotal - invoice.totals.discountAmount).toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Tax rate</Text>
                    <Text style={styles.totalValue}>₹{invoice.totals.taxAmount.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total tax</Text>
                    <Text style={styles.totalValue}>₹{invoice.totals.taxAmount.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={[styles.totalRow, styles.grandTotalRow]}>
                    <Text style={styles.grandTotalLabel}>Total estimate</Text>
                    <Text style={styles.grandTotalValue}>₹{invoice.totals.finalAmount.toLocaleString('en-IN')}</Text>
                  </View>
                </View>
              </View>

              {/* Footer */}
              <View style={styles.invoiceFooter}>
                <Text style={styles.footerText}>This is a computer generated invoice and does not require a signature.</Text>
                <Text style={styles.footerText}>Generated on {new Date().toLocaleString('en-IN')}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Action Buttons Footer */}
      <BlurView
        intensity={themeType === 'dark' ? 20 : 80}
        tint={themeType}
        style={styles.footer}
      >
        <View style={styles.footerContent}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.printButton,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                opacity: isProcessing ? 0.5 : 1,
              },
            ]}
            disabled={isProcessing}
            onPress={handlePrint}
          >
            {isProcessing && processingAction === 'print' ? (
              <ActivityIndicator size="small" color={theme.colors.textSecondary} />
            ) : (
              <Printer size={16} color={theme.colors.textSecondary} />
            )}
            <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>
              Print
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.downloadButton,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                opacity: isProcessing ? 0.5 : 1,
              },
            ]}
            disabled={isProcessing}
            onPress={handleDownload}
          >
            {isProcessing && processingAction === 'download' ? (
              <ActivityIndicator size="small" color={theme.colors.textSecondary} />
            ) : (
              <Download size={16} color={theme.colors.textSecondary} />
            )}
            <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>
              Download
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.shareButton,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.primary,
                opacity: isProcessing ? 0.5 : 1,
              },
            ]}
            disabled={isProcessing}
            onPress={handleShare}
          >
            <LinearGradient
              colors={[
                theme.colors.primary,
                theme.colors.primaryLight || theme.colors.primary,
              ]}
              style={styles.shareGradient}
            >
              <View style={styles.shareButtonContent}>
                {isProcessing && processingAction === 'share' ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Share size={16} color="#FFFFFF" />
                )}
                <Text style={styles.shareButtonText}>Share</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles:any = StyleSheet.create({
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
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 200,
  },
  successBanner: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 214, 160, 0.2)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  successGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  successIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 214, 160, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    flex: 1,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  successSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // A4 Invoice Styles
  invoiceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  a4Container: {
    width: INVOICE_WIDTH,
    minHeight: INVOICE_HEIGHT * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  companyName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  invoiceNumberSection: {
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  contactsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  contactContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  blueHeader: {
    backgroundColor: '#5B9BD5',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contactContent: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  contactName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 2,
  },
  itemsSection: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5B9BD5',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
    minHeight: 32,
  },
  tableRowText: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: '400',
  },
  notesSection: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notesContent: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  notesText: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
  },
  totalsSection: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  totalsContainer: {
    minWidth: 250,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4B5563',
  },
  totalValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
  },
  grandTotalRow: {
    borderTopWidth: 2,
    borderTopColor: '#1F2937',
    paddingTop: 8,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Action Buttons Footer
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  footerContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 6,
  },
  printButton: {
    borderWidth: 1,
  },
  downloadButton: {
    borderWidth: 1,
  },
  shareButton: {
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 3px 10px rgba(99, 102, 241, 0.25)',
      },
    }),
  },
  shareGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  shareButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});