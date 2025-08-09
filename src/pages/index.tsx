import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { SearchForm } from "./Transactions/components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsCards,
  TransactionCard,
  TransactionCardHeader,
  TransactionCardContent,
  TransactionCardActions,
} from "./styles";

import { dateFormatter, priceFormatter } from "../utils/formatter";
import { IconButton, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TransactionsContext } from "../contexts/transactionProvider";

export function Transactions() {
  const {
    transactions,
    searchTransaction,
    allTransactions,
    openEditTransactionModal,
  } = useContext(TransactionsContext);

  useEffect(() => {
    searchTransaction();
  }, []);

  // Abrir para editar
  const handleUpdate = (id: string) => {
    const transaction = allTransactions.find((t) => t.id === id);
    if (transaction) {
      openEditTransactionModal(transaction);
    }
  };

  const handleDelete = (id: string) => {
    // Sua lógica de deletar
    console.log("Deletar transação com id:", id);
  };

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        {/* Tabela para desktop e tablet */}
        <TransactionsTable>
          <tbody>
            {Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td width="50%">
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

        {/* Cards para mobile */}
        <TransactionsCards>
          {Array.isArray(transactions) &&
            transactions.map((transaction) => (
              <TransactionCard key={transaction.id}>
                <TransactionCardHeader>
                  <TransactionCardContent>
                    <strong>{transaction.description}</strong>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </TransactionCardContent>
                </TransactionCardHeader>

                <TransactionCardContent>
                  <span>Categoria: {transaction.category}</span>
                  <span>
                    Data:{" "}
                    {transaction.createdAt &&
                    !isNaN(new Date(transaction.createdAt).getTime())
                      ? dateFormatter.format(new Date(transaction.createdAt))
                      : ""}
                  </span>
                </TransactionCardContent>

                <TransactionCardActions>
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
                </TransactionCardActions>
              </TransactionCard>
            ))}
        </TransactionsCards>
      </TransactionsContainer>
    </div>
  );
}
