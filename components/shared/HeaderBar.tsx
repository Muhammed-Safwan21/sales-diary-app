import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Search, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  rightElement?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBack = false,
  showSearch = false,
  showNotification = false,
  onSearchPress,
  onNotificationPress,
  rightElement,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {showSearch && (
          <TouchableOpacity
            style={[
              styles.iconButton,
              { marginRight: showNotification ? 8 : 0 },
            ]}
            onPress={onSearchPress}
          >
            <Search size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
          >
            <Bell size={24} color={theme.colors.text} />
            <View
              style={[
                styles.notificationBadge,
                { backgroundColor: theme.colors.notification },
              ]}
            />
          </TouchableOpacity>
        )}

        {rightElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});