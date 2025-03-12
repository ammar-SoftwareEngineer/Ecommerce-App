import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

function Header() {
  const carts = useSelector((state) => state.carts);
  console.log(carts.addCarts);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header px-4">
      <div className=" container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Ecommerce
        </Link>
        <div className=" d-flex align-items-center gap-5 ">
          <Link className="nav-link" to="/">
            Products
          </Link>
          <Link className="nav-link position-relative" to="/cart">
            <p
              className=" position-absolute   translate-middle d-flex justify-content-center align-items-center w-25 h-25  bg-warning rounded-circle"
              style={{ left: "20px", top: "5px", padding: "9px" }}
            >
              {carts.addCarts?.products?.length || 0}
            </p>
            <AiOutlineShoppingCart size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
