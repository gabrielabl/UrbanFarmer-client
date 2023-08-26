import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";


const EditProfile =({
  editMode,
  show,
  hide,
  avatar_photo,
  user_name,
  province,
  likes,
  views,
  trades,
  about
}) => {
  return <form style={editMode ? show : hide}>
          {
      /* MAIN PROFILE DATA */
    }
          <div>
            <img src={avatar_photo} alt="avatar-photo-edit"></img>
            <button><AddAPhotoOutlinedIcon />UPLOAD PICTURE</button>
            <input className="upload-page__file" // filename={file}
      // onChange={handleChangeFile}
      type="file" accept="image/*" style={hide}></input>

            <label>
              <input name="user_name" type="text" value={user_name}></input>
            </label>

            <label>
              <input name="province" type="text" value={province}></input>
            </label>
            <ul>
              <ul>
                <li>{likes}</li>
                <li>{views}</li>
              </ul>
              <li>{trades}</li>
            </ul>
          </div>

          {
      /* ABOUT PROFILE SECTION */
    }
          <div>
            <label>
              <input name="about" type="text" value={about}></input>
            </label>
          </div>
          <button>
            <PublishOutlinedIcon />
            SUBMIT CHANGES
          </button>
        </form>;
}
  
export default EditProfile