import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ProfilePage = ({baseURL})=>{


    // variables
  let navigate = useNavigate();
   const [ profileData ,setProfileData] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
        // Remember to include the token in Authorization header
        axios
        .get(`${baseURL}/profile`,{
          headers:{
            Authorization : `Bearer ${token}`
          }
        }).then((res)=>{
            setProfileData(res.data)
          console.log(res)
        }).catch(()=>{
         navigate('/login')
        })}, []);

    return (
        <>
              <Header />
              <p>{profileData.user_name}</p>
              <Footer />
              </>
    )
}
export default ProfilePage;