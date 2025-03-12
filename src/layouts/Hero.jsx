import React from "react";
import imageHome from "../assets/digital-wardrobe-transparent-screen.jpg";
function Hero() {
  return (
    <div>
      <div style={{ width: "100%", height: "50vh", position: "relative" }}>
        <img
          src={imageHome}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "100% 15%",
          }}
          loading="lazy"
          alt="Image Home"
        />
      </div>
    </div>
  );
}

export default Hero;
