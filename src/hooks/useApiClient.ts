import {useApiToken} from "./useApiToken.ts";
import axios from "axios";
import {ActorApi, FavoritesApi, MovieApi, SearchApi, TvShowApi, type SearchResultsPagedModel} from "../api-client";

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

export type DiscoveryMediaType = 'movie' | 'tv';

export interface DiscoveryResult {
    id: number;
    title?: string;
    name?: string;
    posterPath?: string;
    backdropPath?: string;
    releaseDate?: string;
    firstAirDate?: string;
    voteAverage: number;
}

export interface DiscoveryResults {
    page: number;
    results: DiscoveryResult[];
    totalPages: number;
    totalResults: number;
}

export interface WatchProvider {
    providerId: number;
    providerName: string;
    logoPath?: string;
}

export interface DiscoverFilters {
    genreIds?: string;
    providerIds?: string;
    region: string;
    minRating?: number;
    year?: number;
    sortBy: string;
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

    const apiUrl = getApiUrl();

    return {
        actorApi: new ActorApi(undefined, getApiUrl()),
        movieApi: new MovieApi(undefined, getApiUrl()),
        tvShowApi: new TvShowApi(undefined, getApiUrl()),
        searchApi: new SearchApi(undefined, getApiUrl()),
        favoritesApi: new FavoritesApi(undefined, getApiUrl(), secureAxiosInstance), // the only secured endpoint
        getNowPlayingMovies: async (page: number = 1) =>
            (await axios.get<SearchResultsPagedModel>(`${apiUrl}/api/movie/now-playing`, { params: { page } })).data,
        getUpcomingMovies: async (page: number = 1) =>
            (await axios.get<SearchResultsPagedModel>(`${apiUrl}/api/movie/upcoming`, { params: { page } })).data,
        getReviews: async (mediaType: 'movie' | 'tv', externalId: number, page: number) =>
            (await axios.get<ReviewResults>(`${apiUrl}/api/${mediaType === 'movie' ? 'movie' : 'tvshow'}/${externalId}/reviews`, { params: { page } })).data,
        discover: async (mediaType: DiscoveryMediaType, filters: DiscoverFilters, page: number) =>
            (await axios.get<DiscoveryResults>(`${apiUrl}/api/discover/${mediaType}`, { params: { ...filters, page } })).data,
        getWatchProviders: async (mediaType: DiscoveryMediaType, region: string) =>
            (await axios.get<{ results: WatchProvider[] }>(`${apiUrl}/api/discover/providers/${mediaType}`, { params: { region } })).data.results
    };
};
