import { Card, CardActionArea, CardMedia, CardContent, Stack, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { defaultImagePrefix } from "../../util/constants.ts";

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
        <Card sx={{width: 350, height: character ? 320 : 290}}  >
            <CardActionArea onClick={() =>  navigate(`/${type}/${id}`)}>
            <CardMedia
                component="img"
                height="210"
                image={
                    imagePath == null ? '/no-image.jpg' :
                    defaultImagePrefix + imagePath
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
                        {title}
                        </Typography>
                        <Typography gutterBottom  
                            sx={{
                            whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                            overflow: 'hidden',         // Hides the overflowed text
                            textOverflow: 'ellipsis',   // Shows the ellipsis (...) for overflowed text
                        }}>
                        {mediaDate?.substring(0,4)}
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