import Avatar from "../Avatar/Avatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import "./ProfileDescription.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

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
}) => {
  // VARIABLES
  const adminUserId = sessionStorage.getItem("id");
  //DYNAMIC BUTTONS
  const [editButton, setEditButton] = useState({ show });
  const [seeCollectionBtn, setSeeCollectionBtn] = useState(hide);

  //IT DISABLES EDIT BUTTON IF PROFILE ACTIVE IS NOT FROM THE USER THAT LOGIN
  //IT ENABLE SEE COLLECTION BUTTON IF PROFILE ACTIVE IS NOT FROM THE USER THAT LOGIN
  useEffect(() => {
    if (profileId !== undefined) {
      setEditButton(hide);
      setSeeCollectionBtn(show);
      if (profileId === adminUserId) {
        setEditButton(show);
        setSeeCollectionBtn(hide);
      }
    } else {
      setEditButton(show);
      setSeeCollectionBtn(hide);
    }
  }, [profileId, adminUserId, hide, show]);

  return (
    //CONTAINER WILL BE DEACTIVATED IF EDIT MODE IS FALSE
    <div className="profile-page__wrapper" style={!editMode ? show : hide}>
      {/* MAIN PROFILE DATA */}
      <section className="profile-page__user">
        <Avatar
          avatar_source={
            avatar_photo.includes("placeholder")
              ? avatar_photo
              : `${baseURL}/${avatar_photo}`
          }
          avatar_alt={"avatar_photo"}
        />
        <h1>{user_name}</h1>
        <p>
          {city}/{province}
        </p>

        {/* VIEWS AND LIKES */}
        <ul className="profile-page__interaction">
          <ul>
            <li>
              <FavoriteOutlinedIcon />
              {likes}
            </li>
            <li>
              <RemoveRedEyeOutlinedIcon />
              {views}
            </li>
          </ul>
          <li>TRADES {trades}</li>
        </ul>
        <Link
          className="profile-page__collection-link"
          to={`/profile/${profileId}/collection`}
        >
          {" "}
          <button
            className="profile-page__collection-btn"
            style={seeCollectionBtn}
          >
            SEE COLLECTION
          </button>
        </Link>
      </section>

      {/* ABOUT PROFILE SECTION */}
      <section className="profile-page__about">
        <h2>ABOUT {user_name}</h2>
        <p>{about}</p>

        {/* BUTTON WILL HIDDEN WHEN EDIT MODE IS TRUE */}
        <Button
          SVG={<EditOutlinedIcon />}
          text={"EDIT PROFILE"}
          style={editButton}
          onClick={editModeHandle}
        />
      </section>
    </div>
  );
};

export default ProfileDescription;
