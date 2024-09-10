import {createContext} from "react";
import axios from "axios";
import express from "express";
import cors from "cors";
import {createBrowserRouter} from "react-router-dom";

export type AuthContextType = {
    signIn: (
        email: string,
        password: string,
    ) => Promise<void>
}

type Props = {
    children: React.ReactNode
    router: ReturnType<typeof createBrowserRouter>
}
export const Axios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export default function AuthProvider({children, router}: Props) {
    const signIn = async (
        email: string,
        password: string,
    ) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        const data = await axios({
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: 'http://localhost:3000/api/auth/login',
            data: {
                email,
                password
            },
        }).then((response) => {
            return response.data
        })
        console.log("data", data)
    }
    const value = {
        signIn,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}