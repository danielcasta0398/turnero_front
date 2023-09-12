import axios from "axios";
import localforage from "localforage";

export const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV !== "development"
      ? process.env.REACT_APP_LINK_API
      : process.env.REACT_APP_API_URL_PROD,
});

axiosInstance.interceptors.request.use(async (config) => {
  const user = await localforage.getItem("user");

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
