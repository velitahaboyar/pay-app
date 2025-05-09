import "../src/css/bootstrap5.3.3.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Newdata from "./pages/Newdata.jsx";
import Tables from "./pages/Tables.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/App" element={<AppLayout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Newdata" element={<Newdata />} />
          <Route path="Tables" element={<Tables />} />
          <Route path="*" element={<Navigate to="Dashboard" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
