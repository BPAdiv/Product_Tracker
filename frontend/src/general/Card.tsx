import { useContext } from "react";
import { IProductProps } from "../types";
import addIcon from "../../assets/icons8-add-new-48.png";
import editIcon from "../../assets/icons8-pen-squared-32.png";
import AddFollowModal from "./AddFollowModal";
import EditTargetPrice from "./EditTargetPrice";
import { UserContext } from "../contexts/userContext";
import DeleteProductModal from "./DeleteProductModal";
import { useNavigate } from "react-router-dom";

type Product = {
  product: IProductProps;
};
export default function Card({ product }: Product) {
  const { user } = useContext(UserContext);
  const checkIsFollowing = () => {
    if (!user) return false;
    const T = product.followers.find(
      (Fuser) =>
        typeof Fuser.userId !== "string" && Fuser.userId._id === user._id
    );

    return T ? true : false;
  };
  const isFollowing = checkIsFollowing();
  const navigate = useNavigate();
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow  p-4  ">
      <div className="flex justify-between items-center mb-3">
        <EditTargetPrice product={product} />
        {isFollowing ? (
          <DeleteProductModal product={product} />
        ) : (
          <AddFollowModal product={product} />
        )}
      </div>
      <a
        href={`${window.location.origin}/product/${product.productAsin}`}
        className="w-full h-[7vw] min-h-[5rem] mb-2 cursor-pointer block"
      >
        <img
          className=" rounded-t-lg w-full h-full object-contain "
          src={product.image}
          alt="product image"
        />
      </a>
      <div className="flex flex-col ">
        <a
          href={`${window.location.origin}/product/${product.productAsin}`}
          className="my-3 cursor-pointer"
        >
          <h5 className="text-base max-sm:text-sm font-semibold tracking-tight text-gray-900  line-clamp-2 ">
            {product.title}
          </h5>
        </a>
        <a
          href={`${window.location.origin}/product/${product.productAsin}`}
          className="flex items-center cursor-pointer "
        >
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold  rounded  p-1 ">
            Watching
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold  rounded  p-1 px-2 ml-2 ">
            {product.followers.length}
          </span>
        </a>
        <div className="flex items-center justify-between mt-5">
          <span className="text-base font-bold text-gray-900 ">
            {product.currentPrice}
          </span>
          {product.currentPrice.includes("$") ? (
            <a
              href={`${window.location.origin}/product/${product.productAsin}`}
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded text-xs lg:text-sm p-[0.3em] text-center"
            >
              Buy Now
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
