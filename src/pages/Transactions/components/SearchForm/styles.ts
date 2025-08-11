import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center; /* garante alinhamento vertical */

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;

    .buttons-row {
      display: flex;
      gap: 0.5rem;
      width: 100%;

      button {
        flex: 1; /* divide igualmente */
      }
    }
  }

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1rem;

    @media (max-width: 768px) {
      padding: 0.875rem;
    }

    @media (max-width: 480px) {
      padding: 0.7rem;
    }

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }

  /* Botões fora do mobile continuam alinhados na mesma linha */
  .buttons-row {
    display: flex;
    gap: 0.5rem;

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 0;
      padding: 1rem;
      background: transparent;
      border: 1px solid ${(props) => props.theme["green-300"]};
      color: ${(props) => props.theme["green-300"]};
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      line-height: 1;

      @media (max-width: 768px) {
        padding: 0.75rem;
        font-size: 0.875rem;
        width: auto;
        flex-shrink: 0;

        svg {
          width: 18px;
          height: 18px;
        }
      }

      @media (max-width: 480px) {
        padding: 0.6rem 0.7rem;
        font-size: 0.8rem;
        justify-content: center;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-500"]};
        border-color: ${(props) => props.theme["green-500"]};
        color: ${(props) => props.theme.white};
        transition:
          background-color 0.2s,
          color 0.2s,
          border-color 0.2s;
      }
    }

    /* Botão Limpar com cor diferente */
    .clear-btn {
      border-color: ${(props) => props.theme["red-300"]};
      color: ${(props) => props.theme["red-300"]};

      &:not(:disabled):hover {
        background: ${(props) => props.theme["red-500"]};
        border-color: ${(props) => props.theme["red-500"]};
        color: ${(props) => props.theme.white};
      }
    }
  }
`;
