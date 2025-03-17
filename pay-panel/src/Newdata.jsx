import React from "react";

// function autoComma(_obj) {
//     var num = getNumber(_obj.val());
//     if (num == 0) {
//       _obj.val("");
//     } else {
//       _obj.val(num.toLocaleString());
//     }
//   }
//   function getNumber(_str) {
//     var arr = _str.split("");
//     var out = new Array();
//     for (var cnt = 0; cnt < arr.length; cnt++) {
//       if (isNaN(arr[cnt]) == false) {
//         out.push(arr[cnt]);
//       }
//     }
//     return Number(out.join(""));
//   }
//   $(document).ready(function () {
//     $("rawPrice").on("keyup", function () {
//       autoComma($(this));
//     });
//   });

function Newdata() {

  return (
    <div className="container my-5 d-flex gap-5">
      <div className="col col-lg-5">
        <div className="card bg-primary p-xl-3">
          <div className="card-body">
            <div className="card-text text-quaternary text-center text-primary mb-3">
              Yeni Komisyon Grubu
            </div>
            <div className="container-fluid bg-primary w-100 h-100 shadow-custom text-primary">
              <form action="" className="p-xl-3">
                <div id="groupNameDiv" className="mb-3">
                  <label htmlFor="" className="form-label">
                    Grup İsmi:
                  </label>
                  <input
                    id="grupName"
                    name="grupName"
                    type="text"
                    className="form-control"
                    maxLength={"30"}
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
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-lg-5">
        <div className="card bg-quaternary">
          <div className="card-body">
            <div className="card-text text-quaternary text-center">
              Komisyonlarım
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newdata;
