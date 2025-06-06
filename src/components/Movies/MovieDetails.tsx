import {Box, CircularProgress, Grid2, IconButton, Rating, Stack, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import { defaultImagePrefix } from '../../util/constants.ts';
import { OpenInNew } from '@mui/icons-material';
import {useEffect, useState} from "react";
import WatchGuide from "../shared/WatchGuide.tsx";
import { ActorChip } from '../shared/ActorChip.tsx';
import FullscreenYouTubeModal from "../shared/FullscreenYouTubeModal.tsx";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {useApiClient} from "../../hooks/useApiClient.ts";
import FavoritesComponent from "../Favorites/FavoritesComponent.tsx";
import ScrollToTopFab from "../shared/ScrollToTopFab.tsx";

const MovieDetails = () => {

  const { movieApi } = useApiClient()
  const [videoOpen, setVideoOpen] = useState(false);
  const handleVideoOpen = () => setVideoOpen(true);
  const handleVideoClose = () => setVideoOpen(false);

  const { id } = useParams();
  const itemId = id ? parseInt(id, 10) : 0;

  const { isLoading: movieDetailsLoading, error, data } = useQuery({
    queryKey: ['movie-detail-data', id], // The query key should be in the options object
    queryFn: async () => {
      const response = await movieApi.apiMovieExternalIdGet(itemId);
      return response.data; // Access the data from AxiosResponse
    }
  });

  const trailer = data?.videos?.videos?.find(
      video => video.type === 'Trailer' && video.site === 'YouTube')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (movieDetailsLoading) {
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
              src={data?.movieDetails?.posterPath ? defaultImagePrefix + data?.movieDetails?.posterPath : '/no-image.jpg'}
            />
            <Box paddingTop={2}>
              <Stack direction='row'><Typography variant='h5'>{data?.movieDetails?.originalTitle} ({data?.movieDetails?.releaseDate?.substring(0,4)})</Typography>
              <FavoritesComponent
                  sx={{pl:2, pt:0.5}}
                  mediaType='movie'
                  mediaId={data?.movieDetails?.id!}
                  title={data?.movieDetails?.title!}
                  imageUrl={data?.movieDetails?.posterPath!}
              />
              </Stack>
            </Box>
            <Stack direction='row' spacing={2} paddingBottom={2}>
              <Rating name="read-only" value={((data?.movieDetails?.voteAverage ?? 0.0) / 2.0)} readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} htmlColor='white' />} precision={0.1}
              />
              <Typography paddingTop={0.2}>
                {((data?.movieDetails?.voteAverage ?? 0.0) / 2.0).toFixed(1)}/5.0 ({data?.movieDetails?.voteCount})
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8}}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h6'>{data?.movieDetails?.tagline}</Typography>
              <Typography>{data?.movieDetails?.overview}</Typography>
              <Typography>Budget: ${data?.movieDetails?.budget?.toLocaleString('en-US')}</Typography>   
              <Typography>Revenue: ${data?.movieDetails?.revenue?.toLocaleString('en-US')}</Typography>   
              <Typography>Genres: {data?.movieDetails?.genres?.map((item, index) => {
                  if (index === (data?.movieDetails?.genres?.length ?? 0) - 1) {
                    return `${item.name}`;
                  }
                  return `${item.name} - `;
                })}
              </Typography>
              <Typography>Runtime: {data?.movieDetails?.runtime} mins</Typography>
                {data?.movieDetails?.imdbId && 
                  <IconButton               
                      sx={{ 
                        width: 100, 
                        height: 30,
                        backgroundColor: '#F1C40F', 
                        color: 'black', 
                        textTransform: 'none', 
                        justifyContent: 'space-between',
                        padding: '8px',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#D4AC0D'  // Add a hover color for better UX
                        }
                      }} 
                      target="_blank" 
                      href={'https://www.imdb.com/title/' + data?.movieDetails?.imdbId}
                  >
                  <Typography variant="body2" sx={{ marginRight: '8px' }}>IMDB</Typography>
                    <OpenInNew />
                  </IconButton>
                }
              {trailer &&
                  <>
                    <IconButton
                        sx={{
                          width: 140,
                          height: 35,
                          backgroundColor: '#D22B2B',
                          color: 'whitesmoke',
                          textTransform: 'none',
                          justifyContent: 'space-between',
                          padding: '8px',
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: '#D22B2B'  // Add a hover color for better UX
                          }
                        }}
                        onClick={handleVideoOpen}
                    >
                      <Typography variant="body2" sx={{ marginRight: '8px' }}>Watch Trailer</Typography>
                      <YouTubeIcon />
                    </IconButton>
                    <FullscreenYouTubeModal
                        videoId={trailer?.key ?? ''}
                        open={videoOpen}
                        onClose={handleVideoClose}
                    />
                  </>
              }
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
                    <ActorChip key={cast.id} actor={cast} />
                  ))}
          </Grid2>
        </Stack>
      </Box>
      <ScrollToTopFab />
    </Box>
  );
}

export default MovieDetails;
