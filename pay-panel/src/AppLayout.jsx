import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="container-fluid p-0">
      <Header />

      <div className="row g-0" style={{ height: "100vh" }}>
        {/* sidebar - 2 kolonluk alan, md ekranlarda kapanacak */}
        <div className="col-md-2 d-none d-md-flex flex-column p-0">
          <Sidebar />
        </div>

        {/* ana içerik - 10 kolon kaplayacak */}
        <div className="col-md-10 col-12 p-3 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default AppLayout;
