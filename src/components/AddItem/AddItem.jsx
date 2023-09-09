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

  //DATA ADDING
  const [newItem, setNewItem] = useState({});
  const formData = new FormData();

  //PREVIEW AND PLACEHOLDERS
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

  //REF BUTTON FILE UPLOAD INPUT
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

  // EMPTY FIELDS
  const isFieldEmpty = () => {
    //DESTRUCTURING NEW ITEM OBJECT
    const { item_name, description, item_photo } = newItem;

    if (!item_name) {
      setPlaceholder({
        ...placeholder,
        placeholderName: "NO FIELDS SHOULD BE EMPTY",
      });
      setErrorStateForm({ ...errorStateForm, item_name: true });
      return false;
    }

    if (!description) {
      setPlaceholder({
        ...placeholder,
        placeholderDescription: "NO FIELDS SHOULD BE EMPTY",
      });
      setErrorStateForm({ ...errorStateForm, description: true });
      return false;
    }

    if (!item_photo) {
      alert("PLEASE INCLUDE A  📸 FOR YOUR ITEM");
      return false;
    }
    return true;
  };

  //FINAL FORM VALIDATION
  const isFormValid = () => {
    if (!isFieldEmpty()) {
      return false;
    }
    return true;
  };

  //HANDLE ON CHANGE NEW ITEM
  const handleOnChangeNewItem = (event) => {
    const { value, name } = event.target;

    if (name === "item_photo") {
      setNewItem({
        ...newItem,
        [name]: event.target.files[0],
      });
      //WILL NOT STORE IMAGE TEMP URL IF FILE IS UNDEFINED
      if (event.target.files[0] !== undefined) {
        setPreviewItem(URL.createObjectURL(event.target.files[0]));
      }
    } else {
      setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };

  //HANDLE SUBMIT ADD NEW ITEM
  const addNewItemHandleSubmit = (event) => {
    event.preventDefault();

    //APPENDING NEW DATA TO FORMDATA
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
          navigate("/mycollection");
        })
        .catch((err) => {});
    }
  };
  return (
    <>
      {/* HEADER */}
      <Header />
      <main className="add-item__container">
        <h1>{user_name}'S COLLECTION</h1>

        {/* FORM */}
        <form className="add-item__form" onSubmit={addNewItemHandleSubmit}>
          {/* IMAGE CONTAINER */}
          <div className="add-item__image">
            <img
              className="add-item__preview"
              src={!previewItem ? imgPlaceholder : previewItem}
              alt="collectionItem-preview"
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

          {/* TEXT CONTAINER */}
          <div className="add-item__text">
            <label>
              ITEM NAME
              <input
                className={`add-item__input ${
                  errorStateForm.item_name ? "add-item__input--error-state" : ""
                }`}
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
                className={`add-item__input ${
                  errorStateForm.description
                    ? "add-item__input--error-state"
                    : ""
                } ${"add-item__description"}`}
                name="description"
                type="text"
                value={newItem.description?.description}
                onChange={handleOnChangeNewItem}
                placeholder={placeholder.placeholderDescription}
              ></textarea>
            </label>

            {/* SUBMIT BUTTON */}
            <Button text="SUBMIT" SVG={<PublishOutlinedIcon />} />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddItem;
