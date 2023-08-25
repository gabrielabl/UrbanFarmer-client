import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <><p>{profileData.user_name}</p></>
    )
}
export default ProfilePage;