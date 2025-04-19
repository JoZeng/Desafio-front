import "./home-content.css";
import HomeCharges from "./home-charges/HomeCharges";
import HomeFiles from "./home-files/HomeFiles";
import { useHomeContentContext } from "./HomeContentContext";

function HomeContent() {
  const {
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
  } = useHomeContentContext();

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
