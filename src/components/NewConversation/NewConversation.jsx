import SendIcon from "@mui/icons-material/Send";
import Button from "../../components/Button/Button";
import "./NewConversation.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewConversation = ({
  messagePrompt,
  adminUserId,
  profileId,
  token,
  baseURL,
}) => {
  //VARIABLES
  const [firstMessage, setFirstMessage] = useState([]);
  let navigate = useNavigate();

  //HANDLE ON CHANGE
  const messageHandleOnChange = (event) => {
    setFirstMessage(event.target.value);
  };

  //HANDLE ON SUBMIT
  const onSubmitHandle = (event) => {
    event.preventDefault();

    //VALIDATION
    //IF MESSAGE IS NOT PRESENT, DO NOT PROCEED
    if (firstMessage.length > 0) {
      const firstMessageData = {
        sender_id: adminUserId,
        receiver_id: profileId,
        message_text: firstMessage,
      };

      //STARTING A NEW CONVERSATION WITH THE USER FROM THAT COLLECTION
      axios
        .post(`${baseURL}/messages/conversation`, firstMessageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/messages");
        })
        .catch((err) => {});
    } else {
    }
  };

  return (
    <div style={messagePrompt} className="collection-page__message">
      <form onSubmit={onSubmitHandle}>
        <h2>{`INTERESTED IN ANY ITEM ON THIS COLLECTION?`}</h2>
        <p>YOU CAN START A CONVERSATION BELOW</p>
        <textarea
          onChange={messageHandleOnChange}
          name="message_text"
          type="text"
          placeholder={`WHAT ITEM ON THIS COLLECTION WOULD YOU LIKE TO TRADE`}
          value={firstMessage}
        ></textarea>
        <Button text="SEND" SVG={<SendIcon />} />
      </form>
    </div>
  );
};

export default NewConversation;
