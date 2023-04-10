import { NavLink } from "react-router-dom";
import CardCarusel from "./CardCarusel";
import { IProductProps } from "../../types";
import Card from "./Card";

export interface IProductsTeaser {
  sectionName: string;
  productsType: IProductProps[] | undefined;
  linkTo: string;
}

export default function ProductsTeaser({
  sectionName,
  productsType,
  linkTo,
}: IProductsTeaser) {
  return (
    <div className="hot my-[4vw]">
      <div className="flex justify-between items-center my-2 py-1 border-b-gray-300 border-b ">
        <p className="text-2xl font-bold">{sectionName}</p>
        <NavLink
          to="/products"
          state={{ productTab: linkTo }}
          className="text-blue-600 font-semibold hover:underline "
        >
          View all
        </NavLink>
      </div>
      <div className="grid   justify-items-center  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3  gap-5">
        {productsType?.slice(0, 10).map((product, index) => {
          return <Card product={product} key={index} />;
        })}
        {/* {productsType?.slice(0, 8).map((product, index) => {
          return <Card product={product} key={index} />;
        })} */}
      </div>
      {/* <CardCarusel products={productsType?.slice(0, 8)} /> */}
    </div>
  );
}
