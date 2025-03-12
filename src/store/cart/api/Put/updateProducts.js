import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const updateProducts = createAsyncThunk(
  "product/updateProducts",
  async ({ id, data }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
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

export default updateProducts;

export const UpdateProducts = (builder) => {
  builder
    .addCase(updateProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(updateProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.updateProducts = action.payload;
    })
    .addCase(updateProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
