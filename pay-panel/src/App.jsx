import "../src/css/bootstrap5.3.3.css";
import Header from "./components/Header.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Newdata from "./Newdata.jsx";
import Tables from "./Tables.jsx";

// toastmessage

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* authentication islemi */}
      {isAuthenticated ? (
        <>
          <div id="header">
            <Header />
          </div>
          <div className="d-flex flex-grow-1">
            {/* Sidebar */}
            {!isMobile && (
              <div className="col-1">
                <Sidebar />
              </div>
            )}

            {/* grid ile tüm sayfa görüntüleme*/}
            <div className={`${isMobile ? "col-12" : "col-11"}`}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Newdata" element={<Newdata />} />
                <Route path="/Tables" element={<Tables />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
