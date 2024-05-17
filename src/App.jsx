import React from 'react';
import Login from './pages/login/login'; // Ensure correct import path and capitalization
import Register from "./pages/register/register"; // Ensure correct import path and capitalization
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
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
