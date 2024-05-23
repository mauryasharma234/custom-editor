import axios from "axios";
export const fetcher = (url) => {
    return axios
      .get(import.meta.env.VITE_BACKEND_URL + url)
      .then((res) => res.data);
  };
  
export const creator = (url, data) => {
    return axios
      .post(import.meta.env.VITE_BACKEND_URL + url, data)
      .then((res) => res.data);
};