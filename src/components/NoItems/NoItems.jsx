import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./NoItem.scss";

const NoItems = ({ addMoreBtn }) => {
  return (
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
  );
};

export default NoItems;
