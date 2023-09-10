import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import "./CollectionItem.scss";

const CollectionItem = ({
  baseURL,
  tradeBtn,
  deleteBtn,
  deleteHandle,
  item,
}) => {
  return (
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
  );
};

export default CollectionItem;
