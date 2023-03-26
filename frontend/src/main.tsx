import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home/HomePage";
import "./index.css";
import ErrorPage from "./general/ErrorPage";
import ProductPage from "./product/ProductPage";
import UserPage from "./user/UserPage";
import LoginPage from "./login/LoginPage";
import UserProvider from "./contexts/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:userId",
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
