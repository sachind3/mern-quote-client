import axios from "axios";

export const getAPI = (token) => {
  const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  }

  return API;
};
