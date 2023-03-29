import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import MultiStepsForm from "./components/MultiStepForm";

// export interface IAppProps {}

export default function FollowProductPage() {
  const { user, setUser } = useContext(UserContext);

  useAuth();
  return (
    <>
      <NavBar />
      {user ? <MultiStepsForm /> : <h1>Loading..</h1>}
    </>
  );
}
