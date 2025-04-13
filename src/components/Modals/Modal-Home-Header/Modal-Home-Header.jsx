import "./Modal-Home-Header.css";
import { useNavigate } from "react-router-dom";
import BotaoEditar from "../../../assets/button-editar.svg";
import BotaoLogout from "../../../assets/button-logout.svg";
import { clear } from "../../../utils/storage";

export default function ModalHomeHeader({
  openMenuModal,
  closeMenuModal,
  handleModalUserEdit,
}) {
  const navigate = useNavigate();

  
  function handleLogout() {
    clear();
    navigate("/");
  }

  return (
    <>
      {openMenuModal && (
        <div className="modal-menu">
          <div className="modal-arrow"></div>
          <img
            src={BotaoEditar}
            onClick={() => {
              handleModalUserEdit();
              closeMenuModal(false);
            }}
            alt="editar"
          />
          <img src={BotaoLogout} onClick={handleLogout} alt="logout" />
        </div>
      )}
    </>
  );
}
