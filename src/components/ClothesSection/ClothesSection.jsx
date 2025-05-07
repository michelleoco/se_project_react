import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          // .filter((item) => item.owner === currentUser.currentUser._id)
          .filter(
            (item) =>
              currentUser?.currentUser?._id &&
              item.owner === currentUser.currentUser._id
          )
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                className="card__image"
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
