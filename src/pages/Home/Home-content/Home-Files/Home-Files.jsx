import FilesCharges from "./Files-Charges/Files-Charges";

function HomeFiles({
  title,
  type,
  numbercount,
  clients,
  idcharges,
  valuecharges,
  clientsname,
  idnumber,
  valuechargesamount,
  button,
}) {
  return (
    <div className="home-files">
      <div className="home-files-charges">
        <FilesCharges
          title={title}
          type={type}
          numbercount={numbercount}
          chargesOutOfDate={true}
          chargesPaid={true}
          chargesPlanned={true}
          clients={clients}
          idcharges={idcharges}
          valuecharges={valuecharges}
          clientsname={clientsname}
          idnumber={idnumber}
          valuechargesamount={valuechargesamount}
          button={button}
        />
      </div>
      <div className="home-files-clients"></div>
    </div>
  );
}

export default HomeFiles;
