import React from "react";
import "../css/sidebar.css";

function Sidebar() {
  return (
    <div className="d-flex flex-column shadow-custom" style={{height:"100%"}}>
      <div className="bg-primary d-flex p-3 flex-grow-1 w-100 text-primary">
        <div id="nav-links" className="navbar-collapse mt-4">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a href="/Homepage" className="nav-link text-primary">
                Ana Sayfa
              </a>
            </li>
            <hr className="text-tertiary w-75 align-self-center" />

            <li className="nav-item">
              <a href="/Newdata" className="nav-link text-primary">
                Komisyon Ekle
              </a>
            </li>
            <hr className="text-tertiary w-75 align-self-center" />
            <li className="nav-item">
              <a href="/Showdata" className="nav-link text-primary">
                Görüntüle
              </a>
            </li>
            <hr className="text-tertiary w-75 align-self-center" />
          </ul>
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-primary fw-bold mt-3"
                id="exit-button"
              >
                <button
                  className="btn btn-outline-tertiary "
                  id="btn-hover-none"
                >
                  Çıkış Yap
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
