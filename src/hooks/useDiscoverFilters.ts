import {createContext, useContext} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import type {DiscoveryMediaType, WatchProvider} from './useApiClient.ts';

export interface DiscoverFilterState {
    mediaType: DiscoveryMediaType;
    selectedGenres: number[];
    selectedProviders: WatchProvider[];
    minStars: number;
    year: number | null;
    sortBy: string;
}

interface DiscoverContextType {
    filters: DiscoverFilterState;
    setFilters: Dispatch<SetStateAction<DiscoverFilterState>>;
}

export const DiscoverContext = createContext<DiscoverContextType | undefined>(undefined);

export const useDiscoverFilters = () => {
    const context = useContext(DiscoverContext);
    if (!context) throw new Error('useDiscoverFilters must be used within a DiscoverProvider');
    return context;
};
