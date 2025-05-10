import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({
  onClose,
  isOpen,
  activeModal,
  onLoginSubmit,
  onRegisterClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  const checkFormValidity = () => {
    const isValid = Boolean(email.length > 0 && password.length > 0);
    return isValid;
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [email, password]);

  useEffect(() => {
    setEmail(""); //empty the inputs
    setPassword("");
    setIsFormValid(false);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit} //renaming convention in react to rename the function with "on" when its passed as a prop
      isFormValid={isFormValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <button className="modal__signup-button" onClick={onRegisterClick}>
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
