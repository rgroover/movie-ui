import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid2,
    Stack,
    Typography
} from "@mui/material";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {tvShowApi} from "../../api-client/api-client-factory.ts";
import {defaultImagePrefix} from "../../util/constants.ts";
import {useEffect} from "react";

const TvShowSeasonDetails = () => {

    const [searchParams] = useSearchParams();
    const series = searchParams.get('series');
    const season = searchParams.get('season');

    const seriesId = series ? parseInt(series, 10) : 0;
    const seasonId = season ? parseInt(season, 10) : 0;

    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['tv-series', seriesId, seasonId], // The query key should be in the options object
        queryFn: async () => {
            const response = await tvShowApi.apiTvshowSeriesIdSeasonsSeasonNumberGet(seriesId, seasonId)
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                alignItems: 'center',     // Centers vertically
                p: 2
            }}
        >
            <Stack
                direction="column"
                sx={{
                    width: '100%',
                    alignItems: 'center',   // Center children horizontally within the Stack
                }}
            >
                <Typography variant="h6">{data?.tvShowTitle}</Typography>
                <Typography variant="h6">Season {data?.seasonNumber}</Typography>
                <Grid2 container spacing={2} paddingTop={2} paddingLeft={2} >
                    {data?.episodes && data?.episodes.map((episode) => (
                        <Card sx={{width: 350, height: 320}}  >
                            <CardActionArea onClick={() =>  navigate(`/tvepisode?series=${seriesId}&season=${seasonId}&episode=${episode.episodeNumber}`)}>
                                <CardMedia
                                    component="img"
                                    height="210"
                                    image={
                                        episode.stillPath == null ? '/no-image.jpg' :
                                            defaultImagePrefix + episode.stillPath
                                    }
                                />
                                <CardContent style={{ textAlign: 'center' }}>
                                    <Stack direction='column'>
                                        <Box sx={{ width: '320' }}>
                                            <Typography gutterBottom
                                                        sx={{
                                                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                                                            overflow: 'hidden',         // Hides the overflowed text
                                                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                                                        }}>
                                                Episode {episode?.episodeNumber}
                                            </Typography>
                                            <Typography gutterBottom
                                                        sx={{
                                                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                                                            overflow: 'hidden',         // Hides the overflowed text
                                                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                                                        }}>
                                                {episode?.name}
                                            </Typography>
                                            <Typography gutterBottom
                                                        sx={{
                                                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                                                            overflow: 'hidden',         // Hides the overflowed text
                                                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                                                        }}>
                                                {episode?.airDate}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid2>
            </Stack>
        </Box>
    )
}

export default TvShowSeasonDetails;