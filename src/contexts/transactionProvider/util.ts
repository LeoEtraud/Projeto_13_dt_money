import { apiDtMoney } from "../../services/apiServer";
import { CreateTransaction } from "./types";

// REQUISIÇÃO A API PARA CRIAÇÃO DE TRANSAÇÃO
export async function createTransaction(data: CreateTransaction) {
  try {
    const request = await apiDtMoney.post("/transactions", data);
    return request.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// REQUISIÇÃO A API PARA LISTAGEM DE TRANSAÇÕES
export async function fetchTransaction() {
  try {
    const request = await apiDtMoney.get("/transactions/search");
    return request.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
