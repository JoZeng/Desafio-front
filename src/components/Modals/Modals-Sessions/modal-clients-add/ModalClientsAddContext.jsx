import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect, createContext, useContext } from "react";
import { getItem } from "../../../../utils/storage";
import api from "../../../../services/api";

export const ModalClientsAddContext = createContext();
export const ModalClientsAddProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
}) => {
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const token = getItem("token");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    cpassword: "",
    cpf: "",
    phone: "",
  });

  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Campo obrigátorio"),
      email: yup.string().required("Campo obrigátorio"),
      cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
        .required("Campo obrigatório"),
      phone: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Telefone inválido")
        .required("Campo obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (openModalSucess) {
      const timer = setTimeout(() => {
        setOpenModalSucess(false);
        closedModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [openModalSucess, closedModal]);

  async function onSubmit(data) {
    setErrorMessage({ email: "", cpassword: "", cpf: "", phone: "" });

    try {
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }
      console.log("erro 1");
      const response = await api.post(
        "/clientes",
        {
          nome: data.name,
          email: data.email,
          cpf: data.cpf,
          telefone: data.phone,
          cep: data.cep,
          endereco: data.adress,
          complemento: data.complement,
          bairro: data.neighborhood,
          cidade: data.city,
          estado: data.uf,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("erro 2");
      if (response.status >= 200 && response.status < 300) {
        console.log("Cadastro do cliente feito com sucesso!");

        reset({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telefone: data.phone,
          endereco: data.adress,
          complemento: data.complement,
          cep: data.cep,
          bairro: data.neighborhood,
          cidade: data.city,
          estado: data.uf,
        });
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
    }
  }

  return (
    <ModalClientsAddContext.Provider
      value={{
        openModal,
        closedModal,
        closedModalButton,
        openModalSucess,
        closedModal,
        register,
        control,
        handleSubmit,
        onSubmit,
        errorMessage,
        errors,
      }}
    >
      {children}
    </ModalClientsAddContext.Provider>
  );
};

export const useModalClientsCharges = () => {
  const context = useContext(ModalClientsAddContext);
  return context;
};
