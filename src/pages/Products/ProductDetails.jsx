// Hooks React
import React, { useEffect,useState } from "react";

import RegisterPopup from "../../layouts/RegisterPopup/RegisterPopup";
import addCarts from "../../store/cart/api/Post/addCarts";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import getOneProduct from "../../store/product/api/Get/getOneProduct";

import Loading from "../../components/Loading/Loading";

import { MdArrowBackIos } from "react-icons/md";
import { UpdateStatePropertyProducts } from "../../store/product/slice/ProductSlice";
function ProductDetails() {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const oneProduct = products.oneProduct;

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);
  const dispatchCarts = useDispatch();
  const carts = useSelector((state) => state.carts);

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
  }, [carts.status, carts.error]);

 
  return (
    <>
      <div className="px-4 mt-4">
          <Toaster position="top-center" reverseOrder={false} />
        <button
          className="btn d-flex align-items-center"
          onClick={() => {
            navigate(`/products`);
            dispatch(
              UpdateStatePropertyProducts({
                path: "oneProduct",
                value: [],
              })
            );
          }}
        >
          <MdArrowBackIos />
          Back
        </button>
      </div>
      <div
        className="container  py-5 d-flex  align-items-center"
        style={{ minHeight: "calc(100vh - 220px)" }}
        data-aos="zoom-in-up"
      >
        {products.loading === "pending" ? (
          <Loading />
        ) : (
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="  ">
                <img
                  src={oneProduct.image}
                  alt={oneProduct.title}
                  className="img-fluid p-3 mx-auto  rounded-4 "
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <p className="text-muted fs-4">{oneProduct.category}</p>
              <h2>{oneProduct.title}</h2>
              <div className="d-flex justify-content-between align-items-center  mb-3 mt-4">
                <h3>${oneProduct.price}</h3>
                <div className="d-flex   align-items-center gap-1">
                  {oneProduct?.rating?.rate}
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.round(oneProduct?.rating?.rate)
                          ? Math.round(oneProduct?.rating?.rate) > 3
                            ? "text-success"
                            : Math.round(oneProduct?.rating?.rate) <= 2
                            ? "text-danger"
                            : "text-warning"
                          : "text-muted"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="ms-2">
                    ({oneProduct?.rating?.count} Review){" "}
                  </span>
                </div>
              </div>
              <p className="text-muted mb-4 mt-4">{oneProduct.description}</p>

              <div className="d-flex align-items-center gap-2 ">
                <button className="btn btn-warning text-white flex-grow-1"  onClick={() => {
                    setSelectedItems((prevSelectedItems) => {
                      return [
                        ...prevSelectedItems,
                        {
                          id: oneProduct.id,
                          title: oneProduct.title,
                          price: oneProduct.price,
                          description: oneProduct.description,
                          category: oneProduct.category,
                          image: oneProduct.image,
                        },
                      ];
                    });

                    isLoggedIn
                      ? dispatchCarts(
                          addCarts({
                            userId: Number(localStorage.getItem("userID")),
                            products: selectedItems,
                          })
                        )
                      : setShowPopup(true);
                  }}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )}
         {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
      </div>
    </>
  );
}

export default ProductDetails;
