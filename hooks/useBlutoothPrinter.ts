import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  ToastAndroid,
} from 'react-native';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';
import * as ExpoDevice from 'expo-device';

interface BluetoothDevice {
  inner_mac_address?: string;
  address?: string;
  mac?: string;
  device_name?: string;
  name?: string;
}

// Enhanced Bluetooth Connection Hook
export const useBluetoothPrinter = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if we're on a real device
  const isRealDevice = ExpoDevice.isDevice;

  // Request all necessary permissions for Android
  const requestBluetoothPermissions = async () => {
    if (Platform.OS !== 'android') {
      return true; // iOS doesn't need these permissions
    }

    if (!isRealDevice) {
      Alert.alert('Error', 'Bluetooth is not available on emulator');
      return false;
    }

    try {
      // For Android 12+ (API 31+), we need different permissions
      const androidVersion = Platform.Version;
      console.log('Android Version:', androidVersion);

      let permissions = [];
      
      if (androidVersion >= 31) {
        // Android 12+ permissions
        permissions = [
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];
      } else {
        // Android 11 and below permissions
        permissions = [
        //   PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];
      }

      console.log('Requesting permissions:', permissions);

      const results = await PermissionsAndroid.requestMultiple(permissions);
      console.log('Permission results:', results);

      // Check if all permissions are granted
      const allGranted = Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        Alert.alert(
          'Permissions Required',
          'This app needs Bluetooth and Location permissions to connect to printers. Please enable them in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Error', 'Failed to request permissions');
      return false;
    }
  };

  // Initialize printer
  const initializePrinter = async () => {
    try {
      console.log('Initializing printer...');
      const result = await BLEPrinter.init();
      console.log('Printer initialization result:', result);
      setIsInitialized(true);
      return true;
    } catch (error:any) {
      console.error('Printer initialization error:', error);
      
      // Check if it's a Bluetooth disabled error
      if (error.message && error.message.includes('Bluetooth')) {
        Alert.alert(
          'Bluetooth Disabled',
          'Please enable Bluetooth to use the printer.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Enable Bluetooth', 
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS');
                } else {
                  Linking.openSettings();
                }
              }
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to initialize printer');
      }
      return false;
    }
  };

  // Scan for Bluetooth devices
  const scanForDevices = async () => {
    try {
      console.log('Scanning for devices...');
      
      // Add a small delay to ensure Bluetooth is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const devices = await BLEPrinter.getDeviceList();
      console.log('Found devices:', devices);
      
      return devices || [];
    } catch (error) {
      console.error('Device scan error:', error);
      throw error;
    }
  };

  // Connect to a specific device
  const connectToDevice = async (device: { inner_mac_address?: string; address?: string; mac?: string; device_name?: string; name?: string }) => {
    try {
      console.log('Connecting to device:', device);
      
      // Use the correct property for connection
      const deviceAddress = device.inner_mac_address || device.address || device.mac;
      
      if (!deviceAddress) {
        throw new Error('Device address not found');
      }

      await BLEPrinter.connectPrinter(deviceAddress);
      
      // Verify connection by trying to print
      try {
        await BLEPrinter.printText('');
        setConnectedDevice(device);
        if (Platform.OS === 'android') {
          ToastAndroid.show(`Connected to ${device.device_name || device.name}`, ToastAndroid.SHORT);
        }
        return true;
      } catch (error) {
        throw new Error('Connection verification failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  };

  // Main connection handler
  const handleConnectPrinter = async () => {
    if (isConnecting) return;

    setIsConnecting(true);

    try {
      // Step 1: Check device capability
      if (!isRealDevice) {
        Alert.alert('Error', 'Bluetooth is not available on emulator');
        return;
      }

      // Step 2: Request permissions
      const hasPermissions = await requestBluetoothPermissions();
      if (!hasPermissions) {
        return;
      }

      // Step 3: Initialize printer
      if (!isInitialized) {
        const initialized = await initializePrinter();
        if (!initialized) {
          return;
        }
      }

      // Step 4: Scan for devices
      const devices = await scanForDevices();
      
      if (devices.length === 0) {
        Alert.alert(
          'No Printers Found',
          'Make sure your printer is:\n• Turned on\n• In pairing mode\n• Within range',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Scan Again', onPress: handleConnectPrinter },
          ]
        );
        return;
      }

      // Step 5: Show device selection
      const deviceOptions = devices.map((device:any) => ({
        text: device.device_name || device.name || 'Unknown Device',
        onPress: async () => {
          try {
            setIsConnecting(true);
            await connectToDevice(device);
            Alert.alert('Success', `Connected to ${device.device_name || device.name}`);
          } catch (error:any) {
            console.error('Connection failed:', error);
            Alert.alert(
              'Connection Failed',
              error.message || 'Failed to connect to printer',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Try Again', onPress: () => connectToDevice(device) },
              ]
            );
          } finally {
            setIsConnecting(false);
          }
        },
      }));

      Alert.alert(
        'Select Printer',
        'Choose a printer to connect:',
        [
          ...deviceOptions,
          { text: 'Cancel', style: 'cancel' },
        ]
      );

    } catch (error:any) {
      console.error('Connection process error:', error);
      Alert.alert(
        'Connection Error',
        error.message || 'An error occurred while connecting to the printer',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Try Again', onPress: handleConnectPrinter },
        ]
      );
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from printer
  const disconnectPrinter = async () => {
    try {
      await BLEPrinter.closeConn();
      setConnectedDevice(null);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Printer disconnected', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  // Check connection status
  const checkConnection = async () => {
    try {
      await BLEPrinter.printText('');  // Try to print empty text
      return true;
    } catch (error) {
      setConnectedDevice(null);
      return false;
    }
  };

  return {
    isConnecting,
    connectedDevice,
    handleConnectPrinter,
    disconnectPrinter,
    checkConnection,
    isInitialized,
  };
};

// Enhanced Thermal Template with better error handling
export const printThermalReceipt = async (product:any, table:any, Auth:any) => {
  try {
    // Check if printer is connected by attempting to print
    await BLEPrinter.printText('');

    // Print with better formatting
    await BLEPrinter.printText('SALES DIARY\n');
    await BLEPrinter.printText('================================\n');
    await BLEPrinter.printText('GSTIN: 32ASDF9156G1ZP\n');
    await BLEPrinter.printText('NR BYPASS JUNCTION\n');
    await BLEPrinter.printText('PH: +91 1234567890\n');
    await BLEPrinter.printText('================================\n');
    
    await BLEPrinter.printText(`Bill No: ${product?.orderId || 'N/A'}\n`);
    await BLEPrinter.printText(`Token: ${product?.tokenNo || 'N/A'}\n`);
    await BLEPrinter.printText(`Table: ${table?.table_number || 'N/A'}\n`);
    await BLEPrinter.printText(`Date: ${new Date().toLocaleDateString()}\n`);
    await BLEPrinter.printText(`Time: ${new Date().toLocaleTimeString()}\n`);
    await BLEPrinter.printText(`Waiter: ${product?.staff || 'N/A'}\n`);
    
    await BLEPrinter.printText('================================\n');
    await BLEPrinter.printText('ITEMS:\n');
    await BLEPrinter.printText('--------------------------------\n');

    // Print items
    if (product?.orderItems && product.orderItems.length > 0) {
      for (const item of product.orderItems) {
        const name = item?.idescription || 'Unknown Item';
        const qty = item?.quantity || 0;
        const price = item?.sp_price || 0;
        const total = qty * price;
        
        await BLEPrinter.printText(`${name}\n`);
        await BLEPrinter.printText(`  ${qty} x ${price.toFixed(2)} = ${total.toFixed(2)}\n`);
        await BLEPrinter.printText('--------------------------------\n');
      }
    }

    await BLEPrinter.printText(`TOTAL: ${(product?.total || 0).toFixed(2)}\n`);
    await BLEPrinter.printText('================================\n');
    await BLEPrinter.printText('Thank you for your visit!\n');
    await BLEPrinter.printText('\n\n\n');
    
    // Cut paper if supported
    await BLEPrinter.printText('', { cut: true });

    if (Platform.OS === 'android') {
      ToastAndroid.show('Receipt printed successfully', ToastAndroid.SHORT);
    }

  } catch (error:any) {
    console.log('Print error:', error);
    
    let errorMessage = 'Failed to print receipt';
    if (error.message.includes('not connected')) {
      errorMessage = 'Printer not connected. Please connect first.';
    } else if (error.message.includes('Bluetooth')) {
      errorMessage = 'Bluetooth connection error. Please check your printer.';
    }

    if (Platform.OS === 'android') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } else {
      Alert.alert('Print Error', errorMessage);
    }
    
    throw error;
  }
};