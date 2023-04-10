import * as React from "react";

export interface IAboutHeaderProps {}

export default function AboutHeader(props: IAboutHeaderProps) {
  return (
    <section className="mb-40">
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/142.jpg)",
          height: " 500px",
        }}
      ></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-32">
        <div className="text-center text-gray-800">
          <div
            className="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
            style={{
              marginTop: "-170px",
              background: " hsla(0, 0%, 100%, 0.7)",
              backdropFilter: "blur(30px)",
            }}
          >
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
              Make online shopping easier and more convenient <br />
              <span className="text-blue-600">for you!</span>
            </h1>
            <p
              className="opacity-70 text-xl"
              style={{ color: ":hsl(218, 81%, 85%)" }}
            >
              We understand that you have a busy lifestyle and may not have the
              time to constantly check the prices of your desired products on
              Amazon. That's why we created this website to provide a solution
              to that problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
