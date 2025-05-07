import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onLogout,
  onEditProfile,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
