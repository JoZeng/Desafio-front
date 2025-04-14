import "./left-section.css";
import { useLocation } from "react-router-dom";

function LeftSection({
  circle1,
  circle2,
  circle3,
  greenline,
  title1,
  title2,
  title3,
  subtitle1,
  subtitle2,
  subtitle3,
  firstOnClick,
  secondOnClick,
  thirdOnClick,
  text,
}) {
  const location = useLocation();
  const isLoginActive = location.pathname === "/login";

  return (
    <>
      {isLoginActive ? (
        <div className="loginscreen-section">
          <div className="loginscreen-section-text">{text}</div>
        </div>
      ) : (
        <div className="leftSection">
          <>
            <div className="stepSection">
              <img
                src={circle1}
                onClick={firstOnClick}
                alt="first-circle"
              ></img>
              <img src={greenline}></img>
              <img
                src={circle2}
                onClick={secondOnClick}
                alt="second-circle"
              ></img>
              <img src={greenline}></img>
              <img
                src={circle3}
                onClick={thirdOnClick}
                alt="third-circle"
              ></img>
            </div>
            <div className="containerSection">
              <h2>{title1}</h2>
              <p>{subtitle1}</p>
              <h2>{title2}</h2>
              <p>{subtitle2}</p>
              <h2>{title3}</h2>
              <p>{subtitle3}</p>
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default LeftSection;
