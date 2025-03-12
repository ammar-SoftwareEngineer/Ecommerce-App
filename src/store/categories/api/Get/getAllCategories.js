import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getAllCategories;

export const GetCategories = (builder) => {
  builder
    .addCase(getAllCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allCategories = action.payload;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
