import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../assets/header_logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { isLoggedIn, currentUser, isValidImage } =
    useContext(CurrentUserContext);

  // Get first letter of user's name for avatar placeholder
  const getUserInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "";
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="Header logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__right-section">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <div className="header__user-container">
              <Link
                to="/profile"
                className="header__link header__user-container"
              >
                {currentUser?.avatar && isValidImage ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar-placeholder">
                    {getUserInitial()}
                  </div>
                )}
                <p className="header__username">{currentUser?.name}</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__button"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
