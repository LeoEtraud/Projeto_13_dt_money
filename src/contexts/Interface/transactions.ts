export interface ITransaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
  }
  
  export interface ICreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
  }