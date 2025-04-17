import ModalContent from "../ModalContent";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useModalClientsEdit } from "./ModalClientsEditContext";

export default function ModalClientsEdit({}) {
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
    openModalSucess,
    errorMessage,
  } = useModalClientsEdit();

  return (
    <div>
      <ModalContent
        openModalClientEdit={openModal}
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
        secondErrorError={
          errors.email && (
            <span className="input-errors">{errors.email.message}</span>
          )
        }
        null
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
                  value={field.value}
                  inputRef={(el) => {
                    field.ref(el);
                  }}
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
                  mask="00-00000.0000"
                  className="input"
                  placeholder="Digite seu CPF"
                  value={field.value}
                  inputRef={(el) => {
                    field.ref(el);
                  }}
                />
              )}
            />
          ),
        }}
        fifthLabel={"Endereço"}
        fifthClassName={errors.cpassword ? "label-errors" : null}
        fifthPlaceholder={"Digite o endereço"}
        fifthInputProps={{
          ...register("address", {}),
        }}
        fifthType={"address"}
        fifthError={
          errors.address && (
            <span className="input-errors">{errors.address.message}</span>
          )
        }
        sixthLabel={"Complemento"}
        sixthClassName={errors.complement ? "label-errors" : null}
        sixthPlaceholder={"Digite o complemento"}
        sixthInputProps={{
          ...register("complement", {}),
        }}
        sixthType={"text"}
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
              name="cep"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  mask="000.000.000-00"
                  className="input"
                  placeholder="Digite seu CPF"
                  value={field.value}
                  inputRef={(el) => {
                    field.ref(el);
                  }}
                />
              )}
            />
          ),
        }}
        seventhType={"number"}
        seventhError={
          errors.cep && (
            <span className="input-errors">{errors.cep.message}</span>
          )
        }
        eighthLabel={"Bairro"}
        eighthClassName={errors.neighborhood ? "label-errors" : null}
        eighthPlaceholder={"Digite o bairro"}
        eighthInputProps={{
          ...register("neighborhood", {}),
        }}
        eighthType={"name"}
        eighthError={
          errors.neighborhood && (
            <span className="input-errors">{errors.neighborhood.message}</span>
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
          errors.city && (
            <span className="input-errors">{errors.city.message}</span>
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
                  inputRef={(el) => {
                    field.ref(el);
                  }}
                />
              )}
            />
          ),
        }}
        tenthType={"name"}
        tenthError={
          errors.uf && <span className="input-errors">{errors.uf.message}</span>
        }
        buttonText={"Aplicar"}
        isSubmitting={isSubmitting}
        isSubmittedSuccessfully={isSubmittedSuccessfully}
      />
    </div>
  );
}
