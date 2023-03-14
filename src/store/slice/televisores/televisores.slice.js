import { createSlice } from "@reduxjs/toolkit";

export const televisorSlice = createSlice({
  name: "turns",
  initialState: {
    tvs: [],
    isLoadingCreateTv: false,
    isLoadingTv: false,
    turnsTv: [],
    turnSound: {},
  },
  reducers: {
    setDataTv: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataTv } = televisorSlice.actions;
