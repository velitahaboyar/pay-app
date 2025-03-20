import React, { useEffect, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { VscPercentage } from "react-icons/vsc";
import axios from "axios";
import { addSale } from "../js/addSale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//input'a virgül eklenmiyor düzelt
//local'e noktadan öncesi parasal olarak ekleniyor
//isim kısmına sayısal değer kabul edilmeyecek
//inputların max min length'i kontrol edilecek ve notify bastırılacak.
//toplam satış ikonunu değiştir.

function Newdata() {
  // Sayıyı binlik ayracıyla formatlayan fonksiyon
  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Ürün fiyatı inputu için onChange handler
  const handleProductPriceChange = (e) => {
    const rawValue = e.target.value; // Kullanıcının yazdığı ham değer
    const formattedValue = formatNumber(rawValue); // Formatlanmış hali
    setProductPrice(formattedValue);
  };

  const notifyWarn = (message) => {
    toast.warn(message, {
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

  // Kullanıcı bilgileri GET işlemi
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://private-3cb5f3-adduser15.apiary-mock.com/getUserInfo"
        );
        let apiData = response.data.UserList || [];
        let localData = localStorage.getItem("userInfo");
        let storedData = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(storedData)) storedData = [storedData];

        let newData = apiData.filter(
          (apiItem) =>
            !storedData.some(
              (storedItem) => storedItem.personTel === apiItem.personTel
            )
        );
        let mergedData = [...storedData, ...newData];
        setUserInfo(mergedData);
        if (newData.length > 0) {
          localStorage.setItem("userInfo", JSON.stringify(mergedData));
        }
      } catch {
        notifyError("Kullanıcı bilgileri alınamadı!");
      }
    };
    fetchUserInfo();
  }, []);

  // Kullanıcı bilgileri POST işlemi
  const [personName, setPersonName] = useState("");
  const [personTel, setPersonTel] = useState("");

  const postUserInfo = async () => {
    if (!personName || !personTel) {
      notifyWarn("Satıcı İsmi ve Telefon Numarası zorunludur!");
      return;
    }

    let newUser = { personName, personTel };
    try {
      const responseUser = await axios.post(
        "https://private-3cb5f3-adduser15.apiary-mock.com/postUserInfo",
        newUser
      );
      if (responseUser.data.Result === "success") {
        let localData = localStorage.getItem("userInfo");
        let userArray = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(userArray)) userArray = [userArray];

        userArray.push(newUser);
        localStorage.setItem("userInfo", JSON.stringify(userArray));
        setUserInfo([...userInfo, newUser]);
        setPersonName(""); // Formu sıfırla
        setPersonTel("");
        notifySuccess("Kullanıcı başarıyla eklendi!");
      } else {
        notifyError("Kullanıcı eklenemedi!");
      }
    } catch {
      notifyError("Bir hata oluştu!");
    }
  };

  // Komisyon grubu GET & POST işlemi
  const [productGroup, setProductGroup] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [comPercentage, setComPercentage] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchProductGroup = async () => {
      try {
        const response = await axios.get(
          "https://private-152a7f-comgroup.apiary-mock.com/GetProductGroup"
        );
        let apiData = response.data.ProductGroup || [];
        let localData = localStorage.getItem("comGroup");
        let storedData = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(storedData)) storedData = [storedData];

        let newData = apiData.filter(
          (apiItem) =>
            !storedData.some(
              (storedItem) => storedItem.productName === apiItem.productName
            )
        );
        let mergedData = [...storedData, ...newData];
        setProductGroup(mergedData);
        if (newData.length > 0) {
          localStorage.setItem("comGroup", JSON.stringify(mergedData));
        }
      } catch {
        notifyError("Komisyon grubu alınamadı!");
      }
    };
    fetchProductGroup();
  }, []);

  const postComGroup = async () => {
    if (!productName || !productPrice || !comPercentage) {
      notifyWarn("Ürün Adı, Fiyat ve Komisyon Yüzdesi zorunludur!");
      return;
    }

    let newComGroup = { productName, productPrice, comPercentage };
    try {
      const response = await axios.post(
        "https://private-152a7f-comgroup.apiary-mock.com/PostProductGroup",
        newComGroup
      );
      if (response.data.Result === "success") {
        let localData = localStorage.getItem("comGroup");
        let comGroupArray = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(comGroupArray)) comGroupArray = [comGroupArray];

        comGroupArray.push(newComGroup);
        localStorage.setItem("comGroup", JSON.stringify(comGroupArray));
        setProductGroup([...productGroup, newComGroup]);
        setProductName("");
        setProductPrice("");
        setComPercentage("");
        notifySuccess("Komisyon grubu başarıyla eklendi!");
      } else {
        notifyError("Komisyon grubu eklenemedi!");
      }
    } catch {
      notifyError("Bir hata oluştu!");
    }
  };

  const [salesAmount, setSalesAmount] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleAddSale = async () => {
    if (!selectedPerson || !selectedGroup || !salesAmount) {
      notifyWarn("Satış Yapan Kişi, Komisyon Grubu ve Satış Adedi zorunludur!");
      return;
    }

    try {
      const saleData = {
        personTel: selectedPerson.split("|")[1].trim(),
        productName: selectedGroup.split("|")[0].trim(),
        salesAmount: parseInt(salesAmount),
      };
      const result = await addSale(saleData);
      if (result.success) {
        notifySuccess("Satış başarıyla eklendi!");
        setSalesAmount("");
        setSelectedPerson("");
        setSelectedGroup("");
      } else {
        notifyError("Satış eklenemedi!");
      }
    } catch {
      notifyError("Bir hata oluştu!");
    }
  };

  return (
    <div className="container my-3 flex-column d-flex gap-5 justify-content-center">
      <div className="flex-sm-column">
        <div className="card bg-primary p-xl-3 p-md-2 p-sm-1 shadow-custom-2 rounded-4">
          <div className="card-body flex-xxl-row">
            <div className="text-primary text-center">
              <h3>Komisyon & Satıcı Ekle</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-50" />
              </div>
            </div>
            <ToastContainer />
            <div className="flex-xs-column text-center" id="dropdown div">
              <div className="col-6 p-md-5 p-2 p-lg-2 mb-5 w-100">
                <CustomDropdown
                  title="Yeni Komisyon Grubu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary my-3 text-primary">
                    Yeni Komisyon Grubu Bilgileri
                  </div>
                  <div className="container bg-primary rounded-4 p-sm-4 p-4 p-xl-2 p-xxl-2 shadow-custom text-primary">
                    <form action="" className="p-xl-4 text-start">
                      <div id="groupNameDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Ürün Adı:
                        </label>
                        <input
                          id="productName"
                          name="productName"
                          type="text"
                          className="form-control"
                          maxLength={"100"}
                          required
                          autoComplete="off"
                          value={productName} // Değeri state ile bağladım
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div id="priceDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Ürün Fiyatı:
                        </label>
                        <input
                          id="productPrice"
                          name="productPrice"
                          type="text"
                          value={productPrice}
                          className="form-control"
                          maxLength={"12"}
                          autoComplete="off"
                          max={"100000"}
                          min={"1"}
                          pattern="\d*"
                          onChange={handleProductPriceChange}
                          required
                        />
                      </div>
                      <div id="comPercentageDiv" className="">
                        <label htmlFor="" className="form-label">
                          Komisyon Yüzdesi:
                        </label>
                        <div className="d-flex aling-items-center justify-content-between">
                          <div className="input-group w-25 form-outline">
                            <input
                              id="comPercentage"
                              name="comPercentage"
                              type="number"
                              className="form-control text-end no-spinner rounded-2"
                              max="100"
                              min="1"
                              autoComplete="off"
                              required
                              style={{
                                appearance: "textfield",
                                MozAppearance: "textfield",
                                WebkitAppearance: "none",
                              }}
                              value={comPercentage} // Değeri state ile bağladım
                              onChange={(e) => setComPercentage(e.target.value)}
                            />
                            <VscPercentage
                              className="align-self-center mx-1"
                              size={"20"}
                            />
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Formun submit olmasını engelle
                              postComGroup();
                            }}
                            className="btn btn-outline-quaternary-custom"
                            type="button"
                          >
                            Kaydet
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
              <div className="col-6 p-sm-5 col-6 p-sm-5 p-xs-5 p-lg-2 p-xxl-2 w-100">
                <CustomDropdown
                  title="Kullanıcı Ekle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary my-3 text-primary mb-3">
                    Satış Yapacak Kullanıcı Bilgileri
                  </div>
                  <div className="container bg-primary rounded-4 p-sm-4 p-4 p-xl-2 p-xxl-2 shadow-custom text-primary">
                    <form action="" className="p-xl-4 text-start">
                      <div id="groupNameDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Satıcı İsmi:
                        </label>
                        <input
                          id="personName"
                          name="personName"
                          type="text"
                          className="form-control"
                          maxLength={"30"}
                          minLength={"3"}
                          required
                          autoComplete="off"
                          value={personName} // Değeri state ile bağladım
                          onChange={(e) => setPersonName(e.target.value)}
                        />
                      </div>
                      <div id="priceDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Telefon Numarası:
                        </label>
                        <input
                          id="personTel"
                          name="personTel"
                          type="tel"
                          className="form-control"
                          pattern="[1-9]{3}[0-9]{3}[0-9]{4}"
                          maxLength={10}
                          required
                          autoComplete="off"
                          value={personTel} // Değeri state ile bağladım
                          onChange={(e) => setPersonTel(e.target.value)}
                        />
                        <sub className="text-tertiary">
                          *Telefon numarasını başında 0 olmadan giriniz.
                        </sub>
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-outline-quaternary-custom"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault(); // Formun submit olmasını engelle
                            postUserInfo();
                          }}
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
            </div>
          </div>
          <div className="text-center text-tertiary">
            <sub>
              *Yukarıda bulunan dropdownlar aracılığıyla işletme sahibi yeni bir
              komisyon grubu altında satışı yapılacak ürünün adını, fiyatını ve
              vereceği komisyon yüzdesini ekler ve komisyon vereceği kullanıcıyı
              isim ve telefon bilgileriyle oluşturur. Oluşturulan grup ve
              kullanıcı, daha sonra satış eklemek için kullanılır.
            </sub>
          </div>
        </div>
      </div>
      <div className="flex-sm-column">
        <div className="card bg-primary p-xl-3 shadow-custom-2 rounded-4">
          <div className="card-body">
            <div className="text-primary text-center mb-3">
              <h3>Satış Ekle</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-50" />
              </div>
            </div>
            <div className="container bg-primary rounded-4 p-sm-4 p-4 p-xl-2 p-xxl-2 shadow-custom text-primary">
              <form action="" className="p-xl-4 text-start">
                <div className="container-fluid">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label text-primary">
                      Satış Yapan Kişi:
                    </label>
                    <div>
                      <select
                        name="selectComPerson"
                        id="selectComPerson"
                        className="form-select"
                        required
                        value={selectedPerson}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                      >
                        <option value="">
                          Lütfen Satış Yapan Kişiyi Seçin
                        </option>
                        {userInfo.map((item, index) => (
                          <option
                            key={index}
                            value={`${item.personName} | ${item.personTel}`}
                          >
                            {item.personName} | {item.personTel}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label text-primary">
                      Komisyon Grubu:
                    </label>
                    <div>
                      <select
                        name="selectComGroup"
                        id="selectComGroup"
                        className="form-select"
                        required
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                      >
                        <option value="">Lütfen Komisyon Grubunu Seçin</option>
                        {productGroup.map((item, index) => (
                          <option
                            key={index}
                            value={`${item.productName} | ${item.productPrice} TL | ${item.comPercentage}%`}
                          >
                            {item.productName} | {item.productPrice} TL |{" "}
                            {item.comPercentage}%
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="" className="form-label text-primary">
                        Satış Adedi:
                      </label>
                      <div className="d-flex align-items-center justify-content-between">
                        <input
                          type="number"
                          name="salesAmount"
                          id="salesAmount"
                          className="form-control w-25"
                          min={1}
                          max={50}
                          maxLength={2}
                          autoComplete="off"
                          required
                          value={salesAmount}
                          onChange={(e) => setSalesAmount(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-quaternary-custom w-25 text-tertiary"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddSale();
                          }}
                          type="button"
                        >
                          Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex flex-row text-center"
                  id="dropdown div"
                ></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container mt-5"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default Newdata;
