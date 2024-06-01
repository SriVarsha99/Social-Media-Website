import React from 'react';
import Login from './pages/login/login'; // Ensure correct import path and capitalization
import Register from "./pages/register/register"; // Ensure correct import path and capitalization
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Login />,
    },
    {
      path: "/login",
      element: <Login />, // Capitalized component
    },
    {
      path: "/register",
      element: <Register />, // Capitalized component
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/Home/:user_id",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
