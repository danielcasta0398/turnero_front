import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "states",
  initialState: {
    activeModalUserId: null,
    activeModalType: null,
    isLoadingOptions: false,
  },
  reducers: {
    setState: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
  },
});

export const { setState } = stateSlice.actions;
