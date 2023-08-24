import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";

const SignUp = ({ signUpVar, setSignUpVar, baseURL }) => {
  let navigate = useNavigate();

  const { user_name, email, password } = signUpVar;

  //HANDLE CHANGE
  const handleOnChangeSignUp = (event) => {
    const value = event.target.value;
    const nameForm = event.target.name;

    setSignUpVar({
      ...signUpVar,
      [nameForm]: value,
    });
  };

  //SIGN UP HANDLE
  const signUpHandleSubmit = (event) => {
    event.preventDefault();

    console.log(signUpVar);
    axios
      .post(`${baseURL}/signup`, signUpVar)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
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
        <input name="confirmPassword" type="text"></input>
        <button type="submit">START</button>
      </form>
    </>
  );
};

export default SignUp;
