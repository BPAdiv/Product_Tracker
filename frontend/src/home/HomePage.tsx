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
import Joyride, { Step } from "react-joyride";

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
  // const steps: Step[] = [
  //   {
  //     content: "Welcom to Bargain Hive",
  //     // locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //     // placement: "center",
  //     target: "body",
  //   },
  //   {
  //     content: <h2>Let's begin our journey!</h2>,
  //     // locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //     // placement: "center",
  //     target: ".step-2",
  //   },
  //   {
  //     content: <h2>Let's begin our journey!</h2>,
  //     // locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //     placement: "center",
  //     target: ".step-1",
  //   },
  // ];
  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      title: <h1>Welcom to Bargain Hive</h1>,
      locale: { next: "Take Tour" },

      content: <h2>Would you like to take to tour?</h2>,
    },
    {
      target: "body",
      placement: "center",
      title: <h1>Home Page</h1>,
      // locale: { next: "Take Tour" },

      content: (
        <h2>
          This is the home page where you can see the top products people are
          watching
        </h2>
      ),
    },
    {
      target: ".pop",
      title: "Pop Section",
      placement: "top",
      content:
        "Here you can see the top products people are watching and more...",
    },
    {
      target: ".step-2",
      title: "Start Page",
      // placement: "bottom",
      content:
        "Now that I got your attention you click here to see how to get started ",
      styles: { options: { zIndex: 100000000 } },
    },

    {
      target: ".step-2",
      title: "Step 2",
      content: "This is the second step.",
    },
  ];
  return (
    <>
      <NavBar />
      <Joyride
        steps={steps}
        continuous
        showSkipButton

        // stepIndex={currentStep}
        // callback={() => setCurrentStep(-1)}
      />
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
