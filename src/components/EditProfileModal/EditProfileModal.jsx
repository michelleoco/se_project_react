import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  const checkFormValidity = () => {
    const isValid = name.length >= 1 && name.length <= 30 && avatar.length > 0;
    return isValid;
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [name, avatar]);

  // initialize form with current user data
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
      setIsFormValid(false);
    }
  }, [currentUser]);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <h3 className="modal__title">Change profile data</h3>
        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__form-fieldset">
            <label className="modal__label">
              Name*
              <input
                type="text"
                className="modal__input"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="modal__label">
              Avatar*
              <input
                type="url"
                className="modal__input"
                placeholder="Avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </label>
          </fieldset>
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid ? "modal__submit_valid" : ""
            }`}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
