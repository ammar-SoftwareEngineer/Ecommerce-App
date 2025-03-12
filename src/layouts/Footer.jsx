import React from "react";

function Footer() {
  const today = new Date().toLocaleDateString("EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="bg-light text-center py-3 mt-4 footer">
      <p className=" text-uppercase"><span className=" text-primary fw-bold">Momentum </span><span className=" text-success fw-bold">Solutions</span> - {today}</p>
    </footer>
  );
}

export default Footer;
