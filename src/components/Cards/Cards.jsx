import React, { useEffect, useState } from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import RegisterPopup from "../../layouts/RegisterPopup/RegisterPopup";
import addCarts from "../../store/cart/api/Post/addCarts";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { UpdateStatePropertyCart } from "../../store/cart/slice/CartSlice";
function Cards({ cardItems }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  console.log(carts.addCarts);
  useEffect(() => {
    const user = localStorage.getItem("userID");

    if (user !== undefined && user !== null) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    if (carts.status === true && carts.error === null) {
      toast.dismiss();
      toast.success("The product has been added.");
    } else if (carts.status === false && carts.error) {
      toast.dismiss();
      toast.error(`Error: ${carts.error}`);
    }
  }, [carts.status, carts.error, dispatch]);
  console.log(selectedItems);

  return (
    <div className="container my-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="row gx-md-5  gy-3">
        {cardItems.map((item) => (
          <div
            key={item.id}
            className="col-lg-3 col-md-6 mb-4"
            data-aos="fade-up"
          >
            <div className="card rounded-3 border-0 shadow card-hover">
              <div className=" mx-auto">
                <img
                  src={item.image}
                  width={300}
                  height={200}
                  className="p-4 object-fit-contain"
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title fs-6 fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="">${item.price}</p>
                  <div className="d-flex align-items-center gap-2">
                    <p
                      className={`rating d-flex align-items-center gap-1 ${
                        item.rating.rate < 2
                          ? "text-danger"
                          : item.rating.rate < 4
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      {item.rating.rate}
                      <FaStar />
                    </p>
                    <p> ({item.rating.count})</p>
                  </div>
                </div>
                <button
                  className="btn btn-warning text-uppercase"
                  onClick={() => {
                    setSelectedItems((prevSelectedItems) => {
                      return [
                        ...prevSelectedItems,
                        {
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          description: item.description,
                          category: item.category,
                          image: item.image,
                        },
                      ];
                    });

                    isLoggedIn
                      ? dispatch(
                          addCarts({
                            userId: Number(localStorage.getItem("userID")),
                            products: selectedItems,
                          })
                        )
                      : setShowPopup(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default Cards;
