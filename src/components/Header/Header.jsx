import "./Header.scss";
import logo from "../../Assets/logo/urban-farmer-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmailIcon from '@mui/icons-material/Email';

const Header = () => {
  // VARIABLES
  const [search, setSearch] = useState();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [mobileScreen, setMobileScreen] = useState();

  //WILL CHANGE STATE ACCORDING TO SCREEN SIZE TO CHANGE NAVIGATION MENU
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    if (screenSize < 768) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  });

  // RE-DIRECT
  let navigate = useNavigate();

  //HANDLE ON CHANGE
  const handleOnChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  //HANDLE KEY TO CONFIRM ENTER WAS PRESSED
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (search === undefined) {
        sessionStorage.setItem("search", "");
      } else {
        sessionStorage.setItem("search", search);
      }
      navigate("/search");
    }
  };

  //SIGN OFF HANDLE
  const signOffHandle = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="header__container">
      <nav>
        <NavLink className="header__nav-link" to="/">
          <img
            className="header__logo"
            src={logo}
            alt="urban-farmer-logo"
          ></img>
        </NavLink>
        <ul>
          {/* NAVIGATION */}
          <NavLink className="header__nav-link" to="/profile">
            <li>{mobileScreen? <Person2Icon /> : "PROFILE"}</li>
          </NavLink>
          <NavLink className="header__nav-link" to="/mycollection">
            <li>{mobileScreen? <CollectionsIcon /> :"MY COLLECTION" }</li>
          </NavLink>
          <NavLink className="header__nav-link">
            <li>{mobileScreen? <EmailIcon /> : "MESSAGES"}</li>
          </NavLink>
        </ul>
      </nav>

      <div>
        <ul>
          <li className="header__search-sign-off-wrapper">
            <SearchIcon sx={{ color: "#FD7988" }} />
            <input
              className="header__search"
              name="search"
              type="text"
              onChange={handleOnChangeSearch}
              placeholder="SEARCH ITEMS TO TRADE"
              onKeyDown={handleKeyDown}
            ></input>
          </li>

          {/* //ADD FUNCTION TO REMOVE TOKEN FROM SESSION STORAGE AND RE-DIRECT TO HOME PAGE */}
          <li className="header__sign-off" onClick={signOffHandle}>
            SIGN OFF
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
