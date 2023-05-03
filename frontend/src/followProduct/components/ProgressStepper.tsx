import * as React from "react";
interface StepperProps {
  formStep: number;
}
export default function ProgressStepper({ formStep }: StepperProps) {
  return (
    <ol className="flex  w-full  max-w-2xl bg-white shadow-md rounded follow-step-1  ">
      <li
        className={`w-1/3 flex items-center text-white space-x-2.5 ${
          formStep === 1 ? "bg-blue-900" : "bg-blue-800 bg-opacity-75 "
        }  py-3  px-4  max-sm:flex-col max-sm:text-center  max-sm:gap-2  max-sm:space-x-0 rounded-tl-md duration-300 ease-in-out`}
      >
        <span className="flex items-center justify-center w-8 h-8 border  rounded-full shrink-0 ">
          {formStep === 1 ? (
            "1"
          ) : (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white lg:w-6 lg:h-6 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          )}
        </span>
        <span>
          <h3 className="font-medium leading-tight">Enter product</h3>
        </span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4 max-sm:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li
        className={` w-1/3 flex items-center  text-gray-400 space-x-2.5 ${
          formStep === 2
            ? "bg-blue-900 text-white "
            : "bg-gray-300   border-gray-400 border "
        } ${
          formStep === 3 && "bg-blue-800 bg-opacity-75 text-white"
        } py-3  px-4  max-sm:flex-col max-sm:text-center  max-sm:gap-2  max-sm:space-x-0 duration-300 ease-in-out`}
      >
        <span className="flex items-center justify-center w-8 h-8 border  rounded-full shrink-0 border-gray-400 ">
          {formStep !== 3 ? (
            "2"
          ) : (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white lg:w-6 lg:h-6 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          )}
        </span>
        <span>
          <h3 className="font-medium leading-tight">Verify product</h3>
        </span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4  max-sm:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li
        className={` w-1/3 flex items-center text-gray-400 space-x-2.5 max-sm:space-x-0 ${
          formStep === 3
            ? "bg-blue-900 text-white"
            : "bg-gray-300   border-gray-400 border"
        }  py-3  px-4 max-sm:justify-center max-sm:flex-col   max-sm:gap-2 rounded-tr-md duration-300 ease-in-out`}
      >
        <span className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full shrink-0 ">
          {formStep !== 3 ? (
            "3"
          ) : (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white lg:w-6 lg:h-6 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          )}
        </span>
        <span>
          <h3 className="font-medium leading-tight max-sm:text-center   ">
            Product confirmed
          </h3>
        </span>
      </li>
    </ol>
  );
}
