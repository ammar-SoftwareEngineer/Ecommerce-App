import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const addUsers = createAsyncThunk("user/addUsers", async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await axios.post(`https://fakestoreapi.com/users`, data);
    if (response.data.status === true) {
      toast.dismiss();
      setTimeout(() => {
        toast.success(response.data.message);
      }, 200);
    } else {
      toast.dismiss();
      typeof response.data.message === "object"
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
});

export default addUsers;

export const AddUsers = (builder) => {
  builder
    .addCase(addUsers.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(addUsers.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.addUsers = action.payload;
    })
    .addCase(addUsers.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
};
