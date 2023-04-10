import { LegacyRef, useEffect, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Next from "../../assets/icons8-next-page-50.png";
import Prev from "../../assets/icons8-back-to-50.png";
import Card from "./Card";
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
  products: IProductProps[] | undefined;
};
export default function CardCarusel({ products }: Product) {
  const carouselRef = useRef<AliceCarousel>(null);

  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   768: { items: 3 },
  //   1024: { items: 4 },
  // };
  // const handleNextClick = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.slideNext();
  //   }
  // };
  // const handlePrevClick = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.slidePrev();
  //   }
  // };
  // const items = products
  //   ?.map((product, index) => {
  //     return <Card product={product} key={index} />;
  //   })
  //   .concat(
  //     products?.map((product, index) => {
  //       return <Card product={product} key={index} />;
  //     })
  //   );

  //   const items = [
  //     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href="#">
  //         <img
  //           className="p-8 rounded-t-lg"
  //           src="/docs/images/products/apple-watch.png"
  //           alt="product image"
  //         />
  //       </a>
  //       <div className="px-5 pb-5">
  //         <a href="#">
  //           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
  //             Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
  //           </h5>
  //         </a>
  //         <div className="flex items-center mt-2.5 mb-5">
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>First star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Second star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Third star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fourth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fifth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
  //             5.0
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">
  //             $599
  //           </span>
  //           <a
  //             href="#"
  //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //           >
  //             Add to cart
  //           </a>
  //         </div>
  //       </div>
  //     </div>,
  //     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href="#">
  //         <img
  //           className="p-8 rounded-t-lg"
  //           src="/docs/images/products/apple-watch.png"
  //           alt="product image"
  //         />
  //       </a>
  //       <div className="px-5 pb-5">
  //         <a href="#">
  //           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
  //             Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
  //           </h5>
  //         </a>
  //         <div className="flex items-center mt-2.5 mb-5">
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>First star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Second star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Third star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fourth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fifth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
  //             5.0
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">
  //             $599
  //           </span>
  //           <a
  //             href="#"
  //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //           >
  //             Add to cart
  //           </a>
  //         </div>
  //       </div>
  //     </div>,
  //     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href="#">
  //         <img
  //           className="p-8 rounded-t-lg"
  //           src="/docs/images/products/apple-watch.png"
  //           alt="product image"
  //         />
  //       </a>
  //       <div className="px-5 pb-5">
  //         <a href="#">
  //           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
  //             Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
  //           </h5>
  //         </a>
  //         <div className="flex items-center mt-2.5 mb-5">
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>First star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Second star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Third star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fourth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fifth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
  //             5.0
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">
  //             $599
  //           </span>
  //           <a
  //             href="#"
  //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //           >
  //             Add to cart
  //           </a>
  //         </div>
  //       </div>
  //     </div>,
  //     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href="#">
  //         <img
  //           className="p-8 rounded-t-lg"
  //           src="/docs/images/products/apple-watch.png"
  //           alt="product image"
  //         />
  //       </a>
  //       <div className="px-5 pb-5">
  //         <a href="#">
  //           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
  //             Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
  //           </h5>
  //         </a>
  //         <div className="flex items-center mt-2.5 mb-5">
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>First star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Second star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Third star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fourth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fifth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
  //             5.0
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">
  //             $599
  //           </span>
  //           <a
  //             href="#"
  //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //           >
  //             Add to cart
  //           </a>
  //         </div>
  //       </div>
  //     </div>,
  //     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href="#">
  //         <img
  //           className="p-8 rounded-t-lg"
  //           src="/docs/images/products/apple-watch.png"
  //           alt="product image"
  //         />
  //       </a>
  //       <div className="px-5 pb-5">
  //         <a href="#">
  //           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
  //             Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
  //           </h5>
  //         </a>
  //         <div className="flex items-center mt-2.5 mb-5">
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>First star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Second star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Third star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fourth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <svg
  //             aria-hidden="true"
  //             className="w-5 h-5 text-yellow-300"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <title>Fifth star</title>
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //           </svg>
  //           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
  //             5.0
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">
  //             $599
  //           </span>
  //           <a
  //             href="#"
  //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //           >
  //             Add to cart
  //           </a>
  //         </div>
  //       </div>
  //     </div>,
  //   ];

  return (
    <>
      <div className="grid   justify-items-center  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3  gap-5">
        {products?.map((product, index) => {
          return <Card product={product} key={index} />;
        })}
        {products?.map((product, index) => {
          return <Card product={product} key={index} />;
        })}
      </div>
      {/* <div className="flex items-center justify-around">
        <div className="px-5 ">
          <img
            className="cursor-pointer min-w-fit"
            src={Prev}
            alt=""
            onClick={handlePrevClick}
          />
        </div>
        <div className="w-[80%]">
          <AliceCarousel
            ref={carouselRef}
            mouseTracking
            // autoHeight
            items={items}
            responsive={responsive}
            disableDotsControls
            disableButtonsControls
            controlsStrategy="alternate"
          />
        </div>
        <div className="px-5">
          <img
            className="cursor-pointer min-w-fit"
            src={Next}
            alt=""
            onClick={handleNextClick}
          />
        </div>
      </div> */}
    </>
  );
}
