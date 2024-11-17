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

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Use Layout as the main layout
      children: [
        {
          index: true, // This will render <Search /> when the path is '/'
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
          path: '/actor/:id',
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
      ],
    },
  ]);
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;