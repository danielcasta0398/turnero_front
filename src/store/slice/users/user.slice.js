import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    resApi: [],
    roles: [],
    userData: {},
    allTurneros: [],
    allConsultorios: [],
    msgError: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      return state;
    },

    setDataUsers: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },

    setUserApi: (state, action) => {
      state.resApi = action.payload;
      return state;
    },

    setRoles: (state, action) => {
      state.roles = action.payload;
      return state;
    },
    setMsgErrorUser: (state, action) => {
      state.msgError = action.payload;
      return state;
    },
    setTurneros: (state, action) => {
      state.allTurneros = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setUserApi,
  setRoles,
  setMsgErrorUser,
  setTurneros,
  setDataUsers,
} = userSlice.actions;
