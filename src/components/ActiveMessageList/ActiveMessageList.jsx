import Avatar from "../../components/Avatar/Avatar";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import "./ActiveMessageList.scss";

const ActiveMessageList =({
  messageData,
  activeMessageHandle,
  baseURL
}) =>{
  return <section>
          <h1>MESSAGES</h1>
          <ul>
            {messageData.map(element => <li onClick={() => {
        activeMessageHandle(element.id);
      }} key={element.id}>
                <Avatar avatar_source={`${baseURL}/${element.messages[0].receiver_photo}`} avatar_alt={element.messages[0].receiver_name} />
                <h2>{element.messages[0].receiver_name}</h2>
                <DeleteOutlineTwoToneIcon />
              </li>)}
          </ul>
        </section>;
}
  
export default ActiveMessageList;