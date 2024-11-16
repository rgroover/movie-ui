import {useQuery} from "@tanstack/react-query";
import {tvShowApi} from "../../api-client/api-client-factory.ts";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MediaCard from "../MediaCard.tsx";

const PopularTv = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['popular-actors'], // The query key should be in the options object
        queryFn: async () => {
            const response = await tvShowApi.apiTvshowPopularGet();
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
                <WhatshotIcon /><Typography variant='h6' padding={2}>Popular TV Shows</Typography>
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

export default PopularTv;