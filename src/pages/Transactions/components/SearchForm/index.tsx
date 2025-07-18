import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/transactionProvider";

// DEFININDO O ESQUEMA DO FORMULÁRIO
const searchFormSchema = z.object({
  query: z.string(),
});

// VALIDANDO O TIPO DE DADOS
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { searchTransaction } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  // FUNÇÃO ASSÍNCRONA QUE ENVIA OS DADOS DO FORMULÁRIO
  async function handleSearchTransactions(data: SearchFormInputs) {
    await searchTransaction(data.query);
  }

  // FUNÇÃO PARA LIMPAR O FORMULÁRIO
  function handleClearSearch() {
    reset();
    searchTransaction("");
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
      <button type="button" onClick={handleClearSearch} disabled={isSubmitting}>
        Limpar
      </button>
    </SearchFormContainer>
  );
}
