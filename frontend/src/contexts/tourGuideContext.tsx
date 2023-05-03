import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { CallBackProps, Step } from "react-joyride";
import { NavigateFunction, useNavigate } from "react-router-dom";

type appState = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  tourActive: boolean;
};
export interface TourGuideContextInterface {
  homeTour: appState;
  setHomeTour: Dispatch<SetStateAction<appState>>;
  trackProductTour: appState;
  setTrackProductTour: Dispatch<SetStateAction<appState>>;
  // handleCallback(data: CallBackProps, navi: NavigateFunction): void;
}

type TourGuideProviderProps = {
  children: ReactNode;
};

export const TourGuideContext = createContext<TourGuideContextInterface>(null!);

export default function TourGuideProvider({
  children,
}: TourGuideProviderProps) {
  const homeSteps: Step[] = [
    {
      target: "body",
      placement: "center",
      title: <h1>Welcom to Bargain Hive</h1>,
      locale: { next: "Take Tour" },

      content: <h2>Would you like to take our tour?</h2>,
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
      target: ".nav-step-3",
      title: "Our navigation",
      placement: "bottom",
      content:
        "This is the navigation where you get to the categories above,such as Popular, Hot and All Products",
    },
    {
      target: ".start-step-1",
      title: "Start Page",
      // placement: "bottom",
      content:
        "Now that I got your attention you can click here to see how to get started ",
      styles: { options: { zIndex: 100000000 } },
      disableOverlayClose: true,
    },
    {
      target: ".about-step-1",
      title: "What our desires",
      placement: "top",
      content:
        "Why are we doing this and what are the steps you need to take are in this page",
    },
    {
      target: ".about-step-2",
      title: "The real deal",
      content:
        "Here are the steps to start tracking a product. Only three steps to your product ",
    },
    {
      target: ".nav-step-2",
      title: "Track a product",
      content: (
        <h2>
          Once you have logged in next to this button you will see a{" "}
          <strong>Track Product</strong> button which lead you to the track a
          product page
        </h2>
      ),
      placement: "right-start",
    },
    {
      target: ".login-step-1",
      title: "Login",
      content:
        "And now all you need to do is login by pressing this button and start following a product",
      styles: { buttonNext: { display: "none" } },
    },
  ];
  const trackProductSteps: Step[] = [
    {
      target: "body",
      placement: "center",
      title: <h1>Track new product</h1>,
      locale: { next: "Yes, Tutorial" },

      content: (
        <h2>
          This is where you could track a new product and add it to your
          followings <br></br> Would you like to take the tutorial?
        </h2>
      ),
    },
    {
      target: ".follow-step-1",
      placement: "top",
      title: <h1>The steps </h1>,
      content: (
        <h2>
          To add a products there are three steps<br></br>
          You currently on "Enter Product"
        </h2>
      ),
    },
    {
      target: ".follow-step-2",
      placement: "top",
      title: <h1>Lets try add a new product </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          In order to add a new products pls enter a product link<br></br>
          <strong>Example:</strong>
          <br></br>
          https://www.amazon.com/AmazonBasics-Matte-Keyboard-QWERTY-Layout/dp/B07WJ5D3H4
        </h2>
      ),
      spotlightClicks: true,
    },
    {
      target: ".follow-step-3",
      placement: "top",
      title: <h1>Enter your target price </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          Once you entered a product link you need to enter a target price.
          <br></br> This will be the price that we are comparing to<br></br>
        </h2>
      ),
      spotlightClicks: true,
      styles: { buttonBack: { display: "none" } },
    },
    {
      target: ".follow-step-4",
      placement: "top",
      title: <h1>Verify </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          If you entered a link and a target price click here to verify
        </h2>
      ),
      spotlightClicks: true,
      styles: { buttonNext: { display: "none" } },
    },
    {
      target: ".follow-step-5",
      placement: "top",
      title: <h1>Verify your product </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          In this section you can verify that the product truly matches the
          product you want and all of it details.<br></br>You can see his
          image,title and price.
        </h2>
      ),
      spotlightClicks: true,
    },
    {
      target: ".follow-step-6",
      placement: "top",
      title: <h1>Confirmed it </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          If you would like to confirm it you can click here to confirm.
        </h2>
      ),
      spotlightClicks: true,
      styles: { buttonNext: { display: "none" } },
    },
    {
      target: "body",
      placement: "center",
      title: <h1>Product confirmed </h1>,

      content: (
        <h2 style={{ textAlign: "left" }}>
          Your product has been confirmed and added to your following.<br></br>
          <strong>Congrats to your new product</strong>
          <br></br>
          Now you know how easy it is to add a product
        </h2>
      ),
      spotlightClicks: true,
      styles: {
        buttonNext: { display: "none" },
        buttonBack: { display: "none" },
      },
    },
  ];
  const [homeTour, setHomeTour] = useState<appState>({
    run: false,
    stepIndex: 0,
    steps: homeSteps,
    tourActive: false,
  });
  const [trackProductTour, setTrackProductTour] = useState<appState>({
    run: false,
    stepIndex: 0,
    steps: trackProductSteps,
    tourActive: false,
  });

  return (
    <TourGuideContext.Provider
      value={{ homeTour, setHomeTour, trackProductTour, setTrackProductTour }}
    >
      {children}
    </TourGuideContext.Provider>
  );
}
