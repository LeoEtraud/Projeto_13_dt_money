import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: rgba(34, 34, 44, 0.9);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    min-width: 28rem;
    padding: 2rem 2.5rem;
  }

  @media (max-width: 480px) {
    min-width: 90vw;
    max-width: 90vw;
    padding: 1.5rem;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 480px) {
      gap: 0.75rem;
    }

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      @media (max-width: 480px) {
        padding: 0.875rem;
      }

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      @media (max-width: 768px) {
        height: 52px;
        margin-top: 1rem;
      }

      @media (max-width: 480px) {
        height: 48px;
        margin-top: 0.75rem;
        font-size: 0.875rem;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
  }
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

interface TransactionTypeButtonProps {
  variant: "income" | "outcome";
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  height: 4rem;
  border: 1px solid ${(props) => props.theme["gray-600"]};
  border-radius: 6px;
  background: transparent;
  color: ${(props) => props.theme["gray-300"]};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    height: 3.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    height: 3rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  }

  svg {
    color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &:hover {
    border-color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-500"]
        : props.theme["red-500"]};
  }

  &[data-state="checked"] {
    background: ${(props) =>
      props.variant === "income"
        ? props.theme["green-500"]
        : props.theme["red-500"]};
    color: ${(props) => props.theme.white};
    border-color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-500"]
        : props.theme["red-500"]};
  }
`;
