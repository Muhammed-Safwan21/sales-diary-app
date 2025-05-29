import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Edit2, Trash2, UserPlus, Users, Mail, Phone, Shield } from 'lucide-react-native';
import { Button } from '@/components/shared/Button';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function StaffScreen() {
  const { theme } = useTheme();
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
      role: 'Sales',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

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

  const renderStaffModal = (isEdit: boolean) => (
    <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
          {isEdit ? 'Edit Staff' : 'Add New Staff'}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter name"
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }]}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter email"
            placeholderTextColor={theme.colors.textLight}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Phone</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }]}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter phone"
            placeholderTextColor={theme.colors.textLight}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Role</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }]}
            value={formData.role}
            onChangeText={(text) => setFormData({ ...formData, role: text })}
            placeholder="Enter role"
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        <View style={styles.modalButtons}>
          <Button
            variant="secondary"
            onPress={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setFormData({ name: '', email: '', phone: '', role: '' });
            }}
            style={styles.modalButton}
          >
            Cancel
          </Button>
          <Button
            onPress={isEdit ? handleEditStaff : handleAddStaff}
            style={styles.modalButton}
          >
            {isEdit ? 'Save Changes' : 'Add Staff'}
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Manage Staff</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
          <Plus size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {staffList.map((staff) => (
          <View key={staff.id} style={[styles.staffCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.staffInfo}>
              <View style={[styles.avatar, { backgroundColor: theme.colors.primaryLight }]}>
                <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
                  {staff.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.staffDetails}>
                <Text style={[styles.staffName, { color: theme.colors.text }]}>{staff.name}</Text>
                <Text style={[styles.staffRole, { color: theme.colors.textLight }]}>{staff.role}</Text>
                <View style={styles.staffContact}>
                  <Mail size={14} color={theme.colors.textLight} />
                  <Text style={[styles.staffContactText, { color: theme.colors.textLight }]}>
                    {staff.email}
                  </Text>
                </View>
                <View style={styles.staffContact}>
                  <Phone size={14} color={theme.colors.textLight} />
                  <Text style={[styles.staffContactText, { color: theme.colors.textLight }]}>
                    {staff.phone}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.staffActions}>
              <TouchableOpacity
                onPress={() => openEditModal(staff)}
                style={[styles.actionButton, { backgroundColor: theme.colors.primaryLight }]}
              >
                <Edit2 size={18} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteStaff(staff)}
                style={[styles.actionButton, { backgroundColor: theme.colors.errorLight }]}
              >
                <Trash2 size={18} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {showAddModal && renderStaffModal(false)}
      {showEditModal && renderStaffModal(true)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  staffCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  staffInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  staffDetails: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  staffRole: {
    fontSize: 14,
    marginBottom: 4,
  },
  staffContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  staffContactText: {
    fontSize: 12,
    marginLeft: 4,
  },
  staffActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 