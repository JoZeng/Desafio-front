import "./login-section-confirmation.css";

function LoginSectionConfirmation({
  buttonText,
  Iconconfirm,
  greenlinehorizontal,
}) {
  return (
    <div className="loginsectionconfirmation-card">
      <div className="loginsection-container">
        <img src={Iconconfirm} alt="checkicon" />
        <div className="loginsectionconfirmation-container">
          <h1>Cadastro realizado com sucesso!</h1>
        </div>
        <div className="loginsection-container-button"></div>
      </div>
      <button type="submit" className="loginsectionconfrimation-button">
        {buttonText}
      </button>
      <div className="loginsection-greelineshorizontal">
        <img src={greenlinehorizontal} />
      </div>
    </div>
  );
}

export default LoginSectionConfirmation;
