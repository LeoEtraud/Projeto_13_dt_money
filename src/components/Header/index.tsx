import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionModal } from "../TransactionModal";
import { ProfileModal } from "../ProfileModal";
import { NewUserModal } from "../NewUserModal";
import { NewUserButton } from "../NewUserModal/styles";
import { ProfileButton } from "../ProfileModal/styles";
import { List } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionProvider";

export function Header() {
  const { isModalOpen, setIsModalOpen } = useContext(TransactionsContext);
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <div className="actions">
          {/* MODAL DE NOVA TRANSAÇÃO */}
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.Trigger>
            <TransactionModal onSubmitComplete={() => setIsModalOpen(false)} />
          </Dialog.Root>

          {/* MODAL DE NOVO USUÁRIO */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewUserButton>Novo Usuário</NewUserButton>
            </Dialog.Trigger>
            <NewUserModal />
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
