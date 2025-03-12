import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addCarts = createAsyncThunk(
  "carts/addCarts",
  async ({ userId, products }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.post(`https://fakestoreapi.com/carts`, {
        userId,
        products,
      });
   

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default addCarts;

export const AddCarts = (builder) => {
  builder
    .addCase(addCarts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
      state.status=false;
    })
    .addCase(addCarts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.addCarts = action.payload;
      state.status=true;
    })
    .addCase(addCarts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
      state.status=false;
    });
};
