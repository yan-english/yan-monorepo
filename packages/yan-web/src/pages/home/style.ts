export const homeStyles = {
    root: {
        p: 3,
    },
    welcomeSection: {
        mb: 4,
    },
    statsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 3,
        mb: 4,
    },
    statCard: {
        p: 2,
        textAlign: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
};
