import {useCallback, useState} from 'react';
import {SignUpData, User} from '../types/auth.type';
import {authStorage} from '../utils/authStorage';
import {refreshToken, signIn, signOut, signUp} from '../api/authApi';
import axios from 'axios';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setUserInStorage = useCallback((user: User) => {
        console.log('Setting user in storage:', user);
    }, []);

    const getUserFromStorage = useCallback(() => {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }, []);

    const isAuthenticated = useCallback(() => {
        return !!authStorage.getAccessToken() && !!authStorage.getRefreshToken();
    }, []);

    const hasValidSession = useCallback(() => {
        const accessToken = authStorage.getAccessToken();
        if (!accessToken) return false;

        try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            return Date.now() < expirationTime;
        } catch {
            return false;
        }
    }, []);

    const handleSignIn = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const { tokens, user } = await signIn(email, password);
            authStorage.setTokens(tokens);
            setUser(user);
            setUserInStorage(user);
            return user;
        } catch (err: unknown) {
            authStorage.clearTokens();
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to sign in');
            } else {
                setError('Failed to sign in');
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setUserInStorage]);

    const handleSignUp = useCallback(async (data: SignUpData) => {
        setIsLoading(true);
        setError(null);

        try {
            return await signUp(data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to sign up');
            } else {
                setError('Failed to sign up');
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSignOut = useCallback(async () => {
        try {
            const refreshToken = authStorage.getRefreshToken();
            if (refreshToken) {
                await signOut(refreshToken);
            }
        } catch (err) {
            console.error('Error during sign out:', err);
        } finally {
            authStorage.clearTokens();
            setUser(null);
            window.location.href = '/sign-in';
        }
    }, []);

    const handleRefreshToken = useCallback(async () => {
        try {
            const token = authStorage.getRefreshToken();
            if (!token) throw new Error('No refresh token available');

            const tokens = await refreshToken(token);
            authStorage.setTokens(tokens);
            return tokens;
        } catch (err) {
            authStorage.clearTokens();
            setUser(null);
            throw err;
        }
    }, []);

    return {
        user,
        isLoading,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        refreshToken: handleRefreshToken,
        isAuthenticated,
        hasValidSession,
        getAccessToken: authStorage.getAccessToken,
        getRefreshToken: authStorage.getRefreshToken,
        getUserFromStorage,
    };
};