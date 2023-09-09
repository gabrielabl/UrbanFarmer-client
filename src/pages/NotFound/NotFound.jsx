import "./NotFound.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";

const NotFound = ({ setBackground }) => {

  // VARIABLES
  //HEADER STYLE SWITCH WHEN PAGE NOT FOUND LOADS
  const [headerStyleSwitch, setHeaderStyleSwitch] = useState(false);

  //CHANGES BACKGROUND AND HEADER TEXT COLOUR
  useEffect(() => {
    setBackground({ backgroundColor: "#FD7988" });
    setHeaderStyleSwitch(true);
  }, [setBackground]);

  return (
    <>
      {/* HEADER */}
      <Header headerStyleSwitch={headerStyleSwitch} />

      {/* MAIN CONTENT */}
      <main className="not-found__container">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__info">OOPS, PAGE NOT FOUND</p>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default NotFound;
