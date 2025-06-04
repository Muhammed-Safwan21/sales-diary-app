// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
// // import { useTheme } from '@/context/ThemeContext';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useRouter } from 'expo-router';
// // import { ArrowLeft, Plus, Edit2, Trash2, UserPlus, Users, Mail, Phone, Shield } from 'lucide-react-native';
// // import { Button } from '@/components/shared/Button';

// // interface Staff {
// //   id: string;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   role: string;
// // }

// // export default function StaffScreen() {
// //   const { theme } = useTheme();
// //   const router = useRouter();
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
// //   const [staffList, setStaffList] = useState<Staff[]>([
// //     {
// //       id: '1',
// //       name: 'John Doe',
// //       email: 'john@example.com',
// //       phone: '+91 9876543210',
// //       role: 'Manager',
// //     },
// //     {
// //       id: '2',
// //       name: 'Jane Smith',
// //       email: 'jane@example.com',
// //       phone: '+91 9876543211',
// //       role: 'Sales',
// //     },
// //   ]);

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     role: '',
// //   });

// //   const handleAddStaff = () => {
// //     if (!formData.name || !formData.email || !formData.phone || !formData.role) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     const newStaff: Staff = {
// //       id: Date.now().toString(),
// //       ...formData,
// //     };

// //     setStaffList([...staffList, newStaff]);
// //     setShowAddModal(false);
// //     setFormData({ name: '', email: '', phone: '', role: '' });
// //   };

// //   const handleEditStaff = () => {
// //     if (!selectedStaff || !formData.name || !formData.email || !formData.phone || !formData.role) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     const updatedList = staffList.map((staff) =>
// //       staff.id === selectedStaff.id ? { ...staff, ...formData } : staff
// //     );

// //     setStaffList(updatedList);
// //     setShowEditModal(false);
// //     setSelectedStaff(null);
// //     setFormData({ name: '', email: '', phone: '', role: '' });
// //   };

// //   const handleDeleteStaff = (staff: Staff) => {
// //     Alert.alert(
// //       'Delete Staff',
// //       `Are you sure you want to delete ${staff.name}?`,
// //       [
// //         {
// //           text: 'Cancel',
// //           style: 'cancel',
// //         },
// //         {
// //           text: 'Delete',
// //           style: 'destructive',
// //           onPress: () => {
// //             setStaffList(staffList.filter((s) => s.id !== staff.id));
// //           },
// //         },
// //       ]
// //     );
// //   };

// //   const openEditModal = (staff: Staff) => {
// //     setSelectedStaff(staff);
// //     setFormData({
// //       name: staff.name,
// //       email: staff.email,
// //       phone: staff.phone,
// //       role: staff.role,
// //     });
// //     setShowEditModal(true);
// //   };

// //   const renderStaffModal = (isEdit: boolean) => (
// //     <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
// //       <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
// //         <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
// //           {isEdit ? 'Edit Staff' : 'Add New Staff'}
// //         </Text>

// //         <View style={styles.inputContainer}>
// //           <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Name</Text>
// //           <TextInput
// //             style={[styles.input, { 
// //               backgroundColor: theme.colors.background,
// //               color: theme.colors.text,
// //               borderColor: theme.colors.border,
// //             }]}
// //             value={formData.name}
// //             onChangeText={(text) => setFormData({ ...formData, name: text })}
// //             placeholder="Enter name"
// //             placeholderTextColor={theme.colors.textLight}
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email</Text>
// //           <TextInput
// //             style={[styles.input, { 
// //               backgroundColor: theme.colors.background,
// //               color: theme.colors.text,
// //               borderColor: theme.colors.border,
// //             }]}
// //             value={formData.email}
// //             onChangeText={(text) => setFormData({ ...formData, email: text })}
// //             placeholder="Enter email"
// //             placeholderTextColor={theme.colors.textLight}
// //             keyboardType="email-address"
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Phone</Text>
// //           <TextInput
// //             style={[styles.input, { 
// //               backgroundColor: theme.colors.background,
// //               color: theme.colors.text,
// //               borderColor: theme.colors.border,
// //             }]}
// //             value={formData.phone}
// //             onChangeText={(text) => setFormData({ ...formData, phone: text })}
// //             placeholder="Enter phone"
// //             placeholderTextColor={theme.colors.textLight}
// //             keyboardType="phone-pad"
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Role</Text>
// //           <TextInput
// //             style={[styles.input, { 
// //               backgroundColor: theme.colors.background,
// //               color: theme.colors.text,
// //               borderColor: theme.colors.border,
// //             }]}
// //             value={formData.role}
// //             onChangeText={(text) => setFormData({ ...formData, role: text })}
// //             placeholder="Enter role"
// //             placeholderTextColor={theme.colors.textLight}
// //           />
// //         </View>

// //         <View style={styles.modalButtons}>
// //           <Button
// //             variant="secondary"
// //             onPress={() => {
// //               setShowAddModal(false);
// //               setShowEditModal(false);
// //               setFormData({ name: '', email: '', phone: '', role: '' });
// //             }}
// //             style={styles.modalButton}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onPress={isEdit ? handleEditStaff : handleAddStaff}
// //             style={styles.modalButton}
// //           >
// //             {isEdit ? 'Save Changes' : 'Add Staff'}
// //           </Button>
// //         </View>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
// //       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
// //         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
// //           <ArrowLeft size={24} color={theme.colors.text} />
// //         </TouchableOpacity>
// //         <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Manage Staff</Text>
// //         <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
// //           <Plus size={24} color={theme.colors.primary} />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView style={styles.content}>
// //         {staffList.map((staff) => (
// //           <View key={staff.id} style={[styles.staffCard, { backgroundColor: theme.colors.card }]}>
// //             <View style={styles.staffInfo}>
// //               <View style={[styles.avatar, { backgroundColor: theme.colors.primaryLight }]}>
// //                 <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
// //                   {staff.name.charAt(0)}
// //                 </Text>
// //               </View>
// //               <View style={styles.staffDetails}>
// //                 <Text style={[styles.staffName, { color: theme.colors.text }]}>{staff.name}</Text>
// //                 <Text style={[styles.staffRole, { color: theme.colors.textLight }]}>{staff.role}</Text>
// //                 <View style={styles.staffContact}>
// //                   <Mail size={14} color={theme.colors.textLight} />
// //                   <Text style={[styles.staffContactText, { color: theme.colors.textLight }]}>
// //                     {staff.email}
// //                   </Text>
// //                 </View>
// //                 <View style={styles.staffContact}>
// //                   <Phone size={14} color={theme.colors.textLight} />
// //                   <Text style={[styles.staffContactText, { color: theme.colors.textLight }]}>
// //                     {staff.phone}
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>
// //             <View style={styles.staffActions}>
// //               <TouchableOpacity
// //                 onPress={() => openEditModal(staff)}
// //                 style={[styles.actionButton, { backgroundColor: theme.colors.primaryLight }]}
// //               >
// //                 <Edit2 size={18} color={theme.colors.primary} />
// //               </TouchableOpacity>
// //               <TouchableOpacity
// //                 onPress={() => handleDeleteStaff(staff)}
// //                 style={[styles.actionButton, { backgroundColor: theme.colors.errorLight }]}
// //               >
// //                 <Trash2 size={18} color={theme.colors.error} />
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {showAddModal && renderStaffModal(false)}
// //       {showEditModal && renderStaffModal(true)}
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //   },
// //   backButton: {
// //     width: 40,
// //     height: 40,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   addButton: {
// //     width: 40,
// //     height: 40,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   content: {
// //     flex: 1,
// //     padding: 16,
// //   },
// //   staffCard: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 16,
// //     borderRadius: 12,
// //     marginBottom: 12,
// //   },
// //   staffInfo: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   avatar: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 12,
// //   },
// //   avatarText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   staffDetails: {
// //     flex: 1,
// //   },
// //   staffName: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     marginBottom: 2,
// //   },
// //   staffRole: {
// //     fontSize: 14,
// //     marginBottom: 4,
// //   },
// //   staffContact: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 2,
// //   },
// //   staffContactText: {
// //     fontSize: 12,
// //     marginLeft: 4,
// //   },
// //   staffActions: {
// //     flexDirection: 'row',
// //     gap: 8,
// //   },
// //   actionButton: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContainer: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     zIndex: 1000,
// //   },
// //   modalContent: {
// //     width: '90%',
// //     borderRadius: 12,
// //     padding: 20,
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 3.84,
// //       },
// //       android: {
// //         elevation: 5,
// //       },
// //     }),
// //   },
// //   modalTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   inputContainer: {
// //     marginBottom: 16,
// //   },
// //   inputLabel: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //   },
// //   input: {
// //     height: 48,
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 12,
// //     fontSize: 16,
// //   },
// //   modalButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 20,
// //   },
// //   modalButton: {
// //     flex: 1,
// //     marginHorizontal: 8,
// //   },
// // }); 

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   TextInput,
//   Alert,
//   Modal,
// } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import {
//   ArrowLeft,
//   Plus,
//   Edit2,
//   Trash2,
//   UserPlus,
//   Users,
//   Mail,
//   Phone,
//   Shield,
//   Save,
//   X,
//   User,
//   Crown,
//   Sparkles,
//   Building2,
//   CheckCircle,
// } from 'lucide-react-native';
// import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

// interface Staff {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
// }

// export default function StaffScreen() {
//   const { theme, themeType }: any = useTheme();
//   const router = useRouter();
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
//   const [staffList, setStaffList] = useState<Staff[]>([
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+91 9876543210',
//       role: 'Manager',
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       phone: '+91 9876543211',
//       role: 'Sales Executive',
//     },
//     {
//       id: '3',
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       phone: '+91 9876543212',
//       role: 'Accountant',
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//   });

//   const roleColors = {
//     'Manager': '#8B5CF6',
//     'Sales Executive': '#10B981',
//     'Accountant': '#F59E0B',
//     'Admin': '#EF4444',
//     'Staff': '#6B7280',
//   };

//   const getRoleColor = (role: string) => {
//     return roleColors[role as keyof typeof roleColors] || theme.colors.primary;
//   };

//   const handleAddStaff = () => {
//     if (!formData.name || !formData.email || !formData.phone || !formData.role) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     const newStaff: Staff = {
//       id: Date.now().toString(),
//       ...formData,
//     };

//     setStaffList([...staffList, newStaff]);
//     setShowAddModal(false);
//     setFormData({ name: '', email: '', phone: '', role: '' });
//   };

//   const handleEditStaff = () => {
//     if (!selectedStaff || !formData.name || !formData.email || !formData.phone || !formData.role) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     const updatedList = staffList.map((staff) =>
//       staff.id === selectedStaff.id ? { ...staff, ...formData } : staff
//     );

//     setStaffList(updatedList);
//     setShowEditModal(false);
//     setSelectedStaff(null);
//     setFormData({ name: '', email: '', phone: '', role: '' });
//   };

//   const handleDeleteStaff = (staff: Staff) => {
//     Alert.alert(
//       'Delete Staff',
//       `Are you sure you want to delete ${staff.name}?`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             setStaffList(staffList.filter((s) => s.id !== staff.id));
//           },
//         },
//       ]
//     );
//   };

//   const openEditModal = (staff: Staff) => {
//     setSelectedStaff(staff);
//     setFormData({
//       name: staff.name,
//       email: staff.email,
//       phone: staff.phone,
//       role: staff.role,
//     });
//     setShowEditModal(true);
//   };

//   const renderFormInput = (
//     label: string,
//     value: string,
//     onChangeText: (text: string) => void,
//     placeholder: string,
//     icon: React.ReactNode,
//     keyboardType: any = 'default'
//   ) => (
//     <View style={styles.formGroup}>
//       <View style={styles.labelContainer}>
//         {icon}
//         <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
//           {label}
//         </Text>
//       </View>
//       <View style={[
//         styles.inputContainer,
//         {
//           backgroundColor: themeType === 'dark'
//             ? 'rgba(255, 255, 255, 0.05)'
//             : 'rgba(255, 255, 255, 0.8)',
//           borderColor: themeType === 'dark'
//             ? 'rgba(255, 255, 255, 0.08)'
//             : 'rgba(0, 0, 0, 0.06)',
//         }
//       ]}>
//         <TextInput
//           style={[styles.textInput, { color: theme.colors.text }]}
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor={theme.colors.textSecondary}
//           keyboardType={keyboardType}
//         />
//       </View>
//     </View>
//   );

//   const renderStaffModal = (isEdit: boolean) => (
//     <Modal
//       visible={isEdit ? showEditModal : showAddModal}
//       transparent
//       animationType="fade"
//       onRequestClose={() => {
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setFormData({ name: '', email: '', phone: '', role: '' });
//       }}
//     >
//       <BlurView intensity={themeType === 'dark' ? 30 : 100} tint={themeType} style={styles.modalOverlay}>
//         <Animated.View entering={FadeIn.duration(300)} style={styles.modalContainer}>
//           <BlurView intensity={themeType === 'dark' ? 20 : 80} tint={themeType} style={styles.modalContent}>
//             <LinearGradient
//               colors={[
//                 `${theme.colors.primary}15`,
//                 `${theme.colors.primary}05`,
//                 'transparent'
//               ]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.modalGradientOverlay}
//             />
            
//             <View style={styles.modalHeader}>
//               <View style={styles.modalTitleContainer}>
//                 <UserPlus size={20} color={theme.colors.primary} />
//                 <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
//                   {isEdit ? 'Edit Staff Member' : 'Add New Staff'}
//                 </Text>
//               </View>
              
//               <TouchableOpacity
//                 style={[
//                   styles.closeButton,
//                   {
//                     backgroundColor: themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.08)'
//                       : 'rgba(0, 0, 0, 0.05)',
//                   }
//                 ]}
//                 onPress={() => {
//                   setShowAddModal(false);
//                   setShowEditModal(false);
//                   setFormData({ name: '', email: '', phone: '', role: '' });
//                 }}
//               >
//                 <X size={16} color={theme.colors.textSecondary} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.modalForm}>
//               {renderFormInput(
//                 'Full Name',
//                 formData.name,
//                 (text) => setFormData({ ...formData, name: text }),
//                 'Enter full name',
//                 <User size={16} color={theme.colors.primary} />
//               )}

//               {renderFormInput(
//                 'Email Address',
//                 formData.email,
//                 (text) => setFormData({ ...formData, email: text }),
//                 'Enter email address',
//                 <Mail size={16} color={theme.colors.secondary} />,
//                 'email-address'
//               )}

//               {renderFormInput(
//                 'Phone Number',
//                 formData.phone,
//                 (text) => setFormData({ ...formData, phone: text }),
//                 'Enter phone number',
//                 <Phone size={16} color={theme.colors.accent} />,
//                 'phone-pad'
//               )}

//               {renderFormInput(
//                 'Role/Position',
//                 formData.role,
//                 (text) => setFormData({ ...formData, role: text }),
//                 'Enter role or position',
//                 <Crown size={16} color={theme.colors.primary} />
//               )}
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[
//                   styles.cancelButton,
//                   {
//                     backgroundColor: themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.05)'
//                       : 'rgba(0, 0, 0, 0.05)',
//                     borderColor: themeType === 'dark'
//                       ? 'rgba(255, 255, 255, 0.08)'
//                       : 'rgba(0, 0, 0, 0.08)',
//                   }
//                 ]}
//                 onPress={() => {
//                   setShowAddModal(false);
//                   setShowEditModal(false);
//                   setFormData({ name: '', email: '', phone: '', role: '' });
//                 }}
//               >
//                 <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   { 
//                     backgroundColor: theme.colors.primary,
//                     shadowColor: theme.colors.primary,
//                   }
//                 ]}
//                 onPress={isEdit ? handleEditStaff : handleAddStaff}
//               >
//                 <LinearGradient
//                   colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
//                   style={styles.saveGradient}
//                 >
//                   <Save size={16} color="#FFFFFF" />
//                   <Text style={styles.saveButtonText}>
//                     {isEdit ? 'Save Changes' : 'Add Staff'}
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </BlurView>
//         </Animated.View>
//       </BlurView>
//     </Modal>
//   );

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      
//       {/* Ultra-modern header with gradient */}
//       <LinearGradient
//         colors={themeType === 'dark' 
//           ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent'] 
//           : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
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
//               <Users size={20} color="#FFFFFF" />
//               <Text style={styles.headerTitle}>Staff Management</Text>
//             </View>
            
//             <TouchableOpacity 
//               style={styles.addButton}
//               onPress={() => setShowAddModal(true)}
//             >
//               <Plus size={20} color="rgba(255, 255, 255, 0.9)" strokeWidth={2.5} />
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       {/* Staff Statistics */}
//       <View style={styles.statsContainer}>
//         <Animated.View entering={FadeInUp.delay(100)}>
//           <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.statsCard}>
//             <LinearGradient
//               colors={[
//                 `${theme.colors.primary}12`,
//                 `${theme.colors.primary}05`,
//                 'transparent'
//               ]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.statsGradientOverlay}
//             />
            
//             <View style={styles.statsContent}>
//               <View style={styles.statsItem}>
//                 <View style={[
//                   styles.statsIconContainer,
//                   { backgroundColor: `${theme.colors.primary}20` }
//                 ]}>
//                   <Users size={18} color={theme.colors.primary} />
//                 </View>
//                 <View style={styles.statsText}>
//                   <Text style={[styles.statsNumber, { color: theme.colors.text }]}>
//                     {staffList.length}
//                   </Text>
//                   <Text style={[styles.statsLabel, { color: theme.colors.textSecondary }]}>
//                     Total Staff
//                   </Text>
//                 </View>
//               </View>
              
//               <View style={styles.statsItem}>
//                 <View style={[
//                   styles.statsIconContainer,
//                   { backgroundColor: `${theme.colors.success}20` }
//                 ]}>
//                   <CheckCircle size={18} color={theme.colors.success} />
//                 </View>
//                 <View style={styles.statsText}>
//                   <Text style={[styles.statsNumber, { color: theme.colors.text }]}>
//                     {staffList.length}
//                   </Text>
//                   <Text style={[styles.statsLabel, { color: theme.colors.textSecondary }]}>
//                     Active
//                   </Text>
//                 </View>
//               </View>
              
//               <View style={styles.statsItem}>
//                 <View style={[
//                   styles.statsIconContainer,
//                   { backgroundColor: `${theme.colors.accent}20` }
//                 ]}>
//                   <Building2 size={18} color={theme.colors.accent} />
//                 </View>
//                 <View style={styles.statsText}>
//                   <Text style={[styles.statsNumber, { color: theme.colors.text }]}>
//                     {new Set(staffList.map(s => s.role)).size}
//                   </Text>
//                   <Text style={[styles.statsLabel, { color: theme.colors.textSecondary }]}>
//                     Roles
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </BlurView>
//         </Animated.View>
//       </View>

//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.staffListHeader}>
//           <Sparkles size={18} color={theme.colors.accent} />
//           <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
//             Team Members
//           </Text>
//         </View>

//         {staffList.map((staff, index) => (
//           <Animated.View 
//             key={staff.id}
//             entering={FadeInDown.delay(200 + index * 100)}
//           >
//             <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.staffCard}>
//               <LinearGradient
//                 colors={[
//                   `${getRoleColor(staff.role)}08`,
//                   `${getRoleColor(staff.role)}03`,
//                   'transparent'
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.staffGradientOverlay}
//               />
              
//               <View style={styles.staffContent}>
//                 <View style={styles.staffInfo}>
//                   <View style={[
//                     styles.avatar,
//                     { 
//                       backgroundColor: `${getRoleColor(staff.role)}20`,
//                       borderColor: `${getRoleColor(staff.role)}30`,
//                     }
//                   ]}>
//                     <Text style={[
//                       styles.avatarText, 
//                       { color: getRoleColor(staff.role) }
//                     ]}>
//                       {staff.name.charAt(0).toUpperCase()}
//                     </Text>
//                   </View>
                  
//                   <View style={styles.staffDetails}>
//                     <View style={styles.staffNameRow}>
//                       <Text style={[styles.staffName, { color: theme.colors.text }]}>
//                         {staff.name}
//                       </Text>
//                       <View style={[
//                         styles.roleBadge,
//                         { backgroundColor: `${getRoleColor(staff.role)}15` }
//                       ]}>
//                         <Text style={[
//                           styles.roleText,
//                           { color: getRoleColor(staff.role) }
//                         ]}>
//                           {staff.role}
//                         </Text>
//                       </View>
//                     </View>
                    
//                     <View style={styles.contactInfo}>
//                       <View style={styles.contactItem}>
//                         <Mail size={12} color={theme.colors.textSecondary} />
//                         <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>
//                           {staff.email}
//                         </Text>
//                       </View>
//                       <View style={styles.contactItem}>
//                         <Phone size={12} color={theme.colors.textSecondary} />
//                         <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>
//                           {staff.phone}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
                
//                 <View style={styles.staffActions}>
//                   <TouchableOpacity
//                     onPress={() => openEditModal(staff)}
//                     style={[
//                       styles.actionButton,
//                       { 
//                         backgroundColor: `${theme.colors.primary}15`,
//                         borderColor: `${theme.colors.primary}20`,
//                       }
//                     ]}
//                   >
//                     <Edit2 size={14} color={theme.colors.primary} />
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity
//                     onPress={() => handleDeleteStaff(staff)}
//                     style={[
//                       styles.actionButton,
//                       { 
//                         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//                         borderColor: 'rgba(239, 68, 68, 0.2)',
//                       }
//                     ]}
//                   >
//                     <Trash2 size={14} color="#EF4444" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </BlurView>
//           </Animated.View>
//         ))}
//       </ScrollView>

//       {renderStaffModal(false)}
//       {renderStaffModal(true)}
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
//   addButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statsContainer: {
//     paddingHorizontal: 20,
//     marginTop: -10,
//     marginBottom: 20,
//   },
//   statsCard: {
//     borderRadius: 20,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   statsGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   statsContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     position: 'relative',
//     zIndex: 2,
//   },
//   statsItem: {
//     alignItems: 'center',
//     gap: 8,
//   },
//   statsIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statsText: {
//     alignItems: 'center',
//   },
//   statsNumber: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.3,
//   },
//   statsLabel: {
//     fontSize: 11,
//     fontWeight: '500',
//     marginTop: 2,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   staffListHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//   },
//   staffCard: {
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   staffGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   staffContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     position: 'relative',
//     zIndex: 2,
//   },
//   staffInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   staffDetails: {
//     flex: 1,
//   },
//   staffNameRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   staffName: {
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//     flex: 1,
//     marginRight: 8,
//   },
//   roleBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//   },
//   roleText: {
//     fontSize: 10,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//   },
//   contactInfo: {
//     gap: 4,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   contactText: {
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   staffActions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     maxWidth: 400,
//   },
//   modalContent: {
//     borderRadius: 24,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   modalGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     position: 'relative',
//     zIndex: 2,
//   },
//   modalTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: -0.2,
//   },
//   closeButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalForm: {
//     gap: 16,
//     position: 'relative',
//     zIndex: 2,
//   },
//   formGroup: {
//     gap: 8,
//   },
//   labelContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '600',
//     letterSpacing: -0.1,
//   },
//   inputContainer: {
//     borderRadius: 12,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   textInput: {
//     fontSize: 15,
//     fontWeight: '500',
//     minHeight: 20,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 24,
//     position: 'relative',
//     zIndex: 2,
//   },
//   cancelButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   saveButton: {
//     flex: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//       web: {
//         boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
//       },
//     }),
//   },
//   saveGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 14,
//     gap: 8,
//   },
//   saveButtonText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     letterSpacing: -0.1,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  Users,
  Mail,
  Phone,
  Shield,
  Save,
  X,
  User,
  Crown,
  Sparkles,
  Building2,
  CheckCircle,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function StaffScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      role: 'Manager',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      role: 'Sales Executive',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      role: 'Accountant',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const roleColors = {
    'Manager': '#8B5CF6',
    'Sales Executive': '#10B981',
    'Accountant': '#F59E0B',
    'Admin': '#EF4444',
    'Staff': '#6B7280',
  };

  const getRoleColor = (role: string) => {
    return roleColors[role as keyof typeof roleColors] || theme.colors.primary;
  };

  const handleAddStaff = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newStaff: Staff = {
      id: Date.now().toString(),
      ...formData,
    };

    setStaffList([...staffList, newStaff]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', role: '' });
  };

  const handleEditStaff = () => {
    if (!selectedStaff || !formData.name || !formData.email || !formData.phone || !formData.role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedList = staffList.map((staff) =>
      staff.id === selectedStaff.id ? { ...staff, ...formData } : staff
    );

    setStaffList(updatedList);
    setShowEditModal(false);
    setSelectedStaff(null);
    setFormData({ name: '', email: '', phone: '', role: '' });
  };

  const handleDeleteStaff = (staff: Staff) => {
    Alert.alert(
      'Delete Staff',
      `Are you sure you want to delete ${staff.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setStaffList(staffList.filter((s) => s.id !== staff.id));
          },
        },
      ]
    );
  };

  const openEditModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
    });
    setShowEditModal(true);
  };

  const renderFormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: React.ReactNode,
    keyboardType: any = 'default'
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      </View>
      <View style={[
        styles.inputContainer,
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
          style={[styles.textInput, { color: theme.colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  const renderStaffModal = (isEdit: boolean) => (
    <Modal
      visible={isEdit ? showEditModal : showAddModal}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setShowAddModal(false);
        setShowEditModal(false);
        setFormData({ name: '', email: '', phone: '', role: '' });
      }}
    >
      <BlurView intensity={themeType === 'dark' ? 50 : 120} tint={themeType} style={styles.modalOverlay}>
        <Animated.View entering={FadeIn.duration(300)} style={styles.modalContainer}>
          <BlurView intensity={themeType === 'dark' ? 50 : 100} tint={themeType} style={styles.modalContent}>
            <LinearGradient
              colors={[
                `${theme.colors.primary}15`,
                `${theme.colors.primary}05`,
                'transparent'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalGradientOverlay}
            />
            
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <View style={[
                  styles.modalIconContainer,
                  { backgroundColor: `${theme.colors.primary}20` }
                ]}>
                  <UserPlus size={18} color={theme.colors.primary} />
                </View>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  {isEdit ? 'Edit Staff Member' : 'Add New Staff'}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                  }
                ]}
                onPress={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setFormData({ name: '', email: '', phone: '', role: '' });
                }}
              >
                <X size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              {renderFormInput(
                'Full Name',
                formData.name,
                (text) => setFormData({ ...formData, name: text }),
                'Enter full name',
                <User size={16} color={theme.colors.primary} />
              )}

              {renderFormInput(
                'Email Address',
                formData.email,
                (text) => setFormData({ ...formData, email: text }),
                'Enter email address',
                <Mail size={16} color={theme.colors.secondary} />,
                'email-address'
              )}

              {renderFormInput(
                'Phone Number',
                formData.phone,
                (text) => setFormData({ ...formData, phone: text }),
                'Enter phone number',
                <Phone size={16} color={theme.colors.accent} />,
                'phone-pad'
              )}

              {renderFormInput(
                'Role/Position',
                formData.role,
                (text) => setFormData({ ...formData, role: text }),
                'Enter role or position',
                <Crown size={16} color={theme.colors.primary} />
              )}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    backgroundColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)',
                    borderColor: themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(0, 0, 0, 0.1)',
                  }
                ]}
                onPress={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setFormData({ name: '', email: '', phone: '', role: '' });
                }}
              >
                <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { 
                    backgroundColor: theme.colors.primary,
                    shadowColor: theme.colors.primary,
                  }
                ]}
                onPress={isEdit ? handleEditStaff : handleAddStaff}
              >
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                  style={styles.saveGradient}
                >
                  <Save size={16} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>
                    {isEdit ? 'Save Changes' : 'Add Staff'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </BlurView>
    </Modal>
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
              <Users size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Staff Management</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Plus size={20} color="rgba(255, 255, 255, 0.9)" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Staff List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.staffListHeader}>
          <Sparkles size={18} color={theme.colors.accent} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Team Members
          </Text>
        </View>

        {staffList.map((staff, index) => (
          <Animated.View 
            key={staff.id}
            entering={FadeInDown.delay(100 + index * 100)}
          >
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.staffCard}>
              <LinearGradient
                colors={[
                  `${getRoleColor(staff.role)}08`,
                  `${getRoleColor(staff.role)}03`,
                  'transparent'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.staffGradientOverlay}
              />
              
              <View style={styles.staffContent}>
                <View style={styles.staffInfo}>
                  <View style={[
                    styles.avatar,
                    { 
                      backgroundColor: `${getRoleColor(staff.role)}20`,
                      borderColor: `${getRoleColor(staff.role)}30`,
                    }
                  ]}>
                    <Text style={[
                      styles.avatarText, 
                      { color: getRoleColor(staff.role) }
                    ]}>
                      {staff.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  
                  <View style={styles.staffDetails}>
                    <View style={styles.staffNameRow}>
                      <Text style={[styles.staffName, { color: theme.colors.text }]}>
                        {staff.name}
                      </Text>
                      <View style={[
                        styles.roleBadge,
                        { backgroundColor: `${getRoleColor(staff.role)}15` }
                      ]}>
                        <Text style={[
                          styles.roleText,
                          { color: getRoleColor(staff.role) }
                        ]}>
                          {staff.role}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.contactInfo}>
                      <View style={styles.contactItem}>
                        <Mail size={12} color={theme.colors.textSecondary} />
                        <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>
                          {staff.email}
                        </Text>
                      </View>
                      <View style={styles.contactItem}>
                        <Phone size={12} color={theme.colors.textSecondary} />
                        <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>
                          {staff.phone}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={styles.staffActions}>
                  <TouchableOpacity
                    onPress={() => openEditModal(staff)}
                    style={[
                      styles.actionButton,
                      { 
                        backgroundColor: `${theme.colors.primary}15`,
                        borderColor: `${theme.colors.primary}20`,
                      }
                    ]}
                  >
                    <Edit2 size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleDeleteStaff(staff)}
                    style={[
                      styles.actionButton,
                      { 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.2)',
                      }
                    ]}
                  >
                    <Trash2 size={14} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        ))}
      </ScrollView>

      {renderStaffModal(false)}
      {renderStaffModal(true)}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  staffListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  staffCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  staffGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  staffContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  staffInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  staffDetails: {
    flex: 1,
  },
  staffNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  staffName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
    flex: 1,
    marginRight: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  contactInfo: {
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 11,
    fontWeight: '500',
  },
  staffActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  modalGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    position: 'relative',
    zIndex: 2,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalForm: {
    gap: 16,
    position: 'relative',
    zIndex: 2,
  },
  formGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  textInput: {
    fontSize: 15,
    fontWeight: '500',
    minHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    position: 'relative',
    zIndex: 2,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
      },
    }),
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
});