/*
Önbilgi:
1- Import'lar: En üstte,
2- State'ler: Hepsini bir arada topladım.
3- Yardımcı Fonksiyonlar: formatNumber, isValidName ve notify* fonksiyonları bir grupta, çünkü bunlar genel amaçlı yardımcılar.
4- API İşlemleri: postUserInfo, postComGroup ve handleAddSale gibi asenkron işlemleri bir araya getirdim, çünkü bunlar dış dünyayla iletişim kuruyor.
5- Event Handler'lar: handle*Change fonksiyonlarını ayrı bir grup yaptım, çünkü bunlar UI etkileşimlerini yönetiyor.
6- useEffect'ler: Veri çekme işlemleri yan etkiler olarak bir arada, sırayla okunması kolay.
7- Render: En altta, çünkü bu kısım UI'yi oluşturuyor ve diğer her şey buna hizmet ediyor.
Bu düzen, kodu inceleyen birinin önce "Neler tanımlı?", sonra "Hangi araçlar var?", ardından "Veri nasıl işleniyor?" ve en son "UI nasıl görünüyor?" diye adım adım takip etmesini sağlar.
*/

import React, { useEffect, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { VscPercentage } from "react-icons/vsc";
import axios from "axios";
import { addSale } from "../js/addSale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/custom-button.css"

function Newdata() {
  // 1. State Tanımlamaları
  const [userInfo, setUserInfo] = useState([]);
  const [personName, setPersonName] = useState("");
  const [personTel, setPersonTel] = useState("");
  const [comPercentage, setComPercentage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productGroup, setProductGroup] = useState([]);
  const [productName, setProductName] = useState("");
  const [salesAmount, setSalesAmount] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // 2. Yardımcı Fonksiyonlar
  const handleSalesAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setSalesAmount(value);
    }
  };

  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const isValidName = (name) => {
    return /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(name);
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

  // 3. API İşlemleri (GET & POST)
  const postUserInfo = async () => {
    if (
      !personName ||
      !personTel ||
      personName.length < 3 ||
      personTel.length < 10
    ) {
      notifyWarn("Satıcı İsmi ve Telefon Numarası zorunludur!");
      return;
    }

    if (!isValidName(personName)) {
      notifyWarn("Satıcı ismi sadece harf ve boşluk içerebilir!");
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
        setPersonName("");
        setPersonTel("");
        notifySuccess("Kullanıcı başarıyla eklendi!");
      } else {
        notifyError("Kullanıcı eklenemedi!");
      }
    } catch {
      notifyError("Bir hata oluştu!");
    }
  };

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

  const handleAddSale = async () => {
    if (!selectedPerson || !selectedGroup || !salesAmount) {
      notifyWarn("Satış Yapan Kişi, Komisyon Grubu ve Satış Adedi zorunludur!");
      return;
    }

    try {
      const saleData = {
        personTel: selectedPerson.split("|")[1].trim(),
        personName: selectedPerson.split("|")[0].trim(),
        productName: selectedGroup.split("|")[0].trim(),
        salesAmount,
      };

      console.log("Gönderilen saleData:", saleData);

      const result = await addSale(saleData);
      console.log("addSale sonucu:", result);

      if (result.success) {
        notifySuccess("Satış başarıyla eklendi!");
        setSalesAmount("");
        setSelectedPerson("");
        setSelectedGroup("");
      } else {
        notifyError(result.message || "Satış eklenemedi!");
      }
    } catch (error) {
      console.error("Hata:", error);
      notifyError("Bir hata oluştu!");
    }
  };

  // 4. Event Handler'lar
  const handleComPercentageChange = (e) => {
    const value = e.target.value;
    const maxLength = 3;

    if (value.length <= maxLength && /^\d*$/.test(value)) {
      const numValue = parseInt(value, 10) || "";
      if (numValue === "" || (numValue >= 1 && numValue <= 100)) {
        setComPercentage(value);
      }
    }
  };

  const handleProductPriceChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatNumber(rawValue);
    setProductPrice(formattedValue);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value === "" || isValidName(value)) {
      setPersonName(value);
    }
  };

  const handleTelChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPersonTel(value);
    }
  };

  // 5. useEffect (Yan Etkiler)
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

  // 6. Render
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
              <div className="col-6 p-md-3 p-2 p-lg-2 mb-5 w-100">
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
                          className="form-control bg-dark text-primary"
                          maxLength={"100"}
                          required
                          autoComplete="off"
                          value={productName}
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
                          className="form-control bg-dark fw-bold text-primary"
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
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="input-group w-25 form-outline">
                            <input
                              id="comPercentage"
                              name="comPercentage"
                              type="number"
                              className="form-control bg-dark text-primary fw-bold text-end no-spinner rounded-2"
                              max="100"
                              min="1"
                              autoComplete="off"
                              required
                              style={{
                                appearance: "textfield",
                                MozAppearance: "textfield",
                                WebkitAppearance: "none",
                              }}
                              value={comPercentage}
                              onInput={handleComPercentageChange}
                            />
                            <VscPercentage
                              className="align-self-center mx-1"
                              size={"20"}
                            />
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
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
                          className="form-control bg-dark text-primary"
                          maxLength={"40"}
                          minLength={"3"}
                          required
                          autoComplete="off"
                          value={personName}
                          onChange={handleNameChange}
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
                          className="form-control bg-dark text-primary fw-bold"
                          pattern="[1-9]{3}[0-9]{3}[0-9]{4}"
                          maxLength={10}
                          required
                          autoComplete="off"
                          value={personTel}
                          onChange={handleTelChange} 
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
                            e.preventDefault();
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
                        className="form-select bg-dark text-primary"
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
                        className="form-select bg-dark text-primary"
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
                          className="form-control w-25 bg-dark text-primary fw-bold"
                          min={1}
                          max={50}
                          autoComplete="off"
                          required
                          value={salesAmount}
                          onChange={handleSalesAmountChange}
                        />
                        <button
                          className="btn btn-outline-quaternary-custom w-25 mobile-wider text-tertiary"
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
