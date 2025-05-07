import { useNavigate } from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  removeItems,
  addItem,
  likeItem,
  unlikeItem,
  updateUser,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import ConfirmationDeleteModal from "../ConfirmationDeleteModal/ConfirmationDeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const navigate = useNavigate();
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isValidImage, setIsValidImage] = useState(true);

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLoginSubmit = ({ email, password }) => {
    signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleRegisterClick = () => {
    setActiveModal("signUp");
  };

  const handleRegisterSubmit = ({ email, password, name, avatar = "" }) => {
    signup(name, avatar, email, password)
      .then((res) => {
        return signin(email, password);
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = () => {
    removeItems(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const openConfirmationModal = () => {
    setActiveModal("delete");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem(name, imageUrl, weather)
      .then((newItemFromServer) => {
        setClothingItems((prevItems) => [newItemFromServer, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUser(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          // console.log("User data from token:", userData);
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    if (currentUser?.avatar) {
      const img = new Image();
      img.onload = () => setIsValidImage(true);
      img.onerror = () => setIsValidImage(false);
      img.src = currentUser.avatar;
    }
  }, [currentUser?.avatar]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, isValidImage }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
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
                    onLogout={handleLogout}
                    onEditProfile={handleEditProfile}
                    handleCardLike={handleCardLike}
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
            onDelete={openConfirmationModal}
          />
          <ConfirmationDeleteModal
            isOpen={activeModal === "delete"}
            handleDeleteCard={handleDeleteCard}
            onClose={closeActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            activeModal={activeModal}
            onLoginSubmit={handleLoginSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "signUp"}
            onClose={closeActiveModal}
            activeModal={activeModal}
            onRegisterSubmit={handleRegisterSubmit}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
