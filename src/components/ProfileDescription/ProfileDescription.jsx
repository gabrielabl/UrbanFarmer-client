import Avatar from "../Avatar/Avatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import "./ProfileDescription.scss";
import { useEffect, useState } from "react";

const ProfileDescription = ({
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
  baseURL,
  profileId,
  id,
}) => {
  // VARIABLES
  const [editButton, setEditButton] = useState({ show });
  const adminUserId = sessionStorage.getItem("id");

  //IT DISABLES EDIT BUTTON IF PROFILE ACTIVE IS DIFFERENT AS THE USER THAT LOGIN
  useEffect(() => {
    if (profileId !== undefined) {
      setEditButton(hide);
      if (profileId === adminUserId) {
        setEditButton(show);
      }
    } else {
      setEditButton(show);
    }
  }, [profileId]);

  return (
    <div style={!editMode ? show : hide}>
      {/* MAIN PROFILE DATA */}
      <section>
        <Avatar
          avatar_source={`${baseURL}/${avatar_photo}`}
          avatar_alt={"avatar_photo"}
        />
        <h1>{user_name}</h1>
        <p>
          {city}/{province}
        </p>
        <ul>
          <ul>
            <li>
              <FavoriteOutlinedIcon /> {likes}
            </li>
            <li>
              <RemoveRedEyeOutlinedIcon />
              {views}
            </li>
          </ul>
          <li>TRADES {trades}</li>
        </ul>
      </section>

      {/* ABOUT PROFILE SECTION */}
      <section>
        <h2>ABOUT</h2>
        <p>{about}</p>

        {/* BUTTON WILL HIDDEN WHEN EDIT MODE IS TRUE */}
        <button style={editButton} onClick={editModeHandle}>
          <EditOutlinedIcon /> EDIT PROFILE
        </button>
      </section>
    </div>
  );
};

export default ProfileDescription;
