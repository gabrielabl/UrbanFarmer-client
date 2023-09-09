import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription";
import EditProfile from "./../../components/EditProfile/EditProfile";
import LoadingButton from "@mui/lab/LoadingButton";
import ProfileAvatarPlaceholder from "../../Assets/images/avatar-placeholder.png";

const ProfilePage = ({ baseURL, setBackground }) => {
  //VARIABLES
  let navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setLoading] = useState(true);

  // Route Parameter
  const { profileId } = useParams();

  //profileData DESTRUCTURED
  const {
    avatar_photo,
    user_name,
    province,
    city,
    likes,
    views,
    trades,
    about,
  } = profileData;

  //SHOW/HIDE VARIABLES
  const show = { display: "flex" };
  const hide = { display: "none" };

  //RETRIEVING TOKEN FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");

  //CHANGE UI TO EDIT PROFILE MODE
  const [editMode, setEditMode] = useState(false);
  //EDIT MODE HANDLE
  const editModeHandle = () => {
    setEditMode(true);
  };

  //RETRIEVING USER DATA ACCORDING TO AUTHORIZATION TOKEN
  useEffect(() => {
    //IF TOKEN ABSENT FROM SESSION STORAGE, RE-DIRECT TO LOGIN PAGE
    if (!token) {
      navigate("/");
    }

    //RETRIEVING PROFILE DATA FROM USER THAT LOGIN BY CHECKING IF PARAMS ID IS VALID
    if (profileId === undefined) {
      axios
        .get(`${baseURL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfileData(res.data);
          setLoading(false);

          //ADDING SESSION STORAGE FOR ID AND NAME TO BE RETRIEVED LATER
          sessionStorage.setItem("id", res.data.id);
          sessionStorage.setItem("user_name", res.data.user_name);

          //SETTING BACKGROUND FOR PROFILE PAGE
          setBackground({
            backgroundColor: "#F5DECD",
          });
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      //IF PROFILE ID IS VALID, IT WILL RETRIEVE PROFILE DATA FROM THE USER THAT IS BEING VISITED
      axios
        .get(`${baseURL}/profile/${profileId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfileData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          navigate("/search");
        });
    }
  }, [profileId, baseURL, navigate, setBackground, token]);

  //IF AVATAR_PHOTO NO PROVIDED, USE PLACEHOLDER INSTEAD
  if (profileData.avatar_photo <= 1) {
    setProfileData({ ...profileData, avatar_photo: ProfileAvatarPlaceholder });
  }

  //LOADING WHILE DATA IS NOT RETRIEVED FROM THE SERVER
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="loading-page">
          <p>LOADING...</p>
          <LoadingButton loading={true} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* PROFILE MODE */}
      <main className="profile-page__container">
        <ProfileDescription
          avatar_photo={avatar_photo}
          user_name={user_name}
          province={province}
          city={city}
          likes={likes}
          views={views}
          trades={trades}
          editMode={editMode}
          show={show}
          hide={hide}
          about={about}
          editModeHandle={editModeHandle}
          baseURL={baseURL}
          profileId={profileId}
        />

        {/* EDIT PROFILE MODE */}
        <EditProfile
          editMode={editMode}
          setEditMode={setEditMode}
          show={show}
          hide={hide}
          avatar_photo={avatar_photo}
          user_name={user_name}
          province={province}
          city={city}
          likes={likes}
          views={views}
          trades={trades}
          about={about}
          profileData={profileData}
          setProfileData={setProfileData}
          baseURL={baseURL}
          token={token}
        />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};
export default ProfilePage;
