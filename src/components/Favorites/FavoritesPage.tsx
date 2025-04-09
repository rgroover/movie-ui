import {Box, Button, CircularProgress, Grid2, Stack, Typography} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {defaultImagePrefix} from "../../util/constants.ts";
import {useNavigate} from "react-router-dom";
import {FavoriteModel} from "../../api-client";
import { useFavorites } from "../../hooks/useFavorites.ts";

const FavoritesPage = () => {

    const { loginWithPopup, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const { favoritesLoading, favoritesError, favorites, deleteFavorite } = useFavorites();

    const login = async () => {
        await loginWithPopup()
        // localStorage.setItem("returnTo", window.location.pathname);
        // await loginWithRedirect({
        //    appState: { returnTo: location.pathname }
        //});
    };

    const navigateToMedia = (fav: FavoriteModel | undefined) => {
        if (fav?.mediaType === 'tv') {
            navigate(`/tv/${fav.mediaId}`);
        } else if (fav?.mediaType === 'movie') {
            navigate(`/movie/${fav.mediaId}`);
        } else if (fav?.mediaType === 'person') {
            navigate(`/person/${fav.mediaId}`);
        }
    }

    if (favoritesLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (favoritesError) {
        return <Typography>Error: {favoritesError.message}</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1 }} padding={2}>
            <Typography variant='h5' padding={2} sx={{ textAlign: "center" }}>Favorites</Typography>
            <Grid2 container gap={4} >
                    {!isAuthenticated &&
                        <Grid2 size={{ xs: 12}} >
                            <Stack direction='column' padding={2} gap={2}>
                                <Typography variant='h6'>You must login to use this feature</Typography>
                                <Button sx={{width: 120}} variant='contained' onClick={() => login()}>Login</Button>
                            </Stack>
                        </Grid2>
                    }
                {isAuthenticated && (!favorites || favorites?.length == 0) &&
                    <Grid2 size={{ xs: 12}} >
                        <Stack direction='column' padding={2} gap={2}>
                            <Typography variant='h6'>You don't have any favorites</Typography>
                        </Stack>
                    </Grid2>
                }
                {isAuthenticated && favorites?.map((fav) => (
                    <Grid2 key={fav.id} >
                        <Stack direction='column' alignItems="center" justifyContent="center">
                            <Typography variant='subtitle1'
                                sx={{
                                    maxWidth: 160,
                                    whiteSpace: 'wrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign: 'center'
                                }}
                            >{fav.mediaTitle}</Typography>
                            <Box
                                mt={2}
                                component="img"
                                src={fav?.mediaImageUrl ? defaultImagePrefix + '/' + fav?.mediaImageUrl : '/no-image.jpg'}
                                alt="Media Image"
                                sx={{ width: 150, height: "auto", borderRadius: 2 }}
                                onClick={() => navigateToMedia(fav)}
                            />
                            <IconButton sx={{ color: "white", mt:2 }} onClick={() => deleteFavorite.mutate(fav?.id)}  aria-label="delete">
                                <DeleteIcon sx={{ fontSize: 32 }} />
                            </IconButton>
                        </Stack>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}

export default FavoritesPage;
