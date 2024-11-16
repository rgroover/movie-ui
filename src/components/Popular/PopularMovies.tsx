import {useQuery} from "@tanstack/react-query";
import {movieApi} from "../../api-client/api-client-factory.ts";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MediaCard from "../MediaCard.tsx";

const PopularMovies = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['popular-actors'], // The query key should be in the options object
        queryFn: async () => {
            const response = await movieApi.apiMoviePopularGet();
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
                <WhatshotIcon /><Typography variant='h6' padding={2}>Popular Movies</Typography>
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

export default PopularMovies;