import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  Landing,
  HomeLayout,
  AddRecipe,
  Admin,
  AllRecipes,
  EditRecipe,
  Login,
  Profile,
  Register,
  Stats,
  Error,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addRecipeAction } from "./pages/AddRecipe";
import { loader as recipeLoader } from "./pages/AllRecipes";
import { action as editRecipeAction } from "./pages/EditRecipe";
import { loader as editRecipeLoader } from "./pages/EditRecipe";
import { action as deleteRecipeAction } from "./pages/DeleteRecipe";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";

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
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddRecipe />,
            action: addRecipeAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-recipes",
            element: <AllRecipes />,
            loader: recipeLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-recipe/:id",
            element: <EditRecipe />,
            loader: editRecipeLoader,
            action: editRecipeAction,
          },
          {
            path: "delete-recipe/:id",
            action: deleteRecipeAction,
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
