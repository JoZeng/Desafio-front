import "./routes.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { getItem } from "../utils/storage/";
import ModalStatesContext from "../components/modals/modals-states-context/ModalStatesContext";
import SignIn from "../pages/signin/SignIn";
import SignUpPassword from "../pages/signup-password/SignUpPassword";
import SignUpConfirmation from "../pages/signup-confirmation/SignUpConfirmation";
import LogIn from "../pages/LogIn/LogIn";
import Home from "../pages/home/Home";
import Clients from "../pages/clients/Clients";
import ClientDetailsPage from "../pages/client-details/ClientDetails";

function App() {
  function ProtectedRoutes({ redirectTo }) {
    const token = getItem("token");

    return token ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return (
    <div className="routes">
      <BrowserRouter>
        <ModalStatesContext>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/senha" element={<SignUpPassword />} />
            <Route path="/confirmacao" element={<SignUpConfirmation />} />
            <Route path="/login" element={<LogIn />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/clientes" element={<Clients />} />
              <Route path="/clientes/:id" element={<ClientDetailsPage />} />
            </Route>
          </Routes>
        </ModalStatesContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
