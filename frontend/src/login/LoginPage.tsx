import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useAuth } from "../hooks/useAuth";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import NavBar from "../general/NavBar";
import Footer from "../general/Footer";

// export interface IProps {
// }

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useAuth();
  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <NavBar />
      {isLogin ? (
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
      <Footer />
    </>
  );
}
