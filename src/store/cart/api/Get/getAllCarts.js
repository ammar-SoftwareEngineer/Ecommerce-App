import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getAllCarts = createAsyncThunk(
  "cart/getAllCarts",
  async (userId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getAllCarts;

export const GetAllCarts = (builder) => {
  builder
    .addCase(getAllCarts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getAllCarts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allCarts = action.payload;
    })
    .addCase(getAllCarts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
