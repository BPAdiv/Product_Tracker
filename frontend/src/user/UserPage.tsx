import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import NavBar from "../general/NavBar";
import CardCarusel from "../home/components/CardCarusel";
import { useAuth } from "../hooks/useAuth";
import { IProductProps } from "../types";
import FilterSort from "./components/FilterSort";

let defaultProducts: IProductProps[] | undefined = undefined;
const UserPage = () => {
  const [userProduct, setUserProduct] = useState<IProductProps[] | undefined>(
    undefined
  );
  const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    const getUserProducts = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/user/${user._id}`
        );
        console.log(data);

        // setAllProducts([...data.products]);
        defaultProducts = [...data.products];
        setUserProduct(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    getUserProducts();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // if (!e) return userProduct;

    console.log(e.target.value);
    const sortBy = e.target.value;
    switch (sortBy) {
      case "High": {
        //statements;
        console.log("hi");
        const products = [...(userProduct || [])]?.sort(
          (a, b) =>
            Number(b.currentPrice.replace("$", "")) -
            Number(a.currentPrice.replace("$", ""))
        );
        setUserProduct(products);
        // console.log(products);

        break;
      }
      case "Low": {
        //statements;
        const products = [...(userProduct || [])]?.sort(
          (a, b) =>
            Number(a.currentPrice.replace("$", "")) -
            Number(b.currentPrice.replace("$", ""))
        );
        setUserProduct(products);

        break;
      }
      case "Date": {
        //statements;
        const products = [...(userProduct || [])]?.sort((a, b) => {
          const dateA = new Date(a.lastUpdated);
          const dateB = new Date(b.lastUpdated);
          return dateA.getTime() - dateB.getTime();
        });
        setUserProduct(products);
        break;
      }
      default: {
        //statements;
        setUserProduct([...(defaultProducts || [])]);
        break;
      }
    }
  };
  return (
    <div>
      <div className="m-[5vw] ">
        <FilterSort handleSortChange={handleSortChange} />
        <CardCarusel products={userProduct} />
      </div>
    </div>
  );
};

export default UserPage;
