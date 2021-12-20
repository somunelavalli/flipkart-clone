import axios from "axios";
import { api } from "../urlConfig";

const token = localStorage.getItem("token");
// console.log(token);
const axiosInstance = axios.create({
  baseURL: api,
  header: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
