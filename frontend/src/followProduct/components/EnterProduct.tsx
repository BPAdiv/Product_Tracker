import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IProductFormDetails, typeProductDetailsProps } from "./MultiStepForm";
import Searching from "../../assets/72785-searching.gif";
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
  const verifyAmazonProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!productDetails.productLink || !productDetails.targetPrice)
      return alert("target Price and Link required");

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/product/verifyProduct",
        productDetails
      );
      setProductDetails((prev) => ({ ...prev, ...data }));
      console.log(data);
      setFormStep(2);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
            <img src={Searching} alt="" />
          </div>
        ) : (
          <form
            className=" px-8 pt-6 pb-8 mb-4 flex flex-col gap-7"
            onSubmit={(e) => verifyAmazonProduct(e)}
          >
            <div className="mb-4">
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
                placeholder="www.amazon.com/Product"
                rows={3}
                onChange={(e) => handleChangeInput(e)}
                required
              />
            </div>
            <div className="mb-6">
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
