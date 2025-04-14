import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import Home from "../../assets/home.svg";
import Clients from "../../assets/clients.svg";
import Charges from "../../assets/charges.svg";
import HomeRed from "../../assets/homered.svg";
import ClientsRed from "../../assets/clientsred.svg";

const SideBar = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeActive = location.pathname === "/home";
  const isClientsActive = location.pathname === "/clientes";
  const isClientDetailsActive = /^\/clientes\/\d+$/.test(location.pathname);

  return (
    <div className="sidebar">
      <ul className="list-content">
        <li className={isHomeActive ? "isActive" : null}>
          <button>
            <img
              src={isHomeActive ? HomeRed : Home}
              alt="home"
              onClick={() => navigate("/home")}
            />
            Home
          </button>
        </li>
        <li
          className={
            isClientsActive || isClientDetailsActive ? "isActive" : null
          }
        >
          <button>
            <img
              src={
                isClientsActive || isClientDetailsActive ? ClientsRed : Clients
              }
              alt="clients"
              onClick={() => navigate("/clientes")}
            />
            Clientes
          </button>
        </li>
        <li>
          <button>
            <img src={Charges} alt="charges" />
            Cobranças
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
