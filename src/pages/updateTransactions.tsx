import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TransactionsContext } from '../contexts/TransactionsContext';

interface NewTransactionModalUpdateProps {
  transactionId: number | null;
  onClose: () => void;
}

export function NewTransactionModalUpdate({ transactionId, onClose }: NewTransactionModalUpdateProps) {
  const { transactions, updateTransaction } = useContext(TransactionsContext);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (transactionId !== null) {
      const transaction = transactions.find((t) => t.id === transactionId);
      if (transaction) {
        setValue('description', transaction.description);
        setValue('price', transaction.price);
        setValue('category', transaction.category);
        setValue('type', transaction.type);
      }
    } else {
      reset(); // Limpar o formulário quando não houver transactionId
    }
  }, [transactionId, transactions, setValue, reset]);

  const onSubmit = (data: any) => {
    if (transactionId !== null) {
      updateTransaction(transactionId, data);
      onClose(); // Fechar o modal após a atualização
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('description')} placeholder="Descrição" />
      <input {...register('price')} placeholder="Preço" type="number" />
      <input {...register('category')} placeholder="Categoria" />
      <select {...register('type')}>
        <option value="income">Entrada</option>
        <option value="outcome">Saída</option>
      </select>
      <button type="submit">Atualizar</button>
    </form>
  );
}
