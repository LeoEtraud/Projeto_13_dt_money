import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { X } from "phosphor-react";
import { formatCpf } from "../../utils/formatter";

const newUserFormSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string(),
});
type NewUserFormInputs = z.infer<typeof newUserFormSchema>;

export function NewUserModal() {
  const { createUser } = useContext(TransactionsContext);
  const [dataUser] = useState({
    full_name: "",
    cpf: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<NewUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: dataUser,
  });

  async function handleNewUser(data: NewUserFormInputs) {
    const { id, full_name, cpf, email, password, confirm_password } = data;

    await createUser({
      id,
      full_name,
      cpf,
      email,
      password,
      confirm_password,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Cadastrar Usuário</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewUser)}>
          <input
            type="text"
            placeholder="Nome Completo"
            {...register("full_name")}
            autoComplete="off"
            required
          />
          <input
            type="text"
            placeholder="CPF"
            {...register("cpf")}
            autoComplete="off"
            onChange={(e) =>
              setValue("cpf", formatCpf(e.target.value), {
                shouldValidate: true,
              })
            }
            maxLength={14}
            required
          />
          <input
            type="text"
            placeholder="E-mail"
            autoComplete="off"
            {...register("email")}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            autoComplete="off"
            {...register("password")}
            required
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            autoComplete="off"
            {...register("confirm_password")}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
