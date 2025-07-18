import { apiDtMoney } from "../../services/apiServer";
import { IUser } from "./types";

export async function createUser(data: IUser) {
  try {
    const request = await apiDtMoney.post("/register-user", {
      data,
    });
    return request.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
