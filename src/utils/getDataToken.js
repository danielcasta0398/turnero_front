import axios from "axios";
import { getDataStorage } from "./getDataStorage";

export const getDataWithToken = async (endpoint, method, data) => {
  const { token } = await getDataStorage("user");

  try {
    const resApi = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      url: `${process.env.REACT_APP_LINK_API}/${endpoint}`,
      data,
    });
    return resApi.data;
  } catch (err) {
    return err.response.data;
  }
};
