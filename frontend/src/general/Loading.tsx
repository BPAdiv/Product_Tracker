import * as React from "react";
import loading from "../assets/99297-loading-files.gif";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] ">
      <h1 className="text-4xl max-sm:text-2xl mb-3">Loading...</h1>
      <img className="object-contain  max-h-[50vh] " src={loading} />
    </div>
  );
}
