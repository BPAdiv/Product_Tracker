import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { IProductFormDetails, typeProductDetailsProps } from "./MultiStepForm";
import Searching from "../../assets/72785-searching.gif";
import swal from "sweetalert";
import { TourGuideContext } from "../../contexts/tourGuideContext";
// export interface IEnterProductProps {}
interface IProductFormTemp extends IProductFormDetails {
  [key: string]: any;
}
export default function EnterProduct({
  formStep,
  setFormStep,
  productDetails,
  setProductDetails,
}: typeProductDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { trackProductTour, setTrackProductTour } =
    useContext(TourGuideContext);
  const verifyAmazonProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setTrackProductTour({ ...trackProductTour, run: false });
    if (!productDetails.productLink || !productDetails.targetPrice)
      return alert("target Price and Link required");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/verifyProduct`,
        productDetails
      );
      setProductDetails((prev) => ({ ...prev, ...data }));
      console.log(data);

      setFormStep(2);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      if (error.response.status === 403) {
        swal({
          icon: "warning",
          title: "Link is unvalid",
          text: "Seems like you entered an unvalid amazon link and we could not found it. pls try a different link",
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

  const handleChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key = e.target.id;
    const value =
      key === "targetPrice" ? parseInt(e.target.value) : e.target.value;
    const temp: IProductFormTemp = { ...productDetails };
    temp[key] = value;
    setProductDetails({ ...temp });
  };
  //   useEffect(() => {
  //     const storageDetails = localStorage.getItem("productDetails");
  //     if (!storageDetails) return;
  //     console.log(JSON.parse(storageDetails));

  //     setProductDetails({ ...JSON.parse(storageDetails) });
  //   }, []);
  return (
    <>
      <div className="w-full max-w-2xl bg-white shadow-md rounded  py-5">
        {isLoading ? (
          <div>
            <h1 className="font-bold text-xl text-center">Scanning...</h1>
            <img loading="lazy" src={Searching} alt="" />
          </div>
        ) : (
          <form
            className=" px-8 pt-6 pb-8 mb-4 flex flex-col gap-7"
            onSubmit={(e) => verifyAmazonProduct(e)}
          >
            <div className="mb-4 follow-step-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productLink"
              >
                Product Link
              </label>
              <textarea
                value={productDetails.productLink}
                className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="productLink"
                placeholder="https://www.amazon.com/AmazonBasics-Matte-Keyboard-QWERTY-Layout/dp/B07WJ5D3H4"
                rows={3}
                onChange={(e) => handleChangeInput(e)}
                required
              />
            </div>
            <div className="mb-6 follow-step-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
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
                required
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline follow-step-4"
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        )}
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </>
  );
}
