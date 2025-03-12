// Hooks React
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Apis
import getAllProducts from "../../store/product/api/Get/getAllProducts";
import getOneCategory from "../../store/categories/api/Get/getOneCategory";

// Components
import Cards from "../../components/Cards/Cards";
import Loading from "../../components/Loading/Loading";

// Layouts
import NavCategories from "../../layouts/NavCategories/NavCategories";
import Hero from "../../layouts/Hero";


function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const dispatchCategories = useDispatch();
  const categories = useSelector((state) => state.categories);
  const oneCategory = useSelector((state) => state.localData.category);
const carts = useSelector((state) => state.carts);
console.log(carts);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatchCategories(getOneCategory(oneCategory));
  }, [dispatch, dispatchCategories, oneCategory]);
  return (
    <div className=" min-vh-100" >
      {products.loading === "pending" ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <NavCategories />

          <Cards
            cardItems={
              categories.oneCategory == []
                ? products.allProducts
                : categories.oneCategory
            }
          />
        </>
      )}
    </div>
  );
}

export default ProductList;
