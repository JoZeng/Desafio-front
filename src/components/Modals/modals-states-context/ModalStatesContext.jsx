import { createContext, useContext, useState } from "react";

const ModalStatesContext = createContext();

export default function ModalStatesProvider({ children }) {
  const [openModaUserEdit, setOpenModaUserEdit] = useState(false);
  const handleModaUserEdit = () => setOpenModaUserEdit(true);
  const closeModaUserEdit = () => setOpenModaUserEdit(false);

  const [openModalClientsAdd, setOpenModalClientsAdd] = useState(false);
  const handleModalClientsAdd = () => setOpenModalClientsAdd(true);
  const closeModalClientsAdd = () => setOpenModalClientsAdd(false);

  const [openModalClientsEdit, setOpenModalClientsEdit] = useState(false);
  const handleModalClientsEdit = () => setOpenModalClientsEdit(true);
  const closeModalClientsEdit = () => setOpenModalClientsEdit(false);

  const [openModalAddCharges, setOpenModalAddCharges] = useState(false);
  const handleModalAddCharges = () => setOpenModalAddCharges(true);
  const closeModalAddCharges = () => setOpenModalAddCharges(false);

  const [refreshData, setRefreshData] = useState(false);

  const handleUpdateData = () => setRefreshData((prev) => !prev);

  return (
    <ModalStatesContext.Provider
      value={{
        openModaUserEdit,
        setOpenModaUserEdit,
        handleModaUserEdit,
        closeModaUserEdit,

        openModalClientsAdd,
        setOpenModalClientsAdd,
        handleModalClientsAdd,
        closeModalClientsAdd,

        openModalClientsEdit,
        setOpenModalClientsEdit,
        handleModalClientsEdit,
        closeModalClientsEdit,

        openModalAddCharges,
        setOpenModalAddCharges,
        handleModalAddCharges,
        closeModalAddCharges,

        refreshData,
        handleUpdateData,
      }}
    >
      {children}
    </ModalStatesContext.Provider>
  );
}

export const useModalStates = () => {
  const context = useContext(ModalStatesContext);
  if (!context) {
    throw new Error(
      "useModalStates deve ser usado dentro de ModalStatesProvider"
    );
  }
  return context;
};
