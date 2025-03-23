// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
// } from 'react-native';
// import * as Print from 'expo-print';
// import ThermalPrinterModule from 'react-native-thermal-printer';

// // Order data type
// interface OrderItem {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   id: string;
//   items: OrderItem[];
//   total: number;
//   timestamp: Date;
// }

// // Thermal printer config
// ThermalPrinterModule.defaultConfig = {
//   ...ThermalPrinterModule.defaultConfig,
//   ip: '192.168.1.100', // Replace with your printer's IP
//   port: 9100,
//   autoCut: true,
//   timeout: 30000,
// };

// const SimplifiedPrintScreen = () => {
//   const [isPrinting, setIsPrinting] = useState(false);

//   // Sample order data
//   const orderDetails: OrderDetails = {
//     id: '12345',
//     timestamp: new Date(),
//     items: [
//       { name: 'Hamburger', price: 5.99, quantity: 2 },
//       { name: 'French Fries', price: 2.99, quantity: 1 },
//       { name: 'Soda', price: 1.99, quantity: 2 },
//     ],
//     total: 18.95,
//   };

//   // Format date for receipt
//   const formatDate = (date: Date): string => {
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   };

//   // Print to thermal printer
//   const printReceipt = async () => {
//     setIsPrinting(true);
    
//     try {
//       // Simple receipt format
//       const receipt = `
// [C]RECEIPT
// [C]ORDER #${orderDetails.id}
// [C]${formatDate(orderDetails.timestamp)}
// [L]--------------------------------
// ${orderDetails.items
//   .map((item) => `[L]${item.quantity}x ${item.name}[R]$${(item.price * item.quantity).toFixed(2)}`)
//   .join('\n')}
// [L]--------------------------------
// [L]SUBTOTAL[R]$${orderDetails.total.toFixed(2)}
// [L]TAX[R]$${(orderDetails.total * 0.08).toFixed(2)}
// [L]--------------------------------
// [L]TOTAL[R]$${(orderDetails.total * 1.08).toFixed(2)}
// [C]
// [C]Thank you for your purchase!
// [C]
// [C]
// `;

//       if (Platform.OS === 'android') {
//         // Bluetooth printing (ensure printer is paired)
//         await ThermalPrinterModule.printBluetooth({ payload: receipt });
//       } else {
//         // Network printing (Wi-Fi)
//         await ThermalPrinterModule.printTcp({ payload: receipt });
//       }
      
//       Alert.alert('Success', 'Receipt printed!');
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Failed to print receipt.');
//     } finally {
//       setIsPrinting(false);
//     }
//   };

//   // Generate HTML for preview or PDF (simpler version)
//   const generatePrintPreview = async () => {
//     const htmlContent = `
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: 'Courier New', monospace;
//               padding: 10px;
//               max-width: 300px;
//               margin: 0 auto;
//             }
//             .header {
//               text-align: center;
//               font-size: 14px;
//               margin-bottom: 10px;
//             }
//             .divider {
//               border-top: 1px dashed #000;
//               margin: 5px 0;
//             }
//             .item {
//               display: flex;
//               justify-content: space-between;
//               font-size: 12px;
//               margin: 3px 0;
//             }
//             .total {
//               font-weight: bold;
//               margin-top: 5px;
//             }
//             .footer {
//               text-align: center;
//               font-size: 12px;
//               margin-top: 10px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             RECEIPT<br>
//             ORDER #${orderDetails.id}<br>
//             ${formatDate(orderDetails.timestamp)}
//           </div>
//           <div class="divider"></div>
//           ${orderDetails.items
//             .map(
//               (item) =>
//                 `<div class="item"><span>${item.quantity}x ${item.name}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`
//             )
//             .join('')}
//           <div class="divider"></div>
//           <div class="item"><span>SUBTOTAL</span><span>$${orderDetails.total.toFixed(2)}</span></div>
//           <div class="item"><span>TAX</span><span>$${(orderDetails.total * 0.08).toFixed(2)}</span></div>
//           <div class="divider"></div>
//           <div class="item total"><span>TOTAL</span><span>$${(orderDetails.total * 1.08).toFixed(2)}</span></div>
//           <div class="footer">
//             Thank you for your purchase!
//           </div>
//         </body>
//       </html>
//     `;
    
//     try {
//       await Print.printAsync({ html: htmlContent });
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Failed to print preview.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={printReceipt}
//         disabled={isPrinting}
//       >
//         <Text style={styles.buttonText}>{isPrinting ? 'Printing...' : 'Print Receipt'}</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={generatePrintPreview}
//       >
//         <Text style={styles.buttonText}>Print Preview</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   button: {
//     backgroundColor: '#f2f2f2',
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     marginVertical: 10,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#333333',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default SimplifiedPrintScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import ThermalPrinterModule from 'react-native-thermal-printer';

// Order data type
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
}

// Thermal printer config
ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.1.100', // Replace with your printer's IP
  port: 9100,
  autoCut: true,
  timeout: 30000,
};

const SimplifiedPrintScreen = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  // Sample order data
  const orderDetails: OrderDetails = {
    id: '12345',
    timestamp: new Date(),
    items: [
      { name: 'Hamburger', price: 5.99, quantity: 2 },
      { name: 'French Fries', price: 2.99, quantity: 1 },
      { name: 'Soda', price: 1.99, quantity: 2 },
    ],
    total: 18.95,
  };

  // Format date for receipt
  const formatDate = (date: Date): string => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // HTML content for receipt
  const getReceiptHtml = () => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 10px;
              max-width: 300px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 5px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin: 3px 0;
            }
            .total {
              font-weight: bold;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            RECEIPT<br>
            ORDER #${orderDetails.id}<br>
            ${formatDate(orderDetails.timestamp)}
          </div>
          <div class="divider"></div>
          ${orderDetails.items
            .map(
              (item) =>
                `<div class="item"><span>${item.quantity}x ${item.name}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`
            )
            .join('')}
          <div class="divider"></div>
          <div class="item"><span>SUBTOTAL</span><span>$${orderDetails.total.toFixed(2)}</span></div>
          <div class="item"><span>TAX</span><span>$${(orderDetails.total * 0.08).toFixed(2)}</span></div>
          <div class="divider"></div>
          <div class="item total"><span>TOTAL</span><span>$${(orderDetails.total * 1.08).toFixed(2)}</span></div>
          <div class="footer">
            Thank you for your purchase!
          </div>
        </body>
      </html>
    `;
  };

  // Print to thermal printer
  const printReceipt = async () => {
    setIsPrinting(true);
    
    try {
      // Simple receipt format for thermal printer
      const receipt = `
[C]RECEIPT
[C]ORDER #${orderDetails.id}
[C]${formatDate(orderDetails.timestamp)}
[L]--------------------------------
${orderDetails.items
  .map((item) => `[L]${item.quantity}x ${item.name}[R]$${(item.price * item.quantity).toFixed(2)}`)
  .join('\n')}
[L]--------------------------------
[L]SUBTOTAL[R]$${orderDetails.total.toFixed(2)}
[L]TAX[R]$${(orderDetails.total * 0.08).toFixed(2)}
[L]--------------------------------
[L]TOTAL[R]$${(orderDetails.total * 1.08).toFixed(2)}
[C]
[C]Thank you for your purchase!
[C]
[C]
`;

      if (Platform.OS === 'android') {
        // Bluetooth printing (ensure printer is paired)
        await ThermalPrinterModule.printBluetooth({ payload: receipt });
      } else {
        // Network printing (Wi-Fi)
        await ThermalPrinterModule.printTcp({ payload: receipt });
      }
      
      Alert.alert('Success', 'Receipt printed!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to print receipt.');
    } finally {
      setIsPrinting(false);
    }
  };

  // Generate PDF for preview, download or sharing
  const generatePDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: getReceiptHtml(),
        base64: false
      });
      setPdfUri(uri);
      return uri;
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to generate PDF.');
      return null;
    }
  };

  // Generate HTML for preview
  const generatePrintPreview = async () => {
    try {
      await Print.printAsync({ html: getReceiptHtml() });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to print preview.');
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
      // First generate PDF if not already generated
      const uri = pdfUri || await generatePDF();
      if (!uri) return;
      
      const downloadDir = FileSystem.documentDirectory;
      const fileName = `receipt_${orderDetails.id}_${Date.now()}.pdf`;
      const destinationUri = `${downloadDir}${fileName}`;
      
      // Copy the file to the documents directory
      await FileSystem.copyAsync({
        from: uri,
        to: destinationUri
      });
      
      Alert.alert('Success', `Receipt saved as ${fileName}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to download receipt.');
    }
  };

  // Share PDF
  const sharePDF = async () => {
    try {
      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }
      
      // First generate PDF if not already generated
      const uri = pdfUri || await generatePDF();
      if (!uri) return;
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Receipt',
        UTI: 'com.adobe.pdf' // for iOS
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to share receipt.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={printReceipt}
        disabled={isPrinting}
      >
        <Text style={styles.buttonText}>{isPrinting ? 'Printing...' : 'Print Receipt'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={generatePrintPreview}
      >
        <Text style={styles.buttonText}>Print Preview</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={downloadPDF}
      >
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={sharePDF}
      >
        <Text style={styles.buttonText}>Share Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SimplifiedPrintScreen;