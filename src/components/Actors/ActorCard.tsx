import { Card, CardActionArea, CardContent, Stack, Box, Typography } from "@mui/material";
import { ActorSearchResultRecord } from "../../api-client";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../../util/constants.ts";
import {useEffect} from "react";
import {LazyCardMedia} from "../shared/LazyCardMedia.tsx";

interface ActorProps {
    actor: ActorSearchResultRecord
}

const ActorCard: React.FC<ActorProps> = ({actor})  => {

    const navigate = useNavigate();
  
    const handleNavigation = (id: number | undefined | null) => {
      navigate(`/person/${id}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <Card sx={{width: 350, height: 350}} key={actor.id} >
            <CardActionArea onClick={() => handleNavigation(actor.id)}>
            <LazyCardMedia
                height="300"
                src={
                    actor.profilePath == null ? '/no-image.jpg' :
                    defaultImagePrefix + (actor.profilePath)
                }
                fallbackSrc={'/no-image.jpg'}
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

export default ActorCard;