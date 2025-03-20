// ../js/addSale.js
export function addSale() {
  const sales = parseInt(document.getElementById("salesAmount").value); // satış adedini al
  const comGroupData = localStorage.getItem("comGroup"); // komisyon grubu verilerini al
  const selectedComGroup = document.getElementById("selectComGroup").value; // seçilen komisyon grubu
  const selectedUser = document.getElementById("selectComPerson").value; // seçilen kullanıcı

  if (!sales || !selectedComGroup || !selectedUser) {
    return { success: false, message: "Tüm alanlar doldurulmalı!" };
  }

  if (comGroupData) {
    const comGroup = JSON.parse(comGroupData);

    const selectedProduct = comGroup.find(
      (product) =>
        `${product.productName} | ${product.productPrice} TL | ${product.comPercentage}%` ===
        selectedComGroup
    );

    if (selectedProduct) {
      const productPrice = selectedProduct.productPrice;
      const comPercentage = selectedProduct.comPercentage;
      const totalSalesAmount = sales * productPrice;
      const commission = (totalSalesAmount * comPercentage) / 100;
      const profit = totalSalesAmount - commission;
      const productName = selectedProduct.productName;

      console.log("Toplam Satış Tutarı: ", totalSalesAmount);
      console.log("Komisyon Tutarı: ", commission);
      console.log("Kâr: ", profit);

      let userSalesData = localStorage.getItem("userSalesData");
      let userSalesArray = userSalesData ? JSON.parse(userSalesData) : [];

      const selectedUserData = userSalesArray.find(
        (user) => user.personTel === selectedUser.split(" | ")[1]
      );

      if (selectedUserData) {
        selectedUserData.sales += sales;
        selectedUserData.totalSales += sales;
        selectedUserData.commission += commission;
        selectedUserData.profit += profit;
        selectedUserData.productName = productName;
      } else {
        userSalesArray.push({
          personTel: selectedUser.split(" | ")[1],
          personName: selectedUser.split(" | ")[0],
          sales: sales,
          totalSales: sales,
          commission: commission,
          profit: profit,
          productName: productName,
        });
      }

      localStorage.setItem("userSalesData", JSON.stringify(userSalesArray));

      const previousTotalSales =
        parseInt(localStorage.getItem("totalSales")) || 0;
      const newTotalSales = previousTotalSales + sales;
      localStorage.setItem("totalSales", newTotalSales.toString());

      return { success: true, message: "Satış başarıyla eklendi!" };
    } else {
      return { success: false, message: "Seçilen ürün bulunamadı!" };
    }
  } else {
    return { success: false, message: "Komisyon grubu verisi bulunamadı!" };
  }
}
