// src/config/axios.ts
import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {authStorage} from '../utils/authStorage';
import {AuthTokens} from '../types/auth.type';

const API_URL = 'http://localhost:3000/api';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
};

// Function to refresh token
const refreshAuthToken = async () => {
    try {
        const refreshToken = authStorage.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post<{ tokens: AuthTokens }>(
            `${API_URL}/auth/refresh-token`,
            { refreshToken }
        );

        const { tokens } = response.data;
        authStorage.setTokens(tokens);
        return tokens;
    } catch (error) {
        authStorage.clearTokens();
        throw error;
    }
};

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = authStorage.getAccessToken();
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (!error.response) {
            return Promise.reject(error);
        }

        // If error is not 401 or request has already been retried
        if (error.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;

            try {
                const newTokens = await refreshAuthToken();
                isRefreshing = false;
                onTokenRefreshed(newTokens.accessToken);

                // Update the failed request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                authStorage.clearTokens();
                window.location.href = '/sign-in';
                return Promise.reject(refreshError);
            }
        }

        // If token refresh is in progress, wait for it to complete
        return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(axiosInstance(originalRequest));
            });
        });
    }
);

export default axiosInstance;