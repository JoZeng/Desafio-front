import ModalContent from "../ModalContent";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { getItem, setItem } from "../../../../utils/storage";
import api from "../../../../services/api";

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

export default function ModalHomeUserEdit({
  openModal,
  closedModal,
  closedModalButton,
}) {
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

  const onSubmit = async (data) => {
    const { cpf, cel, name, email, password } = data;

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
      const response = await api.put("/usuario", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status >= 200 && response.status < 300) {
        setItem("userName", name);
        setItem("userEmail", email);

        reset({ name, email, cpf, cel, password: "", cpassword: "" });
        setOpenModalSucess(true);
      }
    } catch (error) {
      if (error.response) {
        const { email, cpf, telefone } = error.response.data.errors || {};
        setErrorMessage({ ...errorMessage, email, cpf, cel: telefone });
      }
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

  useEffect(() => {
    if (openModalSucess) {
      const timer = setTimeout(() => {
        setOpenModalSucess(false);
        closedModal();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openModalSucess, closedModal]);

  return (
    <ModalContent
      openModalHomeEdit={openModal}
      closedModal={closedModal}
      closedModalButton={closedModalButton}
      openModalSucess={openModalSucess}
      messageSucess="Cadastro Alterado com sucesso!"
      headerModalText="Edite seu cadastro"
      handleSubmit={handleSubmit(onSubmit)}
      firstLabel="Nome*"
      firstClassName={errors.name ? "label-errors" : ""}
      firstPlaceholder="Digite seu nome"
      firstInputProps={{
        ...register("name", {
          required: "Nome é obrigatório",
        }),
      }}
      firstError={
        errors.name && (
          <span className="input-errors">{errors.name.message}</span>
        )
      }
      secondLabel="Email*"
      secondClassName={errors.email ? "label-errors" : ""}
      secondPlaceholder="Digite seu email"
      secondInputProps={{
        ...register("email", {
          required: "Email é obrigatório",
        }),
      }}
      secondError={
        errors.email && (
          <span className="input-errors">{errors.email.message}</span>
        )
      }
      thirdLabel="CPF*"
      thirdClassName={errors.cpf ? "label-errors" : ""}
      thirdInputProps={{
        children: (
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="000.000.000-00"
                className="input"
                placeholder="Digite seu CPF"
              />
            )}
          />
        ),
      }}
      thirdError={
        errors.cpf && <span className="input-errors">{errors.cpf.message}</span>
      }
      fourthLabel="Telefone*"
      fourthClassName={errors.cel ? "label-errors" : ""}
      fourthInputProps={{
        children: (
          <Controller
            name="cel"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="00-00000.0000"
                className="input"
                placeholder="Digite seu Telefone"
              />
            )}
          />
        ),
      }}
      fourthError={
        errors.cel && <span className="input-errors">{errors.cel.message}</span>
      }
      fifthLabel="Nova Senha*"
      fifthType={"password"}
      fifthClassName={errors.password ? "label-errors" : ""}
      fifthInputProps={{
        ...register("password", { required: "Senha é obrigatória" }),
      }}
      fifthError={
        errors.password && (
          <span className="input-errors">{errors.password.message}</span>
        )
      }
      sixthLabel="Confirmar Senha*"
      sixthType={"password"}
      sixthClassName={errors.cpassword ? "label-errors" : ""}
      sixthInputProps={{
        ...register("cpassword", {
          required: "É obrigatório digitar a nova senha para confirmar",
        }),
      }}
      sixthError={
        errors.cpassword && (
          <span className="input-errors">{errors.cpassword.message}</span>
        )
      }
      buttonText="Aplicar"
    />
  );
}
