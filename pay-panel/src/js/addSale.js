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
