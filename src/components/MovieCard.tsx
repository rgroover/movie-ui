import { Card, CardActionArea, CardMedia, CardContent, Stack, Box, Typography } from "@mui/material";
import { ActorCast } from "../api-client";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../util/constants";

interface ActorCastProps {
    movie: ActorCast
}

const MovieCard: React.FC<ActorCastProps> = ({movie})  => {

    const navigate = useNavigate();
  
    const handleNavigation = (id: number | undefined | null) => {
      navigate(`/details/${id}`);
    };
    
    return (
        <Card sx={{width: 350, height: movie.character == null ? 290 : 320}} key={movie.id} >
            <CardActionArea onClick={() => handleNavigation(movie.id)}>
            <CardMedia
                component="img"
                height="210"
                image={
                    (movie.backdropPath ?? movie.posterPath) == null ? '/no-image.jpg' :
                    defaultImagePrefix + (movie.backdropPath ?? movie.posterPath)
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
                        {movie.title}
                        </Typography>
                        <Typography gutterBottom  
                            sx={{
                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                            overflow: 'hidden',         // Hides the overflowed text
                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                        }}>
                        {movie.releaseDate?.substring(0,4)}
                        </Typography>
                        <Typography gutterBottom 
                            sx={{
                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                            overflow: 'hidden',         // Hides the overflowed text
                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                        }}>
                        {movie.character}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default MovieCard;