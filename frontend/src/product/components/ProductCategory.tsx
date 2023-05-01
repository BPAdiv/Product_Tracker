import * as React from "react";
import Card from "../../general/Card";
import { IProductProps } from "../../types";
import { ProductPageProps } from "../ProductPage";

// export interface IProductCategoryProps {}

export default function ProductCategory({
  product,
  sameCategory,
}: ProductPageProps) {
  return (
    <div className="mx-[5vw] mb-[5vw]">
      <h1 className="text-3xl  font-semibold mb-8 bg-gray-100 w-max m-auto p-2 rounded-md shadow-md ">
        Related Products
      </h1>
      <div className="grid   justify-items-center  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3  gap-5">
        {sameCategory?.map((pro, i) => {
          return <Card key={i} product={pro} />;
        })}
      </div>
    </div>
  );
}
