import React from 'react';
import {Box, Container} from '@mui/material';
import {Navigate, Outlet} from 'react-router-dom';
import {AuthService} from '../../services/auth.service';
import {authLayoutStyles} from "./style";

const AuthLayout: React.FC = () => {
    if (AuthService.isAuthenticated()) {
        return <Navigate to="/" />;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={authLayoutStyles.root}>
                <Outlet />
            </Box>
        </Container>
    );
};

export default AuthLayout;
