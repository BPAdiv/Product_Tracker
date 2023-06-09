import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home/HomePage";
import "./index.css";
import ErrorPage from "./general/ErrorPage";
import ProductPage from "./product/ProductPage";
import UserPage from "./user/UserPage";
// import UserHome from "./user/UserPage";
import LoginPage from "./login/LoginPage";
import UserProvider from "./contexts/userContext";
import UserHome from "./user/UserHome";
import FollowProductPage from "./followProduct/FollowProductPage";
import AllProductsPage from "./productsPages/AllProductsPage";
import ProductsContextProvider, {
  ProductsContext,
} from "./contexts/productsContext";
import GetStartedPage from "./about/GetStartedPage";
import TourGuideProvider from "./contexts/tourGuideContext";

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
    path: "/product/:productAsin",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/tracks",
    element: <UserHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addProduct",
    element: <FollowProductPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/products",
    element: <AllProductsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/getStarted",
    element: <GetStartedPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsContextProvider>
        <TourGuideProvider>
          <RouterProvider router={router} />
        </TourGuideProvider>
      </ProductsContextProvider>
    </UserProvider>
  </React.StrictMode>
);
