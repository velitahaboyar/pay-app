import React from "react";
import "../css/sidebar.css";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { MdQueryStats } from "react-icons/md";
import { GoPersonAdd } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column shadow-custom"
      style={{ height: "100%" }}
    >
      <div className="bg-primary d-flex p-3 flex-grow-1 w-100 text-primary">
        <div id="nav-links" className="navbar-collapse mt-4">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a href="/Homepage" className="nav-link text-primary">
                Dashboard <MdQueryStats size={"24"} />
              </a>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />

            <li className="nav-item">
              <a href="/Newdata" className="nav-link text-primary">
               Yeni Komisyon Ekle <GoPersonAdd size={"24"} />
              </a>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />
            <li className="nav-item">
              <a href="/Showdata" className="nav-link text-primary">
                Komisyonları Görüntüle <GoPeople size={"22"} />
              </a>
            </li>
            <hr className="text-tertiary w-50 align-self-center" />
          </ul>
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-primary fw-bold mt-3"
                id="exit-button"
              >
                <button
                  className="btn btn-outline-tertiary"
                  id="btn-hover-none"
                >
                  Çıkış Yap <ImExit />
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
