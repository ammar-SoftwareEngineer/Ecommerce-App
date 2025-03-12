import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/slice/ProductSlice";
import categoriesReducer from "./categories/slice/CategoriesSlice";
import userReducer from "./user/slice/UserSlice";
import cartsReducer from "./cart/slice/CartSlice";
import localDataReducer from "./localData";
export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    users: userReducer,
    carts: cartsReducer,
    localData: localDataReducer,
  },
});
