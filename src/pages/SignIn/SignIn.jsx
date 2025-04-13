import "./SignIn.css";
import { setItem } from "../../utils/storage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import LeftSection from "../../components/LoginSection/LeftSection/LeftSection";
import RightSection from "../../components/LoginSection/RightSection/RightsSection";
import Circlegreen from "../../assets/circlegreen.svg";
import Circlewhite from "../../assets/circlewhite.svg";
import Greenline from "../../assets/greenline.png";
import Greenlinehorizontal from "../../assets/greenlinehorizontal.svg";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState("");
  const schema = yup.object().shape({
    name: yup.string().required("Este campo deve ser preenchido"),
    email: yup.string().required("Este campo deve ser preenchido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      setItem("name", data.name);
      setItem("email", data.email);

      const response = await api.get("/verificar-email", {
        params: {
          email: data.email,
        },
      });

      if (response.data.existe) {
        setErrorEmail(error.response.data.mensagem);
        return;
      }

      navigate("/senha");
    } catch (error) {
      if (error.response?.data?.mensagem) {
        setErrorEmail(error.response.data.mensagem);
      } else {
        console.log("Erro inesperado:", error);
      }
    }
  }

  return (
    <div className="signInContainer">
      <LeftSection
        circle1={Circlegreen}
        circle2={Circlewhite}
        secondOnClick={() => navigate("/senha")}
        circle3={Circlewhite}
        thirdOnClick={() => navigate("/login")}
        greenline={Greenline}
        title1={"Cadastre-se"}
        subtitle1={"Por favor, escreva seu nome e e-mail"}
        title2={"Escolha uma senha"}
        subtitle2={"Escolha uma senha segura"}
        title3={"Cadastro realizado com sucesso"}
        subtitle3={"E-mail e senha cadastrados com sucesso"}
      />
      <RightSection
        title={"Adicione seus dados"}
        onSubmit={handleSubmit(onSubmit)}
        firstLabel={"Nome"}
        firstPlaceholder={"Digite seu nome"}
        firstInputProps={{
          ...register("name", {
            required: "Nome é obrigatório",
          }),
        }}
        firstType={"text"}
        firstError={errors.name}
        secondLabel={"E-mail"}
        secondPlaceholder={"Digite seu e-mail"}
        secondType={"email"}
        secondInputProps={{
          ...register("email", {
            required: "Email é obrigatório",
          }),
        }}
        secondError={errors.email || errorEmail}
        buttonText={"Continuar"}
        linkText={"Já possui uma conta? Faça seu"}
        linkNavigator={() => navigate("/login")}
        linkPath={"Login"}
        greenline={Greenlinehorizontal}
      />
    </div>
  );
}

export default SignIn;
