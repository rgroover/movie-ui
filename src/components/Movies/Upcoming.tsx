import EventIcon from '@mui/icons-material/Event';
import {useApiClient} from '../../hooks/useApiClient.ts';
import InfiniteMovieList from './InfiniteMovieList.tsx';

const Upcoming = () => {
    const {getUpcomingMovies} = useApiClient();

    return <InfiniteMovieList title="Upcoming" icon={<EventIcon />} queryKey="upcoming" fetchPage={getUpcomingMovies} />;
};

export default Upcoming;
