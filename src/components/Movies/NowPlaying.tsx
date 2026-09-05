import TheatersIcon from '@mui/icons-material/Theaters';
import {useApiClient} from '../../hooks/useApiClient.ts';
import InfiniteMovieList from './InfiniteMovieList.tsx';

const NowPlaying = () => {
    const {getNowPlayingMovies} = useApiClient();

    return <InfiniteMovieList title="Now Playing" icon={<TheatersIcon />} queryKey="now-playing" fetchPage={getNowPlayingMovies} />;
};

export default NowPlaying;
