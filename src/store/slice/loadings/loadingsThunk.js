import { setLoading } from "./loading.slice";

export const changeState = () => (dispatch, getState) => {
  if (getState().users.length > 0) {
    return dispatch(setLoading(false));
  }
  dispatch(setLoading(true));
};
