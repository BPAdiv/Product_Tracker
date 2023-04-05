import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import CardCarusel from "./components/CardCarusel";
import { IProductProps } from "../types";
import Loading from "../general/Loading";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<IProductProps[] | undefined>(
    undefined
  );
  useAuth();
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/product");
      console.log(data);

      setAllProducts([...data.products]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const handlePopularProducts = () => {
    const pop = allProducts?.sort(
      (a, b) => b.followers.length - a.followers.length
    );
    return pop;
  };
  const handleHotProducts = () => {
    const hot = allProducts?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    return hot;
  };

  const popularProducts = handlePopularProducts();
  const hotProducts = handleHotProducts();

  return (
    <>
      <NavBar />
      <div className="mx-[5vw] ">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="Popular my-[4vw]">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">Popular</p>
                <button className="text-blue-600 font-semibold">
                  View all
                </button>
              </div>

              <CardCarusel products={popularProducts?.slice(0, 8)} />
            </div>

            <div className="hot my-[4vw]">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">Hot</p>
                <button className="text-blue-600 font-semibold">
                  View all
                </button>
              </div>

              <CardCarusel products={hotProducts?.slice(0, 8)} />
            </div>
            <div className="recommnedewd my-[4vw] ">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">All Products</p>
                <button className="text-blue-600 font-semibold">
                  View all
                </button>
              </div>

              <CardCarusel products={allProducts?.slice(0, 8)} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
