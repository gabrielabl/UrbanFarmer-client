import "./Messages.scss";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Button from "../../components/Button/Button";
import SendIcon from '@mui/icons-material/Send';


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

            {/* ACTIVE MESSAGE SELECTION */}
            <section>
             <h1>MESSAGES</h1>
             <ul>
                <li>
                    <Avatar />
                    <h2></h2>
                    <DeleteOutlineTwoToneIcon />
                </li>
             </ul>
            </section>
    
    {/* MESSAGE BLOCK */}
            <div>

                {/* FORMER MESSAGES */}
                <ul>
                    <h3></h3>
                    <div>
                        <p>
                        </p>
                        <p>
                        </p>
                    </div>
                </ul>

          {/* NEW MESSAGE SUBMISSION   */}
<form>
    <textarea> </textarea>
    <Button text="SUBMIT" SVG={<SendIcon/>} />


</form>
            </div>
            
        </main>


      {/* FOOTER */}
      <Footer />
        </>
    )
};

export default Messages