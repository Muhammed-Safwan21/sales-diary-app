import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, setAccessToken } from '../redux/slices/authSlice';
import { store } from '../redux/store';
import API from '@/config/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state:any = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 || error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state:any = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          const response = await axios.post(API.BASE_URL+API.REFRESH, {
            refreshToken,
          });

          console.log("response.dataresponse.data-------->>>",response.data)
          const { accessToken } = response.data;
          store.dispatch(setAccessToken(accessToken));
          
          processQueue(null, accessToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          store.dispatch(clearTokens());
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        store.dispatch(clearTokens());
        processQueue(error, null);
      }
    }

    return Promise.reject(error);
  }
);
