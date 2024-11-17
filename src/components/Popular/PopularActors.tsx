import {useQuery} from "@tanstack/react-query";
import {actorApi} from "../../api-client/api-client-factory.ts";
import {Box, CircularProgress, Grid2, Typography} from "@mui/material";
import ActorCard from "../Actors/ActorCard.tsx";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const PopularActors = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['popular-actors'], // The query key should be in the options object
        queryFn: async () => {
            const response = await actorApi.apiActorPopularGet();
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
                <WhatshotIcon /><Typography variant='h6' padding={2}>Popular People</Typography>
            </Box>
            { data?.results &&
                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                    {data?.results?.map ((actor) => (
                        <ActorCard actor={actor} key={actor.id} />
                    ))}
                </Grid2>
            }
        </>
    )
}

export default PopularActors;
