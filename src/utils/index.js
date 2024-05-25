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

export const highlightText = (text, query) => {
  if (query) {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-[yellow]">
          {part}
        </span>
      ) : (
        part
      )
    );
  } else {
    return text;
  }
};
