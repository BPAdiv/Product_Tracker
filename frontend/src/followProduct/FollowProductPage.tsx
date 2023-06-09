import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import MultiStepsForm from "./components/MultiStepForm";
import Footer from "../general/Footer";
import NeedToLogin from "../general/NeedToLogin";
import Loading from "../general/Loading";
import ReactJoyride, { CallBackProps } from "react-joyride";
import { TourGuideContext } from "../contexts/tourGuideContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// export interface IAppProps {}

import ReactGA from "react-ga";
export default function FollowProductPage() {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string);

  ReactGA.pageview(window.location.pathname + window.location.search);
  const { user, setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const { trackProductTour, setTrackProductTour } =
    useContext(TourGuideContext);

  useEffect(() => {
    const token = cookies.get("token");
    setToken(token);
    if (!cookies.get("usedHomeTour"))
      return setTrackProductTour({ ...trackProductTour, run: true });
    const usedtrackProductTour = cookies.get("usedTrackProductTour");
    if (usedtrackProductTour) {
      setTrackProductTour({ ...trackProductTour, run: false });
    } else {
      setTrackProductTour({ ...trackProductTour, run: true });
    }
  }, []);

  useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleCallback = (data: CallBackProps) => {
    const { action, index, lifecycle, type } = data;

    if (action === "close" || action === "skip") {
      setTrackProductTour({
        ...trackProductTour,
        run: false,
        tourActive: false,
      });
      cookies.set("usedTrackProductTour", true);

      // cookies.set("usedtrackProductTour", true);
      return;
    }
    if (type === "step:after" && index === 0 /* or step.target === '#home' */) {
      setTrackProductTour({ ...trackProductTour, stepIndex: 1 });
    } else if (type === "step:after" && index === 1) {
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 2 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 0 });
      }
    } else if (type === "step:after" && index === 2) {
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 3 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 1 });
      }
    } else if (type === "step:after" && index === 3) {
      console.log("step-3", data);
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 4 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 2 });
      }
    } else if (type === "step:after" && index === 4) {
      console.log("this is step to navigatye", data);
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 5 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 3 });
      }
    } else if (type === "step:after" && index === 5) {
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 6 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 4 });
      }
    } else if (type === "step:after" && index === 6) {
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 7 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 5 });
      }
    } else if (type === "step:after" && index === 7) {
      if (action === "next") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 8 });
      } else {
        setTrackProductTour({ ...trackProductTour, stepIndex: 6 });
      }
    } else if (type === "step:after" && index === 8) {
      if (action === "prev") {
        setTrackProductTour({ ...trackProductTour, stepIndex: 7 });
      }
    }
  };
  return (
    <>
      <NavBar />

      {user ? (
        <>
          <ReactJoyride
            callback={(data) => handleCallback(data)}
            continuous
            run={trackProductTour.run}
            stepIndex={trackProductTour.stepIndex}
            steps={trackProductTour.steps}
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
          <MultiStepsForm />
        </>
      ) : (
        <>
          <Loading />
          {!token ? (
            <NeedToLogin isLogin={isLogin} setIsLogin={setIsLogin} followPage />
          ) : (
            ""
          )}
        </>
      )}
      <Footer />
    </>
  );
}
