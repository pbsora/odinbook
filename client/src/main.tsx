import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home.tsx";
import Auth from "./Pages/Auth.tsx";
import Feed from "./Pages/Feed.tsx";
import Settings from "./Pages/Settings.tsx";

import { authLoader, loginLoader } from "./lib/authLoader.tsx";
import { profileLoader } from "./lib/profileLoader.tsx";
import OwnProfile from "./Pages/OwnProfile.tsx";
import UserProfile from "./Pages/UserProfile.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Post from "./Pages/Post.tsx";
import Discover from "./Pages/Discover.tsx";

const queryClient = new QueryClient();

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
      { path: "/u/:user_id", element: <UserProfile />, loader: profileLoader },
      { path: "/post/:post_id", element: <Post /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    loader: authLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
