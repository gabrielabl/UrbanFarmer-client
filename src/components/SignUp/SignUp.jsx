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
      return false;
    };
    if (isEmailDB.length === 0) {
      return false;
    };
    return true;
  };

  const isFieldEmpty = ()=>{
    if(!user_name || !email || !password || !confirmPassword){
      return false
    };
    return true;
  };

  const passwordConfirm = ()=>{
    if(password !== confirmPassword){
      return false
    };
    return true;
  }

  const isFormValid = ()=>{
    if(!isEmailValid()){
      return false;
    };
    if(!isFieldEmpty()){
      return false;
    };
    if(!passwordConfirm()){
      return false;
    };
    return true;
  }
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
          ></input>
        </label>

        <label name="email">
          EMAIL{" "}
          <input
            name="email"
            type="text"
            onChange={handleOnChangeSignUp}
          ></input>
        </label>
        <label name="password">
          PASSWORD
          <input
            name="password"
            type="text"
            onChange={handleOnChangeSignUp}
          ></input>
        </label>

        <label name="confirmPassword">
          CONFIRM PASSWORD{" "}
          <input
            name="confirmPassword"
            type="text"
            onChange={handleOnChangeSignUp}
          ></input>
        </label>

        <button type="submit">START</button>
      </form>
    </>
  );
};

export default SignUp;
