import { useContext } from "react";
import { TransactionsContext } from ".";

export function useTransaction() {
  const context = useContext(TransactionsContext);
  return context;
}
