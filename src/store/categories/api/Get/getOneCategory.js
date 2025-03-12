import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getOneCategory = createAsyncThunk(
  "categories/getOneCategory",
  async (category, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default getOneCategory;

export const GetOneCategory = (builder) => {
  builder
    .addCase(getOneCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(getOneCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.oneCategory = action.payload;
    })
    .addCase(getOneCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
