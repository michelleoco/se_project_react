import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({ onClose, isOpen, activeModal, onLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ email, password }); //pass the inputs(state variables) (if passed as an object, remeber to desructure when passing to handleAddItemModalSubmit in App.jsx )
  };

  useEffect(() => {
    setEmail(""); //empty the inputs
    setPassword("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit} //renaming convention in react to rename the function with "on" when its passed as a prop
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
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
    </ModalWithForm>
  );
}

export default LoginModal;
