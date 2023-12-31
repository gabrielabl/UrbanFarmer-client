import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";
import { useEffect, useState } from "react";
import ButtonAuth from "../ButtonAuth/ButtonAuth";
import BackgroundPattern from "../../Assets/images/start-page-pattern.svg";

const SignUp = ({ signUpVar, setSignUpVar, baseURL, setBackground }) => {
  // VARIABLES
  let navigate = useNavigate();
  const { user_name, email, password } = signUpVar;

  // VALIDATION
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailDB, setIsEmailDB] = useState("");

  //FORM PLACEHOLDERS
  const [placeholder, setPlaceholder] = useState({
    namePlaceholder: "YOUR NAME",
    emailPlaceholder: "YOUR EMAIL",
    passwordPlaceholder: "PASSWORD WITH AT LEAST 8 CHAR",
    confirmPasswordPlaceholder: "TYPE PASSWORD AGAIN",
  });
  const {
    namePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
  } = placeholder;

  //BACKGROUND USE EFFECT - TO SET THE WHOLE BAACKGROUND PAGE
  useEffect(() => {
    setBackground({
      backgroundImage: `url(${BackgroundPattern})`,
      backgroundSize: "40px",
    });
  }, [setBackground]);

  //FORM VALIDATION ERROR STATE
  const [errorStateForm, setErrorStateForm] = useState({
    user_name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  //CHECKS IF EMAIL IS ALREADY IN THE DATABASE
  useEffect(() => {
    axios
      .post(`${baseURL}/emailcheck`, { email: email })
      .then((res) => {
        setIsEmailDB(res.status);
      })
      .catch((err) => {
        setIsEmailDB("");
      });
  }, [email, baseURL]);

  //FORM VALIDATION

  // EMPTY FIELDS
  const isFieldEmpty = () => {
    if (!user_name) {
      setPlaceholder({
        ...placeholder,
        namePlaceholder: "YOUR NAME IN THIS FIELD",
      });
      setErrorStateForm({
        ...errorStateForm,
        user_name: true,
      });
      return false;
    }

    if (!email) {
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "YOUR EMAIL IN THIS FIELD",
      });
      setErrorStateForm({
        ...errorStateForm,
        email: true,
      });
      return false;
    }

    if (!password) {
      setPlaceholder({
        ...placeholder,
        passwordPlaceholder: "YOUR PASSWORD IN THIS FIELD",
      });
      setErrorStateForm({
        ...errorStateForm,
        password: true,
      });
      return false;
    }

    if (!confirmPassword) {
      setPlaceholder({
        ...placeholder,
        confirmPasswordPlaceholder: "ADD YOUR PASSWORD AGAIN",
      });
      setErrorStateForm({
        ...errorStateForm,
        confirmPassword: true,
      });
      return false;
    }
    return true;
  };

  // EMAIL VALIDATION
  const isEmailValid = () => {
    if (!email.includes("@")) {
      setSignUpVar({ ...signUpVar, email: "" });
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "THIS EMAIL IS NOT VALID",
      });
      setErrorStateForm({
        ...errorStateForm,
        email: true,
      });
      return false;
    }

    // THE EMAIL THAT IS FOUND WILL RETURN ZERO LENGTH WHILE NOT FOUND WILL RETURN UNDEFINED
    if (isEmailDB.length === 0) {
      setSignUpVar({ ...signUpVar, email: "" });
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "THIS EMAIL IS ALREADY USED",
      });
      setErrorStateForm({
        ...errorStateForm,
        email: true,
      });
      return false;
    }
    return true;
  };

  //PASSWORD VALIDATION
  const passwordConfirm = () => {
    if (password !== confirmPassword) {
      setPlaceholder({
        ...placeholder,
        confirmPasswordPlaceholder: "PASSWORDS DON'T MATCH",
      });
      setErrorStateForm({
        ...errorStateForm,
        password: true,
        confirmPassword: true,
      });
      setConfirmPassword("");
      return false;
    }

    if (password.length < 8) {
      setPlaceholder({
        ...placeholder,
        passwordPlaceholder: "PASSWORDS SHOULD HAVE AT LEAST 8 CHARACTERS",
      });
      setSignUpVar({ ...SignUp, password: "" });
      setErrorStateForm({
        ...errorStateForm,
        password: true,
      });
      return false;
    }
    return true;
  };

  //FINAL FORM VALIDATION
  const isFormValid = () => {
    if (!isFieldEmpty()) {
      return false;
    }
    if (!isEmailValid()) {
      return false;
    }
    if (!passwordConfirm()) {
      return false;
    }
    return true;
  };

  //HANDLE CHANGE SIGN UP
  const handleOnChangeSignUp = (event) => {
    const { value, name } = event.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setSignUpVar({
        ...signUpVar,
        [name]: value,
      });
    }
    setErrorStateForm({
      ...errorStateForm,
      [name]: false,
    });
  };

  //SIGN UP SUBMIT HANDLE
  const signUpHandleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      axios
        .post(`${baseURL}/signup`, signUpVar)
        .then((res) => {})
        .catch((err) => {});
      navigate("/login");
    } else {
    }
  };

  return (
    <>
      {/* HEADER */}
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />

      <main className="signup-page__main">
        {/* FORM */}
        <form className="signup-page__container" onSubmit={signUpHandleSubmit}>
          <h2>SIGN UP</h2>

          {/* INPUT FIELDS */}
          <input
            name="user_name"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={namePlaceholder}
            className={`signup-page__input ${
              errorStateForm.user_name ? "signup-page__input--error-state" : ""
            }`}
          ></input>

          <input
            name="email"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={emailPlaceholder}
            value={email}
            className={`signup-page__input ${
              errorStateForm.email ? "signup-page__input--error-state" : ""
            }`}
          ></input>

          <input
            name="password"
            type="password"
            onChange={handleOnChangeSignUp}
            placeholder={passwordPlaceholder}
            value={password}
            className={`signup-page__input ${
              errorStateForm.password ? "signup-page__input--error-state" : ""
            }`}
          ></input>

          <input
            name="confirmPassword"
            type="password"
            onChange={handleOnChangeSignUp}
            placeholder={confirmPasswordPlaceholder}
            value={confirmPassword}
            className={`signup-page__input ${
              errorStateForm.confirmPassword
                ? "signup-page__input--error-state"
                : ""
            }`}
          ></input>
          <ButtonAuth />
        </form>
      </main>
    </>
  );
};

export default SignUp;
