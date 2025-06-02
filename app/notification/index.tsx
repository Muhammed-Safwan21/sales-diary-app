import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Trash2,
  Clock,
  Sparkles,
  Filter,
  MoreVertical,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'payment' | 'invoice' | 'staff' | 'inventory';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}
function NotificationsScreen() {
  const { theme, themeType }: any = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹25,000 received from John Doe for Invoice #INV-001',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      isRead: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Headphones" is running low in stock (5 items left)',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      isRead: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'invoice',
      title: 'Invoice Due',
      message: 'Invoice #INV-002 is due tomorrow for client Jane Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      priority: 'high',
    },
    {
      id: '4',
      type: 'staff',
      title: 'New Staff Added',
      message: 'Mike Johnson has been added to your team as Sales Executive',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      priority: 'low',
    },
    {
      id: '5',
      type: 'success',
      title: 'Backup Complete',
      message: 'Your data has been successfully backed up to the cloud',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: 'low',
    },
    {
      id: '6',
      type: 'info',
      title: 'System Update',
      message: 'New features are available! Update to the latest version.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: false,
      priority: 'medium',
    },
  ]);

  const notificationConfig = {
    success: {
      icon: CheckCircle,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    warning: {
      icon: AlertTriangle,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.2)',
    },
    info: {
      icon: Info,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    payment: {
      icon: TrendingUp,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    invoice: {
      icon: CreditCard,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    staff: {
      icon: Users,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      borderColor: 'rgba(236, 72, 153, 0.2)',
    },
    inventory: {
      icon: Package,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.2)',
    },
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              <Bell size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={20} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Filter Controls */}
      <View style={styles.controlsContainer}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.controlsCard}>
            <View style={styles.controlsContent}>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === 'all' && styles.filterButtonActive,
                    {
                      backgroundColor: filter === 'all' 
                        ? theme.colors.primary 
                        : themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                      borderColor: filter === 'all'
                        ? theme.colors.primary
                        : themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.08)',
                    }
                  ]}
                  onPress={() => setFilter('all')}
                >
                  <Text style={[
                    styles.filterButtonText,
                    { color: filter === 'all' ? '#FFFFFF' : theme.colors.text }
                  ]}>
                    All ({notifications.length})
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === 'unread' && styles.filterButtonActive,
                    {
                      backgroundColor: filter === 'unread' 
                        ? theme.colors.primary 
                        : themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                      borderColor: filter === 'unread'
                        ? theme.colors.primary
                        : themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.08)',
                    }
                  ]}
                  onPress={() => setFilter('unread')}
                >
                  <Text style={[
                    styles.filterButtonText,
                    { color: filter === 'unread' ? '#FFFFFF' : theme.colors.text }
                  ]}>
                    Unread ({unreadCount})
                  </Text>
                </TouchableOpacity>
              </View>
              
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={[
                    styles.markAllButton,
                    { 
                      backgroundColor: `${theme.colors.success}15`,
                      borderColor: `${theme.colors.success}20`,
                    }
                  ]}
                  onPress={markAllAsRead}
                >
                  <CheckCircle size={14} color={theme.colors.success} />
                  <Text style={[styles.markAllText, { color: theme.colors.success }]}>
                    Mark all read
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </BlurView>
        </Animated.View>
      </View>

      {/* Notifications List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {filteredNotifications.length === 0 ? (
          <Animated.View entering={FadeInUp.delay(200)}>
            <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={styles.emptyState}>
              <View style={[
                styles.emptyIconContainer,
                { backgroundColor: `${theme.colors.primary}20` }
              ]}>
                <Bell size={32} color={theme.colors.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                {filter === 'unread' ? 'All caught up!' : 'No notifications'}
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
                {filter === 'unread' 
                  ? 'You have no unread notifications'
                  : 'You\'ll see important updates here'
                }
              </Text>
            </BlurView>
          </Animated.View>
        ) : (
          filteredNotifications.map((notification, index) => {
            const config = notificationConfig[notification.type];
            const IconComponent = config.icon;
            
            return (
              <Animated.View 
                key={notification.id}
                entering={FadeInDown.delay(200 + index * 100)}
              >
                <TouchableOpacity
                  style={styles.notificationWrapper}
                  onPress={() => markAsRead(notification.id)}
                  activeOpacity={0.8}
                >
                  <BlurView intensity={themeType === 'dark' ? 15 : 80} tint={themeType} style={[
                    styles.notificationCard,
                    !notification.isRead && {
                      backgroundColor: themeType === 'dark' 
                        ? `${theme.colors.primary}08`
                        : `${theme.colors.primary}05`,
                      borderColor: themeType === 'dark'
                        ? `${theme.colors.primary}20`
                        : `${theme.colors.primary}15`,
                    }
                  ]}>
                    {/* Enhanced gradient overlay for unread notifications */}
                    {!notification.isRead && (
                      <LinearGradient
                        colors={[
                          `${theme.colors.primary}06`,
                          `${config.color}04`,
                          'transparent'
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.notificationGradientOverlay}
                      />
                    )}
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <View style={styles.notificationLeft}>
                          <View style={[
                            styles.notificationIcon,
                            { 
                              backgroundColor: !notification.isRead 
                                ? config.color 
                                : config.bgColor,
                              borderColor: !notification.isRead 
                                ? config.color 
                                : config.borderColor,
                            }
                          ]}>
                            <IconComponent 
                              size={16} 
                              color={!notification.isRead ? '#FFFFFF' : config.color} 
                            />
                          </View>
                          
                          <View style={styles.notificationInfo}>
                            <View style={styles.titleRow}>
                              <Text style={[
                                styles.notificationTitle,
                                { 
                                  color: theme.colors.text,
                                  fontWeight: notification.isRead ? '600' : '700',
                                }
                              ]}>
                                {notification.title}
                              </Text>
                              {notification.priority === 'high' && (
                                <View style={[
                                  styles.priorityBadge,
                                  { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                                ]}>
                                  <Text style={[styles.priorityText, { color: '#EF4444' }]}>
                                    High
                                  </Text>
                                </View>
                              )}
                              {!notification.isRead && (
                                <View style={styles.newBadge}>
                                  <Sparkles size={10} color="#FFFFFF" />
                                  <Text style={styles.newBadgeText}>New</Text>
                                </View>
                              )}
                            </View>
                            
                            <Text style={[
                              styles.notificationMessage,
                              { 
                                color: !notification.isRead 
                                  ? theme.colors.text 
                                  : theme.colors.textSecondary,
                                fontWeight: !notification.isRead ? '500' : '400',
                              }
                            ]}>
                              {notification.message}
                            </Text>
                            
                            <View style={styles.notificationMeta}>
                              <Clock size={12} color={theme.colors.textSecondary} />
                              <Text style={[
                                styles.notificationTime,
                                { color: theme.colors.textSecondary }
                              ]}>
                                {getTimeAgo(notification.timestamp)}
                              </Text>
                              {!notification.isRead && (
                                <View style={[
                                  styles.unreadDot,
                                  { backgroundColor: theme.colors.primary }
                                ]} />
                              )}
                            </View>
                          </View>
                        </View>
                        
                        <TouchableOpacity
                          style={[
                            styles.deleteButton,
                            {
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              borderColor: 'rgba(239, 68, 68, 0.2)',
                            }
                          ]}
                          onPress={() => deleteNotification(notification.id)}
                        >
                          <Trash2 size={14} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </BlurView>
                </TouchableOpacity>
              </Animated.View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

export default NotificationsScreen;

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
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 20,
  },
  controlsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  controlsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  filterButtonActive: {},
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationWrapper: {
    marginBottom: 12,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  notificationGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notificationContent: {
    position: 'relative',
    zIndex: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    letterSpacing: -0.1,
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  notificationMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notificationTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});