import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({ onClose, isOpen, activeModal, onRegisterSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      name,
      avatar,
    };
    onRegisterSubmit(userData);
  };

  useEffect(() => {
    setEmail(""); //empty the inputs
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit} //renaming convention in react to rename the function with "on" when its passed as a prop
    >
      <label htmlFor="Email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>{" "}
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
          value={avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
