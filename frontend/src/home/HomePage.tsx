import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import CardCarusel from "./components/CardCarusel";
import { IProductProps } from "../types";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState<IProductProps[] | undefined>(
    undefined
  );
  // useAuth();
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/product");
      console.log(data);

      setAllProducts([...data.products]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // console.log(user);

  return (
    <>
      <NavBar />
      <div className="mx-[5vw] ">
        <div className="Popular my-[4vw]">
          <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
            <p className="text-lg font-bold">Popular</p>
            <button className="text-blue-600 font-semibold">View all</button>
          </div>

          <CardCarusel products={allProducts} />
        </div>
        <div className="recommnedewd my-[4vw] ">
          <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
            <p className="text-lg font-bold">Recommnedewd</p>
            <button className="text-blue-600 font-semibold">View all</button>
          </div>
          <CardCarusel products={allProducts} />
        </div>
        <div className="hot my-[4vw]">
          <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
            <p className="text-lg font-bold">Hot</p>
            <button className="text-blue-600 font-semibold">View all</button>
          </div>
          <CardCarusel products={allProducts} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
