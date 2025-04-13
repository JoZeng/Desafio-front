import "./Files-Charges.css";

export default function FilesCharges({
  title,
  type,
  numbercount,
  clients,
  idcharges,
  valuecharges,
  clientsname = [],
  idnumber = [],
  valuechargesamount = [],
  button,
}) {
  const getClassName = () => {
    if (type === "paid") return "charges-Paid";
    if (type === "overdue") return "charges-Out-Of-Date";
    if (type === "planned") return "charges-Planned";
    return "";
  };

  return (
    <div className="file-charges-content">
      <div className="file-title-card">
        <p>{title}</p>
        <span
          className={
            type === "paid"
              ? "charges-paid"
              : type === "out-of-date"
              ? "charges-out-of-date"
              : type === "planned"
              ? "charges-planned"
              : ""
          }
        >
          {numbercount}
        </span>
      </div>

      <hr className="file-divider" />

      <div className="file-subtitles-card">
        <div>{clients}</div>
        <div>{idcharges}</div>
        <div>{valuecharges}</div>
      </div>

      <hr className="file-divider" />

      {clientsname?.map((name, index) => (
        <div className="file-value-card" key={index}>
          <div className="file-itemlist-clientsname">{name}</div>
          <div className="file-itemlist-idcharges">{idnumber[index]}</div>
          <div className="file-itemlist-value">{valuechargesamount[index]}</div>
        </div>
      ))}

      <div className="file-button-card">
        <span>{button}</span>
      </div>
    </div>
  );
}
