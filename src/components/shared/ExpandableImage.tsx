import {Box, Modal} from '@mui/material';
import {useState} from 'react';

interface ExpandableImageProps {
    src: string;
    expandedSrc?: string;
    alt: string;
}

const ExpandableImage = ({src, expandedSrc = src, alt}: ExpandableImageProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <Box
                component="button"
                type="button"
                onClick={() => setExpanded(true)}
                aria-label={`Enlarge ${alt}`}
                sx={{
                    display: 'block',
                    width: 'fit-content',
                    padding: 0,
                    border: 0,
                    borderRadius: 0,
                    background: 'none',
                    cursor: 'zoom-in',
                    lineHeight: 0,
                    '&:focus-visible': {
                        outline: '3px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: 3,
                    },
                }}
            >
                <Box
                    component="img"
                    sx={{height: 410, maxWidth: 280, objectFit: 'contain'}}
                    alt={alt}
                    src={src}
                />
            </Box>

            <Modal
                open={expanded}
                onClose={() => setExpanded(false)}
                aria-label={`Enlarged ${alt}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: {xs: 1, sm: 2},
                    cursor: 'zoom-out',
                }}
                slotProps={{
                    backdrop: {
                        sx: {backgroundColor: 'rgba(0, 0, 0, 0.92)'},
                    },
                }}
            >
                <Box
                    component="img"
                    onClick={() => setExpanded(false)}
                    alt={alt}
                    src={expandedSrc}
                    sx={{
                        display: 'block',
                        maxWidth: {xs: 'calc(100vw - 16px)', sm: 'calc(100vw - 32px)'},
                        maxHeight: {xs: 'calc(100dvh - 16px)', sm: 'calc(100dvh - 32px)'},
                        width: 'auto',
                        height: {xs: 'calc(100dvh - 16px)', sm: 'calc(100dvh - 32px)'},
                        objectFit: 'contain',
                        cursor: 'zoom-out',
                        outline: 'none',
                    }}
                />
            </Modal>
        </>
    );
};

export default ExpandableImage;
