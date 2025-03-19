import React, { useState } from "react";
import axios from "axios";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router";

function Login({ setIsAuthenticated }) {
  const [name, setName] = useState();
  const [password] = useState();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let requestBody = {
      service_val_name: name,
      service_val_password: password,
    };
    const response = await axios.post(
      "https://www.mockachino.com/1b9b9eca-13b9-41/login",
      requestBody
    );
    if (response.data.result == "success") {
      localStorage.setItem("userName", name);
      setIsAuthenticated(true);
      return navigate("/Dashboard");
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 justify-content-center">
        <div
          className="card border-tertiary bg-primary shadow-custom-3 p-5 col-xl-4 col-xxl-3 col-lg-6 col-md-8 col-sm-2"
          style={{ maxWidth: "400px", minWidth: "300px" }}
        >
          <div className="my-4">
            <img
              src="/paylogoyeni.svg"
              alt=""
              className="card-img-top"
              style={({ width: "150px" }, { height: "150px" })}
            />
          </div>
          <div className="d-flex justify-content-center my-2">
            <hr className="text-tertiary w-75" />
          </div>
          <div className="card-body w-100">
            <div className="d-flex align-items-center">
              <h3 className="card-title text-primary mb-3">Giriş Yap</h3>
            </div>
            <form>
              <div className="mb-3 d-flex w-100 flex-column">
                <label
                  htmlFor="usernameLabel"
                  className="form-label text-primary"
                >
                  Kullanıcı Adınız
                </label>
                <div className="d-flex justify-content-center">
                  <input
                    type="text"
                    className="form-control "
                    id="exampleUname"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 d-flex w-100 flex-column">
                <label
                  htmlFor="passwordLabel"
                  className="form-label text-primary"
                >
                  Parolanız
                </label>
                <div className="d-flex justify-content-center mb-2">
                  <input
                    type="password"
                    className="form-control "
                    id="passwordExample"
                  />
                </div>
              </div>
            </form>
            <div className="mb-3">
              <button
                className="btn btn-outline-quaternary"
                onClick={handleLogin}
              >
                Giriş Yap <IoIosLogIn className="text-tertiary" size={"20"} />
              </button>
            </div>

            <div className="text-primary" style={{ fontSize: "14px" }}>
              <sub>
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
