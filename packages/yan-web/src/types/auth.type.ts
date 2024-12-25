export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface SignInResponse {
    tokens: AuthTokens;
    user: User;
}