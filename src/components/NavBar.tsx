import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchProvider";
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
                            sx: { backgroundColor: '#585858', color: 'white' } // Set drawer background and text color
                        }}>
                    <List sx={{ minWidth: 150 }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30  }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30  }}>
                                    <TrendingUpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trending" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/trending/movies')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <TheatersIcon />
                                </ListItemIcon>
                                <ListItemText primary="Movies" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/trending/tv')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <TvIcon />
                                </ListItemIcon>
                                <ListItemText primary="TV Shows" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/trending/actors')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="People" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30  }}>
                                    <WhatshotIcon />
                                </ListItemIcon>
                                <ListItemText primary="Popular" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/popular/movies')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <TheatersIcon />
                                </ListItemIcon>
                                <ListItemText primary="Movies" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/popular/tv')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <TvIcon />
                                </ListItemIcon>
                                <ListItemText primary="TV Shows" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/popular/actors')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 30, pl: 4 }}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="People" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/about')}>
                                <ListItemIcon sx={{ color: 'white' , minWidth: 30}}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}