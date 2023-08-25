import { Link } from "react-router-dom";

const AuthHeader = ({ navHeader, navUrl }) => {
  return (
    <div>
      <Link to={navUrl}>
        <p>{navHeader}</p>
      </Link>
      <div>
        <h1>LOCAL FROM YOUR NEIGHBORHOOD</h1>
      </div>
    </div>
  );
};

export default AuthHeader;
