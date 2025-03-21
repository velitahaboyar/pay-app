/* 
Önbilgi:
1- Import'lar: En üstte, tüm ikonlar ve bağımlılıklar bir arada.
2- State'ler: totalSales, totalProfit, ve totalCommission başa toplandı.
3- Yardımcı Fonksiyonlar: formatCurrency burada tek yardımcı fonksiyon.
4- useEffect: Veri çekme ve hesaplama kısmı, yan etkiler.
5- Render: En altta, UI oluşturma kısmı net bir şekilde ayrıldı.
*/

import React, { useState, useEffect } from "react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiHandHeartDuotone } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Dashboard = () => {
  // 1. State Tanımlamaları
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0); 
  const [totalCommission, setTotalCommission] = useState(0); 

  // 2. Yardımcı Fonksiyonlar
  const formatCurrency = (value) => {
    const numericValue = Number(value).toFixed(2); // 2 ondalık basamak
    const [integerPart, decimalPart] = numericValue.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedInteger},${decimalPart}`;
  };

  // 3. useEffect (Yan Etkiler)
  useEffect(() => {
    const userSalesData = localStorage.getItem("userSalesData");
    if (userSalesData) {
      const salesArray = JSON.parse(userSalesData);
      let totalSalesAmount = 0;
      let totalProfitAmount = 0;
      let totalCommissionAmount = 0;

      salesArray.forEach((user) => {
        user.salesRecords.forEach((record) => {
          totalSalesAmount += record.sales;
          totalProfitAmount += record.profit;
          totalCommissionAmount += record.commission;
        });
      });

      setTotalSales(totalSalesAmount);
      setTotalProfit(totalProfitAmount);
      setTotalCommission(totalCommissionAmount);
    }
  }, []);

  // 4. Render
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center gap-4 flex-column my-3">
      <div className="d-flex container-fluid justify-content-center w-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="">
            <div className="card d-flex p-sm-4 p-4 p-xl-3 p-xxl-4 justify-content-center bg-primary rounded-4 border-tertiary">
              <div className="card-body container-fluid shadow-custom rounded-4 p-sm-3 p-xl-4 p-md-3 p-lg-3">
                <h2 className="card-title text-primary text-center">
                  <span className="text-tertiary fw-bold">PAY</span>'a
                  Hoşgeldiniz <PiHandHeartDuotone className="text-tertiary" />
                </h2>
                <hr className="text-tertiary" />
                <div className="d-flex flex-column mt-4">
                  <h5 className="mt-1 tracking-wide text-primary fw-bold letter-spacing-1 text-center">
                    <span className="text-tertiary">PAY</span> ile tüm komisyon
                    işlemleriniz kontrol altında{" "}
                    <HiOutlineRocketLaunch
                      className="text-tertiary"
                      size={"28"}
                    />
                  </h5>
                  <div className="mt-3">
                    <p className="card-subtitle text-center text-primary lh-lg">
                      <span className="fw-bold">
                        Komisyon Yönetimini Kolaylaştırın!
                      </span>{" "}
                      <br />
                      <span className="text-tertiary">PAY</span>, KOBİ’ler için
                      geliştirilmiş kullanıcı dostu bir komisyon yönetim
                      uygulamasıdır.
                      <br />
                      Komisyon kayıtlarınızı kolayca oluşturun, düzenleyin ve
                      takip edin. İş ortaklarınızla yaptığınız anlaşmaları tek
                      bir platformda yönetin, süreçlerinizi daha şeffaf ve
                      verimli hale getirin. <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex container-fluid justify-content-center w-100">
        <div className="container-fluid justify-content-center align-items-center">
          <div className="card d-flex p-sm-4 p-4 p-xl-3 p-xxl-4 justify-content-center bg-primary rounded-4 border-tertiary">
            <div className="container-fluid">
              <div className="card bg-primary rounded-4 shadow-custom">
                <div className="card-body container-fluid p-sm-3 p-xl-4 p-md-3 p-lg-3">
                  <div className="d-flex align-items-center flex-column justify-content-center">
                    <h3 className="card-title text-primary fw-bold">
                      Komisyonlarım
                    </h3>
                    <hr className="w-25 text-tertiary" />
                  </div>
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-bold">
                        <MdOutlineProductionQuantityLimits
                          className="text-tertiary me-2"
                          size={"22"}
                        />
                        Toplam Satış Adedi :
                      </h4>
                    </div>
                    <div className="d-flex align-items-center">
                      <h3>{totalSales}</h3>
                      <FaChartLine
                        size={"20"}
                        className="text-tertiary mb-2 ms-2"
                      />
                    </div>
                  </div>
                  <hr className="text-primary" />
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-bold">
                        <FcSalesPerformance
                          className="text-tertiary me-2"
                          size={"22"}
                        />
                        Toplam Satış :
                      </h4>
                    </div>
                    <div className="d-flex align-items-center">
                      <h3>{formatCurrency(totalProfit)}</h3>
                      <FaTurkishLiraSign
                        size={"20"}
                        className="text-tertiary mb-2 ms-1"
                      />
                    </div>
                  </div>
                  <hr className="text-primary" />
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <h4 className="fw-bold">
                      <GiPayMoney className="text-tertiary me-2" size={"22"} />
                      Toplam Komisyon Maliyeti :
                    </h4>
                    <div className="d-flex align-items-center">
                      <h3>{formatCurrency(totalCommission)}</h3>
                      <FaTurkishLiraSign
                        size={"20"}
                        className="text-tertiary mb-2 ms-1"
                      />
                    </div>
                  </div>
                  <hr className="text-primary" />
                  <div className="container text-primary d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-bold">
                        <GiReceiveMoney
                          className="text-tertiary me-2"
                          size={"22"}
                        />
                        Toplam Kazanç :
                      </h4>
                    </div>
                    <div className="d-flex align-items-center">
                      <h3>{formatCurrency(totalProfit - totalCommission)}</h3>
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
    </div>
  );
};

export default Dashboard;
