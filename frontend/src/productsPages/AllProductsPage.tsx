import { Dispatch, SetStateAction, useState } from "react";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import ProductsGrid from "./components/ProductsGrid";
import Footer from "../general/Footer";
import ProductsHero from "./components/ProductsHero";
import { IProductProps } from "../types";

export interface IAllProductsPageProps {
  currentProducts?: IProductProps[] | undefined;
  setCurrentProducts: Dispatch<SetStateAction<IProductProps[] | undefined>>;
  tabActive: string;
  setTabActive: Dispatch<SetStateAction<string>>;
}

export default function AllProductsPage() {
  useAuth();
  const [currentProducts, setCurrentProducts] = useState<
    IProductProps[] | undefined
  >(undefined);
  const [tabActive, setTabActive] = useState("all");

  return (
    <>
      <NavBar />
      <ProductsHero
        tabActive={tabActive}
        setCurrentProducts={setCurrentProducts}
        setTabActive={setTabActive}
      />
      <ProductsGrid
        currentProducts={currentProducts}
        setCurrentProducts={setCurrentProducts}
        tabActive={tabActive}
        setTabActive={setTabActive}
      />
      <Footer />
    </>
  );
}
