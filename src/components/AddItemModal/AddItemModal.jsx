import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function AddItemModal({ onClose, isOpen, activeModal, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AddItemModal handleSubmit called with values:", {
      name,
      imageUrl,
      weather,
    });
    onAddItemModalSubmit({ name, imageUrl, weather }); //pass the inputs(state variables) (if passed as an object, remeber to desructure when passing to handleAddItemModalSubmit in App.jsx )
  };

  useEffect(() => {
    setName(""); //empty the inputs
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit} //renaming convention in react to rename the function with "on" when its passed as a prop
      onClick={() => console.log("Button clicked!")}
    >
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
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value="hot"
            checked={weather === "hot"}
          />{" "}
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value="warm"
            checked={weather === "warm"}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value="cold"
            checked={weather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
