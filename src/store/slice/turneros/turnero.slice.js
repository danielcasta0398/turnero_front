import { createSlice } from "@reduxjs/toolkit";

export const turneroSlice = createSlice({
  name: "turnero",
  initialState: {
    turneros: [],
    buttons: [],
    onlyButtonInfo: {},
    idUser: "",
    buttonsTurnero: [],
    userNotiffication: [],
    editButton: false,
    viewButtons: false,
    isLoadingEdit: false,
    isLoading: false,
    isLoadingChangeState: false,
    viewCreateButton: false,
    clickIdButton: "",
    buttonId: "",
  },
  reducers: {
    setDataTurneros: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
    setLoading: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setDataTurneros } = turneroSlice.actions;
