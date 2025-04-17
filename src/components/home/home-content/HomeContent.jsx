import "./home-content.css";
import { useEffect, useState } from "react";
import { getItem } from "../../../utils/storage";
import api from "../../../services/api";
import HomeCharges from "./home-charges/HomeCharges";
import HomeFiles from "./home-files/HomeFiles";

function HomeContent() {
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

          // A lógica de status agora segue a lógica correta, de "em dia" ou "inadimplente"
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
    <div className="home-content">
      <HomeCharges
        text1="Cobranças Pagas"
        value1={chargesPaid.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        text2="Cobranças Vencidas"
        value2={chargesOutOfDate.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        text3="Cobranças Previstas"
        value3={chargesPlanned.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />

      <div className="home-files-minor">
        <HomeFiles
          title="Cobranças Pagas"
          type="paid"
          numbercount={totalPaidCount}
          clients="Cliente"
          idcharges="ID da cobrança"
          valuecharges="Valor"
          clientsname={paidList.map((c) => c.nome_cliente)}
          idnumber={paidList.map((c) => `#${c.id}`)}
          valuechargesamount={paidList.map((c) =>
            (Number(c.valor) || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          )}
          button="Ver Todos"
        />

        <HomeFiles
          title="Cobranças Vencidas"
          type="out-of-date"
          numbercount={totalOutOfDateCount}
          clients="Cliente"
          idcharges="ID da cobrança"
          valuecharges="Valor"
          clientsname={outOfDateList.map((c) => c.nome_cliente)}
          idnumber={outOfDateList.map((c) => `#${c.id}`)}
          valuechargesamount={outOfDateList.map((c) =>
            (Number(c.valor) || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          )}
          button="Ver Todos"
        />

        <HomeFiles
          title="Cobranças Previstas"
          type="planned"
          numbercount={totalPlannedCount}
          clients="Cliente"
          idcharges="ID da cobrança"
          valuecharges="Valor"
          clientsname={plannedList.map((c) => c.nome_cliente)}
          idnumber={plannedList.map((c) => `#${c.id}`)}
          valuechargesamount={plannedList.map((c) =>
            (Number(c.valor) || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          )}
          button="Ver Todos"
        />
      </div>

      <div className="home-files-major">
        <HomeFiles
          title="Clientes Inadimplentes"
          type="out-of-date"
          numbercount={totalInadimplentesCount}
          clients="Cliente"
          idcharges="ID"
          valuecharges="Valor vencido"
          clientsname={clientsInadimplentes.map((c) => c.nome_cliente)}
          idnumber={clientsInadimplentes.map((c) => `#${c.id}`)}
          valuechargesamount={clientsInadimplentes.map((c) =>
            (Number(c.totalPendente) || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          )}
          button="Ver Todos"
        />
        <HomeFiles
          title="Clientes em dia"
          type="paid"
          numbercount={totalEmDiaCount}
          clients="Cliente"
          idcharges="ID"
          valuecharges="Valor pago"
          clientsname={clientsEmDia.map((c) => c.nome_cliente)}
          idnumber={clientsEmDia.map((c) => `#${c.id}`)}
          valuechargesamount={clientsEmDia.map((c) =>
            (Number(c.totalPago) || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          )}
          button="Ver Todos"
        />
      </div>
    </div>
  );
}

export default HomeContent;
