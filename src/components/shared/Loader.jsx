import React from "react";
import { RotatingLines, ThreeCircles, Vortex } from "react-loader-spinner";

function Loader({ text }) {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-1">
        {/* <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
        <Vortex
          visible={true}
          height="96"
          width="96"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
        <p className="text-slate-800">{text ? text : "Please wait...."}</p>
      </div>
    </div>
  );
}

export default Loader;
