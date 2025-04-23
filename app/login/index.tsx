// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Uuid from "expo-modules-core/src/uuid";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useAuthSession } from "../providers/AuthProvider";
// import styles from "./styles";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { signIn } = useAuthSession();
//   const login = (): void => {
//     const random: string = Uuid.v4();
//     signIn(random);
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="dark" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardAvoidView}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {/* Welcome Text */}
//           <View style={styles.welcomeContainer}>
//             <Text style={styles.welcomeTitle}>Welcome Back</Text>
//             <Text style={styles.welcomeSubtitle}>
//               Sign in to continue your experience
//             </Text>
//           </View>

//           {/* Login Form */}
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="mail-outline"
//                 size={22}
//                 color="#777"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 placeholderTextColor="#999"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="lock-closed-outline"
//                 size={22}
//                 color="#777"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#999"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={22}
//                   color="#777"
//                 />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={styles.forgotPasswordContainer}>
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.loginButton} onPress={login}>
//               <LinearGradient
//                 colors={["#48a877", "#48a877"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradient}
//               >
//                 <Text style={styles.loginButtonText}>Sign In</Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             <View style={styles.dividerContainer}>
//               <View style={styles.divider} />
//               <Text style={styles.dividerText}>OR</Text>
//               <View style={styles.divider} />
//             </View>

//             {/* Social Buttons */}
//             <View style={styles.socialContainer}>
//               <TouchableOpacity style={styles.socialButton}>
//                 <LinearGradient
//                   colors={["#ffffff", "#ffffff"]}
//                   style={styles.socialGradient}
//                 >
//                   <Ionicons name="logo-google" size={22} color="#DB4437" />
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.socialButton}>
//                 <LinearGradient
//                   colors={["#ffffff", "#ffffff"]}
//                   style={styles.socialGradient}
//                 >
//                   <Ionicons name="logo-apple" size={22} color="#000" />
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.socialButton}>
//                 <LinearGradient
//                   colors={["#ffffff", "#ffffff"]}
//                   style={styles.socialGradient}
//                 >
//                   <Ionicons name="logo-facebook" size={22} color="#3b5998" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* Register */}
//             <View style={styles.registerContainer}>
//               <Text style={styles.registerText}>Don't have an account? </Text>
//               <TouchableOpacity>
//                 <Text style={styles.registerLink}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Coffee Background Element */}
//           <View style={styles.coffeeCircleContainer}>
//             <View style={styles.coffeeCircle}>
//               <Image
//                 source={{
//                   uri: "https://png.pngtree.com/element_our/20190531/ourmid/pngtree-white-minimalist-simulation-coffee-cup-image_1313997.jpg",
//                 }}
//                 style={styles.coffeeCupImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useAuthSession } from '../providers/AuthProvider';
import Uuid from "expo-modules-core/src/uuid";

const { width } = Dimensions.get('window');

// Brand colors
export const COLOR = {
  primary: "#48a877",
  secondary: "#e8f5ef", // Derived light shade of primary
  accent: "#3d8d64",    // Derived darker shade of primary
  white: "#ffffff",
  black: "#000",
  grey: "#888",
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Use refs instead of focus state
  const emailInputRef = useRef(null);
  const passwordInputRef:any = useRef(null);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const { signIn } = useAuthSession();

  // Handle login submission
  const handleLogin = () => {
    const random: string = Uuid.v4();
    signIn(random);
    Keyboard.dismiss();
    // Add your login logic here
    console.log('Login with:', email, password);
  };
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLOR.white} 
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {/* Logo & Heading */}
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>S</Text>
                </View>
              </View>
              <Text style={styles.appName}>Sales Diary</Text>
              <Text style={styles.appTagline}>Simplified Billing & Invoicing</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <Image 
                    source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/email.png" }} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    ref={emailInputRef}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="your@email.com"
                    placeholderTextColor={COLOR.grey}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    blurOnSubmit={false}
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Image
                    source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/password.png" }}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    ref={passwordInputRef}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor={COLOR.grey}
                    secureTextEntry={!isPasswordVisible}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                  />
                  <TouchableOpacity 
                    style={styles.visibilityButton}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Image
                      source={{ 
                        uri: isPasswordVisible 
                          ? "https://img.icons8.com/ios-filled/50/48a877/visible.png" 
                          : "https://img.icons8.com/ios-filled/50/48a877/invisible.png" 
                      }}
                      style={styles.visibilityIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine} />
              </View>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/google-logo.png" }}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/mac-os.png" }}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: COLOR.white,
  },
  appName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    color: COLOR.black,
    marginBottom: 8,
  },
  appTagline: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLOR.grey,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
    backgroundColor: COLOR.white,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: COLOR.black,
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    color: COLOR.black,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    padding: 0,
    height: '100%',
  },
  visibilityButton: {
    padding: 6,
  },
  visibilityIcon: {
    width: 18,
    height: 18,
    opacity: 0.8,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: COLOR.primary,
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: COLOR.white,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  orText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLOR.grey,
    marginHorizontal: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLOR.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  socialIcon: {
    width: 20,
    height: 20,
    opacity: 0.8,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLOR.grey,
  },
  signupLink: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: COLOR.primary,
  },
});

export default Login;