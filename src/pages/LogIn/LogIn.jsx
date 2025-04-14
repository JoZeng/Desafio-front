import { setItem } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import LeftSection from "../../components/login-section/left-section/LeftSection";
import RightSection from "../../components/login-section/right-section/RightsSection";
import greenline3 from "../../assets/greenlinehorizontal3.svg";
import { useState } from "react";

function LogIn() {
  const navigate = useNavigate();
  const [errorBack, setErrorBack] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("Este campo deve ser preenchido"),
    password: yup
      .string()
      .min(6, "Precisa de pelo menos 6 caracteres")
      .required("Este campo deve ser preenchido"),
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
      const response = await api.post("/login", {
        email: data.email,
        senha: data.password,
      });

      const { usuario, token } = response.data;

      setItem("token", token);
      setItem("userId", usuario.id);
      setItem("userName", usuario.nome);
      setItem("userEmail", usuario.email);
      navigate("/home");
    } catch (error) {
      setErrorBack(error.response.data.mensagem);
      console.log(error.response.data.mensagem);
    }
  }

  return (
    <div className="signInContainer">
      <LeftSection
        text={
          <p>
            Gerencie todos os pagamentos<br></br> da sua empresa em um só
            <br></br>lugar.
          </p>
        }
      />
      <RightSection
        title={"Faça seu login"}
        onSubmit={handleSubmit(onSubmit)}
        firstLabel={"E-email"}
        firstPlaceholder={"Digite seu e-mail"}
        firstType={"email"}
        firstInputProps={{ ...register("email") }}
        firstError={errors.email?.message || errorBack}
        secondLabel={"Senha"}
        secondPlaceholder={"Digite sua senha"}
        secondType={"password"}
        secondInputProps={{ ...register("password") }}
        secondError={errors.password}
        buttonText={"Entrar"}
        linkText={"Ainda não possui uma conta?"}
        linkNavigator={() => navigate("/")}
        linkPath={"Cadastre-se"}
        greenline={greenline3}
      />
    </div>
  );
}

export default LogIn;
