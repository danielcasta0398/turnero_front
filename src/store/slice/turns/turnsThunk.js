import { io } from "socket.io-client";
import { getDataStorage } from "../../../utils/getDataStorage";
import { getDataWithToken } from "../../../utils/getDataToken";
import { setIsOpenModal } from "../isOpenModal.slice";
import { setDataTurn } from "./turns.slice";
import { axiosInstance } from "../../../utils/axios";

export const createTurn = () => {
  return async (dispatch, getState) => {
    const { valueDocument, turnero } = getState();

    const res = await getDataWithToken("turn/create", "POST", {
      cedulaUser: valueDocument,
      buttonId: turnero.buttonId,
    });

    dispatch(setDataTurn({ option: "infoTurn", value: res }));
    dispatch(setDataTurn({ option: "isPrint", value: true }));

    setTimeout(() => {
      dispatch(setIsOpenModal(false));
      dispatch(setDataTurn({ option: "isPrint", value: false }));
    }, 5000);
  };
};

export const getTurns = (status) => {
  return async (dispatch) => {
    const {
      user: { role },
    } = await getDataStorage("user");

    if (role.nombreRol === "administrador") {
      const data = await getDataWithToken(
        `turn/getallturns${status ? `?status=${status}` : ``}`
      );
      dispatch(setDataTurn({ option: "turns", value: data }));
    }

    /*const data = await getDataWithToken("turns");
    console.log(data)*/
  };
};

export const getTurnsByUser = (status) => {
  return async (dispatch) => {
    const {
      user: { id },
    } = await getDataStorage("user");

    const data = await getDataWithToken(
      `turn/getbyuserid/${id}/${status ? `?status=${status}` : ``}`
    );
    dispatch(setDataTurn({ option: "turns", value: data }));
  };
};

export const getTurnsById = (id) => {
  return async (dispatch) => {
    const data = await getDataWithToken(`turn/updatestate/${id}`, "PATCH");
  };
};

export const getTurnsAsigned = () => {
  return async (dispatch) => {
    const data = await getDataWithToken("turn/getusersasigned");
    dispatch(setDataTurn({ option: "userAsigned", value: data }));
  };
};

export const asignedTurn = (data) => {
  return async (dispatch) => {
    console.log("Data =>>>", data);
    await getDataWithToken(`turn/asignedturn/${data.turnId}`, "POST", data);
  };
};

export const deleteTurn = (id) => {
  return async (dispatch) => {
    await getDataWithToken(`turn/deleteturn/${id}`, "DELETE");
  };
};

export const endTurn = (id, data) => {
  console.log(id);
  return async (dispatch) => {
    const response = await axiosInstance.put(`turn/endturn/${id}`);
    console.log(response.data);
    dispatch(setDataTurn({ option: "viewModal", value: false }));
    // await getDataWithToken(`turn/asignedturn/${data.turnId}`, "POST", data);
  };
};
