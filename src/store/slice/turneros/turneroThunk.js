import { getDataWithToken } from "../../../utils/getDataToken";
import { setDataTurneros } from "./turnero.slice";

export const getAllTurneros = () => (dispatch) => {
  dispatch(setDataTurneros({ option: "isLoading", value: true }));
  setTimeout(async () => {
    const resData = await getDataWithToken("users/allusersbyrol/4", "GET");
    dispatch(setDataTurneros({ option: "turneros", value: resData }));
    dispatch(setDataTurneros({ option: "isLoading", value: false }));
  }, 1000);
};

export const getAllButtonsByUser =
  (id, time = 1000) =>
  (dispatch) => {
    dispatch(setDataTurneros({ option: "isLoading", value: true }));
    setTimeout(async () => {
      const resData = await getDataWithToken(`turner/allbuttons/${id}`, "GET");
      dispatch(setDataTurneros({ option: "buttons", value: resData }));
      dispatch(setDataTurneros({ option: "isLoading", value: false }));
    }, time);
  };

export const createButtonApi = (data) => (dispatch) => {
  dispatch(setDataTurneros({ option: "isLoading", value: true }));
  setTimeout(async () => {
    const resData = await getDataWithToken(
      "turner/button/create",
      "POST",
      data
    );
    dispatch(setDataTurneros({ option: "isLoading", value: false }));
    dispatch(setDataTurneros({ option: "viewCreateButton", value: false }));
    dispatch(viewButtonTurnero(data.userId));
    dispatch(getAllButtonsByUser(data.userId, 0));
  }, 1000);
};

export const viewButtonTurnero =
  (id) =>
  (dispatch, time = 1000) => {
    //dispatch(setDataTurneros({ option: "isLoading", value: true }));
    setTimeout(async () => {
      const resData = await getDataWithToken(`turner/allbuttons/${id}`, "GET");
      dispatch(setDataTurneros({ option: "buttonsTurnero", value: resData }));
      // dispatch(setDataTurneros({ option: "isLoading", value: false }));
    }, time);
  };
