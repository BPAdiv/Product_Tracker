import axios from "axios";
import { useContext, useState } from "react";
import swal from "sweetalert";
import addIcon from "../assets/icons8-add-new-48.png";
import removeIcon from "../assets/icons8-add-new-48.png";
import { UserContext } from "../contexts/userContext";
import { IProductProps } from "../types";
import NeedToLogin from "./NeedToLogin";
type Product = {
  product: IProductProps;
};

export default function AddFollowModal({ product }: Product) {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [newTargetPrice, setNewTargetPrice] = useState<Number | undefined>(
    undefined
  );

  //   const checkProductFolowing = (): boolean => {
  //     if (!user) return false;
  //     const isFoll = product.followers.find((u) => {
  //       if (user && typeof u.userId !== "string") {
  //         return u.userId._id === user._id;
  //       }
  //     });
  //     return isFoll ? true : false;
  //   };
  //   const isFollowing = checkProductFolowing();
  const handleSumbitNewFollow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/followProduct`,
        {
          targetPrice: newTargetPrice,
          productAsin: product.productAsin,
          currentPrice: product.currentPrice,
          userId: user._id,
        }
      );
      console.log(data);
      setShowModal(false);
      swal({
        title: "New Follow!",
        text: "Product has been added to your followings!",
        icon: "success",
        timer: 1500,
        buttons: [false],
      });
    } catch (error) {
      console.log(error);
      swal({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <>
      <button
        // className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => (user ? setShowModal(true) : setIsLogin(true))}
      >
        <img className="w-8 h-8" src={addIcon} alt="" />
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-screen">
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-5">
              {/*content*/}
              <form
                onSubmit={(e) => handleSumbitNewFollow(e)}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                <div className="p-5 border-b">
                  <h1 className="text-center text-3xl max-md:text-2xl font-semibold">
                    Add New Product
                  </h1>
                </div>
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <img src={product.image} alt="" />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg max-md:text-base leading-relaxed">
                    {product.title}
                  </p>
                </div>
                <div className=" px-6 mb-5">
                  <h1 className="mb-3  text-lg max-md:text-base font-semibold">
                    Current price
                  </h1>
                  <input
                    value={product.currentPrice || "nope"}
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                    id="targetPrice"
                    // type="number"
                    placeholder="New Number Target Price"
                    required
                    disabled
                    onChange={(e) => setNewTargetPrice(Number(e.target.value))}
                  />
                  <h1 className="mb-3 max-md:text-base  text-lg font-semibold">
                    Enter your target price
                  </h1>
                  <input
                    // value={product.?.toString()}
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                    id="targetPrice"
                    type="number"
                    placeholder="Number Target Price"
                    required
                    onChange={(e) => setNewTargetPrice(Number(e.target.value))}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500  bg-white hover:bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-700 focus:z-10 dark:bg-gray-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-red-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {isLogin ? (
        <NeedToLogin isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : null}
    </>
  );
}
