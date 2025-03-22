# TR - Turkish

# PAY - Komisyon Yönetim Paneli

**Komisyon Yönetimini Kolaylaştırın!**  
**PAY**, KOBİ’ler için geliştirilmiş kullanıcı dostu bir komisyon yönetim uygulamasıdır.

Bu proje ile iş ortaklarınızla yaptığınız komisyon anlaşmalarını kolayca takip edebilirsiniz. Komisyon kayıtlarını hızlıca oluşturun, düzenleyin ve yönetin. Süreçlerinizi daha şeffaf ve verimli hale getirin. <br ><br >

## Özellikler
✅ **Komisyon Yönetimi**: Satış bazlı komisyonları kolayca hesaplayın.  
✅ **Kullanıcı Dostu Arayüz**: Hızlı erişim için basit ve sezgisel bir panel.  
✅ **Veri Depolama**: Satış bilgileri `localStorage` kullanılarak saklanır.  
✅ **Ürün Bazlı Kayıtlar**: Komisyonları grup yerine ürün isimlerine göre takip edin.  
✅ **Bootstrap Entegrasyonu**: **Bootstrap 5.3.3** ile modern ve şık tasarım.

## Canlı Demo
Projeyi aşağıdaki bağlantıdan canlı olarak inceleyebilirsiniz:  
🔗 **[Canlı Demo](https://velitahaboyar.github.io/pay-app/)**

## Kullanılan Teknolojiler
- **React** - 
- **Bootstrap 5.3.3** - 
- **Vite** - 

## Dosya Yapısı
```
pay-app/
│── public/                 # Statik dosyalar (favicon, logo vb.)
│── src/
│   ├── components/         # Bileşenler (Sidebar, Header vb.)
│   ├── css/                # Stil dosyaları (Bootstrap ve özel CSS dosyaları)
│   ├── js/                 # JavaScript yardımcı dosyaları
│   ├── pages/              # Sayfa bileşenleri (Dashboard, Login, Tables vb.)
│   ├── App.js              # Ana uygulama bileşeni
│   ├── main.js             # React uygulama giriş noktası
│── index.html              # Uygulama giriş dosyası
│── package.json            # Proje bağımlılıkları ve komut dosyaları
│── vite.config.js          # Vite yapılandırma dosyası
```

## Lisans
Bu proje **MIT Lisansı** altında lisanslanmıştır.

---

## Önemli Notlar: 

## 1- Bu proje yalnızca bir frontend uygulamasıdır ve herhangi bir backend veya kimlik doğrulama (authentication) içermemektedir. Veriler geçici olarak localStorage içinde saklanmaktadır. Kullanıcı yönetimi veya yetkilendirme gibi özellikler mevcut değildir. <br /> <br />
2- Projede bir authentication bulunmamaktadır. Bir dummy HTTP request ve kullanıcı adı inputunun bir değere sahip olup olmadığı konuyu pekiştirme amacıyla kullanılmıştır. <br /> <br />
3- "Satış Ekle" kısmındaki veriler GET & POST metodlarını pekiştirmek amacıyla dummy API servisinden gelmektedir. <br /> <br />
4- API'den gelen ve satış ekledikten sonra son kullanıcının eliyle eklediği veriler localStorage'a kaydolur. Dashboard'da ve "Komisyonları Görüntüle" sayfasında görünen ve dinamik olarak değiştirilebilen bu veriler tamamen localStorage üzerinden işlenir. <br />

---

# EN - English

# PAY - Commission Management Panel

**Simplify Your Commission Management!**  
**PAY** is a user-friendly commission management application designed for SMEs.

With this project, you can easily track commission agreements with your business partners. Quickly create, edit, and manage commission records. Make your processes more transparent and efficient.

## Features
✅ **Commission Management**: Easily calculate sales-based commissions.  
✅ **User-Friendly Interface**: Simple and intuitive panel for quick access.  
✅ **Data Storage**: Sales information is stored using `localStorage`.  
✅ **Product-Based Records**: Track commissions based on product names instead of groups.  
✅ **Bootstrap Integration**: Clean and modern design with **Bootstrap 5.3.3**.

## Live Demo
You can access the live version of the project via the following link:  
🔗 **[Live Demo](https://velitahaboyar.github.io/pay-app/)**

## Technologies Used
- **React** - For building the user interface
- **Bootstrap 5.3.3** - For responsive and stylish design
- **Vite** - For a fast development environment

## File Structure
```
pay-app/
│── public/                 # Static files (favicon, logo, etc.)
│── src/
│   ├── components/         # Components (Sidebar, Header, etc.)
│   ├── css/                # Styles (Bootstrap and custom CSS files)
│   ├── js/                 # JavaScript helper files
│   ├── pages/              # Page components (Dashboard, Login, Tables, etc.)
│   ├── App.js              # Main application component
│   ├── main.js             # React application entry point
│── index.html              # Application entry file
│── package.json            # Project dependencies and scripts
│── vite.config.js          # Vite configuration file
```

## License
This project is licensed under the **MIT License**.


---

## Important Notes:

## 1- This project is only a frontend application and does not include any backend or authentication. Data is temporarily stored in localStorage. Features such as user management or authorization are not available. <br /> <br />
2- There is no authentication in the project. A dummy HTTP request and whether the username input has a value or not are used to reinforce the issue. <br /> <br />
3- The data in the "Satış Ekle" section comes from the dummy API service to reinforce the GET & POST methods. <br /> <br />
4- The data coming from the API and added by the end user after adding a sale is saved to localStorage. This data, which appears on the Dashboard and "Komisyonları Görüntüle" page and can be changed dynamically, is processed entirely through localStorage. <br />

---

