import { ReactNode, createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  updateTransaction: (id: number, updatedTransaction: Partial<Transaction>) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // FUNÇÃO ASSÍNCRONA PARA LISTAR AS MINHAS TRANSAÇÕES
  async function fetchTransactions(query?: string) {

    try {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })

      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao listar os itens ', error);
    }
  }

  // FUNÇÃO PARA ATUALIZAR UMA TRANSAÇÃO EXISTENTE
  const updateTransaction = (id: number, updatedTransaction: Partial<Transaction>) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      )
    );
  };

  // FUNÇÃO ASSÍNCRONA PARA CRIAR UMA NOVA TRANSAÇÃO
  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        updateTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
}
