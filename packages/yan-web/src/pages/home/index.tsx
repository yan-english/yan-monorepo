import React from 'react';
import {Box, Card, CardContent, Typography,} from '@mui/material';
import {motion} from 'framer-motion';
import {homeStyles} from "./style";

const HomePage: React.FC = () => {
    // Example stats data
    const stats = [
        { title: 'Total Users', value: '1,234' },
        { title: 'Active Projects', value: '56' },
        { title: 'Completed Tasks', value: '892' },
        { title: 'Pending Reviews', value: '15' },
    ];

    return (
        <Box sx={homeStyles.root}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={homeStyles.welcomeSection}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Here's what's happening with your projects today.
                    </Typography>
                </Box>

                <Box sx={homeStyles.statsContainer}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card sx={homeStyles.statCard}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        {stat.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>

                {/* Add more dashboard content here */}
            </motion.div>
        </Box>
    );
};

export default HomePage;
