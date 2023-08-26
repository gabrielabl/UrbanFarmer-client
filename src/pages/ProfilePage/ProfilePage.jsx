import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription";
import EditProfile from "./../../components/EditProfile/EditProfile";

const ProfilePage = ({ baseURL }) => {
  //VARIABLES
  let navigate = useNavigate();
  const [profileData, setProfileData] = useState("");
  const { avatar_photo, user_name, province, likes, views, trades, about } =
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
    // Remember to include the token in Authorization header
    axios
      .get(`${baseURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfileData(res.data);
        console.log(res);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <>
      <Header />

      <main>
        <ProfileDescription
          avatar_photo={avatar_photo}
          user_name={user_name}
          province={province}
          likes={likes}
          views={views}
          trades={trades}
          editMode={editMode}
          show={show}
          hide={hide}
          about={about}
          editModeHandle={editModeHandle}
        />

        <EditProfile
          editMode={editMode}
          show={show}
          hide={hide}
          avatar_photo={avatar_photo}
          user_name={user_name}
          province={province}
          likes={likes}
          views={views}
          trades={trades}
          about={about}
        />
      </main>

      <Footer />
    </>
  );
};
export default ProfilePage;
