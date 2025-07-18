import axios from "axios";

export const apiDtMoney = axios.create({
  baseURL: import.meta.env.VITE_API,
});
