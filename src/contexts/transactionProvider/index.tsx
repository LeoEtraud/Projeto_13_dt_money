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
  const [modalTransaction, setModalTransaction] = useState<Transaction | null>(
    null
  );

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
      // ATUALIZA A LISTA COM MINHA NOVA TRANSAÇÃO
      searchTransaction("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        position: "top",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  // FUNÇÃO DE ATUALIZAÇÃO DE TRANSAÇÃO
  async function updateTransaction(
    id: string,
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

  // FUNÇÃO PARA ABRIR MODAL DE NOVA TRANSAÇÃO
  function openNewTransactionModal() {
    setModalTransaction(null);
    setIsModalOpen(true);
  }

  // FUNÇÃO PARA ABRIR MODAL DE EDIÇÃO
  function openEditTransactionModal(transaction: Transaction) {
    setModalTransaction(transaction);
    setIsModalOpen(true);
  }

  // FUNÇÃO PARA FECHAR MODAL
  function closeModal() {
    setIsModalOpen(false);
    setModalTransaction(null);
  }

  // FUNÇÃO DE LISTAGEM DE TRANSAÇÕES
  async function searchTransaction(query?: string): Promise<void> {
    try {
      const response = await fetchTransaction(query);

      // A API retorna um objeto com a propriedade 'transactions'
      const transactionsArray = response.transactions || response;

      // Converter price para number se necessário
      const processedTransactions = transactionsArray.map(
        (transaction: { price: string | number; [key: string]: unknown }) => ({
          ...transaction,
          price:
            typeof transaction.price === "string"
              ? parseFloat(transaction.price)
              : transaction.price,
        })
      );

      setTransactions(processedTransactions);
      setAllTransactions(processedTransactions);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        position: "top",
        description: errorMessage,
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
        modalTransaction,
        openNewTransactionModal,
        openEditTransactionModal,
        closeModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
