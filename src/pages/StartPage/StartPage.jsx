import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./StartPage.scss";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo/urban-farmer-logo-light.png";
import { useEffect } from "react";
import BackgroundPattern from "../../Assets/images/start-page-pattern.svg";

const StartPage = ({ setBackground }) => {
  //HANDLE TO RE-DIRECT USER TO PROFILE IN CASE TOKEN IS IN SESSION STORAGE
  const enterHandle = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return "/profile";
    } else {
      return "/login";
    }
  };

  //BACKGROUND USE EFFECT- THIS WILL SET THE BACKGROUND FOR THE WHOLE CONTAINER
  useEffect(() => {
    setBackground({
      backgroundImage: `url(${BackgroundPattern})`,
      backgroundSize: "40px",
    });
  }, [setBackground]);

  return (
    <>
      {/* HEADER */}
      <AuthHeader navHeader={"ABOUT"} navUrl={"/about"} />

      {/* MAIN */}
      <main className="start-page__main">
        <div className="start-page__container">
          <img className="logo" src={Logo} alt="urban-farmer-logo"></img>

          {/* NAVIGATION */}
          <section>
            <Link className="start-page__enter" to={enterHandle()}>
              <h2>ENTER</h2>
            </Link>
            <p>NEW TO THE COMMUNITY?</p>
            <Link className="start-page__join" to={"/signup"}>
              JOIN HERE.
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};
export default StartPage;
