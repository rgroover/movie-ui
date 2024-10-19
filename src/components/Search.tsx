import { Box, CircularProgress, Grid2, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../api-client/api-client-factory";
import MovieCard from "./MovieCard";
import { useSearch } from "../providers/SearchProvider";

const Search = () => {

    const { searchQuery, setSearchQuery } = useSearch();
    //const [movieData, setMovieData] = useState<SearchResultsPagedModel>();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['movie-search'], // The query key should be in the options object
        queryFn: async () => {
          if (!searchQuery) return null;
          const response = await movieApi.apiSearchSearchTextGet(searchQuery);
          return response.data; // Access the data from AxiosResponse
        }
      });

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
      };

    const handleSearchClick = () => {
        refetch();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          refetch();
        }
      };

      if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }
    
      if (error) {
        return <Typography>Error: {error.message}</Typography>;
      }
  
    return (
        <>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center',     // Centers vertically
            p: 2
            }}
        >
            <Stack direction='column' sx={{ width: '90%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Centers horizontally
                        alignItems: 'center', // Centers vertically
                        paddingBottom: 2
                    }}>
                    <Typography variant="h5">Search For A Movie</Typography>
                </Box>
                <OutlinedInput
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
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
                    endAdornment={
                        <InputAdornment position="end" sx={{color: 'white', cursor: 'pointer'}}>
                            <SearchIcon onClick={handleSearchClick} />
                        </InputAdornment>
                    }
                    value={searchQuery}
                />  
            </Stack>
        </Box>
        {data?.searchResults?.length == 0 && 
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centers horizontally
                    alignItems: 'center' // Centers vertically
                }}>
                <Typography paddingTop={10} variant="h3">No Results</Typography>
            </Box>}
    
        <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
            {data?.searchResults?.map ((movie) => (
                <MovieCard movie={movie} />
            ))}
        </Grid2>
    </>
    );
}

export default Search;
