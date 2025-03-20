import React, { useEffect, useState } from "react";
import { FaTurkishLiraSign } from "react-icons/fa6";

const Tables = () => {
  const [userSalesData, setUserSalesData] = useState([]);

  // localStorage'dan veriyi al ve state'e aktar
  useEffect(() => {
    const data = localStorage.getItem("userSalesData");
    if (data) {
      setUserSalesData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Satış Verileri</h3>
      <table className="table table-bordered table-dark table-stripe">
        <thead className="text-center">
          <tr>
            <th>İsim Soyisim</th>
            <th>Telefon Numarası</th>
            <th>Ürün Adı</th>
            <th>Satış Adedi</th>
            <th>
              Verilecek Komisyon (
              <FaTurkishLiraSign className="text-tertiary" />)
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {userSalesData.map((user, index) => (
            <tr key={index}>
              <td>{user.personName}</td>
              <td>{user.personTel}</td>
              <td>{user.productName}</td>
              <td className="text-end fw-bold">{user.sales}</td>
              <td className="text-end fw-bold">
                {user.commission}{" "}
                <FaTurkishLiraSign className="text-tertiary" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
