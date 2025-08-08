import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionModal } from "../TransactionModal";
import { ProfileModal } from "../ProfileModal";
import { ProfileButton } from "../ProfileModal/styles";
import { List } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionProvider";
import { Overlay } from "../TransactionModal/styles";

export function Header() {
  const { isModalOpen, modalTransaction, openNewTransactionModal, closeModal } =
    useContext(TransactionsContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <div className="actions">
          {/* MODAL DE NOVA TRANSAÇÃO */}
          <Dialog.Root
            open={isModalOpen}
            onOpenChange={(open) =>
              open ? openNewTransactionModal() : closeModal()
            }
          >
            {/* Você pode usar Trigger ou manter o onClick manual */}
            <NewTransactionButton onClick={openNewTransactionModal}>
              Nova Transação
            </NewTransactionButton>

            <Dialog.Portal>
              <Overlay />
              <TransactionModal
                transactionToEdit={modalTransaction || undefined}
                onSubmitComplete={closeModal}
                key={modalTransaction?.id || "create"}
              />
            </Dialog.Portal>
          </Dialog.Root>

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
