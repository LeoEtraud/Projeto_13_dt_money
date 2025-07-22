import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { X } from "phosphor-react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { formatCpf } from "../../utils/formatter";

const newUpdateUserFormSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
  new_password: z.string(),
  confirm_password: z.string(),
});
type UpdateUserFormInputs = z.infer<typeof newUpdateUserFormSchema>;

export function ProfileModal() {
  const [dataUser] = useState({
    full_name: "Leonardo Duarte",
    cpf: "123.456.789-00",
    email: "leonardo.duarte.of@gmail.com",
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateUserFormInputs>({
    resolver: zodResolver(newUpdateUserFormSchema),
    defaultValues: dataUser,
  });

  async function handleUpdateUser() {
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Perfil do Usuário</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleUpdateUser)}>
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
            required
            onChange={(e) =>
              setValue("cpf", formatCpf(e.target.value), {
                shouldValidate: true,
              })
            }
            maxLength={14}
          />
          <input
            type="text"
            placeholder="E-mail"
            {...register("email")}
            autoComplete="off"
            required
          />

          <Accordion allowMultiple>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    cursor={"pointer"}
                    color="white"
                    bgColor={"gray"}
                    border={0}
                  >
                    <Flex
                      justifyContent="space-between"
                      p={15}
                      alignItems="center"
                      width="100%"
                    >
                      <Box as="span" textAlign="left">
                        Alterar Senha
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize={12} />
                      ) : (
                        <AddIcon fontSize={12} />
                      )}
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel m={10}>
                    <Flex direction="column" gap={10}>
                      <Input
                        type={"password"}
                        placeholder="Senha atual"
                        {...register("password")}
                        autoComplete="off"
                        required
                      />

                      <Input
                        type={"password"}
                        placeholder="Nova senha"
                        {...register("new_password")}
                        autoComplete="off"
                        required
                      />

                      <Input
                        type={"password"}
                        placeholder="Confirme a nova senha"
                        {...register("confirm_password")}
                        autoComplete="off"
                        required
                      />
                    </Flex>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              Atualizar Dados
            </button>
            <button type="submit" id="logout" disabled={isSubmitting}>
              Sair da Conta
            </button>
          </div>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
