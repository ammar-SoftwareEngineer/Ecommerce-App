import React, { useEffect } from "react";
import "./NavCategories.css";
import { useDispatch, useSelector } from "react-redux";
import getAllCategories from "../../store/categories/api/Get/getAllCategories";
// import getAllProducts from "../../store/product/api/Get/getAllProducts";
import { setCategory } from "../../store/localData";
function NavCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const dispatchCategories = useDispatch();
  // const category = useSelector((state) => state.localData);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <div className="bg-white shadow-sm">
      <div
        className="container d-flex flex-wrap justify-content-center align-items-center gap-5 py-4 "
        data-aos="zoom-in"
      >
        <div
          className="category"
          onClick={() => {
            dispatchCategories(setCategory([]));
          }}
        >
          All
        </div>
        {categories.allCategories.map((category, index) => (
          <div
            key={index}
            className="category"
            onClick={() => dispatchCategories(setCategory(category))}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavCategories;
