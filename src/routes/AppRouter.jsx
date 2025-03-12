import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductList from "../pages/Products/ProductList";
import ProductDetails from "../pages/Products/ProductDetails";
import CartPage from "../pages/Cart/CartPage";

import { Provider } from "react-redux";
import { store } from "../store/store";
import Home from "../pages/Home/Home";
import NavCategories from "../layouts/NavCategories/NavCategories";
function AppRouter() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/products">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Home />}>
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRouter;
