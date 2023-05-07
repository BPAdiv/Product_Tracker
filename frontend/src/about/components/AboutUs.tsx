import * as React from "react";
import lifeStyleimg from "../../assets/Modern life-cuate.png";
export interface IAboutUsProps {}

export default function AboutUs(props: IAboutUsProps) {
  return (
    <>
      <section className="mb-32 px-[5vw] ">
        <div className="flex flex-wrap">
          <div className="grow-0 shrink-0  basis-auto w-full lg:w-5/12 mb-12 lg:mb-0">
            <div className="flex lg:py-12  ">
              <img
                loading="lazy"
                src={lifeStyleimg}
                className="w-full bg-white rounded-lg shadow-lg lg:z-10 lg:ml-14"
                alt=""
              />
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12 relative bg-transparent">
            {/* <svg
              width="100%"
              height="100%"
              id="svg"
              viewBox="0 0 1440 690"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 "
            >
              <path
                d="M 0,700 C 0,700 0,175 0,175 C 82.35714285714289,158.82142857142856 164.71428571428578,142.64285714285714 300,150 C 435.2857142857142,157.35714285714286 623.4999999999998,188.25 744,180 C 864.5000000000002,171.75 917.2857142857144,124.35714285714285 1022,117 C 1126.7142857142856,109.64285714285715 1283.3571428571427,142.32142857142858 1440,175 C 1440,175 1440,700 1440,700 Z"
                stroke="none"
                stroke-width="0"
                fill="#0693e3"
                fill-opacity="0.4"
                // className="transition-all duration-300 ease-in-out delay-150 path-0"
                transform="rotate(-180 720 350)"
              ></path>
              <path
                d="M 0,700 C 0,700 0,350 0,350 C 111.5,360 223,370 349,385 C 475,400 615.4999999999999,420 729,405 C 842.5000000000001,390 929,340 1043,325 C 1157,310 1298.5,330 1440,350 C 1440,350 1440,700 1440,700 Z"
                stroke="none"
                stroke-width="0"
                fill="#0693e3"
                fill-opacity="0.53"
                // className="transition-all duration-300 ease-in-out delay-150 path-1"
                transform="rotate(-180 720 350)"
              ></path>
              <path
                d="M 0,700 C 0,700 0,525 0,525 C 114.85714285714286,543.6071428571429 229.71428571428572,562.2142857142857 353,572 C 476.2857142857143,581.7857142857143 608,582.75 735,561 C 862,539.25 984.2857142857142,494.7857142857143 1101,485 C 1217.7142857142858,475.2142857142857 1328.857142857143,500.1071428571429 1440,525 C 1440,525 1440,700 1440,700 Z"
                stroke="none"
                stroke-width="0"
                fill="#0693e3"
                fill-opacity="1"
                className="transition-all duration-300 ease-in-out delay-150 path-2"
                transform="rotate(-180 720 350)"
              ></path>
            </svg> */}
            <svg
              id="wave"
              style={{ transform: "rotate(180deg)", transition: " 0.3s" }}
              viewBox="0 0 1440 490"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 -z-10 rounded-lg"
            >
              <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                  <stop stop-color="rgba(128, 193, 251, 1)" offset="0%"></stop>
                  <stop
                    stop-color="rgba(192, 232, 255, 1)"
                    offset="100%"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                style={{ transform: "translate(0, 0px)", opacity: "1" }}
                fill="url(#sw-gradient-0)"
                d="M0,98L48,89.8C96,82,192,65,288,49C384,33,480,16,576,24.5C672,33,768,65,864,98C960,131,1056,163,1152,155.2C1248,147,1344,98,1440,98C1536,98,1632,147,1728,196C1824,245,1920,294,2016,294C2112,294,2208,245,2304,245C2400,245,2496,294,2592,294C2688,294,2784,245,2880,261.3C2976,278,3072,359,3168,375.7C3264,392,3360,343,3456,269.5C3552,196,3648,98,3744,65.3C3840,33,3936,65,4032,122.5C4128,180,4224,261,4320,261.3C4416,261,4512,180,4608,171.5C4704,163,4800,229,4896,269.5C4992,310,5088,327,5184,343C5280,359,5376,376,5472,343C5568,310,5664,229,5760,204.2C5856,180,5952,212,6048,236.8C6144,261,6240,278,6336,310.3C6432,343,6528,392,6624,343C6720,294,6816,147,6864,73.5L6912,0L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"
              ></path>
            </svg>

            <div className=" h-full rounded-lg p-6 lg:pl-12 shadow-md border flex items-center text-center lg:text-left">
              <div className="lg:pl-12">
                <h2 className="text-3xl font-bold mb-6">
                  The Solution to Your Busy Lifestyle
                </h2>

                <p className="text-xl text-gray-700  leading-relaxed ">
                  Our website allows you to track the prices of your desired
                  products on Amazon effortlessly. All you need to do is log in
                  and provide us with the link and price of the product you want
                  to track. Once you've entered the information, you can forget
                  about it and let us do the rest. We will monitor the price for
                  you and notify you when it drops below the price you
                  specified. This way, you can save time and money without
                  having to constantly check the price yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-32 text-gray-800 text-center px-[5vw]">
        <h2 className="text-4xl font-bold mb-12">
          Why is it so<u className="text-5xl text-blue-600"> great?</u>
        </h2>
        <div className="grid md:grid-cols-3 lg:gap-x-12">
          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Calendar / Alarm">
                  <path
                    id="Vector"
                    d="M12 7V12H17M21.0036 4.57115L17.9395 2M6.06418 2L3 4.57115M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
              {/* <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
                ></path>
              </svg> */}
            </div>
            <h5 className="text-xl font-bold mb-4">Save Time and Money</h5>
            <p className="text-gray-500 text-lg">
              Our website makes online shopping easier and more convenient for
              you. You can track prices of your desired products on Amazon
              without having to constantly check the prices yourself. This saves
              you time and helps you find great deals, which ultimately saves
              you money.
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                ></path>
              </svg>
            </div>
            <h5 className="text-xl font-bold mb-4">User-Friendly and Secure</h5>
            <p className="text-gray-500 text-lg">
              Our website is user-friendly and easy to navigate. We take your
              privacy seriously, so your personal information is safe with us.
              Our team is dedicated to providing you with the best customer
              service and making your online shopping experience as seamless as
              possible.
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6">
              <svg
                fill="currentColor"
                className="w-6 h-6 text-white"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>eye</title>
                <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path>
              </svg>
              {/* <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                ></path>
              </svg> */}
            </div>
            <h5 className="text-xl font-bold mb-4">
              See What Others Are Tracking
            </h5>
            <p className="text-gray-500 text-lg">
              Our website allows you to see what other users are tracking and
              the current price of those products. This gives you an idea of
              what products are in demand and how the prices are fluctuating.
              You can make informed decisions about your purchases and stay
              up-to-date with popular products.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
