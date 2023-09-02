import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./StartPage.scss";
import { Link } from "react-router-dom";

const StartPage = ({}) => {
 //VARIABLES

const enterHandle = ()=>{
  const token = sessionStorage.getItem("token");
  if(token){
return '/profile'
  } else {
return '/login'
  }
}

  return (
    <>
<AuthHeader navHeader={'ABOUT'} navUrl={'/about'}    />
      <main className="start-page__container">
<section>
<Link to={enterHandle()}><h2 >ENTER</h2></Link>
<p>NEW TO THE COMMUNITY?</p><Link to={'/signup'} >JOIN HERE.</Link> 
</section>
      </main>
    </>
  );
};
export default StartPage;
