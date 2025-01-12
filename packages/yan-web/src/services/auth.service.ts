import axios from 'axios';

const API_URL =  'http://localhost:3000/api';

export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface SignInResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

export const AuthService = {
    async signUp(data: SignUpData): Promise<void> {
        const response = await axios.post(`${API_URL}/auth/sign-up`, data);
        return response.data;
    },

    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await axios.post(`${API_URL}/auth/sign-in`, { email, password });
        return response.data;
    },

    async signOut(): Promise<void> {
        localStorage.removeItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
