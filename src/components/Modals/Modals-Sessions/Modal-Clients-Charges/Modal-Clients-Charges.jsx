import ModalContent from "../ModalContent";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import { getItem } from "../../../../utils/storage";

export default function ModalClientsCharges({
  openModal,
  closedModal,
  closedModalButton,
}) {
  const [openModalSucess, setOpenModalSucess] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const clientName = getItem("clientName");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
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
    const token = getItem("token");

    try {
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }
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
      console.log("erro 2");
      if (response.status >= 200 && response.status < 300) {
        reset({
          descricao: data.description,
          vencimento: data.expirationdate,
          valor: data.value,
          status: data.status,
        });

        setOpenModalSucess(true);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
    }
  }

  return (
    <>
      <div>
        <ModalContent
          onSubmit={onSubmit}
          reactHookHandleSubmit={handleSubmit}
          openModalAddCharges={openModal}
          closedModalButton={closedModalButton}
          closedModal={closedModal}
          headerModalText={"Cadastro de cobrança"}
          eleventhLabel={"Nome*"}
          eleventhValue={clientName}
          twelfthLabel={"Descrição*"}
          twelfthClassName={errors.description ? "label-errors" : null}
          twelfthPlaceholder={"Digite a descrição"}
          twelfthInputProps={{
            ...register("description", {
              required: "Este campo deve ser preenchido",
            }),
          }}
          twelfthError={""}
          thirteenthLabel={"Vencimento*"}
          thirteenthClassName={errors.expirationdate ? "label-errors" : null}
          thirteenthPlaceholder={"Digite o Status"}
          thirteenthType={"date"}
          thirteenthInputProps={{
            ...register("expirationdate", {
              required: "Este campo deve ser preenchido",
            }),
          }}
          thirteenthError={""}
          fourteenthLabel={"Valor*"}
          fourteenthClassName={errors.value ? "label-errors" : null}
          fourteenthPlaceholder={"Digite o valor"}
          fourteenthType={"number"}
          fourteenthInputProps={{
            ...register("value", {
              required: "Este campo deve ser preenchido",
            }),
          }}
          radioLabel={"Status*"}
          firstRadioLabel={"Cobrança Paga"}
          firstRadioInputProps={{
            ...register("status", {}),
          }}
          firstRadioType={"radio"}
          firstRadioName={"status"}
          firstRadioValue={"pago"}
          firstRadiotext={"Cobrança Paga"}
          secondRadioInputProps={{
            ...register("status", {}),
          }}
          secondRadioName={"status"}
          secondRadioType={"radio"}
          secondRadioValue={"pendente"}
          secondRadiotext={"Cobrança Pendente"}
          buttonText={"Aplicar"}
        />
      </div>
    </>
  );
}
