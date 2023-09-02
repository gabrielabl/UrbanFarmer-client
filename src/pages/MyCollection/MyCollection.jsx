import { useEffect, useState } from "react";
import "./MyCollection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Link, useParams } from "react-router-dom";

const MyCollection = ({ baseURL }) => {
  // VARIABLES
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);
  const { profileId } = useParams();

  //RETRIEVING TOKEN AND DATA FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");
  const idUser = sessionStorage.getItem("id");

  //IF USER DOES NOT HAVE ANY ITEM IN COLLECTION, IT WILL RE-DIRECT TO NEW COLLECTION ITEM PAGE IN THE FUTURE
  if (collectionData.message) {
    navigate("/profile");
  }

  //RETRIEVING USER DATA ACCORDING TO AUTHORIZATION TOKEN
  useEffect(() => {
    //IF TOKEN ABSENT FROM SESSION STORAGE, RE-DIRECT TO LOGIN PAGE
    if (!token) {
      navigate("/login");
    }

    if(profileId === undefined){
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
        console.log(err);
        navigate("/login");
      });
    } else {
      axios
      .get(`${baseURL}/profile/${profileId}/collection`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCollectionData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/search");
      });
    }

  }, [profileId]);

  //DELETE HANDLE
  const deleteHandle = (id) => {
    axios
      .delete(`${baseURL}/collection/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`${baseURL}/profile/${idUser}/collection`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setCollectionData(res.data);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //WHILE DATA IS NOT RENDERED
  if (isLoading) {
    return <div>LOADING..</div>;
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <h1>{collectionData[0].user_name}'S COLLECTION</h1>
          <ul>
            {collectionData.map((item) => (
              <li key={item.id}>
                <img
                  src={`${baseURL}/${item.item_photo}`}
                  alt={item.item_name}
                ></img>
                <h2>{item.item_name}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    deleteHandle(item.id);
                  }}
                >
                  <DeleteOutlineTwoToneIcon />
                </button>
              </li>
            ))}
          </ul>
          <Link to="/additem">
            <Button text='ADD MORE' />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyCollection;
