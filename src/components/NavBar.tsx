import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import TheatersIcon from '@mui/icons-material/Theaters'
import { useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchProvider";
import { useQueryClient } from "@tanstack/react-query";

export const NavBar = () => {

    const navigate = useNavigate(); 
    const { setSearchQuery, setSearchType, setActorData, setMovieData } = useSearch();
    const queryClient = useQueryClient();

    const handleClick = async (path: string) => {
        setSearchQuery("");
        setSearchType('movies');
        setActorData(null);
        setMovieData(null);
        await queryClient.invalidateQueries();
        navigate(path, {replace: true});
    };

    return (
        <AppBar position="static" sx={{backgroundColor: 'black'}}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label="logo" onClick={() => handleClick('/')}>
                    <TheatersIcon />
                </IconButton>
                <Typography variant="h6" component='div' sx={{ flexGrow: 1}}>
                    Movie App</Typography>               
                <Stack direction='row' spacing={2}>
                    <Button sx={{color: 'white'}} onClick={() => handleClick('/')}>Home</Button>
                    <Button sx={{color: 'white'}} onClick={() => handleClick('/about')}>About</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}