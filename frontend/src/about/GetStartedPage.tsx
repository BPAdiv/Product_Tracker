import * as React from "react";
import NavBar from "../general/NavBar";
import Footer from "../general/Footer";
import AboutUs from "./components/AboutUs";
import AboutHeader from "./components/AboutHeader";
import StartSteps from "./components/StepsStarted";
import { useAuth } from "../hooks/useAuth";

export default function GetStartedPage() {
  useAuth();
  return (
    <>
      <NavBar />
      <AboutHeader />
      <AboutUs />
      <StartSteps />
      <Footer />
    </>
  );
}
