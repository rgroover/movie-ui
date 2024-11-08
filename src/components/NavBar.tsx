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
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
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
                            sx: { backgroundColor: 'darkgray', color: 'white' } // Set drawer background and text color
                        }}>
                    <List sx={{ minWidth: 150 }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/')}>
                                <ListItemIcon sx={{ color: 'white', minWidth: 50  }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick('/about')}>
                                <ListItemIcon sx={{ color: 'white' , minWidth: 50}}>
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