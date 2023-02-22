import { setDataConsultorios } from "./consultorio.slice";
import { getDataWithToken } from "../../../utils/getDataToken";

export const getAllConsultorios = () => (dispatch) => {
  dispatch(setDataConsultorios({ option: "isLoading", value: true }));
  setTimeout(async () => {
    const resData = await getDataWithToken("consultorio/getall", "GET");
    if (resData.consultorios.length === 0) {
      dispatch(
        setDataConsultorios({
          option: "message",
          value: { code: 1001, msg: "No hay consultorios creados" },
        })
      );

      return dispatch(
        setDataConsultorios({ option: "isLoading", value: false })
      );
    }

    dispatch(
      setDataConsultorios({
        option: "consultorios",
        value: resData.consultorios,
      })
    );
    dispatch(setDataConsultorios({ option: "isLoading", value: false }));
  }, 1000);
};
