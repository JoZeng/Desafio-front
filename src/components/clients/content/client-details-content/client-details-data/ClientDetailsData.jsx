import "./client-details-data.css";
import clientsimage from "../../../../../assets/clients.svg";
import { useClientDetailsContentContext } from "../ClientDetailsContentContext";

export default function ClientDetailsdata({ handleModalClientsEdit }) {
  const { client, cobrancas } = useClientDetailsContentContext();

  return (
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
            <p>E-mail</p>
            <span>{client.email}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>Telefone</p>
            <span>{client.telefone}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>CPF</p>
            <span>{client.cpf}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>Endereço</p>
            <span>{client.endereco}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>Bairro</p>
            <span>{client.bairro}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>Complemento</p>
            <span>{client.complemento}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>CEP</p>
            <span>{client.cep}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>Cidade</p>
            <span>{client.cidade}</span>
          </div>
          <div className="client-details-data-grid-minor">
            <p>UF</p>
            <span>{client.estado}</span>
          </div>
        </div>

        <div className="client-details-charges">
          <h3>Cobranças do Cliente</h3>
          {cobrancas.length === 0 ? (
            <p>Nenhuma cobrança encontrada.</p>
          ) : (
            <ul>
              {cobrancas.map((cobranca) => (
                <li key={cobranca.id}>
                  {cobranca.descricao} - R$ {(cobranca.valor / 100).toFixed(2)}{" "}
                  - {cobranca.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
