import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import UserPage from "./UserPage";
import { Navigate } from "react-router-dom";
import NeedToLogin from "../general/NeedToLogin";
import Footer from "../general/Footer";
import ConnectTelegram from "../general/ConnectTelegram";
import Testing from "./components/TelegramWidget";

// export interface IAppProps {}

export default function UserHome() {
  const { user, setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  //   const { auth } = useAuth();

  useAuth();

  return (
    <>
      <NavBar />
      {user ? (
        <>
          {/* <Testing /> */}

          {!user.telegramId && <ConnectTelegram />}
          <UserPage />
        </>
      ) : (
        <NeedToLogin isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
      <Footer />
    </>
  );
}
