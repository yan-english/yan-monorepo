import React from 'react';
import {Box, Container} from '@mui/material';
import {Navigate, Outlet} from 'react-router-dom';
import {authLayoutStyles} from "./style";
import {useAuthContext} from "../../provider/AuthProvider";

const AuthLayout: React.FC = () => {

    const {isAuthenticated} = useAuthContext();
    if (isAuthenticated()) {
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
