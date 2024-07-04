import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (contador, transaction) => {
      if (transaction.type === 'income') {
        contador.income += transaction.price
        contador.total += transaction.price
      } else {
        contador.outcome += transaction.price
        contador.total -= transaction.price
      }

      return contador
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}
