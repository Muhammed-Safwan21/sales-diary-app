// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { TextInput } from 'react-native-paper';
// import { MaterialIcons } from 'react-native-vector-icons';
// import DropDown from 'react-native-paper-dropdown';

// // Note: This is a component implementation without actual react-hook-form library
// // You'll need to install the required dependencies:
// // npm install react-hook-form react-native-paper react-native-paper-dropdown

// const ItemFormPage = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       itemName: '',
//       itemType: '',
//       unit: 'pcs',
//       salePrice: '',
//       purchasePrice: '',
//       stock: '',
//       partyPrice: '',
//     }
//   });

//   const [currentStep, setCurrentStep] = useState(0);
//   const [showUnitDropdown, setShowUnitDropdown] = useState(false);

//   const unitList = [
//     { label: 'Piece', value: 'pcs' },
//     { label: 'Box', value: 'box' },
//     { label: 'Kilogram', value: 'kg' },
//     { label: 'Liter', value: 'ltr' },
//   ];

//   const itemTypes = [
//     { label: 'Electronics', value: 'electronics' },
//     { label: 'Clothing', value: 'clothing' },
//     { label: 'Food', value: 'food' },
//     { label: 'Stationery', value: 'stationery' },
//     { label: 'Other', value: 'other' },
//   ];

//   const [showItemTypeDropdown, setShowItemTypeDropdown] = useState(false);

//   const onSubmit = (data) => {
//     console.log(data);
//     // Handle form submission here
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Basic Information</Text>
            
//             <Controller
//               control={control}
//               rules={{ required: 'Item name is required' }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   label="Item Name"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={styles.input}
//                   error={!!errors.itemName}
//                 />
//               )}
//               name="itemName"
//             />
//             {errors.itemName && <Text style={styles.errorText}>{errors.itemName.message}</Text>}

//             <Controller
//               control={control}
//               rules={{ required: 'Item type is required' }}
//               render={({ field: { onChange, value } }) => (
//                 <View style={styles.dropdownContainer}>
//                   <DropDown
//                     label="Item Type"
//                     mode="outlined"
//                     visible={showItemTypeDropdown}
//                     showDropDown={() => setShowItemTypeDropdown(true)}
//                     onDismiss={() => setShowItemTypeDropdown(false)}
//                     value={value}
//                     setValue={onChange}
//                     list={itemTypes}
//                   />
//                 </View>
//               )}
//               name="itemType"
//             />
//             {errors.itemType && <Text style={styles.errorText}>{errors.itemType.message}</Text>}
//           </View>
//         );
//       case 1:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Pricing Information</Text>
            
//             <Controller
//               control={control}
//               rules={{ required: 'Unit is required' }}
//               render={({ field: { onChange, value } }) => (
//                 <View style={styles.dropdownContainer}>
//                   <DropDown
//                     label="Unit"
//                     mode="outlined"
//                     visible={showUnitDropdown}
//                     showDropDown={() => setShowUnitDropdown(true)}
//                     onDismiss={() => setShowUnitDropdown(false)}
//                     value={value}
//                     setValue={onChange}
//                     list={unitList}
//                   />
//                 </View>
//               )}
//               name="unit"
//             />

//             <Controller
//               control={control}
//               rules={{ 
//                 required: 'Sale price is required',
//                 pattern: {
//                   value: /^\d+(\.\d{1,2})?$/,
//                   message: 'Please enter a valid price'
//                 }
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   label="Sale Price"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   error={!!errors.salePrice}
//                 />
//               )}
//               name="salePrice"
//             />
//             {errors.salePrice && <Text style={styles.errorText}>{errors.salePrice.message}</Text>}

//             <Controller
//               control={control}
//               rules={{ 
//                 required: 'Purchase price is required',
//                 pattern: {
//                   value: /^\d+(\.\d{1,2})?$/,
//                   message: 'Please enter a valid price'
//                 }
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   label="Purchase Price"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   error={!!errors.purchasePrice}
//                 />
//               )}
//               name="purchasePrice"
//             />
//             {errors.purchasePrice && <Text style={styles.errorText}>{errors.purchasePrice.message}</Text>}
//           </View>
//         );
//       case 2:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Stock & Other Information</Text>
            
//             <Controller
//               control={control}
//               rules={{ 
//                 required: 'Stock quantity is required',
//                 pattern: {
//                   value: /^\d+$/,
//                   message: 'Please enter a valid number'
//                 }
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   label="Stock Quantity"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   error={!!errors.stock}
//                 />
//               )}
//               name="stock"
//             />
//             {errors.stock && <Text style={styles.errorText}>{errors.stock.message}</Text>}

//             <Controller
//               control={control}
//               rules={{ 
//                 pattern: {
//                   value: /^\d+(\.\d{1,2})?$/,
//                   message: 'Please enter a valid price'
//                 }
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   label="Party Price"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   error={!!errors.partyPrice}
//                 />
//               )}
//               name="partyPrice"
//             />
//             {errors.partyPrice && <Text style={styles.errorText}>{errors.partyPrice.message}</Text>}
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Add New Item</Text>
//       </View>

//       <View style={styles.stepIndicator}>
//         {[0, 1, 2].map((step) => (
//           <TouchableOpacity 
//             key={step} 
//             style={[
//               styles.stepDot,
//               currentStep === step ? styles.activeStepDot : null
//             ]}
//             onPress={() => setCurrentStep(step)}
//           >
//             <Text style={styles.stepNumber}>{step + 1}</Text>
//           </TouchableOpacity>
//         ))}
//         <View style={styles.stepLine} />
//       </View>

//       {renderStep()}

//       <View style={styles.buttonContainer}>
//         {currentStep > 0 && (
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={() => setCurrentStep(currentStep - 1)}
//           >
//             <MaterialIcons name="arrow-back" size={20} color="white" />
//             <Text style={styles.buttonText}>Previous</Text>
//           </TouchableOpacity>
//         )}

//         {currentStep < 2 ? (
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={() => setCurrentStep(currentStep + 1)}
//           >
//             <Text style={styles.buttonText}>Next</Text>
//             <MaterialIcons name="arrow-forward" size={20} color="white" />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={handleSubmit(onSubmit)}
//           >
//             <Text style={styles.buttonText}>Save</Text>
//             <MaterialIcons name="check" size={20} color="white" />
//           </TouchableOpacity>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 16,
//     backgroundColor: '#2196F3',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   stepIndicator: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//     position: 'relative',
//   },
//   stepDot: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 30,
//     zIndex: 1,
//   },
//   activeStepDot: {
//     backgroundColor: '#2196F3',
//   },
//   stepNumber: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   stepLine: {
//     position: 'absolute',
//     height: 2,
//     backgroundColor: '#e0e0e0',
//     width: '70%',
//     alignSelf: 'center',
//   },
//   stepContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   stepTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#2196F3',
//   },
//   input: {
//     marginBottom: 12,
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   dropdownContainer: {
//     marginBottom: 12,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 16,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 2,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginHorizontal: 8,
//   },
// });

// export default ItemFormPage;

import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index