import { useEffect, useState } from "react";
import productBanner from "../../assets/josh-marshall-lLOZVSa7DGU-unsplash.jpg";
import axios from "axios";
import { IProductProps } from "../../types";
import Card from "../../home/components/Card";
import SortProducts from "./SortProducts";
import ProductsTabs from "./ProductsTabs";

let defaultProduct: IProductProps[] | undefined;
export default function ProductsGrid() {
  const [allProducts, setAllProducts] = useState<IProductProps[] | undefined>(
    undefined
  );
  const [countPage, setCountPage] = useState<number>(40);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/product");
        console.log(data);

        setAllProducts([...data.products]);
        defaultProduct = [...data.products];
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // if (!e) return userProduct;

    console.log(e.target.value);
    const sortBy = e.target.value;
    switch (sortBy) {
      case "High": {
        //statements;
        console.log("hi");
        const products = [...(allProducts || [])]?.sort(
          (a, b) =>
            Number(b.currentPrice.replace("$", "")) -
            Number(a.currentPrice.replace("$", ""))
        );
        setAllProducts(products);
        // console.log(products);

        break;
      }
      case "Low": {
        //statements;
        const products = [...(allProducts || [])]?.sort(
          (a, b) =>
            Number(a.currentPrice.replace("$", "")) -
            Number(b.currentPrice.replace("$", ""))
        );
        setAllProducts(products);

        break;
      }
      case "Date": {
        //statements;
        const products = [...(allProducts || [])]?.sort((a, b) => {
          const dateA = new Date(a.lastUpdated);
          const dateB = new Date(b.lastUpdated);
          return dateA.getTime() - dateB.getTime();
        });
        setAllProducts(products);
        break;
      }
      default: {
        //statements;
        // setAllProducts([...(defaultProducts || [])]);
        break;
      }
    }
  };

  const NextProducts = () => {
    if (!allProducts) return;
    if (countPage - 40 >= 40) {
      setCountPage(countPage - 40);
    } else {
      setCountPage(40);
    }
  };
  const PrevProducts = () => {
    if (!allProducts) return;
    if (countPage + 40 <= allProducts?.length) {
      setCountPage(countPage + 40);
    } else {
      setCountPage(allProducts?.length);
    }
  };
  return (
    <div className="mx-[5vw]   py-12">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <div className="relative ">
            <img
              className="hidden sm:block w-full object-cover    max-h-[60vh]"
              src={productBanner}
              alt="sofa"
            />
            <img
              className="sm:hidden w-full object-cover "
              src={productBanner}
              alt="sofa"
            />
            <div className="absolute sm:top-8 top-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start">
              <p className="text-3xl sm:text-4xl font-semibold leading-9 text-white">
                Get Your Amazon Products Today
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SortProducts handleSortChange={handleSortChange} />
        </div>
        <ProductsTabs
          setCountPage={setCountPage}
          setAllProducts={setAllProducts}
          allProducts={allProducts}
          defaultProduct={defaultProduct}
        />
        <div className="grid   justify-items-center  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3  gap-5">
          {allProducts?.slice(countPage - 40, countPage).map((pro, i) => {
            return <Card product={pro} key={i} />;
          })}
        </div>
        <div className="mt-10 flex justify-between">
          <button
            onClick={NextProducts}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>

          <button
            onClick={PrevProducts}
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
