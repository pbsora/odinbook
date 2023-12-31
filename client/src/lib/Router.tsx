import Home from "@/Pages/Home";
import { useLocation, useRoutes } from "react-router-dom";
import { authLoader, loginLoader } from "./authLoader";
import NotFound from "@/Pages/NotFound";
import Feed from "@/Pages/Feed";
import Settings from "@/Pages/Settings";
import OwnProfile from "@/Pages/OwnProfile";
import UserProfile from "@/Pages/UserProfile";
import { profileLoader } from "./profileLoader";
import Post from "@/Pages/Post";
import Auth from "@/Pages/Auth";
import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";

const Routes = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Home />,
      loader: loginLoader,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Feed /> },
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

  const location = useLocation();

  if (!router) return null;

  return (
    <AnimatePresence mode="wait">
      {cloneElement(router, { key: location.pathname })}
    </AnimatePresence>
  );
};
export default Routes;
