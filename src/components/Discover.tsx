import {useEffect, useMemo, useRef, useState} from 'react';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {
    Alert, Autocomplete, Box, Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem,
    Select, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import MediaCard from './shared/MediaCard.tsx';
import ScrollToTopFab from './shared/ScrollToTopFab.tsx';
import {DiscoveryMediaType, useApiClient, WatchProvider} from '../hooks/useApiClient.ts';

const genres = [
    [28, 'Action'], [12, 'Adventure'], [16, 'Animation'], [35, 'Comedy'], [80, 'Crime'], [99, 'Documentary'],
    [18, 'Drama'], [10751, 'Family'], [14, 'Fantasy'], [36, 'History'], [27, 'Horror'], [10402, 'Music'],
    [9648, 'Mystery'], [10749, 'Romance'], [878, 'Science Fiction'], [10770, 'TV Movie'], [53, 'Thriller'], [10752, 'War']
] as const;

const tvGenres = [
    [10759, 'Action & Adventure'], [16, 'Animation'], [35, 'Comedy'], [80, 'Crime'], [99, 'Documentary'],
    [18, 'Drama'], [10751, 'Family'], [10762, 'Kids'], [9648, 'Mystery'], [10763, 'News'], [10764, 'Reality'],
    [10765, 'Sci-Fi & Fantasy'], [10766, 'Soap'], [10767, 'Talk'], [10768, 'War & Politics'], [37, 'Western']
] as const;

const Discover = () => {
    const {discover, getWatchProviders} = useApiClient();
    const [mediaType, setMediaType] = useState<DiscoveryMediaType>('movie');
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<WatchProvider[]>([]);
    const region = 'US';
    const [minStars, setMinStars] = useState(0);
    const [year, setYear] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const containerRef = useRef<HTMLDivElement>(null);
    const availableGenres = mediaType === 'movie' ? genres : tvGenres;

    useEffect(() => {
        setSelectedGenres([]);
        setSelectedProviders([]);
        setSortBy('popularity.desc');
    }, [mediaType]);

    const {data: providers = [], isLoading: providersLoading} = useQuery({
        queryKey: ['watch-providers', mediaType, region],
        queryFn: () => getWatchProviders(mediaType, region),
    });

    const filters = useMemo(() => ({
        genreIds: selectedGenres.length ? selectedGenres.join(',') : undefined,
        providerIds: selectedProviders.length ? selectedProviders.map(provider => provider.providerId).join('|') : undefined,
        region,
        // TMDB stores ratings on a ten-point scale; the UI follows the site's five-star display.
        minRating: minStars ? minStars * 2 : undefined,
        year: year ?? undefined,
        sortBy,
    }), [mediaType, minStars, region, selectedGenres, selectedProviders, sortBy, year]);

    const {data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['discover', mediaType, filters],
        queryFn: ({pageParam}) => discover(mediaType, filters, pageParam),
        initialPageParam: 1,
        getNextPageParam: last => last.page < last.totalPages ? last.page + 1 : undefined,
    });

    const onScroll = () => {
        const element = containerRef.current;
        if (element && element.scrollTop + element.clientHeight >= element.scrollHeight - 80 && hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
        }
    };

    return <Box sx={{p: 2}}>
        <Typography variant="h5" gutterBottom>What can I watch tonight?</Typography>
        <Typography color="text.secondary" sx={{mb: 2}}>Find a movie or series that matches your mood and streaming services.</Typography>
        <Stack spacing={2} sx={{maxWidth: 1100}}>
            <ToggleButtonGroup exclusive value={mediaType} onChange={(_, value) => value && setMediaType(value)} size="small"
                               sx={{
                                   '& .MuiToggleButton-root': {
                                       borderColor: 'rgba(255, 255, 255, 0.45)',
                                       color: 'text.primary',
                                       fontWeight: 600,
                                       px: 3,
                                   },
                                   '& .MuiToggleButton-root.Mui-selected': {
                                       bgcolor: 'primary.main',
                                       color: 'primary.contrastText',
                                       boxShadow: 2,
                                   },
                                   '& .MuiToggleButton-root.Mui-selected:hover': {
                                       bgcolor: 'primary.dark',
                                   },
                               }}>
                <ToggleButton value="movie">Movies</ToggleButton>
                <ToggleButton value="tv">TV shows</ToggleButton>
            </ToggleButtonGroup>
            <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                <Autocomplete multiple options={availableGenres as unknown as [number, string][]} value={availableGenres.filter(([id]) => selectedGenres.includes(id)) as [number, string][]}
                              onChange={(_, values) => setSelectedGenres(values.map(([id]) => id))} getOptionLabel={([, name]) => name}
                              renderInput={params => <TextField {...params} label="Genres" />} sx={{minWidth: 240}} />
                <Autocomplete multiple options={providers} loading={providersLoading} value={selectedProviders}
                              onChange={(_, values) => setSelectedProviders(values)} getOptionLabel={provider => provider.providerName}
                              renderInput={params => <TextField {...params} label="Streaming services" />} sx={{minWidth: 280}} />
                <FormControl sx={{minWidth: 190}}><InputLabel>Sort by</InputLabel><Select label="Sort by" value={sortBy} onChange={event => setSortBy(event.target.value)}>
                    <MenuItem value="popularity.desc">Popularity</MenuItem><MenuItem value="vote_average.desc">Highest rated</MenuItem>
                    <MenuItem value={mediaType === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc'}>Newest</MenuItem>
                </Select></FormControl>
            </Stack>
            <Stack direction={{xs: 'column', md: 'row'}} spacing={3} alignItems={{md: 'center'}}>
                <Box sx={{width: 230}}><Typography variant="body2">Minimum rating: {minStars ? `${minStars.toFixed(1)} / 5 stars` : 'Any'}</Typography><Slider value={minStars} onChange={(_, value) => setMinStars(value as number)} min={0} max={5} step={0.5} /></Box>
                <TextField label="Release year" type="number" value={year ?? ''} onChange={event => setYear(event.target.value ? Number(event.target.value) : null)} sx={{width: 160}} />
                <Button onClick={() => { setSelectedGenres([]); setSelectedProviders([]); setMinStars(0); setYear(null); setSortBy('popularity.desc'); }}>Clear filters</Button>
            </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>Streaming availability supplied by JustWatch via TMDB.</Typography>
        {error && <Alert severity="error" sx={{mt: 2}}>Could not load discovery results. Please try again.</Alert>}
        {isLoading ? <Box sx={{display: 'flex', justifyContent: 'center', pt: 8}}><CircularProgress /></Box> :
            <Grid2 container spacing={2} sx={{pt: 2, height: '62vh', overflowY: 'auto'}} ref={containerRef} onScroll={onScroll}>
                {data?.pages.flatMap(page => page.results).map(item => <Box key={item.id}>
                    <MediaCard id={item.id} title={item.title ?? item.name} type={mediaType} imagePath={item.backdropPath ?? item.posterPath} mediaDate={item.releaseDate ?? item.firstAirDate} />
                </Box>)}
                {isFetchingNextPage && <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', p: 2}}><CircularProgress size={28} /></Box>}
            </Grid2>}
        <ScrollToTopFab />
    </Box>;
};

export default Discover;
