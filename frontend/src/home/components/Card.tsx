import * as React from "react";
import { IProductProps } from "../../types";
// export interface IUser {
//   _id: string;
//   email: string;
//   password: string;
//   userName: string;
//   telegramId: string;
//   role?: string;
//   phoneNumber?: string;
//   country?: string;
// }
// export interface IFollowUser {
//   userId: IUser | string;
//   targetPrice: number;
// }
// export interface IProductProps {
//   _id: string;
//   productAsin: string;
//   image?: string;
//   title?: string;
//   previousPrice?: string;
//   currentPrice?: string;
//   createdAt: Date;
//   lastUpdated?: Date;
//   category?: string;
//   company?: string;
//   country?: string;
//   followers: IFollowUser[];
// }
type Product = {
  product: IProductProps;
};
export default function Card({ product }: Product) {
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4  ">
      <div className="w-full h-[7vw] mb-2">
        <img
          className=" rounded-t-lg w-full h-full object-contain"
          src={product.image}
          alt="product image"
        />
      </div>
      <div className="flex flex-col ">
        <div className="my-3">
          <h5 className="text-base max-sm:text-sm font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 ">
            {product.title}
          </h5>
        </div>
        <div className="flex items-center  ">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold  rounded dark:bg-blue-200 dark:text-blue-800 p-1 ">
            Watching
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold  rounded dark:bg-blue-200 dark:text-blue-800 p-1 px-2 ml-2 ">
            {product.followers.length}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {product.currentPrice}
          </span>
          <a
            href={product.productAsin}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs lg:text-sm p-[0.3em] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
