import "./ConfirmationDeleteModal.css";

function ConfirmationDeleteModal({ isOpen, handleDeleteCard, onClose }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content-confirmation-delete">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-confirmation-delete"
        >
          {" "}
        </button>
        <span className="modal__confirmation-text">
          {" "}
          Are you sure you want to delete this item?
        </span>
        <span className="modal__confirmation-text">
          {" "}
          This action is irreversible.
        </span>

        <button
          className="modal__delete-item"
          onClick={handleDeleteCard}
          type="button"
        >
          Yes, delete item
        </button>
        <button className="modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDeleteModal;
