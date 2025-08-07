import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionModal } from "../TransactionModal";
import { ProfileModal } from "../ProfileModal";
import { ProfileButton } from "../ProfileModal/styles";
import { List } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionProvider";

export function Header() {
  const { isModalOpen, modalTransaction, openNewTransactionModal, closeModal } =
    useContext(TransactionsContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <div className="actions">
          {/* MODAL DE NOVA TRANSAÇÃO */}
          <Dialog.Root open={isModalOpen} onOpenChange={closeModal}>
            <NewTransactionButton onClick={openNewTransactionModal}>
              Nova Transação
            </NewTransactionButton>
            <TransactionModal
              transactionToEdit={modalTransaction || undefined}
              onSubmitComplete={closeModal}
              key={modalTransaction?.id || "create"} // Força remount para cada transação
            />
          </Dialog.Root>

          {/* MODAL DE NOVO USUÁRIO */}
          {/* <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewUserButton>Novo Usuário</NewUserButton>
            </Dialog.Trigger>
            <NewUserModal />
          </Dialog.Root> */}

          {/* MODAL DE PERFIL */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <ProfileButton title="Meu Perfil">
                <List size={30} />
              </ProfileButton>
            </Dialog.Trigger>
            <ProfileModal />
          </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
