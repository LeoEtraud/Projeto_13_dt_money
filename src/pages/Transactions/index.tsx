import { useContext, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { IconButton, HStack } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModalUpdate } from './updateTransactions';

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handleUpdate = (id: any) => {
    setSelectedTransactionId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: any) => {
    console.log('Deletar transação com id:', id);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTransactionId(null);
  };

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                <td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Atualizar"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => handleUpdate(transaction.id)}
                    />
                    <IconButton
                      aria-label="Deletar"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    />
                  </HStack>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>

      <Dialog.Root open={isUpdateModalOpen} onOpenChange={handleCloseModal}>
        <Dialog.Overlay />
        <Dialog.Content>
          <NewTransactionModalUpdate 
            transactionId={selectedTransactionId} 
            onClose={handleCloseModal} 
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
