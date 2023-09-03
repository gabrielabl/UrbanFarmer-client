import { Link } from "react-router-dom";
import "./AuthHeader.scss";

const AuthHeader = ({ navHeader, navUrl }) => {
  return (
    <header className="auth-header__container">
      <Link className="auth-header__nav-link" to={navUrl}>
        <p>{navHeader}</p>
      </Link>
      <div>
        <h1>LOCAL FROM YOUR NEIGHBORHOOD</h1>
      </div>
    </header>
  );
};

export default AuthHeader;
