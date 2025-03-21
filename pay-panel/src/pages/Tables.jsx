import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaMinus, FaSave, FaTrash, FaUserSlash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchUserSalesData = () => {
  const data = localStorage.getItem("userSalesData");
  let parsedData = data ? JSON.parse(data) : [];

  parsedData = parsedData.map((user) => {
    if (!user.salesRecords) {
      return {
        personTel: user.personTel,
        personName: user.personName || "",
        salesRecords: [
          {
            id: uuidv4(),
            productName: user.productName || "Bilinmeyen Ürün",
            sales: user.sales || 0,
            commission: user.commission || 0,
            profit: user.profit || 0,
            comPercentage: user.comPercentage || 0,
            productPrice: user.productPrice || 0,
          },
        ],
      };
    }
    user.salesRecords = user.salesRecords.map((record) => ({
      ...record,
      id: record.id || uuidv4(),
      productPrice: record.productPrice !== undefined ? record.productPrice : 0,
    }));
    return user;
  });

  return parsedData;
};

const updateUserSalesData = (updatedData) => {
  localStorage.setItem("userSalesData", JSON.stringify(updatedData));
  const totalSales = updatedData.reduce(
    (sum, u) => sum + u.salesRecords.reduce((s, r) => s + r.sales, 0),
    0
  );
  localStorage.setItem("totalSales", totalSales.toString());
};

// Bildirim Fonksiyonları
const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const Tables = () => {
  const [selectedUserTel, setSelectedUserTel] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState("");
  const [salesAdjustment, setSalesAdjustment] = useState(0);
  const queryClient = useQueryClient();

  const { data: userSalesData = [], isLoading } = useQuery({
    queryKey: ["userSalesData"],
    queryFn: fetchUserSalesData,
  });

  const updateMutation = useMutation({
    mutationFn: updateUserSalesData,
    onSuccess: () => {
      queryClient.invalidateQueries(["userSalesData"]);
    },
    onError: () => {
      notifyError("İşlem başarısız!");
    },
  });

  const handleSalesAdjustment = (delta) => {
    const selectedRecord = userSalesData
      .find((u) => u.personTel === selectedUserTel)
      ?.salesRecords.find((r) => r.id === selectedRecordId);

    const currentSales = selectedRecord?.sales || 0;
    const newAdjustment = salesAdjustment + delta;

    if (currentSales + newAdjustment >= 0) {
      setSalesAdjustment(newAdjustment);
    }
  };

  const handleSave = () => {
    if (!selectedUserTel || !selectedRecordId) return;

    const updatedData = userSalesData.map((user) => {
      if (user.personTel === selectedUserTel) {
        const updatedRecords = user.salesRecords.map((record) => {
          if (record.id === selectedRecordId) {
            const newSales = record.sales + salesAdjustment;
            const totalSalesAmount = newSales * (record.productPrice || 0);
            const commission = (totalSalesAmount * record.comPercentage) / 100;
            const profit = totalSalesAmount - commission;

            return {
              ...record,
              sales: newSales,
              commission,
              profit,
            };
          }
          return record;
        });
        return { ...user, salesRecords: updatedRecords };
      }
      return user;
    });

    updateMutation.mutate(updatedData, {
      onSuccess: () => {
        notifySuccess("İşlem başarılı!");
        setSalesAdjustment(0);
      },
    });
  };

  const handleDelete = () => {
    if (!selectedUserTel || !selectedRecordId) return;

    const updatedData = userSalesData
      .map((user) => {
        if (user.personTel === selectedUserTel) {
          const updatedRecords = user.salesRecords.filter(
            (record) => record.id !== selectedRecordId
          );
          return updatedRecords.length > 0
            ? { ...user, salesRecords: updatedRecords }
            : null;
        }
        return user;
      })
      .filter(Boolean);

    updateMutation.mutate(updatedData, {
      onSuccess: () => {
        notifySuccess("Ürün silindi!");
        setSelectedUserTel("");
        setSelectedRecordId("");
        setSalesAdjustment(0);
      },
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUserTel) return;

    const updatedData = userSalesData.filter(
      (user) => user.personTel !== selectedUserTel
    );

    updateMutation.mutate(updatedData, {
      onSuccess: () => {
        notifySuccess("Kullanıcı silindi!");
        setSelectedUserTel("");
        setSelectedRecordId("");
        setSalesAdjustment(0);
      },
    });
  };

  const selectedUser = userSalesData.find(
    (u) => u.personTel === selectedUserTel
  );
  const selectedRecord = selectedUser?.salesRecords?.find(
    (r) => r.id === selectedRecordId
  );

  if (isLoading) return <div className="text-primary">Yükleniyor...</div>;

  return (
    <div className="container my-3">
      <ToastContainer />
      <div className="row g-4">
        {/* Soldaki Tablo */}
        <div className="col-lg-8 col-md-7 col-sm-12">
          <div className="card bg-primary p-3 shadow-custom-2 rounded-4">
            <div className="card-body">
              <h3 className="text-primary text-center mb-3">
                Komisyonları Görüntüle
              </h3>
              <div className="table-responsive">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th className="text-tertiary">Satıcı</th>
                      <th className="text-tertiary">Telefon</th>
                      <th className="text-tertiary">Ürün</th>
                      <th className="text-tertiary">Fiyat</th>
                      <th className="text-tertiary">Satış Adedi</th>
                      <th className="text-tertiary">Komisyon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSalesData.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center text-primary">
                          Henüz satış verisi yok.
                        </td>
                      </tr>
                    ) : (
                      userSalesData.flatMap(
                        (user) =>
                          user.salesRecords?.map((record) => (
                            <tr key={record.id}>
                              <td>{user.personName || "Bilinmeyen Satıcı"}</td>
                              <td>{user.personTel}</td>
                              <td>{record.productName}</td>
                              <td>
                                {(record.productPrice || 0).toLocaleString()} TL
                              </td>
                              <td>{record.sales}</td>
                              <td>
                                {record.commission.toLocaleString("tr-TR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                TL
                              </td>{" "}
                            </tr>
                          )) || []
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sağdaki Kontrol Paneli */}
        <div className="col-lg-4 col-md-5 col-sm-12">
          <div className="card bg-primary p-3 shadow-custom-2 rounded-4 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h4 className="text-primary text-center mb-3">Satış Düzenle</h4>
              <div className="mb-3">
                <label className="form-label text-primary">Satıcı Seç:</label>
                <select
                  className="form-select bg-dark text-primary mb-3"
                  value={selectedUserTel}
                  onChange={(e) => {
                    setSelectedUserTel(e.target.value);
                    setSelectedRecordId("");
                    setSalesAdjustment(0);
                  }}
                >
                  <option value="">Bir satıcı seçin</option>
                  {userSalesData.map((user) => (
                    <option key={user.personTel} value={user.personTel}>
                      {user.personName} | {user.personTel}
                    </option>
                  ))}
                </select>

                {selectedUserTel && (
                  <>
                    <label className="form-label text-primary">Ürün Seç:</label>
                    <select
                      className="form-select bg-dark text-primary mb-3"
                      value={selectedRecordId}
                      onChange={(e) => {
                        setSelectedRecordId(e.target.value);
                        setSalesAdjustment(0);
                      }}
                    >
                      <option value="">Bir ürün seçin</option>
                      {selectedUser?.salesRecords?.map((record) => (
                        <option key={record.id} value={record.id}>
                          {record.productName} (Adet: {record.sales})
                        </option>
                      )) || []}
                    </select>
                  </>
                )}
              </div>

              {selectedUserTel && selectedRecordId && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-primary">
                      Satış Miktarı:
                    </label>
                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleSalesAdjustment(-1)}
                        disabled={
                          (selectedRecord?.sales || 0) + salesAdjustment <= 0
                        }
                      >
                        <FaMinus />
                      </button>
                      <span className="text-primary fw-bold">
                        {salesAdjustment}
                      </span>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSalesAdjustment(1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-quaternary w-100 mb-2"
                    onClick={handleSave}
                    disabled={salesAdjustment === 0}
                  >
                    <FaSave className="me-2" /> Kaydet
                  </button>
                  <button
                    className="btn btn-outline-danger w-100 mb-2"
                    onClick={handleDelete}
                  >
                    <FaTrash className="me-2" /> Ürünü Kullanıcıdan Sil
                  </button>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleDeleteUser}
                    disabled={!selectedUserTel}
                  >
                    <FaUserSlash className="me-2" /> Kullanıcıyı Sil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
