import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";
import { useEffect, useState } from "react";

const SignUp = ({ signUpVar, setSignUpVar, baseURL }) => {
  // Variables
  let navigate = useNavigate();
  const { user_name, email, password } = signUpVar;

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailDB, setIsEmailDB] = useState("");

  const [placeholder, setPlaceholder] = useState({
    namePlaceholder: "Include your name here",
    emailPlaceholder: "Include your email here",
    passwordPlaceholder: "Add a password with at least 8 characters",
    confirmPasswordPlaceholder: "Make sure it matches your password",
  });

  const {
    namePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
  } = placeholder;

  useEffect(() => {
    //Check DB for email, to keep DB clean
    axios
      .post(`${baseURL}/emailcheck`, { email: email })
      .then((res) => {
        // console.log(res);
        setIsEmailDB(res.status);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [email]);

  //FORM VALIDATION
  const isEmailValid = () => {
    if (!email.includes("@")) {
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "This email is not valid",
      });
      setSignUpVar({ ...signUpVar, email: "" });
      return false;
    }
    if (isEmailDB.length === 0) {
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "This email is already used",
      });
      setSignUpVar({ ...signUpVar, email: "" });
      return false;
    }
    return true;
  };

  const isFieldEmpty = () => {
    if (!user_name) {
      setPlaceholder({
        ...placeholder,
        namePlaceholder: "Make sure to add your name in this field",
      });
      return false;
    }
    if (!email) {
      setPlaceholder({
        ...placeholder,
        emailPlaceholder: "Make sure to add your email in this field",
      });
      return false;
    }
    if (!password) {
      setPlaceholder({
        ...placeholder,
        passwordPlaceholder: "Make sure to add your password in this field",
      });
      return false;
    }
    if (!confirmPassword) {
      setPlaceholder({
        ...placeholder,
        confirmPasswordPlaceholder:
          "Make sure to add your password in this field",
      });
      return false;
    }
    return true;
  };

  const passwordConfirm = () => {
    if (password !== confirmPassword) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (!isFieldEmpty()) {
      console.log("field empy");
      return false;
    }
    if (!isEmailValid()) {
      console.log("email empy");
      return false;
    }
    if (!passwordConfirm()) {
      console.log("password empy");
      return false;
    }
    return true;
  };
  //HANDLE CHANGE
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
  };

  //SIGN UP SUBMIT HANDLE
  const signUpHandleSubmit = (event) => {
    event.preventDefault();

    console.log(email);

    if (isFormValid()) {
      console.log("yay");
      axios
        .post(`${baseURL}/signup`, signUpVar)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/login");
    } else {
      console.log("nope");
    }
  };

  return (
    <>
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />

      <form onSubmit={signUpHandleSubmit}>
        <h2>SIGN UP</h2>
        <label name="user_name">
          NAME{" "}
          <input
            name="user_name"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={namePlaceholder}
          ></input>
        </label>

        <label name="email">
          EMAIL{" "}
          <input
            name="email"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={emailPlaceholder}
            value={email}
          ></input>
        </label>
        <label name="password">
          PASSWORD
          <input
            name="password"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={passwordPlaceholder}
          ></input>
        </label>

        <label name="confirmPassword">
          CONFIRM PASSWORD{" "}
          <input
            name="confirmPassword"
            type="text"
            onChange={handleOnChangeSignUp}
            placeholder={confirmPasswordPlaceholder}
          ></input>
        </label>

        <button type="submit">START</button>
      </form>
    </>
  );
};

export default SignUp;
