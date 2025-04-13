import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getItem, clear } from "../../utils/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import LeftSection from "../../components/LoginSection/LeftSection/LeftSection";
import RightSection from "../../components/LoginSection/RightSection/RightsSection";
import Circlechecked from "../../assets/circlechecked.svg";
import Circlegreen from "../../assets/circlegreen.svg";
import Circlewhite from "../../assets/circlewhite.svg";
import Greenline from "../../assets/greenline.png";
import Greenlinehorizontal from "../../assets/greenlinehorizontal2.svg";

function SignUpPassword() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Precisa de pelo menos 6 caracteres")
      .required("Este campo deve ser preenchido"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não coincidem")
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
      const localname = getItem("name");
      const localemail = getItem("email");

      const response = await api.post("/usuario", {
        nome: localname,
        email: localemail,
        senha: data.password,
      });
      if (response.status > 204) {
      }
      clear();
      navigate("/confirmacao");
    } catch (error) {
      setError(error.response.data.mensagem);
    }
  }

  return (
    <div className="signInContainer">
      <LeftSection
        circle1={Circlechecked}
        firstOnClick={() => navigate("/")}
        circle2={Circlegreen}
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
        title={"Escolha uma senha"}
        onSubmit={handleSubmit(onSubmit)}
        firstLabel={"Senha"}
        firstPlaceholder={"Digite sua senha"}
        firstType={"password"}
        firstInputProps={{
          ...register("password"),
        }}
        firstError={errors.password}
        secondLabel={"Repita a senha"}
        secondPlaceholder={"Repita a sua senha"}
        secondType={"password"}
        secondValue={"cpassword"}
        secondInputProps={{
          ...register("cpassword"),
        }}
        secondError={errors.cpassword}
        buttonText={"Entrar"}
        linkText={"Já possui uma conta? Faça seu"}
        linkNavigator={() => navigate("/login")}
        linkPath={"Login"}
        greenline={Greenlinehorizontal}
      />
    </div>
  );
}

export default SignUpPassword;
