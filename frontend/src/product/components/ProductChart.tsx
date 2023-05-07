import * as React from "react";
import { IProductProps } from "../../types";
import { ProductPageProps } from "../ProductPage";

// export interface IProductChartProps {}

export default function ProductChart({ product }: ProductPageProps) {
  return (
    <div className="flex justify-center items-center my-[10vw] mx-[5vw]">
      <div className="text-center w-full ">
        <h1 className="text-xl font-bold my-8 ">
          Amazon Price History By camelcamelcamel
        </h1>
        <img
          loading="lazy"
          className="max-w-3xl my-8  w-full mx-auto "
          src={`https://charts.camelcamelcamel.com/us/${product?.productAsin}/amazon.png?force=1&zero=0&w=795&h=477&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en`}
          alt=""
        />
      </div>
    </div>
  );
}
