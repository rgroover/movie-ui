import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CircularProgress,
    Divider,
    Grid2,
    IconButton, Stack, ToggleButton, ToggleButtonGroup,
    Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MediaCard from '../shared/MediaCard.tsx';
import { defaultImagePrefix } from '../../util/constants.ts';
import ScrollToTopFab from '../shared/ScrollToTopFab.tsx';
import {useEffect, useState} from "react";
import {OpenInNew} from "@mui/icons-material";
import {searchButtonStyle} from "../../styles/SharedStyles.ts";
import {useApiClient} from "../../hooks/useApiClient.ts";
import FavoritesComponent from "../Favorites/FavoritesComponent.tsx";

const ActorDetails = () => {

  const { actorApi } = useApiClient();
  const { id } = useParams();
  const actorId = id ? parseInt(id, 10) : 0;

  const [ actorResultsMediaType, setActorResultsMediaType ] = useState("movie")

  const handleCategoryChange = (_: unknown, newType: string) => {
        if (newType !== null) {
            setActorResultsMediaType(newType);
        }
  };

  const { isLoading, error, data: actorDetails } = useQuery({
    queryKey: ['actor-detail-data', id], // The query key should be in the options object
    queryFn: async () => {
      const response = await actorApi.apiActorActorIdGet(actorId);
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
      <Box
        component="img"
        sx={{
          height: 400,
          display: 'block',          // Ensures the image behaves as a block element
          margin: '0 auto',          // Centers it horizontally
          textAlign: 'center',       // Not necessary for images but useful if there's text or child elements     
        }}
        alt={actorDetails?.name ?? ''}
        src={ actorDetails?.profilePath ? defaultImagePrefix + actorDetails?.profilePath : '/no-image.jpg'}
      />
      <Stack direction='column' spacing={0} mt={2}>
          <Stack direction='row' width='100%' justifyContent='center'>
              <Typography variant="h6">{actorDetails?.name}
              </Typography>
              <FavoritesComponent
                  sx={{pl:2, pt:0.25}}
                  mediaType='person'
                  mediaId={actorDetails?.id!}
                  title={actorDetails?.name!}
                  imageUrl={actorDetails?.profilePath!}
              />
          </Stack>
          <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="60px"
              mb={1}
          >
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
                    textAlign: 'center',
                    '&:hover': {
                        backgroundColor: '#D4AC0D'  // Add a hover color for better UX
                    }
                }}
                target="_blank"
                href={'https://www.imdb.com/name/' + actorDetails?.imdbId}
            >
                <Typography variant="body2" sx={{ marginRight: '8px' }}>IMDB</Typography>
                <OpenInNew />
            </IconButton>
          </Box>
        </Stack>
        <Accordion   sx={{
            backgroundColor: '#585858',  // Gray background from MUI's palette
            border: '1px solid white',  // Gray border color (or customize with any color)
            borderRadius: 2,              // Optional: round the corners
            overflow: 'hidden',           // To ensure the border radius applies properly
            color: 'white'
        }} >
            <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color: 'white'}} />} id='panel1-header' aria-controls='panel1-content' >
                <Typography variant="h6">Biography</Typography>
            </AccordionSummary>
            <Divider sx={{ borderColor: 'white', width: '100%' }}  />
            <AccordionDetails>
                <Typography>{actorDetails?.biography}</Typography>
            </AccordionDetails>
        </Accordion>
        <Box display="flex" justifyContent="center" paddingBlock={2}>
            <Stack direction='column' spacing={0} mt={2}>
                <ToggleButtonGroup
                    value={actorResultsMediaType}
                    exclusive
                    onChange={handleCategoryChange}
                    aria-label="Search category toggle">
                    <ToggleButton
                        value="movie"
                        aria-label="search movies"
                        sx={{
                            ...searchButtonStyle,
                            backgroundColor: actorResultsMediaType === 'movie' ? '#ffd800' : 'lightgray', // background color
                            color: actorResultsMediaType === 'movie' ? 'white' : 'gray' // text color
                        }}>Movies
                    </ToggleButton>
                    <ToggleButton
                        value="tv"
                        aria-label="search tv shows"
                        sx={{
                            ...searchButtonStyle,
                            backgroundColor: actorResultsMediaType === 'tv' ? '#ffd800' : 'lightgray', // background color
                            color: actorResultsMediaType === 'tv' ? 'white' : 'gray' // text color
                        }}>TV Shows
                    </ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="h6" sx={{ textAlign: 'center', mt:4 }}>
                    {actorResultsMediaType === 'movie' ? 'Movies' : actorResultsMediaType === 'tv' ? 'TV Shows' : ''}
                </Typography>
            </Stack>
        </Box>
            <Grid2 container spacing={2} paddingTop={1} >
                {actorDetails?.combinedCredits?.cast && actorDetails?.combinedCredits?.cast?.filter(
                    (item, index, self) =>
                        index === self.findIndex((t) => t.id === item.id && item.mediaType === `${actorResultsMediaType}`)
                )
                    .sort((a, b) => {
                        const aOrder = a.releaseDate ?? a.firstAirDate ?? ''; // Fallback to empty string
                        const bOrder = b.releaseDate ?? b.firstAirDate ?? ''; // Fallback to empty string
                        return aOrder > bOrder ? -1 : aOrder < bOrder ? 1 : 0; // Standard lexicographic comparison
                    })
                    .map ((media) => (
                        <MediaCard id={media.id}
                                   title={media.title ?? media.name}
                                   type={media.mediaType}
                                   imagePath={media.backdropPath ?? media.posterPath}
                                   mediaDate={media.releaseDate ?? undefined}
                                   character={media.character?.length === 0 ? "(unknown)" : media.character}
                                   key={media.id}
                        />
                    ))}
            </Grid2>
      <ScrollToTopFab />
    </Box>
  );
};

export default ActorDetails;
