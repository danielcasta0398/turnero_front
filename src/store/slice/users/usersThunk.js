import axios from "axios";
import localforage from "localforage";
import { getDataWithToken } from "../../../utils/getDataToken";
import { setLoading } from "../loadings/loading.slice";
import { msgError } from "../login.slice";
import { setMessage } from "../messages";
import { setMsgErrorUser, setRoles, setUser, setUserApi } from "./user.slice";
import { setState } from "../states";
import { axiosInstance } from "../../../utils/axios";

//Manejador de login y redireccion dependiendo del rol
export const loginUser = (user) => (dispatch) => {
  dispatch(setLoading(true));
  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_LINK_API}/login`, user)
      .then((res) => {
        const { user } = res.data;

        if (user.roleId === 2 || user.roleId === 5) {
          return localforage.setItem("user", res.data).then((value) => {
            window.location.href = "/dashboard/turnos";
          });
        }

        if (user.roleId === 5) {
          return localforage.setItem("user", res.data).then((value) => {
            window.location.href = "/dashboard/turnos";
          });
        }

        if (user.roleId === 4) {
          return localforage.setItem("user", res.data).then((value) => {
            window.location.href = `verturnero/${user.id}`;
          });
        }

        if (user.roleId === 3) {
          return localforage.setItem("user", res.data).then((value) => {
            window.location.href = `/verturnostv/${user.id}`;
          });
        }

        localforage.setItem("user", res.data).then((value) => {
          window.location.href = "/dashboard";
          localforage.on("removedItem", (key) => {
            console.log(key);
            if (key === "user") {
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        dispatch(setLoading(false));
        dispatch(msgError(err.response.data));
      });
  }, 1000);
};

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const resData = await getDataWithToken("users/create", "POST", data);

    if (resData.code === 1002) {
      dispatch(
        setMessage({
          type: "error",
          message: "El nombre ya existe",
          value: "name",
        })
      );
      dispatch(setLoading(false));
      return;
    }

    if (resData.code === 1001) {
      dispatch(
        setMessage({
          type: "error",
          message: "El nombre de usuario ya existe",
          value: "username",
        })
      );
      dispatch(setLoading(false));
      return;
    }

    if (resData.code === 1003) {
      dispatch(
        setMessage({
          type: "error",
          message: "Los datos ya existen",
          value: "existTwo",
        })
      );
      dispatch(setLoading(false));
      return;
    }

    dispatch(setUser(resData));
    dispatch(setLoading(false));

    setTimeout(() => {
      dispatch(setUser(""));
    }, 3000);

    console.log(resData);
  };
};

export const editUser = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await getDataWithToken(`users/edit/${id}`, "PATCH", data);

      if (res.code === 1002) {
        return dispatch(
          setState({
            option: "stateEditUser",
            value: {
              state: true,
              message: res.message,
            },
          })
        );
      }
      dispatch(setState({ option: "success", value: true }));
      setTimeout(() => {
        dispatch(setState({ option: "activeModalUserId", value: null }));
        dispatch(setState({ option: "activeModalType", value: null }));
        dispatch(setState({ option: "success", value: false }));
        dispatch(getAllUsers());
      }, 3000);
    } catch (error) {}
  };
};

// Funcion para obtener todos los usuarios
export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    setTimeout(async () => {
      const resData = await getDataWithToken("users/show", "GET");
      dispatch(setUserApi(resData.users));
      dispatch(setLoading(false));
    }, 1000);
  };
};

export const isActiveSession = () => {
  return async (dispatch) => {
    try {
      const resData = await axios.get(
        `${process.env.REACT_APP_LINK_API}/users/sessionactive`
      );

      localforage.setItem("user", resData.data).then((value) => {
        window.location.href = "#/dashboard";
      });
    } catch (err) {
      if (err.response.data.code === 1001) {
        return dispatch(setLoading(false));
      }
    }
  };
};

export const getAllRoles = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    setTimeout(async () => {
      const resData = await getDataWithToken("rols/mostrar", "GET");
      console.log(resData.roles_totales);
      dispatch(setRoles(resData.roles_totales));
      dispatch(setLoading(false));
    }, 1000);
  };
};

export const getUsersByRol = (rolId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    setTimeout(async () => {
      const resData = await getDataWithToken(
        `users/allusersbyrol/${rolId}`,
        "GET"
      );

      if (resData.code && resData.code === 1001) {
        dispatch(setLoading(false));
        return dispatch(
          setMsgErrorUser({ code: 101, msg: "No se encontro ningun usuario" })
        );
      }

      dispatch(setMsgErrorUser(""));
      dispatch(setUserApi(resData.users));
      dispatch(setLoading(false));
    }, 1000);
  };
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const { resApi } = getState().users;

  const newData = resApi.filter((item) => item.id !== id);

  dispatch(setUserApi(newData));

  try {
    await axiosInstance.delete(`users/delete/${id}`);
    dispatch(setState({ option: "isLoadingOptions", value: false }));
    dispatch(setState({ option: "activeModalUserId", value: null }));
    dispatch(setState({ option: "activeModalType", value: null }));
  } catch (err) {
    console.log(err);
  }
};
