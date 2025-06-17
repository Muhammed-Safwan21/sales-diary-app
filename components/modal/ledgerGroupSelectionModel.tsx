import API from '@/config/api';
import QUERY_KEY from '@/config/queryKey';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, FolderOpen, Search, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Types
interface Group {
  id: string;
  name: string;
  description?: string;
  type?: string;
  branchId: number;
}

interface GroupSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectGroup: (group: Group) => void;
  selectedGroup?: string;
}

const LedgerGroupSelectionModal: React.FC<GroupSelectionModalProps> = ({
  visible,
  onClose,
  onSelectGroup,
  selectedGroup,
}) => {
  const { theme, themeType }: any = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('');

  // Get branchId from Redux
  const branchId = useSelector((state: any) => state.auth?.branchInfo?.id);

  const {
    data: groups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.ACCOUNT_CATEGORIES, branchId, 'GROUP'],
    queryFn: async () =>
      await apiClient.get(API.ACCOUNT_CATEGORIES, {
        params: {
          branchId: branchId,
          categoryType: 'GROUP',
        },
      }),
    select: (res: any) => res?.data?.data,
    enabled: visible,
  });

  // Add group mutation
  const addGroupMutation = useMutation({
    mutationFn: async (groupData: any) => {
      return await apiClient.post(API.ACCOUNT_CATEGORIES, groupData);
    },
    onSuccess: () => {
      // Invalidate and refetch groups query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACCOUNT_CATEGORIES, branchId, 'GROUP'] });
      setNewGroupName('');
      setNewGroupDescription('');
      setNewGroupType('');
      Alert.alert('Success', 'Group added successfully!');
    },
    onError: (error: any) => {
      console.log('Group creation error', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to add group'
      );
    },
  });

  const filteredGroups = groups?.filter(
    (group: any) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (group.description && group.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (group.type && group.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectGroup = (group: Group) => {
    onSelectGroup(group);
    onClose();
    setSearchQuery('');
  };

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (!branchId) {
      console.error('Branch ID not found in Redux state');
      Alert.alert('Error', 'Branch ID not found');
      return;
    }

    const groupData = {
      name: newGroupName.trim(),
      description: newGroupDescription.trim() || undefined,
      type: newGroupType.trim() || undefined,
      branchId: Number(branchId),
    };

    console.log('Attempting to add group:', groupData);
    console.log('Current branchId from Redux:', branchId);

    try {
      addGroupMutation.mutate(groupData);
    } catch (error) {
      console.error('Error in handleAddGroup:', error);
      Alert.alert('Error', 'Failed to submit group data');
    }
  };

  const renderGroupItem = ({ item }: { item: Group }) => {
    const isSelected = selectedGroup === item.name;

    return (
      <Animated.View entering={FadeIn.delay(50)}>
        <TouchableOpacity
          style={[
            styles.groupItem,
            isSelected && {
              backgroundColor: `${theme.colors.primary}15`,
              borderColor: `${theme.colors.primary}40`,
            },
            {
              backgroundColor: isSelected
                ? `${theme.colors.primary}15`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.6)',
              borderColor: isSelected
                ? `${theme.colors.primary}40`
                : themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
          onPress={() => handleSelectGroup(item)}
          activeOpacity={0.7}
        >
          <View style={styles.groupItemContent}>
            <View style={styles.groupInfo}>
              <View
                style={[
                  styles.groupIconContainer,
                  {
                    backgroundColor: isSelected
                      ? `${theme.colors.primary}20`
                      : `${theme.colors.secondary}15`,
                  },
                ]}
              >
                <FolderOpen
                  size={16}
                  color={
                    isSelected ? theme.colors.primary : theme.colors.secondary
                  }
                />
              </View>
              <View style={styles.groupTextContainer}>
                <Text
                  style={[
                    styles.groupName,
                    {
                      color: isSelected
                        ? theme.colors.primary
                        : theme.colors.text,
                    },
                  ]}
                >
                  {item.name}
                </Text>
                {item.description && (
                  <Text
                    style={[
                      styles.groupDescription,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.description}
                  </Text>
                )}
                {item.type && (
                  <Text
                    style={[
                      styles.groupType,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Type: {item.type}
                  </Text>
                )}
              </View>
            </View>

            {isSelected && (
              <Animated.View entering={FadeIn.duration(200)}>
                <View
                  style={[
                    styles.checkContainer,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Check size={14} color="#FFFFFF" />
                </View>
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderHeader = () => (
    <BlurView
      intensity={themeType === 'dark' ? 20 : 80}
      tint={themeType}
      style={[
        styles.header,
        {
          paddingTop: 18,
          borderBottomColor:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    >
      <LinearGradient
        colors={[
          `${theme.colors.primary}15`,
          `${theme.colors.primary}05`,
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      />

      <View style={styles.headerContent}>
        <View style={styles.headerTitleContainer}>
          <FolderOpen size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            {'Select Group'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor:
                themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
            },
          ]}
          onPress={() => {
            setNewGroupName('');
            setNewGroupDescription('');
            setNewGroupType('');
            onClose();
          }}
        >
          <X size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {
        <View
          style={[
            styles.searchContainer,
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
        >
          <Search size={16} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search groups..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      }
    </BlurView>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
      <View
        style={[
          styles.emptyIconContainer,
          { backgroundColor: `${theme.colors.textSecondary}15` },
        ]}
      >
        <FolderOpen size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery ? 'No groups found' : 'No groups available'}
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        {searchQuery
          ? 'Try adjusting your search terms'
          : 'Add your first group to get started'}
      </Text>
    </Animated.View>
  );

  const renderLoadingState = () => (
    <Animated.View entering={FadeIn} style={styles.loadingState}>
      <View
        style={[
          styles.loadingIconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <FolderOpen size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
        Loading groups...
      </Text>
    </Animated.View>
  );

  const renderErrorState = () => (
    <Animated.View entering={FadeIn} style={styles.errorState}>
      <Text style={[styles.errorText, { color: '#EF4444' }]}>
        Failed to load groups
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
        onPress={() => refetch()}
      >
        <Text style={[styles.retryText, { color: theme.colors.primary }]}>
          Retry
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
      onRequestClose={() => {
        setNewGroupName('');
        setNewGroupDescription('');
        setNewGroupType('');
        onClose();
      }}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => {
            setNewGroupName('');
            setNewGroupDescription('');
            setNewGroupType('');
            onClose();
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(250)}
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            {renderHeader()}

            <View style={styles.content}>
              { isLoading ? (
                renderLoadingState()
              ) : error ? (
                renderErrorState()
              ) : filteredGroups.length === 0 ? (
                renderEmptyState()
              ) : (
                <FlatList
                  data={filteredGroups}
                  renderItem={renderGroupItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
              )}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: '85%',
    minHeight: '60%',
  },
  header: {
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'hidden',
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 2,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    position: 'relative',
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    minHeight: 200,
  },
  listContainer: {
    padding: 20,
  },
  groupItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  groupItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupTextContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  groupDescription: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  groupType: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 1,
    fontStyle: 'italic',
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFormContainer: {
    flex: 1,
    padding: 20,
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    // backgroundColor set dynamically
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LedgerGroupSelectionModal;