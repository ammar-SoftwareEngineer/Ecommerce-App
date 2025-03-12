import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getAllProducts;

export const GetProducts = (builder) => {
  builder
    .addCase(getAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allProducts = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
