import {
    Accordion, AccordionDetails, AccordionSummary,
    AppBar, Button,
    Drawer,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../providers/SearchProvider.tsx";
import { useQueryClient } from "@tanstack/react-query";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonIcon from '@mui/icons-material/Person';

export const NavBar = () => {

    const navigate = useNavigate(); 
    const { setSearchQuery, setSearchType, setActorData, setMovieData, setTvData } = useSearch();
    const queryClient = useQueryClient();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleClick = async (path: string) => {
        setSearchQuery("");
        setSearchType('movies');
        setActorData(null);
        setMovieData(null);
        setTvData(null);
        await queryClient.invalidateQueries();
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
                <IconButton color="inherit" onClick={() => handleClick('/about')}>
                    <InfoIcon />
                </IconButton>
                <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}
                        PaperProps={{
                            sx: { backgroundColor: '#585858', color: 'white' }
                        }}>
                    <Stack direction="column" spacing={0}  sx={{ width: 200, pt: 2, alignItems: 'flex-start' }}
                    >
                        <Button onClick={() => handleClick('/')}
                            sx={{
                                pl: 2, // Padding on the left side of the button
                                color: 'white',
                                textTransform: 'none',
                                width: 150,
                                display: 'flex', // Make the button a flex container
                                justifyContent: 'flex-start', // Align the content (icon + text) to the left
                                textAlign: 'left', // Ensure text is aligned to the left
                            }}
                        >
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
                                    pl: 2
                                }}
                            >
                                <Button
                                    sx={{
                                        pl: 0,
                                        color: 'white',
                                        textTransform: 'none',
                                        width: 150,
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        margin: 0,
                                    }}
                                >
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
                                        onClick={() => handleClick('/trending/movies')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <TheatersIcon sx={{ marginRight: '8px' }} />
                                        <Typography>Movies</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/trending/tv')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <TvIcon sx={{ marginRight: '8px' }} />
                                        <Typography>TV Shows</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/trending/actors')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
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
                                    pl: 2
                                }}
                            >
                                <Button
                                    sx={{
                                        pl: 0,
                                        color: 'white',
                                        textTransform: 'none',
                                        width: 150,
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        margin: 0,
                                    }}
                                >
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
                                        onClick={() => handleClick('/popular/movies')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <TheatersIcon sx={{ marginRight: '8px' }} />
                                        <Typography>Movies</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/popular/tv')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <TvIcon sx={{ marginRight: '8px' }} />
                                        <Typography>TV Shows</Typography>
                                    </Button>
                                    <Button
                                        onClick={() => handleClick('/popular/actors')}
                                        sx={{
                                            pl: 2,
                                            color: 'white',
                                            textTransform: 'none',
                                            width: 150,
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <PersonIcon sx={{ marginRight: '8px' }} />
                                        <Typography>People</Typography>
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Button onClick={() => handleClick('/about')}
                                sx={{
                                    pl: 2, // Padding on the left side of the button
                                    color: 'white',
                                    textTransform: 'none',
                                    width: 150,
                                    display: 'flex', // Make the button a flex container
                                    justifyContent: 'flex-start', // Align the content (icon + text) to the left
                                    textAlign: 'left', // Ensure text is aligned to the left
                                }}
                        >
                            <InfoIcon sx={{ marginRight: '8px' }} /> {/* Icon with margin */}
                            <Typography>About</Typography>
                        </Button>
                    </Stack>
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}