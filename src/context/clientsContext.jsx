import React, { createContext, useState, useEffect, useContext } from "react";
import { getItem } from "../utils/storage";
import api from "../services/api";

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      fetchClients(paginaAtual);
    }
  }, [search, paginaAtual]);

  const fetchClients = async (pagina = 1) => {
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
        // Se não houver clientes na página, podemos decidir o que exibir no frontend
        console.log("Nenhum cliente encontrado para esta página");
      }

      const clientesComStatus = await Promise.all(
        clientes.map(async (cliente) => {
          try {
            // Buscando as cobranças do cliente
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

            // Data de hoje para comparação de vencimento
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            // Iterando sobre as cobranças e calculando o total pago e pendente
            cobrancas.forEach((c) => {
              const status = c.status?.trim().toLowerCase();
              const vencimento = new Date(c.vencimento);
              vencimento.setHours(0, 0, 0, 0);

              // Somando os valores pagos
              if (status === "pago") {
                totalPago += Number(c.valor);
              }
              // Somando os valores pendentes
              else if (status === "pendente") {
                totalPendente += Number(c.valor);
              }
            });

            // Definindo o status do cliente com base na comparação entre valores pagos e pendentes
            return {
              ...cliente,
              cobrancas,
              status: totalPago >= totalPendente ? "em dia" : "inadimplente",
              totalPago,
              totalPendente,
            };
          } catch (error) {
            // Em caso de erro (404, por exemplo), tratando o cliente como "em dia"
            if (error.response?.status === 404) {
              return {
                ...cliente,
                status: "em dia",
                cobrancas: [],
                totalPago: 0,
                totalPendente: 0,
              };
            }

            // Em caso de outro erro, tratando também como "em dia"
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
      if (error.response?.status === 404) {
        return [];
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        search,
        setSearch,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
        fetchClients,
        loading,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients deve ser usado dentro de um ClientsProvider");
  }

  return context;
};
