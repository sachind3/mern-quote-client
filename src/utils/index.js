import axios from "axios";

export const getAPI = (token) => {
  const API = axios.create({
    baseURL:
      process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"
        ? process.env.REACT_APP_DEV_API_URL
        : process.env.REACT_APP_PROD_API_URL,
    withCredentials: true,
  });

  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  }

  return API;
};
