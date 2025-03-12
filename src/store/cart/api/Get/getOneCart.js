import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getOneCart = createAsyncThunk(
  "cart/getOneCart",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/carts/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getOneCart;

export const GetOneCart = (builder) => {
  builder
    .addCase(getOneCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getOneCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.oneProduct = action.payload;
    })
    .addCase(getOneCart.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
