import axios from "axios";
import { useState } from "react";
import { typeProductDetailsProps } from "./MultiStepForm";
import waiting from "../../assets/13520-blue-bird-waiting.gif";
import swal from "sweetalert";
// export interface IVerifyProductProps {}

export default function VerifyProduct({
  formStep,
  setFormStep,
  productDetails,
  setProductDetails,
}: typeProductDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const confirmProduct = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/followProduct`,
        productDetails
      );
      console.log(data);
      setIsLoading(false);
      setFormStep(3);
    } catch (error: any) {
      console.log(error);
      setFormStep(1);
      if (error.response.status === 405) {
        swal({
          icon: "warning",
          title: "Already Following",
          text: "Seems like you are already following this product pls try a different one",
        });
      } else {
        swal({
          icon: "error",
          title: "Oops, Something went wrong",
          text: "Seems like is has been an error pls try again in a few minutes or a try different product ",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded py-5">
      {isLoading ? (
        <div>
          <div>Waiting to confirm...</div>
          <img
            className="max-h-96 w-full object-contain"
            src={waiting}
            alt=""
          />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center ">
            <img
              className="object-contain
           w-full h-full max-h-60"
              src={productDetails.productImage}
              alt=""
            />
          </div>
          <form className=" px-8 pt-6 pb-8 mb-4 flex flex-col gap-7">
            <div className="">
              <label
                className="block text-gray-700 text-base font-bold mb-2"
                htmlFor="username"
              >
                {productDetails.productTitle}
              </label>
              <textarea
                value={productDetails.productLink}
                className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="username"
                placeholder="www.amazon.com/Product"
                rows={3}
                disabled
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-base font-bold mb-2"
                htmlFor="targetPrice"
              >
                Target Price
              </label>
              <input
                value={productDetails.targetPrice?.toString()}
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                id="targetPrice"
                type="number"
                placeholder="Number Target Price"
                disabled
              />
            </div>
            <div className="">
              <p className="block text-gray-700 text-base font-bold mb-2">
                The Current Price is :{" "}
                <span className="px-3 ml-2 shadow border py-1 rounded bg-gray-300">
                  {productDetails.currentPrice}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setFormStep(1);
                }}
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Go Back
              </button>
              <button
                onClick={confirmProduct}
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Verify
              </button>
            </div>
          </form>
        </>
      )}
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
