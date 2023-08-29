import { useEffect, useState } from "react";
import "./MyCollection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCollection = ({ baseURL,profileData }) => {
  // VARIABLES
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const [collectionData, setCollectionData] = useState([]);
const {id, users_id, item_name, description, item_photo}= collectionData


  //RETRIEVING TOKEN FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");

  //IF USER DOES NOT HAVE ANY ITEM IN COLLECTION, IT WILL RE-DIRECT TO NEW COLLECTION ITEM PAGE
  if(collectionData.message){
    navigate('/profile')
  }

  //RETRIEVING USER DATA ACCORDING TO AUTHORIZATION TOKEN
  useEffect(() => {
    //IF TOKEN ABSENT FROM SESSION STORAGE, RE-DIRECT TO LOGIN PAGE
    if (!token) {
      navigate("/login");
    }

    // Remember to include the token in Authorization header
    axios
      .get(`${baseURL}/profile/${profileData.id}/collection`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCollectionData(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch(() => {
        navigate("/login");
      });

  }, []);

  if(isLoading){
   return <div >Loading...</div>;
  };

  console.log(collectionData[0].id)

  return (
    <section>
      <h1>{collectionData[3].id}</h1>
    </section>
  );
};

export default MyCollection;
