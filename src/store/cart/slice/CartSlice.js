import { createSlice } from "@reduxjs/toolkit";
import { AddCarts } from "../api/Post/addCarts";
import { GetAllCarts } from "../api/Get/getAllCarts";

import { UpdateStateProperty } from "../../UpdateState";
const initialState = {
  allCarts:[],
  addCarts: [],
  loading: "idle",
  error: null,
  status:false
};

const cartsSlice = createSlice({
  name: "Carts",
  initialState,
  reducers: {
    UpdateStatePropertyCart: UpdateStateProperty,
  },
  extraReducers: (builder) => {
    GetAllCarts(builder)
    AddCarts(builder);
  },
});
export const { UpdateStatePropertyCart} = cartsSlice.actions;

export default cartsSlice.reducer;
