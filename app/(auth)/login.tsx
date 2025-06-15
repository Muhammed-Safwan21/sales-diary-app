import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  Shield,
  Sparkles,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';

// Form data interface
interface LoginFormData {
  email: string;
  password: string;
}

// Validation rules
const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
};

export default function LoginScreen() {
  const { theme, themeType }: any = useTheme();
  const router: any = useRouter();
  const { login, isLoginLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm<LoginFormData>({
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first validation
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Watch form values for real-time updates
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  // Form submission handler
  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  // Get input border style based on error state
  const getInputBorderStyle = (hasError: boolean) => ({
    borderColor: hasError
      ? '#EF4444' // Red color for error
      : themeType === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.06)',
    borderWidth: hasError ? 0.5 : 1,
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Background gradient */}
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <Animated.View
              entering={FadeInUp.delay(100)}
              style={styles.headerSection}
            >
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.logoGradient}
                >
                  <Sparkles size={32} color="#FFFFFF" />
                </LinearGradient>
              </View>

              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue to your business
              </Text>
            </Animated.View>

            {/* Login Form */}
            <Animated.View entering={FadeInUp.delay(200)}>
              <BlurView
                intensity={themeType === 'dark' ? 20 : 80}
                tint={themeType}
                style={styles.formContainer}
              >
                <View style={styles.formContent}>
                  {/* Email Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Email Address
                    </Text>
                    <Controller
                      control={control}
                      name="email"
                      rules={validationRules.email}
                      render={({ field: { onChange, onBlur, value } }: any) => (
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              backgroundColor:
                                themeType === 'dark'
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(255, 255, 255, 0.8)',
                            },
                            getInputBorderStyle(!!errors.email),
                          ]}
                        >
                          <View
                            style={[
                              styles.inputIconContainer,
                              {
                                backgroundColor: errors.email
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : `${theme.colors.primary}15`,
                              },
                            ]}
                          >
                            <Mail
                              size={18}
                              color={
                                errors.email ? '#EF4444' : theme.colors.primary
                              }
                            />
                          </View>
                          <TextInput
                            style={[styles.input, { color: theme.colors.text }]}
                            placeholder="Enter your email"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isLoginLoading}
                            returnKeyType="next"
                          />
                          {errors.email && (
                            <AlertCircle size={18} color="#EF4444" />
                          )}
                        </View>
                      )}
                    />
                    {errors.email && (
                      <Animated.View entering={FadeInDown.duration(200)}>
                        <Text style={styles.errorText}>
                          {errors.email.message}
                        </Text>
                      </Animated.View>
                    )}
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Password
                    </Text>
                    <Controller
                      control={control}
                      name="password"
                      rules={validationRules.password}
                      render={({ field: { onChange, onBlur, value } }: any) => (
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              backgroundColor:
                                themeType === 'dark'
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(255, 255, 255, 0.8)',
                            },
                            getInputBorderStyle(!!errors.password),
                          ]}
                        >
                          <View
                            style={[
                              styles.inputIconContainer,
                              {
                                backgroundColor: errors.password
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : `${theme.colors.accent}15`,
                              },
                            ]}
                          >
                            <Lock
                              size={18}
                              color={
                                errors.password
                                  ? '#EF4444'
                                  : theme.colors.accent
                              }
                            />
                          </View>
                          <TextInput
                            style={[styles.input, { color: theme.colors.text }]}
                            placeholder="Enter your password"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry={!showPassword}
                            editable={!isLoginLoading}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit(onSubmit)}
                          />
                          <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                            disabled={isLoginLoading}
                          >
                            {showPassword ? (
                              <EyeOff
                                size={18}
                                color={theme.colors.textSecondary}
                              />
                            ) : (
                              <Eye
                                size={18}
                                color={theme.colors.textSecondary}
                              />
                            )}
                          </TouchableOpacity>
                          {errors.password && (
                            <AlertCircle
                              size={18}
                              color="#EF4444"
                              style={styles.errorIcon}
                            />
                          )}
                        </View>
                      )}
                    />
                    {errors.password && (
                      <Animated.View entering={FadeInDown.duration(200)}>
                        <Text style={styles.errorText}>
                          {errors.password.message}
                        </Text>
                      </Animated.View>
                    )}
                  </View>

                  {/* Forgot Password */}
                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => router.push('/auth/forgot-password')}
                    disabled={isLoginLoading}
                  >
                    <Text
                      style={[
                        styles.forgotPasswordText,
                        { color: theme.colors.primary },
                      ]}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <TouchableOpacity
                    style={[
                      styles.loginButton,
                      {
                        backgroundColor: theme.colors.primary,
                        shadowColor: theme.colors.primary,
                        opacity: isLoginLoading ? 0.7 : 1,
                      },
                    ]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoginLoading}
                  >
                    <LinearGradient
                      colors={[
                        theme.colors.primary,
                        theme.colors.primaryLight || theme.colors.primary,
                      ]}
                      style={styles.loginGradient}
                    >
                      {isLoginLoading ? (
                        <View style={styles.loadingContainer}>
                          <Text style={styles.loginButtonText}>
                            Signing In...
                          </Text>
                        </View>
                      ) : (
                        <>
                          <LogIn size={20} color="#FFFFFF" />
                          <Text style={styles.loginButtonText}>Sign In</Text>
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </Animated.View>

            {/* Social Login */}
            <Animated.View entering={FadeInUp.delay(300)}>
              <View style={styles.dividerContainer}>
                <View
                  style={[
                    styles.dividerLine,
                    {
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.dividerText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  or continue with
                </Text>
                <View
                  style={[
                    styles.dividerLine,
                    {
                      backgroundColor:
                        themeType === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                    },
                  ]}
                />
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInDown.delay(400)}
              style={styles.footer}
            >
              <View style={styles.securityBadge}>
                <Shield size={16} color={theme.colors.success} />
                <Text
                  style={[
                    styles.securityText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Secured with 256-bit SSL encryption
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 32,
  },
  formContent: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
  },
  errorIcon: {
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  loginGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  footer: {
    alignItems: 'center',
    gap: 20,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  securityText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  debugContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#888',
    marginBottom: 4,
  },
});
