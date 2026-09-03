import {useApiToken} from "./useApiToken.ts";
import axios from "axios";
import {ActorApi, FavoritesApi, MovieApi, SearchApi, TvShowApi} from "../api-client";

export interface Review {
    id: string;
    author: string;
    authorDetails?: { name?: string; username?: string; rating?: number | null };
    content: string;
    createdAt: string;
    url: string;
}

export interface ReviewResults {
    page: number;
    results: Review[];
    totalPages: number;
    totalResults: number;
}

export const useApiClient = () => {
    const { getToken } = useApiToken(); // ✅ Use the fixed hook

    const secureAxiosInstance = axios.create();

    secureAxiosInstance.interceptors.request.use(async (config) => {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    const getApiUrl = () => {
        if (window.location.hostname.startsWith('localhost'))
            return 'http://localhost:5002'
        else if (window.location.hostname.includes('groover.tech'))
            return 'https://movie-svc-daebbagqbbfchmg6.eastus2-01.azurewebsites.net'
        else return '';
    }

    return {
        actorApi: new ActorApi(undefined, getApiUrl()),
        movieApi: new MovieApi(undefined, getApiUrl()),
        tvShowApi: new TvShowApi(undefined, getApiUrl()),
        searchApi: new SearchApi(undefined, getApiUrl()),
        favoritesApi: new FavoritesApi(undefined, getApiUrl(), secureAxiosInstance), // the only secured endpoint
        getReviews: async (mediaType: 'movie' | 'tv', externalId: number, page: number) =>
            (await axios.get<ReviewResults>(`${getApiUrl()}/api/${mediaType === 'movie' ? 'movie' : 'tvshow'}/${externalId}/reviews`, { params: { page } })).data
    };
};
