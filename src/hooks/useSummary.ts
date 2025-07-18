import { useContext } from "react";
import { TransactionsContext } from "../contexts/transactionProvider";

export function useSummary() {
  const { allTransactions } = useContext(TransactionsContext);

  const summary = (allTransactions ?? []).reduce(
    (contador, transaction) => {
      if (transaction.type === "income") {
        contador.income += transaction.price;
        contador.total += transaction.price;
      } else {
        contador.outcome += transaction.price;
        contador.total -= transaction.price;
      }

      return contador;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
