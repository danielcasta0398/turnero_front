import axios from "axios";

export const axiosInstance = ({token, contentType}) => axios.create({
    baseURL: process.env.REACT_APP_LINK_API,
    headers: {
        "Content-Type": contentType || "application/json",
        "Authorization": `Bearer ${token}`,
    },
});