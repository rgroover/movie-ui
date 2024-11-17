import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid2,
  IconButton,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import { movieApi } from '../api-client/api-client-factory';
import { defaultImagePrefix } from '../util/constants';
import { OpenInNew } from '@mui/icons-material';
import {useEffect} from "react";
import WatchGuide from "./WatchGuide.tsx";

const MovieDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = id ? parseInt(id, 10) : 0;

  const { isLoading, error, data } = useQuery({
    queryKey: ['movie-detail-data', id], // The query key should be in the options object
    queryFn: async () => {
      const response = await movieApi.apiMovieExternalIdGet(itemId);
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
              src={data?.movieDetails?.posterPath ? defaultImagePrefix + data?.movieDetails?.posterPath : '/no-image.jpg'}
            />
            <Box paddingTop={2}>
              <Typography variant='h5'>{data?.movieDetails?.originalTitle} ({data?.movieDetails?.releaseDate?.substring(0,4)})</Typography>
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
                      <Chip id={`${cast.id}`}
                            sx={{color: 'white', height: 80, backgroundColor: '#585858', '& .MuiChip-avatar': {
                                height: 70,
                                width: 70,
                              }}} variant="outlined"
                      label={
                        <Typography variant="body2" sx={{ whiteSpace: 'normal', lineHeight: 2.0, pl:2 }}>
                          {cast.character?.length === 0 ? "(unknown)" : cast.character} <br/>
                          {cast.name}
                      </Typography>}
                      avatar={<Avatar alt={`${cast.name}`} src={`${defaultImagePrefix}${cast.profilePath}`}/>}
                      onClick={() => handleClick(cast.id)}
                      key={cast.id}
                    />
                  ))}
          </Grid2>
        </Stack>
      </Box>
    </Box>
  );
}

export default MovieDetails;
