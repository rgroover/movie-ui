import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useApiClient} from "./useApiClient.ts";
import {useAuth0} from "@auth0/auth0-react";
import {FavoriteModel} from "../api-client";

export const useFavorites = () => {

    const {favoritesApi } = useApiClient()
    const { isAuthenticated } = useAuth0();
    const queryClient = useQueryClient();

    const { isLoading: favoritesLoading, error: favoritesError, data: favorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const response = await favoritesApi.apiFavoritesGet()
            return response.data; // Access the data from AxiosResponse
        },
        enabled: isAuthenticated
    });

    const deleteFavorite = useMutation({
        mutationKey: ['delete-favorite'],
        mutationFn: async (favId: string | undefined) => {
            await favoritesApi.apiFavoritesDelete(favId);
        },
        // When mutation succeeds, invalidate users queries so they refetch
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const addFavorite = useMutation({
        mutationKey: ['add-favorite'],
        mutationFn: async (favorite: FavoriteModel ) => {
            await favoritesApi.apiFavoritesPost(favorite);
        },
        // When mutation succeeds, invalidate users queries so they refetch
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    return { favoritesLoading, favoritesError, favorites, deleteFavorite, addFavorite };
}