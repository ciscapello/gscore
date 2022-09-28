import axios, { AxiosInstance } from "axios";
import { store } from "../store/store";
const baseUrl = "https://gscore-back.herokuapp.com/api/";

class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = store.getState().user.token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async post(url: string, data?: unknown) {
    return this.api.post(url, data);
  }

  async get(url: string) {
    return this.api.get(url);
  }

  async put(url: string, data?: unknown) {
    return this.api.put(url, data);
  }

  async delete(url: string) {
    return this.api.delete(url);
  }

  async patch(url: string, data?: unknown) {
    return this.api.patch(url, data);
  }
}

export default new Api();
