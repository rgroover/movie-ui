import {
    Box,
    CircularProgress,
    Grid2,
    Rating,
    Stack,
    Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import { tvShowApi} from '../../api-client/api-client-factory.ts';
import { defaultImagePrefix } from '../../util/constants.ts';
import {useEffect} from "react";
import ScrollToTopFab from "../shared/ScrollToTopFab.tsx";
import WatchGuide from "../shared/WatchGuide.tsx";
import {ActorChip} from "../shared/ActorChip.tsx";

const TvShowDetails = () => {

    const { id } = useParams();

    const itemId = id ? parseInt(id, 10) : 0;

    const { isLoading, error, data } = useQuery({
        queryKey: ['tvshow-detail-data', id], // The query key should be in the options object
        queryFn: async () => {
            const response = await tvShowApi.apiTvshowExternalIdGet(itemId);
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

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1 }} padding={2}>
            <Grid2 container >
                <Grid2 size={{ xs: 12, md: 4 }} >
                    <Box
                        component="img"
                        sx={{height: 410, maxWidth:280}}
                        alt="movie image"
                        src={data?.posterPath ? defaultImagePrefix + data?.posterPath : '/no-image.jpg'}
                    />
                    <Box paddingTop={2}>
                        <Typography variant='h5'>{data?.name}</Typography>
                    </Box>
                    <Stack direction='row' spacing={2} paddingBottom={2}>
                        <Rating name="read-only" value={((data?.voteAverage ?? 0.0) / 2.0)} readOnly
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} htmlColor='white' />} precision={0.1}
                        />
                        <Typography paddingTop={0.2}>
                            {((data?.voteAverage ?? 0.0) / 2.0).toFixed(1)}/5.0 ({data?.voteCount})
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8}}>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='h6'>{data?.tagline}</Typography>
                        <Typography>{data?.overview}</Typography>
                        <Typography>Genres: {data?.genres?.map((item, index) => {
                            if (index === (data?.genres?.length ?? 0) - 1) {
                                return `${item.name}`;
                            }
                            return `${item.name} - `;
                        })}
                        </Typography>
                        <Typography paddingTop={0.2}>
                            First Air Date: {data?.firstAirDate}
                        </Typography>
                        <Typography paddingTop={0.2}>
                            Last Air Date: {data?.lastAirDate}
                        </Typography>
                        <Typography paddingTop={0.2}>
                            Status: {data?.status}
                        </Typography>
                        <Typography>Seasons: {data?.numberOfSeasons}</Typography>
                        <Typography>Episodes: {data?.numberOfEpisodes}</Typography>
                        <Stack direction='row' spacing={2} paddingBottom={2}>
                            <Typography pt={0.6}>Network(s): </Typography>
                            {data?.networks?.map( (network) => {
                                return (
                                    <Box
                                        component="img"
                                        sx={{height: 20, backgroundColor: 'white', borderRadius: '5px'}}
                                        p={1}
                                        alt="network image"
                                        src={network?.logoPath ? defaultImagePrefix + network?.logoPath : '/no-image.jpg'}
                                    />
                                )
                            })}
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
           <WatchGuide
               flatRate={data?.watchProviders?.results?.us?.flatrate}
               ads={data?.watchProviders?.results?.us?.ads}
               rent={data?.watchProviders?.results?.us?.rent}
               buy={data?.watchProviders?.results?.us?.buy}
           />
            <Box sx={{ flexGrow: 1 }} paddingTop={4}>
                <Stack direction='row' spacing={2}>
                    <Grid2 container spacing={2}>
                        {data?.castAndCrew?.cast?.map((cast) => (
                            <ActorChip actor={cast} />
                        ))}
                    </Grid2>
                </Stack>
            </Box>
            <ScrollToTopFab />
        </Box>
    );
};

export default TvShowDetails;
