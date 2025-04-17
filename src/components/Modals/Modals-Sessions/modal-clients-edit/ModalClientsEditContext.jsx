import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../../services/api";
import { useForm } from "react-hook-form";
import { getItem } from "../../../../utils/storage";

export const ModalClientsEditContext = createContext();

export const ModalClientsEditProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
  onUpdate, // Função que atualiza os dados no contexto do componente pai
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const token = getItem("token");
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    cpassword: "",
    cpf: "",
    phone: "",
  });

  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Campo obrigatório"),
      email: yup.string().required("Campo obrigatório"),
      cpf: yup.string().required("Campo obrigatório"),
      phone: yup.string().required("Campo obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (openModalSucess) {
      const timer = setTimeout(() => {
        setOpenModalSucess(false); // Fecha o modal após 3 segundos
        setIsSubmittedSuccessfully(false); // Reseta o estado de sucesso
        closedModal(); // Fecha o modal
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [openModalSucess, closedModal]);

  useEffect(() => {
    if (isSubmittedSuccessfully) {
      toast.success("Editado com sucesso!"); // Exibe o toast de sucesso
    }
  }, [isSubmittedSuccessfully]);

  async function onSubmit(data) {
    console.log("Enviando dados...", data);

    if (isSubmitting || isSubmittedSuccessfully) return;

    try {
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      const response = await api.put(
        `/clientes/${id}`,
        {
          nome: data.name,
          email: data.email,
          cpf: data.cpf,
          telefone: data.phone,
          cep: data.cep,
          endereco: data.address,
          complemento: data.complement,
          bairro: data.neighborhood,
          cidade: data.city,
          estado: data.uf,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Atualização do cliente feita com sucesso!");
        setOpenModalSucess(true); // Marca o sucesso
        setIsSubmittedSuccessfully(true); // Define como sucesso
        if (onUpdate) onUpdate(response.data.cliente); // Atualiza os dados no contexto ou componente pai com os dados atualizados
      }
      setOpenModalSucess(true);
      setIsSubmittedSuccessfully(true);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setErrorMessage({
        email: "Erro no email",
        cpassword: "Erro na senha",
        cpf: "Erro no CPF",
        phone: "Erro no telefone",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (openModal && id) {
      async function fetchUserData() {
        const token = getItem("token");
        try {
          const response = await api.get(`/clientes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const {
            nome,
            email,
            cpf,
            telefone,
            cep,
            endereco,
            complemento,
            bairro,
            cidade,
            estado,
          } = response.data.cliente;

          reset({
            name: nome,
            email: email,
            cpf: cpf,
            phone: telefone,
            address: endereco,
            complement: complemento,
            cep: cep,
            neighborhood: bairro,
            city: cidade,
            uf: estado,
          });
        } catch (error) {
          console.error(
            "Erro ao buscar dados do usuário:",
            error.response?.data || error.message
          );
        }
      }

      fetchUserData();
    }
  }, [openModal, reset, token]);

  return (
    <ModalClientsEditContext.Provider
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
        isSubmittedSuccessfully,
        errorMessage,
        openModalSucess,
        id,
      }}
    >
      {children}
    </ModalClientsEditContext.Provider>
  );
};

export const useModalClientsEdit = () => {
  const context = useContext(ModalClientsEditContext);
  return context;
};
