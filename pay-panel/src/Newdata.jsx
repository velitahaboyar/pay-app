import React from "react";
import CustomDropdown from "./components/CustomDropdown";

function Newdata() {
  return (
    <div className="container my-5 d-flex gap-5 justify-content-center">
      <div className="col col-lg-10">
        <div className="card bg-primary p-xl-3 ">
          <div className="card-body">
            <div className="text-primary text-center mb-4">
              <h3>Komisyon Ekle</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-75" />
              </div>
            </div>

            <div className="d-flex flex-row text-center" id="dropdown div">
              <div className="col-6 ">
                <CustomDropdown
                  title="Yeni Komisyon Grubu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary text-primary mb-3">
                    Yeni Komisyon Grubu Ekle
                  </div>

                  <div className="container bg-primary shadow-custom text-primary">
                    <form action="" className="p-xl-4 text-start">
                      <div id="groupNameDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Grup İsmi:
                        </label>
                        <input
                          id="groupName"
                          name="groupName"
                          type="text"
                          className="form-control"
                          maxLength={"30"}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div id="priceDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Ürün Fiyatı:
                        </label>
                        <input
                          id="rawPrice"
                          name="rawPrice"
                          type="number"
                          className="form-control"
                          max={"100000"}
                          min={"1"}
                          size={"4"}
                          pattern="\d*"
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div id="comPercentageDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Komisyon Yüzdesi:
                        </label>
                        <input
                          id="comPercentage"
                          name="comPercentage"
                          type="number"
                          className="form-control"
                          max={"100"}
                          min={"1"}
                          size={"3"}
                          pattern="\d*"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
              <div className="col-6">
                <CustomDropdown
                  title="Tekil Komisyon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary  text-primary mb-3">
                    Tekil Komisyon Ekle
                  </div>

                  <div className="container-fluid bg-primary w-100 h-100 shadow-custom text-primary">
                    <form action="" className="p-xl-3 text-start">
                      <div id="groupNameDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Kişi İsmi:
                        </label>
                        <input
                          id="personName"
                          name="personName"
                          type="text"
                          className="form-control"
                          maxLength={"30"}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div id="priceDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Telefon Numarası
                        </label>
                        <input
                          id="personTel"
                          name="personTel"
                          type="tel"
                          className="form-control"
                          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                          maxLength={10}
                          required
                          autoComplete="off"
                        />
                        <sub className="text-tertiary">
                          *Başında 0 olmadan giriniz.
                        </sub>
                      </div>
                      <div id="comPercentageDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Komisyon Grubu:
                        </label>
                        <select
                          class="form-select"
                          required
                          id="groupName"
                          name="groupName"
                          autoComplete="off"
                        >
                          <option selected>Komisyon Grubu Seçin</option>
                          <option value="1">Ornek1</option>
                          <option value="2">Ornek2</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-lg-6">
        <div className="card bg-quaternary">
          <div className="card-body">
            <div className="card-text text-quaternary text-center">
              Komisyonlarım
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
