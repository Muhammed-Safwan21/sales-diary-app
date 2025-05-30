// // // // // // // import React from 'react';
// // // // // // // import { Tabs } from 'expo-router';
// // // // // // // import { useTheme } from '@/context/ThemeContext';
// // // // // // // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // // // // // // import { Platform, StyleSheet } from 'react-native';

// // // // // // // export default function TabLayout() {
// // // // // // //   const { theme } = useTheme();
  
// // // // // // //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// // // // // // //   return (
// // // // // // //     <Tabs
// // // // // // //       screenOptions={{
// // // // // // //         tabBarActiveTintColor: theme.colors.primary,
// // // // // // //         tabBarInactiveTintColor: theme.colors.textLight,
// // // // // // //         tabBarStyle: {
// // // // // // //           backgroundColor: theme.colors.card,
// // // // // // //           borderTopColor: theme.colors.border,
// // // // // // //           height: tabBarHeight,
// // // // // // //           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
// // // // // // //           paddingTop: 10,
// // // // // // //         },
// // // // // // //         tabBarLabelStyle: {
// // // // // // //           fontFamily: theme.typography.fontFamily.medium,
// // // // // // //           fontSize: 12,
// // // // // // //         },
// // // // // // //         headerShown: false,
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <Tabs.Screen
// // // // // // //         name="index"
// // // // // // //         options={{
// // // // // // //           title: 'Home',
// // // // // // //           tabBarIcon: ({ color, size }) => (
// // // // // // //             <Home size={size} color={color} />
// // // // // // //           ),
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <Tabs.Screen
// // // // // // //         name="reports"
// // // // // // //         options={{
// // // // // // //           title: 'Reports',
// // // // // // //           tabBarIcon: ({ color, size }) => (
// // // // // // //             <BarChart4 size={size} color={color} />
// // // // // // //           ),
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <Tabs.Screen
// // // // // // //         name="create"
// // // // // // //         options={{
// // // // // // //           title: 'Create',
// // // // // // //           tabBarIcon: ({ color, size }) => (
// // // // // // //             <PlusCircle size={size + 8} color={theme.colors.primary} />
// // // // // // //           ),
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <Tabs.Screen
// // // // // // //         name="parties"
// // // // // // //         options={{
// // // // // // //           title: 'Parties',
// // // // // // //           tabBarIcon: ({ color, size }) => (
// // // // // // //             <Users size={size} color={color} />
// // // // // // //           ),
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <Tabs.Screen
// // // // // // //         name="more"
// // // // // // //         options={{
// // // // // // //           title: 'More',
// // // // // // //           tabBarIcon: ({ color, size }) => (
// // // // // // //             <Menu size={size} color={color} />
// // // // // // //           ),
// // // // // // //         }}
// // // // // // //       />
// // // // // // //     </Tabs>
// // // // // // //   );
// // // // // // // }

// // // // // // import React from 'react';
// // // // // // import { Tabs } from 'expo-router';
// // // // // // import { useTheme } from '@/context/ThemeContext';
// // // // // // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // // // // // import { Platform, StyleSheet, View } from 'react-native';
// // // // // // import { BlurView } from 'expo-blur';
// // // // // // import { LinearGradient } from 'expo-linear-gradient';

// // // // // // export default function TabLayout() {
// // // // // //   const { theme, themeType }: any = useTheme();
  
// // // // // //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// // // // // //   return (
// // // // // //     <Tabs
// // // // // //       screenOptions={{
// // // // // //         tabBarActiveTintColor: theme.colors.primary,
// // // // // //         tabBarInactiveTintColor: themeType === 'dark' 
// // // // // //           ? 'rgba(255, 255, 255, 0.6)' 
// // // // // //           : 'rgba(0, 0, 0, 0.5)',
// // // // // //         tabBarStyle: {
// // // // // //           position: 'absolute',
// // // // // //           bottom: 0,
// // // // // //           left: 20,
// // // // // //           right: 20,
// // // // // //           marginBottom: Platform.OS === 'ios' ? 34 : 20,
// // // // // //           height: 65,
// // // // // //           backgroundColor: 'transparent',
// // // // // //           borderTopWidth: 0,
// // // // // //           elevation: 0,
// // // // // //           shadowOpacity: 0,
// // // // // //         },
// // // // // //         tabBarBackground: () => (
// // // // // //           <View style={styles.tabBarBackground}>
// // // // // //             {/* Glass morphism container */}
// // // // // //             <View style={[
// // // // // //               styles.glassContainer,
// // // // // //               {
// // // // // //                 backgroundColor: themeType === 'dark'
// // // // // //                   ? 'rgba(23, 23, 40, 0.85)'
// // // // // //                   : 'rgba(255, 255, 255, 0.85)',
// // // // // //                 borderColor: themeType === 'dark'
// // // // // //                   ? 'rgba(255, 255, 255, 0.1)'
// // // // // //                   : 'rgba(0, 0, 0, 0.05)',
// // // // // //               }
// // // // // //             ]}>
// // // // // //               {/* Subtle gradient overlay */}
// // // // // //               <LinearGradient
// // // // // //                 colors={themeType === 'dark' 
// // // // // //                   ? [
// // // // // //                       'rgba(99, 102, 241, 0.08)',
// // // // // //                       'rgba(139, 92, 246, 0.04)',
// // // // // //                       'transparent'
// // // // // //                     ]
// // // // // //                   : [
// // // // // //                       'rgba(99, 102, 241, 0.03)',
// // // // // //                       'rgba(139, 92, 246, 0.02)',
// // // // // //                       'transparent'
// // // // // //                     ]
// // // // // //                 }
// // // // // //                 start={{ x: 0, y: 0 }}
// // // // // //                 end={{ x: 1, y: 1 }}
// // // // // //                 style={styles.gradientOverlay}
// // // // // //               />
              
// // // // // //               {/* Top highlight */}
// // // // // //               <View style={[
// // // // // //                 styles.topHighlight,
// // // // // //                 {
// // // // // //                   backgroundColor: themeType === 'dark'
// // // // // //                     ? 'rgba(255, 255, 255, 0.05)'
// // // // // //                     : 'rgba(255, 255, 255, 0.8)',
// // // // // //                 }
// // // // // //               ]} />
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         ),
// // // // // //         tabBarLabelStyle: {
// // // // // //           fontSize: 11,
// // // // // //           fontWeight: '600',
// // // // // //           letterSpacing: -0.1,
// // // // // //           marginTop: 4,
// // // // // //         },
// // // // // //         tabBarItemStyle: {
// // // // // //           paddingVertical: 8,
// // // // // //         },
// // // // // //         headerShown: false,
// // // // // //       }}
// // // // // //     >
// // // // // //       <Tabs.Screen
// // // // // //         name="index"
// // // // // //         options={{
// // // // // //           title: 'Home',
// // // // // //           tabBarIcon: ({ color, focused }) => (
// // // // // //             <View style={[
// // // // // //               styles.iconContainer,
// // // // // //               focused && {
// // // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // // //               }
// // // // // //             ]}>
// // // // // //               <Home 
// // // // // //                 size={22} 
// // // // // //                 color={focused ? theme.colors.primary : color}
// // // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // // //               />
// // // // // //             </View>
// // // // // //           ),
// // // // // //         }}
// // // // // //       />
// // // // // //       <Tabs.Screen
// // // // // //         name="reports"
// // // // // //         options={{
// // // // // //           title: 'Reports',
// // // // // //           tabBarIcon: ({ color, focused }) => (
// // // // // //             <View style={[
// // // // // //               styles.iconContainer,
// // // // // //               focused && {
// // // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // // //               }
// // // // // //             ]}>
// // // // // //               <BarChart4 
// // // // // //                 size={22} 
// // // // // //                 color={focused ? theme.colors.primary : color}
// // // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // // //               />
// // // // // //             </View>
// // // // // //           ),
// // // // // //         }}
// // // // // //       />
// // // // // //       <Tabs.Screen
// // // // // //         name="create"
// // // // // //         options={{
// // // // // //           title: 'Create',
// // // // // //           tabBarIcon: ({ focused }) => (
// // // // // //             <View style={[
// // // // // //               styles.createIconContainer,
// // // // // //               {
// // // // // //                 backgroundColor: theme.colors.primary,
// // // // // //                 shadowColor: theme.colors.primary,
// // // // // //               }
// // // // // //             ]}>
// // // // // //               <LinearGradient
// // // // // //                 colors={[theme.colors.primary, theme.colors.primaryLight]}
// // // // // //                 style={styles.createGradient}
// // // // // //               >
// // // // // //                 <PlusCircle 
// // // // // //                   size={26} 
// // // // // //                   color="#FFFFFF"
// // // // // //                   strokeWidth={2.5}
// // // // // //                 />
// // // // // //               </LinearGradient>
// // // // // //             </View>
// // // // // //           ),
// // // // // //         }}
// // // // // //       />
// // // // // //       <Tabs.Screen
// // // // // //         name="parties"
// // // // // //         options={{
// // // // // //           title: 'Parties',
// // // // // //           tabBarIcon: ({ color, focused }) => (
// // // // // //             <View style={[
// // // // // //               styles.iconContainer,
// // // // // //               focused && {
// // // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // // //               }
// // // // // //             ]}>
// // // // // //               <Users 
// // // // // //                 size={22} 
// // // // // //                 color={focused ? theme.colors.primary : color}
// // // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // // //               />
// // // // // //             </View>
// // // // // //           ),
// // // // // //         }}
// // // // // //       />
// // // // // //       <Tabs.Screen
// // // // // //         name="more"
// // // // // //         options={{
// // // // // //           title: 'More',
// // // // // //           tabBarIcon: ({ color, focused }) => (
// // // // // //             <View style={[
// // // // // //               styles.iconContainer,
// // // // // //               focused && {
// // // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // // //               }
// // // // // //             ]}>
// // // // // //               <Menu 
// // // // // //                 size={22} 
// // // // // //                 color={focused ? theme.colors.primary : color}
// // // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // // //               />
// // // // // //             </View>
// // // // // //           ),
// // // // // //         }}
// // // // // //       />
// // // // // //     </Tabs>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   tabBarBackground: {
// // // // // //     flex: 1,
// // // // // //     overflow: 'hidden',
// // // // // //   },
// // // // // //   glassContainer: {
// // // // // //     flex: 1,
// // // // // //     borderRadius: 24,
// // // // // //     borderWidth: 1,
// // // // // //     overflow: 'hidden',
// // // // // //     ...Platform.select({
// // // // // //       ios: {
// // // // // //         shadowOffset: { width: 0, height: 8 },
// // // // // //         shadowOpacity: 0.15,
// // // // // //         shadowRadius: 16,
// // // // // //       },
// // // // // //       android: {
// // // // // //         elevation: 8,
// // // // // //       },
// // // // // //       web: {
// // // // // //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
// // // // // //       },
// // // // // //     }),
// // // // // //   },
// // // // // //   gradientOverlay: {
// // // // // //     position: 'absolute',
// // // // // //     top: 0,
// // // // // //     left: 0,
// // // // // //     right: 0,
// // // // // //     bottom: 0,
// // // // // //   },
// // // // // //   topHighlight: {
// // // // // //     position: 'absolute',
// // // // // //     top: 0,
// // // // // //     left: 0,
// // // // // //     right: 0,
// // // // // //     height: 1,
// // // // // //   },
// // // // // //   iconContainer: {
// // // // // //     width: 40,
// // // // // //     height: 40,
// // // // // //     borderRadius: 12,
// // // // // //     justifyContent: 'center',
// // // // // //     alignItems: 'center',
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: 'transparent',
// // // // // //   },
// // // // // //   createIconContainer: {
// // // // // //     width: 52,
// // // // // //     height: 52,
// // // // // //     borderRadius: 16,
// // // // // //     justifyContent: 'center',
// // // // // //     alignItems: 'center',
// // // // // //     marginTop: -8,
// // // // // //     ...Platform.select({
// // // // // //       ios: {
// // // // // //         shadowOffset: { width: 0, height: 4 },
// // // // // //         shadowOpacity: 0.3,
// // // // // //         shadowRadius: 8,
// // // // // //       },
// // // // // //       android: {
// // // // // //         elevation: 8,
// // // // // //       },
// // // // // //       web: {
// // // // // //         boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
// // // // // //       },
// // // // // //     }),
// // // // // //   },
// // // // // //   createGradient: {
// // // // // //     width: '100%',
// // // // // //     height: '100%',
// // // // // //     borderRadius: 16,
// // // // // //     justifyContent: 'center',
// // // // // //     alignItems: 'center',
// // // // // //   },
// // // // // // });

// // // // // import React from 'react';
// // // // // import { Tabs } from 'expo-router';
// // // // // import { useTheme } from '@/context/ThemeContext';
// // // // // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // // // // import { Platform, StyleSheet, View } from 'react-native';
// // // // // import { BlurView } from 'expo-blur';
// // // // // import { LinearGradient } from 'expo-linear-gradient';

// // // // // export default function TabLayout() {
// // // // //   const { theme, themeType }: any = useTheme();
  
// // // // //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// // // // //   return (
// // // // //     <Tabs
// // // // //       screenOptions={{
// // // // //         tabBarActiveTintColor: theme.colors.primary,
// // // // //         tabBarInactiveTintColor: themeType === 'dark' 
// // // // //           ? 'rgba(255, 255, 255, 0.6)' 
// // // // //           : 'rgba(0, 0, 0, 0.5)',
// // // // //         tabBarStyle: {
// // // // //           height: tabBarHeight,
// // // // //           backgroundColor: 'transparent',
// // // // //           borderTopWidth: 0,
// // // // //           elevation: 0,
// // // // //           shadowOpacity: 0,
// // // // //           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
// // // // //           paddingTop: 10,
// // // // //         },
// // // // //         tabBarBackground: () => (
// // // // //           <View style={styles.tabBarBackground}>
// // // // //             {/* Glass morphism container */}
// // // // //             <View style={[
// // // // //               styles.glassContainer,
// // // // //               {
// // // // //                 backgroundColor: themeType === 'dark'
// // // // //                   ? 'rgba(23, 23, 40, 0.85)'
// // // // //                   : 'rgba(255, 255, 255, 0.85)',
// // // // //                 borderColor: themeType === 'dark'
// // // // //                   ? 'rgba(255, 255, 255, 0.1)'
// // // // //                   : 'rgba(0, 0, 0, 0.05)',
// // // // //               }
// // // // //             ]}>
// // // // //               {/* Subtle gradient overlay */}
// // // // //               <LinearGradient
// // // // //                 colors={themeType === 'dark' 
// // // // //                   ? [
// // // // //                       'rgba(99, 102, 241, 0.08)',
// // // // //                       'rgba(139, 92, 246, 0.04)',
// // // // //                       'transparent'
// // // // //                     ]
// // // // //                   : [
// // // // //                       'rgba(99, 102, 241, 0.03)',
// // // // //                       'rgba(139, 92, 246, 0.02)',
// // // // //                       'transparent'
// // // // //                     ]
// // // // //                 }
// // // // //                 start={{ x: 0, y: 0 }}
// // // // //                 end={{ x: 1, y: 1 }}
// // // // //                 style={styles.gradientOverlay}
// // // // //               />
              
// // // // //               {/* Top highlight */}
// // // // //               <View style={[
// // // // //                 styles.topHighlight,
// // // // //                 {
// // // // //                   backgroundColor: themeType === 'dark'
// // // // //                     ? 'rgba(255, 255, 255, 0.05)'
// // // // //                     : 'rgba(255, 255, 255, 0.8)',
// // // // //                 }
// // // // //               ]} />
// // // // //             </View>
// // // // //           </View>
// // // // //         ),
// // // // //         tabBarLabelStyle: {
// // // // //           fontSize: 11,
// // // // //           fontWeight: '600',
// // // // //           letterSpacing: -0.1,
// // // // //           marginTop: 4,
// // // // //         },
// // // // //         tabBarItemStyle: {
// // // // //           paddingVertical: 8,
// // // // //         },
// // // // //         headerShown: false,
// // // // //       }}
// // // // //     >
// // // // //       <Tabs.Screen
// // // // //         name="index"
// // // // //         options={{
// // // // //           title: 'Home',
// // // // //           tabBarIcon: ({ color, focused }) => (
// // // // //             <View style={[
// // // // //               styles.iconContainer,
// // // // //               focused && {
// // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // //               }
// // // // //             ]}>
// // // // //               <Home 
// // // // //                 size={22} 
// // // // //                 color={focused ? theme.colors.primary : color}
// // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // //               />
// // // // //             </View>
// // // // //           ),
// // // // //         }}
// // // // //       />
// // // // //       <Tabs.Screen
// // // // //         name="reports"
// // // // //         options={{
// // // // //           title: 'Reports',
// // // // //           tabBarIcon: ({ color, focused }) => (
// // // // //             <View style={[
// // // // //               styles.iconContainer,
// // // // //               focused && {
// // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // //               }
// // // // //             ]}>
// // // // //               <BarChart4 
// // // // //                 size={22} 
// // // // //                 color={focused ? theme.colors.primary : color}
// // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // //               />
// // // // //             </View>
// // // // //           ),
// // // // //         }}
// // // // //       />
// // // // //       <Tabs.Screen
// // // // //         name="create"
// // // // //         options={{
// // // // //           title: 'Create',
// // // // //           tabBarIcon: ({ focused }) => (
// // // // //             <View style={[
// // // // //               styles.createIconContainer,
// // // // //               {
// // // // //                 backgroundColor: theme.colors.primary,
// // // // //                 shadowColor: theme.colors.primary,
// // // // //               }
// // // // //             ]}>
// // // // //               <LinearGradient
// // // // //                 colors={[theme.colors.primary, theme.colors.primaryLight]}
// // // // //                 style={styles.createGradient}
// // // // //               >
// // // // //                 <PlusCircle 
// // // // //                   size={26} 
// // // // //                   color="#FFFFFF"
// // // // //                   strokeWidth={2.5}
// // // // //                 />
// // // // //               </LinearGradient>
// // // // //             </View>
// // // // //           ),
// // // // //         }}
// // // // //       />
// // // // //       <Tabs.Screen
// // // // //         name="parties"
// // // // //         options={{
// // // // //           title: 'Parties',
// // // // //           tabBarIcon: ({ color, focused }) => (
// // // // //             <View style={[
// // // // //               styles.iconContainer,
// // // // //               focused && {
// // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // //               }
// // // // //             ]}>
// // // // //               <Users 
// // // // //                 size={22} 
// // // // //                 color={focused ? theme.colors.primary : color}
// // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // //               />
// // // // //             </View>
// // // // //           ),
// // // // //         }}
// // // // //       />
// // // // //       <Tabs.Screen
// // // // //         name="more"
// // // // //         options={{
// // // // //           title: 'More',
// // // // //           tabBarIcon: ({ color, focused }) => (
// // // // //             <View style={[
// // // // //               styles.iconContainer,
// // // // //               focused && {
// // // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // // //                 borderColor: `${theme.colors.primary}20`,
// // // // //               }
// // // // //             ]}>
// // // // //               <Menu 
// // // // //                 size={22} 
// // // // //                 color={focused ? theme.colors.primary : color}
// // // // //                 strokeWidth={focused ? 2.5 : 2}
// // // // //               />
// // // // //             </View>
// // // // //           ),
// // // // //         }}
// // // // //       />
// // // // //     </Tabs>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   tabBarBackground: {
// // // // //     flex: 1,
// // // // //     overflow: 'hidden',
// // // // //   },
// // // // //   glassContainer: {
// // // // //     flex: 1,
// // // // //     overflow: 'hidden',
// // // // //     backgroundColor: 'rgba(255, 255, 255, 0.02)',
// // // // //     ...Platform.select({
// // // // //       ios: {
// // // // //         shadowOffset: { width: 0, height: -2 },
// // // // //         shadowOpacity: 0.1,
// // // // //         shadowRadius: 8,
// // // // //       },
// // // // //       android: {
// // // // //         elevation: 4,
// // // // //       },
// // // // //       web: {
// // // // //         boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.08)',
// // // // //       },
// // // // //     }),
// // // // //   },
// // // // //   gradientOverlay: {
// // // // //     position: 'absolute',
// // // // //     top: 0,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     bottom: 0,
// // // // //   },
// // // // //   topHighlight: {
// // // // //     position: 'absolute',
// // // // //     top: 0,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     height: 1,
// // // // //   },
// // // // //   iconContainer: {
// // // // //     width: 40,
// // // // //     height: 40,
// // // // //     borderRadius: 12,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     borderWidth: 1,
// // // // //     borderColor: 'transparent',
// // // // //   },
// // // // //   createIconContainer: {
// // // // //     width: 52,
// // // // //     height: 52,
// // // // //     borderRadius: 16,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     marginTop: -8,
// // // // //     ...Platform.select({
// // // // //       ios: {
// // // // //         shadowOffset: { width: 0, height: 4 },
// // // // //         shadowOpacity: 0.3,
// // // // //         shadowRadius: 8,
// // // // //       },
// // // // //       android: {
// // // // //         elevation: 8,
// // // // //       },
// // // // //       web: {
// // // // //         boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
// // // // //       },
// // // // //     }),
// // // // //   },
// // // // //   createGradient: {
// // // // //     width: '100%',
// // // // //     height: '100%',
// // // // //     borderRadius: 16,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //   },
// // // // // });

// // // // import React from 'react';
// // // // import { Tabs } from 'expo-router';
// // // // import { useTheme } from '@/context/ThemeContext';
// // // // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // // // import { Platform, StyleSheet, View } from 'react-native';
// // // // import { BlurView } from 'expo-blur';
// // // // import { LinearGradient } from 'expo-linear-gradient';

// // // // export default function TabLayout() {
// // // //   const { theme, themeType }: any = useTheme();
  
// // // //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// // // //   return (
// // // //     <Tabs
// // // //       screenOptions={{
// // // //         tabBarActiveTintColor: theme.colors.primary,
// // // //         tabBarInactiveTintColor: themeType === 'dark' 
// // // //           ? 'rgba(255, 255, 255, 0.6)' 
// // // //           : 'rgba(0, 0, 0, 0.5)',
// // // //         tabBarStyle: {
// // // //           height: tabBarHeight,
// // // //           backgroundColor: 'transparent',
// // // //           borderTopWidth: 0,
// // // //           elevation: 0,
// // // //           shadowOpacity: 0,
// // // //           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
// // // //           paddingTop: 10,
// // // //         },
// // // //         tabBarBackground: () => (
// // // //           <View style={[
// // // //             styles.glassContainer,
// // // //             {
// // // //               backgroundColor: themeType === 'dark'
// // // //                 ? 'rgba(30, 30, 45, 0.95)'
// // // //                 : 'rgba(255, 255, 255, 0.95)',
// // // //               borderTopColor: themeType === 'dark'
// // // //                 ? 'rgba(255, 255, 255, 0.08)'
// // // //                 : 'rgba(0, 0, 0, 0.06)',
// // // //             }
// // // //           ]}>
// // // //             {/* Subtle gradient overlay */}
// // // //             <LinearGradient
// // // //               colors={themeType === 'dark' 
// // // //                 ? [
// // // //                     'rgba(99, 102, 241, 0.05)',
// // // //                     'rgba(139, 92, 246, 0.03)',
// // // //                     'transparent'
// // // //                   ]
// // // //                 : [
// // // //                     'rgba(99, 102, 241, 0.02)',
// // // //                     'rgba(139, 92, 246, 0.01)',
// // // //                     'transparent'
// // // //                   ]
// // // //               }
// // // //               start={{ x: 0, y: 0 }}
// // // //               end={{ x: 1, y: 1 }}
// // // //               style={styles.gradientOverlay}
// // // //             />
            
// // // //             {/* Top border */}
// // // //             <View style={[
// // // //               styles.topBorder,
// // // //               {
// // // //                 backgroundColor: themeType === 'dark'
// // // //                   ? 'rgba(255, 255, 255, 0.08)'
// // // //                   : 'rgba(0, 0, 0, 0.06)',
// // // //               }
// // // //             ]} />
// // // //           </View>
// // // //         ),
// // // //         tabBarLabelStyle: {
// // // //           fontSize: 11,
// // // //           fontWeight: '600',
// // // //           letterSpacing: -0.1,
// // // //           marginTop: 4,
// // // //         },
// // // //         tabBarItemStyle: {
// // // //           paddingVertical: 8,
// // // //         },
// // // //         headerShown: false,
// // // //       }}
// // // //     >
// // // //       <Tabs.Screen
// // // //         name="index"
// // // //         options={{
// // // //           title: 'Home',
// // // //           tabBarIcon: ({ color, focused }) => (
// // // //             <View style={[
// // // //               styles.iconContainer,
// // // //               focused && {
// // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // //                 borderColor: `${theme.colors.primary}20`,
// // // //               }
// // // //             ]}>
// // // //               <Home 
// // // //                 size={22} 
// // // //                 color={focused ? theme.colors.primary : color}
// // // //                 strokeWidth={focused ? 2.5 : 2}
// // // //               />
// // // //             </View>
// // // //           ),
// // // //         }}
// // // //       />
// // // //       <Tabs.Screen
// // // //         name="reports"
// // // //         options={{
// // // //           title: 'Reports',
// // // //           tabBarIcon: ({ color, focused }) => (
// // // //             <View style={[
// // // //               styles.iconContainer,
// // // //               focused && {
// // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // //                 borderColor: `${theme.colors.primary}20`,
// // // //               }
// // // //             ]}>
// // // //               <BarChart4 
// // // //                 size={22} 
// // // //                 color={focused ? theme.colors.primary : color}
// // // //                 strokeWidth={focused ? 2.5 : 2}
// // // //               />
// // // //             </View>
// // // //           ),
// // // //         }}
// // // //       />
// // // //       <Tabs.Screen
// // // //         name="create"
// // // //         options={{
// // // //           title: 'Create',
// // // //           tabBarIcon: ({ color, focused }) => (
// // // //             <View style={[
// // // //               styles.iconContainer,
// // // //               focused && {
// // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // //                 borderColor: `${theme.colors.primary}20`,
// // // //               }
// // // //             ]}>
// // // //               <PlusCircle 
// // // //                 size={22} 
// // // //                 color={focused ? theme.colors.primary : color}
// // // //                 strokeWidth={focused ? 2.5 : 2}
// // // //               />
// // // //             </View>
// // // //           ),
// // // //         }}
// // // //       />
// // // //       <Tabs.Screen
// // // //         name="parties"
// // // //         options={{
// // // //           title: 'Parties',
// // // //           tabBarIcon: ({ color, focused }) => (
// // // //             <View style={[
// // // //               styles.iconContainer,
// // // //               focused && {
// // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // //                 borderColor: `${theme.colors.primary}20`,
// // // //               }
// // // //             ]}>
// // // //               <Users 
// // // //                 size={22} 
// // // //                 color={focused ? theme.colors.primary : color}
// // // //                 strokeWidth={focused ? 2.5 : 2}
// // // //               />
// // // //             </View>
// // // //           ),
// // // //         }}
// // // //       />
// // // //       <Tabs.Screen
// // // //         name="more"
// // // //         options={{
// // // //           title: 'More',
// // // //           tabBarIcon: ({ color, focused }) => (
// // // //             <View style={[
// // // //               styles.iconContainer,
// // // //               focused && {
// // // //                 backgroundColor: `${theme.colors.primary}15`,
// // // //                 borderColor: `${theme.colors.primary}20`,
// // // //               }
// // // //             ]}>
// // // //               <Menu 
// // // //                 size={22} 
// // // //                 color={focused ? theme.colors.primary : color}
// // // //                 strokeWidth={focused ? 2.5 : 2}
// // // //               />
// // // //             </View>
// // // //           ),
// // // //         }}
// // // //       />
// // // //     </Tabs>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   glassContainer: {
// // // //     flex: 1,
// // // //     overflow: 'hidden',
// // // //     borderTopWidth: 1,
// // // //     ...Platform.select({
// // // //       ios: {
// // // //         shadowOffset: { width: 0, height: -2 },
// // // //         shadowOpacity: 0.08,
// // // //         shadowRadius: 8,
// // // //       },
// // // //       android: {
// // // //         elevation: 4,
// // // //       },
// // // //       web: {
// // // //         boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
// // // //       },
// // // //     }),
// // // //   },
// // // //   gradientOverlay: {
// // // //     position: 'absolute',
// // // //     top: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     bottom: 0,
// // // //   },
// // // //   topBorder: {
// // // //     position: 'absolute',
// // // //     top: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     height: 1,
// // // //   },
// // // //   iconContainer: {
// // // //     width: 40,
// // // //     height: 40,
// // // //     borderRadius: 12,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //     borderWidth: 1,
// // // //     borderColor: 'transparent',
// // // //   },
// // // // });

// // // import React from 'react';
// // // import { Tabs } from 'expo-router';
// // // import { useTheme } from '@/context/ThemeContext';
// // // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // // import { Platform, StyleSheet, View } from 'react-native';
// // // import { BlurView } from 'expo-blur';
// // // import { LinearGradient } from 'expo-linear-gradient';

// // // export default function TabLayout() {
// // //   const { theme, themeType }: any = useTheme();
  
// // //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// // //   return (
// // //     <Tabs
// // //       screenOptions={{
// // //         tabBarActiveTintColor: theme.colors.primary,
// // //         tabBarInactiveTintColor: themeType === 'dark' 
// // //           ? 'rgba(255, 255, 255, 0.6)' 
// // //           : 'rgba(0, 0, 0, 0.5)',
// // //         tabBarStyle: {
// // //           height: tabBarHeight,
// // //           backgroundColor: 'transparent',
// // //           borderTopWidth: 0,
// // //           elevation: 0,
// // //           shadowOpacity: 0,
// // //           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
// // //           paddingTop: 10,
// // //         },
// // //         tabBarBackground: () => (
// // //           <View style={[
// // //             styles.glassContainer,
// // //             {
// // //               backgroundColor: themeType === 'dark'
// // //                 ? 'rgba(30, 30, 45, 0.95)'
// // //                 : 'rgba(255, 255, 255, 0.95)',
// // //               borderTopColor: themeType === 'dark'
// // //                 ? 'rgba(255, 255, 255, 0.08)'
// // //                 : 'rgba(0, 0, 0, 0.06)',
// // //             }
// // //           ]}>
// // //             {/* Subtle gradient overlay */}
// // //             <LinearGradient
// // //               colors={themeType === 'dark' 
// // //                 ? [
// // //                     'rgba(99, 102, 241, 0.05)',
// // //                     'rgba(139, 92, 246, 0.03)',
// // //                     'transparent'
// // //                   ]
// // //                 : [
// // //                     'rgba(99, 102, 241, 0.02)',
// // //                     'rgba(139, 92, 246, 0.01)',
// // //                     'transparent'
// // //                   ]
// // //               }
// // //               start={{ x: 0, y: 0 }}
// // //               end={{ x: 1, y: 1 }}
// // //               style={styles.gradientOverlay}
// // //             />
            
// // //             {/* Top border */}
// // //             <View style={[
// // //               styles.topBorder,
// // //               {
// // //                 backgroundColor: themeType === 'dark'
// // //                   ? 'rgba(255, 255, 255, 0.08)'
// // //                   : 'rgba(0, 0, 0, 0.06)',
// // //               }
// // //             ]} />
// // //           </View>
// // //         ),
// // //         tabBarLabelStyle: {
// // //           fontSize: 11,
// // //           fontWeight: '600',
// // //           letterSpacing: -0.1,
// // //           marginTop: 4,
// // //         },
// // //         tabBarItemStyle: {
// // //           paddingVertical: 8,
// // //         },
// // //         headerShown: false,
// // //       }}
// // //     >
// // //       <Tabs.Screen
// // //         name="index"
// // //         options={{
// // //           title: 'Home',
// // //           tabBarIcon: ({ color, focused }) => (
// // //             <View style={[
// // //               styles.modernIconContainer,
// // //               focused && [
// // //                 styles.focusedIconContainer,
// // //                 { backgroundColor: `${theme.colors.primary}12` }
// // //               ]
// // //             ]}>
// // //               <View style={[
// // //                 styles.iconBackground,
// // //                 focused && { 
// // //                   backgroundColor: `${theme.colors.primary}20`,
// // //                   borderColor: `${theme.colors.primary}30`,
// // //                 }
// // //               ]}>
// // //                 <Home 
// // //                   size={20} 
// // //                   color={focused ? theme.colors.primary : color}
// // //                   strokeWidth={focused ? 2.2 : 1.8}
// // //                 />
// // //               </View>
// // //             </View>
// // //           ),
// // //         }}
// // //       />
// // //       <Tabs.Screen
// // //         name="reports"
// // //         options={{
// // //           title: 'Reports',
// // //           tabBarIcon: ({ color, focused }) => (
// // //             <View style={[
// // //               styles.modernIconContainer,
// // //               focused && [
// // //                 styles.focusedIconContainer,
// // //                 { backgroundColor: `${theme.colors.primary}12` }
// // //               ]
// // //             ]}>
// // //               <View style={[
// // //                 styles.iconBackground,
// // //                 focused && { 
// // //                   backgroundColor: `${theme.colors.primary}20`,
// // //                   borderColor: `${theme.colors.primary}30`,
// // //                 }
// // //               ]}>
// // //                 <BarChart4 
// // //                   size={20} 
// // //                   color={focused ? theme.colors.primary : color}
// // //                   strokeWidth={focused ? 2.2 : 1.8}
// // //                 />
// // //               </View>
// // //             </View>
// // //           ),
// // //         }}
// // //       />
// // //       <Tabs.Screen
// // //         name="create"
// // //         options={{
// // //           title: 'Create',
// // //           tabBarIcon: ({ color, focused }) => (
// // //             <View style={[
// // //               styles.modernIconContainer,
// // //               focused && [
// // //                 styles.focusedIconContainer,
// // //                 { backgroundColor: `${theme.colors.primary}12` }
// // //               ]
// // //             ]}>
// // //               <View style={[
// // //                 styles.iconBackground,
// // //                 focused && { 
// // //                   backgroundColor: `${theme.colors.primary}20`,
// // //                   borderColor: `${theme.colors.primary}30`,
// // //                 }
// // //               ]}>
// // //                 <PlusCircle 
// // //                   size={20} 
// // //                   color={focused ? theme.colors.primary : color}
// // //                   strokeWidth={focused ? 2.2 : 1.8}
// // //                 />
// // //               </View>
// // //             </View>
// // //           ),
// // //         }}
// // //       />
// // //       <Tabs.Screen
// // //         name="parties"
// // //         options={{
// // //           title: 'Parties',
// // //           tabBarIcon: ({ color, focused }) => (
// // //             <View style={[
// // //               styles.modernIconContainer,
// // //               focused && [
// // //                 styles.focusedIconContainer,
// // //                 { backgroundColor: `${theme.colors.primary}12` }
// // //               ]
// // //             ]}>
// // //               <View style={[
// // //                 styles.iconBackground,
// // //                 focused && { 
// // //                   backgroundColor: `${theme.colors.primary}20`,
// // //                   borderColor: `${theme.colors.primary}30`,
// // //                 }
// // //               ]}>
// // //                 <Users 
// // //                   size={20} 
// // //                   color={focused ? theme.colors.primary : color}
// // //                   strokeWidth={focused ? 2.2 : 1.8}
// // //                 />
// // //               </View>
// // //             </View>
// // //           ),
// // //         }}
// // //       />
// // //       <Tabs.Screen
// // //         name="more"
// // //         options={{
// // //           title: 'More',
// // //           tabBarIcon: ({ color, focused }) => (
// // //             <View style={[
// // //               styles.modernIconContainer,
// // //               focused && [
// // //                 styles.focusedIconContainer,
// // //                 { backgroundColor: `${theme.colors.primary}12` }
// // //               ]
// // //             ]}>
// // //               <View style={[
// // //                 styles.iconBackground,
// // //                 focused && { 
// // //                   backgroundColor: `${theme.colors.primary}20`,
// // //                   borderColor: `${theme.colors.primary}30`,
// // //                 }
// // //               ]}>
// // //                 <Menu 
// // //                   size={20} 
// // //                   color={focused ? theme.colors.primary : color}
// // //                   strokeWidth={focused ? 2.2 : 1.8}
// // //                 />
// // //               </View>
// // //             </View>
// // //           ),
// // //         }}
// // //       />
// // //     </Tabs>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   glassContainer: {
// // //     flex: 1,
// // //     overflow: 'hidden',
// // //     borderTopWidth: 1,
// // //     ...Platform.select({
// // //       ios: {
// // //         shadowOffset: { width: 0, height: -2 },
// // //         shadowOpacity: 0.08,
// // //         shadowRadius: 8,
// // //       },
// // //       android: {
// // //         elevation: 4,
// // //       },
// // //       web: {
// // //         boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
// // //       },
// // //     }),
// // //   },
// // //   gradientOverlay: {
// // //     position: 'absolute',
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //   },
// // //   topBorder: {
// // //     position: 'absolute',
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     height: 1,
// // //   },
// // //   modernIconContainer: {
// // //     width: 50,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginBottom: 2,
// // //   },
// // //   focusedIconContainer: {
// // //     transform: [{ scale: 1.05 }],
// // //   },
// // //   iconBackground: {
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     borderWidth: 1,
// // //     borderColor: 'transparent',
// // //   },
// // // });


// // import React from 'react';
// // import { Tabs } from 'expo-router';
// // import { useTheme } from '@/context/ThemeContext';
// // import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// // import { Platform, StyleSheet, View } from 'react-native';
// // import { BlurView } from 'expo-blur';
// // import { LinearGradient } from 'expo-linear-gradient';

// // export default function TabLayout() {
// //   const { theme, themeType }: any = useTheme();
  
// //   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
// //   return (
// //     <Tabs
// //       screenOptions={{
// //         tabBarActiveTintColor: theme.colors.primary,
// //         tabBarInactiveTintColor: themeType === 'dark' 
// //           ? 'rgba(255, 255, 255, 0.6)' 
// //           : 'rgba(0, 0, 0, 0.5)',
// //         tabBarStyle: {
// //           height: tabBarHeight,
// //           backgroundColor: 'transparent',
// //           borderTopWidth: 0,
// //           elevation: 0,
// //           shadowOpacity: 0,
// //           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
// //           paddingTop: 10,
// //         },
// //         tabBarBackground: () => (
// //           <View style={[
// //             styles.glassContainer,
// //             {
// //               backgroundColor: themeType === 'dark'
// //                 ? 'rgba(30, 30, 45, 0.95)'
// //                 : 'rgba(255, 255, 255, 0.95)',
// //               borderTopColor: themeType === 'dark'
// //                 ? 'rgba(255, 255, 255, 0.08)'
// //                 : 'rgba(0, 0, 0, 0.06)',
// //             }
// //           ]}>
// //             {/* Subtle gradient overlay */}
// //             <LinearGradient
// //               colors={themeType === 'dark' 
// //                 ? [
// //                     'rgba(99, 102, 241, 0.05)',
// //                     'rgba(139, 92, 246, 0.03)',
// //                     'transparent'
// //                   ]
// //                 : [
// //                     'rgba(99, 102, 241, 0.02)',
// //                     'rgba(139, 92, 246, 0.01)',
// //                     'transparent'
// //                   ]
// //               }
// //               start={{ x: 0, y: 0 }}
// //               end={{ x: 1, y: 1 }}
// //               style={styles.gradientOverlay}
// //             />
            
// //             {/* Top border */}
// //             <View style={[
// //               styles.topBorder,
// //               {
// //                 backgroundColor: themeType === 'dark'
// //                   ? 'rgba(255, 255, 255, 0.08)'
// //                   : 'rgba(0, 0, 0, 0.06)',
// //               }
// //             ]} />
// //           </View>
// //         ),
// //         tabBarLabelStyle: {
// //           fontSize: 11,
// //           fontWeight: '600',
// //           letterSpacing: -0.1,
// //           marginTop: 4,
// //         },
// //         tabBarItemStyle: {
// //           paddingVertical: 8,
// //         },
// //         headerShown: false,
// //       }}
// //     >
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: 'Home',
// //           tabBarIcon: ({ color, focused }) => (
// //             <View style={[
// //               styles.modernIconContainer,
// //               focused && [
// //                 styles.focusedIconContainer,
// //                 { backgroundColor: `${theme.colors.primary}12` }
// //               ]
// //             ]}>
// //               <View style={[
// //                 styles.iconBackground,
// //                 focused && { 
// //                   backgroundColor: `${theme.colors.primary}20`,
// //                   borderColor: `${theme.colors.primary}30`,
// //                 }
// //               ]}>
// //                 <Home 
// //                   size={20} 
// //                   color={focused ? theme.colors.primary : color}
// //                   strokeWidth={focused ? 2.2 : 1.8}
// //                 />
// //               </View>
// //             </View>
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="reports"
// //         options={{
// //           title: 'Reports',
// //           tabBarIcon: ({ color, focused }) => (
// //             <View style={[
// //               styles.modernIconContainer,
// //               focused && [
// //                 styles.focusedIconContainer,
// //                 { backgroundColor: `${theme.colors.primary}12` }
// //               ]
// //             ]}>
// //               <View style={[
// //                 styles.iconBackground,
// //                 focused && { 
// //                   backgroundColor: `${theme.colors.primary}20`,
// //                   borderColor: `${theme.colors.primary}30`,
// //                 }
// //               ]}>
// //                 <BarChart4 
// //                   size={20} 
// //                   color={focused ? theme.colors.primary : color}
// //                   strokeWidth={focused ? 2.2 : 1.8}
// //                 />
// //               </View>
// //             </View>
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="create"
// //         options={{
// //           title: '',
// //           tabBarIcon: ({ color, focused }) => (
// //             <View style={[
// //               styles.createIconContainer,
// //               {
// //                 shadowColor: theme.colors.primary,
// //               }
// //             ]}>
// //               <LinearGradient
// //                 colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
// //                 style={styles.createGradient}
// //               >
// //                 <View style={styles.createIconInner}>
// //                   <View style={styles.plusIcon}>
// //                     <View style={[styles.plusHorizontal, { backgroundColor: '#FFFFFF' }]} />
// //                     <View style={[styles.plusVertical, { backgroundColor: '#FFFFFF' }]} />
// //                   </View>
// //                 </View>
// //               </LinearGradient>
// //             </View>
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="parties"
// //         options={{
// //           title: 'Parties',
// //           tabBarIcon: ({ color, focused }) => (
// //             <View style={[
// //               styles.modernIconContainer,
// //               focused && [
// //                 styles.focusedIconContainer,
// //                 { backgroundColor: `${theme.colors.primary}12` }
// //               ]
// //             ]}>
// //               <View style={[
// //                 styles.iconBackground,
// //                 focused && { 
// //                   backgroundColor: `${theme.colors.primary}20`,
// //                   borderColor: `${theme.colors.primary}30`,
// //                 }
// //               ]}>
// //                 <Users 
// //                   size={20} 
// //                   color={focused ? theme.colors.primary : color}
// //                   strokeWidth={focused ? 2.2 : 1.8}
// //                 />
// //               </View>
// //             </View>
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="more"
// //         options={{
// //           title: 'More',
// //           tabBarIcon: ({ color, focused }) => (
// //             <View style={[
// //               styles.modernIconContainer,
// //               focused && [
// //                 styles.focusedIconContainer,
// //                 { backgroundColor: `${theme.colors.primary}12` }
// //               ]
// //             ]}>
// //               <View style={[
// //                 styles.iconBackground,
// //                 focused && { 
// //                   backgroundColor: `${theme.colors.primary}20`,
// //                   borderColor: `${theme.colors.primary}30`,
// //                 }
// //               ]}>
// //                 <Menu 
// //                   size={20} 
// //                   color={focused ? theme.colors.primary : color}
// //                   strokeWidth={focused ? 2.2 : 1.8}
// //                 />
// //               </View>
// //             </View>
// //           ),
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   glassContainer: {
// //     flex: 1,
// //     overflow: 'hidden',
// //     borderTopWidth: 1,
// //     ...Platform.select({
// //       ios: {
// //         shadowOffset: { width: 0, height: -2 },
// //         shadowOpacity: 0.08,
// //         shadowRadius: 8,
// //       },
// //       android: {
// //         elevation: 4,
// //       },
// //       web: {
// //         boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
// //       },
// //     }),
// //   },
// //   gradientOverlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //   },
// //   topBorder: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: 1,
// //   },
// //   modernIconContainer: {
// //     width: 50,
// //     height: 36,
// //     borderRadius: 18,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 2,
// //   },
// //   focusedIconContainer: {
// //     transform: [{ scale: 1.05 }],
// //   },
// //   iconBackground: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: 'transparent',
// //   },
// //   createIconContainer: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: -4,
// //     ...Platform.select({
// //       ios: {
// //         shadowOffset: { width: 0, height: 4 },
// //         shadowOpacity: 0.2,
// //         shadowRadius: 8,
// //       },
// //       android: {
// //         elevation: 6,
// //       },
// //       web: {
// //         boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
// //       },
// //     }),
// //   },
// //   createGradient: {
// //     width: '100%',
// //     height: '100%',
// //     borderRadius: 24,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   createIconInner: {
// //     width: 20,
// //     height: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   plusIcon: {
// //     width: 16,
// //     height: 16,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     position: 'relative',
// //   },
// //   plusHorizontal: {
// //     width: 12,
// //     height: 2.5,
// //     borderRadius: 1.25,
// //     position: 'absolute',
// //   },
// //   plusVertical: {
// //     width: 2.5,
// //     height: 12,
// //     borderRadius: 1.25,
// //     position: 'absolute',
// //   },
// // });

// import React from 'react';
// import { Tabs } from 'expo-router';
// import { useTheme } from '@/context/ThemeContext';
// import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
// import { Platform, StyleSheet, View } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function TabLayout() {
//   const { theme, themeType }: any = useTheme();
  
//   const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: theme.colors.primary,
//         tabBarInactiveTintColor: themeType === 'dark' 
//           ? 'rgba(255, 255, 255, 0.6)' 
//           : 'rgba(0, 0, 0, 0.5)',
//         tabBarStyle: {
//           height: tabBarHeight,
//           backgroundColor: 'transparent',
//           borderTopWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//           paddingBottom: Platform.OS === 'ios' ? 28 : 10,
//           paddingTop: 10,
//         },
//         tabBarBackground: () => (
//           <View style={[
//             styles.glassContainer,
//             {
//               backgroundColor: themeType === 'dark'
//                 ? 'rgba(30, 30, 45, 0.95)'
//                 : 'rgba(255, 255, 255, 0.95)',
//               borderTopColor: themeType === 'dark'
//                 ? 'rgba(255, 255, 255, 0.08)'
//                 : 'rgba(0, 0, 0, 0.06)',
//             }
//           ]}>
//             {/* Subtle gradient overlay */}
//             <LinearGradient
//               colors={themeType === 'dark' 
//                 ? [
//                     'rgba(99, 102, 241, 0.05)',
//                     'rgba(139, 92, 246, 0.03)',
//                     'transparent'
//                   ]
//                 : [
//                     'rgba(99, 102, 241, 0.02)',
//                     'rgba(139, 92, 246, 0.01)',
//                     'transparent'
//                   ]
//               }
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradientOverlay}
//             />
            
//             {/* Top border */}
//             <View style={[
//               styles.topBorder,
//               {
//                 backgroundColor: themeType === 'dark'
//                   ? 'rgba(255, 255, 255, 0.08)'
//                   : 'rgba(0, 0, 0, 0.06)',
//               }
//             ]} />
//           </View>
//         ),
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: '600',
//           letterSpacing: -0.1,
//           marginTop: 4,
//         },
//         tabBarItemStyle: {
//           paddingVertical: 8,
//         },
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={[
//               styles.modernIconContainer,
//               focused && [
//                 styles.focusedIconContainer,
//                 { backgroundColor: `${theme.colors.primary}12` }
//               ]
//             ]}>
//               <View style={[
//                 styles.iconBackground,
//                 focused && { 
//                   backgroundColor: `${theme.colors.primary}20`,
//                   borderColor: `${theme.colors.primary}30`,
//                 }
//               ]}>
//                 <Home 
//                   size={20} 
//                   color={focused ? theme.colors.primary : color}
//                   strokeWidth={focused ? 2.2 : 1.8}
//                 />
//               </View>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="reports"
//         options={{
//           title: 'Reports',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={[
//               styles.modernIconContainer,
//               focused && [
//                 styles.focusedIconContainer,
//                 { backgroundColor: `${theme.colors.primary}12` }
//               ]
//             ]}>
//               <View style={[
//                 styles.iconBackground,
//                 focused && { 
//                   backgroundColor: `${theme.colors.primary}20`,
//                   borderColor: `${theme.colors.primary}30`,
//                 }
//               ]}>
//                 <BarChart4 
//                   size={20} 
//                   color={focused ? theme.colors.primary : color}
//                   strokeWidth={focused ? 2.2 : 1.8}
//                 />
//               </View>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="create"
//         options={{
//           title: 'Create',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={[
//               styles.createIconContainer,
//               {
//                 shadowColor: theme.colors.primary,
//               }
//             ]}>
//               <LinearGradient
//                 colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
//                 style={styles.createGradient}
//               >
//                 <View style={styles.createIconInner}>
//                   <View style={styles.plusIcon}>
//                     <View style={[styles.plusHorizontal, { backgroundColor: '#FFFFFF' }]} />
//                     <View style={[styles.plusVertical, { backgroundColor: '#FFFFFF' }]} />
//                   </View>
//                 </View>
//               </LinearGradient>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="parties"
//         options={{
//           title: 'Parties',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={[
//               styles.modernIconContainer,
//               focused && [
//                 styles.focusedIconContainer,
//                 { backgroundColor: `${theme.colors.primary}12` }
//               ]
//             ]}>
//               <View style={[
//                 styles.iconBackground,
//                 focused && { 
//                   backgroundColor: `${theme.colors.primary}20`,
//                   borderColor: `${theme.colors.primary}30`,
//                 }
//               ]}>
//                 <Users 
//                   size={20} 
//                   color={focused ? theme.colors.primary : color}
//                   strokeWidth={focused ? 2.2 : 1.8}
//                 />
//               </View>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="more"
//         options={{
//           title: 'More',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={[
//               styles.modernIconContainer,
//               focused && [
//                 styles.focusedIconContainer,
//                 { backgroundColor: `${theme.colors.primary}12` }
//               ]
//             ]}>
//               <View style={[
//                 styles.iconBackground,
//                 focused && { 
//                   backgroundColor: `${theme.colors.primary}20`,
//                   borderColor: `${theme.colors.primary}30`,
//                 }
//               ]}>
//                 <Menu 
//                   size={20} 
//                   color={focused ? theme.colors.primary : color}
//                   strokeWidth={focused ? 2.2 : 1.8}
//                 />
//               </View>
//             </View>
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   glassContainer: {
//     flex: 1,
//     overflow: 'hidden',
//     borderTopWidth: 1,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.08,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//       web: {
//         boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
//       },
//     }),
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   topBorder: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 1,
//   },
//   modernIconContainer: {
//     width: 50,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   focusedIconContainer: {
//     transform: [{ scale: 1.05 }],
//   },
//   iconBackground: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   createIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: -4,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//       web: {
//         boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
//       },
//     }),
//   },
//   createGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createIconInner: {
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusIcon: {
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   plusHorizontal: {
//     width: 12,
//     height: 2.5,
//     borderRadius: 1.25,
//     position: 'absolute',
//   },
//   plusVertical: {
//     width: 2.5,
//     height: 12,
//     borderRadius: 1.25,
//     position: 'absolute',
//   },
// });

import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Home, BarChart4, PlusCircle, Users, Menu } from 'lucide-react-native';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const { theme, themeType }: any = useTheme();
  
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: themeType === 'dark' 
          ? 'rgba(255, 255, 255, 0.5)' 
          : 'rgba(0, 0, 0, 0.4)',
        tabBarStyle: {
          height: tabBarHeight,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <View style={[
            styles.glassContainer,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(15, 16, 25, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              borderTopColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.08)',
            }
          ]}>
            {/* Subtle gradient overlay */}
            <LinearGradient
              colors={themeType === 'dark' 
                ? [
                    'rgba(99, 102, 241, 0.03)',
                    'rgba(139, 92, 246, 0.02)',
                    'transparent'
                  ]
                : [
                    'rgba(99, 102, 241, 0.02)',
                    'rgba(139, 92, 246, 0.01)',
                    'transparent'
                  ]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientOverlay}
            />
            
            {/* Top border */}
            <View style={[
              styles.topBorder,
              {
                backgroundColor: themeType === 'dark'
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.08)',
              }
            ]} />
          </View>
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: -0.1,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.modernIconContainer,
              focused && [
                styles.focusedIconContainer,
                { backgroundColor: `${theme.colors.primary}10` }
              ]
            ]}>
              <View style={[
                styles.iconBackground,
                focused && { 
                  backgroundColor: `${theme.colors.primary}18`,
                  borderColor: `${theme.colors.primary}25`,
                }
              ]}>
                <Home 
                  size={20} 
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.modernIconContainer,
              focused && [
                styles.focusedIconContainer,
                { backgroundColor: `${theme.colors.primary}12` }
              ]
            ]}>
              <View style={[
                styles.iconBackground,
                focused && { 
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: `${theme.colors.primary}30`,
                }
              ]}>
                <BarChart4 
                  size={20} 
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.createIconContainer,
              {
                shadowColor: theme.colors.primary,
              }
            ]}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                style={styles.createGradient}
              >
                <View style={styles.createIconInner}>
                  <View style={styles.plusIcon}>
                    <View style={[styles.plusHorizontal, { backgroundColor: '#FFFFFF' }]} />
                    <View style={[styles.plusVertical, { backgroundColor: '#FFFFFF' }]} />
                  </View>
                </View>
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="parties"
        options={{
          title: 'Parties',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.modernIconContainer,
              focused && [
                styles.focusedIconContainer,
                { backgroundColor: `${theme.colors.primary}12` }
              ]
            ]}>
              <View style={[
                styles.iconBackground,
                focused && { 
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: `${theme.colors.primary}30`,
                }
              ]}>
                <Users 
                  size={20} 
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.modernIconContainer,
              focused && [
                styles.focusedIconContainer,
                { backgroundColor: `${theme.colors.primary}12` }
              ]
            ]}>
              <View style={[
                styles.iconBackground,
                focused && { 
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: `${theme.colors.primary}30`,
                }
              ]}>
                <Menu 
                  size={20} 
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  modernIconContainer: {
    width: 50,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  focusedIconContainer: {
    transform: [{ scale: 1.05 }],
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  createIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -4,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
      },
    }),
  },
  createGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createIconInner: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusHorizontal: {
    width: 12,
    height: 2.5,
    borderRadius: 1.25,
    position: 'absolute',
  },
  plusVertical: {
    width: 2.5,
    height: 12,
    borderRadius: 1.25,
    position: 'absolute',
  },
});