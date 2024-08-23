import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./main.css";
import Success from "./pages/Success";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import PrivateRoute from "./components/PrivateRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Gunakan Home sebagai default route
    errorElement: <Error />, // Gunakan Error sebagai default error element
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/Home",
    element: <PrivateRoute component={Home} />,
    errorElement: <Error />,
  },
  {
    path: "/sukses",
    element: <PrivateRoute component={Success} />, // Gunakan PrivateRoute untuk halaman Sukses
    errorElement: <Error />,
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

    <RouterProvider router={router} />
  </React.StrictMode>
);
