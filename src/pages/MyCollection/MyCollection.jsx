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

  //SHOW/HIDE BUTTONS THAT WILL BE ENABLE ONLY FOR LOGIN USER
  const show = { display: "flex" };
  const hide = { display: "none" };
  const [deleteBtn, setDeleteBtn] = useState(show);
  const [addMoreBtn, setAddMoreBtn] = useState(show);
  const [tradeBtn, setTradeBtn] = useState(hide);

  //RETRIEVING TOKEN AND DATA FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");
  const adminUserId = sessionStorage.getItem("id");

  //RETRIEVING USER DATA ACCORDING TO AUTHORIZATION TOKEN
  useEffect(() => {
    //IF TOKEN ABSENT FROM SESSION STORAGE, RE-DIRECT TO LOGIN PAGE
    if (!token) {
      navigate("/login");
    }

    if (profileId === undefined) {
      axios
        .get(`${baseURL}/profile/${adminUserId}/collection`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCollectionData(res.data);
          console.log(collectionData);
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
          .get(`${baseURL}/profile/${adminUserId}/collection`, {
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

  useEffect(() => {
    if (profileId !== undefined) {
      setAddMoreBtn(hide);
      setDeleteBtn(hide);
      setTradeBtn(show);
      if (profileId === adminUserId) {
        setAddMoreBtn(show);
        setDeleteBtn(show);
        setTradeBtn(hide);
      }
    } else {
      setAddMoreBtn(show);
      setDeleteBtn(show);
      setTradeBtn(hide);
    }
  }, [profileId]);

  //WHILE DATA IS NOT RENDERED
  if (isLoading) {
    return <div>LOADING..</div>;
  }

  return (
    <>
      <Header />
      <main>
        {collectionData.message? <div><p>YOU HAVE NO ITEMS IN YOUR COLLECTION</p><Link to="/additem">
            <Button style={addMoreBtn} text="ADD MORE" />
          </Link></div> : <section>
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
                <a style={tradeBtn} href={`mailto:${item.email}`}>
                  TRADE
                </a>
                <button
                  style={deleteBtn}
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
            <Button style={addMoreBtn} text="ADD MORE" />
          </Link>
        </section>}
      </main>
      <Footer />
    </>
  );
};

export default MyCollection;
