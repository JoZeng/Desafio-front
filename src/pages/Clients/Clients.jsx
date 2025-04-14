import { useState } from "react";
import "./clients.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import ClientsContent from "./clients-content/ClientsContent/";
import ModalHomeUserEdit from "../../components/modals/modals-sessions/modal-home-user-edit/ModalHomeUserEdit";
import ModalClientsAdd from "../../components/modals/modals-sessions/modal-clients-add/ModalClientsAdd";
import ModalClientsCharges from "../../components/modals/modals-sessions/modal-clients-charges/ModalClientsCharges";
import { ClientsProvider } from "../../contexts/clients/ClientsContext";

export default function Clients() {
  const [openModalMenuEdit, setOpenModalMenuEdit] = useState(false);
  const handleModalUserEdit = () => setOpenModalMenuEdit(true);
  const closeModalUserEdit = () => setOpenModalMenuEdit(false);

  const [openModalClientsAdd, setOpenModalClientsAdd] = useState(false);
  const handleModalClientsAdd = () => setOpenModalClientsAdd(true);
  const closeModalClientsAdd = () => setOpenModalClientsAdd(false);

  const [openModalAddCharges, setOpenModalAddCharges] = useState(false);
  const handleModalAddCharges = () => setOpenModalAddCharges(true);
  const closeModalAddCharges = () => setOpenModalAddCharges(false);

  // Estado para forçar atualização dos dados
  const [refreshData, setRefreshData] = useState(false);

  // Função passada para o modal chamar após submit com sucesso
  const handleUpdateData = () => {
    setRefreshData((prev) => !prev); // Alterna o valor para forçar reload
  };

  return (
    <div className="clients-page">
      <ClientsProvider>
        <SideBar />
        <div className="clients-page-content">
          <Header
            text={"Cobranças"}
            handleModalUserEdit={handleModalUserEdit}
          />

          <ModalHomeUserEdit
            openModal={openModalMenuEdit}
            closedModal={setOpenModalMenuEdit}
            closedModalButton={closeModalUserEdit}
          />
          <hr />
          <ModalClientsAdd
            openModal={openModalClientsAdd}
            closedModal={setOpenModalClientsAdd}
            closedModalButton={closeModalClientsAdd}
          />
          <ModalClientsCharges
            openModal={openModalAddCharges}
            closedModal={setOpenModalAddCharges}
            closedModalButton={closeModalAddCharges}
            onUpdate={handleUpdateData}
          />

          <ClientsContent
            openModalAddClient={handleModalClientsAdd}
            openModalAddCharges={handleModalAddCharges}
            refreshTrigger={handleUpdateData}
          />
        </div>
      </ClientsProvider>
    </div>
  );
}
