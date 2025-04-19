import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect, createContext, useContext } from "react";
import { getItem } from "../../../../utils/storage";
import api from "../../../../services/api";

export const ModalClientsAddContext = createContext();

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  cpf: yup
    .string()
    .required("Campo obrigatório")
    .test("cpf-length", "CPF deve conter 11 dígitos", (value) =>
      value ? value.replace(/\D/g, "").length === 11 : false
    ),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .test("phone-length", "Telefone deve conter 11 dígitos", (value) =>
      value ? value.replace(/\D/g, "").length === 11 : false
    ),
  cep: yup.string().test("cep-length", "CEP deve conter 8 dígitos", (value) => {
    if (!value) return true;
    return value.replace(/\D/g, "").length === 8;
  }),
});

export const ModalClientsAddProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    cpf: "",
    phone: "",
  });

  const token = getItem("token");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // Limpa erros personalizados ao digitar novamente
  const [cpf, email, phone] = watch(["cpf", "email", "phone"]);
  useEffect(() => {
    setErrorMessage({ email: "", cpf: "", phone: "" });
  }, [cpf, email, phone]);

  // Reset ao abrir o modal
  useEffect(() => {
    if (openModal) {
      reset();
      setErrorMessage({ email: "", cpf: "", phone: "" });
    }
  }, [openModal, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting || !token) return;

    setIsSubmitting(true);

    const formData = {
      nome: data.name.trim(),
      email: data.email.trim(),
      cpf: data.cpf?.replace(/\D/g, "") || "",
      telefone: data.phone?.replace(/\D/g, "") || "",
      cep: data.cep?.replace(/\D/g, "") || "",
      endereco: data.address?.trim() || "",
      complemento: data.complement?.trim() || "",
      bairro: data.neighborhood?.trim() || "",
      cidade: data.city?.trim() || "",
      estado: data.uf?.trim().toUpperCase() || "",
    };

    try {
      const response = await api.post("/clientes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        setOpenModalSucess(true);
        reset();
        setTimeout(() => {
          setOpenModalSucess(false);
          closedModal();
          toast.success("Cliente adicionado com sucesso!");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage({
        email: error.response?.data?.email || "",
        cpf: error.response?.data?.cpf || "",
        phone: error.response?.data?.telefone || "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalClientsAddContext.Provider
      value={{
        openModal,
        closedModal,
        closedModalButton,
        register,
        handleSubmit,
        control,
        onSubmit,
        errors,
        isSubmitting,
        errorMessage,
        openModalSucess,
      }}
    >
      {children}
    </ModalClientsAddContext.Provider>
  );
};

export const useModalClientsAdd = () => useContext(ModalClientsAddContext);
