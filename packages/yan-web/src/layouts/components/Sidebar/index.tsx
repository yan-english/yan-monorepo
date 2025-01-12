import React from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,} from '@mui/material';
import {Dashboard as DashboardIcon, Person as PersonIcon, Settings as SettingsIcon,} from '@mui/icons-material';
import {useLocation, useNavigate} from 'react-router-dom';
import {sidebarStyles} from "./style";


interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    return (
        <Drawer
            variant="permanent"
            open={open}
            onClose={onClose}
            sx={sidebarStyles.drawer}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={sidebarStyles.listItem}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
};

export default Sidebar;
