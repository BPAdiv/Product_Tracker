import * as React from "react";
import { IProductProps } from "../../types";
import { ProductPageProps } from "../ProductPage";
import { format, render, cancel, register } from "timeago.js";

// export interface IProductInfoProps {}

export default function ProductInfo({ product }: ProductPageProps) {
  return (
    <div className="flex max-md:flex-col  flex-wrap max-sm:mx-[5vw]  m-[10vw]  justify-between items-center   bg-white border border-gray-900   rounded">
      <div className="w-1/2 flex justify-center items-center p-10  max-md:w-full  ">
        <img
          loading="lazy"
          className="max-w-[20rem]  max-h-96  w-full object-contain"
          src={product?.image}
          alt=""
        />
      </div>
      <div className="flex flex-col items-stretch  w-1/2 text-xl max-sm:text-base   max-md:w-full border border-gray-900 max-sm:border-x-0 ">
        <div className="text-center border-b border-gray-900">
          <h1 className="text-xl text-gray-400 font-bold bg-gray-900 py-2">
            Product
          </h1>
          <hr />
          <p className="p-3">{product?.title}</p>
        </div>
        <div className="text-center border-b border-gray-900">
          <h1 className="font-semibold bg-gray-300 text-center py-2">
            Category
          </h1>
          <div className="py-3">{product?.category || "No Details"}</div>
        </div>
        <div className="text-center border-b border-gray-900 ">
          <h1 className="font-semibold bg-gray-300 text-center py-2">
            Current Price
          </h1>
          <div className="py-3 font-semibold">
            {product?.currentPrice || "No Details"}
          </div>
        </div>
        <div className="flex text-center border-b border-gray-900 ">
          <div className="w-full border-r">
            <h1 className="font-semibold bg-gray-300 text-center py-2">
              Created At
            </h1>
            <div className="py-3">
              {product
                ? format(new Date(product.createdAt).toDateString())
                : "not availible"}
            </div>
          </div>
          <div className="w-full border-l border-gray-900">
            <h1 className="font-semibold bg-gray-300 text-center py-2">
              Updated At
            </h1>
            <div className="py-3">
              {product
                ? format(new Date(product.lastUpdated).toDateString())
                : "not availible"}
            </div>
          </div>
        </div>
        {/* <button className="py-3 text-white font-semibold bg-blue-900 "> */}
        <a
          className="py-3 text-white font-semibold bg-blue-900 text-center cursor-pointer "
          href={`https://www.amazon.com/dp/${product?.productAsin}`}
        >
          Buy Now
        </a>
      </div>
      {/* <div className=" flex flex-col  w-1/2 text-xl max-sm:text-base  p-10  max-md:w-full">
        <div>
          <p className="">
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
        </div>
        <div>
          <p>
            <span className="font-semibold">Following :</span>
            <span className="font-bold bg-gray-300 px-3 ml-3 rounded">
              {product?.followers.length || "No Details"}
            </span>
          </p>
        </div>
        <div className="flex items-end justify-between max-sm:flex-col max-sm:items-start gap-8">
          <div>
            <p className="">
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
          <div className=" max-sm:self-center">
            <a
              href={`https://www.amazon.com/dp/${product?.productAsin}`}
              className=" bg-blue-500 whitespace-nowrap  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
