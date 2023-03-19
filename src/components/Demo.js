import React from "react";
import { Link } from "react-router-dom";

function Demo(props) {
  return (
    <section>
      <div className="container mx-auto my-10">
        <div className="mb-4 py-4 flex flex-col lg:flex-row bg-violet-700 rounded-xl">
          <div className="mx-10 w-1/2 ">
            <p className="text-sm font-normal text-start text-white ">
              Take a video tour
            </p>
            <h2 className="text-3xl py-3 tracking-widest text-start text-white font-bold pr-5">
              Watch the video or taking your decision easily
            </h2>
            <Link
              to=""
              className="text-white underline text-sm font-normal flex justify-start"
            >
              view all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;
