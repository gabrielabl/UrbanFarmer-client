import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AddItem.scss";
import imgPlaceholder from '../../Assets/placeholder.png'
import { useState, useRef } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";



const AddItem = ()=>{
//VARIABLES
const user_name = sessionStorage.getItem("user_name");
const [newItem, setNewItem]= useState({});
const formData = new FormData();
const [previewItem, setPreviewItem] = useState(imgPlaceholder);

//FOR REF FILE UPLOAD INPUT
const hiddenUserPhotoInput = useRef(null);
const hide = { display: "none" };

//HANDLE TO INPUT FILE
const itemPhotoHandle =(event)=>{
    event.preventDefault();
    hiddenUserPhotoInput.current.click();
};

  //HANDLE ONCHANGE
  const handleOnChangeNewItem = (event) => {
    const { value, name } = event.target;

    if (name === "item_photo") {
      setNewItem({
        [name]: event.target.files[0],
      });
      setPreviewItem(URL.createObjectURL(event.target.files[0]));
    } else {
     setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };

  //HANDLE SUBMIT
  const addNewItemHandleSubmit = (event)=>{
    event.preventDefault();

       //APPENDING NEW DATA FORMDATA
       for (let key in newItem) {
        formData.append(key, newItem[key]);
      };

      //DESTRUCTURING 
    const { item_name, description, item_photo} = newItem;

    if(!item_name || !description || !item_photo){
        return console.log('All fields show be completed')
    } 





  }


    return(
        <>
     <Header />
    <main>
<h1>{user_name}'S COLLECTION</h1>
<form onSubmit={addNewItemHandleSubmit}>
<div>
<img
    src={!previewItem ? imgPlaceholder: previewItem}
          alt="avatar-photo-edit"
        ></img>
        <button onClick={itemPhotoHandle} >
          <AddAPhotoOutlinedIcon />
        ADD PICTURE
        </button>

        <input
          filename={user_name}
          type="file"
          name="item_photo"
          style={hide}
          onChange={handleOnChangeNewItem}
          ref={hiddenUserPhotoInput}
          accept="image/*"
        ></input>
</div>

<div>
<label>
    ITEM NAME
          <input
            name="item_name"
            type="text"
            value={newItem.item_name?.item_name}
            onChange={handleOnChangeNewItem}
            placeholder={"Include the name of your item here"}
          ></input>
        </label>
        <label>
            DESCRIPTION
          <input
            name="description"
            type="text"
            value={newItem.description?.description}
            onChange={handleOnChangeNewItem}
            placeholder={"Describe your item"}
          ></input>
        </label>
<button>
        <PublishOutlinedIcon />
        SUBMIT
      </button>
</div>

</form>
    </main>
    <Footer />
    </>
    )
};

export default AddItem