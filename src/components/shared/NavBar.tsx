import {
    Accordion, AccordionDetails, AccordionSummary,
    AppBar, Avatar, Button,
    Drawer,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonIcon from '@mui/icons-material/Person';
import AuthButton from "../AuthButton.tsx";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {

    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    const {user, isAuthenticated } = useAuth0();

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const navButtonStyle = {
        pl: 2, // Padding on the left side of the button
        color: 'white',
        textTransform: 'none',
        width: 150,
        display: 'flex', // Make the button a flex container
        justifyContent: 'flex-start', // Align the content (icon + text) to the left
        textAlign: 'left', // Ensure text is aligned to the left
    }

    const handleClick = async (path: string) => {
        navigate(path, {replace: true});
        setOpenDrawer(false);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#585858' }}>
            <Toolbar>
                <IconButton color="inherit" onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => handleClick('/')}>
                    Media Search
                </Typography>
                {isAuthenticated && (
                    <Avatar
                        src={user?.picture}
                        alt="Profile"
                        sx={{ width: 50, height: 50 }} // Adjust size as needed
                    />
                )}
                <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}
                        PaperProps={{
                            sx: { backgroundColor: '#585858', color: 'white' }
                        }}>
                    <Stack direction="column" spacing={0}  sx={{ width: 200, pt: 2, alignItems: 'flex-start' }}
                    >
                        <Button onClick={() => handleClick('/')} sx={{ ...navButtonStyle }}>
                            <HomeIcon sx={{ marginRight: '8px' }} /> {/* Icon with margin */}
                            <Typography>Home</Typography>
                        </Button>
                        <Accordion
                            sx={{
                                backgroundColor: '#585858',
                                color: 'white',
                                boxShadow: 'none',
                                '&:before': {
                                    display: 'none', // Remove the default divider line above AccordionSummary
                                },
                            }}
                        >
                            <AccordionSummary
                                sx={{
                                    minHeight: 0, // Remove default height
                                    padding: 0,   // Remove default padding
                                    '&.Mui-expanded': {
                                        minHeight: 0, // Remove height when expanded
                                    },
                                    '& .MuiAccordionSummary-content': {
                                        margin: 0, // Remove spacing between summary content and details
                                    },
                                    height: '40px',
                                    pl: 0
                                }}
                            >
                                <Button sx={{ ...navButtonStyle, margin: 0 }}>
                                    <TrendingUpIcon sx={{ marginRight: '8px' }} />
                                    <Typography>Trending</Typography>
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    padding: 0, // Remove padding inside the details
                                    pl: 4
                                }}
                            >
                                <Stack direction="column">
                                    <Button
                                        onClick={() => handleClick('/trending/movies')} sx={{ ...navButtonStyle }}>
                                        <TheatersIcon sx={{ marginRight: '8px' }} />
                                        <Typography>Movies</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/trending/tv')} sx={{ ...navButtonStyle }}>
                                        <TvIcon sx={{ marginRight: '8px' }} />
                                        <Typography>TV Shows</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/trending/actors')} sx={{ ...navButtonStyle }}>
                                        <PersonIcon sx={{ marginRight: '8px' }} />
                                        <Typography>People</Typography>
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{
                                backgroundColor: '#585858',
                                color: 'white',
                                boxShadow: 'none',
                                '&:before': {
                                    display: 'none', // Remove the default divider line above AccordionSummary
                                },
                            }}
                        >
                            <AccordionSummary
                                sx={{
                                    minHeight: 0, // Remove default height
                                    padding: 0,   // Remove default padding
                                    '&.Mui-expanded': {
                                        minHeight: 0, // Remove height when expanded
                                    },
                                    '& .MuiAccordionSummary-content': {
                                        margin: 0, // Remove spacing between summary content and details
                                    },
                                    height: '40px',
                                    pl: 0
                                }}
                            >
                                <Button sx={{ ...navButtonStyle, margin: 0 }}>
                                    <WhatshotIcon sx={{ marginRight: '8px' }} />
                                    <Typography>Popular</Typography>
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    padding: 0, // Remove padding inside the details
                                    pl: 4
                                }}
                            >
                                <Stack direction="column">
                                    <Button
                                        onClick={() => handleClick('/popular/movies')} sx={{ ...navButtonStyle }}>
                                        <TheatersIcon sx={{ marginRight: '8px' }} />
                                        <Typography>Movies</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/popular/tv')} sx={{ ...navButtonStyle }}>
                                        <TvIcon sx={{ marginRight: '8px' }} />
                                        <Typography>TV Shows</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/popular/actors')} sx={{ ...navButtonStyle }}>
                                        <PersonIcon sx={{ marginRight: '8px' }} />
                                        <Typography>People</Typography>
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Button onClick={() => handleClick('/about')} sx={{ ...navButtonStyle }}>
                            <InfoIcon sx={{ marginRight: '8px' }} /> {/* Icon with margin */}
                            <Typography>About</Typography>
                        </Button>
                        <Button onClick={() => handleClick('/favorites')} sx={{ ...navButtonStyle }}>
                            <FavoriteIcon sx={{ marginRight: '8px' }} /> {/* Icon with margin */}
                            <Typography>Favorites</Typography>
                        </Button>
                        <AuthButton />
                    </Stack>
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}