import { createContext, useContext, useState, useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getItem } from "../../../../utils/storage";

export const ModalClientsAddChargesContext = createContext();

export const ModalClientsAddChargesProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
  onUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const clientName = getItem("clientName");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      status: "pendente",
    },
  });

  useEffect(() => {
    if (openModalSucess) {
      const timer = setTimeout(() => {
        setOpenModalSucess(false);
        setIsSubmittedSuccessfully(false);
        closedModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [openModalSucess, closedModal]);

  useEffect(() => {
    if (isSubmittedSuccessfully) {
      toast.success("Enviado com sucesso!");
    }
  }, [isSubmittedSuccessfully]);

  const onSubmit = async (data) => {
    if (isSubmitting || isSubmittedSuccessfully) return;

    const token = getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.post(
        "/clientes/cobrancas",
        {
          descricao: data.description,
          vencimento: data.expirationdate,
          valor: data.value,
          status: data.status,
          cliente_id: getItem("clientId"),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        reset({
          description: "",
          expirationdate: "",
          value: "",
          status: "pendente",
        });

        setOpenModalSucess(true);
        setIsSubmittedSuccessfully(true);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalClientsAddChargesContext.Provider
      value={{
        openModal,
        closedModal,
        closedModalButton,
        register,
        handleSubmit,
        onSubmit,
        control,
        clientName,
        errors,
        isSubmitting,
        isSubmittedSuccessfully,
      }}
    >
      {children}
    </ModalClientsAddChargesContext.Provider>
  );
};

export const useModalClientsAddCharges = () => {
  return useContext(ModalClientsAddChargesContext);
};
