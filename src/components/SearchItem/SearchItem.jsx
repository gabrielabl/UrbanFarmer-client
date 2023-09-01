import "./SearchItem.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "../Avatar/Avatar";

const SearchItem =({baseURL})=>{

// VARIABLES

const [searchData, setSearchData]= useState({});
const token = sessionStorage.getItem("token");
const search = sessionStorage.getItem("search");
const [isLoading, setLoading] = useState(true);


useEffect(()=>{

  
axios
.post(`${baseURL}/collection`, {search: search},{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
.then((res) => {
    setSearchData(res.data)
    setLoading(false);
  })
  .catch((err) => {
    console.log(err);
  });

},[searchData])

  //WHILE DATA IS NOT RENDERED
  if (isLoading) {
    return <div>LOADING..</div>;
  }


    return(
        <>
        <Header />
<main>
    <h1>You search for "{search}"</h1>
    <div>
        <ul>
      {searchData.map((item)=>( 
        <li key={item.id}>
            <img src={`${baseURL}/${item.item_photo}`}></img>
          <div>
          <h2>{item.item_name}</h2>
          <p>{item.description}</p>
          </div>
          <div>
            <Avatar avatar_source={`${baseURL}/${item.avatar_photo}`} avatar_alt={'avatar-user-collection'} />
            <h2>{item.user_name}</h2>
          </div>
        </li>
      ))}
        </ul>
    </div>
</main>

        <Footer />
        </>
    )
}

export default SearchItem;