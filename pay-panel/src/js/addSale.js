// // ../js/addSale.js

// // 1. Yardımcı Fonksiyon
// const parseFormattedNumber = (value) => {
//   return parseInt(value.replace(/\./g, ""), 10) || 0;
// };

// // 2. Ana Fonksiyon
// export function addSale(saleData) {
//   // Giriş verilerini al
//   const { personTel, personName, productName, salesAmount } = saleData;
//   const sales = parseFormattedNumber(salesAmount); // String'den sayıya çevir

//   const comGroupData = localStorage.getItem("comGroup");

//   // 3. Doğrulama
//   if (!sales || !productName || !personTel || !comGroupData || !personName) {
//     return { success: false, message: "Tüm alanlar doldurulmalı!" };
//   }

//   const comGroup = JSON.parse(comGroupData);

//   // 4. Ürün Bulma
//   const selectedProduct = comGroup.find(
//     (product) => product.productName === productName
//   );

//   if (!selectedProduct) {
//     return { success: false, message: "Seçilen ürün bulunamadı!" };
//   }

//   // 5. Hesaplamalar
//   const productPrice =
//     typeof selectedProduct.productPrice === "string"
//       ? parseFormattedNumber(selectedProduct.productPrice)
//       : selectedProduct.productPrice;
//   const comPercentage = selectedProduct.comPercentage;
//   const totalSalesAmount = sales * productPrice;
//   const commission = (totalSalesAmount * comPercentage) / 100;
//   const profit = totalSalesAmount - commission;

//   console.log("Toplam Satış Tutarı: ", totalSalesAmount);
//   console.log("Komisyon Tutarı: ", commission);
//   console.log("Kâr: ", profit);

//   // 6. Kullanıcı Verisi Güncelleme
//   let userSalesData = localStorage.getItem("userSalesData");
//   let userSalesArray = userSalesData ? JSON.parse(userSalesData) : [];

//   // Satıcıyı bul
//   let user = userSalesArray.find((u) => u.personTel === personTel);

//   // Yeni satış kaydı oluştur
//   const saleRecord = {
//     productName,
//     sales,
//     commission,
//     profit,
//     comPercentage, // Güncellemeler için gerekli
//   };

//   if (user) {
//     // Eğer satıcı varsa, yeni bir satış kaydı ekle
//     user.salesRecords.push(saleRecord);
//   } else {
//     // Yeni satıcıysa, salesRecords dizisiyle birlikte ekle
//     userSalesArray.push({
//       personTel,
//       personName, // İsim artık ekleniyor
//       salesRecords: [saleRecord],
//     });
//   }

//   // 7. Veriyi Kaydet
//   localStorage.setItem("userSalesData", JSON.stringify(userSalesArray));

//   // Toplam satışları hesapla ve güncelle
//   const totalSales = userSalesArray.reduce(
//     (sum, u) => sum + u.salesRecords.reduce((s, r) => s + r.sales, 0),
//     0
//   );
//   localStorage.setItem("totalSales", totalSales.toString());

//   // 8. Sonuç
//   return { success: true, message: "Satış başarıyla eklendi!" };
// }

// ../js/addSale.js

// ../js/addSale.js

const parseFormattedNumber = (value) => {
  return parseInt(value.replace(/\./g, ""), 10) || 0;
};

export function addSale(saleData) {
  const { personTel, personName, productName, salesAmount } = saleData;
  const sales = parseFormattedNumber(salesAmount);

  const comGroupData = localStorage.getItem("comGroup");

  if (!sales || !productName || !personTel || !comGroupData || !personName) {
    return { success: false, message: "Tüm alanlar doldurulmalı!" };
  }

  const comGroup = JSON.parse(comGroupData);
  const selectedProduct = comGroup.find(
    (product) => product.productName === productName
  );

  if (!selectedProduct) {
    return { success: false, message: "Seçilen ürün bulunamadı!" };
  }

  const productPrice =
    typeof selectedProduct.productPrice === "string"
      ? parseFormattedNumber(selectedProduct.productPrice)
      : selectedProduct.productPrice;
  const comPercentage = selectedProduct.comPercentage;
  const totalSalesAmount = sales * productPrice;
  const commission = (totalSalesAmount * comPercentage) / 100;
  const profit = totalSalesAmount - commission;

  console.log("Toplam Satış Tutarı: ", totalSalesAmount);
  console.log("Komisyon Tutarı: ", commission);
  console.log("Kâr: ", profit);

  let userSalesData = localStorage.getItem("userSalesData");
  let userSalesArray = userSalesData ? JSON.parse(userSalesData) : [];

  let user = userSalesArray.find((u) => u.personTel === personTel);

  if (user) {
    // Aynı ürünü bul
    const existingRecord = user.salesRecords.find(
      (record) => record.productName === productName
    );
    if (existingRecord) {
      // Mevcut kaydı güncelle
      existingRecord.sales += sales;
      existingRecord.commission += commission;
      existingRecord.profit += profit;
    } else {
      // Yeni ürünse ekle
      user.salesRecords.push({
        productName,
        sales,
        commission,
        profit,
        comPercentage,
        productPrice,
      });
    }
  } else {
    // Yeni kullanıcıysa ekle
    userSalesArray.push({
      personTel,
      personName,
      salesRecords: [
        {
          productName,
          sales,
          commission,
          profit,
          comPercentage,
          productPrice,
        },
      ],
    });
  }

  localStorage.setItem("userSalesData", JSON.stringify(userSalesArray));
  const totalSales = userSalesArray.reduce(
    (sum, u) => sum + u.salesRecords.reduce((s, r) => s + r.sales, 0),
    0
  );
  localStorage.setItem("totalSales", totalSales.toString());

  return { success: true, message: "Satış başarıyla eklendi!" };
}
