import { useState, useRef } from "react";

function CustomDropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-outline-quaternary-custom dropdown-toggle"
        onClick={toggleDropdown}
      >
        {title}
      </button>
      {isOpen && <div className="show p-lg-4">{children}</div>}
    </div>
  );
}

export default CustomDropdown;
