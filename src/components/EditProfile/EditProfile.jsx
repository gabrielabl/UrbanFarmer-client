import "./EditProfile.scss";
import Avatar from "../Avatar/Avatar";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const EditProfile = ({
  editMode,
  show,
  hide,
  avatar_photo,
  user_name,
  province,
  city,
  about,
  profileData,
  setProfileData,
  baseURL,
  token,
  setEditMode,
}) => {
  //VARIABLES

  //REF TO BUTTON THAT UPLOAD FILES
  const hiddenUserPhotoInput = useRef(null);
  let navigate = useNavigate();

  //DATA THAT WILL BE UPDATED
  const formData = new FormData();
  const [editProfile, setEditProfile] = useState({});
  const [editProfileAvatar, setEditProfileAvatar] = useState({
    avatar_photo: avatar_photo,
  });
  const [previewAvatar, setPreviewAvatar] = useState();

  //HANDLE TO CLICK FILE INPUT
  const avatarPhotoHandle = (event) => {
    event.preventDefault();
    hiddenUserPhotoInput.current.click();
  };

  //HANDLE ONCHANGE
  const handleOnChangeEditProfile = (event) => {
    const { value, name } = event.target;

    //IF FILE IS AVATAR_PHOTO AND IS EMPTY TO NOT STORE IN TEMP URL
    if (name === "avatar_photo") {
      setEditProfileAvatar({
        [name]: event.target.files[0],
      });
      if (event.target.files[0] !== undefined) {
        setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
      }
    } else {
      setEditProfile({
        ...editProfile,
        [name]: value,
      });
    }
  };

  //HANDLE SUBMIT EDIT PROFILE
  const editProfileHandleSubmit = (event) => {
    event.preventDefault();

    //APPENDING NEW DATA FORMDATA
    for (let key in editProfile) {
      formData.append(key, editProfile[key]);
    }

    //APPEDING AVATAR_PHOTO
    if (editProfileAvatar.avatar_photo !== undefined) {
      formData.append("avatar_photo", editProfileAvatar.avatar_photo);
    }

    //PATCH REQUEST
    axios
      .patch(`${baseURL}/profile/${profileData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setEditMode(false);

        //RE-RENDERING UPDATED DATA
        axios
          .get(`${baseURL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setProfileData(res.data);

            //CLEARING EDITING DATA FROM OBJECT
            setEditProfile({});
            setEditProfileAvatar({});
          })
          .catch(() => {
            navigate("/login");
          });
      })
      .catch((err) => {});
  };

  //CANCEL EDITING HANDLE
  const cancelHandleOnClick = () => {
    setEditMode(false);
  };

  return (
    //FORM
    <form
      className="profile-edit__form"
      style={editMode ? show : hide}
      onSubmit={editProfileHandleSubmit}
    >
      {/* MAIN PROFILE EDIT DATA */}
      <div className="profile-edit__user">
        <h1>EDIT PROFILE</h1>
        <Avatar
          avatar_source={
            !previewAvatar ? `${baseURL}/${avatar_photo}` : previewAvatar
          }
          avatar_alt={"avatar-photo-edit"}
        />

        {/* UPLOAD BUTTON */}
        <Button
          onClick={avatarPhotoHandle}
          SVG={<AddAPhotoOutlinedIcon />}
          text="UPLOAD PICTURE"
        />

        {/* FORM FIELDS */}
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
        <input
          name="user_name"
          type="text"
          value={editProfile.user_name?.user_name}
          onChange={handleOnChangeEditProfile}
          placeholder={user_name}
        ></input>
        <input
          name="city"
          type="text"
          value={editProfile.city?.city}
          onChange={handleOnChangeEditProfile}
          placeholder={city.length <= 1 ? "Include your city here" : city}
        ></input>
        <input
          name="province"
          type="text"
          value={editProfile.province?.province}
          onChange={handleOnChangeEditProfile}
          placeholder={
            province.length <= 1 ? "Include your province here" : province
          }
        ></input>
      </div>

      {/* ABOUT PROFILE SECTION */}
      <div>
        <h2>ABOUT {user_name}</h2>
        <textarea
          className="profile-edit__about-input"
          name="about"
          type="text"
          value={editProfile.about ? editProfile.about : about}
          onChange={handleOnChangeEditProfile}
          placeholder={about.length <= 1 ? "Describe yourself" : about}
        ></textarea>
        {/* BUTTONS */}
        <Button SVG={<PublishOutlinedIcon />} text="SUBMIT CHANGES" />
        <Button text={"CANCEL"} onClick={cancelHandleOnClick} />
      </div>
    </form>
  );
};

export default EditProfile;
