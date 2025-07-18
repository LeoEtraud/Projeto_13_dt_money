export interface ITransaction {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface ICreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface CreateTransaction {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export interface ITransactions {
  transactions: Transaction[];
  allTransactions: Transaction[];
  newTransaction: (data: CreateTransaction) => Promise<void>;
  updateTransaction: (
    id: number,
    updatedTransaction: Partial<Transaction>
  ) => void;
  searchTransaction: (query?: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (valueModal: boolean) => void;
}

export interface TransactionContextType {
  children: React.ReactNode;
}
