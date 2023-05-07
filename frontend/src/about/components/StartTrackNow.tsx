import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function StartTrackNow() {
  const navigate = useNavigate();
  return (
    <>
      {/* <section className="mb-32 text-gray-800 text-center md:text-left">
        <div className="flex flex-wrap justify-center">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-10/12 px-3">
            <div className="grid md:grid-cols-2 gap-x-6 items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold">
                  Do not miss any
                  <span className="text-blue-600"> opportunities.</span>
                </h2>
              </div>

              <div className="mb-6 md:mb-0">
                <div className="md:flex flex-row-reverse">
                  <button
                    onClick={() => navigate("/addProduct")}
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Track Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="flex items-center justify-center m-[5vw] max-md:flex-col gap-5 text-center">
        <div>
          {" "}
          <h2 className="text-4xl font-bold">
            Do not miss any
            <span className="text-blue-600"> opportunities.</span>
          </h2>
        </div>
        <div>
          {" "}
          <button
            onClick={() => navigate("/addProduct")}
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-base leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Track Now
          </button>
        </div>
      </div>
    </>
  );
}
