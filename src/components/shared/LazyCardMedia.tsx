import React, { useRef, useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import {Box, IconButton, Tooltip} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";

type LazyCardMediaProps = {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    height?: number | string;
    sx?: object;
    mediaType?: string;
};

export function LazyCardMedia({ src, alt = '', fallbackSrc, height = 200, sx, mediaType }: LazyCardMediaProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '100px' }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <Box sx={{ position: "relative" }}>
            <CardMedia
                ref={ref}
                component="img"
                height={height}
                sx={sx}
                alt={alt}
                src={isVisible ? src : undefined}
                loading="lazy"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    if (fallbackSrc) (e.target as HTMLImageElement).src = fallbackSrc;
                }}
            />
            {mediaType &&
                <Tooltip title={
                    mediaType === "movie" ? "Movie"
                    : mediaType === "tv" ? "TV Show"
                    : mediaType === "person" ? "Actor"
                    : mediaType} arrow>
                    <IconButton size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "rgba(255,255,255,0.7)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                        }}
                    >
                        {mediaType === "movie" && <TheatersIcon color="error" /> }
                        {mediaType === "tv" && <TvIcon color="error" /> }
                        {mediaType === "person" && <PersonIcon color="error" /> }
                    </IconButton>
                </Tooltip>
            }
        </Box>
    );
}
