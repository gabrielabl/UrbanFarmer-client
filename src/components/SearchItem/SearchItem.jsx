import "./SearchItem.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';

const SearchItem = ({ baseURL,setBackground }) => {
  // VARIABLES

  const [searchData, setSearchData] = useState({});
  const token = sessionStorage.getItem("token");
  const search = sessionStorage.getItem("search");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `${baseURL}/collection/search`,
        { search: search },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSearchData(res.data);
        setLoading(false);
        setBackground({
          backgroundColor: "#F5DECD",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchData,setBackground,baseURL,search,token]);

  //WHILE DATA IS NOT RENDERED
  if(isLoading){
    return <div  >
      <Header />
      <div className="loading-page">
      <p >LOADING...</p><LoadingButton loading={true} />
      </div>
 
      <Footer />
      </div>;
   };


  return (
    <>
      <Header />
      <main className="search-item__main">
        <h1 className="search-item__title">You search for "{search}"</h1>
        {searchData.length === 0? <div className="search-item__no-item">NO ITEMS FOUND FOR {search}</div> :
        <div>
          <ul className="search-item__container-wrapper">
            {searchData.map((item) => (
              <li className="search-item__container" key={item.id}>
                <Link to={`/profile/${item.users_id}/collection`}>
                <img className="search-item__image" alt={item.item_name} src={`${baseURL}/${item.item_photo}`}></img>
                </Link>
                <div className="search-item__info">
                  <h2>{item.item_name}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="search-item__avatar">
                  <Link to={`/profile/${item.users_id}`}>
                    <Avatar
                      avatar_source={`${baseURL}/${item.avatar_photo}`}
                      avatar_alt={"avatar-user-collection"}
                    />
                  </Link>
                  <h2>{item.user_name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
        }
      </main>

      <Footer />
    </>
  );
};

export default SearchItem;
