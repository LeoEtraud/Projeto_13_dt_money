import { NewTransactionButton } from "../Header/styles";
import { TransactionsSearchForm } from "./styles";

export function SearchForm() {
    return (
        <TransactionsSearchForm>
            <input type="text" />
            <NewTransactionButton>Buscar</NewTransactionButton>
        </TransactionsSearchForm>
    )
}