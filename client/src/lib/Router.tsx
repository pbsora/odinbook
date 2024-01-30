import Home from "@/Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { authLoader, loginLoader } from "./authLoader";
import NotFound from "@/Pages/NotFound";
import Auth from "@/Pages/Auth";
import Discover from "@/Pages/Discover";
import Feed from "@/Pages/Feed";
import OwnProfile from "@/Pages/OwnProfile";
import Post from "@/Pages/Post";
import UserProfile from "@/Pages/UserProfile";
import Settings from "@/Pages/Settings";
import { profileLoader } from "./profileLoader";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: loginLoader,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/discover", element: <Discover /> },
        {
          path: "/u/settings",
          element: <Settings />,
        },
        { path: "/u/profile", element: <OwnProfile /> },
        {
          path: "/u/:user_id",
          element: <UserProfile />,
          loader: profileLoader,
        },
        { path: "/post/:post_id", element: <Post /> },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      loader: authLoader,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
