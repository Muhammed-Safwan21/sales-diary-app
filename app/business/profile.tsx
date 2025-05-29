import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface BusinessProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  logo?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: '',
    address: '',
    phone: '',
    email: '',
    gstin: '',
    logo: undefined,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload a logo!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setBusinessProfile({ ...businessProfile, logo: result.assets[0].uri });
    }
  };

  const handleProfileUpdate = () => {
    // TODO: Implement profile update logic
    console.log('Profile updated:', businessProfile);
  };

  const handleCloseFinancialYear = () => {
    // TODO: Implement financial year closing logic
    console.log('Closing financial year');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Profile</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        
        <View style={styles.logoSection}>
          <TouchableOpacity style={styles.logoContainer} onPress={pickImage}>
            {businessProfile.logo ? (
              <Image source={{ uri: businessProfile.logo }} style={styles.logoImage} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Ionicons name="business" size={40} color="#666" />
                <Text style={styles.logoPlaceholderText}>Add Logo</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.logoHint}>Tap to upload business logo</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.name}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, name: text })}
            placeholder="Enter business name"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.address}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, address: text })}
            placeholder="Enter business address"
            multiline
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.phone}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, phone: text })}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.email}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, email: text })}
            placeholder="Enter email address"
            keyboardType="email-address"
          />

          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.gstin}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, gstin: text })}
            placeholder="Enter GSTIN"
          />

          <TouchableOpacity style={styles.updateButton} onPress={handleProfileUpdate}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Year</Text>
        {/* <View style={styles.financialYearCard}> */}
          <Text style={styles.financialYearText}>
            Current Financial Year: 2023-2024
          </Text>
          <TouchableOpacity 
            style={styles.closeYearButton}
            onPress={handleCloseFinancialYear}
          >
            <Text style={styles.closeYearButtonText}>Close Financial Year</Text>
          </TouchableOpacity>
        {/* </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal:16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  financialYearCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  financialYearText: {
    fontSize: 16,
    marginBottom: 12,
  },
  closeYearButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeYearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  logoHint: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
}); 