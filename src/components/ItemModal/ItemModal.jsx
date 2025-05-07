import React, { useContext } from "react";
import "../ModalWithForm/ModalWithForm";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, card, onDelete, isOpen }) {
  const { currentUser } = useContext(CurrentUserContext);
  // Add early return if card is null or undefined
  if (!card) {
    return null; // or you could return a loading state
  }
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_item_modal"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button onClick={onDelete} type="button" className="modal__delete">
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
