import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home.tsx";
import Auth from "./Pages/Auth.tsx";
import { authLoader } from "./lib/authLoader.tsx";

axios.defaults.baseURL = "http://localhost:5000/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
    loader: authLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
