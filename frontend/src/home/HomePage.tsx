import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import CardCarusel from "./components/CardCarusel";
import { IProductProps } from "../types";
import Loading from "../general/Loading";
import HeroSection from "./components/HeroSection";
import Footer from "../general/Footer";
import { ProductsContext } from "../contexts/productsContext";
import { NavLink } from "react-router-dom";
import ProductsTeaser from "./components/ProductsTeaser";
import ContactUsModal from "../general/ContactUsModal";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    allProducts,
    setAllProducts,
    handlePopularProducts,
    handleHotProducts,
    defaultProducts,
  } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);

  useAuth();

  const popularProducts = handlePopularProducts(allProducts);
  const hotProducts = handleHotProducts(allProducts);

  return (
    <>
      <NavBar />
      <ContactUsModal className="text-lg " content="Conatct us" />
      <HeroSection />
      <div className="mx-[5vw] ">
        {!allProducts ? (
          <Loading />
        ) : (
          <>
            <ProductsTeaser
              linkTo="pop"
              productsType={popularProducts}
              sectionName="Popular"
            />
            <ProductsTeaser
              linkTo="hot"
              productsType={hotProducts}
              sectionName="Hot"
            />
            <ProductsTeaser
              linkTo="all"
              productsType={allProducts}
              sectionName="All Products"
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
