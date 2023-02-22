import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const valueDocument = createSlice({
  name: "valueDocument",
  initialState: "",
  reducers: {
    setValueDocument: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setValueDocument } = valueDocument.actions;

export default valueDocument.reducer;
