import React from "react";
import CustomDropdown from "./components/CustomDropdown";

function Newdata() {
  return (
    <div className="container my-5 d-flex gap-5 justify-content-center">
      <div className="col col-lg-10">
        <div className="card bg-secondary p-xl-3 p-md-2 p-sm-1 shadow-custom-2 rounded-4">
          <div className="card-body">
            <div className="text-primary text-center mb-4">
              <h3>Komisyon Ekle</h3>
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
                    Yeni Komisyon Grubu Ekle
                  </div>

                  <div className="container bg-primary rounded-4 shadow-custom-2 text-primary">
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
                          maxLength={"100"}
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
                      <button
                        className="btn btn-outline-quaternary-custom"
                        type="button"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
              <div className="col-6">
                <CustomDropdown
                  title="Tekil Komisyon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-text text-quaternary text-primary mb-3">
                    Tekil Komisyon Ekle
                  </div>

                  <div className="container-fluid bg-primary rounded-4 shadow-custom-2 text-primary">
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
                      <div id="priceDiv" className="mb-2">
                        <label htmlFor="" className="form-label">
                          Telefon Numarası
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
                        />
                        <sub className="text-tertiary">
                          *Telefon numarasını başında 0 olmadan giriniz.
                        </sub>
                      </div>
                      <div id="comPercentageDiv" className="mb-3">
                        <label htmlFor="" className="form-label">
                          Komisyon Grubu:
                        </label>
                        <select
                          class="form-select"
                          required
                          id="personComGroupName"
                          name="personComGroupName"
                          autoComplete="off"
                        >
                          <option selected>Komisyon Grubu Seçin</option>
                          <option value="1">Ornek1</option>
                          <option value="2">Ornek2</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-outline-quaternary-custom"
                        type="button"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </CustomDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-lg-6">
        <div className="card bg-secondary p-xl-3 shadow-custom-2 rounded-4">
          <div className="card-body">
            <div className="text-primary text-center mb-4">
              <h3>Komisyonlarım</h3>
              <div className="d-flex justify-content-center">
                <hr className="text-tertiary w-50" />
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
