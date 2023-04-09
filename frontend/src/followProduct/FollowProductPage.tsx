import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import MultiStepsForm from "./components/MultiStepForm";
import Footer from "../general/Footer";
import NeedToLogin from "../general/NeedToLogin";
import Loading from "../general/Loading";

// export interface IAppProps {}

export default function FollowProductPage() {
  const { user, setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);

  useAuth();
  return (
    <>
      <NavBar />
      {user ? (
        <MultiStepsForm />
      ) : (
        <>
          <Loading />
          <NeedToLogin isLogin={isLogin} setIsLogin={setIsLogin} />
        </>
      )}
      <Footer />
    </>
  );
}
