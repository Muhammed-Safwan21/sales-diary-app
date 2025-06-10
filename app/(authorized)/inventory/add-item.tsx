import CategorySelectionModal from '@/components/modal/categorySelectionModal';
import HSNSelectionModal from '@/components/modal/hsnSelectionModal';
import TaxSelectionModal from '@/components/modal/taxSelection';
import UnitSelectionModal from '@/components/modal/unitSelectionModal';
import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Camera,
  ChevronDown,
  FileText,
  Folder,
  Hash,
  Image as ImageIcon,
  IndianRupee,
  Info,
  Package,
  Save,
  Sparkles,
  Tag,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

interface FormData {
  name: string;
  category: string;
  categoryId: string;
  hsnCode: string;
  hsnCodeId: string;
  purchasePrice: string;
  sellingPrice: string;
  stock: string;
  unit: string;
  unitId: string;
  lowStockAlert: string;
  gstRate: string;
  taxPercentage: string;
  description: string;
  includeGst: boolean;
}

interface Unit {
  id: string;
  unit: string;
  formalName: string;
  decimalValues: number;
  branchId: number;
}

interface Category {
  id: string;
  name: string;
  category: string;
  branchId: number;
  parentCategoryId: string | null;
  adminId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface TaxRate {
  id: string;
  rate: number;
  name: string;
  type: string;
  percentage: string;
}

interface UploadedImage {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  url: string;
}

interface HSNCode {
  id: string;
  code: string;
  description: string;
  gstRate?: number;
  category?: string;
}

// Product API interfaces
interface ProductVariant {
  name: string;
  code: string;
  description: string;
  rate: number;
  taxPercentage: number;
  taxAmount: number;
  quantity: number;
  openingQuantity: number;
  openingRate: number;
  salePrice: number;
  costPrice: number;
  reorderQuantity: number;
  imageUrl: string;
  sku: string;
  barcode: string;
  includeTax: boolean;
  status: 'STOCK' | 'OUT_OF_STOCK';
  branchId: number;
  adminId: number;
  isAvailable: boolean;
  unitId: number;
}

interface CreateProductRequest {
  name: string;
  description: string;
  imageUrl: string;
  itemType: 'PRODUCT';
  categoryId: number;
  branchId: number;
  adminId: number;
  hsnCodeId: number;
  variants: ProductVariant[];
}

export default function AddItemScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Get adminId and branchId from Redux
  const adminId = useSelector((state: any) => state.auth?.user?.id);
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  // Fixed modal states - separate state for each modal
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showHSNModal, setShowHSNModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      category: 'Select Category',
      categoryId: '',
      hsnCode: '',
      hsnCodeId: '',
      purchasePrice: '',
      sellingPrice: '',
      stock: '',
      unit: 'Select Unit',
      unitId: '',
      lowStockAlert: '',
      gstRate: 'Select GST Rate',
      taxPercentage: '',
      description: '',
      includeGst: true,
    },
    mode: 'onChange',
  });

  const purchasePrice = watch('purchasePrice');
  const sellingPrice = watch('sellingPrice');
  const selectedUnit = watch('unit');
  const selectedCategory = watch('category');
  const selectedGstRate = watch('gstRate');
  const selectedHsnCode = watch('hsnCode');

  // Product creation mutation
  const createProductMutation = useMutation({
    mutationFn: async (productData: CreateProductRequest) => {
      return await apiClient.post(API.PRODUCTS || '/products', productData);
    },
    onSuccess: (response) => {
      console.log('Product created successfully:', response);
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });

      Alert.alert('Success', 'Product created successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Error creating product:', error);
      const errorMessage =
        error?.response?.data?.message || 'Failed to create product';
      Alert.alert('Error', errorMessage);
    },
  });

  const handleUnitSelect = (unit: Unit) => {
    setValue('unit', unit.unit, { shouldValidate: true });
    setValue('unitId', unit.id, { shouldValidate: true });
  };

  const handleCategorySelect = (category: Category) => {
    setValue('category', category.name, { shouldValidate: true });
    setValue('categoryId', category.id, { shouldValidate: true });
  };

  const handleHSNSelect = (hsn: HSNCode) => {
    setValue('hsnCode', hsn.code, { shouldValidate: true });
    setValue('hsnCodeId', hsn.id, { shouldValidate: true });
    // Optionally set GST rate if HSN comes with it
    if (hsn.gstRate !== undefined) {
      setValue('gstRate', `${hsn.gstRate}%`, { shouldValidate: true });
      setValue('taxPercentage', hsn.gstRate.toString(), {
        shouldValidate: true,
      });
    }
  };

  const handleTaxSelect = (tax: TaxRate) => {
    console.log('Selected tax:', tax);
    setValue('gstRate', `${tax.percentage}%`, { shouldValidate: true });
    setValue('taxPercentage', tax.percentage, { shouldValidate: true });
  };

  const calculateProfit = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const selling = parseFloat(sellingPrice) || 0;

    if (purchase === 0 || selling === 0) return { amount: 0, percentage: 0 };

    const profit = selling - purchase;
    const percentage = (profit / purchase) * 100;

    return {
      amount: profit,
      percentage: parseFloat(percentage.toFixed(2)),
    };
  };

  const profit = calculateProfit();

  // Generate SKU and barcode
  const generateSKU = (name: string, categoryId: string): string => {
    const nameCode = name.substring(0, 3).toUpperCase();
    const catCode = categoryId ? categoryId.substring(0, 2) : 'XX';
    const timestamp = Date.now().toString().slice(-4);
    return `${nameCode}${catCode}${timestamp}`;
  };

  const generateBarcode = (): string => {
    return (
      Date.now().toString() +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')
    );
  };

  // Calculate tax amount
  const calculateTaxAmount = (
    price: number,
    taxPercentage: number,
    includeTax: boolean
  ): number => {
    if (includeTax) {
      // Price includes tax, so tax amount = price - (price / (1 + tax%/100))
      return price - price / (1 + taxPercentage / 100);
    } else {
      // Price excludes tax, so tax amount = price * (tax%/100)
      return price * (taxPercentage / 100);
    }
  };

  const onSubmit = (data: FormData) => {
    // Validationclg
    console.log('sdfsfd');
    if (!adminId || !branchId) {
      Alert.alert('Error', 'User information not found. Please login again.');
      return;
    }

    if (!data.categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!data.unitId) {
      Alert.alert('Error', 'Please select a unit');
      return;
    }

    const numericTaxPercentage = parseFloat(data.taxPercentage) || 0;
    const costPrice = parseFloat(data.purchasePrice) || 0;
    const salePrice = parseFloat(data.sellingPrice) || 0;
    const quantity = parseInt(data.stock) || 0;
    const reorderQuantity = parseInt(data.lowStockAlert) || 0;

    // Calculate tax amount based on includeTax setting
    const taxAmount = calculateTaxAmount(
      salePrice,
      numericTaxPercentage,
      data.includeGst
    );

    // Create variant object
    const variant: ProductVariant = {
      name: data.name,
      code: generateSKU(data.name, data.categoryId),
      description: data.description || '',
      rate: salePrice,
      taxPercentage: numericTaxPercentage,
      taxAmount: taxAmount,
      quantity: quantity,
      openingQuantity: quantity,
      openingRate: costPrice,
      salePrice: salePrice,
      costPrice: costPrice,
      reorderQuantity: reorderQuantity,
      imageUrl: uploadedImages[0]?.url || '',
      sku: generateSKU(data.name, data.categoryId),
      barcode: generateBarcode(),
      includeTax: data.includeGst,
      status: quantity > 0 ? 'STOCK' : 'OUT_OF_STOCK',
      branchId: Number(branchId),
      adminId: Number(adminId),
      isAvailable: true,
      unitId: Number(data.unitId),
    };

    // Create product object
    const productData: CreateProductRequest = {
      name: data.name,
      description: data.description || '',
      imageUrl: uploadedImages[0]?.url || '',
      itemType: 'PRODUCT',
      categoryId: Number(data.categoryId),
      branchId: Number(branchId),
      adminId: Number(adminId),
      hsnCodeId: Number(data.hsnCodeId) || 0,
      variants: [variant],
    };

    console.log('Creating product with data:', productData);

    // Submit the product
    createProductMutation.mutate(productData);
  };

  // Image upload functionality (keeping your existing implementation)
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Permission to access camera roll is required!'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Permission to access camera is required!'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadImageXHR = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      const fileExtension =
        imageAsset.uri.split('.').pop()?.toLowerCase() || 'jpg';
      const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
      const fileName =
        imageAsset.fileName || `image_${Date.now()}.${fileExtension}`;

      formData.append('file', {
        uri:
          Platform.OS === 'ios'
            ? imageAsset.uri.replace('file://', '')
            : imageAsset.uri,
        type: mimeType,
        name: fileName,
      } as any);

      xhr.open('POST', 'https://api.ybill.in/v1/files/upload');
      xhr.setRequestHeader('Accept', '*/*');

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(
              new Error(`Invalid JSON: ${xhr.responseText.substring(0, 100)}`)
            );
          }
        } else {
          reject(
            new Error(
              `HTTP ${xhr.status}: ${xhr.responseText.substring(0, 100)}`
            )
          );
        }
      };

      xhr.onerror = () => reject(new Error('Network error occurred'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));
      xhr.timeout = 30000;
      xhr.send(formData);
    });
  };

  const uploadImage = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    try {
      setIsUploading(true);
      let responseData;

      try {
        const formData = new FormData();
        const fileExtension =
          imageAsset.uri.split('.').pop()?.toLowerCase() || 'jpg';
        const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
        const fileName =
          imageAsset.fileName || `image_${Date.now()}.${fileExtension}`;

        formData.append('file', {
          uri:
            Platform.OS === 'ios'
              ? imageAsset.uri.replace('file://', '')
              : imageAsset.uri,
          type: mimeType,
          name: fileName,
        } as any);

        const response = await fetch('https://api.ybill.in/v1/files/upload', {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const responseText = await response.text();

        if (!response.ok) {
          throw new Error(`Fetch failed: HTTP ${response.status}`);
        }

        responseData = JSON.parse(responseText);
      } catch (fetchError) {
        responseData = await uploadImageXHR(imageAsset);
      }

      if (responseData.success && responseData.data) {
        setUploadedImages((prev) => [...prev, responseData.data]);
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        throw new Error(
          responseData.message ||
            `Upload failed: ${JSON.stringify(responseData)}`
        );
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    Alert.alert('Remove Image', 'Are you sure you want to remove this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUploadedImages((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const showImageOptions = () => {
    Alert.alert('Add Image', 'Choose an option', [
      { text: 'Camera', onPress: takePhoto },
      { text: 'Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Form input components (keeping your existing implementations)
  const renderFormInput = (
    name: keyof FormData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default',
    multiline = false,
    required = false,
    rules: any = {}
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
          {required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(required && { required: `${label} is required` }),
          ...rules,
        }}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <View
            style={[
              styles.inputContainer,
              multiline && styles.multilineContainer,
              errors[name] && styles.inputError,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: errors[name]
                  ? '#EF4444'
                  : themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
          >
            <TextInput
              style={[
                styles.textInput,
                multiline && styles.multilineInput,
                { color: theme.colors.text },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={keyboardType}
              multiline={multiline}
              textAlignVertical={multiline ? 'top' : 'center'}
            />
          </View>
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );

  const renderPriceInput = (
    name: keyof FormData,
    label: string,
    placeholder: string,
    required = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <IndianRupee size={16} color={theme.colors.primary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
          {required && <Text style={{ color: '#EF4444' }}>*</Text>}
        </Text>
      </View>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(required && { required: `${label} is required` }),
          pattern: {
            value: /^\d*\.?\d*$/,
            message: 'Please enter a valid price',
          },
          validate: (value: any) => {
            const num = parseFloat(value);
            if (value && (isNaN(num) || num < 0)) {
              return 'Price must be a positive number';
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }: any) => (
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
              <IndianRupee size={14} color={theme.colors.primary} />
            </View>
            <TextInput
              style={[
                styles.priceInput,
                errors[name] && styles.inputError,
                {
                  backgroundColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                  borderColor: errors[name]
                    ? '#EF4444'
                    : themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
                  color: theme.colors.text,
                },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );

  // Selector components (keeping your existing implementations)
  const renderUnitSelector = () => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <Package size={16} color={theme.colors.primary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          Unit
          <Text style={{ color: '#EF4444' }}>*</Text>
        </Text>
      </View>
      <Controller
        control={control}
        name="unit"
        rules={{
          required: 'Unit is required',
          validate: (value) =>
            value !== 'Select Unit' || 'Please select a unit',
        }}
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
              errors.unit && styles.inputError,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: errors.unit
                  ? '#EF4444'
                  : themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
            onPress={() => setShowUnitModal(true)}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    value === 'Select Unit'
                      ? theme.colors.textSecondary
                      : theme.colors.text,
                },
              ]}
            >
              {value}
            </Text>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
      {errors.unit && (
        <Text style={styles.errorText}>{errors.unit?.message}</Text>
      )}
    </View>
  );

  const renderCategorySelector = () => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <Folder size={16} color={theme.colors.secondary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          Category
          <Text style={{ color: '#EF4444' }}>*</Text>
        </Text>
      </View>
      <Controller
        control={control}
        name="category"
        rules={{
          required: 'Category is required',
          validate: (value) =>
            value !== 'Select Category' || 'Please select a category',
        }}
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
              errors.category && styles.inputError,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: errors.category
                  ? '#EF4444'
                  : themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    value === 'Select Category'
                      ? theme.colors.textSecondary
                      : theme.colors.text,
                },
              ]}
            >
              {value}
            </Text>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
      {errors.category && (
        <Text style={styles.errorText}>{errors.category?.message}</Text>
      )}
    </View>
  );

  const renderHSNSelector = () => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <Hash size={16} color={theme.colors.accent} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          HSN/SAC Code
        </Text>
      </View>
      <Controller
        control={control}
        name="hsnCode"
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
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
            onPress={() => setShowHSNModal(true)}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    !value || value === ''
                      ? theme.colors.textSecondary
                      : theme.colors.text,
                },
              ]}
            >
              {value || 'Select HSN Code'}
            </Text>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderTaxSelector = () => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <FileText size={16} color={theme.colors.secondary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          GST Rate
        </Text>
      </View>
      <Controller
        control={control}
        name="gstRate"
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={[
              styles.selectContainer,
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
            onPress={() => setShowTaxModal(true)}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    value === 'Select GST Rate'
                      ? theme.colors.textSecondary
                      : theme.colors.text,
                },
              ]}
            >
              {value}
            </Text>
            <ChevronDown size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  // Image section component (keeping your existing implementation)
  const renderImageSection = () => (
    <View style={styles.imageSection}>
      <View style={styles.imageSectionHeader}>
        <ImageIcon size={16} color={theme.colors.primary} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          Product Images
        </Text>
      </View>

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <View style={styles.uploadedImagesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imagesScrollContainer}
          >
            {uploadedImages.map((image, index) => (
              <Animated.View
                key={index}
                entering={FadeIn.delay(index * 100)}
                exiting={FadeOut}
                style={styles.uploadedImageContainer}
              >
                <Image
                  source={{ uri: image.url }}
                  style={styles.uploadedImage}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.imageInfo}>
                  <Text
                    style={[
                      styles.imageSize,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {(image.size / 1024).toFixed(1)}KB
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Upload Button */}
      <TouchableOpacity
        style={[
          styles.imageButton,
          {
            backgroundColor:
              themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.6)',
            borderColor: `${theme.colors.primary}30`,
          },
        ]}
        onPress={showImageOptions}
        disabled={isUploading}
      >
        <LinearGradient
          colors={[
            `${theme.colors.primary}15`,
            `${theme.colors.primary}05`,
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imageGradientOverlay}
        />
        <View style={styles.imageButtonContent}>
          {isUploading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <View
              style={[
                styles.cameraIconContainer,
                { backgroundColor: `${theme.colors.primary}20` },
              ]}
            >
              {uploadedImages.length > 0 ? (
                <Upload size={20} color={theme.colors.primary} />
              ) : (
                <Camera size={20} color={theme.colors.primary} />
              )}
            </View>
          )}
          <Text
            style={[styles.imageButtonText, { color: theme.colors.primary }]}
          >
            {isUploading
              ? 'Uploading...'
              : uploadedImages.length > 0
              ? 'Add More Images'
              : 'Add Product Images'}
          </Text>
        </View>
      </TouchableOpacity>

      {uploadedImages.length > 0 && (
        <Text
          style={[styles.imageCount, { color: theme.colors.textSecondary }]}
        >
          {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''}{' '}
          uploaded
        </Text>
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Ultra-modern header with gradient */}
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
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Info size={18} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Basic Information
                </Text>
              </View>

              {renderFormInput(
                'name',
                'Item Name',
                'Enter item name',
                <Tag size={16} color={theme.colors.primary} />,
                'default',
                false,
                true
              )}

              {renderCategorySelector()}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderHSNSelector()}
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderUnitSelector()}
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Pricing Information */}
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <IndianRupee size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Pricing Information
                </Text>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderPriceInput(
                    'purchasePrice',
                    'Purchase Price',
                    '0.00',
                    true
                  )}
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderPriceInput(
                    'sellingPrice',
                    'Selling Price',
                    '0.00',
                    true
                  )}
                </View>
              </View>

              {/* Profit Display */}
              {purchasePrice && sellingPrice && (
                <View
                  style={[
                    styles.profitContainer,
                    {
                      backgroundColor:
                        profit.amount >= 0
                          ? `${theme.colors.success}15`
                          : `rgba(239, 68, 68, 0.1)`,
                      borderColor:
                        profit.amount >= 0
                          ? `${theme.colors.success}20`
                          : 'rgba(239, 68, 68, 0.2)',
                    },
                  ]}
                >
                  <LinearGradient
                    colors={[
                      profit.amount >= 0
                        ? `${theme.colors.success}10`
                        : 'rgba(239, 68, 68, 0.05)',
                      'transparent',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profitGradientOverlay}
                  />

                  <View style={styles.profitContent}>
                    <View style={styles.profitItem}>
                      <View style={styles.profitHeader}>
                        <TrendingUp
                          size={14}
                          color={
                            profit.amount >= 0
                              ? theme.colors.success
                              : '#EF4444'
                          }
                        />
                        <Text
                          style={[
                            styles.profitLabel,
                            {
                              color:
                                profit.amount >= 0
                                  ? theme.colors.success
                                  : '#EF4444',
                            },
                          ]}
                        >
                          Profit Amount
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.profitValue,
                          {
                            color:
                              profit.amount >= 0
                                ? theme.colors.success
                                : '#EF4444',
                          },
                        ]}
                      >
                        ₹{Math.abs(profit.amount).toFixed(2)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.profitDivider,
                        {
                          backgroundColor:
                            profit.amount >= 0
                              ? `${theme.colors.success}30`
                              : 'rgba(239, 68, 68, 0.3)',
                        },
                      ]}
                    />

                    <View style={styles.profitItem}>
                      <View style={styles.profitHeader}>
                        <BarChart3
                          size={14}
                          color={
                            profit.amount >= 0
                              ? theme.colors.success
                              : '#EF4444'
                          }
                        />
                        <Text
                          style={[
                            styles.profitLabel,
                            {
                              color:
                                profit.amount >= 0
                                  ? theme.colors.success
                                  : '#EF4444',
                            },
                          ]}
                        >
                          {profit.amount >= 0 ? 'Profit Margin' : 'Loss Margin'}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.profitValue,
                          {
                            color:
                              profit.amount >= 0
                                ? theme.colors.success
                                : '#EF4444',
                          },
                        ]}
                      >
                        {Math.abs(profit.percentage)}%
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {renderTaxSelector()}

              <View style={styles.switchContainer}>
                <View style={styles.switchLabelContainer}>
                  <IndianRupee size={16} color={theme.colors.primary} />
                  <Text
                    style={[styles.switchLabel, { color: theme.colors.text }]}
                  >
                    Price inclusive of GST
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="includeGst"
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{
                        false:
                          themeType === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : '#D1D5DB',
                        true: `${theme.colors.primary}40`,
                      }}
                      thumbColor={value ? theme.colors.primary : '#FFFFFF'}
                    />
                  )}
                />
              </View>
            </BlurView>
          </Animated.View>

          {/* Stock Information */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <BarChart3 size={18} color={theme.colors.secondary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Stock Information
                </Text>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  {renderFormInput(
                    'stock',
                    'Opening Stock',
                    '0',
                    <Package size={16} color={theme.colors.primary} />,
                    'numeric',
                    false,
                    false,
                    {
                      pattern: {
                        value: /^\d*$/,
                        message: 'Please enter a valid number',
                      },
                    }
                  )}
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  {renderFormInput(
                    'lowStockAlert',
                    'Low Stock Alert',
                    '0',
                    <AlertTriangle size={16} color="#F59E0B" />,
                    'numeric',
                    false,
                    false,
                    {
                      pattern: {
                        value: /^\d*$/,
                        message: 'Please enter a valid number',
                      },
                    }
                  )}
                </View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Additional Information */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <BlurView
              intensity={themeType === 'dark' ? 15 : 80}
              tint={themeType}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Sparkles size={18} color={theme.colors.accent} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Additional Information
                </Text>
              </View>

              {renderFormInput(
                'description',
                'Description',
                'Enter item description (optional)',
                <FileText size={16} color={theme.colors.secondary} />,
                'default',
                true
              )}

              {renderImageSection()}
            </BlurView>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <BlurView
          intensity={themeType === 'dark' ? 20 : 80}
          tint={themeType}
          style={styles.footer}
        >
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.primary,
                opacity: isValid && !createProductMutation.isPending ? 1 : 0.6,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || createProductMutation.isPending}
          >
            <LinearGradient
              colors={[
                theme.colors.primary,
                theme.colors.primaryLight || theme.colors.primary,
              ]}
              style={styles.saveGradient}
            >
              {createProductMutation.isPending ? (
                <ActivityIndicator size={20} color="#FFFFFF" />
              ) : (
                <Save size={20} color="#FFFFFF" />
              )}
              <Text style={styles.saveButtonText}>
                {createProductMutation.isPending ? 'Creating...' : 'Save Item'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </KeyboardAvoidingView>

      {/* All Modals */}
      {/* Category Selection Modal */}
      <CategorySelectionModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={handleCategorySelect}
        selectedCategory={
          selectedCategory !== 'Select Category' ? selectedCategory : undefined
        }
      />

      {/* HSN Selection Modal */}
      <HSNSelectionModal
        visible={showHSNModal}
        onClose={() => setShowHSNModal(false)}
        onSelectHSN={handleHSNSelect}
        selectedHSN={selectedHsnCode}
      />

      {/* Unit Selection Modal */}
      <UnitSelectionModal
        visible={showUnitModal}
        onClose={() => setShowUnitModal(false)}
        onSelectUnit={handleUnitSelect}
        selectedUnit={selectedUnit !== 'Select Unit' ? selectedUnit : undefined}
      />

      {/* Tax Selection Modal */}
      <TaxSelectionModal
        visible={showTaxModal}
        onClose={() => setShowTaxModal(false)}
        onSelectTax={handleTaxSelect}
        selectedTax={
          selectedGstRate !== 'Select GST Rate' ? selectedGstRate : undefined
        }
      />
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
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
  // Image upload styles
  imageSection: {
    marginTop: 8,
  },
  imageSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  uploadedImagesContainer: {
    marginBottom: 16,
  },
  imagesScrollContainer: {
    paddingRight: 20,
  },
  uploadedImageContainer: {
    position: 'relative',
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  imageSize: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
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
  imageCount: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
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
});
