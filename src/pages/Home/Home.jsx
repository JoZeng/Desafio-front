import "./Home.css";
import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import HomeContent from "./Home-content/Home-content";
import ModalHomeUserEdit from "../../components/Modals/Modals-Sessions/Modal-Home-UserEdit/Modal-Home-UserEdit";

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
