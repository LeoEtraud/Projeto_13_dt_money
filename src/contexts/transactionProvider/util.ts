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
export async function fetchTransaction(query?: string) {
  try {
    const request = await apiDtMoney.get("/transactions", {
      params: {
        _sort: "id",
        _order: "desc",
        q: query, // pesquisa por query se existir
        page: 0,
      },
    });
    return request.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
