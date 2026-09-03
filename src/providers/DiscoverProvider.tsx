import {createContext, useContext, useState} from 'react';
import type {Dispatch, ReactNode, SetStateAction} from 'react';
import type {DiscoveryMediaType, WatchProvider} from '../hooks/useApiClient.ts';

export interface DiscoverFilterState {
    mediaType: DiscoveryMediaType;
    selectedGenres: number[];
    selectedProviders: WatchProvider[];
    minStars: number;
    year: number | null;
    sortBy: string;
}

const initialFilters: DiscoverFilterState = {
    mediaType: 'movie',
    selectedGenres: [],
    selectedProviders: [],
    minStars: 0,
    year: null,
    sortBy: 'popularity.desc',
};

interface DiscoverContextType {
    filters: DiscoverFilterState;
    setFilters: Dispatch<SetStateAction<DiscoverFilterState>>;
}

const DiscoverContext = createContext<DiscoverContextType | undefined>(undefined);

export const DiscoverProvider = ({children}: {children: ReactNode}) => {
    const [filters, setFilters] = useState<DiscoverFilterState>(initialFilters);
    return <DiscoverContext.Provider value={{filters, setFilters}}>{children}</DiscoverContext.Provider>;
};

export const useDiscoverFilters = () => {
    const context = useContext(DiscoverContext);
    if (!context) throw new Error('useDiscoverFilters must be used within a DiscoverProvider');
    return context;
};
