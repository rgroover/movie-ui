import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Divider, Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MovieCard from './MovieCard';
import { actorApi } from '../api-client/api-client-factory';
import { defaultImagePrefix } from '../util/constants';


const ActorDetails = () => {

  const { id } = useParams();
  const actorId = id ? parseInt(id, 10) : 0;

  const { isLoading, error, data } = useQuery({
    queryKey: ['actor-detail-data', id], // The query key should be in the options object
    queryFn: async () => {
      const response = await actorApi.apiActorActorIdGet(actorId);
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
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }} padding={2}>
      <Box
        component="img"
        sx={{
          height: 300,
          display: 'block',          // Ensures the image behaves as a block element
          margin: '0 auto',          // Centers it horizontally
          textAlign: 'center',       // Not necessary for images but useful if there's text or child elements     
        }}
        alt={data?.name ?? ''}
        src={ data?.profilePath ? defaultImagePrefix + data?.profilePath : '/no-image.jpg'}
      />
      <Typography variant="h6"
              sx={{
                display: 'block',          // Ensures the image behaves as a block element
                margin: '0 auto',          // Centers it horizontally
                textAlign: 'center',       // Not necessary for images but useful if there's text or child elements     
              }}>{data?.name}</Typography>
        <Accordion   sx={{
            backgroundColor: '#242424',  // Gray background from MUI's palette
            border: '1px solid white',  // Gray border color (or customize with any color)
            borderRadius: 2,              // Optional: round the corners
            overflow: 'hidden',           // To ensure the border radius applies properly
            color: 'white'
          }} >
          <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color: 'white'}} />} id='panel1-header' aria-controls='panel1-content' >
            <Typography>Biography</Typography>
          </AccordionSummary>
          <Divider sx={{ borderColor: 'white', width: '100%' }}  />
          <AccordionDetails>
            <Typography>{data?.biography}</Typography>
          </AccordionDetails>
        </Accordion>
      <Grid2 container spacing={2} paddingTop={2} >
          {data?.combinedCredits?.cast?.filter(movie =>   
               movie.mediaType === 'movie')
              .sort((a, b) => {
                const aOrder = a.releaseDate ?? ''; // Fallback to empty string
                const bOrder = b.releaseDate ?? ''; // Fallback to empty string
                return aOrder > bOrder ? -1 : aOrder < bOrder ? 1 : 0; // Standard lexicographic comparison
              })
              .map ((movie) => (
                <MovieCard movie={movie} />
              ))}
      </Grid2>
    </Box>
  );
};

export default ActorDetails;
