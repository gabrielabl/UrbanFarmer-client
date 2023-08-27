import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const ProfileDescription =({
  avatar_photo,
  user_name,
  province,
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
          <img src={`${baseURL}/${avatar_photo}`} alt="avatar-photo"></img>
          <h1>{user_name}</h1>
          <p>{province}</p>
          <ul>
            <ul>
              <li>{likes}</li>
              <li>{views}</li>
            </ul>
            <li>{trades}</li>
          </ul>
        </section>
        
        {
      /* ABOUT PROFILE SECTION */
    }
        <section>
          <h2 style={!editMode ? show : hide}>{about}</h2>
            
          {
        /* BUTTON WILL HIDDEN WHEN EDIT MODE IS TRUE */
      }
          <button onClick={editModeHandle}><EditOutlinedIcon /> EDIT PROFILE</button>
        </section>
        </div>;
}
  
export default ProfileDescription