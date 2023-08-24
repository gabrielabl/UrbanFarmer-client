import AuthHeader from "../AuthHeader/AuthHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ loginVar, setLoginVar, baseURL }) => {
  //Variables
  let navigate = useNavigate();
  const { emailLogin, passwordLogin } = loginVar;

//HANDLES ON HANDLE
  const handleOnChangeLogin = (event) => {
    const value = event.target.value;
    const nameForm = event.target.name;

    setLoginVar({
      ...loginVar,
      [nameForm]: value,
    });
  };

  //LOGIN UP HANDLE
  const loginHandleSubmit = (event) => {
    event.preventDefault();

    console.log(loginVar);
    axios
      .post(`${baseURL}/login`, loginVar)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('JWTtoken', res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <>
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />

      <form onSubmit={loginHandleSubmit}>
        <h2>WELCOME</h2>
        <label name="emailLogin">EMAIL</label>
        <input
          name="emailLogin"
          type="text"
          onChange={handleOnChangeLogin}
        ></input>
        <label name="passwordLogin">PASSWORD</label>
        <input
          name="passwordLogin"
          type="text"
          onChange={handleOnChangeLogin}
        ></input>
        <button type="submit">START</button>
      </form>
    </>
  );
};

export default Login;
