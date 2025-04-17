import {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../../../utils/storage";
import api from "../../../../services/api";

export const ClientsContentContext = createContext();

export const ClientsContentProvider = ({ children, refreshTrigger }) => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const lastRefresh = useRef(null);

  const fetchClients = useCallback(async (pagina = 1) => {
    setLoading(true);
    try {
      const token = getItem("token");
      const response = await api.get(`/clientes?pagina=${pagina}&limite=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const clientes = response.data?.clientes || [];
      const totalPaginas = response.data?.totalPaginas || 1;

      if (clientes.length === 0) {
        console.log("Nenhum cliente encontrado para esta página");
      }

      const clientesComStatus = await Promise.all(
        clientes.map(async (cliente) => {
          try {
            const resCobrancas = await api.get(
              `/clientes/cobrancas/${cliente.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const cobrancas = resCobrancas.data?.cobrancas || [];
            let totalPago = 0;
            let totalPendente = 0;

            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            cobrancas.forEach((c) => {
              const status = c.status?.trim().toLowerCase();
              const vencimento = new Date(c.vencimento);
              vencimento.setHours(0, 0, 0, 0);

              if (status === "pago") {
                totalPago += Number(c.valor);
              } else if (status === "pendente") {
                totalPendente += Number(c.valor);
              }
            });

            return {
              ...cliente,
              cobrancas,
              status: totalPago >= totalPendente ? "em dia" : "inadimplente",
              totalPago,
              totalPendente,
            };
          } catch (error) {}
        })
      );

      setClients(clientesComStatus);
      setTotalPaginas(totalPaginas);
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, []); // "[]": A função `fetchClients` só será criada uma vez.

  useEffect(() => {
    if (search.trim() === "") {
      fetchClients(paginaAtual);
    }
  }, [search, paginaAtual, fetchClients]); // `fetchClients` é estável aqui, pois é memorada com `useCallback`.

  useEffect(() => {
    if (refreshTrigger !== lastRefresh.current) {
      lastRefresh.current = refreshTrigger;
      fetchClients();
    }
  }, [refreshTrigger, fetchClients]); // `fetchClients` agora é estável e não será recriada

  return (
    <ClientsContentContext.Provider
      value={{
        clients,
        navigate,
        search,
        setSearch,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
        loading,
      }}
    >
      {children}
    </ClientsContentContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContentContext);
  if (!context) {
    throw new Error(
      "useClients deve ser usado dentro de ClientsContentProvider"
    );
  }
  return context;
};
