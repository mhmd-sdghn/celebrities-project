import axios from "axios";
import config from "./config/general";

const instance = axios.create({
  baseURL: config.backendUrl,
  withCredentials: true,
});

export default instance;
