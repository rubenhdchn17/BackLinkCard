import { Routes, Route } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";
import ResetPassword from "./modules/auth/pages/ResetPassword";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
