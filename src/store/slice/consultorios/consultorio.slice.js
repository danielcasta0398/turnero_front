import { createSlice } from "@reduxjs/toolkit";

export const consultorioSlice = createSlice({
  name: "consultorio",
  initialState: {
    consultorios: [],
    message: "",
    isLoading: false,
  },
  reducers: {
    setDataConsultorios: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataConsultorios } = consultorioSlice.actions;
