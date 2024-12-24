import React from 'react';
import {Navigate} from 'react-router-dom';
import {AuthService} from '../services/auth.service';

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    return AuthService.isAuthenticated() ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
