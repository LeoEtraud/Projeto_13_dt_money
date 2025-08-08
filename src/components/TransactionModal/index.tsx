import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  TransactionType,
  TransactionTypeButton,
  Overlay, // <— certifique-se de exportar no styles
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useEffect } from "react";
import { TransactionsContext } from "../../contexts/transactionProvider";
import { Transaction } from "../../contexts/transactionProvider/types";

const newTransactionFormSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória"),
  price: z.number(),
  category: z.string().min(1, "Categoria obrigatória"),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionToEdit?: Transaction;
  onSubmitComplete?: () => void;
}

export function TransactionModal({
  open,
  onOpenChange,
  transactionToEdit,
  onSubmitComplete,
}: TransactionModalProps) {
  const { newTransaction, updateTransaction, searchTransaction } =
    useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
      description: "",
      price: undefined,
      category: "",
    },
  });

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        description: transactionToEdit.description,
        price: transactionToEdit.price,
        category: transactionToEdit.category,
        type: transactionToEdit.type,
      });
    } else {
      reset({
        description: "",
        price: undefined,
        category: "",
        type: "income",
      });
    }
  }, [transactionToEdit, reset]);

  async function handleFormSubmit(data: NewTransactionFormInputs) {
    if (transactionToEdit) {
      await updateTransaction(transactionToEdit.id, data);
    } else {
      await newTransaction(data);
    }
    await searchTransaction();
    reset();
    onSubmitComplete?.();
    onOpenChange(false); // fecha o modal ao concluir
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* 🔑 Overlay visível cobrindo a app */}
        <Overlay />

        <Content
          onInteractOutside={(e) => e.preventDefault()} // evita fechar ao clicar fora (opcional)
        >
          <Dialog.Title>
            {transactionToEdit ? "Editar Transação" : "Nova Transação"}
          </Dialog.Title>

          {/* Use o Close do Radix para garantir o fechamento */}
          <Dialog.Close asChild>
            <CloseButton type="button" title="Fechar">
              <X size={24} />
            </CloseButton>
          </Dialog.Close>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              type="text"
              placeholder="Descrição"
              {...register("description")}
              autoComplete="off"
              autoFocus
            />

            <input
              type="number"
              placeholder="Preço"
              {...register("price", { valueAsNumber: true })}
              autoComplete="off"
              inputMode="decimal"
            />

            <input
              type="text"
              placeholder="Categoria"
              {...register("category")}
              autoComplete="off"
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )}
            />

            <button type="submit" disabled={isSubmitting}>
              {transactionToEdit ? "Atualizar" : "Cadastrar"}
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
