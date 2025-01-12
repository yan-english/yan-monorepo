export const signUpStyles = {
    paper: {
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.01)',
        },
    },
    form: {
        width: '100%',
        mt: 3,
    },
    submitButton: {
        mt: 3,
        mb: 2,
        height: 48,
    },
    passwordStrength: {
        mt: 1,
        mb: 2,
    },
    signInLink: {
        mt: 2,
        textAlign: 'center',
    },
};
