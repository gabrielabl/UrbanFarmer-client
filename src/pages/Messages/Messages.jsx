import "./Messages.scss";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageBlock from "../../components/MessageBlock/MessageBlock";
import ActiveMessageList from "../../components/ActiveMessageList/ActiveMessageList";

const Messages = ({ baseURL, setBackground }) => {
  //VARIABLES
  const [isLoading, setLoading] = useState(true);
  let navigate = useNavigate();
  const [messageData, setMessageData] = useState([]);
  const [activeMessages, setActiveMessages] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState([]);
  const [activeReceiverId, setActiveReceiverId] = useState([]);

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
      //SETTING BACKGROUND FOR MESSAGE PAGE
      setBackground({
        backgroundColor: "#F5DECD",
      });
          setMessageData(res.data);
          setLoading(false);

          //DEFAULT ACTIVE MESSAGES
          setActiveMessages(res.data[0].messages);
          setActiveConversationId(res.data[0].id);

          //SETTING THE CORRECT INITIAL ID OF THE RECEIVER FOR SENDING MESSAGES
          if (res.data[0].messages[0].receiver_id === adminUserId) {
            setActiveReceiverId(res.data[0].messages[0].sender_id);
          } else {
            setActiveReceiverId(res.data[0].messages[0].receiver_id);
          }
        })
        .catch((err) => {
          console.log(err);
          //IF USER MESSAGES FAILED TO BE RETRIEVE, RE-DIRECT TO PROFILE
          navigate("/profile");
        });
    }
  }, [
    adminUserId,
    token,
    setMessageData,
    baseURL,
    navigate,
    setActiveMessages,
    setActiveConversationId,
    setActiveReceiverId
  ]);

  //ACTIVE MESSAGE HANDLE
  const activeMessageHandle = (id) => {
    const filteredMessages = messageData.filter((element) => element.id === id);

    console.log(filteredMessages[0].messages.sort((a,b)=> a.timestamp - b.timestamp))
    
    setActiveConversationId(filteredMessages[0].id);
    setActiveMessages(filteredMessages[0].messages);

    //SETTING THE CORRECT ID OF THE RECEIVER FOR SENDING MESSAGES
    if (filteredMessages[0].messages[0].receiver_id === adminUserId) {
      setActiveReceiverId(filteredMessages[0].messages[0].sender_id);
    } else {
      setActiveReceiverId(filteredMessages[0].messages[0].receiver_id);
    }
  };

  //LOADING WHILE DATA IS NOT RETRIEVED FROM THE SERVER
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {/* HEADER */}
      <Header />
      <main className="messages-page__container">
        {/* ACTIVE MESSAGE SELECTION */}
        <ActiveMessageList
          messageData={messageData}
          activeMessageHandle={activeMessageHandle}
          baseURL={baseURL}
        />

        {/* MESSAGE BLOCK */}
        <MessageBlock
          baseURL={baseURL}
          activeConversationId={activeConversationId}
          activeReceiverId={activeReceiverId}
          token={token}
          adminUserId={adminUserId}
          activeMessages={activeMessages}
          user_name={user_name}
          setMessageData={setMessageData}
          setActiveMessages={setActiveMessages}
          setActiveConversationId={setActiveConversationId}
          setActiveReceiverId={setActiveReceiverId}
        />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Messages;
