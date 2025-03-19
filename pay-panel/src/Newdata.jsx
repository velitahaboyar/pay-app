import React, { use, useEffect, useState } from "react";
import CustomDropdown from "./components/CustomDropdown";
import toast, { Toaster } from "react-hot-toast";
import { VscPercentage } from "react-icons/vsc";
import axios from "axios";

function Newdata() {
  const notify = () => toast("Deneme");

  // kullanıcı bilgileri GET islemi baslangici
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://private-3cb5f3-adduser15.apiary-mock.com/getUserInfo"
        );
        setUserInfo(response.data.UserList);
      } catch (error) {
        alert("basarisiz ustaa..");
      }
    };
    fetchUserInfo();
  }, []);

  // kullanıcı bilgileri GET islemi sonu

  // kullanıcı bilgileri POST islemi baslangici

  const [personName, setPersonName] = useState();
  const [personTel, setPersonTel] = useState();

  const postUserInfo = async () => {
    let userInfo = {
      personName: personName,
      personTel: personTel,
    };

    const responseUser = await axios.post(
      "https://private-3cb5f3-adduser15.apiary-mock.com/postUserInfo",
      userInfo
    );

    if (responseUser.data.Result == "success") {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return console.log(userInfo);
    } else {
      alert("basarisiz...");
    }
  };

  // kullanıcı bilgileri POST islemi sonu

  // komisyon grubu GET islemi baslangici

  const [productGroup, setProductGroup] = useState([]);
  useEffect(() => {
    const fetchProductGroup = async () => {
      try {
        const response = await axios.get(
          "https://private-152a7f-comgroup.apiary-mock.com/GetProductGroup"
        );
        setProductGroup(response.data.ProductGroup);
        console.log(response.data.ProductGroup);
      } catch (error) {
        alert("basarisiz ustaa..");
      }
    };
    fetchProductGroup();
  }, []);

  // komisyon grubu GET islemi sonu

  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [comPercentage, setComPercentage] = useState();

  // komisyon grubu POST islemi baslangici

  const postComGroup = async () => {
    let comGroup = {
      productName: productName,
      productPrice: productPrice,
      comPercentage: comPercentage,
    };

    const response = await axios.post(
      "https://private-152a7f-comgroup.apiary-mock.com/PostProductGroup",
      comGroup
    );

    if (response.data.Result == "success") {
      localStorage.setItem("comGroup", JSON.stringify(comGroup));
      return console.log(comGroup);
    } else {
      alert("basarisiz");
    }
  };

  // komisyon grubu POST islemi sonu

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
                        {item.productName} | {item.productPrice}TL |{" "}
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
                      className="form-control w-25"
                      min={1}
                      max={50}
                      maxLength={2}
                      autoComplete="off"
                    />
                    <button className="btn btn-outline-quaternary w-50 text-tertiary">
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
