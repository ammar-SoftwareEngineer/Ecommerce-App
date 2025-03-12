import { createSlice } from "@reduxjs/toolkit";
import { AddUsers } from "../api/Post/addUsers";

const initialState = {
  addUsers: [],
  loading: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    // UpdateStatePropertyUsers: UpdateStateProperty,
  },
  extraReducers: (builder) => {
    AddUsers(builder);
  },
});
// export const { UpdateStatePropertyUsers } = usersSlice.reducer.actions;

export default usersSlice.reducer;
