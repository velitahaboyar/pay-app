import { ImExit } from "react-icons/im";
import { PiHandHeartDuotone } from "react-icons/pi";
import { Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

function Header({ isMobile, isMenuOpen, setIsMenuOpen }) {
  const name = localStorage.getItem("userName");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="bg-primary navbar shadow-custom"
      style={{ position: "relative", zIndex: 1001 }}
    >
      <div className="container p-2">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <div id="logo-div">
            <a href="/" className="navbar-brand">
              <img src="paylogoyeni.svg" width="100" height="70" alt="Logo" />
            </a>
          </div>

          <div className="d-flex align-items-center">
            <div
              id="user-info-div"
              className="d-flex flex-column justify-content-evenly align-items-start"
            >
              <span className="text-primary mb-2">
                Hoşgeldin{" "}
                <PiHandHeartDuotone className="text-tertiary" size={"20"} />
              </span>
              <div className="d-flex align-items-center gap-3">
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn-outline-quaternary-custom text-primary"
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

                {isMobile ? (
                  <button
                    className="btn btn-outline-tertiary text-primary"
                    onClick={toggleMenu}
                  >
                    <FaBars size={24} />
                  </button>
                ) : (
                  <div className="nav-item">
                    <a
                      href="#"
                      className="nav-link text-primary fw-bold"
                      id="exit-button"
                    >
                      <button
                        className="btn btn-outline-tertiary"
                        id="btn-hover-none"
                      >
                        Çıkış Yap <ImExit size={"18"} />
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
