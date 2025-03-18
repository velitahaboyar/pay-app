// import React, { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import { PiHandHeartDuotone } from "react-icons/pi";
import { Dropdown } from "react-bootstrap";
function Header() {
  const name = localStorage.getItem("userName");
  //   const Navigate = useNavigate();

  //   useEffect(() => {
  //     if (
  //       localStorage.getItem("userName") == "undefined" ||
  //       localStorage.getItem("userName") === null
  //     ) {
  //       Navigate("/");
  //     }
  //   });

  return (
    <nav className="bg-primary navbar w-100 shadow-custom">
      <div className="container-fluid p-2">
        <div className="container d-flex justify-content-between">
          <div id="logo-div">
            <a href="/" className="navbar-brand">
              <img
                src="../../paylogoyeni.svg"
                width="100"
                height="70"
                alt="Logo"
              />
            </a>
          </div>
          <div className="d-flex">
            <div
              id="user-info-div"
              className="d-flex flex-column justify-content-evenly align-items-start"
            >
              <span className="text-primary">
                Hoşgeldin{" "}
                <PiHandHeartDuotone className="text-tertiary" size={"20"} />
              </span>
              <div className="d-flex">
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn-outline-quaternary-custom"
                    variant="btn-outline-quaternary-custom"
                  >
                    {name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="dropdown-menu-custom-2"
                    variant="dropdown-menu-custom-2"
                  >
                    <Dropdown.Item
                      className="dropdown-item-custom"
                      variant="dropdown-item-custom"
                      href="#"
                    >
                      Ayarlar
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="dropdown-item-custom"
                      variant="dropdown-item-custom"
                      href="#"
                    >
                      Çıkış Yap
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
