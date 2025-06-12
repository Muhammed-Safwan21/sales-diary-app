// // First, install the required dependencies:
// // expo install expo-print expo-sharing expo-file-system expo-linking

// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import * as Linking from 'expo-linking';
// import { Alert, Platform } from 'react-native';

// // Add these interfaces at the top of your file
// interface PDFGenerationOptions {
//   summaryData: SummaryCard[];
//   salesData: SalesData[];
//   dateRange: string;
//   statusFilter: string;
//   totalSales: string;
//   totalOrders: number;
//   themeType: 'light' | 'dark';
// }

// // Add this function to generate HTML content for PDF
// const generatePDFHTML = (options: PDFGenerationOptions): string => {
//   const { summaryData, salesData, dateRange, statusFilter, totalSales, totalOrders, themeType } = options;

//   const isDark = themeType === 'dark';
//   const bgColor = isDark ? '#1a1b3a' : '#ffffff';
//   const textColor = isDark ? '#ffffff' : '#000000';
//   const secondaryTextColor = isDark ? '#9ca3af' : '#6b7280';
//   const borderColor = isDark ? '#374151' : '#e5e7eb';

//   const currentDate = new Date().toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
//   });

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Sales Report</title>
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           background-color: ${bgColor};
//           color: ${textColor};
//           line-height: 1.6;
//           padding: 20px;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 30px;
//           padding: 20px;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           border-radius: 12px;
//           color: white;
//         }

//         .header h1 {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 8px;
//         }

//         .header p {
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         .report-meta {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 30px;
//           padding: 15px;
//           background-color: ${isDark ? '#374151' : '#f9fafb'};
//           border-radius: 8px;
//           border: 1px solid ${borderColor};
//         }

//         .report-meta div {
//           text-align: center;
//         }

//         .report-meta strong {
//           display: block;
//           font-size: 12px;
//           color: ${secondaryTextColor};
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .report-meta span {
//           font-size: 16px;
//           font-weight: 600;
//           margin-top: 4px;
//           display: block;
//         }

//         .summary-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 20px;
//           margin-bottom: 30px;
//         }

//         .summary-card {
//           padding: 20px;
//           border-radius: 12px;
//           border: 1px solid ${borderColor};
//           background-color: ${isDark ? '#374151' : '#ffffff'};
//           text-align: center;
//         }

//         .summary-card h3 {
//           font-size: 12px;
//           color: ${secondaryTextColor};
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 8px;
//           font-weight: 600;
//         }

//         .summary-card .value {
//           font-size: 24px;
//           font-weight: 700;
//           margin-bottom: 4px;
//           color: #6366f1;
//         }

//         .summary-card .change {
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .change.positive {
//           color: #10b981;
//         }

//         .change.negative {
//           color: #ef4444;
//         }

//         .section-title {
//           font-size: 20px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           color: ${textColor};
//           border-bottom: 2px solid #6366f1;
//           padding-bottom: 8px;
//         }

//         .sales-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 30px;
//           background-color: ${isDark ? '#374151' : '#ffffff'};
//           border-radius: 8px;
//           overflow: hidden;
//           border: 1px solid ${borderColor};
//         }

//         .sales-table th {
//           background-color: #6366f1;
//           color: white;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .sales-table td {
//           padding: 12px;
//           border-bottom: 1px solid ${borderColor};
//           font-size: 14px;
//         }

//         .sales-table tr:last-child td {
//           border-bottom: none;
//         }

//         .status-badge {
//           padding: 4px 8px;
//           border-radius: 6px;
//           font-size: 11px;
//           font-weight: 600;
//           text-transform: capitalize;
//         }

//         .status-paid {
//           background-color: rgba(16, 185, 129, 0.15);
//           color: #10b981;
//         }

//         .status-pending {
//           background-color: rgba(245, 158, 11, 0.15);
//           color: #f59e0b;
//         }

//         .status-overdue {
//           background-color: rgba(239, 68, 68, 0.15);
//           color: #ef4444;
//         }

//         .footer {
//           margin-top: 40px;
//           padding: 20px;
//           text-align: center;
//           border-top: 1px solid ${borderColor};
//           color: ${secondaryTextColor};
//           font-size: 12px;
//         }

//         @media print {
//           body {
//             padding: 10px;
//           }

//           .summary-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <h1>📊 Sales Report</h1>
//         <p>Generated on ${currentDate}</p>
//       </div>

//       <div class="report-meta">
//         <div>
//           <strong>Date Range</strong>
//           <span>${dateRange}</span>
//         </div>
//         <div>
//           <strong>Status Filter</strong>
//           <span>${statusFilter}</span>
//         </div>
//         <div>
//           <strong>Total Records</strong>
//           <span>${salesData.length}</span>
//         </div>
//       </div>

//       <h2 class="section-title">📈 Summary Overview</h2>
//       <div class="summary-grid">
//         ${summaryData.map(card => `
//           <div class="summary-card">
//             <h3>${card.title}</h3>
//             <div class="value">${card.value}</div>
//             ${card.change ? `<div class="change ${card.changeType}">${card.change}</div>` : ''}
//             ${card.subValue ? `<div style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">${card.subValue}</div>` : ''}
//           </div>
//         `).join('')}
//       </div>

//       <h2 class="section-title">📋 Sales Transactions</h2>
//       <table class="sales-table">
//         <thead>
//           <tr>
//             <th>Invoice</th>
//             <th>Customer</th>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Items</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${salesData.map(sale => `
//             <tr>
//               <td>${sale.invoiceNumber}</td>
//               <td>${sale.customerName}</td>
//               <td>${new Date(sale.date).toLocaleDateString('en-IN')}</td>
//               <td>₹${sale.amount.toLocaleString()}</td>
//               <td>${sale.items}</td>
//               <td><span class="status-badge status-${sale.status}">${sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}</span></td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>

//       <div class="footer">
//         <p>This report was generated automatically by your Sales Management System</p>
//         <p>Report ID: RPT-${Date.now()}</p>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // Add these functions to your component
// const generatePDF = async (): Promise<string | null> => {
//   try {
//     const pdfOptions: PDFGenerationOptions = {
//       summaryData,
//       salesData: filteredSalesData,
//       dateRange: selectedDateRange,
//       statusFilter: selectedStatus,
//       totalSales: summaryData[0]?.value || '₹0',
//       totalOrders: filteredSalesData.length,
//       themeType: themeType || 'light'
//     };

//     const html = generatePDFHTML(pdfOptions);

//     const { uri } = await Print.printToFileAsync({
//       html,
//       base64: false,
//       margins: {
//         left: 20,
//         top: 20,
//         right: 20,
//         bottom: 20,
//       },
//     });

//     return uri;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     Alert.alert('Error', 'Failed to generate PDF report');
//     return null;
//   }
// };

// const downloadPDF = async (): Promise<void> => {
//   try {
//     const pdfUri = await generatePDF();
//     if (!pdfUri) return;

//     const fileName = `sales_report_${new Date().toISOString().split('T')[0]}.pdf`;
//     const documentDirectory = FileSystem.documentDirectory;
//     const newUri = `${documentDirectory}${fileName}`;

//     // Copy the PDF to a permanent location
//     await FileSystem.copyAsync({
//       from: pdfUri,
//       to: newUri,
//     });

//     // Check if sharing is available
//     const canShare = await Sharing.isAvailableAsync();

//     if (canShare) {
//       await Sharing.shareAsync(newUri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Save Sales Report',
//         UTI: 'com.adobe.pdf',
//       });
//     } else {
//       Alert.alert(
//         'PDF Generated',
//         `Your report has been saved to: ${newUri}`,
//         [{ text: 'OK' }]
//       );
//     }
//   } catch (error) {
//     console.error('Error downloading PDF:', error);
//     Alert.alert('Error', 'Failed to download PDF report');
//   }
// };

// const shareToWhatsApp = async (): Promise<void> => {
//   try {
//     const pdfUri = await generatePDF();
//     if (!pdfUri) return;

//     const fileName = `sales_report_${new Date().toISOString().split('T')[0]}.pdf`;
//     const documentDirectory = FileSystem.documentDirectory;
//     const newUri = `${documentDirectory}${fileName}`;

//     // Copy the PDF to a permanent location
//     await FileSystem.copyAsync({
//       from: pdfUri,
//       to: newUri,
//     });

//     // Create a summary message
//     const totalSales = summaryData[0]?.value || '₹0';
//     const totalOrders = filteredSalesData.length;
//     const message = `📊 Sales Report Summary\n\n` +
//       `📅 Period: ${selectedDateRange}\n` +
//       `💰 Total Sales: ${totalSales}\n` +
//       `📦 Total Orders: ${totalOrders}\n` +
//       `📈 Status: ${selectedStatus}\n\n` +
//       `Find the detailed PDF report attached.`;

//     if (Platform.OS === 'ios') {
//       // For iOS, we can use the share sheet which includes WhatsApp
//       const canShare = await Sharing.isAvailableAsync();
//       if (canShare) {
//         await Sharing.shareAsync(newUri, {
//           mimeType: 'application/pdf',
//           dialogTitle: 'Share Sales Report',
//           UTI: 'com.adobe.pdf',
//         });
//       }
//     } else {
//       // For Android, try to open WhatsApp directly
//       const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}`;

//       const canOpenWhatsApp = await Linking.canOpenURL(whatsappURL);

//       if (canOpenWhatsApp) {
//         // First share the PDF through the system share sheet
//         await Sharing.shareAsync(newUri, {
//           mimeType: 'application/pdf',
//           dialogTitle: 'Share to WhatsApp',
//         });

//         // Then show an alert with instructions
//         Alert.alert(
//           'Share to WhatsApp',
//           'PDF saved! You can now attach it in WhatsApp or any other app.',
//           [
//             {
//               text: 'Open WhatsApp',
//               onPress: () => Linking.openURL(whatsappURL),
//             },
//             { text: 'Cancel', style: 'cancel' },
//           ]
//         );
//       } else {
//         // WhatsApp not installed, just share normally
//         await Sharing.shareAsync(newUri, {
//           mimeType: 'application/pdf',
//           dialogTitle: 'Share Sales Report',
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error sharing to WhatsApp:', error);
//     Alert.alert('Error', 'Failed to share report to WhatsApp');
//   }
// };

// // Update your handleShare function
// const handleShare = async (type: 'whatsapp' | 'pdf'): Promise<void> => {
//   setShowShareModal(false);

//   if (type === 'whatsapp') {
//     await shareToWhatsApp();
//   } else {
//     await downloadPDF();
//   }
// };

// // Export the functions for use in your component
// export {
//   generatePDF,
//   downloadPDF,
//   shareToWhatsApp,
//   generatePDFHTML,
//   type PDFGenerationOptions
// };
