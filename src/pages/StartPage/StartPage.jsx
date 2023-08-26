import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./StartPage.scss";
import { Link } from "react-router-dom";

const StartPage = ({}) => {

  return (
    <>
<AuthHeader navHeader={'ABOUT'}    />
      <main>
<section>
<Link to={'/login'}><h2 >ENTER</h2></Link>
<p>NEW TO THE COMMUNITY?</p><Link to={'/signup'} >JOIN HERE.</Link> 
</section>
      </main>
    </>
  );
};
export default StartPage;
