import { Card, CardActionArea, CardMedia, CardContent, Stack, Box, Typography } from "@mui/material";
import { ActorSearchResultRecord } from "../api-client";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../util/constants";
import {useEffect} from "react";

interface ActorProps {
    actor: ActorSearchResultRecord
}

const MovieCard: React.FC<ActorProps> = ({actor})  => {

    const navigate = useNavigate();
  
    const handleNavigation = (id: number | undefined | null) => {
      navigate(`/actor/${id}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <Card sx={{width: 350, height: 350}} key={actor.id} >
            <CardActionArea onClick={() => handleNavigation(actor.id)}>
            <CardMedia
                component="img"
                height="300"
                image={
                    actor.profilePath == null ? '/no-image.jpg' :
                    defaultImagePrefix + (actor.profilePath)
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
                        {actor.name}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default MovieCard;