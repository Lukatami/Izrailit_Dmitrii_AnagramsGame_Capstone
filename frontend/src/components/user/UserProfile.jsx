import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../../stores/playerStore.js";
import PlayerName from "./PlayerName.jsx";

function UserProfile() {
  const navigate = useNavigate();
  const { logOut, deletePlayerAccount } = usePlayerStore();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible!"
    );

    if (!confirmDelete) return;

    try {
      await deletePlayerAccount();
      alert("Your account has been deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete account!");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <PlayerName />
      <button onClick={handleLogOut}>Log Out</button>
      <button onClick={handleDeleteClick}>Delete Account</button>
    </div>
  );
}

export default UserProfile;
