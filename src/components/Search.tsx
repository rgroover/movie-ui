import { Box, CircularProgress, Grid2, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MediaCard from "./shared/MediaCard.tsx";
import ScrollToTopFab from "./shared/ScrollToTopFab.tsx";
import {useQuery} from "@tanstack/react-query";
import {useApiClient} from "../hooks/useApiClient.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import {useSearch} from "../providers/SearchProvider.tsx";

const Search = () => {

    const { searchQuery, setSearchQuery } = useSearch();
    const debouncedSearch = useDebounce(searchQuery, 800); // 500ms debounce

    const { searchApi } = useApiClient();

    const { data: searchResults, isLoading, error } = useQuery({
        queryKey: ['search', debouncedSearch],
        queryFn: async () => {
            const results = await searchApi.apiSearchSearchTextGet(debouncedSearch)
            return results.data
        },
        enabled: !!debouncedSearch, // don't run if empty
    });

      if (error) {
        return <Typography>Error: {error?.message}</Typography>;
      }
  
    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2}}>
        <Stack direction='column' sx={{ width: '100%'}}>
                <OutlinedInput
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
                    endAdornment={
                        <InputAdornment position="end" sx={{color: 'white'}}>
                            <SearchIcon />
                        </InputAdornment>
                    }
                />  
            </Stack>
        </Box>
        {isLoading &&
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        }
        {!isLoading && searchResults?.results?.length === 0  &&
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centers horizontally
                    alignItems: 'center' // Centers vertically
                }}>
                <Typography paddingTop={10} variant="h3">No Results</Typography>
            </Box>
        }
        { searchResults && searchResults?.results &&
            <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                {searchResults?.results?.map ((item) => (
                    <MediaCard id={item.id}
                               title={item.title ?? item.name}
                               type={item.mediaType}
                               imagePath={item.backdropPath ?? item.posterPath ?? item.profilePath}
                               mediaDate={item.releaseDate ?? item.firstAirDate}
                               key={item.id}
                    />
                    ))}
            </Grid2>
        }
        <ScrollToTopFab />
    </>
    );
}

export default Search;
