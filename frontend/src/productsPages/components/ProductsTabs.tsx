import { Dispatch, SetStateAction, useContext, useState } from "react";
import { IProductProps } from "../../types";
import hotIcon from "../../assets/icons8-fire-40.png";
import allIcon from "../../assets/icons8-select-all-48.png";
import popIcon from "../../assets/icons8-popular-48.png";
import { ProductsContext } from "../../contexts/productsContext";
import Tab from "./Tab";
export interface IProductsTabsProps {
  // allProducts: IProductProps[] | undefined;
  setCurrentProducts: Dispatch<SetStateAction<IProductProps[] | undefined>>;
  // countPage: number;
  setCountPage: Dispatch<SetStateAction<number>>;
  setTabActive: Dispatch<SetStateAction<string>>;
  tabActive: string;
  // defaultProduct: IProductProps[] | undefined;
}

export default function ProductsTabs({
  setCurrentProducts,
  // allProducts,
  // defaultProduct,
  setCountPage,
  tabActive,
  setTabActive,
}: IProductsTabsProps) {
  // const [tabActiv, setTabActive] = useState("all");

  const {
    allProducts,
    setAllProducts,
    handlePopularProducts,
    handleHotProducts,
    defaultProducts,
  } = useContext(ProductsContext);

  const popularProducts = handlePopularProducts(defaultProducts);
  const hotProducts = handleHotProducts(defaultProducts);
  const handleTabClick = (
    tabArray: IProductProps[] | undefined,
    tabValue: string
  ) => {
    setCountPage(40);
    setCurrentProducts([...(tabArray || [])]);
    setTabActive(tabValue);
  };
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-10">
      <ul className="flex flex-wrap gap-3 text-base font-medium text-center text-gray-500 dark:text-gray-400">
        <Tab
          handleTabClick={handleTabClick}
          label="All Products"
          tabValue="all"
          tabActive={tabActive}
          tabArray={defaultProducts}
          imgSrc={allIcon}
        />
        <Tab
          handleTabClick={handleTabClick}
          label="Popular"
          tabValue="pop"
          tabActive={tabActive}
          tabArray={popularProducts}
          imgSrc={popIcon}
        />
        <Tab
          handleTabClick={handleTabClick}
          label="Hot"
          tabValue="hot"
          tabActive={tabActive}
          tabArray={hotProducts}
          imgSrc={hotIcon}
        />
      </ul>
    </div>
  );
}
