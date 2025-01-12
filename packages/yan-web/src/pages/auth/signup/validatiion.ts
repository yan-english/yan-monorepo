export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}
export const validateSignUpForm = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
): ValidationErrors => {
    const errors: ValidationErrors = {};

    // First Name validation
    if (!firstName.trim()) {
        errors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z]{2,}$/.test(firstName.trim())) {
        errors.firstName = 'First name must be at least 2 characters and contain only letters';
    }

    // Last Name validation
    if (!lastName.trim()) {
        errors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z]{2,}$/.test(lastName.trim())) {
        errors.lastName = 'Last name must be at least 2 characters and contain only letters';
    }

    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }

    // Password validation
    if (!password) {
        errors.password = 'Password is required';
    } else {
        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
            errors.password = 'Password must contain uppercase, lowercase, number and special character';
        }
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};
