import "./clients.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import ClientsContent from "../../components/clients/content/client-content/ClientsContent";
import ModalUserEdit from "../../components/modals/modals-sessions/modal-user-edit/ModalUserEdit";
import ModalClientsAdd from "../../components/modals/modals-sessions/modal-clients-add/ModalClientsAdd";
import ModalClientsCharges from "../../components/modals/modals-sessions/modal-clients-add-charges/ModalClientsAddCharges";
import { useModalStates } from "../../components/modals/modals-states-context/ModalStatesContext";
import { ClientsContentProvider } from "../../components/clients/content/client-content/ClientsContentContext";
import { ModalClientsAddChargesProvider } from "../../components/modals/modals-sessions/modal-clients-add-charges/ModalClientsAddChargesContext";
import { ModalClientsAddProvider } from "../../components/modals/modals-sessions/modal-clients-add/ModalClientsAddContext";
import { ModalUserEditProvider } from "../../components/modals/modals-sessions/modal-user-edit/ModalUserEditContext";
import useRefreshTrigger from "../../hooks/useRefreshTrigger";

export default function Clients() {
  const {
    openModaUserEdit,
    setOpenModaUserEdit,
    handleModaUserEdit,
    closeModaUserEdit,

    openModalClientsAdd,
    setOpenModalClientsAdd,
    handleModalClientsAdd,
    closeModalClientsAdd,

    openModalAddCharges,
    setOpenModalAddCharges,
    handleModalAddCharges,
    closeModalAddCharges,

    refreshData,
  } = useModalStates();
  const { refreshTrigger, handleUpdateData } = useRefreshTrigger();
  return (
    <div className="clients-page">
      <SideBar />
      <div className="clients-page-content">
        <Header text={"Cobranças"} handleModalUserEdit={handleModaUserEdit} />
        <hr />
        <ClientsContentProvider
          refreshTrigger={refreshTrigger}
          handleUpdateData={handleUpdateData}
        >
          <ClientsContent
            openModalAddClient={handleModalClientsAdd}
            openModalAddCharges={handleModalAddCharges}
          />
        </ClientsContentProvider>
      </div>
      <ModalClientsAddProvider
        openModal={openModalClientsAdd}
        closedModal={setOpenModalClientsAdd}
        closedModalButton={closeModalClientsAdd}
      >
        <ModalClientsAdd />
      </ModalClientsAddProvider>
      <ModalClientsAddChargesProvider
        openModal={openModalAddCharges}
        closedModal={setOpenModalAddCharges}
        closedModalButton={closeModalAddCharges}
        onUpdate={handleUpdateData}
      >
        <ModalClientsCharges />
      </ModalClientsAddChargesProvider>
      <ModalUserEditProvider
        openModal={openModaUserEdit}
        closedModal={setOpenModaUserEdit}
        closedModalButton={closeModaUserEdit}
      >
        <ModalUserEdit />
      </ModalUserEditProvider>
    </div>
  );
}
