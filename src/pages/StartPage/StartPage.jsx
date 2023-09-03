import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./StartPage.scss";
import { Link } from "react-router-dom";
import Logo from '../../Assets/logo/urban-farmer-logo-light.png'

const StartPage = ({}) => {
  //VARIABLES

  const enterHandle = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return "/profile";
    } else {
      return "/login";
    }
  };

  
  return (
    <>
      <AuthHeader navHeader={"ABOUT"} navUrl={"/about"} />
      <main>
    <img className="logo" src={Logo} alt="urban-farmer-logo" ></img>
        <section className="start-page__container">
          <Link className="start-page__enter" to={enterHandle()}>
            <h2>ENTER</h2>
          </Link>
          <p className="start-page__join">NEW TO THE COMMUNITY?</p>
          <Link className="start-page__join" to={"/signup"}>
            JOIN HERE.
          </Link>
        </section>
      </main>
    </>
  );
};
export default StartPage;
