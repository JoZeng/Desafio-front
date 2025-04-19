import ModalContent from "../ModalContent";
import { IMaskInput } from "react-imask";
import { Controller } from "react-hook-form";
import { useModalClientsAddCharges } from "./ModalClientsAddChargesContext";

export default function ModalClientsAddCharges() {
  const {
    openModal,
    closedModal,
    closedModalButton,
    register,
    handleSubmit,
    onSubmit,
    clientName,
    control,
    errors,
    isSubmitting,
    isSubmittedSuccessfully,
  } = useModalClientsAddCharges();

  return (
    <div>
      <ModalContent
        handleSubmit={handleSubmit(onSubmit)}
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
        thirteenthLabel={"Vencimento*"}
        thirteenthClassName={errors.expirationdate ? "label-errors" : null}
        thirteenthPlaceholder={"Digite o Status"}
        thirteenthType={"date"}
        thirteenthInputProps={{
          ...register("expirationdate", {
            required: "Este campo deve ser preenchido",
            validate: (value) => {
              const year = new Date(value).getFullYear();
              return year.toString().length === 4 || "Ano inválido";
            },
          }),
          max: "2099-12-31",
          min: "1900-01-01",
        }}
        fourteenthLabel={"Valor*"}
        fourteenthClassName={errors.value ? "label-errors" : null}
        fourteenthPlaceholder={"Digite o valor"}
        fourteenthInputProps={{
          children: (
            <Controller
              name="value"
              control={control}
              rules={{ required: "Este campo deve ser preenchido" }}
              render={({ field }) => (
                <IMaskInput
                  mask="R$ num"
                  blocks={{
                    num: {
                      mask: Number,
                      scale: 2,
                      signed: false,
                      radix: ",",
                      thousandsSeparator: ".",
                      padFractionalZeros: true,
                      normalizeZeros: true,
                      mapToRadix: ["."],
                    },
                  }}
                  unmask={true} // ou false, depende do que você quer no value final
                />
              )}
            />
          ),
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
        secondRadioType={"radio"}
        secondRadioName={"status"}
        secondRadioValue={"pendente"}
        secondRadiotext={"Cobrança Pendente"}
        defaultChecked
        buttonText={"Aplicar"}
        isSubmitting={isSubmitting}
        isSubmittedSuccessfully={isSubmittedSuccessfully}
      />
    </div>
  );
}
