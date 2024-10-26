import { Card, CardActionArea, CardMedia, CardContent, Stack, Box, Typography } from "@mui/material";
import { ActorCast } from "../api-client";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../util/constants";

interface ActorCastProps {
    mediaInfo: ActorCast
}

const MediaCard: React.FC<ActorCastProps> = ({mediaInfo})  => {

    const navigate = useNavigate();
  
    const handleNavigation = (id: number | undefined | null) => {
      navigate(`/movie/${id}`);
    };
    
    return (
        <Card sx={{width: 350, height: mediaInfo.character == null ? 290 : 320}}  >
            <CardActionArea onClick={() => handleNavigation(mediaInfo.id)}>
            <CardMedia
                component="img"
                height="210"
                image={
                    (mediaInfo.backdropPath ?? mediaInfo.posterPath) == null ? '/no-image.jpg' :
                    defaultImagePrefix + (mediaInfo.backdropPath ?? mediaInfo.posterPath)
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
                        {mediaInfo.title ?? mediaInfo.name}
                        </Typography>
                        <Typography gutterBottom  
                            sx={{
                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                            overflow: 'hidden',         // Hides the overflowed text
                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                        }}>
                        {mediaInfo.releaseDate?.substring(0,4) ?? mediaInfo.firstAirDate?.substring(0,4)}
                        </Typography>
                        <Typography gutterBottom
                                    sx={{
                                        whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                                        overflow: 'hidden',         // Hides the overflowed text
                                        textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                                    }}>
                            {mediaInfo.character}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default MediaCard;