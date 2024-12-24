import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {Box, Button, CircularProgress, Grid, Link, Paper, TextField, Typography,} from '@mui/material';
import {motion} from 'framer-motion';
import {AuthService} from '../../../services/auth.service';
import {signInStyles} from "./style";

interface SignInFormData {
    email: string;
    password: string;
}

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await AuthService.signIn(formData.email, formData.password);
            localStorage.setItem('token', response.token);
            enqueueSnackbar('Successfully signed in!', { variant: 'success' });
            navigate('/');
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Sign in failed!';
            enqueueSnackbar(errorMessage, {
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper elevation={3} sx={signInStyles.paper}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Sign In
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={signInStyles.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                required
                                fullWidth
                                label="Email Address"
                                autoFocus
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={signInStyles.submit}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>

                    <Box sx={signInStyles.signUpLink}>
                        <Link href="/sign-up" variant="body2">
                            Don't have an account? Sign up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default SignInPage;
