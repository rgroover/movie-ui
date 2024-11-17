import {useQuery} from "@tanstack/react-query";
import {movieApi} from "../../api-client/api-client-factory.ts";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import MediaCard from "../shared/MediaCard.tsx";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const TrendingMovies = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['popular-actors'], // The query key should be in the options object
        queryFn: async () => {
            const response = await movieApi.apiMovieTrendingGet();
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

    if (error) { return <Typography>Error: {error?.message}</Typography>; }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="40px"
                mt={2}
            >
                <TrendingUpIcon /><Typography variant='h6' padding={2}>Trending Movies</Typography>
            </Box>
            { data?.searchResults &&
                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                    {data?.searchResults?.map ((movie) => (
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
        </>
    )
}

export default TrendingMovies;