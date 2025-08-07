import styled from "styled-components";

export const TransactionsContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 1rem;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    margin: 2rem auto 1rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    margin: 1rem auto 0.5rem;
    padding: 0 0.5rem;
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    display: none;
  }

  td {
    padding: 1.25rem 1.5rem;
    background: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
`;

// Componente para cards responsivos (substitui a tabela em telas pequenas)
export const TransactionsCards = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    display: flex;
  }
`;

export const TransactionCard = styled.div`
  background: ${(props) => props.theme["gray-700"]};
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TransactionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const TransactionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const TransactionCardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;
