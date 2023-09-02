import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "./About.scss";
import logo from "../../Assets/logo/urban-farmer-logo.png";

const About = () => {
  return (
    <>
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />
      <main>
        <p>
          UrbanFarmer is a platform where city residents who are enthusiastic
          about growing their food and crafting farm-like products, such as
          bread, jams, and fermented goods, can connect with like-minded
          individuals in their community. By creating a profile, users can
          easily trade their items with others who share similar interests. The
          app simplifies the process of adding items for trade and allows users
          to explore what others have to offer. The focus is on providing a
          user-friendly and intuitive interface, ensuring that everyone,
          regardless of their tech skills, can enjoy the trading experience
          within the community.
        </p>
        <img src={logo} alt="urbanFarmer-logo"></img>
      </main>
      <Footer />
    </>
  );
};

export default About;
