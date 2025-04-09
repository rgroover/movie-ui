import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import MediaCard from "../shared/MediaCard.tsx";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {useApiClient} from "../../hooks/useApiClient.ts";

const TrendingTv = () => {

    const {tvShowApi} = useApiClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['popular-actors'], // The query key should be in the options object
        queryFn: async () => {
            const response = await tvShowApi.apiTvshowTrendingGet();
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
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="40px"
                mt={2}
            >
                <TrendingUpIcon /><Typography variant='h6' padding={2}>Trending TV Shows</Typography>
            </Box>
            { data?.results &&
                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                    {data?.results.map ((tvShow) => (
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
        </>
    )
}

export default TrendingTv;