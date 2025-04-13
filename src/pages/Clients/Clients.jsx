import "./Clients.css";
import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import ClientsContent from "./Clients-content/Clients-content";
import ModalHomeUserEdit from "../../components/Modals/Modals-Sessions/Modal-Home-UserEdit/Modal-Home-UserEdit";
import ModalClientsAdd from "../../components/Modals/Modals-Sessions/Modal-Clients-Add/Modal-Clients-Add";
import ModalClientsCharges from "../../components/Modals/Modals-Sessions/Modal-Clients-Charges/Modal-Clients-Charges";

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

  return (
    <div className="clients-page">
      <SideBar />
      <div className="clients-page-content">
        <Header text={"Cobranças"} handleModalUserEdit={handleModalUserEdit} />

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
        />

        <ClientsContent
          openModalAddClient={handleModalClientsAdd}
          openModalAddCharges={handleModalAddCharges}
        />
      </div>
    </div>
  );
}
