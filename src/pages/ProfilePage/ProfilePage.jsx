import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ProfilePage = ({ baseURL }) => {
  // variables
  let navigate = useNavigate();
  const [profileData, setProfileData] = useState("");

  //RETRIEVING TOKEN FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");

  //CHANGE UI TO EDIT PROFILE MODE
  const [editMode, setEditMode]= useState(false);

//EDIT MODE HANDLE
const editModeHandle = ()=>{
  
}

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
        <section>
          <img src={profileData.avatar_photo} alt="avatar-photo"></img>
          <h1>{profileData.user_name}</h1>
          <ul>
            <li>{profileData.province}</li>
            <ul>
              <li>{profileData.likes}</li>
              <li>{profileData.views}</li>
            </ul>
            <li>{profileData.trades}</li>
          </ul>
        </section>
        <section>
          <h2>{profileData.about}</h2>
          <button><EditOutlinedIcon/> EDIT PROFILE</button>
        </section>
      </main>

      <Footer />
    </>
  );
};
export default ProfilePage;
