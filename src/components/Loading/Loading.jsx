import React from "react";
import { ClockLoader } from "react-spinners";
import "./Loading.css";

function Loading() {
  return (
    <div
      className="loading-overlay fixed-top d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "white" }}
    >
     <ClockLoader 
        color={"#cfb9a7"}
        size={100}
      />
    </div>
  );
}

export default Loading;
