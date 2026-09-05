import {useAuth0} from "@auth0/auth0-react";
import {useFavorites} from "../../hooks/useFavorites.ts";
import {Box, SxProps, Theme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
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
    const {favorites, deleteFavorite, addFavorite} = useFavorites();
    const [dialogOpen, setDialogOpen] = useState(false);

    const login = async () => {
        await loginWithPopup()
    };

    const handleConfirmLogin = async () => {
        setDialogOpen(false);
        await login()
    };

    const favoriteId = favorites?.find(favorite =>
        favorite.mediaId === String(mediaId) && favorite.mediaType === mediaType)?.id;

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