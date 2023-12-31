import ButtonAuth from "../ButtonAuth/ButtonAuth";
import "./Login.scss";
import AuthHeader from "../AuthHeader/AuthHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundPattern from "../../Assets/images/start-page-pattern.svg";

const Login = ({ loginVar, setLoginVar, baseURL, setBackground }) => {
  //VARIABLES
  let navigate = useNavigate();
  const { emailLogin, passwordLogin } = loginVar;

  //FORM PLACEHOLDER AND ERROR STATE
  const [placeholder, setPlaceholder] = useState({
    emailPlaceholder: "YOUR EMAIL",
    passwordPlaceholder: "YOUR PASSWORD",
  });
  const { emailPlaceholder, passwordPlaceholder } = placeholder;
  const [errorStateForm, setErrorStateForm] = useState(false);

  //BACKGROUND USE EFFECT TO CHANGE THE WHOLE PAGE BACKGROUND
  useEffect(() => {
    setBackground({
      backgroundImage: `url(${BackgroundPattern})`,
      backgroundSize: "40px",
    });
  }, [setBackground]);

  //HANDLE ON CHANGE LOGIN
  const handleOnChangeLogin = (event) => {
    const value = event.target.value;
    const nameForm = event.target.name;
    setLoginVar({
      ...loginVar,
      [nameForm]: value,
    });
  };

  //HANDLE TO SET ERROR STATE ON FORM
  const failedRequest = () => {
    setLoginVar({ emailLogin: "", passwordLogin: "" });
    setPlaceholder({
      emailPlaceholder: "INVALID EMAIL",
      passwordPlaceholder: "INVALID PASSWORD",
    });
    setErrorStateForm(true);
  };

  //LOGIN HANDLE SUBMIT
  const loginHandleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${baseURL}/login`, loginVar)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        return failedRequest();
      });
  };

  return (
    <>
      {/* HEADER */}
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />
      <main className="login-page__main">
        {/* LOGIN FORM */}
        <form className="login-page__container" onSubmit={loginHandleSubmit}>
          <h2>WELCOME</h2>
          <input
            className={`login-page__input ${
              errorStateForm ? "login-page__input--error-state" : ""
            }`}
            id="emailLogin"
            name="emailLogin"
            type="text"
            onChange={handleOnChangeLogin}
            placeholder={emailPlaceholder}
            value={emailLogin}
          ></input>

          <input
            className={`login-page__input ${
              errorStateForm ? "login-page__input--error-state" : ""
            }`}
            id="passwordLogin"
            name="passwordLogin"
            type="password"
            onChange={handleOnChangeLogin}
            placeholder={passwordPlaceholder}
            value={passwordLogin}
          ></input>

          <ButtonAuth />
        </form>
      </main>
    </>
  );
};

export default Login;
