import { createBrowserRouter, RouterProvider } from "react-router-dom"
import About from "../components/About";
import MovieDetails from "../components/Movies/MovieDetails.tsx";
import ActorDetails from "../components/Actors/ActorDetails.tsx";
import Search from "../components/Search";
import Layout from "../components/shared/Layout.tsx";
import TvShowDetails from "../components/TvShows/TvShowDetails.tsx";
import PopularActors from "../components/Popular/PopularActors.tsx";
import PopularMovies from "../components/Popular/PopularMovies.tsx";
import PopularTv from "../components/Popular/PopularTv.tsx";
import TrendingActors from "../components/Trending/TrendingActors.tsx";
import TrendingMovies from "../components/Trending/TrendingMovies.tsx";
import TrendingTv from "../components/Trending/TrendingTv.tsx";
import TvShowSeasonDetails from "../components/TvShows/TvShowSeasonDetails.tsx";
import TvShowEpisodeDetails from "../components/TvShows/TvShowEpisodeDetails.tsx";
import FavoritesPage from "../components/Favorites/FavoritesPage.tsx";
import Callback from "../components/Callback.tsx";
import MovieSearch from "../components/search/MovieSearch.tsx";


const MyRouter = () => {
  const router = createBrowserRouter(
      [
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Search />,
            },
            {
              path: '/about',
              element: <About />,
            },
            {
              path: '/movie/:id',
              element: <MovieDetails />,
            },
            {
              path: '/person/:id',
              element: <ActorDetails />,
            },
            {
              path: '/tv/:id',
              element: <TvShowDetails />,
            },
            {
              path: '/popular/actors',
              element: <PopularActors />,
            },
            {
              path: '/popular/movies',
              element: <PopularMovies />,
            },
            {
              path: '/popular/tv',
              element: <PopularTv />,
            },
            {
              path: '/trending/actors',
              element: <TrendingActors />,
            },
            {
              path: '/trending/movies',
              element: <TrendingMovies />,
            },
            {
              path: '/trending/tv',
              element: <TrendingTv />,
            },
            {
              path: '/tvseason',
              element: <TvShowSeasonDetails />,
            },
            {
              path: '/tvepisode',
              element: <TvShowEpisodeDetails />,
            },
            {
              path: '/favorites',
              element: <FavoritesPage />,
            },
            {
              path: '/callback',
              element: <Callback />,
            },
            {
              path: '/movie-search/:query',
              element: <MovieSearch/>,

            }
          ],
        },
      ]
  );

  return <RouterProvider router={router} />;
};

export default MyRouter;