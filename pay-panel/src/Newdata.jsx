import React, { use, useEffect, useState } from "react";
import CustomDropdown from "./components/CustomDropdown";
import toast, { Toaster } from "react-hot-toast";
import { VscPercentage } from "react-icons/vsc";
import axios from "axios";

function addSale() {
  var sales = parseInt(document.getElementById("salesAmount").value); // Satış adedini al
  var comGroupData = localStorage.getItem("comGroup"); // Komisyon grubu verilerini localStorage'dan al
  var selectedComGroup = document.getElementById("selectComGroup").value; // Seçilen komisyon grubunu al
  var selectedUser = document.getElementById("selectComPerson").value; // Seçilen kullanıcıyı al

  // Eğer komisyon grubu verisi varsa
  if (comGroupData) {
    var comGroup = JSON.parse(comGroupData); // JSON parse et

    // Seçilen komisyon grubuna ait ürünü bul
    var selectedProduct = comGroup.find(
      (product) =>
        `${product.productName} | ${product.productPrice} TL | ${product.comPercentage}%` ===
        selectedComGroup
    );

    if (selectedProduct) {
      var productPrice = selectedProduct.productPrice; // Ürün fiyatını al
      var comPercentage = selectedProduct.comPercentage; // Komisyon yüzdesini al
      var totalSalesAmount = sales * productPrice; // Satış adediyle fiyatı çarp
      var commission = (totalSalesAmount * comPercentage) / 100; // Verilen komisyonu hesapla
      var profit = totalSalesAmount - commission; // Kârı hesapla
      var productName = selectedProduct.productName; // Ürün ismini al

      console.log("Toplam Satış Tutarı: ", totalSalesAmount);
      console.log("Komisyon Tutarı: ", commission);
      console.log("Kâr: ", profit);

      // Kullanıcıya özel bilgileri localStorage'a kaydet
      var userSalesData = localStorage.getItem("userSalesData");
      var userSalesArray = userSalesData ? JSON.parse(userSalesData) : [];

      // Kullanıcıyı bul ya da yeni bir kullanıcı verisi oluştur
      var selectedUserData = userSalesArray.find(
        (user) => user.personTel === selectedUser.split(" | ")[1] // Telefon numarasına göre eşleştir
      );

      if (selectedUserData) {
        // Kullanıcı varsa, satış bilgilerini güncelle
        selectedUserData.sales += sales; // Adet olarak satışları güncelle
        selectedUserData.totalSales += sales; // Toplam satış adedini güncelle
        selectedUserData.commission += commission;
        selectedUserData.profit += profit;
        selectedUserData.productName = productName; // Ürün ismini de güncelle
      } else {
        // Kullanıcı yoksa, yeni kullanıcı verisi ekle
        userSalesArray.push({
          personTel: selectedUser.split(" | ")[1],
          personName: selectedUser.split(" | ")[0],
          sales: sales, // Satış adedi
          totalSales: sales, // Toplam satış adedi
          commission: commission,
          profit: profit,
          productName: productName, // Ürün ismini kaydet
        });
      }

      // Veriyi tekrar localStorage'a kaydet
      localStorage.setItem("userSalesData", JSON.stringify(userSalesArray));

      // Toplam satış adedini localStorage'a kaydet
      var previousTotalSales =
        parseInt(localStorage.getItem("totalSales")) || 0;
      var newTotalSales = previousTotalSales + sales; // Yeni toplam satış adedi
      localStorage.setItem("totalSales", newTotalSales.toString()); // Yeni toplam satış adedini kaydet

      // Dashboard'ı güncellemek için gerekli bilgileri state'e aktar
      // Burada, dashboard bileşenini güncelleyen bir fonksiyon çağırabilirsin
    } else {
      console.log("Seçilen ürün bulunamadı.");
    }
  } else {
    console.log("Komisyon grubu verisi bulunamadı.");
  }
}

function Newdata() {
  const notify = () => toast("Deneme");

  // Kullanıcı bilgileri GET işlemi başlangıcı
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://private-3cb5f3-adduser15.apiary-mock.com/getUserInfo"
        );

        let apiData = response.data.UserList || []; // API'den gelen kullanıcılar
        let localData = localStorage.getItem("userInfo"); // localStorage'daki kullanıcılar

        let storedData = localData ? JSON.parse(localData) : []; // JSON parse işlemi
        if (!Array.isArray(storedData)) {
          storedData = [storedData]; // Eğer tek obje varsa diziye çevir
        }

        // **API verileri zaten localStorage içinde var mı kontrol et**
        let newData = apiData.filter(
          (apiItem) =>
            !storedData.some(
              (storedItem) => storedItem.personTel === apiItem.personTel
            ) // Telefon numarasına göre kıyasla
        );

        let mergedData = [...storedData, ...newData]; // Yeni verileri ekleyerek birleştir

        setUserInfo(mergedData); // State'i güncelle

        // localStorage'ı sadece yeni veri varsa güncelle
        if (newData.length > 0) {
          localStorage.setItem("userInfo", JSON.stringify(mergedData));
        }
      } catch (error) {
        alert("başarısız ustaa..");
      }
    };

    fetchUserInfo();
  }, []);

  // Kullanıcı bilgileri GET işlemi sonu

  // Kullanıcı bilgileri POST işlemi başlangıcı
  const [personName, setPersonName] = useState("");
  const [personTel, setPersonTel] = useState("");

  const postUserInfo = async () => {
    let newUser = {
      personName: personName,
      personTel: personTel,
    };

    const responseUser = await axios.post(
      "https://private-3cb5f3-adduser15.apiary-mock.com/postUserInfo",
      newUser
    );

    if (responseUser.data.Result == "success") {
      let localData = localStorage.getItem("userInfo");
      let userArray = localData ? JSON.parse(localData) : [];

      if (!Array.isArray(userArray)) {
        userArray = [userArray]; // Eğer tek obje varsa diziye çeviriyoruz
      }

      userArray.push(newUser); // Yeni kullanıcıyı ekle
      localStorage.setItem("userInfo", JSON.stringify(userArray)); // Güncellenmiş listeyi kaydet

      setUserInfo([...userInfo, newUser]); // Yeni kullanıcıyı state'e de ekle
    } else {
      alert("Başarısız...");
    }
  };
  // Kullanıcı bilgileri POST işlemi sonu

  // komisyon grubu GET islemi baslangici
  // komisyon grubu POST islemi baslangic

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

        let apiData = response.data.ProductGroup || []; // API'den gelen veriler
        let localData = localStorage.getItem("comGroup"); // localStorage verileri

        let storedData = localData ? JSON.parse(localData) : []; // localStorage JSON parse
        if (!Array.isArray(storedData)) {
          storedData = [storedData]; // Eğer tek obje varsa diziye çevir
        }

        // **API verileri zaten localStorage içinde var mı kontrol et**
        let newData = apiData.filter(
          (apiItem) =>
            !storedData.some(
              (storedItem) => storedItem.productName === apiItem.productName
            )
        );

        let mergedData = [...storedData, ...newData]; // Yeni verileri ekleyerek birleştir

        setProductGroup(mergedData); // State'i güncelle

        // localStorage'ı sadece yeni veri varsa güncelle
        if (newData.length > 0) {
          localStorage.setItem("comGroup", JSON.stringify(mergedData));
        }
      } catch (error) {
        alert("başarısız ustaa..");
      }
    };

    fetchProductGroup();
  }, []);

  const postComGroup = async () => {
    let newComGroup = {
      productName: productName,
      productPrice: productPrice,
      comPercentage: comPercentage,
    };

    // Yeni ürün grubunu API'ye POST isteği ile gönderiyoruz
    const response = await axios.post(
      "https://private-152a7f-comgroup.apiary-mock.com/PostProductGroup",
      newComGroup
    );

    if (response.data.Result == "success") {
      // localStorage'daki mevcut veriyi alıyoruz
      let localData = localStorage.getItem("comGroup");
      let comGroupArray = localData ? JSON.parse(localData) : [];

      if (!Array.isArray(comGroupArray)) {
        comGroupArray = [comGroupArray]; // Eğer tek obje varsa diziye çeviriyoruz
      }

      comGroupArray.push(newComGroup); // Yeni ürünü diziye ekliyoruz
      localStorage.setItem("comGroup", JSON.stringify(comGroupArray)); // Güncellenmiş listeyi localStorage'a kaydediyoruz

      setProductGroup([...productGroup, newComGroup]); // Yeni eklenen ürünü state'e de ekliyoruz
    } else {
      alert("Başarısız");
    }
  };

  // komisyon grubu POST islemi sonu
  // komisyon grubu GET islemi sonu

  return (
    <div className="container my-5 d-flex gap-5 justify-content-center">
      <div className="col col-lg-8">
        <div className="card bg-secondary p-xl-3 p-md-2 p-sm-1 shadow-custom-2 rounded-4">
          <div className="card-body">
            <div className="text-primary text-center mb-4">
              <h3>Komisyon & Satıcı Ekle</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-50" />
              </div>
            </div>

            <div className="d-flex flex-row text-center" id="dropdown div">
              <div className="col-6 ">
                <CustomDropdown
                  title="Yeni Komisyon Grubu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary text-primary mb-3">
                    Yeni Komisyon Grubu Bilgileri
                  </div>

                  <div className="container bg-primary rounded-4 shadow-custom-2 text-primary">
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
                          type="number"
                          className="form-control"
                          max={"100000"}
                          min={"1"}
                          size={"4"}
                          pattern="\d*"
                          required
                          autoComplete="off"
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      <div id="comPercentageDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Komisyon Yüzdesi:
                        </label>
                        <div className="d-flex aling-items-center justify-content-between">
                          <button
                            onClick={postComGroup}
                            className="btn btn-outline-quaternary-custom"
                            type="button"
                          >
                            Kaydet
                          </button>
                          <div className="input-group w-50 form-outline">
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
                              onChange={(e) => setComPercentage(e.target.value)}
                            />
                            <VscPercentage
                              className="align-self-center mx-1"
                              size={"20"}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
              <div className="col-6">
                <CustomDropdown
                  title="Kullanıcı Ekle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary text-primary mb-3">
                    Satış Yapacak Kullanıcı Bilgileri
                  </div>

                  <div className="container-fluid bg-primary rounded-4 shadow-custom-2 text-primary">
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
                          required
                          autoComplete="off"
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
                          onChange={(e) => setPersonTel(e.target.value)}
                        />
                        <sub className="text-tertiary">
                          *Telefon numarasını başında 0 olmadan giriniz.
                        </sub>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-quaternary-custom"
                          type="button"
                          onClick={() => {
                            postUserInfo();
                            notify();
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
      <div className="col-8">
        <div className="card bg-secondary p-xl-3 shadow-custom-2 rounded-4">
          <div className="card-body">
            <div className="text-primary text-center mb-3">
              <h3>Satış Ekle</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-50" />
              </div>
            </div>
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
                  >
                    <option defaultValue={""}>
                      Lütfen Satış Yapan Kişiyi Seçin
                    </option>
                    {userInfo.map((item, index) => (
                      <option key={index}>
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
                  >
                    <option defaultValue={""}>
                      Lütfen Komisyon Grubunu Seçin
                    </option>
                    {productGroup.map((item, index) => (
                      <option key={index}>
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
                    />
                    <button
                      className="btn btn-outline-quaternary w-50 text-tertiary"
                      onClick={addSale}
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
