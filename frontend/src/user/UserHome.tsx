import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import UserPage from "./UserPage";
import { Navigate } from "react-router-dom";
import NeedToLogin from "../general/NeedToLogin";

// export interface IAppProps {}

export default function UserHome() {
  const { user, setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  //   const { auth } = useAuth();

  //   useEffect(() => {
  //     auth();
  //   }, []);

  useAuth();

  return (
    <>
      <NavBar />
      {user ? (
        <UserPage />
      ) : (
        <NeedToLogin isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </>
  );
}
