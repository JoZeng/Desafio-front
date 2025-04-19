import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import { getItem } from "../../../../utils/storage";

export const ModalClientsEditContext = createContext();

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

export const ModalClientsEditProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
  onUpdate,
}) => {
  const { id } = useParams();
  const token = getItem("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    cpf: "",
    phone: "",
  });

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

  const [cpf, email, phone] = watch(["cpf", "email", "phone"]);
  useEffect(() => {
    setErrorMessage({ email: "", cpf: "", phone: "" });
  }, [cpf, email, phone]);

  useEffect(() => {
    if (openModal && id) {
      (async () => {
        try {
          const { data } = await api.get(`/clientes/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
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
          } = data.cliente;

          reset({
            name: nome,
            email,
            cpf: cpf?.replace(/\D/g, "") || "",
            phone: telefone?.replace(/\D/g, "") || "",
            cep: cep?.replace(/\D/g, "") || "",
            address: endereco || "",
            complement: complemento || "",
            neighborhood: bairro || "",
            city: cidade || "",
            uf: estado || "",
          });
        } catch (error) {
          toast.error("Erro ao carregar dados do cliente.");
          console.error(error.response?.data || error.message);
        }
      })();
    }
  }, [openModal, id, reset, token]);

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
      const response = await api.put(`/clientes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        setOpenModalSucess(true);
        toast.success("Cliente editado com sucesso!");
        if (onUpdate) onUpdate(response.data.cliente);
        setTimeout(() => {
          setOpenModalSucess(false);
          closedModal();
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
        errorMessage,
        openModalSucess,
        id,
      }}
    >
      {children}
    </ModalClientsEditContext.Provider>
  );
};

export const useModalClientsEdit = () => useContext(ModalClientsEditContext);
