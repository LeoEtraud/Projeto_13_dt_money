import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;

  @media (max-width: 768px) {
    padding: 2rem 0 5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0 4rem;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
    gap: 0.5rem;
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    display: flex;
    gap: 1rem; // Espaço entre botões
    margin-left: auto; // Joga para direita
    align-items: center;

    @media (max-width: 768px) {
      gap: 0.75rem;
    }

    @media (max-width: 480px) {
      margin-left: 0;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`;

export const NewTransactionButton = styled.button`
  height: 2rem;
  border: 0;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 1.875rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  }

  &:hover {
    background: ${(props) => props.theme["green-700"]};
    transition: background-color 0.2s;
  }
`;
