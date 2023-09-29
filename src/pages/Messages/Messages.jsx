import "./Messages.scss";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Button from "../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Messages = ({ baseURL, setBackground }) => {
  //VARIABLES
  const [isLoading, setLoading] = useState(true);
  let navigate = useNavigate();
  const [messageData, setMessageData] = useState([]);
  const [activeMessages, setActiveMessages] = useState([]);

  //RETRIEVING TOKEN AND DATA FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");
  const adminUserId = sessionStorage.getItem("id");
  const user_name = sessionStorage.getItem("user_name");

  //GETTING MESSAGE DATA
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${baseURL}/messages/${adminUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMessageData(res.data);
          setLoading(false);
          setActiveMessages(res.data[0].messages)
        })
        .catch((err) => {
          console.log(err);
          //IF USER MESSAGES FAILED TO BE RETRIEVE, RE-DIRECT TO PROFILE
          navigate("/profile");
        });
    }
  }, [adminUserId, token, setMessageData, baseURL, navigate,setActiveMessages]);

  //ACTIVE MESSAGE HANDLE
  const activeMessageHandle = (id) => {
   const filteredMessages = messageData.filter((element)=> element.id === id);
   setActiveMessages(filteredMessages[0].messages)
  };

  //LOADING WHILE DATA IS NOT RETRIEVED FROM THE SERVER
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* ACTIVE MESSAGE SELECTION */}
        <section>
          <h1>MESSAGES</h1>
          <ul>
            {messageData.map((element) => (
              <li
                onClick={() => {
                  activeMessageHandle(element.id);
                }}
                key={element.id}
              >
                <Avatar
                  avatar_source={`${baseURL}/${element.messages[0].receiver_photo}`}
                  avatar_alt={element.messages[0].receiver_name}
                />
                <h2>{element.messages[0].receiver_name}</h2>
                <DeleteOutlineTwoToneIcon />
              </li>
            ))}
          </ul>
        </section>

        {/* MESSAGE BLOCK */}
        <div>
          {/* FORMER MESSAGES */}
          <ul>
            {activeMessages
              .map((message) => (
                <li>
                  <h3>{!message.sender_name? user_name : message.sender_name}</h3>
                  <div>
                    <p>{message.message}</p>
                    <p>{message.timestamp}</p>
                  </div>
                </li>
              ))}
          </ul>

          {/* NEW MESSAGE SUBMISSION   */}
          <form>
            <textarea> </textarea>
            <Button text="SUBMIT" SVG={<SendIcon />} />
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Messages;
