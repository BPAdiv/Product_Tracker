import * as React from "react";
import Confirmed from "../../assets/56149-amazon-tag.gif";
import { TourGuideContext } from "../../contexts/tourGuideContext";

export interface IConfirmProductProps {}

export default function ConfirmProduct(props: IConfirmProductProps) {
  const { trackProductTour, setTrackProductTour } =
    React.useContext(TourGuideContext);

  React.useEffect(() => {
    if (trackProductTour.run === false && trackProductTour.stepIndex === 6) {
      setTrackProductTour({ ...trackProductTour, run: true, stepIndex: 7 });
    }
  }, []);

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded   py-5 ">
      <div className="flex flex-col pb-5">
        <div className="text-center my-8 font-bold text-xl">
          <h1>Product confirmed and added to your following </h1>
        </div>
        <div className="mb-5">
          <img
            loading="lazy"
            className="object-contain w-full h-full max-h-96"
            src={Confirmed}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center gap-10">
          <a
            href="/"
            className="bg-blue-900  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Go Back Home
          </a>
          <a
            href="/addProduct"
            className="bg-blue-900  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Another Product
          </a>
        </div>
      </div>
    </div>
  );
}
