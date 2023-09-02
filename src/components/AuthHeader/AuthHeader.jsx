import { Link } from "react-router-dom";
import "./AuthHeader.scss";

const AuthHeader = ({ navHeader, navUrl }) => {
  return (
    <header>
      <Link to={navUrl}>
        <p>{navHeader}</p>
      </Link>
      <div>
        <h1>LOCAL FROM YOUR NEIGHBORHOOD</h1>
      </div>
    </header>
  );
};

export default AuthHeader;
