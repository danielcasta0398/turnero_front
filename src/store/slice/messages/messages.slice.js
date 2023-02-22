import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    setMessage: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage } = messageSlice.actions;
