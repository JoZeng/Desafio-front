import ModalContent from "../ModalContent";
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
    errors,
    isSubmitting,
    isSubmittedSuccessfully,
  } = useModalClientsAddCharges();

  return (
    <>
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
            }),
          }}
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
    </>
  );
}
