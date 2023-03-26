import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import NavBar from "../general/NavBar";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const get = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/user/auth",
          { token, userId }
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

  console.log(user);

  return (
    <>
      <NavBar />
      <div>
        {user?.email}
        <a href="https://t.me/AmazonNodeBot">Click</a>
      </div>
    </>
  );
};

export default HomePage;
