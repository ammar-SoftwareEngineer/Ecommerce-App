import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const addProducts = createAsyncThunk(
  "product/addProducts",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.post(
        `https://fakestoreapi.com/products`,
        data
      );
      if (response.data.status === true) {
        toast.dismiss();
        setTimeout(() => {
          toast.success(response.data.message);
        }, 200);
      } else {
        toast.dismiss();
        typeof(response.data.message) === "object"
          ? Object.values(response.data.message).forEach((message) => {
              toast.error(message);
            })
          : toast.error(response.data.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default addProducts;

export const AddProducts = (builder) => {
  builder
    .addCase(addProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(addProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.addProducts = action.payload;
    })
    .addCase(addProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
