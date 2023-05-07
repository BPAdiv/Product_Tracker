import * as React from "react";
import quickTrackImg from "../../assets/pexels-karolina-grabowska-5650016.jpg";
import { useNavigate } from "react-router-dom";

export default function QuickTrack() {
  const navigate = useNavigate();
  return (
    <div className="mx-[5vw] py-16">
      <div className=" w-full  relative flex items-center justify-center object-[50% 100%]">
        <img
          loading="lazy"
          src={quickTrackImg}
          alt="dining"
          style={{ objectPosition: "50% 70%" }}
          className="w-full h-full absolute z-0 object-cover "
        />

        <div className="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
          <h1 className="text-4xl font-semibold leading-9 text-white text-center">
            Don’t miss out!
          </h1>
          <p className="text-base leading-normal text-center text-white mt-6">
            Track a product now and we will let you know when the price went
            down,
            <br />
            and you will get a notification via email or telegram.
            <br />
            <span className="text-lg font-semibold">Easy!</span>
          </p>
          <div className="  flex-col sm:flex-row  flex items-center  mt-12 space-y-4 sm:space-y-0">
            {/* <input
              className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white"
              placeholder="Email Address"
            /> */}
            <button
              onClick={() => navigate("/addProduct")}
              className="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75"
            >
              Track Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
