import React from "react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiHandHeartDuotone } from "react-icons/pi";



function Homepage() {
  return (
    <div className="d-flex" style={{height:"100%"}}>
      <div className="container d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="card d-flex p-sm-1 p-xl-5 p-md-2 p-lg-2 justify-content-center bg-primary rounded-2 border-tertiary col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
            <div className="card-body rounded-4 p-sm-3 p-xl-5 p-md-3 p-lg-3">
              <h1 className="card-title text-primary text-start">
                <span className="text-tertiary fw-bold">PAY</span>'a Hoşgeldiniz <PiHandHeartDuotone className="text-tertiary"/>
              </h1>
              <hr className="text-tertiary" />
              <div className="d-flex flex-column mt-5">
                <h4 className="mt-2 tracking-wide text-primary fw-bold letter-spacing-1 ">
                  <span className="text-tertiary">PAY</span> ile tüm komisyon
                  işlemleriniz kontrol altında <HiOutlineRocketLaunch className="text-tertiary" size={"28"}/>
                </h4>
                <div className="mt-3">
                  <h5 className="card-subtitle text-primary fw-bold lh-lg mt-2">
                    Komisyon Yönetimini Kolaylaştırın! <br />
                    <span className="text-tertiary">PAY</span>, KOBİ’ler
                    için geliştirilmiş kullanıcı dostu bir komisyon yönetim
                    uygulamasıdır.
                    <br />
                    Komisyon kayıtlarınızı kolayca oluşturun, düzenleyin ve
                    takip edin. İş ortaklarınızla yaptığınız anlaşmaları tek bir
                    platformda yönetin, süreçlerinizi daha şeffaf ve verimli
                    hale getirin. <br />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
