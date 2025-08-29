import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  Landing,
  HomeLayout,
  AddRecipe,
  Admin,
  AllRecipes,
  DeleteRecipe,
  EditRecipe,
  Login,
  Profile,
  Register,
  Stats,
  Error,
} from "./pages";

import { action as registerAction } from "./pages/Register";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // this page will be shown whenever we forward to "/"
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddRecipe />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-recipes",
            element: <AllRecipes />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
