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

  useEffect(() => {
    //Check DB for email
    axios
      .post(`${baseURL}/emailcheck`, { email: email })
      .then((res) => {
        console.log(res);
        setIsEmailDB(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  //FORM VALIDATION
  const isEmailValid = () => {
    if (!email.includes("@")) {
      return false;
    }
    if (isEmailDB.length === 0) {
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

  //SIGN UP HANDLE
  const signUpHandleSubmit = (event) => {
    event.preventDefault();

    console.log(email);

    if (isEmailValid()) {
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
        <label name="user_name">NAME</label>
        <input
          name="user_name"
          type="text"
          onChange={handleOnChangeSignUp}
        ></input>
        <label name="email">EMAIL</label>
        <input name="email" type="text" onChange={handleOnChangeSignUp}></input>
        <label name="password">PASSWORD</label>
        <input
          name="password"
          type="text"
          onChange={handleOnChangeSignUp}
        ></input>
        <label name="confirmPassword">CONFIRM PASSWORD</label>
        <input
          name="confirmPassword"
          type="text"
          onChange={handleOnChangeSignUp}
        ></input>
        <button type="submit">START</button>
      </form>
    </>
  );
};

export default SignUp;
