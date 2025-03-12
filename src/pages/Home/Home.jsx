import React, { useEffect} from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Outlet } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
function Home() {
  useEffect(() => {
    AOS.init({ delay: 100, duration: 500, easing: "ease-out" });
    AOS.refresh();
  }, []);
  return (
    <div className=" min-vh-100">
      <>
        <Header />

        <Outlet />

        <Footer />
      </>
    </div>
  );
}

export default Home;
