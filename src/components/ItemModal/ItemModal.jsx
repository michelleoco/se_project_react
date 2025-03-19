import "../ModalWithForm/ModalWithForm";
import "./ItemModal.css";

function ItemModal({ onClose, card, onDelete, isOpen }) {
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
        <button onClick={onDelete} type="button" className="modal__delete">
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
