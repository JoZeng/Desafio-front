import ModalContent from "../ModalContent";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { getItem } from "../../../../utils/storage";
import api from "../../../../services/api";

export default function ModalClientsEdit({
  openModal,
  closedModal,
  closedModalButton,
  onEditSuccess,
}) {
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
    mode: "onBlur",
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
    console.log("Submetido!", data);
    setErrorMessage({ email: "", cpassword: "", cpf: "", phone: "" });

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

      onEditSuccess();

      if (response.status >= 200 && response.status < 300) {
        console.log("Atualização do cliente feito com sucesso!");

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

        setOpenModalSucess(true);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }

  return (
    <div>
      <ModalContent
        openModalClientAdd={true}
        openModalHomeEdit={openModal}
        closedModal={closedModal}
        closedModalButton={closedModalButton}
        openModalSucess={openModalSucess}
        messageSucess={"Cadastro Alterado com sucesso!"}
        headerModalText={"Editar Cliente"}
        handleSubmit={handleSubmit(onSubmit)}
        firstLabel={"Nome*"}
        firstClassName={errors.name ? "label-errors" : null}
        firstPlaceholder={"Digite seu nome"}
        firstInputProps={{
          ...register("name", {
            required: "Nome é obrigatório",
          }),
        }}
        firstType={"name"}
        firstError={
          errors.name && (
            <span className="input-errors">{errors.name.message}</span>
          )
        }
        secondLabel={"Email*"}
        secondClassName={errors.name ? "label-errors" : null}
        secondPlaceholder={"Digite seu email"}
        secondInputProps={{
          ...register("email", {
            required: "Email é obrigatório",
          }),
        }}
        secondType={"email"}
        secondError={
          errors.email ? (
            <span className="input-errors">{errors.email.message}</span>
          ) : errorMessage.email ? (
            <span className="input-errors">{errorMessage.email}</span>
          ) : null
        }
        thirdLabel={"CPF*"}
        thirdClassName={errors.cpf ? "label-errors" : null}
        thirdPlaceholder={"Digite seu CPF"}
        thirdType={"text"}
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
          errors.cpf && (
            <span className="input-errors">{errors.cpf.message}</span>
          )
        }
        fourthLabel={"Telefone*"}
        fourthClassName={errors.phone ? "label-errors" : null}
        fourthPlaceholder={"Digite seu Telefone"}
        fourthType={"number"}
        fourthInputProps={{
          children: (
            <Controller
              name="phone"
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
        fifthLabel={"Endereço"}
        fifthClassName={errors.cpassword ? "label-errors" : null}
        fifthPlaceholder={"Digite o endereço"}
        fifthInputProps={{
          ...register("adress", {}),
        }}
        fifthType={"adress"}
        fifthError={
          errors.adress && (
            <span className="input-errors">{errors.adress.message}</span>
          )
        }
        sixthLabel={"Complemento"}
        sixthClassName={errors.complement ? "label-errors" : null}
        sixthPlaceholder={"Digite o complemento"}
        sixthInputProps={{
          ...register("complement", {}),
        }}
        sixthType={"number"}
        sixthError={
          errors.complement && (
            <span className="input-errors">{errors.complement.message}</span>
          )
        }
        seventhLabel={"CEP"}
        seventhClassName={errors.complement ? "label-errors" : null}
        seventhPlaceholder={"Digite o CEP"}
        seventhInputProps={{
          children: (
            <Controller
              name="uf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000000-000"
                  className="input"
                  placeholder="Digite seu CEP"
                />
              )}
            />
          ),
        }}
        seventhType={"number"}
        seventhError={
          errors.complement && (
            <span className="input-errors">{errors.complement.message}</span>
          )
        }
        eighthLabel={"Bairro"}
        eighthClassName={errors.complement ? "label-errors" : null}
        eighthPlaceholder={"Digite o bairro"}
        eighthInputProps={{
          ...register("neighborhood", {}),
        }}
        eighthType={"name"}
        eighthError={
          errors.complement && (
            <span className="input-errors">{errors.complement.message}</span>
          )
        }
        ninthLabel={"Cidade"}
        ninthClassName={errors.complement ? "label-errors" : null}
        ninthPlaceholder={"Digite a cidade"}
        ninthInputProps={{
          ...register("city", {}),
        }}
        ninthType={"name"}
        ninthError={
          errors.complement && (
            <span className="input-errors">{errors.complement.message}</span>
          )
        }
        tenthLabel={"UF"}
        tenthClassName={errors.complement ? "label-errors" : null}
        tenthPlaceholder={"Digite o UF"}
        tenthInputProps={{
          children: (
            <Controller
              name="uf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="aa"
                  className="input"
                  placeholder="Digite seu UF"
                />
              )}
            />
          ),
        }}
        tenthType={"name"}
        tenthError={
          errors.complement && (
            <span className="input-errors">{errors.complement.message}</span>
          )
        }
        buttonText={"Aplicar"}
      />
    </div>
  );
}
