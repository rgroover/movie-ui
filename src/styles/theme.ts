import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f0f0f',
            paper: '#1a1a1a',
        },
        primary: {
            main: '#e8b923',
            contrastText: '#0f0f0f',
        },
        secondary: {
            main: '#e53935',
        },
        text: {
            primary: '#f0f0f0',
            secondary: '#a0a0a0',
        },
    },
    typography: {
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#0f0f0f',
                    color: '#f0f0f0',
                    scrollbarColor: '#333 #0f0f0f',
                    '&::-webkit-scrollbar': { width: 8 },
                    '&::-webkit-scrollbar-track': { background: '#0f0f0f' },
                    '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 4 },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#111111',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#141414',
                    borderRight: '1px solid rgba(255,255,255,0.07)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 32px rgba(0,0,0,0.6)',
                        borderColor: 'rgba(232,185,35,0.35)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,0.1)',
                },
            },
        },
    },
});

export default theme;
