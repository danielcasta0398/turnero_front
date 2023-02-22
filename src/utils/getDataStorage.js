import localforage from "localforage";

export const getDataStorage = async (key) => {
  const data = await localforage.getItem(key);
  return data;
};
