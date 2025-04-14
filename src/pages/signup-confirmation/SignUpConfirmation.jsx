import { useNavigate } from "react-router-dom";
import LoginSectionConfirmation from "../../components/login-section/right-section/login-section-confirmation/LoginSectionConfirmation";
import LeftSection from "../../components/login-section/left-section/LeftSection";
import Circlechecked from "../../assets/circlechecked.svg";
import Greenline from "../../assets/greenline.png";
import Iconconfirm from "../../assets/icon-confirm.svg";
import greenlinehorizontal from "../../assets/greenlinehorizontal3.svg";

function SignUpConfirmation() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/login");
  }, 3000);

  return (
    <div className="signInContainer">
      <LeftSection
        circle1={Circlechecked}
        circle2={Circlechecked}
        circle3={Circlechecked}
        greenline={Greenline}
        title1={"Cadastre-se"}
        subtitle1={"Por favor, escreva seu nome e e-mail"}
        title2={"Escolha uma senha"}
        subtitle2={"Escolha uma senha segura"}
        title3={"Cadastro realizado com sucesso"}
        subtitle3={"E-mail e senha cadastrados com sucesso"}
      />
      <LoginSectionConfirmation
        buttonText={"Ir para Login"}
        Iconconfirm={Iconconfirm}
        greenlinehorizontal={greenlinehorizontal}
      />
    </div>
  );
}

export default SignUpConfirmation;
