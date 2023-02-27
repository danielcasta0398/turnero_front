import { getDataStorage } from "../../../utils/getDataStorage";
import { getDataWithToken } from "../../../utils/getDataToken";
import { setDataTurn } from "./turns.slice";

export const createTurn = () => {
  return async (dispatch, getState) => {
    const { valueDocument, turnero } = getState();

    await getDataWithToken("turn/create", "POST", {
      cedulaUser: valueDocument,
      buttonId: turnero.buttonId,
    });
  };
};

export const getTurns = () => {
  return async (dispatch) => {
    const {
      user: { role },
    } = await getDataStorage("user");

    if (role.nombreRol === "administrador") {
      const data = await getDataWithToken("turn/getallturns");
      dispatch(setDataTurn({ option: "turns", value: data }));
    }

    /*const data = await getDataWithToken("turns");
    console.log(data)*/
  };
};
