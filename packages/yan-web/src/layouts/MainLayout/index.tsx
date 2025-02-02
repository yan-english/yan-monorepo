import React, {useState} from 'react';
import {Box} from '@mui/material';
import {Navigate, Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {useAuth} from '../../hooks/useAuth';
import {mainLayoutStyles} from './styles';

const MainLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/sign-in" />;
    }

    return (
        <Box sx={mainLayoutStyles.root}>
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Box component="main" sx={mainLayoutStyles.content}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;