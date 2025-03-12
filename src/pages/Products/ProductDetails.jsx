// Hooks React
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import getOneProduct from "../../store/product/api/Get/getOneProduct";

import Loading from "../../components/Loading/Loading";

import { MdArrowBackIos } from "react-icons/md";
import { UpdateStatePropertyProducts } from "../../store/product/slice/ProductSlice";
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const oneProduct = products.oneProduct;
  console.log(products);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="px-4 mt-4">
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
                <button className="btn btn-warning text-white flex-grow-1">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
