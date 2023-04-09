import { Dispatch, SetStateAction, useState } from "react";
import { IProductProps } from "../../types";

export interface IProductsTabsProps {
  // allProducts: IProductProps[] | undefined;
  // setCurrentProducts: Dispatch<SetStateAction<IProductProps[] | undefined>>;
  // countPage: number;
  // setCountPage: Dispatch<SetStateAction<number>>;
  // defaultProduct: IProductProps[] | undefined;
  tabActive: String;
  //  setTabActive: Dispatch<SetStateAction<String>>
  tabArray: IProductProps[] | undefined;
  tabValue: string;
  imgSrc: string;
  label: string;
  handleTabClick(tabArray: IProductProps[] | undefined, tabValue: string): void;
}
export default function Tab({
  tabActive,
  tabArray,
  tabValue,
  imgSrc,
  label,
  handleTabClick,
}: IProductsTabsProps) {
  return (
    <li className="mr-2">
      <button
        onClick={() => handleTabClick(tabArray, tabValue)}
        className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${
          tabActive === tabValue
            ? "text-blue-600  border-blue-600   dark:text-blue-500 dark:border-blue-500"
            : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
        }
           group`}
      >
        <img
          src={imgSrc}
          className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
        ></img>
        {label}
      </button>
    </li>
  );
}
