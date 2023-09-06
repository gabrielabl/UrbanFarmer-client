import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AddItem.scss";
import imgPlaceholder from "../../Assets/images/placeholder.png";
import { useState, useRef } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const AddItem = ({ baseURL }) => {
  //VARIABLES
  const [newItem, setNewItem] = useState({});
  const formData = new FormData();
  const [previewItem, setPreviewItem] = useState(imgPlaceholder);
  const [placeholder, setPlaceholder] = useState({
    placeholderName: "include a name for your item",
    placeholderDescription: "describe your item",
  });
  // RE-DIRECT
  let navigate = useNavigate();

  //RETRIEVING TOKEN AND DATA FROM SESSION STORE FOR AUTHORIZATION
  const token = sessionStorage.getItem("token");
  const idUser = sessionStorage.getItem("id");
  const user_name = sessionStorage.getItem("user_name");

  //FOR REF FILE UPLOAD INPUT
  const hiddenUserPhotoInput = useRef(null);
  const hide = { display: "none" };

  //HANDLE TO INPUT FILE
  const itemPhotoHandle = (event) => {
    event.preventDefault();
    hiddenUserPhotoInput.current.click();
  };

   //FORM VALIDATION ERROR STATE
 const [errorStateForm, setErrorStateForm] = useState({
  item_name: false,
  description: false,
});

  //FORM VALIDATION
  const isFieldEmpty = () => {
    //DESTRUCTURING
    const { item_name, description, item_photo } = newItem;

    if (!item_name) {
      setPlaceholder({
        ...placeholder,
        placeholderName: "No fields should be empty",
      });
      setErrorStateForm({...errorStateForm, item_name: true})
      return false;
    }
    if (!description) {
      setPlaceholder({
        ...placeholder,
        placeholderDescription: "No fields should be empty",
      });
      setErrorStateForm({...errorStateForm, description: true})
      return false;
    }
    if (!item_photo) {
      alert('PLEASE INCLUDE A  📸 FOR YOUR ITEM')
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (!isFieldEmpty()) {
      return false;
    }
    return true;
  };

  //HANDLE ONCHANGE
  const handleOnChangeNewItem = (event) => {
    const { value, name } = event.target;

    if (name === "item_photo") {
      setNewItem({
        ...newItem,
        [name]: event.target.files[0],
      });
      //WILL NOT STORE IMAGE IF FILE IS UNDEFINED
       if(event.target.files[0] !== undefined){
        setPreviewItem(URL.createObjectURL(event.target.files[0]));
       }
    } else {
      setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };

  //HANDLE SUBMIT
  const addNewItemHandleSubmit = (event) => {
    event.preventDefault();

    //APPENDING NEW DATA FORMDATA
    for (let key in newItem) {
      formData.append(key, newItem[key]);
    }
    formData.append("users_id", idUser);

    if (isFormValid()) {
      //POST REQUEST
      axios
        .post(`${baseURL}/collection`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res)
          navigate("/mycollection");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Header />
      <main className="add-item__container">
        <h1>{user_name}'S COLLECTION</h1>
        <form 
        className="add-item__form"
        onSubmit={addNewItemHandleSubmit}>
          <div 
          className="add-item__image">
            <img
            className="add-item__preview"
              src={!previewItem ? imgPlaceholder : previewItem}
              alt="collectionItem-photo-edit"
            ></img>
            <Button
              onClick={itemPhotoHandle}
              SVG={<AddAPhotoOutlinedIcon />}
              text="ADD PICTURE"
            />

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

          <div
           className="add-item__text">
            <label>
              ITEM NAME
              <input
                className={`add-item__input ${errorStateForm.item_name? "add-item__input--error-state" : "" }`}
                name="item_name"
                type="text"
                value={newItem.item_name?.item_name}
                onChange={handleOnChangeNewItem}
                placeholder={placeholder.placeholderName}
              ></input>
            </label>
            <label>
              DESCRIPTION
              <textarea
                className={`add-item__input ${errorStateForm.description? "add-item__input--error-state" : "" } ${"add-item__description"}`}
                name="description"
                type="text"
                value={newItem.description?.description}
                onChange={handleOnChangeNewItem}
                placeholder={placeholder.placeholderDescription}
              ></textarea>
            </label>
            <Button text="SUBMIT" SVG={<PublishOutlinedIcon />} />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddItem;
