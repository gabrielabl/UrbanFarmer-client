import { useEffect, useState } from "react";
import "./MyCollection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoadingButton from "@mui/lab/LoadingButton";

const MyCollection = ({ baseURL, setBackground }) => {
  // VARIABLES
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);
  const { profileId } = useParams();

  //CAROUSEL STATES
  const [activeItems, setActiveItems] = useState([]);
  const [activeCarousel, setActiveCarousel] = useState(false);

  //SCREEN SIZE STATES
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [mobileScreen, setMobileScreen] = useState();

  //WILL CHANGE STATE ACCORDING TO SCREEN SIZE TO CHANGE LAYOUT ITEMS
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    if (screenSize < 768) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  }, [screenSize]);

  //SHOW/HIDE BUTTONS THAT WILL BE ENABLE ONLY FOR LOGIN USER/ DELETE AND ADD MORE BUTTONS
  const [show] = useState({ display: "flex" });
  const [hide] = useState({ display: "none" });

  // BUTTONS
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

    //IF PROFILE ID IS ABSENT, IT MEANS THE USER THAT LOGIN WILL GET THE PROFILE DATA
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
          setActiveCarousel(false);

          //SETTING BACKGROUND FOR MY COLLECTION PAGE
          setBackground({
            backgroundColor: "#F5DECD",
          });
        })
        .catch((err) => {
          navigate("/login");
        });
    } else {
      //IF PROFILE ID IS PRESENT, THE COLLECTION OF THE VISITED USERS WILL BE RETRIEVED
      axios
        .get(`${baseURL}/profile/${profileId}/collection`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCollectionData(res.data);
          setLoading(false);
          setActiveCarousel(false);
        })
        .catch((err) => {
          //IF USER COLLECTION FAILED TO BE RETRIEVE, RE-DIRECT TO SEARCH
          navigate("/search");
        });
    }
  }, [
    mobileScreen,
    profileId,
    adminUserId,
    baseURL,
    navigate,
    setBackground,
    token,
  ]);

  // SCREEN SIZE INITIAL CAROUSEL USER COLLECTION DATA
  useEffect(
    () => {
      //IF COLLECTION DATA IS EMPTY IT WILL NO PROCEED WITH ACTIVE ITEMS
      if (collectionData.message) {
      } else {
        //IF USER ONLY HAVE ONE ITEM IN COLLECTION AND SCREEN SIZE IS LESS THAN 768, SET 1 ACTIVE ITEM
        if (mobileScreen) {
          if (collectionData.length <= 1) {
            setActiveItems(collectionData);
          } else {
            //INITIAL VALUE FOR CAROUSEL TO RUN
            if (!activeCarousel) {
              setActiveItems(collectionData.splice(0, 1));
            } else {
            }
          }
        } else {
          //SCREEN SIZE IS OVER 768, 3 ITEMS WILL BE ACTIVE INSTEAD OF 1
          if (collectionData.length <= 3) {
            setActiveItems(collectionData);
          } else {
            if (!activeCarousel) {
              setActiveItems(collectionData.splice(0, 3));
            } else {
            }
          }
        }
      }
    },
    [collectionData],
    [profileId]
  );

  //ACTIVE ITEM CAROUSEL HANDLES
  //HANDLES THAT TRANSFER ITEMS FROM COLLECTION DATA TO ACTIVE ITEMS AND PUT IT BACK, REPLACING ACTIVE ITEMS WITH NEW ONES IN A CYCLE

  // FORWARD
  const nextCarouselHandle = () => {
    //MOBILE SCREEN
    if (mobileScreen) {
      setActiveCarousel(true);
      collectionData.push(activeItems[0]);
      setActiveItems(collectionData.splice(0, 1));
    } else {
      //  TABLET SCREEN AND ABOVE
      if (activeItems.length >= 3) {
        setActiveCarousel(true);
        collectionData.push(activeItems[0], activeItems[1], activeItems[2]);
        setActiveItems(collectionData.splice(0, 3));
      }
    }
  };

  //BACKWARD
  const backCarouselHandle = () => {
    //MOBILE SCREEN
    if (mobileScreen) {
      setActiveCarousel(true);
      collectionData.splice(0, 0, activeItems[0]);
      setActiveItems(collectionData.splice(-1, 1));
    } else {
      //BUTTON INACTIVE FOR TABLET AND ABOVE
    }
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
        //RE-RENDERING DATA AFTER DELETION
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
      .catch((err) => {});
  };

  //CONDITIONAL BUTTONS THAT WILL BE DISPLAY OR HIDE DEPENDING ON USER LOGIN
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
  }, [profileId, adminUserId, hide, show]);

  //WHILE DATA IS NOT RENDERED
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="loading-page">
          <p>LOADING...</p>
          <LoadingButton loading={true} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Header />
      <main className="collection-page__main">
        {/* IF NOT ITEMS IN COLLECTION, THIS DIV WILL BE DISPLAY */}
        {collectionData.message ? (
          <div className="collection-page__no-items-wrapper">
            <p className="collection-page__no-items">
              YOU HAVE NO ITEMS IN YOUR COLLECTION
            </p>
            <Link className="collection-page__btn" to="/additem">
              <Button
                classVar={"collection-page__btn"}
                style={addMoreBtn}
                text="ADD MORE"
              />
            </Link>
          </div>
        ) : (
          // IF COLLECTION IS NOT EMPTY THIS WILL RENDER:
          <section className="collection-page__container">
            <h1 className="collection-page__title">
              {collectionData[0].user_name}'S COLLECTION
            </h1>
            <ul className="collection-page__item-container">
              {/* BACK-ARROW IS DEACTIVATED FOR TABLET AND ABOVE */}
              {mobileScreen ? (
                <ArrowBackIosIcon onClick={backCarouselHandle} />
              ) : (
                ""
              )}
              {activeItems.map((item) => (
                <li className="collection-page__list-item" key={item.id}>
                  <img
                    className="collection-page__image"
                    src={`${baseURL}/${item.item_photo}`}
                    alt={item.item_name}
                  ></img>
                  <h2>{item.item_name}</h2>
                  <p>{item.description}</p>
                  <a
                    className="collection-page__trade-btn"
                    style={tradeBtn}
                    href={`mailto:${item.email}`}
                  >
                    TRADE
                  </a>
                  {/* DELETE BUTTON */}
                  <button
                    className="collection-page__btn-delete"
                    style={deleteBtn}
                    onClick={() => {
                      deleteHandle(item.id);
                    }}
                  >
                    <DeleteOutlineTwoToneIcon />
                  </button>
                </li>
              ))}
              <ArrowForwardIosIcon onClick={nextCarouselHandle} />
            </ul>

            {/* ADDITEM BUTTON */}
            <Link className="collection-page__btn" to="/additem">
              <Button
                classVar={"collection-page__btn"}
                style={addMoreBtn}
                text="ADD MORE"
              />
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyCollection;
