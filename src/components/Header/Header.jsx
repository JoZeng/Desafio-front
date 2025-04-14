import "./header.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Icondown from "../../assets/Icon-down.png";
import ModalHomeHeader from "../modals/modal-home-header/ModalHomeHeader";
import { getItem } from "../../utils/storage";

function Header({ text, text2, handleModalUserEdit }) {
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const userName = (getItem("userName") || "").trim();

  const filterWords = ["da", "de", "do", "dos", "das", "e"];
  const splitName = userName
    .split(" ")
    .filter((word) => !filterWords.includes(word.toLowerCase()));

  const initialsName = splitName
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  const location = useLocation();
  const isClientDetailsActive = /^\/clientes\/\d+$/.test(location.pathname);

  function toggleModal() {
    setOpenModalMenu((prevState) => !prevState);
  }

  return (
    <div className="home-header">
      <div className="home-header-content">
        <div className="home-header-firstcontent">
          {isClientDetailsActive ? (
            <p className="home-header-firstcontent-text1">
              {`${text} >`}{" "}
              <span className="home-header-firstcontent-text2">{text2}</span>
            </p>
          ) : (
            <p>{text}</p>
          )}
        </div>
        <div className="home-header-secondcontent">
          <span className="menu-initals-name">{initialsName}</span>
          <span className="menu-name">{userName}</span>
          <img src={Icondown} alt="icondown" onClick={toggleModal} />
        </div>
      </div>
      <ModalHomeHeader
        openMenuModal={openModalMenu}
        closeMenuModal={setOpenModalMenu}
        handleModalUserEdit={handleModalUserEdit}
      />
    </div>
  );
}

export default Header;
