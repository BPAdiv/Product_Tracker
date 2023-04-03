import * as React from "react";
import NavBar from "../general/NavBar";
import { useAuth } from "../hooks/useAuth";
import ProductsGrid from "./components/ProductsGrid";

export interface IAllProductsPageProps {}

export default function AllProductsPage(props: IAllProductsPageProps) {
  useAuth();
  return (
    <>
      <NavBar />
      <ProductsGrid />
    </>
  );
}
