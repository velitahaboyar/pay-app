import { useState, useRef } from "react";

function CustomDropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dropdown'ı aç/kapat
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Başka bir dropdown açılırsa önce diğerlerini kapat
  const handleGlobalClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
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

// function CustomDropdown() {
//   return (
//     <div className="container mt-5" onClick={(e) => e.stopPropagation()}>
//       <CustomDropdown title="Form 1">
//         <form>
//           <div className="mb-3">
//             <label className="form-label">Ad</label>
//             <input type="text" className="form-control" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">E-posta</label>
//             <input type="email" className="form-control" />
//           </div>
//         </form>
//       </CustomDropdown>

//       <CustomDropdown title="Form 2">
//         <form>
//           <div className="mb-3">
//             <label className="form-label">Şifre</label>
//             <input type="password" className="form-control" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Onay</label>
//             <input type="checkbox" className="form-check-input" />
//           </div>
//         </form>
//       </CustomDropdown>
//     </div>
//   )
// }

export default CustomDropdown;
