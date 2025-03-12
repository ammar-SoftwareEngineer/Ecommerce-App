import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getOneProduct;

export const GetOneProduct = (builder) => {
  builder
    .addCase(getOneProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getOneProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.oneProduct = action.payload;
    })
    .addCase(getOneProduct.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
