import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/Signup";

// export interface IProps {
// }

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </>
  );
}
