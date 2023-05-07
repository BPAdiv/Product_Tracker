import { useState } from "react";
import img1 from "../../assets/pexels-abdullah-alsaibaie-10853637.jpg";
import img2 from "../../assets/pexels-pixabay-277390.jpg";
import img3 from "../../assets/pexels-pixabay-4158.jpg";
export default function UserNewProduct() {
  return (
    <div className="w-full  flex justify-between items-center my-[5vw]  ">
      <div className="flex flex-col md:flex-row  gap-5 ">
        <div className=" flex flex-col  w-1/2 max-md:w-full h-auto  gap-5  ">
          <div>
            <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">
              Track another
            </p>
          </div>
          <div className="mt-4 lg:w-4/5 xl:w-3/5">
            <p className="text-base leading-6 text-gray-600">
              You can easyily add a new product and we will do the job for and
              will let you know when the price has changed.
              {/* It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. */}
            </p>
          </div>
          <div className=" w-full mt-auto">
            <a
              href="/addProduct"
              className="px-4 bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700"
            >
              <p className="text-xl font-medium leading-5">Add Now</p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66663 16H25.3333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21.3333L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 10.6667L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid  w-1/2 max-md:w-full grid-cols-2 grid-rows-2  gap-5">
          <img
            loading="lazy"
            className="row-span-2  object-cover h-full "
            src={img1}
            alt="sofa"
          />

          <img loading="lazy" className=" object-contain " src={img2} alt="" />
          <img loading="lazy" className=" object-contain" src={img3} alt="" />
        </div>
      </div>
    </div>
  );
}
