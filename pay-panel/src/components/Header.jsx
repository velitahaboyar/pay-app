import React from "react";

function Header() {
  const name = localStorage.getItem("userName");

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
              className="d-flex gap-4 align-items-center justify-content-between"
            >
              <span className="text-primary">
                Hoşgeldin
                <h4>
                  {name}
                  <i className="bi bi-lightning-charge text-tertiary"></i>
                </h4>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
