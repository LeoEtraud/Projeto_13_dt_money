import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useEffect } from "react";
import { TransactionsContext } from "../../contexts/transactionProvider";
import { Transaction } from "../../contexts/transactionProvider/types";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

interface TransactionModalProps {
  transactionToEdit?: Transaction;
  onSubmitComplete?: () => void;
}

export function TransactionModal({
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

  // Atualiza valores ao receber uma transação para editar
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
      await searchTransaction();
    } else {
      await newTransaction(data);
      await searchTransaction();
    }
    reset();
    if (onSubmitComplete) onSubmitComplete();
  }

  return (
    <Content>
      <Dialog.Title>
        {transactionToEdit ? "Editar Transação" : "Nova Transação"}
      </Dialog.Title>

      <CloseButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onSubmitComplete) onSubmitComplete();
        }}
        title="Fechar"
      >
        <X size={24} />
      </CloseButton>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Descrição"
          {...register("description")}
          autoComplete="off"
        />
        <input
          type="number"
          placeholder="Preço"
          {...register("price", { valueAsNumber: true })}
          autoComplete="off"
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
          render={({ field }) => {
            return (
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
            );
          }}
        />

        <button type="submit" disabled={isSubmitting}>
          {transactionToEdit ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </Content>
  );
}
