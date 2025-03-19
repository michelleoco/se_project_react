import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, removeItems, addItem } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import ConfirmationDeleteModal from "../ConfirmationDeleteModal/ConfirmationDeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    isDay: false,
    condition: "",
  });
  const [activeModal, setActiveModal] = useState(""); //empty string means no modal is active
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = () => {
    console.log(clothingItems);
    removeItems(selectedCard._id).then(() =>
      setClothingItems(
        clothingItems.filter((item) => item._id !== selectedCard._id)
      )
    );
    console.log(clothingItems);
    closeActiveModal();
  };

  const openConfirmationModal = () => {
    console.log("working");
    setActiveModal("delete");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1; //gives added cards the correct _id:
    const newItem = { _id: newId, name, imageUrl, weather };

    addItem(name, imageUrl, weather).then((prevItems) => {
      console.log(prevItems);
      setClothingItems((prevItems) => [newItem, ...prevItems]);

      //setClothingItems((item) => [newItem, ...prevItems]);
      closeActiveModal();
    });
    //using a function here guarantees that react will pass the most recently updated state as the first parameter
    //this diminishes the possibility of getting a "stale" clothingItems state
    //setClothingItems([newItem, ...clothingItems]); //updates clothingItems array

    closeActiveModal(); //close the modal
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          // onDelete={handleDeleteCard}
          onDelete={openConfirmationModal}
        />
        <ConfirmationDeleteModal
          isOpen={activeModal === "delete"}
          handleDeleteCard={handleDeleteCard}
          onClose={closeActiveModal}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
