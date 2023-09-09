import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import StartPage from "./pages/StartPage/StartPage";
import About from "./pages/About/About";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import MyCollection from "./pages/MyCollection/MyCollection";
import AddItem from "./components/AddItem/AddItem";
import SearchItem from "./components/SearchItem/SearchItem";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  //Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  //BACKGROUND FOR THE WHOLE PAGE
  const [background, setBackground]= useState({ backgroundColor: '#F5DECD'});

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
      <div style={background} className="App">
        <Routes>
          <Route path="/" element={<StartPage setBackground={setBackground} baseURL={baseURL}/>}></Route>
          <Route path="/about" element={<About setBackground={setBackground} />}></Route>
          <Route path="/profile" element={<ProfilePage baseURL={baseURL} setBackground={setBackground} />}></Route>
          <Route path="/signup" element={<SignUp setBackground={setBackground} signUpVar={signUpVar} setSignUpVar={setSignUpVar} baseURL={baseURL} />}></Route>
          <Route path="/login" element={<Login setBackground={setBackground} loginVar={loginVar} setLoginVar={setLoginVar} baseURL={baseURL}/>}></Route>
          <Route path="/mycollection" element={<MyCollection setBackground={setBackground} baseURL={baseURL}/>}></Route>
          <Route path="/additem" element={<AddItem baseURL={baseURL}/>}></Route>
          <Route path="/search" element={<SearchItem setBackground={setBackground} baseURL={baseURL}/>}></Route>
          <Route path="/profile/:profileId" element={<ProfilePage baseURL={baseURL}/>}></Route>
          <Route path="/profile/:profileId/collection" element={<MyCollection baseURL={baseURL}/>}></Route>
          <Route path="*" element={<NotFound setBackground={setBackground}  />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
