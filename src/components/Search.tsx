import { Box, CircularProgress, Grid2, InputAdornment, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {actorApi, movieApi, tvShowApi} from "../api-client/api-client-factory";
import MediaCard from "./MediaCard.tsx";
import { useSearch } from "../providers/SearchProvider";
import ScrollToTopFab from "./ScrollToTopFab";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ActorCard from "./ActorCard";

const Search = () => {

    const { 
        searchQuery, setSearchQuery, 
        searchType, setSearchType, 
        movieData, setMovieData,
        actorData, setActorData,
        tvData, setTvData
    } = useSearch();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleCategoryChange = (_: unknown, newType: string) => {
      if (newType !== null) {
        setSearchType(newType);
      }
    };

    const searchMovies = async () => {
        setIsLoading(true);   // Set loading to true when fetch starts
        setIsError(false);    // Reset error state
        setError(null);       // Clear previous errors
        setMovieData(null);
        setActorData(null);
        setTvData(null);
        
        try {
            const data = await queryClient.fetchQuery({
                queryKey: ['movie-search'],  // Use searchQuery in the query key
                queryFn: async () => {
                    if (!searchQuery) return null;
                    const response = await movieApi.apiSearchMovieSearchTextGet(searchQuery);
                    return response.data;  // Return the data from the API response
                }
            });
            setMovieData(data);  // Set the movie data
        } catch (err) {
            setIsError(true);
            if (err instanceof AxiosError) {
                // Axios-specific error handling
                console.error('Axios error response:', err.response);
                setError(new Error(`API Error: ${err.message}`));
            } else if (err instanceof Error) {
                // Generic error
                setError(err);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setIsLoading(false); // Set loading to false when fetch is done (whether success or error)
        }
    };

    const searchActors = async () => {
        setIsLoading(true);   // Set loading to true when fetch starts
        setIsError(false);    // Reset error state
        setError(null);       // Clear previous errors
        setMovieData(null);
        setActorData(null);
        setTvData(null);

        try {
            const data = await queryClient.fetchQuery({
                queryKey: ['actor-search'],
                queryFn: async () => {
                    if (!searchQuery) return null;
                    const response = await actorApi.apiSearchActorSearchTextGet(searchQuery);
                    return response.data; // Access the data from AxiosResponse
                }
            })
            setActorData(data);       
        } catch (err) {
            setIsError(true);
            if (err instanceof AxiosError) {
                // Axios-specific error handling
                console.error('Axios error response:', err.response);
                setError(new Error(`API Error: ${err.message}`));
            } else if (err instanceof Error) {
                // Generic error
                setError(err);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setIsLoading(false); // Set loading to false when fetch is done (whether success or error)
        }
    }

    const searchTvShows = async () => {
        setIsLoading(true);   // Set loading to true when fetch starts
        setIsError(false);    // Reset error state
        setError(null);       // Clear previous errors
        setMovieData(null);
        setActorData(null);
        setTvData(null);

        try {
            const data = await queryClient.fetchQuery({
                queryKey: ['tv-search'],  // Use searchQuery in the query key
                queryFn: async () => {
                    if (!searchQuery) return null;
                    const response = await tvShowApi.apiSearchTvshowSearchTextGet(searchQuery);
                    return response.data;  // Return the data from the API response
                }
            });
            setTvData(data);  // Set the movie data
        } catch (err) {
            setIsError(true);
            if (err instanceof AxiosError) {
                // Axios-specific error handling
                console.error('Axios error response:', err.response);
                setError(new Error(`API Error: ${err.message}`));
            } else if (err instanceof Error) {
                // Generic error
                setError(err);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setIsLoading(false); // Set loading to false when fetch is done (whether success or error)
        }
    };

    const performSearch = () => {
        if(searchType === 'movies') {
            searchMovies();
        } else if (searchType === 'actors') {
            searchActors();
        } else if (searchType === 'tv') {
            searchTvShows();
        }
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
      };

    const handleSearchClick = () => {
        performSearch();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          performSearch();
        }
      };

      if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }

      if (isError) {
        return <Typography>Error: {error?.message}</Typography>;
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
            <Box display="flex" justifyContent="center" paddingBlock={2}>
                <ToggleButtonGroup
                        value={searchType}
                        exclusive
                        onChange={handleCategoryChange}
                        aria-label="Search category toggle">
                    <ToggleButton
                        value="movies"
                        aria-label="search movies"
                        sx={{
                            backgroundColor: searchType === 'movies' ? '#ffd800' : 'lightgray', // background color
                            color: searchType === 'movies' ? 'white' : 'gray', // text color
                            border: '2px solid', // outline
                            borderColor: 'white', // outline color
                            '&.Mui-selected': {
                                backgroundColor: '#ffd800', // custom background when selected
                                color: 'white', // custom text color when selected
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#ffd800', // custom background when selected and hovered
                            },
                        }}>Movies
                    </ToggleButton>

                    <ToggleButton
                        value="tv"
                        aria-label="search tv shows"
                        sx={{
                            backgroundColor: searchType === 'tv' ? '#ffd800' : 'lightgray', // background color
                            color: searchType === 'tv' ? 'white' : 'gray', // text color
                            border: '2px solid', // outline
                            borderColor: 'white', // outline color
                            '&.Mui-selected': {
                                backgroundColor: '#ffd800', // custom background when selected
                                color: 'white', // custom text color when selected
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#ffd800', // custom background when selected and hovered
                            },
                        }}>TV Shows
                    </ToggleButton>

                    <ToggleButton
                        value="actors"
                        aria-label="search actors"
                        sx={{
                            backgroundColor: searchType === 'actors' ? '#ffd800' : 'lightgray', // background color
                            color: searchType === 'actors' ? 'white' : 'gray', // text color
                            border: '2px solid', // outline
                            borderColor: 'white', // outline color
                            '&.Mui-selected': {
                                backgroundColor: '#ffd800', // custom background when selected
                                color: 'white', // custom text color when selected
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#ffd800', // custom background when selected and hovered
                            },
                        }}>Actors
                    </ToggleButton>
                </ToggleButtonGroup>
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
        { (movieData?.searchResults?.length === 0 || actorData?.results?.length === 0 || tvData?.results?.length === 0)  &&
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centers horizontally
                    alignItems: 'center' // Centers vertically
                }}>
                <Typography paddingTop={10} variant="h3">No Results</Typography>
            </Box>
        }
        { movieData?.searchResults &&
            <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                {movieData?.searchResults?.map ((movie) => (
                    <MediaCard id={movie.id}
                               title={movie.title}
                               type={'movie'}
                               imagePath={movie.backdropPath ?? movie.posterPath}
                               mediaDate={movie.releaseDate}
                               key={movie.id}
                    />
                ))}
            </Grid2>
        }
        { tvData?.results &&
            <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                {tvData?.results.map ((tvShow) => (
                    <MediaCard id={tvShow.id}
                               title={tvShow.name ?? tvShow.name}
                               type={'tv'}
                               imagePath={tvShow.backdropPath ?? tvShow.posterPath}
                               mediaDate={tvShow.firstAirDate}
                               key={tvShow.id}
                    />
                ))}
            </Grid2>
        }
        { actorData?.results && 
            <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                {actorData?.results?.map ((actor) => (
                    <ActorCard actor={actor} key={actor.id} />
                ))}
            </Grid2>
        }
        <ScrollToTopFab />
    </>
    );
}

export default Search;
