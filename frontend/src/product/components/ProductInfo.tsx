import * as React from "react";
import { IProductProps } from "../../types";
import { ProductPageProps } from "../ProductPage";
import { format, render, cancel, register } from "timeago.js";

// export interface IProductInfoProps {}

export default function ProductInfo({ product }: ProductPageProps) {
  return (
    <div className="flex flex-wrap  m-[10vw] gap-10  justify-center bg-white shadow-md rounded   p-5">
      <div className="">
        <img
          className="max-w-[20rem] min-w-[10rem] w-full object-contain"
          src={product?.image}
          alt=""
        />
      </div>
      <div className=" flex flex-col max-w-3xl text-xl max-sm:text-base gap-5 px-5">
        <div>
          <p className="mb-4">
            <span className="font-semibold"> Product :</span> {product?.title}
          </p>
          <p>
            {" "}
            <span className="font-semibold"> Category :</span>{" "}
            {product?.category || "No Details"}
          </p>
        </div>
        <div>
          <p className="font-bold text-2xl max-sm:text-lg mb-2">
            {" "}
            <span className="font-semibold text-xl max-sm:text-base mr-3">
              {" "}
              Current Price :
            </span>
            {product?.currentPrice}
          </p>
          <p className="text-gray-500 font-bold  ">
            <span className="font-semibold text-black  no-underline  ">
              Previews Price :
            </span>{" "}
            <span className="line-through">
              {product?.previousPrice || "No previous"}
            </span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">People Who Are Following :</span>
            <span className="font-bold bg-gray-300 px-3 ml-3 rounded">
              {product?.followers.length || "No Details"}
            </span>
          </p>
        </div>
        <div className="flex items-end justify-between max-sm:flex-col max-sm:items-start gap-8">
          <div>
            <p className="mb-2">
              <span className="font-semibold text-black  no-underline   ">
                Created At :{" "}
              </span>
              {product
                ? format(new Date(product.createdAt).toDateString())
                : "not availible"}
            </p>
            <p className="">
              <span className="font-semibold text-black  no-underline  ">
                Updated At :{" "}
              </span>

              {product
                ? format(new Date(product.lastUpdated).toDateString())
                : "not availible"}
            </p>
          </div>
          <div className=" max-sm:self-center w-fit h-fit">
            <a
              href={`https://www.amazon.com/dp/${product?.productAsin}`}
              className=" bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
