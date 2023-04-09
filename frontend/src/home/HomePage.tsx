import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import CardCarusel from "./components/CardCarusel";
import { IProductProps } from "../types";
import Loading from "../general/Loading";
import HeroSection from "./components/HeroSection";
import Footer from "../general/Footer";
import { ProductsContext } from "../contexts/productsContext";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    allProducts,
    setAllProducts,
    handlePopularProducts,
    handleHotProducts,
    defaultProducts,
  } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  // const [allProducts, setAllProducts] = useState<IProductProps[] | undefined>(
  //   undefined
  // );
  useAuth();

  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:8000/api/product");
  //     console.log(data);

  //     setAllProducts([...data.products]);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  // const handlePopularProducts = () => {
  //   const pop = allProducts?.sort(
  //     (a, b) => b.followers.length - a.followers.length
  //   );
  //   return pop;
  // };
  // const handleHotProducts = () => {
  //   const hot = allProducts?.sort((a, b) => {
  //     const dateA = new Date(a.createdAt);
  //     const dateB = new Date(b.createdAt);
  //     return dateB.getTime() - dateA.getTime();
  //   });
  //   return hot;
  // };

  const popularProducts = handlePopularProducts(allProducts);
  const hotProducts = handleHotProducts(allProducts);

  return (
    <>
      <NavBar />
      <HeroSection />
      <div className="mx-[5vw] ">
        {!allProducts ? (
          <Loading />
        ) : (
          <>
            <div className="Popular my-[4vw]">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">Popular</p>
                <NavLink
                  to="/products"
                  state={{ productTab: "pop" }}
                  className="text-blue-600 font-semibold"
                >
                  View all
                </NavLink>
              </div>

              <CardCarusel products={popularProducts?.slice(0, 8)} />
            </div>

            <div className="hot my-[4vw]">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">Hot</p>
                <NavLink
                  to="/products"
                  state={{ productTab: "hot" }}
                  className="text-blue-600 font-semibold"
                >
                  View all
                </NavLink>
              </div>

              <CardCarusel products={hotProducts?.slice(0, 8)} />
            </div>
            <div className="recommnedewd my-[4vw] ">
              <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
                <p className="text-lg font-bold">All Products</p>
                <NavLink
                  to="/products"
                  state={{ productTab: "all" }}
                  className="text-blue-600 font-semibold"
                >
                  View all
                </NavLink>
              </div>

              <CardCarusel products={allProducts?.slice(0, 8)} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
