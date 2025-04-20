import {useEffect, useRef, useState} from "react";
import {Avatar} from "@mui/material";

type LazyAvatarProps = {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    sx?: object;
};

const LazyAvatar = ({ src, alt = '', fallbackSrc, sx }: LazyAvatarProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
        <div ref={ref}>
            <Avatar
                src={isVisible ? src : undefined}
                alt={alt}
                sx={{ borderRadius: '50%', width: 65, height: 65, ml:1, ...sx }}
                imgProps={{
                    loading: 'lazy',
                    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                        if (fallbackSrc) (e.target as HTMLImageElement).src = fallbackSrc;
                    }
                }}
            />
        </div>
    );
};

export default LazyAvatar