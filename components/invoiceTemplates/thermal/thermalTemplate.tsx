import moment from 'moment';
import { ToastAndroid, Platform, Alert } from 'react-native';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';

// Define printer options interface
interface PrinterOptions {
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  size?: number;
  width?: number;
  height?: number;
}

const ThermalTemplate = async (product: any, table: any, Auth: any) => {
  try {
    // Initialize printer
    await BLEPrinter.init();

    // Store Header
    await BLEPrinter.printText('SALES DIARY\n');
    await BLEPrinter.printText('\n');
    await BLEPrinter.printText('GSTIN: 32ASDF9156G1ZP\n');
    await BLEPrinter.printText('NR BYPASS JUNCTION\n');
    await BLEPrinter.printText('PH: +91 1234567890\n');
    await BLEPrinter.printText(`Bill No: ${product?.orderId || '00'}\n`);

    // Token Divider
    await BLEPrinter.printText('--------------------------------\n');

    // Token and Table Info
    await BLEPrinter.printText(`Token: ${product?.tokenNo || 0}    Table: ${table?.table_number || 0}\n`);

    // Second Divider
    await BLEPrinter.printText('--------------------------------\n');

    // Date and Employee Info
    await BLEPrinter.printText(`Date & Time: ${moment().format('DD/MM/YYYY HH:mm')}\n`);
    await BLEPrinter.printText(`Waiter: ${product?.staff || 'N/A'}\n`);

    await BLEPrinter.printText('--------------------------------\n');

    // Item Header
    await BLEPrinter.printText('Item                Tax   Qty   Price   Total\n');
    await BLEPrinter.printText('--------------------------------\n');

    // Print each item
    for (let item of product?.orderItems || []) {
      const itemName = item?.idescription || 'Unknown Item';
      const taxRate = item?.vat ? `${item?.vat}%` : '5%';
      const quantity = item?.quantity?.toString() || '0';
      const price = Number(item?.sp_price || 0).toFixed(2);
      const total = Number(Number(item?.sp_price || 0) * Number(item?.quantity || 0)).toFixed(2);

      // Format the line with fixed widths
      const line = `${itemName.padEnd(20)} ${taxRate.padStart(4)} ${quantity.padStart(4)} ${price.padStart(7)} ${total.padStart(7)}\n`;
      await BLEPrinter.printText(line);
    }

    // Divider before totals
    await BLEPrinter.printText('--------------------------------\n');

    // Total Amount
    await BLEPrinter.printText(`Total Amount: ${Number(product?.total || 0).toFixed(2)}\n`);

    // Print barcode ID as text since barcode printing is not supported
    if (product?.barcodeId) {
      await BLEPrinter.printText('\n');
      await BLEPrinter.printText(`Barcode ID: ${product.barcodeId}\n`);
      await BLEPrinter.printText('\n');
    }

    await BLEPrinter.printText('--------------------------------\n');

    // GST Calculations
    const total = Number(product?.total || 0);
    const taxableAmount = (total / 1.05).toFixed(2);
    const totalGST = (total - Number(taxableAmount)).toFixed(2);
    const cgst = (Number(totalGST) / 2).toFixed(2);
    const sgst = (Number(totalGST) / 2).toFixed(2);

    await BLEPrinter.printText('GST Details:\n');
    await BLEPrinter.printText(`Taxable Amount: ${taxableAmount}\n`);
    await BLEPrinter.printText(`CGST (2.5%): ${cgst}\n`);
    await BLEPrinter.printText(`SGST (2.5%): ${sgst}\n`);

    // Divider before footer
    await BLEPrinter.printText('--------------------------------\n');

    await BLEPrinter.printText('Thank you visit again\n');

    // Add some line feeds and print with cut option
    await BLEPrinter.printText('\n\n\n\n\n', { cut: true });

  } catch (error) {
    console.error('Print error:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Printer not connected. Please check connection',
        ToastAndroid.SHORT,
      );
    } else {
      Alert.alert('Error', 'Printer not connected. Please check connection');
    }
  }
};

export default ThermalTemplate;