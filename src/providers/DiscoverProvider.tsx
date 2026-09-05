import {useState, type ReactNode} from 'react';
import {DiscoverContext, type DiscoverFilterState} from '../hooks/useDiscoverFilters.ts';

const initialFilters: DiscoverFilterState = {
    mediaType: 'movie',
    selectedGenres: [],
    selectedProviders: [],
    minStars: 0,
    year: null,
    sortBy: 'popularity.desc',
};

export const DiscoverProvider = ({children}: {children: ReactNode}) => {
    const [filters, setFilters] = useState<DiscoverFilterState>(initialFilters);
    return <DiscoverContext.Provider value={{filters, setFilters}}>{children}</DiscoverContext.Provider>;
};
