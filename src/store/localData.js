import { createSlice } from "@reduxjs/toolkit";
import { UpdateStateProperties, UpdateStateProperty } from "./UpdateState";
const initialState = {
  category: [],
  product: [],
  cart: [],
};

const localDataSlice = createSlice({
  name: "LocalData",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    UpdateStatePropertiesLocalData: UpdateStateProperties,
    UpdateStatePropertyLocalData: UpdateStateProperty,
  },
});
export const {
  UpdateStatePropertiesLocalData,
  UpdateStatePropertyLocalData,
  setCategory,
  setProduct,
  setCart,
} = localDataSlice.actions;

export default localDataSlice.reducer;
