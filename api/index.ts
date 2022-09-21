import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://gscore-back.herokuapp.com/api/",
});
