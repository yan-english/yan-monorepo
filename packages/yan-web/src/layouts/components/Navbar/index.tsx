import React, {useState} from 'react';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography,} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {AuthService} from '../../../services/auth.service';
import {navbarStyles} from "./style";

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        AuthService.signOut();
        navigate('/sign-in');
    };

    return (
        <AppBar position="fixed" sx={navbarStyles.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={navbarStyles.menuButton}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>

                <Box>
                    <IconButton
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={navbarStyles.avatar} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose}
                    >
                        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;