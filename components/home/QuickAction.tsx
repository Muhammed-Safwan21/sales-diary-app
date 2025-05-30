// import React from 'react';
// import { View, Text, TouchableOpacity, Platform } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { Link } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ArrowUpRight } from 'lucide-react-native';

// interface QuickActionProps {
//   icon: React.ReactNode;
//   title: string;
//   subtitle?: string;
//   route: string;
//   gradient?: string[];
// }

// export const QuickAction: React.FC<QuickActionProps> = ({ 
//   icon, 
//   title, 
//   subtitle, 
//   route,
//   gradient = ['#6366F1', '#8B5CF6']
// }:any) => {
//   const { theme, themeType } = useTheme();
  
//   const containerStyle:any = {
//     width: '48%',
//     borderRadius: 20,
//     height:"300px",
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: gradient[0],
//         shadowOffset: { width: 0, height: 8 },
//         shadowOpacity: 0.25,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 8,
//       },
//       web: {
//         boxShadow: `0 8px 24px ${gradient[0]}40`,
//       },
//     }),
//   };

//   return (
//     <Link href={route} asChild>
//       <TouchableOpacity 
//         style={containerStyle}
//         activeOpacity={0.8}
//       >
//         <LinearGradient
//           colors={gradient}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.gradientContainer}
//         >
//           {/* Glass overlay */}
//           <View style={styles.glassOverlay} />
          
//           <View style={styles.content}>
//             <View style={styles.header}>
//               <View style={styles.iconContainer}>
//                 {icon}
//               </View>
              
//               <TouchableOpacity style={styles.arrowButton}>
//                 <ArrowUpRight size={16} color="rgba(255, 255, 255, 0.8)" />
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.textContainer}>
//               <Text style={styles.title} numberOfLines={1}>
//                 {title}
//               </Text>
              
//               {subtitle && (
//                 <Text style={styles.subtitle} numberOfLines={2}>
//                   {subtitle}
//                 </Text>
//               )}
//             </View>
            
//             {/* Decorative elements */}
//             <View style={styles.decorativeCircle1} />
//             <View style={styles.decorativeCircle2} />
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//     </Link>
//   );
// };

// const styles:any = {
//   gradientContainer: {
//     position: 'relative',
//     height: 140,
//     borderRadius: 20,
//   },
//   glassOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//   },
//   content: {
//     padding: 20,
//     height: '100%',
//     justifyContent: 'space-between',
//     position: 'relative',
//     zIndex: 2,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   arrowButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   textContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -0.2,
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.8)',
//     lineHeight: 16,
//     fontWeight: '500',
//   },
//   decorativeCircle1: {
//     position: 'absolute',
//     top: -20,
//     right: -20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     zIndex: 1,
//   },
//   decorativeCircle2: {
//     position: 'absolute',
//     bottom: -30,
//     left: -30,
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(255, 255, 255, 0.03)',
//     zIndex: 1,
//   },
// };


import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUpRight } from 'lucide-react-native';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  route: string;
  gradient?: string[];
}

export const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  title, 
  subtitle, 
  route,
  gradient = ['#6366F1', '#8B5CF6']
}: any) => {
  const { theme, themeType }: any = useTheme();
  
  const containerStyle: any = {
    width: '48%',
    borderRadius: 20,
    height: 120,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: themeType === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: themeType === 'dark' 
          ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    }),
  };

  return (
    <Link href={route} asChild>
      <TouchableOpacity 
        style={containerStyle}
        activeOpacity={0.8}
      >
        <View style={[
          styles.cardContainer,
          {
            backgroundColor: themeType === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(255, 255, 255, 0.9)',
            borderColor: themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.8)',
          }
        ]}>
          
          {/* Subtle gradient overlay */}
          <LinearGradient
            colors={themeType === 'dark' 
              ? [
                  `${gradient[0]}15`,
                  `${gradient[1]}08`,
                  'transparent'
                ] 
              : [
                  `${gradient[0]}20`,
                  `${gradient[1]}10`,
                  'transparent'
                ]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientOverlay}
          />
          
          {/* Glass morphism effect */}
          <View style={[
            styles.glassEffect,
            {
              backgroundColor: themeType === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(255, 255, 255, 0.4)',
            }
          ]} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: `${gradient[0]}20`,
                  borderColor: `${gradient[0]}30`,
                }
              ]}>
                {React.cloneElement(icon, {
                  size: 20,
                  color: gradient[0]
                })}
              </View>
              
              <TouchableOpacity style={[
                styles.arrowButton,
                {
                  backgroundColor: themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                  borderColor: themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                }
              ]}>
                <ArrowUpRight 
                  size={14} 
                  color={themeType === 'dark' 
                    ? 'rgba(255, 255, 255, 0.6)' 
                    : 'rgba(0, 0, 0, 0.6)'
                  } 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.textContainer}>
              <Text style={[
                styles.title,
                { color: theme.colors.text }
              ]} numberOfLines={1}>
                {title}
              </Text>
              
              {subtitle && (
                <Text style={[
                  styles.subtitle,
                  { color: theme.colors.textSecondary }
                ]} numberOfLines={2}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          
          {/* Decorative blur spots */}
          <View style={[
            styles.decorativeSpot1,
            { backgroundColor: `${gradient[1]}10` }
          ]} />
          <View style={[
            styles.decorativeSpot2,
            { backgroundColor: `${gradient[0]}08` }
          ]} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles: any = {
  cardContainer: {
    position: 'relative',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  glassEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    padding: 16,
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 2,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  decorativeSpot1: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1,
  },
  decorativeSpot2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1,
  },
};