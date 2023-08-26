import "./Header.scss";
import logo from '../../Assets/urban-farmer-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from "react-router-dom";


const Header = ()=>{
    return(
        <div>

       <div>
        <img className='header__logo' src={logo} alt="urban-farmer-logo"></img>
        <ul>
            {/* ADD LINK TO PAGES LATER */}
          <NavLink to='/profile'><li>PROFILE</li></NavLink> 
          <NavLink><li>MY COLLECTION</li></NavLink> 
          <NavLink><li>MESSAGES</li></NavLink> 
        </ul>
       </div>

       <div>
     <ul>
        <li><SearchIcon />Search Items to trade</li>
        {/* //ADD FUNCTIO TO REMOVE TOKEN FROM SESSION STORAGE AND RE-DIRECT TO HOME PAGE */}
        <li>SIGN OFF</li>
     </ul>
       </div>
       </div>
    )
};

export default Header;