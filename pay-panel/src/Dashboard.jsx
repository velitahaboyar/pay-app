import React from "react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiHandHeartDuotone } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaTurkishLiraSign } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="d-flex align-items-center" style={{ height: "100%" }}>
      <div className="container d-flex align-items-center">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="card d-flex p-sm-1 p-xl-5 p-md-2 p-lg-2 justify-content-center bg-primary rounded-2 border-tertiary col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
            <h3 className="align-self-center text-tertiary mb-3">
              Güncel Durum
            </h3>
            <div className="container">
              <div className="card bg-primary  shadow-custom">
                <div className="card-body bg-primary">
                  <div className="d-flex align-items-center flex-column justify-content-center">
                    <h3 className="card-title text-primary fw-bold">Komisyonlarım</h3>
                    <hr className="w-25 text-tertiary" />
                  </div>
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="fw-bold">
                        <FcSalesPerformance
                          className="text-tertiary me-2"
                          size={"22"}
                        />
                        Toplam Satış Miktarı:
                      </h3>
                    </div>
                    <div>
                      <h3>216</h3>
                      {/* //localstorage'dan yapılan toplam satış miktarı buraya gelecek */}
                    </div>
                  </div>
                  <hr className="text-primary" />
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="fw-bold">
                        <GiReceiveMoney
                          className="text-tertiary me-2"
                          size={"22"}
                        />
                        Toplam Kazanç:
                      </h3>
                    </div>
                    <div className="d-flex align-items-center">
                      <h3>28.216</h3>
                      <FaTurkishLiraSign
                        size={"20"}
                        className="text-tertiary mb-2 ms-1"
                      />
                      {/* //localstorage'dan, yapılan toplam satış miktarı buraya gelecek */}
                    </div>
                  </div>
                  <hr className="text-primary" />

                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <h3 className="fw-bold">
                      <GiPayMoney className="text-tertiary me-2" size={"22"} />
                      Ödenen Komisyon Ücreti:
                    </h3>
                    <div className="d-flex align-items-center">
                      <h3>7.350</h3>
                      <FaTurkishLiraSign
                        size={"20"}
                        className="text-tertiary mb-2 ms-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="card d-flex p-sm-1 p-xl-5 p-md-2 p-lg-2 justify-content-center bg-primary rounded-2 border-tertiary col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
            <div className="card-body shadow-custom rounded-4 p-sm-3 p-xl-5 p-md-3 p-lg-3">
              <h1 className="card-title text-primary text-start">
                <span className="text-tertiary fw-bold">PAY</span>'a Hoşgeldiniz{" "}
                <PiHandHeartDuotone className="text-tertiary" />
              </h1>
              <hr className="text-tertiary" />
              <div className="d-flex flex-column mt-5">
                <h4 className="mt-2 tracking-wide text-primary fw-bold letter-spacing-1 ">
                  <span className="text-tertiary">PAY</span> ile tüm komisyon
                  işlemleriniz kontrol altında{" "}
                  <HiOutlineRocketLaunch
                    className="text-tertiary"
                    size={"28"}
                  />
                </h4>
                <div className="mt-3">
                  <h6 className="card-subtitle text-primary fw-bold lh-lg mt-2">
                    Komisyon Yönetimini Kolaylaştırın! <br />
                    <span className="text-tertiary">PAY</span>, KOBİ’ler için
                    geliştirilmiş kullanıcı dostu bir komisyon yönetim
                    uygulamasıdır.
                    <br />
                    Komisyon kayıtlarınızı kolayca oluşturun, düzenleyin ve
                    takip edin. İş ortaklarınızla yaptığınız anlaşmaları tek bir
                    platformda yönetin, süreçlerinizi daha şeffaf ve verimli
                    hale getirin. <br />
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
