import "./Header.scss";
import logo from '../../Assets/urban-farmer-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink} from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Header = ()=>{

// VARIABLES
const [search,setSearch]= useState();

  // RE-DIRECT
  let navigate = useNavigate();

//HANDLE ON CHANGE
const handleOnChangeSearch = (event)=>{
setSearch(event.target.value)
};

//HANDLE KEY TO CONFIRM ENTER WAS PRESSED
const handleKeyDown = (event)=>{
if(event.key === "Enter"){
  if(search === undefined){
    sessionStorage.setItem("search", '');
  }else{
    sessionStorage.setItem("search", search);
  }
  navigate('/search')
}
}

    return(
        <div>

       <div>
        <img className='header__logo' src={logo} alt="urban-farmer-logo"></img>
        <ul>
            {/* ADD LINK TO PAGES LATER */}
          <NavLink to='/profile'><li>PROFILE</li></NavLink> 
          <NavLink to='/mycollection'><li>MY COLLECTION</li></NavLink> 
          <NavLink><li>MESSAGES</li></NavLink> 
        </ul>
       </div>

       <div>
     <ul>
      <li><SearchIcon /><input name="search"
                type="text"

                onChange={handleOnChangeSearch}
                placeholder="Search Items to trade"
                onKeyDown={handleKeyDown}></input></li>

        {/* //ADD FUNCTION TO REMOVE TOKEN FROM SESSION STORAGE AND RE-DIRECT TO HOME PAGE */}
        <li>SIGN OFF</li>
     </ul>
       </div>
       </div>
    )
};

export default Header;