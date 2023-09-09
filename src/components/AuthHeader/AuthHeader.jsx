import { Link } from "react-router-dom";
import "./AuthHeader.scss";

const AuthHeader = ({ navHeader, navUrl }) => {
  return (
    <header className="auth-header__container">

      <Link className="auth-header__nav-link" to={navUrl}>
        <h2>{navHeader}</h2>
      </Link>
      <div className="auth-header__title">
        <h1>LOCAL FROM YOUR NEIGHBORHOOD</h1>
      </div>
      
    </header>
  );
};

export default AuthHeader;
