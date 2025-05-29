import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Settings } from 'lucide-react-native';

export const BusinessInfoCard = () => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.card, 
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow
      }
    ]}>
      <View style={styles.content}>
        <View style={styles.businessDetails}>
          <Text 
            style={[
              styles.businessName, 
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }
            ]}
          >
            My Business
          </Text>
          <Text 
            style={[
              styles.businessType, 
              { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }
            ]}
          >
            Retail Store
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.settingsButton, 
            { backgroundColor: theme.colors.primaryLight }
          ]}
        >
          <Settings size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.infoRow, { borderTopColor: theme.colors.border }]}>
        <View style={styles.infoItem}>
          <Text 
            style={[
              styles.infoLabel, 
              { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }
            ]}
          >
            Subscription
          </Text>
          <Text 
            style={[
              styles.infoValue, 
              { color: theme.colors.success, fontFamily: theme.typography.fontFamily.medium }
            ]}
          >
            Silver Plan
          </Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.infoItem}>
          <Text 
            style={[
              styles.infoLabel, 
              { color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }
            ]}
          >
            Valid Till
          </Text>
          <Text 
            style={[
              styles.infoValue, 
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }
            ]}
          >
            01 Dec 2024
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  businessDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    marginBottom: 4,
  },
  businessType: {
    fontSize: 14,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});