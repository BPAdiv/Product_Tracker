import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import { IProductProps } from "../types";
import ProductCategory from "./components/ProductCategory";
import ProductChart from "./components/ProductChart";
import ProductInfo from "./components/ProductInfo";

export type ProductPageProps = {
  product: IProductProps | undefined;
};

export default function ProductPage() {
  const { productAsin } = useParams();
  const [singleProduct, setSingleProduct] = useState<IProductProps | undefined>(
    undefined
  );

  useAuth();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/${productAsin}`
        );
        setSingleProduct({ ...data.singleProduct });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, []);

  return (
    <div>
      <NavBar />
      <ProductInfo product={singleProduct} />
      <ProductChart product={singleProduct} />
      <ProductCategory product={singleProduct} />
    </div>
  );
}
