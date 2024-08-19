import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./main.css";
import Success from "./pages/Success";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { NavbarComponents } from "./components";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/sukses",
    element: <Success />,
    errorElement: <Error />,
  },
  {
    path: "*", // Tangani semua rute yang tidak ditemukan
    element: <Error />,
  },
  {
    path: "/login", 
    element: <Login />,
  },
  {
    path: "/register", 
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavbarComponents />
    <RouterProvider router={router} />
  </React.StrictMode>
);
