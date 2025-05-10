import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isFormValid,
  alternativeText,
  onAlternativeClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          {" "}
        </button>
        <form className="modal__form" onSubmit={onSubmit} action="">
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid ? "modal__submit_valid" : ""
            }`}
          >
            {buttonText}
          </button>
          {alternativeText && onAlternativeClick && (
            <button
              type="button"
              className="modal__alternative-button"
              onClick={onAlternativeClick}
            >
              {alternativeText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
