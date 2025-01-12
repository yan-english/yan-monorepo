import React from 'react';
import {Box, LinearProgress, Typography} from '@mui/material';
import zxcvbn from 'zxcvbn';

interface Props {
    password: string;
}

export const PasswordStrengthIndicator: React.FC<Props> = ({ password }) => {
    const testResult = zxcvbn(password);
    const score = testResult.score; // 0-4

    const getColor = (score: number) => {
        switch (score) {
            case 0: return 'error';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'info';
            case 4: return 'success';
            default: return 'error';
        }
    };

    const getText = (score: number) => {
        switch (score) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return 'Very Weak';
        }
    };

    return (
        <Box sx={{ width: '100%', mt: 1 }}>
            <LinearProgress
                variant="determinate"
                value={(score / 4) * 100}
                color={getColor(score)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="textSecondary">
                    Password Strength: {getText(score)}
                </Typography>
                {testResult.feedback.warning && (
                    <Typography variant="caption" color="error">
                        {testResult.feedback.warning}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
