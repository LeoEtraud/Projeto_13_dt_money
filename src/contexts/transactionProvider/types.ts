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
  id: string;
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
    id: string,
    updatedTransaction: Partial<Transaction>
  ) => void;
  searchTransaction: (query?: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (valueModal: boolean) => void;
  modalTransaction: Transaction | null;
  openNewTransactionModal: () => void;
  openEditTransactionModal: (transaction: Transaction) => void;
  closeModal: () => void;
}

export interface TransactionContextType {
  children: React.ReactNode;
}
