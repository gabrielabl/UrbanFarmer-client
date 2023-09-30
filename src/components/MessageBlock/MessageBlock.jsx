import * as timeAgo from "../../utils/TimeAgo/TimeAgo";
import Button from "../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import "./MessageBlock.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MessageBlock = ({
  activeMessages,
  user_name,
  token,
  baseURL,
  adminUserId,
  activeConversationId,
  activeReceiverId,
  setMessageData,
  setActiveMessages,
  setActiveConversationId,
  setActiveReceiverId,
}) => {
  //VARIABLES
  const [newMessage, setNewMessage] = useState([]);
  let navigate = useNavigate();

  //HANDLE ON CHANGE
  const newMessageOnChangeHandle = (event) => {
    setNewMessage(event.target.value);
  };

  //SUBMIT HANDLE
  const newMessageSubmitHandle = (event) => {
    event.preventDefault();

    if (newMessage.length > 0) {
      //NEW MESSAGE DATA
      const newMessageData = {
        sender_id: adminUserId,
        receiver_id: activeReceiverId,
        conversations_id: activeConversationId,
        message_text: newMessage,
      };

      axios
        .post(`${baseURL}/messages`, newMessageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          axios
            .get(`${baseURL}/messages/${adminUserId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setMessageData(res.data);

              //DEFAULT ACTIVE MESSAGES
              const filteredMessages = res.data.filter(
                (element) => element.id === activeConversationId
              );
              setActiveMessages(filteredMessages[0].messages);
              setActiveConversationId(activeConversationId);
              setActiveReceiverId(activeReceiverId);
              setNewMessage([]);
            })
            .catch((err) => {
              console.log(err);
              //IF USER MESSAGES FAILED TO BE RETRIEVE, RE-DIRECT TO PROFILE
              navigate("/profile");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="message-block__wrapper">
      {/* FORMER MESSAGES */}
      <ul className="message-block__container">
        {activeMessages
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((message) => (
            <li key={message.message_id}>
              <h3 className="message-block__user-name">{!message.sender_name ? user_name : message.sender_name}</h3>
              <div>
                <p className="message-block__message">{message.message}</p>
                <p className="message-block__timestamp">{timeAgo.timeAgo(message.timestamp)}</p>
              </div>
            </li>
          ))}
      </ul>

      {/* NEW MESSAGE SUBMISSION   */}
      <form onSubmit={newMessageSubmitHandle}>
        <textarea
        className="message-block__input"
          name="message_text"
          type="text"
          value={newMessage}
          onChange={newMessageOnChangeHandle}
          placeholder="INSERT YOUR MESSAGE HERE"
        ></textarea>
        <Button classVar={"message-block__btn"} text="SUBMIT" SVG={<SendIcon />} />
      </form>
    </div>
  );
};

export default MessageBlock;
