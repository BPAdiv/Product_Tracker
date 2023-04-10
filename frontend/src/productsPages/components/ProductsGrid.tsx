import { useContext, useEffect, useRef, useState } from "react";
import productBanner from "../../assets/josh-marshall-lLOZVSa7DGU-unsplash.jpg";
import axios from "axios";
import { IProductProps } from "../../types";
import Card from "../../home/components/Card";
import SortProducts from "./SortProducts";
import ProductsTabs from "./ProductsTabs";
import ProductsHero from "./ProductsHero";
import { ProductsContext } from "../../contexts/productsContext";
import Loading from "../../general/Loading";
import { useLocation, useParams } from "react-router-dom";
import { IAllProductsPageProps } from "../AllProductsPage";

export default function ProductsGrid({
  currentProducts,
  setCurrentProducts,
  tabActive,
  setTabActive,
}: IAllProductsPageProps) {
  const {
    allProducts,
    handlePopularProducts,
    handleHotProducts,
    defaultProducts,
  } = useContext(ProductsContext);
  // const [currentProducts, setCurrentProducts] = useState<
  //   IProductProps[] | undefined
  // >(undefined);
  const [countPage, setCountPage] = useState<number>(40);
  // const [tabActive, setTabActive] = useState("all");

  const { state } = useLocation();
  const popularProducts = handlePopularProducts(defaultProducts);
  const hotProducts = handleHotProducts(defaultProducts);
  useEffect(() => {
    setCurrentProducts([...(allProducts || [])]);

    if (!state) return;
    state.productTab && setTabActive(state.productTab);
    state.productTab === "pop" && setCurrentProducts([...popularProducts]);
    state.productTab === "hot" && setCurrentProducts([...hotProducts]);
    console.log(state);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // if (!e) return userProduct;

    console.log(e.target.value);
    const sortBy = e.target.value;
    switch (sortBy) {
      case "High": {
        //statements;
        console.log("hi");
        const products = [...(currentProducts || [])]?.sort(
          (a, b) =>
            Number(b.currentPrice.replace("$", "")) -
            Number(a.currentPrice.replace("$", ""))
        );
        setCurrentProducts(products);
        // console.log(products);

        break;
      }
      case "Low": {
        //statements;
        const products = [...(currentProducts || [])]?.sort(
          (a, b) =>
            Number(a.currentPrice.replace("$", "")) -
            Number(b.currentPrice.replace("$", ""))
        );
        setCurrentProducts(products);

        break;
      }
      case "Date": {
        //statements;
        const products = [...(currentProducts || [])]?.sort((a, b) => {
          const dateA = new Date(a.lastUpdated);
          const dateB = new Date(b.lastUpdated);
          return dateA.getTime() - dateB.getTime();
        });
        setCurrentProducts(products);
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
    if (!currentProducts) return;
    if (countPage - 40 >= 40) {
      setCountPage(countPage - 40);
    } else {
      setCountPage(40);
    }
  };
  const PrevProducts = () => {
    if (!currentProducts) return;
    if (countPage + 40 <= currentProducts?.length) {
      setCountPage(countPage + 40);
    } else {
      setCountPage(currentProducts?.length);
    }
  };
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="mx-[5vw]   py-12">
      <div className="flex flex-col">
        <div ref={ref} className="mt-10">
          <SortProducts handleSortChange={handleSortChange} />
        </div>

        <ProductsTabs
          setCountPage={setCountPage}
          setCurrentProducts={setCurrentProducts}
          setTabActive={setTabActive}
          tabActive={tabActive}
        />
        {!currentProducts ? (
          <Loading />
        ) : (
          <div
            id="products"
            className=" grid   justify-items-center  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3  gap-5"
          >
            {currentProducts?.slice(countPage - 40, countPage).map((pro, i) => {
              return <Card product={pro} key={i} />;
            })}
          </div>
        )}

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
