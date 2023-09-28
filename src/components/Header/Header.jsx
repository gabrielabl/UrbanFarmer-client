import "./Header.scss";
import logo from "../../Assets/logo/urban-farmer-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import CollectionsIcon from "@mui/icons-material/Collections";
import EmailIcon from "@mui/icons-material/Email";

const Header = ({ headerStyleSwitch }) => {
  
  // VARIABLES
  const [search, setSearch] = useState();

  //SCREENSIZE VARIABLES
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [mobileScreen, setMobileScreen] = useState();

  //WILL CHANGE STATE ACCORDING TO SCREEN SIZE TO CHANGE NAVIGATION MENU FROM ICONS TO TEXT
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
  }, [screenSize]);

  // RE-DIRECT
  let navigate = useNavigate();

  //HANDLE ON CHANGE SEARCH
  const handleOnChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  //HANDLE KEY TO CONFIRM ENTER WAS PRESSED ON SEARCH FIELD
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

  //SIGN OFF HANDLE TO NAVIGATE TO HOME AND CLEAR UP SESSION STORAGE
  const signOffHandle = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    // HEADER

    // HEADER STYLE SWITCH IS WHEN NOT FOUND IS TRIGGER AND THE COLORS OF THE HEADER AND BACKGROUND ARE INVERSED
    <header
      className={`header__container ${
        headerStyleSwitch ? "header__container--not-found" : ""
      }`}
    >
      {/* NAVIGATION LOGO*/}
      <nav className="header__icon-nav-wrapper">
        <NavLink  to="/">
          <img
            className="header__logo"
            src={logo}
            alt="urban-farmer-logo"
          ></img>
        </NavLink>
        <ul className="header__nav">
          {/* NAVIGATION  LIST*/}
          <NavLink
          activeClassName="active"
            className={`header__nav-link ${
              headerStyleSwitch ? "header__nav-link--not-found" : ""
            }`}
            to="/profile"
          >
            <li>
              {mobileScreen ? <Person2Icon fontSize="large" /> : "PROFILE"}
            </li>
          </NavLink>
          <NavLink
          activeClassName="active"
            className={`header__nav-link ${
              headerStyleSwitch ? "header__nav-link--not-found" : ""
            }`}
            to="/mycollection"
          >
            <li>
              {mobileScreen ? (
                <CollectionsIcon fontSize="large" />
              ) : (
                "MY COLLECTION"
              )}
            </li>
          </NavLink>
          <NavLink
          activeClassName="active"
            className={`header__nav-link ${
              headerStyleSwitch ? "header__nav-link--not-found" : ""
            }`}
            to="/messages"
          >
            <li>
              {mobileScreen ? <EmailIcon fontSize="large" /> : "MESSAGES"}
            </li>
          </NavLink>
        </ul>
      </nav>

      {/* SEARCH AND SIGN OFF WRAPPER */}
      <div>
        <ul className="header__search-sign-off-wrapper">
          {/* SEARCH */}
          <li className="header__search-container">
            <SearchIcon />
            <input
              className={`header__search ${
                headerStyleSwitch ? "header__search--not-found" : ""
              }`}
              name="search"
              type="text"
              onChange={handleOnChangeSearch}
              placeholder="SEARCH"
              onKeyDown={handleKeyDown}
            ></input>
          </li>

          {/* SIGN OFF */}
          <li className="header__sign-off" onClick={signOffHandle}>
            SIGN OFF
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
