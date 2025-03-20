import "../src/css/bootstrap5.3.3.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Newdata from "./pages/Newdata.jsx";
import Tables from "./pages/Tables.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/App" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newdata" element={<Newdata />} />
        <Route path="tables" element={<Tables />} />
        <Route path="*" element={<Navigate to="/App/Dashboard" />} />
      </Route>
    </Routes>
  );
}

export default App;
