import react from "react";
import heroImg from "../../assets/phone-mockup.png";

export default function HeroSection() {
  return (
    <section className=" bg-gray-900">
      <div className="  p-[5vw] flex  max-md:flex-col-reverse gap-3  ">
        <div className="w-1/2 flex flex-col max-md:w-full">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Best price for your product
          </h1>
          <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            From looking around and watch for price changes, our website will
            provide you with the latest price for your product.
            {/* From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack. */}
          </p>
          <div className="mt-auto">
            <a
              href="/getStarted"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-900 "
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="/products/all"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  border  rounded-lg  focus:ring-4  text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
            >
              See Products
            </a>
          </div>
        </div>
        <div className="w-1/2 max-md:w-full  ">
          <img
            className="w-full h-full max-h-96  object-contain "
            src={heroImg}
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}
