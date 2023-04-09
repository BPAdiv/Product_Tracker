import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IProductProps } from "../types";
import axios from "axios";

//   export type User = {
//     _id: string;
//     email: string;
//     userName: string;
//     telegramId?: string;
//     role?: string;
//     phoneNumber?: string;
//     country?: string;
//   };

export interface ProductsContextInterface {
  allProducts: IProductProps[] | undefined;
  setAllProducts: Dispatch<SetStateAction<IProductProps[] | undefined>>;
  handlePopularProducts(
    productsArray: IProductProps[] | undefined
  ): IProductProps[];
  handleHotProducts(
    productsArray: IProductProps[] | undefined
  ): IProductProps[];
  defaultProducts: IProductProps[] | undefined;
}

type UserProviderProps = {
  children: ReactNode;
};

export const ProductsContext = createContext<ProductsContextInterface>(null!);

let defaultProducts: IProductProps[] | undefined;
export default function ProductsContextProvider({
  children,
}: UserProviderProps) {
  const [allProducts, setAllProducts] = useState<IProductProps[] | undefined>(
    undefined
  );
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/product");
      console.log(data);

      setAllProducts([...data.products]);
      //   setIsLoading(false);
      defaultProducts = [...data.products];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const handlePopularProducts = (
    productsArray: IProductProps[] | undefined
  ) => {
    const pop = [...(productsArray || [])]?.sort(
      (a, b) => b.followers.length - a.followers.length
    );
    return pop;
  };
  const handleHotProducts = (productsArray: IProductProps[] | undefined) => {
    const hot = [...(productsArray || [])]?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    return hot;
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        setAllProducts,
        handlePopularProducts,
        handleHotProducts,
        defaultProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
