import {useEffect, useRef, type ReactNode} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Box, Button, CircularProgress, Grid2, Typography} from '@mui/material';
import type {SearchResultsPagedModel} from '../../api-client';
import MediaCard from '../shared/MediaCard.tsx';

interface InfiniteMovieListProps {
    title: string;
    icon: ReactNode;
    queryKey: string;
    fetchPage: (page: number) => Promise<SearchResultsPagedModel>;
}

const InfiniteMovieList = ({title, icon, queryKey, fetchPage}: InfiniteMovieListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const {data, error, isLoading, isFetching, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
        queryKey: [queryKey, 'infinite'],
        queryFn: ({pageParam}) => fetchPage(pageParam),
        initialPageParam: 1,
        getNextPageParam: lastPage => {
            const page = lastPage.page ?? 1;
            return lastPage.searchResults?.length && page < (lastPage.totalPages ?? 0)
                ? page + 1 : undefined;
        },
    });

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasNextPage || isFetching || error) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect();
                void fetchNextPage();
            }
        }, {root: containerRef.current, rootMargin: '80px'});
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetching, error, fetchNextPage]);

    const movies = data?.pages.flatMap(page => page.searchResults ?? []) ?? [];

    return <>
        <Box display="flex" justifyContent="center" alignItems="center" height="40px" mt={2}>
            {icon}<Typography variant="h6" padding={2}>{title}</Typography>
        </Box>
        <Box ref={containerRef} sx={{height: '80vh', overflowY: 'auto', p: 2}}>
            <Grid2 container spacing={2}>
                {movies.map(movie => (
                    <MediaCard id={movie.id} title={movie.title} type="movie"
                               imagePath={movie.backdropPath ?? movie.posterPath}
                               mediaDate={movie.releaseDate} key={movie.id} />
                ))}
            </Grid2>
            {!isLoading && !error && movies.length === 0 &&
                <Typography align="center" sx={{mt: 2}}>No {title.toLowerCase()} movies found.</Typography>}
            {isFetching && <Box display="flex" justifyContent="center" p={2}><CircularProgress /></Box>}
            {error && <Box textAlign="center" p={2}>
                <Typography role="alert">Unable to load movies: {error.message}</Typography>
                <Button onClick={() => data ? fetchNextPage() : refetch()} disabled={isFetching}>Retry</Button>
            </Box>}
            <Box ref={sentinelRef} sx={{height: 1}} />
        </Box>
    </>;
};

export default InfiniteMovieList;
