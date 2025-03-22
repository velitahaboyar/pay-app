import React from "react";
import "../css/sidebar.css";
import { MdQueryStats } from "react-icons/md";
import { GoPersonAdd } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column shadow-custom"
      style={{ height: "100%" }}
    >
      <div className="bg-primary d-flex p-3 flex-grow-1 text-primary">
        <div id="nav-links" className="navbar-collapse mt-4">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link to="Dashboard" className="nav-link text-primary">
                Dashboard <MdQueryStats size={"24"} />
              </Link>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />

            <li className="nav-item">
              <Link to="Newdata" className="nav-link text-primary">
                Yeni Komisyon Ekle <GoPersonAdd size={"24"} />
              </Link>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />
            <li className="nav-item">
              <Link to="Tables" className="nav-link text-primary">
                Komisyonları Görüntüle <GoPeople size={"22"} />
              </Link>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />
          </ul>
          <ul className="navbar-nav text-center"></ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
