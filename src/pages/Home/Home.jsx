import "./home.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import HomeContent from "../../components/home/home-content/HomeContent";
import ModalUserEdit from "../../components/modals/modals-sessions/modal-user-edit/ModalUserEdit";
import { ModalUserEditProvider } from "../../components/modals/modals-sessions/modal-user-edit/ModalUserEditContext";
import { useModalStates } from "../../components/modals/modals-states-context/ModalStatesContext";
import HomeContentContextProvider from "../../components/home/home-content/HomeContentContext";

export default function Home() {
  const {
    openModaUserEdit,
    setOpenModaUserEdit,
    handleModaUserEdit,
    closeModaUserEdit,
  } = useModalStates();
  return (
    <div className="home-page">
      <SideBar />
      <div className="home-page-content">
        <Header
          text={"Resumo das cobranças"}
          handleModalUserEdit={handleModaUserEdit}
        />
        <ModalUserEditProvider
          openModal={openModaUserEdit}
          closedModal={setOpenModaUserEdit}
          closedModalButton={closeModaUserEdit}
        >
          <ModalUserEdit />
        </ModalUserEditProvider>
        <hr />
        <HomeContentContextProvider>
          <HomeContent />
        </HomeContentContextProvider>
      </div>
    </div>
  );
}
