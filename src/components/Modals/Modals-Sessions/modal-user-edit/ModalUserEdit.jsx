import ModalContent from "../ModalContent";
import { useModalUserEditContext } from "./ModalUserEditContext";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function ModalUserEdit() {
  const {
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
  } = useModalUserEditContext();

  return (
    <ModalContent
      openModalUserEdit={openModal}
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
      thirdLabel="CPF"
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
      fourthLabel="Telefone"
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
      isSubmitting={isSubmitting}
      isSubmittedSuccessfully={isSubmittedSuccessfully}
    />
  );
}
