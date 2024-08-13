import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
