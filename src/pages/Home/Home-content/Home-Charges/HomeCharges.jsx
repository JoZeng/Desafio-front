import "./home-charges.css";
import IconPaid from "../../../../assets/Icon-paga.png";
import IconOutOfDate from "../../../../assets/Icon-vencida.png";
import IconPlanned from "../../../../assets/Icon-prevista.png";

export default function HomeCharges({
  text1,
  value1,
  text2,
  value2,
  text3,
  value3,
}) {
  return (
    <div className="home-charges-modal">
      <div className="home-charges-paid">
        <div className="home-charges-cards">
          <img src={IconPaid} alt="iconpaid" />
          <div className="home-charges-cards-textvalue">
            <span>{text1}</span>
            <span>{value1}</span>
          </div>
        </div>
      </div>
      <div className="home-charges-out-of-date">
        <div className="home-charges-cards">
          <img src={IconOutOfDate} alt="iconoutofdate" />
          <div className="home-charges-cards-textvalue">
            <span>{text2}</span>
            <span>{value2}</span>
          </div>
        </div>
      </div>
      <div className="home-charges-planned">
        <div className="home-charges-cards">
          <img src={IconPlanned} alt="iconplanned" />
          <div className="home-charges-cards-textvalue">
            <span>{text3}</span>
            <span>{value3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
