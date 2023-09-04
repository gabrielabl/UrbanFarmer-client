import { useEffect, useState } from "react";
import "./MyCollection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MyCollection = ({ baseURL }) => {
  // VARIABLES
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);
  const { profileId } = useParams();
  const [activeItems, setActiveItems] = useState([]);
  const [activeCarousel, setActiveCarousel]= useState(false);

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
          setLoading(false);
          setActiveCarousel(false)
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

  }, [profileId],[collectionData]);

useEffect(()=>{
//IF USER ONLY HAVE ONE ITEM IN COLLECTION
if(collectionData.length <= 1){
  setActiveItems(collectionData)
} else{
  //INITIAL VALUE FOR CAROUSEL TO RUN
  if(!activeCarousel){
    setActiveItems(collectionData.splice(0,1))
    console.log(activeItems)
  } else{
    console.log(activeItems)
  }
}
  },[collectionData],[activeItems],[profileId])

//ACTIVE ITEM CAROUSEL HANDLES
// FORWARD
const nextCarouselHandle =()=>{
  setActiveCarousel(true)
  collectionData.push(activeItems[0]);
  console.log(activeItems)
  console.log(collectionData)
  setActiveItems(collectionData.splice(0,1))
};
//BACKWARD
const backCarouselHandle =()=>{
  setActiveCarousel(true)
  collectionData.splice(0,0,activeItems[0]);
  console.log(activeItems)
  setActiveItems(collectionData.splice(-1,1))
};


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
      <main className="collection-page__container">
        {collectionData.message? <div><p>YOU HAVE NO ITEMS IN YOUR COLLECTION</p><Link to="/additem">
            <Button style={addMoreBtn} text="ADD MORE" />
          </Link></div> : <section>
          <h1>{collectionData[0].user_name}'S COLLECTION</h1>
          <ul>
            {activeItems.map((item) => (
              <li key={item.id}>
                <img
                className="collection-page__item"
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
          <ArrowBackIosIcon onClick={backCarouselHandle} />
          <ArrowForwardIosIcon onClick={nextCarouselHandle} />
          <Link className="collection-page__btn" to="/additem">
            <Button style={addMoreBtn} text="ADD MORE" />
          </Link>
        </section>}
      </main>
      <Footer />
    </>
  );
};

export default MyCollection;
