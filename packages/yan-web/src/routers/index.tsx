import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';
import HomePage from '../pages/home';
import NotFoundPage from '../pages/NotFound';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Route>

            {/* Protected routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

