import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import {defaultImagePrefix, fullSizeImagePrefix} from '../../util/constants.ts';
import { OpenInNew } from '@mui/icons-material';
import {useEffect, useState} from "react";
import WatchGuide from "../shared/WatchGuide.tsx";
import { ActorChip } from '../shared/ActorChip.tsx';
import FullscreenYouTubeModal from "../shared/FullscreenYouTubeModal.tsx";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {useApiClient} from "../../hooks/useApiClient.ts";
import FavoritesComponent from "../Favorites/FavoritesComponent.tsx";
import ScrollToTopFab from "../shared/ScrollToTopFab.tsx";
import ExpandableImage from "../shared/ExpandableImage.tsx";
import MediaCard from "../shared/MediaCard.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {accordionStyle} from "../../styles/SharedStyles.ts";
import ReviewsDialog from "../shared/ReviewsDialog.tsx";

const MovieDetails = () => {

  const { movieApi } = useApiClient()
  const [videoOpen, setVideoOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [recommendationPage, setRecommendationPage] = useState(0);
  const handleVideoOpen = () => setVideoOpen(true);
  const handleVideoClose = () => setVideoOpen(false);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const recommendationsPerPage = isMediumScreen ? 3 : isSmallScreen ? 2 : 1;

  const { id } = useParams();
  const itemId = id ? parseInt(id, 10) : 0;

  const { isLoading: movieDetailsLoading, error, data } = useQuery({
    queryKey: ['movie-detail-data', id], // The query key should be in the options object
    queryFn: async () => {
      const response = await movieApi.apiMovieExternalIdGet(itemId);
      return response.data; // Access the data from AxiosResponse
    }
  });

  const {
    isLoading: recommendationsLoading,
    error: recommendationsError,
    data: recommendations
  } = useQuery({
    queryKey: ['movie-recommendations', itemId],
    queryFn: async () => {
      const response = await movieApi.apiMovieExternalIdRecommendationsGet(itemId);
      return response.data;
    },
    enabled: itemId > 0
  });

  const trailer = data?.videos?.videos?.find(
      video => video.type === 'Trailer' && video.site === 'YouTube')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const recommendationResults = recommendations?.searchResults ?? [];
  const recommendationPageCount = Math.ceil(recommendationResults.length / recommendationsPerPage);
  const visibleRecommendations = recommendationResults.slice(
    recommendationPage * recommendationsPerPage,
    (recommendationPage + 1) * recommendationsPerPage
  );

  useEffect(() => {
    setRecommendationPage((page) => Math.min(page, Math.max(recommendationPageCount - 1, 0)));
  }, [recommendationPageCount]);

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
            <ExpandableImage
              alt={`${data?.movieDetails?.title ?? 'Movie'} poster`}
              src={data?.movieDetails?.posterPath ? defaultImagePrefix + data?.movieDetails?.posterPath : '/no-image.jpg'}
              expandedSrc={data?.movieDetails?.posterPath ? fullSizeImagePrefix + data?.movieDetails?.posterPath : '/no-image.jpg'}
            />
            <Box paddingTop={2}>
              <Stack direction='row'><Typography variant='h5'>{data?.movieDetails?.originalTitle} ({data?.movieDetails?.releaseDate?.substring(0,4)})</Typography>
              <FavoritesComponent
                  sx={{pl:2, pt:0.5}}
                  mediaType='movie'
                  mediaId={data?.movieDetails?.id ?? itemId}
                  title={data?.movieDetails?.title ?? ''}
                  imageUrl={data?.movieDetails?.posterPath ?? ''}
              />
              </Stack>
            </Box>
            <Stack direction='row' spacing={2} paddingBottom={2}>
              <Box role="button" tabIndex={0} aria-label="Show movie reviews" onClick={() => setReviewsOpen(true)} onKeyDown={(event) => event.key === 'Enter' && setReviewsOpen(true)} sx={{cursor: 'pointer'}}>
                <Rating name="movie-reviews" value={((data?.movieDetails?.voteAverage ?? 0.0) / 2.0)} readOnly
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} htmlColor='white' />} precision={0.1}
                />
              </Box>
              <Typography paddingTop={0.2}>
                {((data?.movieDetails?.voteAverage ?? 0.0) / 2.0).toFixed(1)}/5.0 ({data?.movieDetails?.voteCount})
              </Typography>
            </Stack>
            <ReviewsDialog open={reviewsOpen} onClose={() => setReviewsOpen(false)} mediaId={data?.movieDetails?.id ?? itemId} mediaType="movie" title={data?.movieDetails?.title ?? 'this movie'} />
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
        <Accordion sx={{...accordionStyle}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: 'white'}} />}
            id="recommendations-header"
            aria-controls="recommendations-content"
          >
            <Typography variant="h6">You May Also Like</Typography>
          </AccordionSummary>
          <Divider sx={{borderColor: 'white', width: '100%'}} />
          <AccordionDetails>
            {recommendationsLoading && (
              <Box display="flex" justifyContent="center" padding={4}>
                <CircularProgress />
              </Box>
            )}
            {recommendationsError && (
              <Typography color="error">
                Unable to load recommendations: {recommendationsError.message}
              </Typography>
            )}
            {!recommendationsLoading && !recommendationsError && recommendations?.searchResults?.length === 0 && (
              <Typography>No recommendations are available for this movie.</Typography>
            )}
            {recommendationResults.length > 0 && (
              <Box sx={{ pt: 1 }}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 0, sm: 1 }}>
                  <IconButton
                    aria-label="Previous recommendations"
                    onClick={() => setRecommendationPage((page) => page - 1)}
                    disabled={recommendationPage === 0}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Grid2 container spacing={2} sx={{ flex: 1, minWidth: 0, justifyContent: 'center' }}>
                    {visibleRecommendations.map((movie) => (
                      <Grid2
                        key={movie.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          '& .MuiCard-root': { width: '100%', maxWidth: 350 }
                        }}
                      >
                        <MediaCard
                          id={movie.id}
                          title={movie.title}
                          type="movie"
                          imagePath={movie.backdropPath ?? movie.posterPath}
                          mediaDate={movie.releaseDate}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                  <IconButton
                    aria-label="Next recommendations"
                    onClick={() => setRecommendationPage((page) => page + 1)}
                    disabled={recommendationPage >= recommendationPageCount - 1}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Stack>
                {recommendationPageCount > 1 && (
                  <Typography variant="body2" align="center" sx={{ mt: 1, color: 'text.secondary' }}>
                    {recommendationPage + 1} of {recommendationPageCount}
                  </Typography>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
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
