import { useClients } from "../../../context/clientsContext.jsx";
import "./Clients-content.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../../utils/storage";
import clientsimage from "../../../assets/clients.svg";
import filterimage from "../../../assets/filter.svg";
import addcharges from "../../../assets/iconCharges.svg";

export default function ClientsContent({
  openModalAddClient,
  openModalAddCharges,
  refreshTrigger, // Recebe o trigger de atualização
}) {
  const {
    clients,
    search,
    setSearch,
    paginaAtual,
    setPaginaAtual,
    totalPaginas,
    loading,
    fetchClients, // Deve vir memorizada com useCallback no contexto
  } = useClients();

  const navigate = useNavigate();

  const lastRefresh = useRef(null);
  useEffect(() => {
    if (refreshTrigger !== lastRefresh.current) {
      lastRefresh.current = refreshTrigger;
      fetchClients();
    }
  }, [refreshTrigger, fetchClients]);

  return (
    <div className="clients-content">
      <div className="clients-content-header">
        <div className="clients-content-header-firstsession">
          <img src={clientsimage} alt="clientsimage" />
          <div>Clients</div>
        </div>
        <div className="clients-content-header-secondsession">
          <button
            className="clients-content-header-secondsession-firstbutton"
            onClick={openModalAddClient}
          >
            + Adicionar cliente
          </button>
          <button>
            <img src={filterimage} />
          </button>
          <input
            className="clients-content-header-secondsession-input"
            placeholder="Pesquisa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="clients-content-background-body">
        <div className="clients-content-body-fields">
          <div className="clients-content-body-fields-list">
            <div>Clientes</div>
            <div>CPF</div>
            <div>E-mail</div>
            <div>Telefone</div>
            <div>Status</div>
            <div>Criar Cobrança</div>
          </div>
          <hr className="clients-content-divider" />

          {loading ? (
            <div>Carregando...</div>
          ) : (
            clients
              .filter(
                (cliente) =>
                  cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
                  cliente.email.toLowerCase().includes(search.toLowerCase()) ||
                  cliente.cpf.includes(search)
              )
              .map((cliente) => (
                <div key={cliente.id}>
                  <div className="clients-content-body-fields-list-values">
                    <div>
                      <button
                        onClick={() => navigate(`/clientes/${cliente.id}`)}
                      >
                        {cliente.nome}
                      </button>
                    </div>
                    <div>{cliente.cpf}</div>
                    <div>{cliente.email}</div>
                    <div>{cliente.telefone}</div>
                    <div>
                      <div>
                        {cliente.status === "inadimplente" ? (
                          <div className="clients-charges-indebtor">
                            Inadimplente
                          </div>
                        ) : (
                          <div className="clients-charges-inday">Em dia</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setItem("clientName", cliente.nome);
                          setItem("clientId", cliente.id);
                          openModalAddCharges();
                        }}
                      >
                        <img src={addcharges} alt="addcharges" />
                      </button>
                    </div>
                  </div>
                  <hr className="clients-content-divider" />
                </div>
              ))
          )}

          <div className="clients-content-pagination">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            <span>
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
              }
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
