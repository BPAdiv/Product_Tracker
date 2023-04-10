import * as React from "react";
import startIl from "../../assets/Launching-amico.png";
export interface IStartStepsProps {}

export default function StartSteps(props: IStartStepsProps) {
  return (
    <section className="mb-32 text-gray-800 text-center md:text-left px-[5vw]">
      <h2 className="text-4xl font-bold mb-16 text-center  ">
        So how to get started?
      </h2>
      <div className="block rounded-lg shadow-lg bg-white">
        <div className="flex  flex-wrap-reverse items-center border rounded-lg">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-8/12">
            <div className="px-6 py-12 md:px-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-600">
                Here are the steps
              </h2>
              <div className="flex flex-col gap-5">
                <div className="max-w-lg">
                  <h1 className="font-bold text-xl mb-2">
                    <span className=" text-blue-600">Step 1</span> : Sign Up or
                    Log In
                  </h1>
                  <p className="text-lg">
                    First, sign up for a user account or log in if you already
                    have an account. This will give you access to all of our
                    features and allow you to start tracking products.
                  </p>
                </div>
                <div className="max-w-lg">
                  <h1 className="font-bold text-xl mb-2">
                    <span className=" text-blue-600">Step 2</span>: Enter
                    Product with Link and Price
                  </h1>
                  <p className="text-lg">
                    Next, enter the product you want to track by providing us
                    with the link and price. You can also add notes or comments
                    to help you remember why you're tracking the product.
                  </p>
                </div>
                <div className="max-w-lg">
                  <h1 className="font-bold text-xl mb-2">
                    {" "}
                    <span className=" text-blue-600">Step 3</span>: Verify and
                    Confirm
                  </h1>
                  <p className="text-lg">
                    We verify the product information to ensure that we are
                    tracking the correct product. Once verified, you will
                    receive a confirmation that the product is being tracked.
                    You can sit back and relax while we monitor the price for
                    you and notify you when it drops below the threshold you
                    set.
                  </p>
                </div>
                <div className="max-w-3xl mt-5">
                  <p className=" text-xl font-semibold">
                    With these three simple steps, you can effortlessly track
                    the prices of your desired products on Amazon and save time
                    and money. Join our community of savvy shoppers today and
                    start enjoying the benefits of effortless price tracking!
                  </p>
                </div>
              </div>
              {/* <p className="text-gray-500 mb-6 pb-2">
                Nunc tincidunt vulputate elit. Mauris varius purus malesuada
                neque iaculis malesuada. Aenean gravida magna orci, non
                efficitur est porta id. Donec magna diam.
              </p> */}
            </div>
          </div>
          <div className="grow-0 shrink-0 basis-auto block lg:flex w-full md:w-4/12">
            <img
              src={startIl}
              alt="Trendy Pants and Shoes"
              className="w-full rounded-t-lg md:rounded-tr-none md:rounded-bl-lg"
            />
          </div>
        </div>
      </div>
      {/* <div>
        <div className="">
          <p className="text-lg font-semibold text-center">
            With these three simple steps, you can effortlessly track the prices
            of your desired products on Amazon and save time and money. Join our
            community of savvy shoppers today and start enjoying the benefits of
            effortless price tracking!
          </p>
        </div>
      </div> */}
    </section>
  );
}
