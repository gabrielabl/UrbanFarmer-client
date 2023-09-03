import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription";
import EditProfile from "./../../components/EditProfile/EditProfile";

const ProfilePage = ({ baseURL, setBackground }) => {
  

  //VARIABLES
  let navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setLoading] = useState(true);

   // Route Parameter
   const { profileId } = useParams();

  // const [profileData, setProfileData] = useState("");
  const { avatar_photo, user_name, province, city, likes, views, trades, about} =
    profileData;

  //SHOW/HIDE
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
    if(!token){
      navigate('/');
    };

      setBackground({
    backgroundColor: '#F5DECD'
  });

if(profileId === undefined){
  axios
  .get(`${baseURL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    setProfileData(res.data);
    setLoading(false);
    sessionStorage.setItem("id", res.data.id);
    sessionStorage.setItem("user_name", res.data.user_name);
    console.log(res);
  })
  .catch(() => {
    navigate("/login");
  });
} else {
  axios
  .get(`${baseURL}/profile/${profileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    setProfileData(res.data);
    setLoading(false);
    console.log(res);
  })
  .catch((err) => {
    console.log(err)
    navigate("/search");
  });
}

  },[profileId]);

  if(isLoading){
    return <div >Loading...</div>;
   };

  return (
    <>
      <Header />

      <main>
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

      <Footer />
    </>
  );
};
export default ProfilePage;
