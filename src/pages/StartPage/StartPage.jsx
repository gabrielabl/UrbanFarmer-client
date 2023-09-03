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
    <main className="start-page__main"> 
      <AuthHeader navHeader={"ABOUT"} navUrl={"/about"} />
      <div className="start-page__container">
    <img className="logo" src={Logo} alt="urban-farmer-logo" ></img>
        <section >
          <Link className="start-page__enter" to={enterHandle()}>
            <h2>ENTER</h2>
          </Link>
          <p className="start-page__join">NEW TO THE COMMUNITY?</p>
          <Link className="start-page__join" to={"/signup"}>
            JOIN HERE.
          </Link>
        </section>
      </div>
    </main>
  );
};
export default StartPage;
