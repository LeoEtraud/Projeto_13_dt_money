import { createContext, useState } from "react";

import {
  CreateTransaction,
  ITransactions,
  Transaction,
  TransactionContextType,
} from "./types";
import { useToast } from "@chakra-ui/react";
import { createTransaction, fetchTransaction } from "./util";

export const TransactionsContext = createContext<ITransactions>(
  {} as ITransactions
);

export function TransactionsProvider({ children }: TransactionContextType) {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();

  // FUNÇÃO DE CRIAÇÃO DE TRANSAÇÃO
  async function newTransaction(data: CreateTransaction): Promise<void> {
    try {
      await createTransaction(data);
      toast({
        position: "top",
        description: "Sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        position: "top",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  // FUNÇÃO DE ATUALIZAÇÃO DE TRANSAÇÃO
  async function updateTransaction(
    id: number,
    updatedTransaction: Partial<Transaction>
  ) {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
    setAllTransactions((prevAll) =>
      prevAll.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  }

  // FUNÇÃO DE LISTAGEM DE TRANSAÇÕES
  async function searchTransaction(query?: string): Promise<void> {
    try {
      const response = await fetchTransaction(query);

      setTransactions(response);
      setAllTransactions(response);
    } catch (error: any) {
      toast({
        position: "top",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        allTransactions,
        searchTransaction,
        newTransaction,
        updateTransaction,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
