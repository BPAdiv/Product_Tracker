import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import { IProductProps } from "../types";
import ProductCategory from "./components/ProductCategory";
import ProductChart from "./components/ProductChart";
import ProductInfo from "./components/ProductInfo";
import Footer from "../general/Footer";

export type ProductPageProps = {
  product: IProductProps | undefined;
  sameCategory?: IProductProps[] | undefined;
};

export default function ProductPage() {
  const { productAsin } = useParams();
  const [singleProduct, setSingleProduct] = useState<IProductProps | undefined>(
    undefined
  );
  const [relatedProduct, setRelatedProduct] = useState<
    IProductProps[] | undefined
  >(undefined);

  useAuth();

  const sameCategory = relatedProduct?.filter(
    (pro) => pro.category === singleProduct?.category
  );

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/${productAsin}`
        );
        setSingleProduct({ ...data.singleProduct });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const getRelatedProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product`
        );
        setRelatedProduct([...data.products]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRelatedProduct();
    getSingleProduct();
  }, []);
  // useEffect(() => {
  //   const getRelatedProduct = async () => {
  //     try {
  //       const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`);
  //       // setRelatedProduct({ ...data.singleProduct });
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRelatedProduct();
  // }, [singleProduct]);

  return (
    <div>
      <NavBar />
      {/* <div>{sameCategory.map((item) => item._id)}</div> */}
      <ProductInfo product={singleProduct} />
      <ProductChart product={singleProduct} />
      <ProductCategory product={singleProduct} sameCategory={relatedProduct} />
      <Footer />
    </div>
  );
}
