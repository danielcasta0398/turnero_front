import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isLoadingOptions = createSlice({
  name: "isLoadingOptions",
  initialState: false,
  reducers: {
    setIsLoadingOptions: (state, action) => {
      state = action.payload;
      return state;
    },
    stopLoadingOptions: (state) => {
      state = false;
      return state;
    },
  },
});

export const { setIsLoadingOptions, stopLoadingOptions } =
  isLoadingOptions.actions;

export default isLoadingOptions.reducer;
