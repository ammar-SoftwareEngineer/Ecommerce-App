import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default AppRouter;
