// src/pages/ClientDetails/ClientDetails.jsx

import "./client-details.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import ModalClientsEdit from "../../components/modals/modals-sessions/modal-clients-edit/ModalClientsEdit";
import ClientDetailsContent from "../../components/clients/content/client-details-content/ClientDetailsContent";
import { ClientDetailsContentContextProvider } from "../../components/clients/content/client-details-content/ClientDetailsContentContext";
import { ModalClientsEditProvider } from "../../components/modals/modals-sessions/modal-clients-edit/ModalClientsEditContext";
import { useModalStates } from "../../components/modals/modals-states-context/ModalStatesContext";
import useRefreshTrigger from "../../hooks/useRefreshTrigger";

export default function ClientDetails() {
  const {
    openModalClientsEdit,
    setOpenModalClientsEdit,
    handleModalClientsEdit,
    closeModalClientsEdit,
  } = useModalStates();

  const { refreshTrigger, handleUpdateData } = useRefreshTrigger();

  return (
    <div className="clients-page">
      <SideBar />
      <div className="clients-page-content">
        <Header text={"Cobranças"} text2={"Detalhes do cliente"} />
        <hr />
        <ClientDetailsContentContextProvider
          refreshTrigger={refreshTrigger}
          handleUpdateData={handleUpdateData}
        >
          <ClientDetailsContent
            handleModalClientsEdit={handleModalClientsEdit}
          />
        </ClientDetailsContentContextProvider>
      </div>

      <ModalClientsEditProvider
        openModal={openModalClientsEdit}
        closedModal={setOpenModalClientsEdit}
        closedModalButton={closeModalClientsEdit}
        onUpdate={handleUpdateData}
      >
        <ModalClientsEdit />
      </ModalClientsEditProvider>
    </div>
  );
}
