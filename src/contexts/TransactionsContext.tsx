import { ReactNode, createContext, useState } from "react";
import { api } from "../services/apiServer";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  allTransactions: Transaction[]; // <- adicione isso
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  updateTransaction: (
    id: number,
    updatedTransaction: Partial<Transaction>
  ) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // // Busca todos e armazena em allTransactions
  // async function fetchAllTransactions() {
  //   try {
  //     const response = await api.get("/transactions", {
  //       params: {
  //         _sort: "createdAt",
  //         _order: "desc",
  //         page: 0,
  //       },
  //     });
  //     setAllTransactions(response.data);
  //     setTransactions(response.data); // Inicialmente mostra todos
  //   } catch (error) {
  //     console.error("Erro ao listar todos os itens", error);
  //   }
  // }

  // Filtra a partir de allTransactions
  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query, // pesquisa por query se existir
        page: 0,
      },
    });
    setAllTransactions(response.data);
    setTransactions(response.data);
  }

  const updateTransaction = (
    id: number,
    updatedTransaction: Partial<Transaction>
  ) => {
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
  };

  async function createTransaction(data: CreateTransactionInput) {
    await api.post("transactions", {
      ...data,
      createdAt: new Date(),
    });
    // Atualiza a lista completa do backend
    await fetchTransactions("");
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        allTransactions, // <- exporte para o Summary
        fetchTransactions,
        createTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
