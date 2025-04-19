import "./modal-content.css";
import ButtonClose from "../../../assets/button-close.svg";

export default function ModalContent({
  openModalUserEdit,
  closedModalButton,
  headerModalText,
  handleSubmit,
  isSubmitting,
  isSubmittedSuccessfully,

  firstLabel,
  firstClassName,
  firstPlaceholder,
  firstInputProps,
  firstType,
  firstError,

  secondLabel,
  secondClassName,
  secondPlaceholder,
  secondInputProps,
  secondType,
  secondError,

  thirdLabel,
  thirdClassName,
  thirdPlaceholder,
  thirdInputProps,
  thirdType,
  thirdError,

  fourthLabel,
  fourthClassName,
  fourthPlaceholder,
  fourthInputProps,
  fourthType,
  fourthError,

  fifthLabel,
  fifthClassName,
  fifthPlaceholder,
  fifthInputProps,
  fifthType,
  fifthError,

  sixthLabel,
  sixthClassName,
  sixthPlaceholder,
  sixthInputProps,
  sixthType,
  sixthError,

  buttonText,

  openModalClientAdd,
  openModalClientEdit,

  seventhLabel,
  seventhClassName,
  seventhPlaceholder,
  seventhInputProps,
  seventhType,
  seventhError,

  eighthLabel,
  eighthClassName,
  eighthPlaceholder,
  eighthInputProps,
  eighthType,
  eighthError,

  ninthLabel,
  ninthClassName,
  ninthPlaceholder,
  ninthInputProps,
  ninthType,
  ninthError,

  tenthLabel,
  tenthClassName,
  tenthPlaceholder,
  tenthInputProps,
  tenthType,
  tenthError,

  openModalAddCharges,

  eleventhLabel,
  eleventhClassName,
  eleventhValue,
  eleventhError,

  twelfthLabel,
  twelfthClassName,
  twelfthPlaceholder,
  twelfthInputProps,
  twelfthType,
  twelfthError,

  thirteenthLabel,
  thirteenthClassName,
  thirteenthPlaceholder,
  thirteenthInputProps,
  thirteenthType,
  thirteenthError,

  fourteenthLabel,
  fourteenthClassName,
  fourteenthPlaceholder,
  fourteenthInputProps,
  fourteenthType,
  fourteenthError,

  radioLabel,

  firstRadioInputProps,
  firstRadioName,
  firstRadioType,
  firstRadioValue,
  firstRadiotext,

  secondRadioInputProps,
  secondRadioName,
  secondRadioType,
  secondRadioValue,
  secondRadiotext,
}) {
  return (
    <>
      {(openModalUserEdit || openModalClientAdd || openModalClientEdit) && (
        <div className="modal-background">
          <div
            className={
              (openModalUserEdit && "modal-content-user-edit") ||
              (openModalClientAdd && "modal-content-client-add") ||
              (openModalClientEdit && "modal-content-client-edit")
            }
          >
            <div className="modal-content-padding">
              <div className="modal-header">
                <p>{headerModalText}</p>
                <img
                  className={
                    (openModalUserEdit && "modal-content-image-user-edit") ||
                    (openModalClientAdd && "modal-content-image-client-add") ||
                    (openModalClientEdit && "modal-content-image-client-edit")
                  }
                  src={ButtonClose}
                  alt="Fechar"
                  onClick={closedModalButton}
                />
              </div>
              <form className="edituser-form" onSubmit={handleSubmit}>
                <div className="inputs-modal-edituser">
                  <label>{firstLabel}</label>
                  <input
                    className={firstClassName}
                    {...firstInputProps}
                    type={firstType}
                    placeholder={firstPlaceholder}
                  />{" "}
                  <span className="input-errors">{firstError}</span>
                </div>
                <div className="inputs-modal-edituser">
                  <label>{secondLabel}</label>
                  <input
                    className={secondClassName}
                    {...secondInputProps}
                    type={secondType}
                    placeholder={secondPlaceholder}
                  />
                  <span className="input-errors">{secondError}</span>
                </div>

                <div className="inputs-minors-modal-edituser">
                  <div className="input-minor-modal-edituser">
                    <label>{thirdLabel}</label>
                    {thirdInputProps?.children ? (
                      thirdInputProps.children
                    ) : (
                      <input
                        className={thirdClassName}
                        {...thirdInputProps}
                        type={thirdType}
                        placeholder={thirdPlaceholder}
                      />
                    )}
                    <span className="input-errors">{thirdError}</span>
                  </div>
                  <div className="input-minor-modal-edituser">
                    <label>{fourthLabel}</label>
                    {fourthInputProps?.children ? (
                      fourthInputProps.children
                    ) : (
                      <input
                        className={fourthClassName}
                        {...fourthInputProps}
                        type={fourthType}
                        placeholder={fourthPlaceholder}
                      />
                    )}
                    <span className="input-errors">{fourthError}</span>
                  </div>
                </div>

                <div className="inputs-modal-edituser">
                  <label>{fifthLabel}</label>
                  <input
                    className={fifthClassName}
                    {...fifthInputProps}
                    placeholder={fifthPlaceholder}
                    type={fifthType}
                  />
                  <span className="input-errors">{fifthError}</span>
                </div>

                <div className="inputs-modal-edituser">
                  <label>{sixthLabel}</label>
                  <input
                    className={sixthClassName}
                    {...sixthInputProps}
                    placeholder={sixthPlaceholder}
                    type={sixthType}
                  />
                </div>
                <span className="input-errors">{sixthError}</span>
                {(openModalClientAdd || openModalClientEdit) && (
                  <>
                    <div className="inputs-minors-modal-edituser">
                      <div className="input-minor-modal-edituser">
                        <label>{seventhLabel}</label>
                        {seventhInputProps?.children ? (
                          seventhInputProps.children
                        ) : (
                          <input
                            className={seventhClassName}
                            {...seventhInputProps}
                            type={seventhType}
                            placeholder={seventhPlaceholder}
                          />
                        )}
                        <span className="input-errors">{seventhError}</span>
                      </div>
                      <div className="input-minor-modal-edituser">
                        <label>{eighthLabel}</label>
                        <input
                          className={eighthClassName}
                          {...eighthInputProps}
                          type={eighthType}
                          placeholder={eighthPlaceholder}
                        />
                        <span className="input-errors">{eighthError}</span>
                      </div>
                    </div>
                    <div className="inputs-minors-modal-edituser-second">
                      <div className="input-minor-modal-edituser-city">
                        <label>{ninthLabel}</label>
                        <input
                          className={ninthClassName}
                          {...ninthInputProps}
                          type={ninthType}
                          placeholder={ninthPlaceholder}
                        />
                        <span className="input-errors">{ninthError}</span>
                      </div>
                      <div className="input-minor-modal-edituser-uf">
                        <label>{tenthLabel}</label>
                        {tenthInputProps?.children ? (
                          tenthInputProps.children
                        ) : (
                          <input
                            className={tenthClassName}
                            {...tenthInputProps}
                            type={tenthType}
                            placeholder={tenthPlaceholder}
                          />
                        )}
                        <span className="input-errors">{tenthError}</span>
                      </div>
                    </div>
                  </>
                )}
                <div className="modal-content-button">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmittedSuccessfully}
                  >
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {openModalAddCharges && (
        <div className="modal-background">
          <div className="modal-content-add-charges">
            <div className="modal-content-padding">
              <div className="modal-header">
                <p>{headerModalText}</p>
                <img
                  className="modal-content-image-add-charges"
                  src={ButtonClose}
                  alt="Fechar"
                  onClick={closedModalButton}
                />
              </div>
              <form className="edituser-form" onSubmit={handleSubmit}>
                <div className="inputs-modal-edituser">
                  <label>{eleventhLabel}</label>
                  <input
                    className={eleventhClassName}
                    value={eleventhValue}
                    readOnly
                  />
                  <span className="input-errors">{eleventhError}</span>
                </div>
                <div className="inputs-modal-edituser">
                  <label>{twelfthLabel}</label>
                  <input
                    className={twelfthClassName}
                    {...twelfthInputProps}
                    type={twelfthType}
                    placeholder={twelfthPlaceholder}
                  />
                  <span className="input-errors">{twelfthError}</span>
                </div>
                <div className="inputs-minors-modal-edituser">
                  <div className="input-minor-modal-edituser">
                    <label>{thirteenthLabel}</label>
                    {thirteenthInputProps?.children ? (
                      thirteenthInputProps.children
                    ) : (
                      <input
                        className={thirteenthClassName}
                        {...thirteenthInputProps}
                        type={thirteenthType}
                        placeholder={thirteenthPlaceholder}
                      />
                    )}
                    <span className="input-errors">{thirteenthError}</span>
                  </div>
                  <div className="input-minor-modal-edituser">
                    <label>{fourteenthLabel}</label>
                    {fourteenthInputProps?.children ? (
                      fourteenthInputProps.children
                    ) : (
                      <input
                        className={fourteenthClassName}
                        {...fourteenthInputProps}
                        type={fourteenthType}
                        placeholder={fourteenthPlaceholder}
                      />
                    )}
                    <span className="input-errors">{fourteenthError}</span>
                  </div>
                </div>
                <div className="inputs-modal-form-radios">
                  <label> {radioLabel}</label>
                  <div className="inputs-modal-radios">
                    {" "}
                    <div className="inputs-modal-radio">
                      <input
                        {...firstRadioInputProps}
                        name={firstRadioName}
                        type={firstRadioType}
                        value={firstRadioValue}
                      />

                      <span>{firstRadiotext}</span>
                    </div>
                    <div className="inputs-modal-radio">
                      <input
                        {...secondRadioInputProps}
                        name={secondRadioName}
                        type={secondRadioType}
                        value={secondRadioValue}
                      />
                      <span>{secondRadiotext}</span>
                    </div>{" "}
                  </div>
                </div>
                <div className="modal-content-button">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmittedSuccessfully}
                  >
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
