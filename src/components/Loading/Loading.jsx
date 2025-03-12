import React from "react";
import { Hourglass } from "react-loader-spinner";
import "./Loading.css";

function Loading() {
  return (
    <div
      className="loading-overlay fixed-top d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "white" }}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#cfb9a7", "#e5d7cc"]}
      />
    </div>
  );
}

export default Loading;
