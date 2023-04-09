import { useState } from "react";
import productBanner from "../../assets/charlesdeluvio-p0Sn8X2htRs-unsplash.jpg";
import productHot from "../../assets/alejandro-luengo--c1-ZT-hLzM-unsplash.jpg";
import productPop from "../../assets/derick-david-paSLTZpHCdo-unsplash.jpg";

export default function ProductsHero() {
  return (
    <div className="flex gap-28 bg-gray-900 px-[5vw] py-[5vw]">
      <div className="w-8/12 flex flex-col justify-center py-10 px-10 gap-10  max-lg:w-full  max-lg:px-0 ">
        <div>
          <h1 className="font-bold text-6xl leading-none max-sm:text-4xl text-white">
            Discover new products with the best possibilities
          </h1>
          <p className="text-2xl text-gray-500 mt-5 font-light leading-tight max-sm:text-lg">
            Here at BargainHive we have you can see products at a different
            categories like technology, sportwear and some other products that
            you may have your interest.
          </p>
        </div>
        <div className="flex gap-10 max-sm:flex-col">
          <div className="w-1/2 relative max-sm:w-full max-sm:h-1/2">
            <img
              className="w-full h-full object-cover"
              src={productHot}
              alt="productHotImg"
            />
            <a
              href="#products"
              className="absolute inset-0 w-full h-full flex flex-col justify-end items-center bg-black bg-opacity-20 hover:bg-opacity-40 group cursor-pointer duration-300 ease-in-out"
            >
              <h1 className=" text-lg  font-semibold bg-white p-2 px-5 mb-5 rounded-sm   group-hover:rounded-3xl duration-300 ease-in-out ">
                Hot products
              </h1>
            </a>
            {/* <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center hover:opacity-100 hover:bg-black hover:bg-opacity-50 transition-all opacity-0 duration-300 ease-in-out cursor-pointer ">
              <h1 className="text-white text-3xl font-bold">Hot Products</h1>
              <a className="text-lg text-gray-400 underline mt-3" href="">
                View more
              </a>
            </div> */}
          </div>
          <div className="w-1/2 relative max-sm:w-full max-sm:h-1/2 ">
            <img
              className="w-full h-full object-cover "
              src={productPop}
              alt="productPopImg"
            />
            <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center bg-black bg-opacity-10 hover:bg-opacity-40 group cursor-pointer duration-300 ease-in-out">
              <h1 className=" text-lg font-semibold bg-white p-2 px-5 mb-5 rounded-sm   group-hover:rounded-3xl duration-300 ease-in-out">
                Popular products
              </h1>
            </div>
            {/* <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black ">
            <a className="text-lg text-gray-400 underline mt-3" href="">
                View more
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-1/3 max-lg:hidden">
        <img
          className="w-full h-full object-cover "
          src={productBanner}
          alt=""
        />
      </div>
    </div>
  );
}
