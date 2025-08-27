import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import FilmDetails from "./pages/FilmDetails";
import { FavoriteProvider } from "./components/context/FavoriteContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/WatchList", element: <WatchList /> },
      { path: "/FilmDetails/:id", element: <FilmDetails /> },
    ],
  },
]);

export default function App() {
  return (
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
  );
}
