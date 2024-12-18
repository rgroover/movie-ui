import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {tvShowApi} from "../../api-client/api-client-factory.ts";
import {Box, CircularProgress, Grid2, Rating, Stack, Typography} from "@mui/material";
import {defaultImagePrefix} from "../../util/constants.ts";
import StarIcon from "@mui/icons-material/Star";
import {ActorChip} from "../shared/ActorChip.tsx";
import {useEffect} from "react";

const TvShowEpisodeDetails = () => {

    const [searchParams] = useSearchParams();
    const series = searchParams.get('series');
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');

    const seriesId = series ? parseInt(series, 10) : 0;
    const seasonId = season ? parseInt(season, 10) : 0;
    const episodeId = episode ? parseInt(episode, 10) : 0;

    const { isLoading, error, data } = useQuery({
        queryKey: ['tv-episode', seriesId, seasonId, episodeId], // The query key should be in the options object
        queryFn: async () => {
            const response = await
                tvShowApi.apiTvshowSeriesIdSeasonsSeasonNumberEpisodeEpisodeNumberGet(seriesId, seasonId, episodeId)
            return response.data; // Access the data from AxiosResponse
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) { return <Typography>Error: {error?.message}</Typography>; }

    return (
        <Box sx={{ flexGrow: 1 }} padding={2}>
            <Stack
                direction="column"
                sx={{
                    width: '100%',
                    alignItems: 'center',   // Center children horizontally within the Stack
                }}
            >
                <Typography variant="h6">{data?.tvShowTitle}</Typography>
                <Typography variant="h6">Season {data?.seasonNumber}</Typography>
                <Typography variant="h6">Episode {data?.episodeNumber}</Typography>
                <Box
                    component="img"
                    sx={{maxWidth: '90%', p:1}}
                    alt="movie image"
                    src={data?.stillPath ? defaultImagePrefix + data?.stillPath : '/no-image.jpg'}
                />
            </Stack>
            <Stack direction='row' spacing={2} paddingBottom={2}>
                <Rating name="read-only" value={((data?.voteAverage ?? 0.0) / 2.0)} readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} htmlColor='white' />} precision={0.1}
                />
                <Typography paddingTop={0.2}>
                    {((data?.voteAverage ?? 0.0) / 2.0).toFixed(1)}/5.0 ({data?.voteCount})
                </Typography>
            </Stack>
            <Grid2 size={{ xs: 12, md: 8}}>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h6'>{data?.name}</Typography>
                    <Typography>{data?.overview}</Typography>
                    <Typography>Runtime: {data?.runtime ?? 0} mins</Typography>
                    <Typography>Air Date: {data?.airDate}</Typography>
                </Stack>
            </Grid2>
            <Box sx={{ flexGrow: 1 }} paddingTop={2}>
                <Typography variant="h6" paddingBottom={2}>Guest Stars</Typography>
                {data?.guestStars?.length === 0 && <Typography paddingTop={1}>None</Typography>}
                <Stack direction='row' spacing={2}>
                    <Grid2 container spacing={2}>
                        {data?.guestStars?.map((guestStar) => (
                            <ActorChip actor={guestStar} />
                        ))}
                    </Grid2>
                </Stack>
            </Box>
        </Box>
    )
}

export default TvShowEpisodeDetails