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
import { NavLink, useNavigate } from "react-router-dom";
import ProductsTeaser from "./components/ProductsTeaser";
import ContactUsModal from "../general/ContactUsModal";
import Joyride, { CallBackProps, Step } from "react-joyride";
import TourGuideProvider, {
  TourGuideContext,
} from "../contexts/tourGuideContext";
import Cookies from "universal-cookie";

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
  const cookies = new Cookies();
  const { homeTour, setHomeTour } = useContext(TourGuideContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("usedHomeTour"))
      return setHomeTour({ ...homeTour, run: true });
    const usedHomeTour = cookies.get("usedHomeTour");
    if (usedHomeTour) {
      setHomeTour({ ...homeTour, run: false });
    } else {
      setHomeTour({ ...homeTour, run: true });
    }
  }, []);

  const handleCallback = (data: CallBackProps) => {
    const { action, index, lifecycle, type } = data;

    console.log(data);
    if (action === "close" || action === "skip") {
      setHomeTour({ ...homeTour, run: false, tourActive: false });
      cookies.set("usedHomeTour", true);
      return;
    }
    if (type === "step:after" && index === 0 /* or step.target === '#home' */) {
      console.log(data);
      setHomeTour({ ...homeTour, stepIndex: 1 });
    } else if (type === "step:after" && index === 1) {
      console.log(data);
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 2 });
      } else {
        setHomeTour({ ...homeTour, stepIndex: 0 });
      }
    } else if (type === "step:after" && index === 2) {
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 3 });
      } else {
        setHomeTour({ ...homeTour, stepIndex: 1 });
      }
    } else if (type === "step:after" && index === 3) {
      console.log("step-3", data);
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 4 });
      } else {
        setHomeTour({ ...homeTour, stepIndex: 2 });
      }
    } else if (type === "step:after" && index === 4) {
      console.log("this is step to navigatye", data);
      if (action === "next") {
        setHomeTour({ ...homeTour, run: false, stepIndex: 5 });
        navigate("/getstarted");
      } else {
        setHomeTour({ ...homeTour, stepIndex: 3 });
      }
    } else if (type === "step:after" && index === 5) {
      console.log(data);
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 6 });
      } else {
        navigate("/");
        setHomeTour({ ...homeTour, stepIndex: 4 });
      }
    } else if (type === "step:after" && index === 6) {
      console.log(data);
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 7 });
      } else {
        setHomeTour({ ...homeTour, stepIndex: 5 });
      }
    } else if (type === "step:after" && index === 7) {
      console.log(data);
      if (action === "next") {
        setHomeTour({ ...homeTour, stepIndex: 8 });
      } else {
        setHomeTour({ ...homeTour, stepIndex: 6 });
      }
    } else if (type === "step:after" && index === 8) {
      console.log(data);
      if (action === "prev") {
        setHomeTour({ ...homeTour, stepIndex: 7 });
      }
    }
    //  else if (action === "reset" || lifecycle === "complete") {
    //   setHomeTour({ ...homeTour, run: false, stepIndex: 0, tourActive: false });
    // }
  };

  // const steps: Step[] = [
  //   {
  //     target: "body",
  //     placement: "center",
  //     title: <h1>Welcom to Bargain Hive</h1>,
  //     locale: { next: "Take Tour" },

  //     content: <h2>Would you like to take to tour?</h2>,
  //   },
  //   {
  //     target: "body",
  //     placement: "center",
  //     title: <h1>Home Page</h1>,
  //     // locale: { next: "Take Tour" },

  //     content: (
  //       <h2>
  //         This is the home page where you can see the top products people are
  //         watching
  //       </h2>
  //     ),
  //   },
  //   {
  //     target: ".pop",
  //     title: "Pop Section",
  //     placement: "top",
  //     content:
  //       "Here you can see the top products people are watching and more...",
  //   },
  //   {
  //     target: ".about-step-1",
  //     title: "Start Page",
  //     // placement: "bottom",
  //     content:
  //       "Now that I got your attention you can click here to see how to get started ",
  //     styles: { options: { zIndex: 100000000 } },
  //   },

  //   {
  //     target: ".about-step-2",
  //     title: "Step 2",
  //     content: "This is the second step.",
  //   },
  // ];
  return (
    <>
      <NavBar />
      {/* <Joyride
        steps={steps}
        continuous
        showSkipButton
      /> */}
      <Joyride
        callback={(data) => handleCallback(data)}
        continuous
        run={homeTour.run}
        stepIndex={homeTour.stepIndex}
        steps={homeTour.steps}
        showSkipButton
        // styles={{
        //   options: {
        //     arrowColor: theme.black,
        //     backgroundColor: theme.black,
        //     primaryColor: theme.colors.purple,
        //     textColor: theme.white,
        //   },
        // }}
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
