import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isOpenModal = createSlice({
  name: "isOpenModal",
  initialState: false,
  reducers: {
    setIsOpenModal: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setIsOpenModal } = isOpenModal.actions;

export default isOpenModal.reducer;
