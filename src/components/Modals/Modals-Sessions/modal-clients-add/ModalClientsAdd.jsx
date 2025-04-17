import ModalContent from "../ModalContent";
import { useModalClientsCharges } from "./ModalClientsAddContext";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function ModalClientsAdd() {
  const {
    openModal,
    closedModal,
    closedModalButton,
    openModalSucess,
    register,
    control,
    handleSubmit,
    onSubmit,
    errorMessage,
    errors,
  } = useModalClientsCharges();

  return (
    <div>
      <ModalContent
        openModalClientAdd={openModal}
        closedModalButton={closedModalButton}
        closedModal={closedModal}
        openModalSucess={openModalSucess}
        messageSucess={"Cadastro Alterado com sucesso!"}
        headerModalText={"Adicionar Cliente"}
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
