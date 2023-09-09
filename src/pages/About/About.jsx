import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "./About.scss";
import logo from "../../Assets/logo/urban-farmer-logo-light.png";
import { useEffect } from "react";

const About = ({ setBackground }) => {
  //SETTING BACKGROUND FOR THE WHOLE PAGE WHEN PAGE LOADS
  useEffect(() => {
    setBackground({ backgroundColor: "#FD7988" });
  }, [setBackground]);

  return (
    <>
      {/* HEADER */}
      <AuthHeader navHeader={"HOME"} navUrl={"/"} />
      <main className="about__wrapper">
        {/* CONTENT */}
        <div className="about__container">
          <p>
            UrbanFarmer is a vibrant platform designed to unite urban dwellers
            with a passion for cultivating their own food and crafting
            delightful farm-like products, ranging from mouthwatering bread to
            homemade jams and artisanal fermented goods. By setting up a user
            profile, individuals can effortlessly connect with fellow
            enthusiasts in their local community, fostering a sense of
            camaraderie and shared interests. The platform's intuitive interface
            simplifies the process of listing items for trade, making it
            accessible to all, regardless of their technical prowess. Users are
            encouraged to explore the diverse offerings within the community,
            creating a lively marketplace where creativity and sustainable
            living thrive. Whether you're a seasoned urban gardener or a novice
            bread maker, UrbanFarmer provides an inclusive space for everyone to
            partake in the joy of trading homemade treasures.
          </p>
          <img className="logo" src={logo} alt="urbanFarmer-logo"></img>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default About;
