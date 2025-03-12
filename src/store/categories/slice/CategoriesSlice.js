import { createSlice } from "@reduxjs/toolkit";
import { GetCategories } from "../api/Get/getAllCategories";
import { GetOneCategory } from "../api/Get/getOneCategory";

const initialState = {
  allCategories: [],
  oneCategory: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    // UpdateStatePropertyCategories: UpdateStateProperty,
  },
  extraReducers: (builder) => {
    GetCategories(builder);
    GetOneCategory(builder);
  },
});
// export const { UpdateStatePropertyCategories } = productsSlice.actions;

export default categoriesSlice.reducer;
