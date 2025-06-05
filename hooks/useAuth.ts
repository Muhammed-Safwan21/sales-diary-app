import API from '@/config/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearTokens, setLoading, setTokens } from '../redux/slices/authSlice';
import { apiClient } from '../services/api';

// Helper function to extract tokens from cookies
const extractTokensFromCookies = (cookies:any) => {
  const tokenData:any = {};
  
  if (cookies && Array.isArray(cookies)) {
    cookies.forEach(cookie => {
      const cookieStr = typeof cookie === 'string' ? cookie : cookie.toString();
      
      // Extract access token (looking for access_token with underscore)
      if (cookieStr.includes('access_token=')) {
        const accessTokenMatch = cookieStr.match(/access_token=([^;]+)/);
        if (accessTokenMatch) {
          tokenData.accessToken = accessTokenMatch[1];
        }
      }
      
      // Extract refresh token (looking for refresh_token with underscore)
      if (cookieStr.includes('refresh_token=')) {
        const refreshTokenMatch = cookieStr.match(/refresh_token=([^;]+)/);
        if (refreshTokenMatch) {
          tokenData.refreshToken = refreshTokenMatch[1];
        }
      }
    });
  }
  
  return tokenData;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const router:any = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get auth state from Redux
  const authState = useSelector((state:any) => state.auth);
  const { accessToken, refreshToken, user, isAuthenticated } = authState;

  // Login mutation
// Updated login mutation
const loginMutation = useMutation({
  mutationFn: async (credentials) => {
    console.log('Login API URL:', API.BASE_URL + API.LOGIN);
    const response = await apiClient.post(API.LOGIN, credentials);
    console.log('Login response:', response);
    return response;
  },
  onMutate: () => {
    dispatch(setLoading(true));
    setIsLoading(true);
  },
  onSuccess: async (response) => {
    try {
      // Extract tokens from cookies
      const cookies = response.headers['set-cookie'] || response.headers['Set-Cookie'];
      console.log('Cookies from response:', cookies);
      
      const { accessToken, refreshToken } = extractTokensFromCookies(cookies);
      
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens not found in cookies');
      }
      
      // Get user data from response body
      const userData = response.data?.data;

      if (!userData) {
        throw new Error('User data not found in response');
      }

      // Store tokens and user data in Redux
      // The setTokens action will automatically separate the data into different states
      dispatch(setTokens({
        accessToken,
        refreshToken,
        user: userData, // This includes branchInfo which will be processed by the reducer
      }));

      // Navigate to main app
      router.replace('/(tabs)');

      Alert.alert('Success', 'Login successful!');
      
    } catch (error) {
      console.error('Error processing login response:', error);
      Alert.alert('Error', 'Failed to process login response. Please try again.');
    }
  },
  onError: (error: any) => {
    console.error('Login error:', error);
    
    // More specific error handling
    let errorMessage = 'Login failed. Please try again.';
    
    if (error?.response?.status === 401) {
      errorMessage = 'Invalid email or password.';
    } else if (error?.response?.status === 422) {
      errorMessage = 'Please check your input and try again.';
    } else if (error?.response?.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    Alert.alert('Login Failed', errorMessage);
  },
  onSettled: () => {
    dispatch(setLoading(false));
    setIsLoading(false);
  },
});

  // Login function
  const login = async (email:any, password:any) => {
    // Validate inputs
    if (!email?.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!password?.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Trigger login mutation
    loginMutation.mutate({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    } as any);
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear Redux state
      dispatch(clearTokens());
      
      // Navigate to login screen
      router.replace('/login');
      
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout properly');
    }
  };

  // Check if user is authenticated (from Redux state)
  const checkAuthStatus = () => {
    return isAuthenticated && accessToken && refreshToken;
  };

  // Refresh token function (if you need it)
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post('/api/auth/refresh', {
        refreshToken: refreshToken,
      });
      return response;
    },
    onSuccess: async (response) => {
      try {
        const cookies = response.headers['set-cookie'] || response.headers['Set-Cookie'];
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = extractTokensFromCookies(cookies);
        
        if (newAccessToken && newRefreshToken) {
          const { user: updatedUser } = response.data || {};
          dispatch(setTokens({ 
            accessToken: newAccessToken, 
            refreshToken: newRefreshToken, 
            user: updatedUser || user 
          }));
        }
      } catch (error) {
        console.error('Error refreshing tokens:', error);
        logout(); // Force logout if refresh fails
      }
    },
    onError: (error) => {
      console.error('Refresh token error:', error);
      logout(); // Force logout if refresh fails
    },
  });

  const refreshTokens = () => {
    if (refreshToken) {
      refreshTokenMutation.mutate();
    } else {
      logout();
    }
  };

  return {
    // Functions
    login,
    logout,
    checkAuthStatus,
    refreshTokens,
    
    // State from Redux
    isAuthenticated,
    accessToken,
    refreshToken,
    user,
    
    // Loading states
    isLoading: isLoading || loginMutation.isPending,
    isLoginLoading: loginMutation.isPending,
    isRefreshLoading: refreshTokenMutation.isPending,
  };
};