import "./Header.scss";
import logo from '../../Assets/urban-farmer-logo.png';
import SearchIcon from '@mui/icons-material/Search';


const Header = ()=>{
    return(
        <div>

       <div>
        <img className='header__logo' src={logo} alt="urban-farmer-logo"></img>
        <ul>
            {/* ADD LINK TO PAGES LATER */}
            <li>PROFILE</li>
            <li>MY COLLECTION</li>
            <li>MESSAGES</li>
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