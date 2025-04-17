import { createContext, useContext, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getItem, setItem } from "../../../../utils/storage";

const schema = yup.object().shape({
  name: yup.string().required("Este campo deve ser preenchido"),
  email: yup.string().required("Este campo deve ser preenchido"),
  cpf: yup
    .string()
    .test(
      "len",
      "CPF deve ter 11 caracteres.",
      (val) => val?.replace(/[^\d]/g, "").length === 11
    )
    .nullable(),
  cel: yup.string().nullable(),
  password: yup.string().required("Este campo deve ser preenchido"),
});

export const ModalUserEditContext = createContext();
export const ModalUserEditProvider = ({
  children,
  openModal,
  closedModal,
  closedModalButton,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const token = getItem("token");
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    cpassword: "",
    cpf: "",
    cel: "",
  });

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
        setIsSubmittedSuccessfully(false);
        closedModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [openModalSucess, closedModal]);

  useEffect(() => {
    if (isSubmittedSuccessfully) {
      toast.success("Editado com sucesso!");
    }
  }, [isSubmittedSuccessfully]);

  const onSubmit = async (data) => {
    if (isSubmitting || isSubmittedSuccessfully) return;

    const { name, email, cpf, cel, password } = data;

    if (
      cpf.replace(/[^\d]/g, "").length !== 11 ||
      cel.replace(/[^\d]/g, "").length !== 11
    ) {
      setErrorMessage({
        ...errorMessage,
        cpf: "CPF e telefone devem ter 11 caracteres.",
      });
      return;
    }

    const updatedData = {
      nome: name,
      email,
      senha: password,
      cpf: cpf.replace(/[^\d]/g, ""),
      telefone: cel.replace(/[^\d]/g, ""),
    };

    try {
      setIsSubmitting(true);

      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      const response = await api.put("/usuario", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        setItem("userName", name);
        setItem("userEmail", email);

        setOpenModalSucess(true);
        setIsSubmittedSuccessfully(true);
      }
    } catch (error) {
      if (error.response) {
        const { email, cpf, telefone } = error.response.data.errors || {};
        setErrorMessage({ ...errorMessage, email, cpf, cel: telefone });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      async function fetchUserData() {
        try {
          const response = await api.get("/usuario", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { nome, email, cpf, telefone } = response.data;
          reset({
            name: nome,
            email,
            cpf,
            cel: telefone,
            password: "",
            cpassword: "",
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
    <ModalUserEditContext.Provider
      value={{
        openModal,
        closedModal,
        closedModalButton,
        register,
        handleSubmit,
        control,
        onSubmit,
        errors,
        errorMessage,
        openModalSucess,
        isSubmitting,
        isSubmittedSuccessfully,
      }}
    >
      {children}
    </ModalUserEditContext.Provider>
  );
};

export const useModalUserEditContext = () => {
  const context = useContext(ModalUserEditContext);
  return context;
};
