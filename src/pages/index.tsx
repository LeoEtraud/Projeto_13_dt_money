import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { SearchForm } from "./Transactions/components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../utils/formatter";
import { IconButton, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModalUpdate } from "./updateTransactions";

export function Transactions() {
  const { transactions, fetchTransactions } = useContext(TransactionsContext);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);

  const handleUpdate = (id: number) => {
    setSelectedTransactionId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("Deletar transação com id:", id);
    // Aqui você pode chamar a função de deletar da sua API/contexto
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTransactionId(null);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {transaction.createdAt &&
                    !isNaN(new Date(transaction.createdAt).getTime())
                      ? dateFormatter.format(new Date(transaction.createdAt))
                      : "--"}
                  </td>

                  <td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Atualizar"
                        title="Atualizar"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => handleUpdate(transaction.id)}
                      />
                      <IconButton
                        aria-label="Deletar"
                        title="Deletar"
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
