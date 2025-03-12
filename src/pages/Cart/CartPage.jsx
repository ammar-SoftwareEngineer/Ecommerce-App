import React, { useEffect } from "react";
import "./CartPage.css";
// Redux
import { useDispatch, useSelector } from "react-redux";
import getAllCarts from "../../store/cart/api/Get/getAllCarts";
import { IoIosArrowForward } from "react-icons/io";
import { FaBox } from "react-icons/fa";

function CartPage() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.allCarts);
  const userId = Number(localStorage.getItem("userID"));
  const cartsFilter = carts.filter((c) => c?.userId === userId);
  useEffect(() => {
    dispatch(getAllCarts(userId));
  }, [dispatch, userId]);
  return (
    <div className="container my-4" style={{ height: "80vh" }}>
      <h2 className="mb-4">Carts</h2>
      {carts?.length == 0 ? (
        <p className="text-center">There are currently no baskets.</p>
      ) : (
        <div className="row">
          {cartsFilter?.map((cart) => (
            <div key={cart.id} className="col-12 " data-aos="fade-up">
              <div className="card border-0 border-bottom shadow-sm   rounded-1 h-100 d-flex flex-row align-items-center gap-5 ps-4 ">
                <div
                  className=" d-flex justify-content-center align-items-center p-1 rounded-circle"
                  style={{ backgroundColor: "#e5d7cc",width:"60px",height:"60px" }}
                >
                  <FaBox style={{ color: "#cfb9a7" }} />
                </div>
                <div className="">
                  <div>
                    <h5 className="card-title mb-2">Order {cart.id}</h5>
                    <small className="text-muted">
                      Date: {new Date(cart.date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-body">
                  {cart.products.map((product, index) => (
                    <div key={index} className="mb-2">
                      <p className="mb-1 " style={{fontSize:"14px"}}>
                        <strong>Product # {product.productId}</strong> -
                        quantity {product.quantity || 1}
                      </p>
                    </div>
                  ))}
                </div>
                <div className=" text-end">
                  <button
                    className="btn  btn-sm"
                    onClick={() => alert(`More Details Carts #${cart.id}`)}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
