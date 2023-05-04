import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "states",
  initialState: {
    isActiveModal: false,
    isLoadingOptions: false,
  },
  reducers: {
    setState: (state, action) => {
      console.log("action.payload", action.payload.option);
      console.log("action.payload", action.payload.value);
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setState } = stateSlice.actions;
