import axios from "axios";




export const fetcher = (url) => {
    return axios
      .get(import.meta.env.VITE_BACKEND_URL + url)
      .then((res) => res.data);
  };
  