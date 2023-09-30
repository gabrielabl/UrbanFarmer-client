import Avatar from "../../components/Avatar/Avatar";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import "./ActiveMessageList.scss";

const ActiveMessageList =({
  messageData,
  activeMessageHandle,
  baseURL
}) =>{
  return <section className="active-message__wrapper" >
          <h1 className="active-message__title">MESSAGES</h1>
          <ul className="active-message__container">
            {messageData.map(element => <li className="active-message__list-item" onClick={() => {
        activeMessageHandle(element.id);
      }} key={element.id}>
                <Avatar avatar_source={`${baseURL}/${element.messages[0].receiver_photo}`} avatar_alt={element.messages[0].receiver_name} />
                <h2>{element.messages[0].receiver_name? element.messages[0].receiver_name : element.messages[0].sender_name}</h2>
                <DeleteOutlineTwoToneIcon />
              </li>)}
          </ul>
        </section>;
}
  
export default ActiveMessageList;