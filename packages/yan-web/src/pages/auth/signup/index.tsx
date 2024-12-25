import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {motion} from 'framer-motion';
import {useAuthContext} from '../../../provider/AuthProvider';
import {signUpStyles} from './styles';
import {PasswordStrengthIndicator} from '../../../components/PasswordStrengthIndicator';
import {validateSignUpForm, ValidationErrors} from "./validatiion";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { signUp, isLoading } = useAuthContext();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'agreeToTerms' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateSignUpForm(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.confirmPassword
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await signUp({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                roles: ['User']
            });

            enqueueSnackbar('Successfully registered!', { variant: 'success' });
            navigate('/sign-in');
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Registration failed!';
            enqueueSnackbar(errorMessage, {
                variant: 'error'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper elevation={3} sx={signUpStyles.paper}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Create Account
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={signUpStyles.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                value={formData.firstName}
                                onChange={handleInputChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                required
                                fullWidth
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                required
                                fullWidth
                                label="Email Address"
                                type="email"
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
                            <PasswordStrengthIndicator password={formData.password} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="confirmPassword"
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="agreeToTerms"
                                        color="primary"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="I agree to the Terms and Conditions"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={signUpStyles.submitButton}
                        disabled={isLoading || !formData.agreeToTerms}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>

                    <Box sx={signUpStyles.signInLink}>
                        <Link href="/sign-in" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default SignUpPage;