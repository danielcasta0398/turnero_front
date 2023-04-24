import localforage from "localforage";

export const logOut = async (navigate) => {
  await localforage.removeItem("user");
  return navigate("/login");
};
