import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const deleteProducts = createAsyncThunk(
  "product/deleteProducts",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
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

export default deleteProducts;

export const DeleteProducts = (builder) => {
  builder
    .addCase(deleteProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(deleteProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.deleteProducts = action.payload;
    })
    .addCase(deleteProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
