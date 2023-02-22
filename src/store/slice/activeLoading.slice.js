import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const activeLoadingSlice = createSlice({
  name: "activeLoading",
  initialState: false,
  reducers: {
    setStateLoading: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setStateLoading } = activeLoadingSlice.actions;

export default activeLoadingSlice.reducer;
