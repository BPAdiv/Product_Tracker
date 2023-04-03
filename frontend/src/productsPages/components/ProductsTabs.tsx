import { Dispatch, SetStateAction, useState } from "react";
import { IProductProps } from "../../types";
import hotIcon from "../../assets/icons8-fire-40.png";
import allIcon from "../../assets/icons8-select-all-48.png";
import popIcon from "../../assets/icons8-popular-48.png";
export interface IProductsTabsProps {
  allProducts: IProductProps[] | undefined;
  setAllProducts: Dispatch<SetStateAction<IProductProps[] | undefined>>;
  //   countPage: number;
  setCountPage: Dispatch<SetStateAction<number>>;
  defaultProduct: IProductProps[] | undefined;
}

export default function ProductsTabs({
  setAllProducts,
  allProducts,
  defaultProduct,
  setCountPage,
}: IProductsTabsProps) {
  const [tabActiv, setTabActive] = useState("pop");

  const handlePopularProducts = () => {
    const pop = [...(defaultProduct || [])]?.sort(
      (a, b) => b.followers.length - a.followers.length
    );
    return pop;
  };
  const handleHotProducts = () => {
    const hot = [...(defaultProduct || [])]?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    return hot;
  };

  const popularProducts = handlePopularProducts();
  const hotProducts = handleHotProducts();
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-10">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2">
          <button
            onClick={() => {
              setCountPage(40);
              setAllProducts([...(defaultProduct || [])]);
              setTabActive("all");
            }}
            className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${
              tabActiv === "all"
                ? "text-blue-600  border-blue-600   dark:text-blue-500 dark:border-blue-500"
                : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
           group`}
          >
            <img
              src={allIcon}
              className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            ></img>
            All Products
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              setCountPage(40);
              setAllProducts([...popularProducts]);
              setTabActive("pop");
            }}
            className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${
              tabActiv === "pop"
                ? "text-blue-600  border-blue-600   dark:text-blue-500 dark:border-blue-500"
                : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
             group`}
            aria-current="page"
          >
            <img
              src={popIcon}
              className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            ></img>
            Popular
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              setCountPage(40);
              setAllProducts([...hotProducts]);
              setTabActive("hot");
            }}
            className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${
              tabActiv === "hot"
                ? "text-blue-600  border-blue-600   dark:text-blue-500 dark:border-blue-500"
                : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
             group`}
          >
            <img
              src={hotIcon}
              className="w-5 h-5 mr text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            ></img>
            Hot
          </button>
        </li>
      </ul>
    </div>
  );
}
