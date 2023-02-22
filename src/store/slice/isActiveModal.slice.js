import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isActiveModal = createSlice({
  name: "isActiveModal",
  initialState: null,
  reducers: {
    setIsActiveModal: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setIsActiveModal } = isActiveModal.actions;

export default isActiveModal.reducer;
