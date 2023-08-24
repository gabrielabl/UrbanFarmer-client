import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import StartPage from "./pages/StartPage/StartPage";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

function App() {
  //Variables
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

//FORM VARIABLE STATES
const [signUpVar, setSignUpVar] = useState({
  user_name:"",
  email:"",
  password:"",
  });
  

  const [loginVar, setLoginVar] = useState({
  emailLogin:"",
  passwordLogin:"",
  });
  


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartPage baseURL={baseURL}/>}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/signup" element={<SignUp signUpVar={signUpVar} setSignUpVar={setSignUpVar} baseURL={baseURL} />}></Route>
          <Route path="/login" element={<Login loginVar={loginVar} setLoginVar={setLoginVar} baseURL={baseURL}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
