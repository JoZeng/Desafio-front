import { useState } from "react";
import "./Clients.css";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import ClientsContent from "./Clients-content/Clients-content";
import ModalHomeUserEdit from "../../components/Modals/Modals-Sessions/Modal-Home-UserEdit/Modal-Home-UserEdit";
import ModalClientsAdd from "../../components/Modals/Modals-Sessions/Modal-Clients-Add/Modal-Clients-Add";
import ModalClientsCharges from "../../components/Modals/Modals-Sessions/Modal-Clients-Charges/Modal-Clients-Charges";
import { ClientsProvider } from "../../context/clientsContext";

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
            onUpdate={handleUpdateData} // Passando a função para o modal
          />

          <ClientsContent
            openModalAddClient={handleModalClientsAdd}
            openModalAddCharges={handleModalAddCharges}
            refreshTrigger={refreshData} // Passando o trigger de atualização
          />
        </div>
      </ClientsProvider>
    </div>
  );
}
