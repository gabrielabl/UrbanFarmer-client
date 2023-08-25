import AuthHeader from "../AuthHeader/AuthHeader";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ loginVar, setLoginVar, baseURL }) => {
  //Variables
  let navigate = useNavigate();
  const { emailLogin, passwordLogin } = loginVar;

  const [placeholder, setPlaceholder] = useState({
    emailPlaceholder: "Include your email here",
    passwordPlaceholder: "Include your password here",
  });

  const { emailPlaceholder, passwordPlaceholder } = placeholder;

  //HANDLES ON HANDLE
  const handleOnChangeLogin = (event) => {
    const value = event.target.value;
    const nameForm = event.target.name;
    setLoginVar({
      ...loginVar,
      [nameForm]: value,
    });
  };

  const failedRequest = () => {
    setLoginVar({ emailLogin: "", passwordLogin: "" });
    setPlaceholder({
      emailPlaceholder: "Invalid email",
      passwordPlaceholder: "Invalid password",
    });
  };

  //LOGIN UP HANDLE
  const loginHandleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${baseURL}/login`, loginVar)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("JWTtoken", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);

        return failedRequest();
      });
  };

  return (
    <>
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />

      <form onSubmit={loginHandleSubmit}>
        <h2>WELCOME</h2>
        <label name="emailLogin">
          EMAIL
          <input
            name="emailLogin"
            type="text"
            onChange={handleOnChangeLogin}
            placeholder={emailPlaceholder}
            value={emailLogin}
          ></input>
        </label>

        <label name="passwordLogin">
          PASSWORD{" "}
          <input
            name="passwordLogin"
            type="text"
            onChange={handleOnChangeLogin}
            placeholder={passwordPlaceholder}
            value={passwordLogin}
          ></input>
        </label>

        <button type="submit">START</button>
      </form>
    </>
  );
};

export default Login;
