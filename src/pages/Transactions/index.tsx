import { Header } from "../../components/Header";
import { SearchForm} from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <SearchForm />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>22/06/2024</td>
            </tr>
            <tr>
              <td width="50%">Hamburger</td>
              <td>
                <PriceHighlight variant="outcome">
                  - R$ 35,00
                </PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>21/06/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>

    </div>
  )
}