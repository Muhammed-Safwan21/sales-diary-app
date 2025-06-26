import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Animated,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  X,
  Printer,
  Bluetooth,
  Settings,
  Check,
  ChevronRight,
  Wifi,
  Save,
} from 'lucide-react-native';

interface Device {
  name: string;
  address?: string;
  connected?: boolean;
}

interface PrinterSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
  initialValues?: {
    printerType?: 'regular' | 'thermal';
    pageSize?: string;
    thermalFormat?: 'modern' | 'old';
    selectedDevice?: Device | null;
  };
  devices?: Device[];
  onConnectDevice?: (device: Device) => void;
  onDisconnectDevice?: (device: Device) => void;
}

export const PrinterSettingsModal: React.FC<PrinterSettingsModalProps> = ({
  visible,
  onClose,
  onSave,
  initialValues = {},
  devices = [],
  onConnectDevice,
  onDisconnectDevice,
}) => {
  const { theme, themeType }: any = useTheme();
  const modalStyles = getModalStyles(themeType);

  const [printerType, setPrinterType] = React.useState<'regular' | 'thermal'>(
    initialValues.printerType || 'regular'
  );
  const [pageSize, setPageSize] = React.useState(
    initialValues.pageSize || (printerType === 'regular' ? 'A4' : '2inch')
  );
  const [thermalFormat, setThermalFormat] = React.useState<'modern' | 'old'>(
    initialValues.thermalFormat || 'modern'
  );
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(
    initialValues.selectedDevice || null
  );
  const [showDeviceList, setShowDeviceList] = React.useState(false);

  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  React.useEffect(() => {
    if (printerType === 'regular') {
      setPageSize(pageSize === 'A4' || pageSize === 'A5' ? pageSize : 'A4');
    } else {
      setPageSize(
        pageSize === '2inch' || pageSize === '3inch' ? pageSize : '2inch'
      );
    }
  }, [printerType]);

  const handleSave = () => {
    onSave({ printerType, pageSize, thermalFormat, selectedDevice });
    onClose();
  };

  const handleConnect = (device: Device) => {
    setSelectedDevice(device);
    if (onConnectDevice) onConnectDevice(device);
    setShowDeviceList(false);
  };

  const handleDisconnect = () => {
    setSelectedDevice(null);
    if (onDisconnectDevice && selectedDevice)
      onDisconnectDevice(selectedDevice);
  };

  // Enhanced Device List Modal
  const renderDeviceList = () => (
    <Modal
      visible={showDeviceList}
      animationType="slide"
      transparent
      onRequestClose={() => setShowDeviceList(false)}
    >
      <View style={modalStyles.deviceListOverlay}>
        <Animated.View
          style={[
            modalStyles.deviceListContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Enhanced Header */}
          <BlurView
            intensity={themeType === 'dark' ? 20 : 80}
            tint={themeType}
            style={modalStyles.deviceListHeader}
          >
            <LinearGradient
              colors={[
                `${theme.colors.primary}20`,
                `${theme.colors.primary}05`,
                'transparent',
              ]}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={modalStyles.deviceHeaderContent}>
              <View style={modalStyles.deviceHeaderLeft}>
                <View
                  style={[
                    modalStyles.iconContainer,
                    { backgroundColor: `${theme.colors.primary}15` },
                  ]}
                >
                  <Bluetooth size={20} color={theme.colors.primary} />
                </View>
                <Text
                  style={[
                    modalStyles.deviceListTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Available Devices
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  modalStyles.closeBtn,
                  { backgroundColor: `${theme.colors.textSecondary}10` },
                ]}
                onPress={() => setShowDeviceList(false)}
              >
                <X size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </BlurView>

          <FlatList
            data={devices}
            keyExtractor={(item) => item.address || item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 8 }}
            renderItem={({ item, index }) => (
              <Animated.View
                style={[
                  modalStyles.deviceItemContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    modalStyles.deviceItem,
                    {
                      backgroundColor: item.connected
                        ? `${theme.colors.primary}08`
                        : 'transparent',
                      borderColor: item.connected
                        ? `${theme.colors.primary}20`
                        : `${theme.colors.textSecondary}10`,
                    },
                  ]}
                  onPress={() => handleConnect(item)}
                  disabled={item.connected}
                >
                  <View
                    style={[
                      modalStyles.deviceIconWrap,
                      {
                        backgroundColor: item.connected
                          ? `${theme.colors.primary}20`
                          : `${theme.colors.textSecondary}10`,
                      },
                    ]}
                  >
                    <Printer
                      size={18}
                      color={
                        item.connected
                          ? theme.colors.primary
                          : theme.colors.textSecondary
                      }
                    />
                  </View>

                  <View style={modalStyles.deviceInfo}>
                    <Text
                      style={[
                        modalStyles.deviceName,
                        { color: theme.colors.text },
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.address && (
                      <Text
                        style={[
                          modalStyles.deviceAddress,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {item.address}
                      </Text>
                    )}
                  </View>

                  <View style={modalStyles.deviceStatus}>
                    {item.connected ? (
                      <View
                        style={[
                          modalStyles.connectedBadge,
                          { backgroundColor: `${theme.colors.primary}20` },
                        ]}
                      >
                        <Check size={12} color={theme.colors.primary} />
                        <Text
                          style={[
                            modalStyles.statusText,
                            { color: theme.colors.primary },
                          ]}
                        >
                          Connected
                        </Text>
                      </View>
                    ) : (
                      <View style={modalStyles.connectButton}>
                        <Text
                          style={[
                            modalStyles.connectText,
                            { color: theme.colors.primary },
                          ]}
                        >
                          Connect
                        </Text>
                        <ChevronRight size={14} color={theme.colors.primary} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
            ListFooterComponent={
              <TouchableOpacity
                style={[
                  modalStyles.openBluetoothBtn,
                  { backgroundColor: `${theme.colors.primary}08` },
                ]}
              >
                <Settings size={16} color={theme.colors.primary} />
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: 15,
                    fontWeight: '600',
                  }}
                >
                  Open Bluetooth Settings
                </Text>
              </TouchableOpacity>
            }
          />
        </Animated.View>
      </View>
    </Modal>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <Animated.View style={[modalStyles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={modalStyles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />

          <Animated.View
            style={[
              modalStyles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [400, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Enhanced Header */}
            <BlurView
              intensity={themeType === 'dark' ? 25 : 90}
              tint={themeType}
              style={modalStyles.header}
            >
              <LinearGradient
                colors={[
                  `${theme.colors.primary}20`,
                  `${theme.colors.primary}08`,
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={modalStyles.headerGradient}
              />
              <View style={modalStyles.headerContent}>
                <View style={modalStyles.headerTitleContainer}>
                  <View
                    style={[
                      modalStyles.headerIcon,
                      { backgroundColor: `${theme.colors.primary}15` },
                    ]}
                  >
                    <Printer size={20} color={theme.colors.primary} />
                  </View>
                  <View>
                    <Text
                      style={[
                        modalStyles.headerTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      Print Settings
                    </Text>
                    <Text
                      style={[
                        modalStyles.headerSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Configure your printing preferences
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    modalStyles.closeButton,
                    { backgroundColor: `${theme.colors.textSecondary}10` },
                  ]}
                  onPress={onClose}
                >
                  <X size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </BlurView>

            <View style={modalStyles.content}>
              {/* Enhanced Printer Type Selection */}
              <View style={modalStyles.section}>
                <Text
                  style={[
                    modalStyles.sectionTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Printer Type
                </Text>
                <View style={modalStyles.printerTypeContainer}>
                  <TouchableOpacity
                    style={[
                      modalStyles.printerTypeCard,
                      {
                        backgroundColor:
                          printerType === 'regular'
                            ? `${theme.colors.primary}10`
                            : `${theme.colors.textSecondary}05`,
                        borderColor:
                          printerType === 'regular'
                            ? `${theme.colors.primary}30`
                            : `${theme.colors.textSecondary}15`,
                      },
                    ]}
                    onPress={() => setPrinterType('regular')}
                  >
                    <View
                      style={[
                        modalStyles.printerTypeIcon,
                        {
                          backgroundColor:
                            printerType === 'regular'
                              ? `${theme.colors.primary}20`
                              : `${theme.colors.textSecondary}10`,
                        },
                      ]}
                    >
                      <Printer
                        size={20}
                        color={
                          printerType === 'regular'
                            ? theme.colors.primary
                            : theme.colors.textSecondary
                        }
                      />
                    </View>
                    <View style={modalStyles.printerTypeContent}>
                      <Text
                        style={[
                          modalStyles.printerTypeTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        Regular Printer
                      </Text>
                      <Text
                        style={[
                          modalStyles.printerTypeDesc,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        A4 or A5 paper size
                      </Text>
                    </View>
                    <View
                      style={[
                        modalStyles.radioCircle,
                        {
                          borderColor:
                            printerType === 'regular'
                              ? theme.colors.primary
                              : `${theme.colors.textSecondary}40`,
                        },
                      ]}
                    >
                      {printerType === 'regular' && (
                        <View
                          style={[
                            modalStyles.radioDot,
                            { backgroundColor: theme.colors.primary },
                          ]}
                        />
                      )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      modalStyles.printerTypeCard,
                      {
                        backgroundColor:
                          printerType === 'thermal'
                            ? `${theme.colors.primary}10`
                            : `${theme.colors.textSecondary}05`,
                        borderColor:
                          printerType === 'thermal'
                            ? `${theme.colors.primary}30`
                            : `${theme.colors.textSecondary}15`,
                      },
                    ]}
                    onPress={() => setPrinterType('thermal')}
                  >
                    <View
                      style={[
                        modalStyles.printerTypeIcon,
                        {
                          backgroundColor:
                            printerType === 'thermal'
                              ? `${theme.colors.primary}20`
                              : `${theme.colors.textSecondary}10`,
                        },
                      ]}
                    >
                      <Bluetooth
                        size={20}
                        color={
                          printerType === 'thermal'
                            ? theme.colors.primary
                            : theme.colors.textSecondary
                        }
                      />
                    </View>
                    <View style={modalStyles.printerTypeContent}>
                      <Text
                        style={[
                          modalStyles.printerTypeTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        Thermal Printer
                      </Text>
                      <Text
                        style={[
                          modalStyles.printerTypeDesc,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        Bluetooth thermal printing
                      </Text>
                    </View>
                    <View
                      style={[
                        modalStyles.radioCircle,
                        {
                          borderColor:
                            printerType === 'thermal'
                              ? theme.colors.primary
                              : `${theme.colors.textSecondary}40`,
                        },
                      ]}
                    >
                      {printerType === 'thermal' && (
                        <View
                          style={[
                            modalStyles.radioDot,
                            { backgroundColor: theme.colors.primary },
                          ]}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Enhanced Device Selection */}
              {printerType === 'thermal' && (
                <View style={modalStyles.section}>
                  <Text
                    style={[
                      modalStyles.sectionTitle,
                      { color: theme.colors.text },
                    ]}
                  >
                    Connected Device
                  </Text>
                  {selectedDevice ? (
                    <View
                      style={[
                        modalStyles.selectedDeviceCard,
                        {
                          backgroundColor: `${theme.colors.primary}08`,
                          borderColor: `${theme.colors.primary}20`,
                        },
                      ]}
                    >
                      <View
                        style={[
                          modalStyles.selectedDeviceIcon,
                          { backgroundColor: `${theme.colors.primary}20` },
                        ]}
                      >
                        <Printer size={18} color={theme.colors.primary} />
                      </View>
                      <View style={modalStyles.selectedDeviceInfo}>
                        <Text
                          style={[
                            modalStyles.selectedDeviceName,
                            { color: theme.colors.text },
                          ]}
                        >
                          {selectedDevice.name}
                        </Text>
                        <View style={modalStyles.connectedStatus}>
                          <View
                            style={[
                              modalStyles.statusDot,
                              { backgroundColor: theme.colors.primary },
                            ]}
                          />
                          <Text
                            style={[
                              modalStyles.statusLabel,
                              { color: theme.colors.primary },
                            ]}
                          >
                            Connected
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={handleDisconnect}
                        style={[
                          modalStyles.disconnectBtn,
                          {
                            backgroundColor: `${theme.colors.textSecondary}10`,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            modalStyles.disconnectText,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          Disconnect
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setShowDeviceList(true)}
                      style={[
                        modalStyles.connectDeviceCard,
                        {
                          backgroundColor: `${theme.colors.primary}08`,
                          borderColor: `${theme.colors.primary}20`,
                        },
                      ]}
                    >
                      <View
                        style={[
                          modalStyles.connectDeviceIcon,
                          { backgroundColor: `${theme.colors.primary}20` },
                        ]}
                      >
                        <Bluetooth size={18} color={theme.colors.primary} />
                      </View>
                      <Text
                        style={[
                          modalStyles.connectDeviceText,
                          { color: theme.colors.primary },
                        ]}
                      >
                        Connect Device
                      </Text>
                      <ChevronRight size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Enhanced Page Size Selection */}
              <View style={modalStyles.section}>
                <Text
                  style={[
                    modalStyles.sectionTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Page Size
                </Text>
                <View style={modalStyles.pageSizeContainer}>
                  {printerType === 'regular' ? (
                    <>
                      <TouchableOpacity
                        style={[
                          modalStyles.pageSizeCard,
                          {
                            backgroundColor:
                              pageSize === 'A4'
                                ? `${theme.colors.primary}15`
                                : `${theme.colors.textSecondary}05`,
                            borderColor:
                              pageSize === 'A4'
                                ? `${theme.colors.primary}40`
                                : `${theme.colors.textSecondary}15`,
                          },
                        ]}
                        onPress={() => setPageSize('A4')}
                      >
                        <Text
                          style={[
                            modalStyles.pageSizeText,
                            {
                              color:
                                pageSize === 'A4'
                                  ? theme.colors.primary
                                  : theme.colors.text,
                            },
                          ]}
                        >
                          A4
                        </Text>
                        <Text
                          style={[
                            modalStyles.pageSizeDesc,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          210 × 297 mm
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          modalStyles.pageSizeCard,
                          {
                            backgroundColor:
                              pageSize === 'A5'
                                ? `${theme.colors.primary}15`
                                : `${theme.colors.textSecondary}05`,
                            borderColor:
                              pageSize === 'A5'
                                ? `${theme.colors.primary}40`
                                : `${theme.colors.textSecondary}15`,
                          },
                        ]}
                        onPress={() => setPageSize('A5')}
                      >
                        <Text
                          style={[
                            modalStyles.pageSizeText,
                            {
                              color:
                                pageSize === 'A5'
                                  ? theme.colors.primary
                                  : theme.colors.text,
                            },
                          ]}
                        >
                          A5
                        </Text>
                        <Text
                          style={[
                            modalStyles.pageSizeDesc,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          148 × 210 mm
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          modalStyles.pageSizeCard,
                          {
                            backgroundColor:
                              pageSize === '2inch'
                                ? `${theme.colors.primary}15`
                                : `${theme.colors.textSecondary}05`,
                            borderColor:
                              pageSize === '2inch'
                                ? `${theme.colors.primary}40`
                                : `${theme.colors.textSecondary}15`,
                          },
                        ]}
                        onPress={() => setPageSize('2inch')}
                      >
                        <Text
                          style={[
                            modalStyles.pageSizeText,
                            {
                              color:
                                pageSize === '2inch'
                                  ? theme.colors.primary
                                  : theme.colors.text,
                            },
                          ]}
                        >
                          2 inch
                        </Text>
                        <Text
                          style={[
                            modalStyles.pageSizeDesc,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          58mm width
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          modalStyles.pageSizeCard,
                          {
                            backgroundColor:
                              pageSize === '3inch'
                                ? `${theme.colors.primary}15`
                                : `${theme.colors.textSecondary}05`,
                            borderColor:
                              pageSize === '3inch'
                                ? `${theme.colors.primary}40`
                                : `${theme.colors.textSecondary}15`,
                          },
                        ]}
                        onPress={() => setPageSize('3inch')}
                      >
                        <Text
                          style={[
                            modalStyles.pageSizeText,
                            {
                              color:
                                pageSize === '3inch'
                                  ? theme.colors.primary
                                  : theme.colors.text,
                            },
                          ]}
                        >
                          3 inch
                        </Text>
                        <Text
                          style={[
                            modalStyles.pageSizeDesc,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          80mm width
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>

              {/* Enhanced Save Button */}
              <TouchableOpacity
                style={modalStyles.saveButton}
                onPress={handleSave}
              >
                <LinearGradient
                  colors={[
                    theme.colors.primary,
                    theme.colors.primaryLight || theme.colors.primary,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={modalStyles.saveGradient}
                >
                  <Save size={22} color="#FFF" />
                  <Text style={modalStyles.saveButtonText}>Save Settings</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
        {renderDeviceList()}
      </KeyboardAvoidingView>
    </Modal>
  );
};

function getModalStyles(themeType: string) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 16,
      backgroundColor: themeType === 'dark' ? '#1C1C1E' : '#FFFFFF',
      maxHeight: '90%',
    },
    header: {
      borderBottomWidth: 0,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 8,
    },
    headerGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 20,
      position: 'relative',
      zIndex: 2,
    },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    headerIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: -0.3,
      marginBottom: 2,
    },
    headerSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      opacity: 0.8,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 24,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    printerTypeContainer: {
      gap: 12,
    },
    printerTypeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      gap: 16,
    },
    printerTypeIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    printerTypeContent: {
      flex: 1,
    },
    printerTypeTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    printerTypeDesc: {
      fontSize: 13,
      fontWeight: '500',
      opacity: 0.8,
    },
    radioCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    selectedDeviceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      gap: 16,
    },
    selectedDeviceIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedDeviceInfo: {
      flex: 1,
    },
    selectedDeviceName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 6,
    },
    connectedStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusLabel: {
      fontSize: 13,
      fontWeight: '600',
    },
    disconnectBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
    },
    disconnectText: {
      fontSize: 14,
      fontWeight: '600',
    },
    connectDeviceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      gap: 16,
    },
    connectDeviceIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    connectDeviceText: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
    },
    pageSizeContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    pageSizeCard: {
      flex: 1,
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 80,
    },
    pageSizeText: {
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 4,
    },
    pageSizeDesc: {
      fontSize: 12,
      fontWeight: '500',
      opacity: 0.7,
    },
    saveButton: {
      borderRadius: 20,
      overflow: 'hidden',
      marginTop: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    saveGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 24,
      gap: 10,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: -0.1,
    },
    // Enhanced Device List Modal
    deviceListOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'flex-end',
    },
    deviceListContainer: {
      backgroundColor: themeType === 'dark' ? '#1C1C1E' : '#FFFFFF',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      overflow: 'hidden',
      maxHeight: '70%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 16,
    },
    deviceListHeader: {
      borderBottomWidth: 0,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 8,
    },
    deviceHeaderContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 20,
      position: 'relative',
      zIndex: 2,
    },
    deviceHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deviceListTitle: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    closeBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deviceItemContainer: {
      paddingHorizontal: 24,
      marginBottom: 8,
    },
    deviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      gap: 16,
    },
    deviceIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deviceInfo: {
      flex: 1,
    },
    deviceName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    deviceAddress: {
      fontSize: 13,
      fontWeight: '500',
      opacity: 0.7,
    },
    deviceStatus: {
      alignItems: 'flex-end',
    },
    connectedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      gap: 6,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    connectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    connectText: {
      fontSize: 14,
      fontWeight: '600',
    },
    openBluetoothBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 24,
      marginBottom: 24,
      padding: 16,
      borderRadius: 16,
      gap: 8,
    },
  });
}
