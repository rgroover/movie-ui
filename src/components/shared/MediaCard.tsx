import { Card, CardActionArea, CardContent, Stack, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../../util/constants.ts";
import {LazyCardMedia} from "./LazyCardMedia.tsx";

interface MediaProps {
    id: number | null | undefined;
    imagePath: string | null | undefined;
    title: string | null | undefined;
    type: string | null | undefined;
    mediaDate: string | null | undefined;
    character?: string | null | undefined;
}

const MediaCard: React.FC<MediaProps> =
    ({id, imagePath, title, type, mediaDate, character})  => {

    const navigate = useNavigate();
    
    return (
        <Card sx={{width: 350, height: character && mediaDate ? 320 : 295}}  >
            <CardActionArea onClick={() =>  navigate(`/${type}/${id}`)}>
            <LazyCardMedia
                height="210"
                src={
                    imagePath == null ? '/no-image.jpg' :
                    defaultImagePrefix + imagePath
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
                        {title}
                        </Typography>
                        <Typography gutterBottom  
                            sx={{
                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                            overflow: 'hidden',         // Hides the overflowed text
                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                        }}>
                        {mediaDate}
                        </Typography>
                        <Typography gutterBottom
                                    sx={{
                                        whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                                        overflow: 'hidden',         // Hides the overflowed text
                                        textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                                    }}>
                            {character}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default MediaCard;