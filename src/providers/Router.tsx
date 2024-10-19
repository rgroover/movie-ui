import { createBrowserRouter, RouterProvider } from "react-router-dom"
import About from "../components/About";
import MovieDetails from "../components/MovieDetails";
import ActorDetails from "../components/ActorDetails";
import Search from "../components/Search";
import Layout from "../components/Layout";

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
          path: '/details/:id',
          element: <MovieDetails />,
        },
        {
          path: '/actors/:id',
          element: <ActorDetails />,
        },
      ],
    },
  ]);
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;