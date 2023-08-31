import "./SearchItem.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchItem =({baseURL})=>{

// VARIABLES
const [searchData, setSearchData]= useState({});
const token = sessionStorage.getItem("token");
const search = sessionStorage.getItem("search");

console.log(token)
useEffect(()=>{

axios
.post(`${baseURL}/collection`, {search: search},{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
.then((res) => {
    setSearchData(res.data)
  })
  .catch((err) => {
    console.log(err);
  });

},[])

console.log(searchData)
    return(
        <>
        <Header />
<main>
    <h1>You search for "{search}"</h1>
    {/* <div>
        <ul>
      {searchData.map((item)=>( 
        <li>
            <img src={`${baseURL}/${item.user_photo}`}></img>
        </li>
      ))}
        </ul>
    </div> */}
</main>

        <Footer />
        </>
    )
}

export default SearchItem;