import {useApiClient} from "../../hooks/useApiClient.ts";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import MediaCard from "../shared/MediaCard.tsx";

const MovieSearch: React.FC = () => {

    const { query } = useParams();
    const { movieApi } = useApiClient();

    const { isLoading, error, data: movieResults } = useQuery({
        queryKey: ['movie-search', query], // The query key should be in the options object
        queryFn: async () => {
            const response = await movieApi.apiSearchMovieSearchTextGet(query ?? '');
            return response.data; // Access the data from AxiosResponse
        }
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
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
            {(!movieResults || movieResults?.searchResults?.length === 0) &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Centers horizontally
                        alignItems: 'center' // Centers vertically
                    }}>
                    <Typography paddingTop={10} variant="h3">No Results</Typography>
                </Box>
            }
            { movieResults?.searchResults &&
                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                    {movieResults?.searchResults?.map ((movie) => (
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
            </Box>
        </>
    )
}
export default MovieSearch;