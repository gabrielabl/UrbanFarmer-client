import "./Messages.scss";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

const Messages = ({ baseURL, setBackground })=>{
    //VARIABLES
    const [isLoading, setLoading] = useState(false);


    //LOADING WHILE DATA IS NOT RETRIEVED FROM THE SERVER
  if (isLoading) {
    return <Loading />;
  }
    return(
        <>
            {/* HEADER */}
      <Header />
        
        <main>
            
        </main>


      {/* FOOTER */}
      <Footer />
        </>
    )
};

export default Messages