import "./Clients-content.css";
import { useState, useEffect } from "react";
import { getItem, setItem } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import clientsimage from "../../../assets/clients.svg";
import filterimage from "../../../assets/filter.svg";
import addcharges from "../../../assets/iconCharges.svg";

export default function ClientsContent({
  openModalAddClient,
  openModalAddCharges,
}) {
  const [clients, setClients] = useState([]);
  const [search, setsSearch] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadDataClients(paginaAtual);
  }, [paginaAtual]);

  async function loadDataClients(pagina = 1) {
    try {
      const token = getItem("token");
      const response = await api.get(`/clientes?pagina=${pagina}&limite=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const clientes = response.data?.clientes || [];
      const totalPaginas = response.data?.totalPaginas || 1;

      const clientesComStatus = await Promise.all(
        clientes.map(async (cliente) => {
          try {
            const resCobrancas = await api.get(
              `/cliente/cobrancas/${cliente.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const cobrancas = resCobrancas.data?.cobrancas || [];
            console.log("Cliente:", cliente.nome, "Cobranças:", cobrancas);
            let totalPago = 0;
            let totalVencido = 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            cobrancas.forEach((c) => {
              const status = c.status?.trim().toLowerCase();
              const vencimento = new Date(c.vencimento);
              vencimento.setHours(0, 0, 0, 0);

              if (status === "pago") {
                totalPago += Number(c.valor);
              } else if (status === "pendente" && vencimento < today) {
                totalVencido += Number(c.valor);
              }
            });

            return {
              ...cliente,
              cobrancas,
              status: totalVencido > 0 ? "inadimplente" : "em dia",
              totalPago,
              totalVencido,
            };
          } catch (err) {
            console.error(
              `Erro ao buscar cobranças do cliente ${cliente.id}`,
              err
            );
            return {
              ...cliente,
              status: "em dia",
              cobrancas: [],
              totalPago: 0,
              totalPendente: 0,
            };
          }
        })
      );

      setClients(clientesComStatus);
      setTotalPaginas(totalPaginas);
    } catch (error) {
      console.log(error.response?.data?.message || "Erro ao carregar clientes");
    }
  }

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
            onChange={(e) => setsSearch(e.target.value)}
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

          {clients
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
                    <button onClick={() => navigate(`/clientes/${cliente.id}`)}>
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
            ))}
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
