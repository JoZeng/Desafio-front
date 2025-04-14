import "./home.css";
import { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import HomeContent from "../home/home-content/HomeContent";
import ModalHomeUserEdit from "../../components/modals/modals-sessions/modal-home-user-edit/ModalHomeUserEdit";

function Home() {
  const [openModalMenuEdit, setOpenModalMenuEdit] = useState(false);
  const handleModalUserEdit = () => setOpenModalMenuEdit(true);
  const closeModalUserEdit = () => setOpenModalMenuEdit(false);

  return (
    <div className="home-page">
      <SideBar />
      <div className="home-page-content">
        <Header
          text={"Resumo das cobranças"}
          handleModalUserEdit={handleModalUserEdit}
        />
        <ModalHomeUserEdit
          openModal={openModalMenuEdit}
          closedModal={setOpenModalMenuEdit}
          closedModalButton={closeModalUserEdit}
        />
        <hr />
        <HomeContent />
      </div>
    </div>
  );
}

export default Home;
