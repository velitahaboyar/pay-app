// import React, { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import { PiHandHeartDuotone } from "react-icons/pi";

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
            <div id="user-info-div" className="d-flex flex-column justify-content-evenly align-items-start">
              <span className="text-primary">
                Hoşgeldin{" "}
                <PiHandHeartDuotone className="text-tertiary" size={"20"} />
              </span>
              <h4 className="text-primary">{name}</h4>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
