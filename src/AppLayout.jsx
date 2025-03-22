import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import { MdQueryStats, MdPeople } from "react-icons/md";
import { GoPersonAdd } from "react-icons/go";
import { ImExit } from "react-icons/im";
import "./css/sidebar.css";

function AppLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      console.log("Resize - isMobile:", mobile, "isMenuOpen:", isMenuOpen);
      setIsMobile(mobile);
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false); // Büyük ekrana geçerken menü kapanır
      }
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // İlk yüklemede çalıştır
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <div className="container-fluid p-0">
      <div ref={headerRef}>
        <Header
          isMobile={isMobile}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
      {/* Hamburger Menü İçeriği - Sadece isMenuOpen true ise render edilir */}
      {isMobile && isMenuOpen && (
        <div
          className={`position-absolute w-100 bg-primary shadow-custom p-3 fold-menu`}
          style={{
            top: `${headerHeight}px`, // Header'ın altından başlar
            zIndex: 1000,
            maxHeight: `calc(100vh - ${headerHeight}px)`,
            overflowY: "auto",
          }}
        >
          <div id="nav-links" className="navbar-collapse">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link to="/App/Dashboard" className="nav-link text-primary">
                  Dashboard <MdQueryStats size={"24"} />
                </Link>
              </li>
              <hr className="text-tertiary w-50 align-self-center" />
              <li className="nav-item">
                <Link to="/App/Newdata" className="nav-link text-primary">
                  Yeni Komisyon Ekle <GoPersonAdd size={"24"} />
                </Link>
              </li>
              <hr className="text-tertiary w-50 align-self-center" />
              <li className="nav-item">
                <Link to="/App/Tables" className="nav-link text-primary">
                  Komisyonları Görüntüle <MdPeople size={"22"} />
                </Link>
              </li>
              <hr className="text-tertiary w-50 align-self-center" />
              <li className="nav-item">
                <Link to="#" className="nav-link text-primary">
                  Çıkış Yap <ImExit size={"18"} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="row g-0" style={{ height: "100vh" }}>
        {/* Sidebar - 2 kolonluk alan, md ekranlarda kapanacak */}
        <div className="col-md-2 d-none d-md-flex flex-column p-0">
          <Sidebar />
        </div>
        {/* Ana içerik - 10 kolon kaplayacak */}
        <div className="col-md-10 col-12 p-3 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
