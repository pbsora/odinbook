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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loginLoader,
    children: [
      { path: "/", element: <Feed /> },
      {
        path: "/u/settings",
        element: <Settings />,
      },
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
