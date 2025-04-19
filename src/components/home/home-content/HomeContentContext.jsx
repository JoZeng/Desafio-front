import { createContext, useContext, useState, useEffect } from "react";
import { getItem } from "../../../utils/storage";
import api from "../../../services/api";

const HomeContentContext = createContext();

export default function HomeContentContextProvider({ children }) {
  const [chargesPaid, setChargesPaid] = useState(0);
  const [chargesOutOfDate, setChargesOutOfDate] = useState(0);
  const [chargesPlanned, setChargesPlanned] = useState(0);

  const [paidList, setPaidList] = useState([]);
  const [outOfDateList, setOutOfDateList] = useState([]);
  const [plannedList, setPlannedList] = useState([]);

  const [clientsInadimplentes, setClientsInadimplentes] = useState([]);
  const [clientsEmDia, setClientsEmDia] = useState([]);

  const [totalPaidCount, setTotalPaidCount] = useState(0);
  const [totalOutOfDateCount, setTotalOutOfDateCount] = useState(0);
  const [totalPlannedCount, setTotalPlannedCount] = useState(0);
  const [totalInadimplentesCount, setTotalInadimplentesCount] = useState(0);
  const [totalEmDiaCount, setTotalEmDiaCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const token = getItem("token");

        const responseCharges = await api.get("/clientes/cobrancas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cobrancas = responseCharges.data || [];

        const responseClients = await api.get("/clientes?todos=true", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const clientes = responseClients.data?.clientes || [];

        const nomesClientes = {};
        clientes.forEach((cliente) => {
          nomesClientes[String(cliente.id)] = cliente.nome;
        });

        cobrancas.forEach((c) => {
          c.nome_cliente = nomesClientes[String(c.cliente_id)];
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pagas = [];
        const vencidas = [];
        const previstas = [];

        cobrancas.forEach((c) => {
          const status = c.status?.trim().toLowerCase();
          const venc = new Date(c.vencimento);
          venc.setHours(0, 0, 0, 0);

          if (!status || isNaN(venc)) return;

          if (status === "pago") {
            pagas.push(c);
          } else if (status === "pendente" && venc < today) {
            vencidas.push(c);
          } else if (status === "pendente" && venc >= today) {
            previstas.push(c);
          }
        });

        setChargesPaid(pagas.reduce((acc, c) => acc + c.valor, 0));
        setChargesOutOfDate(vencidas.reduce((acc, c) => acc + c.valor, 0));
        setChargesPlanned(previstas.reduce((acc, c) => acc + c.valor, 0));

        setPaidList(pagas.slice(0, 4));
        setOutOfDateList(vencidas.slice(0, 4));
        setPlannedList(previstas.slice(0, 4));

        setTotalPaidCount(pagas.length);
        setTotalOutOfDateCount(vencidas.length);
        setTotalPlannedCount(previstas.length);

        const clientesComStatus = clientes.map((cliente) => {
          const cobrancasCliente = cobrancas.filter(
            (c) => c.cliente_id === cliente.id
          );

          let totalPago = 0;
          let totalPendente = 0;

          cobrancasCliente.forEach((c) => {
            const status = c.status?.trim().toLowerCase();
            const venc = new Date(c.vencimento);
            venc.setHours(0, 0, 0, 0);

            if (status === "pago") {
              totalPago += Number(c.valor);
            } else if (status === "pendente") {
              totalPendente += Number(c.valor);
            }
          });

          const status = totalPago >= totalPendente ? "em dia" : "inadimplente";

          return {
            ...cliente,
            nome_cliente: cliente.nome,
            totalPago,
            totalPendente,
            status,
          };
        });

        const inadimplentes = clientesComStatus.filter(
          (c) => c.status === "inadimplente"
        );
        const emDia = clientesComStatus.filter((c) => c.status === "em dia");

        setClientsInadimplentes(inadimplentes.slice(0, 4));
        setClientsEmDia(emDia.slice(0, 4));

        setTotalInadimplentesCount(inadimplentes.length);
        setTotalEmDiaCount(emDia.length);
      } catch (error) {
        console.error(
          "Erro ao carregar dados da home:",
          error.response || error.message
        );
      }
    }

    loadData();
  }, []);
  return (
    <HomeContentContext.Provider
      value={{
        chargesPaid,
        chargesOutOfDate,
        chargesPlanned,
        paidList,
        outOfDateList,
        plannedList,
        clientsInadimplentes,
        clientsEmDia,
        totalPaidCount,
        totalOutOfDateCount,
        totalPlannedCount,
        totalInadimplentesCount,
        totalEmDiaCount,
      }}
    >
      {children}
    </HomeContentContext.Provider>
  );
}

export const useHomeContentContext = () => {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error(
      "useHomeContentContext deve ser usado dentro de HomeContentContextProvider"
    );
  }
  return context;
};
