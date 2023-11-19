import { TOKEN, getLocalStorage } from "../const/const";
import axios from "axios";
import { getCookie } from "cookies-next";

console.log(getCookie("token"));
export const request = axios.create({
  baseURL: "https://ap-vodiy-parfum-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: {
    Authorization: getCookie("token") ? `Bearer ${getCookie("token")}` : "",
  },
});
