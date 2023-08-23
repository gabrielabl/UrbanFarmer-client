import { useState } from "react";
import "./StartPage.scss";
import axios from "axios";

const StartPage = ({baseURL}) => {

//FORM VARIABLE STATES
const [signUpVar, setSignUpVar] = useState({
user_name:"",
email:"",
password:"",
});

const { user_name, email, password} = signUpVar;

const [loginVar, setloginVar] = useState({
emailLogin:"",
passwordLogin:"",
});

const { emailLogin, passwordLogin}= loginVar;

//HANDLE CHANGE
const handleOnChangeSignUp = (event)=>{
 const value = event.target.value;
 const nameForm = event.target.name;
 
setSignUpVar({
  ...signUpVar, [nameForm]: value,
});
};

const handleOnChangeLogin = (event)=>{
  const value = event.target.value;
  const nameForm = event.target.name;
  
 setloginVar({
   ...loginVar, [nameForm]:value,
 })
 }


//SUBMIT HANDLES

//SIGN UP HANDLE
const signUpHandleSubmit =(event)=>{
  event.preventDefault();

  console.log(signUpVar)
  axios
  .post(`${baseURL}/signup`,signUpVar)
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  })

  //Once form submitted, re-direct to login
  setStartPage(renderLogin)
}



//SIGN UP
const renderSignUp = <form onSubmit={signUpHandleSubmit}>
<h2>SIGN UP</h2>
<label name="user_name">NAME</label>
<input name="user_name" type="text" onChange={handleOnChangeSignUp}></input>
<label name="email">EMAIL</label>
<input name="email" type="text" onChange={handleOnChangeSignUp}></input>
<label name="password">PASSWORD</label>
<input name ='password' type="text" onChange={handleOnChangeSignUp}></input>
<label name="confirmPassword">CONFIRM PASSWORD</label>
<input name ='confirmPassword' type="text"></input>
<button type="submit">START</button>
</form>;
const handleSignUp = ()=>{
  setStartPage(renderSignUp)
};

//LOGIN
const renderLogin = <form>
  <h2>WELCOME</h2>
  <label name="emailLog">EMAIL</label>
  <input name="emailLog" type="text"></input>
  <label name="passwordLog">PASSWORD</label>
  <input name ='passwordLog' type="text"></input>
 <button type="submit">START</button>
</form>
const handleLogin = ()=>{
  setStartPage(renderLogin)
};


//START PAGE
 const renderStart = 
<section>
<h2 onClick={handleLogin}>ENTER</h2>
<p>NEW TO THE COMMUNITY?</p><span onClick={handleSignUp}>JOIN HERE.</span> 
</section>;



//State Variables
  const [startPage, setStartPage] = useState(renderStart);

  return (
    <div>
      <p>ABOUT</p>
      <div>
        <h1>LOCAL FROM YOUR NEIGHBORHOOD</h1>
      </div>
      <div>
{startPage}
      </div>
    </div>
  );
};
export default StartPage;
