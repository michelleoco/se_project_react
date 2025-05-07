import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfile }) {
  const { currentUser, isValidImage } = useContext(CurrentUserContext);

  // Get first letter of user's name for avatar placeholder
  const getUserInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar && isValidImage ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar-placeholder">
            {getUserInitial()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "ME"}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-profile-button"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__logout-button"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
