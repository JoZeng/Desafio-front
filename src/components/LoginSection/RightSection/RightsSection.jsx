import "./RightSection.css";

function RightSection({
  title,
  onSubmit,
  firstLabel,
  firstPlaceholder,
  firstInputProps,
  firstType,
  firstError,
  secondLabel,
  secondPlaceholder,
  secondInputProps,
  secondType,
  secondError,
  buttonText,
  linkText,
  linkPath,
  linkNavigator,
  greenline,
}) {
  return (
    <div className="rightSection">
      <div className="loginsection-container">
        <h1>{title}</h1>

        <form className="loginsection-form" onSubmit={onSubmit}>
          <div className="loginsection-container-form">
            <div className="loginsection-container-form-first">
              <label>{firstLabel}</label>
              <input
                placeholder={firstPlaceholder}
                type={firstType}
                {...firstInputProps}
              />
              <span className="input-errors">
                {typeof firstError === "string"
                  ? firstError
                  : firstError?.message || null}
              </span>
            </div>

            <div className="loginsection-container-form-second">
              <div className="loginsection-container-form-second-label">
                <label>{secondLabel}</label>
              </div>
              <input
                placeholder={secondPlaceholder}
                type={secondType}
                {...secondInputProps}
              />
              <span className="input-errors">
                {typeof secondError === "string"
                  ? secondError
                  : secondError?.message || null}
              </span>
            </div>
          </div>
          <div className="loginsection-container-button">
            <button type="submit" className="loginsection-button">
              {buttonText}
            </button>
          </div>
        </form>

        <div className="loginsection-container-login">
          <p>{linkText}</p>
          <a onClick={linkNavigator}>{linkPath}</a>
        </div>
      </div>
      <div className="loginsection-greelines">
        <img src={greenline} alt="Green line" />
      </div>
    </div>
  );
}

export default RightSection;
