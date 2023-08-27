import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useRef, useState } from "react";
import axios from "axios";

const EditProfile = ({
  editMode,
  show,
  hide,
  avatar_photo,
  user_name,
  province,
  likes,
  views,
  trades,
  about,
  profileData,
  baseURL,
  token
}) => {

  //VARIABLES
  const hiddenUserPhotoInput = useRef(null);
  //DATA THAT WILL BE UPDATED
  const formData = new FormData();
  const [editProfile, setEditProfile] = useState({});
  const [editProfileAvatar,setEditProfileAvatar ] =useState({ avatar_photo: avatar_photo});
  const [previewAvatar, setPreviewAvatar]= useState();

  //HANDLE TO CLICK FILE INPUT
  const avatarPhotoHandle = (event) => {
    event.preventDefault();
    hiddenUserPhotoInput.current.click();
  };


//   //HANDLE ONCHANGE
//   const handleOnChangeEditProfile = (event) => {
//     const { value, name } = event.target;

//     if (name === "avatar_photo") {
//       setProfileData({
//         ...profileData,
//         [name]: event.target.files[0],
//       });
//     } else {
//       setProfileData({
//         ...profileData,
//         [name]: value,
//       });
//     }
//   };


    //HANDLE ONCHANGE
    const handleOnChangeEditProfile = (event) => {
        const { value, name } = event.target;
    
        if (name === "avatar_photo") {
          setEditProfileAvatar({
            [name]: event.target.files[0],
          });
          setPreviewAvatar(URL.createObjectURL(event.target.files[0]))
        } else {
          setEditProfile({
            ...editProfile,
            [name]: value,
          });
        }
      };

//   HANDLE SUBMIT EDIT PROFILE
const editProfileHandleSubmit = (event) => {
    event.preventDefault();
 
    for (let key in editProfile){
        formData.append(key, editProfile[key]);
    };

    formData.append('avatar_photo', editProfileAvatar.avatar_photo)
    console.log(formData.get('about'))

    console.log(editProfileAvatar)
    
    axios
    .patch(`${baseURL}/profile/${profileData.id}`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data",
        }})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
    };

  return (


    <form style={editMode ? show : hide} onSubmit={editProfileHandleSubmit}>
      {/* MAIN PROFILE DATA */}
      <div>
        <img src={previewAvatar? previewAvatar : `${baseURL}/${avatar_photo}`} alt="avatar-photo-edit"></img>
        <button onClick={avatarPhotoHandle}>
    <AddAPhotoOutlinedIcon  />
    UPLOAD PICTURE
  </button>

        <input
          className="upload-page__file"
          filename={user_name}
          type="file"
          name="avatar_photo"
          style={hide}
          onChange={handleOnChangeEditProfile}
          ref={hiddenUserPhotoInput}
          accept="image/*"
        ></input>

        <label>
          <input
            name="user_name"
            type="text"
            value={editProfile.user_name? editProfile.user_name:user_name}
            onChange={handleOnChangeEditProfile}
          ></input>
        </label>

        <label>
          <input
            name="province"
            type="text"
            value={editProfile.province? editProfile.province : province}
            onChange={handleOnChangeEditProfile}
          ></input>
        </label>
        <ul>
          <ul>
            <li>{likes}</li>
            <li>{views}</li>
          </ul>
          <li>{trades}</li>
        </ul>
      </div>

      {/* ABOUT PROFILE SECTION */}
      <div>
        <label>
          <input
            name="about"
            type="text"
            value={editProfile.about? editProfile.about : about}
            onChange={handleOnChangeEditProfile}
          ></input>
        </label>
      </div>
      <button>
        <PublishOutlinedIcon />
        SUBMIT CHANGES
      </button>
    </form>

  );
};

export default EditProfile;
