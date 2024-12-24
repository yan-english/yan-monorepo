import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                p: 3,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    The page you are looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                >
                    Go to Home
                </Button>
            </motion.div>
        </Box>
    );
};

export default NotFoundPage;
