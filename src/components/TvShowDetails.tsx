import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Chip,
    CircularProgress, Divider,
    Grid2,
    Rating,
    Stack,
    Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import { tvShowApi} from '../api-client/api-client-factory';
import { defaultImagePrefix } from '../util/constants';
import {useEffect} from "react";
import ScrollToTopFab from "./ScrollToTopFab.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TvShowDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleClick = (id: number | undefined) => {
        navigate(`/actor/${id}`);
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
            <Box sx={{ flexGrow: 1 }} paddingTop={4}>
                <Accordion   sx={{
                    backgroundColor: '#585858',  // Gray background from MUI's palette
                    border: '1px solid white',  // Gray border color (or customize with any color)
                    borderRadius: 2,              // Optional: round the corners
                    overflow: 'hidden',           // To ensure the border radius applies properly
                    color: 'white'
                }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color: 'white'}} />} id='panel1-header' aria-controls='panel1-content' >
                        <Typography variant="h6">Watch Guide</Typography>
                    </AccordionSummary>
                    <Divider sx={{ borderColor: 'white', width: '100%' }}  />
                    <AccordionDetails>
                        <Typography mb={1} variant="h6">Subscription</Typography>
                        {!data?.watchProviders?.results?.us?.flatrate && <Typography mb={1}>None</Typography>}
                        {data?.watchProviders?.results?.us?.flatrate?.map( (provider) => {
                            return (
                                <Box
                                    component="img"
                                    sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                    m={1}
                                    alt="network image"
                                    src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                                />
                            )
                        })}
                        <Typography mb={1} variant="h6" mt={2}>Ad Supported</Typography>
                        {!data?.watchProviders?.results?.us?.ads && <Typography mb={1}>None</Typography>}
                        {data?.watchProviders?.results?.us?.ads?.map( (provider) => {
                            return (
                                <Box
                                    component="img"
                                    sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                    m={1}
                                    alt="network image"
                                    src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                                />
                            )
                        })}
                        <Typography mb={1} variant="h6" mt={2}>Rent</Typography>
                        {!data?.watchProviders?.results?.us?.rent && <Typography mb={1}>None</Typography>}
                        {data?.watchProviders?.results?.us?.rent?.map( (provider) => {
                            return (
                                <Box
                                    component="img"
                                    sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                    m={1}
                                    alt="network image"
                                    src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                                />
                            )
                        })}
                        <Typography  mb={1} variant="h6" mt={2}>Buy</Typography>
                        {!data?.watchProviders?.results?.us?.buy && <Typography mb={1}>None</Typography>}
                        {data?.watchProviders?.results?.us?.buy?.map( (provider) => {
                            return (
                                <Box
                                    component="img"
                                    sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                    m={1}
                                    alt="network image"
                                    src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                                />
                            )
                        })}
                        <Divider sx={{ borderColor: 'white', width: '100%', marginTop: '20px' }}  />
                        <Typography fontSize={12} mt={2} >Streaming information courtesy of JustWatch</Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{ flexGrow: 1 }} paddingTop={4}>
                <Stack direction='row' spacing={2}>
                    <Grid2 container spacing={2}  >
                        {data?.castAndCrew?.cast?.map((cast) => (
                            <Chip id={`${cast.id}`}
                                  sx={{color: 'white', height: 70, backgroundColor: '#585858', '& .MuiChip-avatar': {
                                          height: 60,
                                          width: 60,
                                      }}} variant="outlined"
                                  label={`${cast.roles![0].character?.length === 0 ? "(unknown)" :cast.roles![0].character} - ${cast.name}`}
                                  avatar={<Avatar alt={`${cast.name}`} src={`${defaultImagePrefix}${cast.profilePath}`}/>}
                                  onClick={() => handleClick(cast.id)}
                                  key={cast.id}
                            />
                        ))}
                    </Grid2>
                </Stack>
            </Box>
            <ScrollToTopFab />
        </Box>
    );
};

export default TvShowDetails;
