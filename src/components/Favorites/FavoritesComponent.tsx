import {useAuth0} from "@auth0/auth0-react";
import {useFavorites} from "../../hooks/useFavorites.ts";
import {Box, SxProps, Theme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useEffect, useState} from "react";
import ConfirmDialog from '../shared/ConfirmDialog';
import {FavoriteModel} from "../../api-client";

type FavoriteProps = {
    mediaId: number;
    mediaType: string;
    imageUrl: string;
    title: string;
    sx?: SxProps<Theme>;
};

const FavoritesComponent =
    ({ mediaId, mediaType, imageUrl, title, sx  }: FavoriteProps) => {

    const {loginWithPopup, isAuthenticated} = useAuth0();
    const [favoriteId, setFavoriteId] = useState<string>()
    const {favoritesLoading, favorites, deleteFavorite, addFavorite} = useFavorites();
    const [dialogOpen, setDialogOpen] = useState(false);

    const login = async () => {
        //localStorage.setItem("returnTo", window.location.pathname);
        await loginWithPopup()
        //await loginWithRedirect({
        //    appState: {returnTo: location.pathname}
        //});
    };

    const handleConfirmLogin = async () => {
        setDialogOpen(false);
        await login()
    };

    useEffect(() => {
        const fav = favorites?.find(fav =>
            fav.mediaId! === String(mediaId) && fav.mediaType === mediaType);
        if (fav) {
            setFavoriteId(fav.id)
        } else {
            setFavoriteId(undefined);
        }
    }, [favorites, favoritesLoading]);

    const handleAddFavorite = async () => {
        if (!isAuthenticated)
        {
            // show dialog to login or cancel
            setDialogOpen(true)
        } else {
            const newFavorite: FavoriteModel = {
                mediaId: String(mediaId),
                mediaType: String(mediaType),
                mediaImageUrl: String(imageUrl),
                mediaTitle: String(title)
            };
            // call api to add favorite
            await addFavorite.mutateAsync(newFavorite)

            // invalidate queries?
        }
    };

    const handleDeleteFavorite = async () => {
        await deleteFavorite.mutateAsync(favoriteId);
    };

    return (
        <Box sx={sx}>
            { favoriteId &&
                <FavoriteIcon sx={{ color: 'red', fontSize: 30 }} onClick={ () => handleDeleteFavorite() } />
            }
            { !favoriteId &&
                <FavoriteBorderIcon sx={{ fontSize: 30 }} onClick={ () => handleAddFavorite() } />
            }
            <ConfirmDialog
                open={dialogOpen}
                title="Login"
                description="This requires you to login"
                confirmText="Login"
                cancelText="Cancel"
                onConfirm={handleConfirmLogin}
                onCancel={() => setDialogOpen(false)}
            />
        </Box>
    )
}

export default FavoritesComponent;