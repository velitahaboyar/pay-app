import React, { useState } from "react";
import axios from "axios";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [name, setName] = useState("");
  const [password] = useState("");
  const navigate = useNavigate();

  // Notify fonksiyonları
  const notifyWarn = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleLogin = async () => {
    if (!name) {
      notifyWarn("Kullanıcı adı boş olamaz!");
      return;
    }

    let requestBody = {
      service_val_name: name,
      service_val_password: password,
    };

    try {
      const response = await axios.post(
        "https://www.mockachino.com/1b9b9eca-13b9-41/login",
        requestBody
      );
      console.log("API Yanıtı:", response.data);

      if (response.data.result === "success") {
        localStorage.setItem("userName", name);

        toast.success("Giriş başarılı, Yönlendiriliyorsunuz!", {
          position: "top-right",
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });

        // Notify göründükten sonra yönlendirme için gecikme
        setTimeout(() => {
          navigate("/App/Dashboard");
        }, 2200); 
      } else {
        navigate("/");
      }
    } catch {
      notifyError("Bir hata oluştu!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
      <ToastContainer />
      <div className="row w-100 justify-content-center">
        <div className="card border-tertiary bg-primary shadow-custom-3 col-xl-4 col-xxl-3 col-lg-6 col-md-8 col-sm-10 col-11 p-4 p-md-5">
          <div className="my-4 text-center">
            <img
              src="/paylogoyeni.svg"
              alt="PAY Logo"
              className="card-img-top logo-img"
              style={{ width: "250px", height: "150px" }}
            />
          </div>
          <div className="d-flex justify-content-center my-2">
            <hr className="text-tertiary w-75" />
          </div>
          <div className="card-body w-100">
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="card-title text-primary mb-3">Giriş Yap</h3>
            </div>
            <form>
              <div className="mb-3">
                <label
                  htmlFor="usernameLabel"
                  className="form-label text-primary"
                >
                  Kullanıcı Adınız
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleUname"
                  name="username"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="passwordLabel"
                  className="form-label text-primary"
                >
                  Parolanız
                </label>
                <input
                  type="password"
                  name="passwd"
                  className="form-control"
                  id="passwordExample"
                  autoComplete="off"
                />
              </div>
            </form>
            <div className="mt-4 mb-2 text-center">
              <button
                className="btn btn-outline-quaternary w-100"
                onClick={handleLogin}
              >
                Giriş Yap <IoIosLogIn className="text-tertiary" size={"20"} />
              </button>
            </div>
            <div
              className="text-primary text-center"
              style={{ fontSize: "14px" }}
            >
              <sub className="text-tertiary">
                *Kullanıcı adı ve parolanız için sipariş bilgilerinizi içeren
                mail'e gözatınız.
              </sub>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
