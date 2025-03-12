import { createSlice } from "@reduxjs/toolkit";
import { GetProducts } from "../api/Get/getAllProducts";
import { AddProducts } from "../api/Post/addProducts";
import { GetOneProduct } from "../api/Get/getOneProduct";
import { UpdateProducts } from "../api/Put/updateProducts";
import { DeleteProducts } from "../api/Delete/deleteProducts";
import { UpdateStateProperty } from "../../UpdateState";
const initialState = {
  allProducts: [],
  addProducts: [],
  oneProduct: [],
  updateProducts: [],
  deleteProducts: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    UpdateStatePropertyProducts: UpdateStateProperty,
  },
  extraReducers: (builder) => {
    GetProducts(builder);
    AddProducts(builder);
    GetOneProduct(builder);
    UpdateProducts(builder);
    DeleteProducts(builder);
  },
});
export const { UpdateStatePropertyProducts } = productSlice.actions;

export default productSlice.reducer;
