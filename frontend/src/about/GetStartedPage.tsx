import * as React from "react";
import NavBar from "../general/NavBar";
import Footer from "../general/Footer";
import AboutUs from "./components/AboutUs";
import AboutHeader from "./components/AboutHeader";
import StartSteps from "./components/StepsStarted";
import { useAuth } from "../hooks/useAuth";
// import ReactJoyride, { CallBackProps, Step } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { TourGuideContext } from "../contexts/tourGuideContext";
import Cookies from "universal-cookie";

export default function GetStartedPage() {
  useAuth();
  const { homeTour, setHomeTour } = React.useContext(TourGuideContext);
  const navigate = useNavigate();
  const cookies = new Cookies();
  // const handleCallback = (data: CallBackProps) => {
  //   const { action, index, lifecycle, type } = data;
  //   console.log(data);
  //   if (action === "close" || action === "skip") {
  //     setHomeTour({ ...homeTour, run: false, tourActive: false });
  //     cookies.set("usedHomeTour", true);

  //     return;
  //   }
  //   if (type === "step:after" && index === 0 /* or step.target === '#home' */) {
  //     console.log(data);
  //     setHomeTour({ ...homeTour, stepIndex: 1 });
  //   } else if (type === "step:after" && index === 1) {
  //     console.log(data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 2 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 0 });
  //     }
  //   } else if (type === "step:after" && index === 2) {
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 3 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 1 });
  //     }
  //   } else if (type === "step:after" && index === 3) {
  //     console.log("step-3", data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 4 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 2 });
  //     }
  //   } else if (type === "step:after" && index === 4) {
  //     console.log("this is step to navigatye", data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 5 });
  //       navigate("/getstarted");
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 3 });
  //     }
  //   } else if (type === "step:after" && index === 5) {
  //     console.log(data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 6 });
  //     } else {
  //       navigate("/");
  //       setHomeTour({ ...homeTour, stepIndex: 4 });
  //     }
  //   } else if (type === "step:after" && index === 6) {
  //     console.log(data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 7 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 5 });
  //     }
  //   } else if (type === "step:after" && index === 7) {
  //     console.log(data);
  //     if (action === "next") {
  //       setHomeTour({ ...homeTour, stepIndex: 8 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 6 });
  //     }
  //   } else if (type === "step:after" && index === 8) {
  //     console.log(data);
  //     if (action === "prev") {
  //       setHomeTour({ ...homeTour, stepIndex: 7 });
  //     } else {
  //       setHomeTour({ ...homeTour, stepIndex: 0, run: false });
  //       cookies.set("usedHomeTour", true);
  //     }
  //   }
  //   //  else if (action === "reset" || lifecycle === "complete") {
  //   //   setHomeTour({ ...homeTour, run: false, stepIndex: 0, tourActive: false });
  //   // }
  // };

  React.useEffect(() => {
    if (homeTour.stepIndex === 5) {
      setHomeTour({ ...homeTour, run: true });
    }
  }, []);

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
      {/* <ReactJoyride
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
      /> */}
      <AboutHeader />
      <AboutUs />
      <StartSteps />
      <Footer />
    </>
  );
}
