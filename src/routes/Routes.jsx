import "./Routes.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { getItem } from "../utils/storage/";
import SignIn from "../pages/SignIn/SignIn";
import SignUpPassword from "../pages/SignUp-Password/SignUp-Password";
import SignUpConfirmation from "../pages/SignUp-Confirmation/SignUp-Confirmation";
import LogIn from "../pages/LogIn/LogIn";
import Home from "../pages//Home/Home";
import Clients from "../pages/Clients/Clients";
import ClientDetails from "../pages/Clients/Clients-content/Client-content-details/Client-content-details";

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
