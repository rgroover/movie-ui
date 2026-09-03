import {useEffect, useMemo, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import {
    Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider,
    FormControl, IconButton, MenuItem, Rating, Select, Stack, Typography
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {Review, useApiClient} from '../../hooks/useApiClient.ts';

interface ReviewsDialogProps {
    open: boolean;
    onClose: () => void;
    mediaId: number;
    mediaType: 'movie' | 'tv';
    title: string;
}

const starCount = (review: Review) => {
    const rating = review.authorDetails?.rating;
    return rating == null ? null : Math.round(rating / 2);
};

const ReviewsDialog = ({open, onClose, mediaId, mediaType, title}: ReviewsDialogProps) => {
    const {getReviews} = useApiClient();
    const [page, setPage] = useState(1);
    const [starFilter, setStarFilter] = useState<'all' | 'unrated' | number>('all');

    useEffect(() => {
        if (open) {
            setPage(1);
            setStarFilter('all');
        }
    }, [open, mediaId, mediaType]);

    const {data, error, isLoading, isFetching} = useQuery({
        queryKey: ['reviews', mediaType, mediaId, page],
        queryFn: () => getReviews(mediaType, mediaId, page),
        enabled: open && mediaId > 0
    });

    const visibleReviews = useMemo(() => data?.results.filter((review) =>
        starFilter === 'all' || (starFilter === 'unrated' ? starCount(review) === null : starCount(review) === starFilter)
    ) ?? [], [data?.results, starFilter]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" aria-labelledby="reviews-dialog-title">
            <DialogTitle id="reviews-dialog-title" sx={{pr: 7}}>
                Reviews for {title}
                <IconButton aria-label="Close reviews" onClick={onClose} sx={{position: 'absolute', right: 8, top: 8}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Stack direction={{xs: 'column', sm: 'row'}} alignItems={{sm: 'center'}} justifyContent="space-between" spacing={2} sx={{mb: 2}}>
                    <Typography variant="body2">
                        {data ? `${data.totalResults} review${data.totalResults === 1 ? '' : 's'}` : 'Loading reviews'}
                    </Typography>
                    <FormControl size="small" sx={{minWidth: 180}}>
                        <Select value={starFilter} onChange={(event) => setStarFilter(event.target.value as typeof starFilter)} inputProps={{'aria-label': 'Filter reviews by stars'}}>
                            <MenuItem value="all">All ratings</MenuItem>
                            {[1, 2, 3, 4, 5].map((stars) => <MenuItem key={stars} value={stars}>{stars} star{stars === 1 ? '' : 's'}</MenuItem>)}
                            <MenuItem value="unrated">No star rating</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                {isLoading && <Box display="flex" justifyContent="center" py={5}><CircularProgress /></Box>}
                {error && <Typography color="error">Unable to load reviews: {error.message}</Typography>}
                {!isLoading && !error && visibleReviews.length === 0 && <Typography>No reviews match this filter on this page.</Typography>}
                {visibleReviews.map((review, index) => {
                    const stars = starCount(review);
                    const author = review.authorDetails?.name || review.authorDetails?.username || review.author;
                    return <Box key={review.id} sx={{py: 2}}>
                        {index > 0 && <Divider sx={{mb: 2}} />}
                        <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" spacing={1}>
                            <Box>
                                <Typography fontWeight="bold">{author}</Typography>
                                <Typography variant="body2" color="text.secondary">{new Date(review.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                            {stars === null ? <Typography variant="body2" color="text.secondary">No rating</Typography> :
                                <Rating value={stars} readOnly precision={1} emptyIcon={<StarIcon style={{opacity: 0.35}} fontSize="inherit" />} />}
                        </Stack>
                        <Typography sx={{whiteSpace: 'pre-line', mt: 1.5}}>{review.content}</Typography>
                        {review.url && <Button component="a" href={review.url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />} size="small" sx={{mt: 1}}>View on TMDB</Button>}
                    </Box>;
                })}
                {data && data.totalPages > 1 && <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{pt: 2}}>
                    <Button disabled={page === 1 || isFetching} onClick={() => setPage(page - 1)}>Previous</Button>
                    <Typography variant="body2">Page {page} of {data.totalPages}</Typography>
                    <Button disabled={page >= data.totalPages || isFetching} onClick={() => setPage(page + 1)}>Next</Button>
                </Stack>}
            </DialogContent>
        </Dialog>
    );
};

export default ReviewsDialog;
