import { useEffect, useState } from "react";
import "./MyCollection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const MyCollection = ({ baseURL}) => {
  // VARIABLES
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const [collectionData, setCollectionData] = useState([]);
const {id, users_id, item_name, description, item_photo}= collectionData


  //RETRIEVING TOKEN FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");

  const idUser = sessionStorage.getItem("id");


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

      axios
      .get(`${baseURL}/profile/${idUser}/collection`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCollectionData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        // navigate("/login");
      });
  
  },[]);

  if(isLoading){
   return <div >Loading...</div>;
  };

  return (<>
  <Header />
    <section>
      <h1>{collectionData[3].id}</h1>
      <p>{collectionData[2].users_id}</p>
    </section>
    <Footer />
    </>
  );
};

export default MyCollection;
