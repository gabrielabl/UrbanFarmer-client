import Avatar from '../Avatar/Avatar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import "./ProfileDescription.scss";

const ProfileDescription =({
  avatar_photo,
  user_name,
  province,
  city,
  likes,
  views,
  trades,
  editMode,
  show,
  hide,
  about,
  editModeHandle,
  baseURL
}) => {
  return <div style={!editMode? show : hide}>
        {
      /* MAIN PROFILE DATA */
    }
        <section>
<Avatar   avatar_source={`${baseURL}/${avatar_photo}`} avatar_alt={'avatar_photo'}  />        
  <h1>{user_name}</h1>
          <p>{city}/{province}</p>
          <ul>
            <ul>
              <li><FavoriteOutlinedIcon /> {likes}</li>
              <li><RemoveRedEyeOutlinedIcon />{views}</li>
            </ul>
            <li>TRADES {trades}</li>
          </ul>
        </section>
        
        {
      /* ABOUT PROFILE SECTION */
    }
        <section>
          <h2>ABOUT</h2>
          <p>{about}</p>
            
          {
        /* BUTTON WILL HIDDEN WHEN EDIT MODE IS TRUE */
      }
          <button onClick={editModeHandle}><EditOutlinedIcon /> EDIT PROFILE</button>
        </section>
        </div>;
}
  
export default ProfileDescription