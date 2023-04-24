import { getDataStorage } from "../../../utils/getDataStorage";
import { getDataWithToken } from "../../../utils/getDataToken";
import { setDataTv } from "./televisores.slice";
import io from "socket.io-client";

export const getAllTvs = () => (dispatch) => {
  dispatch(setDataTv({ option: "isLoadingTv", value: true }));

  setTimeout(async () => {
    const resData = await getDataWithToken("users/allusersbyrol/3", "GET");
    dispatch(setDataTv({ option: "tvs", value: resData }));
    dispatch(setDataTv({ option: "isLoadingTv", value: false }));
  }, 1000);
};

export const getTurnsByTv = (id) => async (dispatch, getState) => {
  const socket = io(process.env.REACT_APP_URL_SOCKET);

  let {
    user: { id, tvId, roleId },
  } = await getDataStorage("user");

  if (roleId === 3) {
    tvId = id;
  }

  console.log("tvId", tvId);

  const turns = await getDataWithToken(
    `turn/getallturnsbyidtvs/${tvId}`,
    "GET"
  );

  socket.on(`tv${tvId}`, async (data) => {
    if (!data) {
      const turns = await getDataWithToken(
        `turn/getallturnsbyidtvs/${tvId}`,
        "GET"
      );
      return dispatch(setDataTv({ option: "turnsTv", value: turns }));
    }

    const state = getState();
    let {
      televisores: { turnSound },
    } = state;

    dispatch(setDataTv({ option: "turnSound", value: data }));
    const turns = await getDataWithToken(
      `turn/getallturnsbyidtvs/${tvId}`,
      "GET"
    );
    const turnsTv = dispatch(setDataTv({ option: "turnsTv", value: turns }));
  });

  const turnsTv = dispatch(setDataTv({ option: "turnsTv", value: turns }));
};
