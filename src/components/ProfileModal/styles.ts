import * as Dialog from "@radix-ui/react-dialog";
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
  background: ${(props) => props.theme["gray-800"]};

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
    margin: 1rem;
  }

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 480px) {
      gap: 0.75rem;
    }

    .button-group {
      display: flex;
      flex-direction: column; // ou 'row' se quiser lado a lado
      align-items: center; // centraliza os botões
      gap: 1rem;
      width: 100%; // garante centralização total
      margin-top: 0.1rem;

      @media (max-width: 480px) {
        gap: 0.75rem;
      }
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
      width: 20rem;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1rem;
      cursor: pointer;

      align-items: center;

      @media (max-width: 768px) {
        width: 16rem;
        height: 52px;
      }

      @media (max-width: 480px) {
        width: 100%;
        height: 48px;
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

    #logout[type="submit"] {
      height: 58px;
      width: 10rem;
      border: 0;
      background: ${(props) => props.theme["red-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1rem;
      cursor: pointer;

      @media (max-width: 768px) {
        width: 8rem;
        height: 52px;
      }

      @media (max-width: 480px) {
        width: 100%;
        height: 48px;
        font-size: 0.875rem;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["red-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
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

export const ProfileButton = styled.button`
  height: 2rem;
  width: 4rem;
  border: 0;
  background: ${(props) => props.theme["gray-600"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 1.875rem;
    width: 3.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    height: 2.5rem;
    width: 3rem;
    padding: 0 0.75rem;
  }

  &:hover {
    background: ${(props) => props.theme["gray-700"]};
    transition: background-color 0.2s;
  }
`;
