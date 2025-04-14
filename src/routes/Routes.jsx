import "./routes.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { getItem } from "../utils/storage/";
import SignIn from "../pages/signin/SignIn";
import SignUpPassword from "../pages/signup-password/SignUpPassword";
import SignUpConfirmation from "../pages/signup-confirmation/SignUpConfirmation";
import LogIn from "../pages/LogIn/LogIn";
import Home from "../pages/home/Home";
import Clients from "../pages/Clients/Clients";
import ClientDetails from "../pages/Clients/Clients-content/Client-content-details/ClientDetails";

function App() {
  function ProtectedRoutes({ redirectTo }) {
    const token = getItem("token");

    return token ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/senha" element={<SignUpPassword />} />
          <Route path="/confirmacao" element={<SignUpConfirmation />} />
          <Route path="/login" element={<LogIn />} />
          <Route element={<ProtectedRoutes redirectTo="/" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/clientes/:id" element={<ClientDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
