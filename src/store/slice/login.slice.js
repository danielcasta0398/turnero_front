import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localforage from "localforage";
import { useLink } from "../../utils/ScreenFull";
import { setStateLoading } from "./activeLoading.slice";
import { setIsLoadingOptions } from "./isLoadingOptions.slice";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const login = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    loginApi: (state, action) => {
      state = action.payload;
      return state;
    },
    msgError: (state, action) => {
      state = action.payload;
      return state;
    },
    allUsers: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  // establecer el estado local para indicar que la petición está en curso

  const { token } = await localforage.getItem("user");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let isFetching = true;
    dispatch(setStateLoading(true));
    setTimeout(async () => {
      const users = await axios.get(
        `${process.env.REACT_APP_LINK_API}/users/show`,
        config
      );
      console.log(users.data);
      dispatch(allUsers(users.data));

      // establecer el estado local para indicar que la petición ha finalizado
      isFetching = false;
      dispatch(setStateLoading(false));
    }, 5000);
  } catch (err) {
    console.log(err);
  }
};
export const { loginApi, msgError, allUsers } = login.actions;

export default login.reducer;
