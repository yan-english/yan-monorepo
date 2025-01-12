// authApi.ts
import axiosInstance from '../config/axios';
import {AuthTokens, SignUpData} from '../types/auth.type';

export const signIn = async (email: string, password: string) => {
    const response = await axiosInstance.post('/users', { email, password });
    return response.data;
};

export const signUp = async (data: SignUpData) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
};

export const signOut = async (refreshToken: string) => {
    await axiosInstance.post('/auth/sign-out', { refreshToken });
};

export const refreshToken = async (refreshToken: string) => {
    const response = await axiosInstance.post<{ tokens: AuthTokens }>('/auth/refresh-token', { refreshToken });
    return response.data.tokens;
};