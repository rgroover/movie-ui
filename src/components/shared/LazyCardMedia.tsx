import React, { useRef, useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';

type LazyCardMediaProps = {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    height?: number | string;
    sx?: object;
};

export function LazyCardMedia({ src, alt = '', fallbackSrc, height = 200, sx }: LazyCardMediaProps) {
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
    );
}
