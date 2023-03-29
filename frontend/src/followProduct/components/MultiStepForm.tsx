import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import ConfirmProduct from "./ConfirmProduct";
import EnterProduct from "./EnterProduct";
import VerifyProduct from "./VerifyProduct";

export interface IProductFormDetails {
  productLink: string;
  targetPrice: number | null;
  productTitle: string;
  productImage: string;
  currentPrice: string;
  productAsin: string;
  userId: string;
}
//  export interface IFormStep{
// }
export interface typeProductDetailsProps {
  formStep: number;
  setFormStep: Dispatch<SetStateAction<number>>;
  productDetails: IProductFormDetails;
  setProductDetails: Dispatch<SetStateAction<IProductFormDetails>>;
}

export default function MultiStepsForm() {
  const { user, setUser } = useContext(UserContext);

  const [formStep, setFormStep] = useState<number>(1);
  const [productDetails, setProductDetails] = useState<IProductFormDetails>({
    productLink: "",
    targetPrice: null,
    productTitle: "",
    productImage: "",
    currentPrice: "",
    productAsin: "",
    userId: user ? user._id : "",
  });
  console.log(productDetails);

  return (
    <>
      <div className="flex justify-center items-center mx-[5vw] mt-10">
        {formStep === 1 && (
          <EnterProduct
            formStep={formStep}
            setFormStep={setFormStep}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
          />
        )}
        {formStep === 2 && (
          <VerifyProduct
            formStep={formStep}
            setFormStep={setFormStep}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
          />
        )}
        {formStep === 3 && <ConfirmProduct />}
      </div>
    </>
  );
}
