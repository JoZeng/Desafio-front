import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../../../utils/storage";
import "./Client-content-details.css";
import api from "../../../../services/api";
import Header from "../../../../components/Header/Header";
import SideBar from "../../../../components/SideBar/SideBar";
import ModalClientsEdit from "../../../../components/Modals/Modals-Sessions/Modal-Clients-Edit/Modal-Clients-Edit";
import clientsimage from "../../../../assets/clients.svg";

export default function ClientDetails() {
  const [openModalClientsEdit, setOpenModalClientsEdit] = useState(false);
  const handleModalClientsEdit = () => setOpenModalClientsEdit(true);
  const closeModalClientsEdit = () => setOpenModalClientsEdit(false);
  const { id } = useParams();
  const [client, setClient] = useState("");

  useEffect(() => {
    async function clientDeatails() {
      try {
        const token = getItem("token");
        const response = await api.get(`/clientes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(response.data.cliente);
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes:",
          error.response?.data?.mensagem
        );
      }
    }

    clientDeatails();
  }, [id]);

  return (
    <div className="clients-page">
      <ModalClientsEdit
        openModal={openModalClientsEdit}
        closedModal={setOpenModalClientsEdit}
        closedModalButton={closeModalClientsEdit}
      />
      <SideBar />
      <div className="clients-page-content">
        <Header text={"Cobranças"} text2={"Detalhes do cliente"} />
        <hr />
        <div className="client-details-content">
          <div className="client-details-content-header">
            <img src={clientsimage} alt="clients" />
            <span className="client-details-name">{client.nome}</span>
          </div>
          <div className="client-details-content-main">
            <div className="client-details-data">
              <div className="client-details-data-header">
                <p>Dados do cliente</p>
                <button onClick={handleModalClientsEdit}>Editar Cliente</button>
              </div>
            </div>
            <div className="client-details-data-grid">
              <div className="client-details-data-grid-minor">
                {" "}
                <p>E-mail</p>
                <span>{client.email}</span>
              </div>
              <div className="client-details-data-grid-minor">
                {" "}
                <p>Telefone</p>
                <span>{client.telefone}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>CPF</p>
                <span>{client.cpf}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p></p>
                <span></span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p></p>
                <span></span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p></p>
                <span></span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>Endereço</p>
                <span>{client.endereco}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>Bairro</p>
                <span>{client.bairro}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>Complemento</p>
                <span>{client.complemento}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>CEP</p>
                <span>{client.cep}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>Cidade</p>
                <span>{client.cidade}</span>
              </div>{" "}
              <div className="client-details-data-grid-minor">
                {" "}
                <p>UF</p>
                <span>{client.estado}</span>
              </div>
            </div>
            <div className="client-details-charges"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
