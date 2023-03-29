import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import UserPage from "./UserPage";

// export interface IAppProps {}

export default function UserHome() {
  const { user, setUser } = useContext(UserContext);
  //   const { auth } = useAuth();

  //   useEffect(() => {
  //     auth();
  //   }, []);

  useAuth();

  return (
    <>
      <NavBar />
      {user ? <UserPage /> : <div>Loading..</div>}
    </>
  );
}
