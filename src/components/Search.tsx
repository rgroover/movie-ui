import { Box, CircularProgress, Grid2, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import MediaCard from "./shared/MediaCard.tsx";
import ScrollToTopFab from "./shared/ScrollToTopFab.tsx";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {useApiClient} from "../hooks/useApiClient.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import {useSearch} from "../providers/SearchProvider.tsx";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useRef} from 'react';

const Search = () => {

    const { searchQuery, setSearchQuery } = useSearch();
    const debouncedSearch = useDebounce(searchQuery, 500); // debounce milliseconds
    const { searchApi } = useApiClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const { movieApi } = useApiClient();

    const {
        data: searchResults,
        isLoading: searchLoading,
        error: searchError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['search', debouncedSearch],
        queryFn: async ({ pageParam = 1 }) => {
            const results = await searchApi.apiSearchSearchTextGet(debouncedSearch, pageParam);
            return results.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = (lastPage?.page ?? 0)  + 1;
            return nextPage <= (lastPage?.totalPages ?? 0) ? nextPage : undefined;
        },
        enabled: !!debouncedSearch,
    });

    const { isLoading: isNowPlayingLoading, error: nowPlayingError, data: nowPlayingInfo } = useQuery({
        queryKey: ['now-playing',], // The query key should be in the options object
        queryFn: async () => {
            const response = await movieApi.apiMovieNowPlayingGet();
            return response.data; // Access the data from AxiosResponse
        }
    });

    const handleClear = () => {
        setSearchQuery('');
        // Timeout ensures the input is still mounted before trying to focus
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = async () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetchingNextPage && hasNextPage) {
                await fetchNextPage(); // Fetch more results when the user reaches the bottom
            }
        }
    };

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isFetchingNextPage, hasNextPage]);

    if (searchError || nowPlayingError) {
        return <Typography>Error: {searchError?.message ?? nowPlayingError?.message}</Typography>;
    }
  
    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2}}>
        <Stack direction='column' sx={{ width: '100%'}}>
                <OutlinedInput
                    inputRef={inputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: '100%',
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Sets the outline color to white
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Keeps it white on hover
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Keeps it white when focused
                        }
                    }}
                    id="searchinput"
                    type='text'
                    placeholder='Search Movies, TV, Actors'
                    endAdornment = {
                        searchQuery.length > 0 &&
                        <InputAdornment position="end" sx={{color: 'white'}}>
                            <IconButton onClick={handleClear} sx={{color: 'white'}}>
                                <CloseIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                />  
            </Stack>
        </Box>
        {(searchLoading || isNowPlayingLoading) &&
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        }
        {!searchLoading && searchResults?.pages[0].results?.length === 0  && searchQuery.length > 0 &&
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centers horizontally
                    alignItems: 'center' // Centers vertically
                }}>
                <Typography paddingTop={10} variant="h3">No Results</Typography>
            </Box>
        }
        { searchResults && searchResults?.pages.length > 0 &&
            <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} ref={containerRef} style={{ height: '80vh', overflowY: 'auto' }} >
                {searchResults?.pages?.flatMap((page) =>
                    page?.results?.map((item) => (
                    <MediaCard id={item.id}
                               title={item.title ?? item.name}
                               type={item.mediaType}
                               imagePath={item.backdropPath ?? item.posterPath ?? item.profilePath}
                               mediaDate={item.releaseDate ?? item.firstAirDate}
                               key={item.id}
                    />
                    )))}
            </Grid2>
        }

        { !searchResults &&  searchQuery.length === 0 &&
            <>

                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} ref={containerRef} style={{ height: '80vh', overflowY: 'auto' }} >
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Typography variant="h4">Now Playing</Typography>
                    </Box>
                    {nowPlayingInfo?.searchResults?.map((item) => (
                            <MediaCard id={item.id}
                                       title={item.title ?? item.title}
                                       type='movie'
                                       imagePath={item.backdropPath ?? item.posterPath}
                                       mediaDate={item.releaseDate }
                                       key={item.id}
                            />
                        ))}
                </Grid2>
            </>
        }

        <ScrollToTopFab />
    </>
    );
}

export default Search;
